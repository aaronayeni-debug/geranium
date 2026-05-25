import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, Database, Trash2, Users, FilePlus, FileText, Search, X, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';
import type { EmployeeRecord } from '../types';
import * as xlsx from 'xlsx';

interface EmployeeRecordsViewProps {
  initialFile?: File | null;
  onClearInitialFile?: () => void;
}

export default function EmployeeRecordsView({ initialFile, onClearInitialFile }: EmployeeRecordsViewProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'upload'>('list');
  const [file, setFile] = useState<File | null>(null);
  const [parsedRecords, setParsedRecords] = useState<EmployeeRecord[]>([]);
  const [existingRecords, setExistingRecords] = useState<EmployeeRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Unified Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchRecords = async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      const { data, error } = await supabase
        .from('employee_records')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setExistingRecords(data || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to fetch existing records');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDate('');
  };

  // Fuzzy match helper function (subsequence match)
  const fuzzyMatch = (query: string, target: string): boolean => {
    const q = query.toLowerCase().trim();
    const t = target.toLowerCase().trim();
    if (!q) return true;
    if (!t) return false;
    
    // Try exact substring match first
    if (t.includes(q)) return true;
    
    // Subsequence match (e.g. "oyeola" matches "oyekola")
    let qIdx = 0;
    let tIdx = 0;
    while (qIdx < q.length && tIdx < t.length) {
      if (q[qIdx] === t[tIdx]) {
        qIdx++;
      }
      tIdx++;
    }
    return qIdx === q.length;
  };

  // Filter employee records client-side (real-time while typing)
  const filteredRecords = existingRecords.filter((record) => {
    // 1. Unified Search matching Name, ID (Staff ID), RSA PIN, or Employer/Employee Code using fuzzy search
    // Require a minimum of 3 characters before filtering for safety and performance
    if (searchQuery.trim().length >= 3) {
      const name = record.name_of_employee || '';
      const staffId = record.staff_id || '';
      const rsaPin = record.rsa_pin || '';
      const employerCode = record.employer_code || '';
      
      const matchesName = fuzzyMatch(searchQuery, name);
      const matchesStaffId = fuzzyMatch(searchQuery, staffId);
      const matchesRsaPin = fuzzyMatch(searchQuery, rsaPin);
      const matchesEmployerCode = fuzzyMatch(searchQuery, employerCode);
      
      if (!matchesName && !matchesStaffId && !matchesRsaPin && !matchesEmployerCode) {
        return false;
      }
    }
    
    // 2. Date Upload Filter (real-time)
    if (selectedDate) {
      if (!record.created_at) return false;
      const recordDate = new Date(record.created_at);
      const formattedRecordDate = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}-${String(recordDate.getDate()).padStart(2, '0')}`;
      if (formattedRecordDate !== selectedDate) {
        return false;
      }
    }
    
    return true;
  });

  async function parseExcelFile(uploadedFile: File) {
    try {
      const data = await uploadedFile.arrayBuffer();
      const workbook = xlsx.read(data, { type: 'array' });
      
      const extractedRecords: EmployeeRecord[] = [];
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

      workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json<Record<string, unknown>>(sheet);
        
        rows.forEach((row) => {
          if (Object.keys(row).length === 0) return;
          
          const normRow: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(row)) {
            normRow[normalize(k)] = v;
          }
          
          const getVal = (...keywords: string[]) => {
            // 1. Try exact matches first to avoid substring matching conflicts (e.g. 'employercode' matching 'employer')
            for (const kw of keywords) {
              const normKw = normalize(kw);
              for (const nk in normRow) {
                if (nk === normKw) return String(normRow[nk] || '');
              }
            }
            // 2. Fall back to substring match using very specific keywords
            for (const kw of keywords) {
              const normKw = normalize(kw);
              for (const nk in normRow) {
                if (nk.includes(normKw)) return String(normRow[nk] || '');
              }
            }
            return '';
          };

          const getNum = (...keywords: string[]) => {
            const val = getVal(...keywords);
            if (!val) return 0;
            const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
            return isNaN(parsed) ? 0 : parsed;
          };

          const rsaPin = getVal('rsapin', 'pin');
          const nameOfEmployee = getVal('nameofemployee', 'employeename', 'name');
          
          // Skip instruction/note rows and header matches
          if (!rsaPin || !nameOfEmployee) return;
          if (rsaPin.toLowerCase().includes('column') || rsaPin.toLowerCase().includes('guide')) return;
          if (nameOfEmployee.toLowerCase().includes('column') || nameOfEmployee.toLowerCase().includes('guide')) return;
          if (nameOfEmployee.toLowerCase().includes('details above') || nameOfEmployee.toLowerCase().includes('delete')) return;
          if (!rsaPin.toUpperCase().startsWith('PEN')) return;

          const record: EmployeeRecord = {
            employer_code: getVal('employercode', 'employerid'),
            for_the_month_of: getVal('forthemonthof', 'month', 'period') || 'N/A',
            year_of_contribution: parseInt(getVal('yearofcontribution', 'year')) || new Date().getFullYear(),
            staff_id: getVal('staffid', 'staffno', 'staff'),
            rsa_pin: rsaPin.toUpperCase().trim(),
            name_of_employee: nameOfEmployee.toUpperCase().trim(),
            normal_contribution_for_employee: getNum('normalcontributionforemployee', 'normalcontributionforemployee8', 'employeecontribution8', 'employee8'),
            normal_contribution_for_employer: getNum('normalcontributionforemployer', 'normalcontributionforemployer10', 'employercontribution10', 'employer10'),
            voluntary_contribution_by_employee: getNum('voluntarycontributionbyemployee', 'voluntarycontributionemployee', 'voluntaryemployee'),
            voluntary_contribution_by_employer: getNum('voluntarycontributionbyemployer', 'voluntarycontributionemployer', 'voluntaryemployer'),
            other_contribution: getNum('othercontribution', 'other'),
            total_amount: getNum('totalamt', 'totalamount', 'total'),
            pfa_code: getVal('pfacode', 'pfa').toUpperCase().trim(),
          };
          
          extractedRecords.push(record);
        });
      });
      
      setParsedRecords(extractedRecords);
      toast.success(`Successfully parsed ${extractedRecords.length} records.`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to parse the Excel file. Please ensure it is correctly formatted.');
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    parseExcelFile(uploadedFile);
  };

  useEffect(() => {
    // Run fetchRecords asynchronously to avoid calling setState synchronously in the effect body
    const load = async () => {
      await fetchRecords(false); // isLoading is already true on mount
    };
    load();
  }, []);

  useEffect(() => {
    if (initialFile) {
      // Defer state updates to avoid synchronous setState inside the effect body
      Promise.resolve().then(() => {
        setFile(initialFile);
        setActiveTab('upload');
        parseExcelFile(initialFile);
      });
    }
  }, [initialFile]);

  const handleSubmit = async () => {
    if (parsedRecords.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('employee_records')
        .insert(parsedRecords);
        
      if (error) throw error;
      
      toast.success('Pension remittance records saved to database!');
      setParsedRecords([]);
      setFile(null);
      onClearInitialFile?.();
      setActiveTab('list');
      fetchRecords(); 
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error saving records to database');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearUpload = () => {
    setFile(null);
    setParsedRecords([]);
    onClearInitialFile?.();
  };

  const formatCurrency = (val: number | undefined) => {
    if (val === undefined || isNaN(val)) return '₦0.00';
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 tracking-tight">
            Monthly Pension Remittance
          </h1>
          <p className="text-slate-500 mt-1">Manage and upload monthly employee pension schedules</p>
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-100/70 border border-slate-200/50 rounded-2xl w-fit gap-1.5 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02)]">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center py-2 px-4 md:px-5 font-bold text-sm transition-all duration-300 rounded-xl cursor-pointer ${
            activeTab === 'list' 
              ? 'bg-white text-[#D4900A] shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1.5px_3px_rgba(0,0,0,0.02)] scale-[1.01]' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
          }`}
        >
          <Users size={16} className="mr-2" /> Remittance Dashboard
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center py-2 px-4 md:px-5 font-bold text-sm transition-all duration-300 rounded-xl cursor-pointer ${
            activeTab === 'upload' 
              ? 'bg-white text-[#D4900A] shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1.5px_3px_rgba(0,0,0,0.02)] scale-[1.01]' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
          }`}
        >
          <FilePlus size={16} className="mr-2" /> Upload New Schedule
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgba(150,155,170,0.08)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#D4900A]" />  Remittance Records
            </h3>
            <button 
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors flex items-center"
            >
              <UploadCloud size={16} className="mr-2" /> New Upload
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#D4900A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : existingRecords.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
              <p className="text-slate-500 font-medium">No pension remittance records found in the database.</p>
              <button 
                onClick={() => setActiveTab('upload')}
                className="mt-4 px-4 py-2 bg-[#D4900A] text-white text-sm font-semibold rounded-lg transition-colors shadow-md shadow-[#D4900A]/20"
              >
                Upload First Schedule
              </button>
            </div>
          ) : (
            <>
              {/* Unified Search & Upload Date Filter Panel (Instant Live Filtering) */}
              <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-end gap-4 animate-fade-in">
                <div className="flex-grow min-w-[260px] flex flex-col">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <Search size={12} className="mr-1 text-[#D4900A]" /> Unified Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to search by Employee name, ID, RSA pin, or employer code..."
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4900A]/20 focus:border-[#D4900A] transition-all shadow-sm"
                    />
                    <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
                  </div>
                </div>

                <div className="min-w-[200px] flex flex-col">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <Calendar size={12} className="mr-1 text-[#D4900A]" /> Filter by Upload Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4900A]/20 focus:border-[#D4900A] transition-all shadow-sm text-slate-600"
                    />
                  </div>
                </div>

                {(searchQuery || selectedDate) && (
                  <div className="flex items-center gap-2.5 mt-2 md:mt-0">
                    <button
                      onClick={handleClearFilters}
                      className="w-full md:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-600 hover:text-slate-800 text-sm font-semibold rounded-xl transition-all flex items-center justify-center cursor-pointer h-[42px]"
                      title="Clear filters"
                    >
                      <X size={16} className="mr-1" /> Reset
                    </button>
                  </div>
                )}
              </div>

              {filteredRecords.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200/60 border-dashed flex flex-col items-center justify-center">
                  <p className="text-slate-600 font-medium">No records found matching your search criteria.</p>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the filters or modifying your query.</p>
                  <button 
                    onClick={handleClearFilters}
                    className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Clear Search & Filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm max-h-[600px] overflow-y-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-4 py-3">Employee Name</th>
                        <th className="px-4 py-3">Staff ID</th>
                        <th className="px-4 py-3">RSA PIN</th>
                        <th className="px-4 py-3">Period</th>
                        <th className="px-4 py-3 text-center">Normal Contribution (Employee)</th>
                        <th className="px-4 py-3 text-center">Normal Contribution (Employer)</th>
                        <th className="px-4 py-3 text-center">Voluntary Contribution (Employee)</th>
                        <th className="px-4 py-3 text-center">Voluntary Contribution (Employer)</th>
                        <th className="px-4 py-3 text-center">Total Amount</th>
                        <th className="px-4 py-3">PFA Code</th>
                        <th className="px-4 py-3">Employer Code</th>
                        <th className="px-4 py-3">Uploaded On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRecords.map((record) => (
                        <tr key={record.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-800">{record.name_of_employee}</td>
                          <td className="px-4 py-3 text-slate-600">{record.staff_id || '-'}</td>
                          <td className="px-4 py-3 font-mono text-slate-600 text-xs">{record.rsa_pin}</td>
                          <td className="px-4 py-3 text-slate-600 text-xs">
                            {record.for_the_month_of} {record.year_of_contribution}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600 font-mono">
                            {formatCurrency(record.normal_contribution_for_employee)}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600 font-mono">
                            {formatCurrency(record.normal_contribution_for_employer)}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600 font-mono">
                            {formatCurrency(record.voluntary_contribution_by_employee)}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600 font-mono">
                            {formatCurrency(record.voluntary_contribution_by_employer)}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-slate-800 font-mono">
                            {formatCurrency(record.total_amount)}
                          </td>
                          <td className="px-4 py-3 text-slate-600 font-semibold">{record.pfa_code}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{record.employer_code || '-'}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs">
                            {new Date(record.created_at || '').toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgba(150,155,170,0.08)]">
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-[#D4900A] transition-colors mb-3" />
                <p className="mb-2 text-sm text-slate-600 font-semibold">
                  <span className="text-[#D4900A]">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">Excel or CSV (MAX. 10MB)</p>
              </div>
              <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            </label>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500">{parsedRecords.length} records parsed ready for review.</p>
                  </div>
                </div>
                <button 
                  onClick={clearUpload}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  title="Remove file"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {parsedRecords.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Preview Extracted Remittance</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm max-h-[400px] overflow-y-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Employee Name</th>
                          <th className="px-4 py-3">Staff ID</th>
                          <th className="px-4 py-3">RSA PIN</th>
                          <th className="px-4 py-3 text-center">Normal Contribution (Employee)</th>
                          <th className="px-4 py-3 text-center">Normal Contribution (Employer)</th>
                          <th className="px-4 py-3 text-center">Voluntary Contribution (Employee)</th>
                          <th className="px-4 py-3 text-center">Voluntary Contribution (Employer)</th>
                          <th className="px-4 py-3 text-center">Other</th>
                          <th className="px-4 py-3 text-center">Total Amount</th>
                          <th className="px-4 py-3">PFA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedRecords.slice(0, 10).map((record, i) => (
                          <tr key={i} className="bg-white hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{record.name_of_employee}</td>
                            <td className="px-4 py-3 text-slate-500">{record.staff_id || '-'}</td>
                            <td className="px-4 py-3 font-mono text-slate-500 text-xs">{record.rsa_pin}</td>
                            <td className="px-4 py-3 text-center font-mono text-slate-600">
                              {formatCurrency(record.normal_contribution_for_employee)}
                            </td>
                            <td className="px-4 py-3 text-center font-mono text-slate-600">
                              {formatCurrency(record.normal_contribution_for_employer)}
                            </td>
                            <td className="px-4 py-3 text-center font-mono text-slate-600">
                              {formatCurrency(record.voluntary_contribution_by_employee)}
                            </td>
                            <td className="px-4 py-3 text-center font-mono text-slate-600">
                              {formatCurrency(record.voluntary_contribution_by_employer)}
                            </td>
                            <td className="px-4 py-3 text-center font-mono text-slate-600">
                              {formatCurrency(record.other_contribution)}
                            </td>
                            <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                              {formatCurrency(record.total_amount)}
                            </td>
                            <td className="px-4 py-3 text-slate-600 font-semibold">{record.pfa_code}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {parsedRecords.length > 10 && (
                      <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-100">
                        Showing 10 of {parsedRecords.length} records...
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-2.5 bg-[#D4900A] hover:bg-[#B07608] text-white font-semibold rounded-xl transition-all shadow-md shadow-[#D4900A]/20 disabled:opacity-70"
                    >
                      <Database size={18} className="mr-2" />
                      {isSubmitting ? 'Saving to Database...' : `Submit ${parsedRecords.length} Records`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
