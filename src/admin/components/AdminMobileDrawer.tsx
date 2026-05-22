import { LayoutDashboard, Settings, Users, LogOut, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ActiveView, PublicLink } from '../types';

interface Props {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
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

export default function AdminMobileDrawer({
  mobileMenuOpen, setMobileMenuOpen, activeView, setActiveView,
  isSuperAdmin, publicLinks, handlePublicLinkClick, handleSignOut,
}: Props) {
  const go = (view: ActiveView) => { setActiveView(view); setMobileMenuOpen(false); };

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: '0%' }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-66 bg-gradient-to-b from-[#FFFDF9] via-white to-[#F8FAFC] text-slate-800 flex flex-col z-50 shadow-2xl lg:hidden border-r border-slate-200/80"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-slate-200/80 bg-[#FFFDF9]">
              <div className="flex items-center">
                <img src="/images/geranium emblem.png" alt="Geranium" className="w-9 h-9 object-contain mr-3 filter drop-shadow-[0_4px_8px_rgba(212,144,10,0.15)] animate-pulse" />
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-extrabold text-slate-800">Geranium <span className="text-[#D4900A]">Admin</span></span>
                  <span className="text-[8px] uppercase tracking-widest text-[#D4900A] font-bold">Secure Portal</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Secure Operations</p>

                <button onClick={() => go('overview')} className={navBtn(activeView === 'overview')}>
                  <LayoutDashboard size={18} className="mr-3" />Dashboard
                </button>

                <button onClick={() => go('employees')} className={navBtn(activeView === 'employees')}>
                  <FileText size={18} className="mr-3" />Employee Records
                </button>

                {isSuperAdmin && (
                  <button onClick={() => go('users')} className={navBtn(activeView === 'users')}>
                    <Users size={18} className="mr-3" />Manage Users
                  </button>
                )}

                {isSuperAdmin && (
                  <button onClick={() => go('settings')} className={navBtn(activeView === 'settings')}>
                    <Settings size={18} className="mr-3" />Settings
                  </button>
                )}
              </div>

              {/* Public links */}
              <div className="space-y-1.5 pt-4 border-t border-slate-200/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Public Website Links</p>
                {publicLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={(e) => { setMobileMenuOpen(false); handlePublicLinkClick(e, link.label); }}
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
                onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                className="flex items-center justify-center w-full px-4 py-3 text-red-600 hover:text-red-700 bg-red-500/10 hover:bg-red-500/15 border border-red-200 rounded-xl transition-all font-semibold text-sm cursor-pointer shadow-sm"
              >
                <LogOut size={16} className="mr-2" />Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
