import { Menu } from 'lucide-react';
import type { ActiveView } from '../types';

interface Props {
  setMobileMenuOpen: (v: boolean) => void;
  activeView: ActiveView;
  user: any;
  role: string;
}

const viewTitle: Record<ActiveView, string> = {
  overview: 'Dashboard Overview',
  users: 'Administrator Directory',
  settings: 'System Configuration',
  employees: 'Employee Records',
};

export default function AdminHeader({ setMobileMenuOpen, activeView, user, role }: Props) {
  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/85 flex items-center justify-between px-5 md:px-8 shadow-[0_4px_24px_rgba(150,155,170,0.02)] shrink-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2.5 text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl lg:hidden transition-colors border border-slate-200 cursor-pointer"
        >
          <Menu size={22} className="text-[#D4900A]" />
        </button>

        {/* Desktop title */}
        <h1 className="text-xl md:text-2xl font-display font-extrabold text-slate-800 tracking-tight hidden lg:block">
          {viewTitle[activeView]}
        </h1>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <img src="/images/geranium emblem.png" alt="Geranium" className="w-8 h-8 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-slate-800 tracking-tight">Geranium</span>
            <span className="text-[8px] text-[#D4900A] font-extrabold tracking-widest uppercase mt-0.5">Portal</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile context badge */}
        <div className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 lg:hidden uppercase tracking-wider">
          {viewTitle[activeView].split(' ')[0]}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#D4900A] to-[#B07608] text-white font-extrabold shrink-0 border border-white/20 shadow-sm">
            {user?.user_metadata?.first_name?.charAt(0) || 'A'}
          </div>
          <div className="text-xs hidden sm:block leading-tight">
            <p className="font-bold text-slate-800">{user?.user_metadata?.first_name || 'Admin'} {user?.user_metadata?.last_name || ''}</p>
            <p className="text-[#D4900A] font-extrabold text-[10px] uppercase tracking-wider mt-0.5">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
