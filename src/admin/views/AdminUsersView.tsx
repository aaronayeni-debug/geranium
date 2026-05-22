import React, { useState } from 'react';
import { 
  Search, RefreshCw, Mail, Clock,
  Lock, KeyRound, EyeOff, ShieldCheck, AlertOctagon
} from 'lucide-react';
import type { AdminUser } from '../types';

interface Props {
  adminsList: AdminUser[];
  fetchingAdmins: boolean;
  fetchAdmins: () => void;
  currentUserId: string | undefined;
  handleUpdateRole: (userId: string, newRole: string) => void;
  handleUpdateUserSetting: (userId: string, key: string, current: boolean) => void;
  formatIdentifier: (email: string) => string;
  onlineUserIds: string[];
}

// ── Mini Premium Toggle Switch ──────────────────────────────────────────────────
function Toggle({ 
  enabled, 
  onToggle, 
  label, 
  description, 
  icon: Icon 
}: { 
  enabled: boolean; 
  onToggle: () => void; 
  label: string; 
  description: string; 
  icon: React.ElementType; 
}) {
  return (
    <div className="flex items-center justify-between p-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all duration-200">
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg transition-colors ${enabled ? 'bg-[#D4900A]/10 text-[#D4900A]' : 'bg-slate-100 text-slate-400'}`}>
          <Icon size={14} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-700">{label}</span>
          <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{description}</span>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-all duration-300 shadow-inner relative cursor-pointer ${
          enabled ? 'bg-gradient-to-r from-[#D4900A] to-[#B07608]' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
          enabled ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
}

// ── Last Seen formatter ────────────────────────────────────────────────────────
function formatLastSeen(lastSeen: string | null, isOnline: boolean): { text: string; isOnline: boolean } {
  if (isOnline) return { text: 'Online now', isOnline: true };
  if (!lastSeen) return { text: 'Never', isOnline: false };

  const diff = Date.now() - new Date(lastSeen).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return { text: 'Just now', isOnline: false };
  if (mins < 60) return { text: `${mins}m ago`, isOnline: false };
  if (hours < 24) return { text: `${hours}h ago`, isOnline: false };
  if (days < 7) return { text: `${days}d ago`, isOnline: false };
  return { text: new Date(lastSeen).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), isOnline: false };
}

// ── Premium User Avatar ────────────────────────────────────────────────────────
function UserAvatar({ firstName, lastName, role, isOnline }: { firstName: string; lastName: string; role: string; isOnline: boolean }) {
  const initials = ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || 'U';
  
  const ringStyles: Record<string, string> = {
    super_admin: 'ring-[#D4900A]/40 bg-gradient-to-tr from-[#D4900A] to-[#F1C40F] text-white',
    admin: 'ring-blue-400/40 bg-gradient-to-tr from-[#1B5EA7] to-blue-400 text-white',
    restricted: 'ring-amber-400/40 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white',
    banned: 'ring-rose-400/40 bg-gradient-to-tr from-rose-600 to-red-400 text-white',
  };

  return (
    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold ring-2 ring-offset-1 shadow-md ${ringStyles[role] ?? ringStyles.banned}`}>
      {initials}
      <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white transition-colors duration-300 ${isOnline ? 'bg-emerald-400' : 'bg-slate-400'}`} />
    </div>
  );
}

// ── Custom Premium SVG Inline Icons ───────────────────────────────────────────
const CrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14a1 1 0 0 1 1 1v1H4v-1a1 1 0 0 1 1-1z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const BanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const DemoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

// ── Role Badge ─────────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const configs: Record<string, { label: string; mobileLabel: string; style: string; icon: React.ReactNode }> = {
    super_admin: {
      label: 'Super Admin',
      mobileLabel: 'S-Admin',
      style: 'bg-amber-50 text-amber-700 border-amber-200/80',
      icon: <CrownIcon />
    },
    admin: {
      label: 'Admin',
      mobileLabel: 'Admin',
      style: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: <LockIcon />
    },
    restricted: {
      label: 'Restricted',
      mobileLabel: 'Restr.',
      style: 'bg-orange-50 text-orange-700 border-orange-200/80',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
    },
    banned: {
      label: 'Banned',
      mobileLabel: 'Banned',
      style: 'bg-rose-50 text-rose-700 border-rose-200/80',
      icon: <BanIcon />
    },
  };

  const current = configs[role] || configs.banned;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shadow-sm shrink-0 whitespace-nowrap ${current.style}`}>
      {current.icon}
      <span className="ml-1 hidden sm:inline">{current.label}</span>
      <span className="ml-1 sm:hidden inline">{current.mobileLabel}</span>
    </span>
  );
}

