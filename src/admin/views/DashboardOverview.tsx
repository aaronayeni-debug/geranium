import React, { useRef } from 'react';
import { ShieldCheck, UploadCloud, Users } from 'lucide-react';
import type { ActiveView } from '../types';

interface Props {
  totalAdmins: number;
  setActiveView?: (view: ActiveView) => void;
  onFileSelect?: (file: File) => void;
}

export default function DashboardOverview({ totalAdmins, setActiveView, onFileSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <div className="p-3.5 bg-[#D4900A]/10 text-[#D4900A] rounded-xl shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              You are securely logged into the administrative portal. Manage operations, evaluate configurations, and oversee employee records.
            </p>
            
            {/* Quick Actions - Equal Width Grid */}
            {setActiveView && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                <button 
                  onClick={handleUploadClick}
                  className="flex items-center justify-center w-full px-4 py-3 bg-[#D4900A] hover:bg-[#B07608] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <UploadCloud size={18} className="mr-2" />
                  Upload Records
                </button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                />
                <button 
                  onClick={() => setActiveView('employees')}
                  className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <Users size={18} className="mr-2 text-slate-400" />
                  View Employees
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid - Removed Gateway Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center h-36 text-center shadow-sm">
          <p className="text-slate-500 font-medium mb-1 text-xs md:text-sm uppercase tracking-wider">Total Administrators</p>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-800">
            {totalAdmins > 0 ? totalAdmins : '1'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center h-36 text-center shadow-sm">
          <p className="text-slate-500 font-medium mb-1 text-xs md:text-sm uppercase tracking-wider">Active Portal Sessions</p>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-800">1</p>
        </div>
      </div>
    </div>
  );
}
