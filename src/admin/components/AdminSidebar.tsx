import { LayoutDashboard, Settings, Users, LogOut, FileText } from 'lucide-react';
import type { ActiveView, PublicLink } from '../types';

interface Props {
  activeView: ActiveView;
  setActiveView: (v: ActiveView) => void;
  isSuperAdmin: boolean;
  publicLinks: PublicLink[];
  handlePublicLinkClick: (e: React.MouseEvent, label: string) => void;
  handleSignOut: () => void;
}

const navBtn = (active: boolean) =>
  `flex items-center w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
    active
      ? 'bg-gradient-to-r from-[#D4900A] to-[#B07608] text-white shadow-md shadow-[#D4900A]/15 scale-[1.01]'
      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:translate-x-0.5'
  }`;

export default function AdminSidebar({
  activeView, setActiveView, isSuperAdmin, publicLinks, handlePublicLinkClick, handleSignOut,
}: Props) {
  return (
    <div className="hidden lg:flex w-66 bg-gradient-to-b from-[#FFFDF9] via-white to-[#F8FAFC] text-slate-800 flex-col border-r border-slate-200/80 shadow-[10px_0_30px_rgba(150,155,170,0.03)] shrink-0 z-20">
      {/* Branding */}
      <div className="p-6 flex items-center border-b border-slate-200/85 bg-[#FFFDF9]/90">
        <img
          src="/images/geranium emblem.png"
          alt="Geranium"
          className="w-10 h-10 object-contain mr-3 filter drop-shadow-[0_4px_8px_rgba(212,144,10,0.18)] animate-pulse"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-display font-extrabold tracking-tight text-slate-800">
            Geranium <span className="text-[#D4900A]">Admin</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#D4900A] font-bold">Secure Dashboard</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Secure Operations</p>

          <button onClick={() => setActiveView('overview')} className={navBtn(activeView === 'overview')}>
            <LayoutDashboard size={18} className="mr-3" />Dashboard
          </button>

          {isSuperAdmin && (
            <button onClick={() => setActiveView('users')} className={navBtn(activeView === 'users')}>
              <Users size={18} className="mr-3" />Manage Users
            </button>
          )}

          <button onClick={() => setActiveView('employees')} className={navBtn(activeView === 'employees')}>
            <FileText size={18} className="mr-3" />Employees
          </button>

          {isSuperAdmin && (
            <button onClick={() => setActiveView('settings')} className={navBtn(activeView === 'settings')}>
              <Settings size={18} className="mr-3" />Settings
            </button>
          )}
        </div>

        {/* Public website links */}
        <div className="space-y-1.5 pt-4 border-t border-slate-200/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Public Website Links</p>
          {publicLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <button
                key={link.label}
                onClick={(e) => handlePublicLinkClick(e, link.label)}
                className="flex items-center w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100/80 hover:text-[#D4900A] transition-all text-left group cursor-pointer"
              >
                <LinkIcon size={18} className="mr-3 text-slate-400 group-hover:text-[#D4900A] transition-colors" />
                {link.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/90">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-full px-4 py-3 text-red-600 hover:text-red-700 bg-red-500/10 hover:bg-red-500/15 border border-red-200 rounded-xl transition-all font-semibold text-sm cursor-pointer shadow-sm active:scale-95"
        >
          <LogOut size={16} className="mr-2" />Sign Out
        </button>
      </div>
    </div>
  );
}