// ── Role Action Buttons ────────────────────────────────────────────────────────
function RoleActions({ admin, currentUserId, handleUpdateRole }: Pick<Props, 'handleUpdateRole' | 'currentUserId'> & { admin: AdminUser }) {
  if (admin.user_id === currentUserId) return null;

  const btn = (onClick: () => void, cls: string, icon: React.ReactNode, text: string) => (
    <button 
      onClick={onClick} 
      className={`px-3 py-1.5 rounded-md transition-all duration-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm border cursor-pointer hover:bg-slate-50 hover:border-slate-300 active:scale-95 ${cls}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {admin.role === 'admin' && (<>
        {btn(
          () => handleUpdateRole(admin.user_id, 'super_admin'), 
          'bg-white text-slate-800 border-slate-200 hover:text-slate-900 hover:bg-slate-50', 
          <CrownIcon />, 
          'Promote'
        )}
        {btn(
          () => handleUpdateRole(admin.user_id, 'restricted'), 
          'bg-white text-amber-700 border-amber-200 hover:bg-amber-50/20 hover:border-amber-300', 
          <LockIcon />, 
          'Restrict'
        )}
        {btn(
          () => handleUpdateRole(admin.user_id, 'banned'), 
          'bg-white text-rose-600 border-rose-200 hover:bg-rose-50/20 hover:border-rose-300', 
          <BanIcon />, 
          'Ban'
        )}
      </>)}

      {admin.role === 'restricted' && (<>
        {btn(
          () => handleUpdateRole(admin.user_id, 'admin'), 
          'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 hover:border-emerald-800 shadow-sm', 
          <CheckIcon />, 
          'Restore'
        )}
        {btn(
          () => handleUpdateRole(admin.user_id, 'banned'), 
          'bg-white text-rose-600 border-rose-200 hover:bg-rose-50/20 hover:border-rose-300', 
          <BanIcon />, 
          'Ban'
        )}
      </>)}

      {admin.role === 'banned' &&
        btn(
          () => handleUpdateRole(admin.user_id, 'admin'), 
          'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 hover:border-emerald-800 shadow-sm', 
          <CheckIcon />, 
          'Restore / Unban'
        )}

      {admin.role === 'super_admin' &&
        btn(
          () => handleUpdateRole(admin.user_id, 'admin'), 
          'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300', 
          <DemoteIcon />, 
          'Demote to Admin'
        )}
    </div>
  );
}

// ── Security Toggles (Shared) ──────────────────────────────────────────────────
function SecurityToggles({ admin, currentUserId, handleUpdateUserSetting }: Pick<Props, 'handleUpdateUserSetting' | 'currentUserId'> & { admin: AdminUser }) {
  if (admin.user_id === currentUserId) return <span className="text-[10px] text-slate-400 italic font-medium px-2 py-1 bg-slate-50 rounded-lg">N/A (Your Session)</span>;
  return (
    <div className="flex flex-col gap-2 max-w-[240px]">
      <Toggle
        label="Math Challenge Gate"
        description="Verify math challenge on login"
        enabled={admin.math_challenge_enabled ?? true}
        icon={KeyRound}
        onToggle={() => handleUpdateUserSetting(admin.user_id, 'math_challenge_enabled', admin.math_challenge_enabled ?? true)}
      />
      <Toggle
        label="Phone Number Masking"
        description="Mask raw phone digits"
        enabled={admin.phone_alias_enabled ?? true}
        icon={EyeOff}
        onToggle={() => handleUpdateUserSetting(admin.user_id, 'phone_alias_enabled', admin.phone_alias_enabled ?? true)}
      />
    </div>
  );
}

// ── Main Dashboard View ─────────────────────────────────────────────────────────
export default function AdminUsersView({
  adminsList, fetchingAdmins, fetchAdmins, currentUserId,
  handleUpdateRole, handleUpdateUserSetting, formatIdentifier,
  onlineUserIds,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredAdmins = adminsList.filter((admin) => {
    const fullName = `${admin.first_name || ''} ${admin.last_name || ''}`.toLowerCase();
    const email = (admin.email || '').toLowerCase();
    const searchMatch = fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'all' || admin.role === selectedRole;
    return searchMatch && roleMatch;
  });

  const roleCounts = {
    all: adminsList.length,
    super_admin: adminsList.filter(a => a.role === 'super_admin').length,
    admin: adminsList.filter(a => a.role === 'admin').length,
    restricted: adminsList.filter(a => a.role === 'restricted').length,
    banned: adminsList.filter(a => a.role === 'banned').length,
  };

  const filterTabs = [
    { id: 'all', label: 'All Users', count: roleCounts.all },
    { id: 'super_admin', label: 'Super Admins', count: roleCounts.super_admin },
    { id: 'admin', label: 'Admins', count: roleCounts.admin },
    { id: 'restricted', label: 'Restricted', count: roleCounts.restricted },
    { id: 'banned', label: 'Banned', count: roleCounts.banned },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">


      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgba(150,155,170,0.06)] overflow-hidden">
        {/* Table Header / Action Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="text-[#D4900A]" size={20} />
                Administrator Directory
              </h2>
              <p className="text-xs text-slate-500 mt-1">Review active system users, manage access credentials, and enforce multi-factor security rules.</p>
            </div>
            
            <button
              onClick={fetchAdmins}
              disabled={fetchingAdmins}
              className="flex items-center gap-2 px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-bold tracking-wider uppercase border border-slate-200/50 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={12} className={fetchingAdmins ? 'animate-spin' : ''} />
              Refresh Directory
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4900A]/35 focus:border-[#D4900A] transition-all"
              />
            </div>

            {/* Segmented Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/80 border border-slate-200/40 rounded-xl w-fit">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRole(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedRole === tab.id
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    selectedRole === tab.id
                      ? 'bg-[#D4900A]/10 text-[#D4900A]'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {fetchingAdmins ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#D4900A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Loading administrative directory...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="py-20 text-center bg-slate-50/50">
            <AlertOctagon size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-600">No administrators match your current filter.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the search terms or choosing a different role filter tab.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedRole('all'); }} 
              className="mt-4 px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* ── Desktop Premium Table ───────────────────────────────────────── */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Administrator</th>
                    <th className="px-6 py-4">Security Credentials</th>
                    <th className="px-6 py-4">Directory Status</th>
                    <th className="px-6 py-4">Security Enforcement Gateways</th>
                    <th className="px-6 py-4 text-right">Access Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.user_id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Name/Avatar block */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar firstName={admin.first_name} lastName={admin.last_name} role={admin.role} isOnline={onlineUserIds.includes(admin.user_id)} />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                              {admin.first_name || 'N/A'} {admin.last_name || ''}
                              {admin.user_id === currentUserId && (
                                <span className="inline-flex items-center text-[9px] bg-[#D4900A]/10 text-[#D4900A] px-2 py-0.5 rounded-full border border-[#D4900A]/20 font-extrabold uppercase tracking-wider">You</span>
                              )}
                            </span>
                            {(() => {
                              const ls = formatLastSeen(admin.last_seen ?? null, onlineUserIds.includes(admin.user_id));
                              return (
                                <span className={`text-[10px] font-medium flex items-center gap-1 ${
                                  ls.isOnline ? 'text-emerald-500' : 'text-slate-400'
                                }`}>
                                  {ls.isOnline
                                    ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                    : <Clock size={10} />}
                                  {ls.text}
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                      </td>
                      
                      {/* Email address */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                          <Mail size={13} className="text-slate-400" />
                          {formatIdentifier(admin.email)}
                        </div>
                      </td>

                      {/* Status Role */}
                      <td className="px-6 py-4">
                        <RoleBadge role={admin.role} />
                      </td>

                      {/* Security toggles */}
                      <td className="px-6 py-4">
                        <SecurityToggles admin={admin} currentUserId={currentUserId} handleUpdateUserSetting={handleUpdateUserSetting} />
                      </td>

                      {/* Role Actions */}
                      <td className="px-6 py-4 text-right">
                        <RoleActions admin={admin} currentUserId={currentUserId} handleUpdateRole={handleUpdateRole} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Premium Cards ────────────────────────────────────────── */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredAdmins.map((admin) => (
                <div
                  key={admin.user_id}
                  className="p-5 flex flex-col space-y-4 hover:bg-slate-50/20 transition-all duration-300"
                >
                  {/* Name + avatar + role badge */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar firstName={admin.first_name} lastName={admin.last_name} role={admin.role} isOnline={onlineUserIds.includes(admin.user_id)} />
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                          {admin.first_name || 'N/A'} {admin.last_name || ''}
                          {admin.user_id === currentUserId && (
                            <span className="text-[8px] bg-[#D4900A]/10 text-[#D4900A] px-2 py-0.5 rounded-full border border-[#D4900A]/20 font-bold uppercase tracking-wider">You</span>
                          )}
                        </p>
                        {(() => {
                          const ls = formatLastSeen(admin.last_seen ?? null, onlineUserIds.includes(admin.user_id));
                          return (
                            <p className={`text-[10px] font-medium flex items-center gap-1 ${
                              ls.isOnline ? 'text-emerald-500' : 'text-slate-400'
                            }`}>
                              {ls.isOnline
                                ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                : <Clock size={10} />}
                              {ls.text}
                            </p>
                          );
                        })()}
                        <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                          <Mail size={11} />
                          {formatIdentifier(admin.email)}
                        </p>
                      </div>
                    </div>
                    <RoleBadge role={admin.role} />
                  </div>

                  {/* Security toggles list */}
                  {admin.user_id !== currentUserId && (
                    <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2">
                      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Lock size={10} />
                        Security Enforcement
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 font-semibold">Math Challenge Gate</span>
                          <button
                            onClick={() => handleUpdateUserSetting(admin.user_id, 'math_challenge_enabled', admin.math_challenge_enabled ?? true)}
                            className={`w-9 h-5 rounded-full p-0.5 flex items-center shadow-inner transition-colors duration-200 cursor-pointer ${
                              (admin.math_challenge_enabled ?? true) ? 'bg-[#D4900A] justify-end' : 'bg-slate-300 justify-start'
                            }`}
                          >
                            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 font-semibold">Phone Number Masking</span>
                          <button
                            onClick={() => handleUpdateUserSetting(admin.user_id, 'phone_alias_enabled', admin.phone_alias_enabled ?? true)}
                            className={`w-9 h-5 rounded-full p-0.5 flex items-center shadow-inner transition-colors duration-200 cursor-pointer ${
                              (admin.phone_alias_enabled ?? true) ? 'bg-[#D4900A] justify-end' : 'bg-slate-300 justify-start'
                            }`}
                          >
                            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Role actions footer */}
                  {admin.user_id !== currentUserId && (
                    <div className="pt-2 flex justify-end">
                      <RoleActions admin={admin} currentUserId={currentUserId} handleUpdateRole={handleUpdateRole} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
