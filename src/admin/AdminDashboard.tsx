import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, Globe, Image, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import type { ActiveView, AdminUser } from './types';

import AdminSidebar from './components/AdminSidebar';
import AdminMobileDrawer from './components/AdminMobileDrawer';
import AdminHeader from './components/AdminHeader';
import DashboardOverview from './views/DashboardOverview';
import AdminUsersView from './views/AdminUsersView';
import SystemSettingsView from './views/SystemSettingsView';
import EmployeeRecordsView from './views/EmployeeRecordsView';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);
  const [fetchingAdmins, setFetchingAdmins] = useState(false);
  const [mathChallengeEnabled, setMathChallengeEnabled] = useState(true);
  const [phoneAliasEnabled, setPhoneAliasEnabled] = useState(true);
  const [dashboardFile, setDashboardFile] = useState<File | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);

  const isSuperAdmin = role === 'super_admin';

  // Refs for tracking values inside presence useEffect without stale closures
  const activeViewRef = useRef(activeView);
  const isSuperAdminRef = useRef(isSuperAdmin);
  const fetchAdminsRef = useRef<(() => Promise<void>) | null>(null);
  const presenceDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    activeViewRef.current = activeView;
  }, [activeView]);

  useEffect(() => {
    isSuperAdminRef.current = isSuperAdmin;
  }, [isSuperAdmin]);

  // ── Auth & settings load ───────────────────────────────────────────────────
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { navigate('/admin'); return; }

        setUser(session.user);

        const { data: roleData, error: roleError } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (roleError) throw roleError;

        if (!roleData || !['admin', 'super_admin'].includes(roleData.role)) {
          await supabase.auth.signOut();
          navigate('/admin');
          return;
        }
        setRole(roleData.role);

        // Stamp last_seen (non-critical — soft fail)
        await supabase
          .from('admin_roles')
          .update({ last_seen: new Date().toISOString() })
          .eq('user_id', session.user.id);

        // Load global system settings (non-critical — soft fail)
        const { data: settings } = await supabase
          .from('system_settings')
          .select('key, value')
          .in('key', ['math_challenge_enabled', 'phone_alias_enabled']);

        settings?.forEach(({ key, value }) => {
          if (key === 'math_challenge_enabled') setMathChallengeEnabled(value === 'true' || value === true);
          if (key === 'phone_alias_enabled') setPhoneAliasEnabled(value === 'true' || value === true);
        });
      } catch (err) {
        const error = err as Error;
        console.error("Dashboard checkUser failed:", error);
        toast.error(error.message || "Session verification failed. Redirecting to login...");
        await supabase.auth.signOut();
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  // ── Live Presence tracking ──────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel('online-admins', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const activeIds = Object.keys(state);
        setOnlineUserIds(activeIds);

        // Auto-refresh admins list if the current admin is viewing the Users list
        if (activeViewRef.current === 'users' && isSuperAdminRef.current) {
          if (presenceDebounceTimerRef.current) {
            clearTimeout(presenceDebounceTimerRef.current);
          }
          presenceDebounceTimerRef.current = setTimeout(() => {
            if (fetchAdminsRef.current) {
              fetchAdminsRef.current();
            }
          }, 1500);
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      if (presenceDebounceTimerRef.current) {
        clearTimeout(presenceDebounceTimerRef.current);
      }
      supabase.removeChannel(channel);
    };
  }, [user]);

  // ── Fetch admin users ──────────────────────────────────────────────────────
  const fetchAdmins = useCallback(async () => {
    setFetchingAdmins(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_users');
      if (error) throw error;
      setAdminsList(data || []);
     } catch (err) {
      toast.error((err as Error).message || 'Error fetching admins');
    } finally {
      setFetchingAdmins(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminsRef.current = fetchAdmins;
  }, [fetchAdmins]);

  useEffect(() => {
    if (activeView === 'users' && isSuperAdmin) {
      const timer = setTimeout(() => {
        fetchAdmins();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeView, isSuperAdmin, fetchAdmins]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleUpdateRole = async (targetUserId: string, newRole: string) => {
    try {
      const { error } = await supabase.rpc('update_admin_role', { target_user_id: targetUserId, new_role: newRole });
      if (error) throw error;
      toast.success(`Role updated to ${newRole.replace('_', ' ')}`);
      fetchAdmins();
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update role');
    }
  };

  const handleToggleSetting = async (key: string, currentValue: boolean) => {
    const newValue = !currentValue;
    if (key === 'math_challenge_enabled') setMathChallengeEnabled(newValue);
    if (key === 'phone_alias_enabled') setPhoneAliasEnabled(newValue);
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ value: String(newValue) })
        .eq('key', key);
      if (error) throw error;
      toast.success('Setting updated.');
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update setting');
      if (key === 'math_challenge_enabled') setMathChallengeEnabled(currentValue);
      if (key === 'phone_alias_enabled') setPhoneAliasEnabled(currentValue);
    }
  };

  const handleUpdateUserSetting = async (targetUserId: string, key: string, currentValue: boolean) => {
    const newValue = !currentValue;
    setAdminsList(prev => prev.map(a => a.user_id === targetUserId ? { ...a, [key]: newValue } : a));
    try {
      const { error } = await supabase.rpc('update_admin_user_settings', {
        target_user_id: targetUserId, setting_key: key, setting_value: newValue,
      });
      if (error) throw error;
      toast.success('User setting updated.');
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update user setting');
      setAdminsList(prev => prev.map(a => a.user_id === targetUserId ? { ...a, [key]: currentValue } : a));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out.');
    navigate('/admin');
  };

  const formatIdentifier = (email: string) => {
    if (!email) return 'N/A';
    if (email.endsWith('@phone.local')) {
      const phone = email.replace('@phone.local', '');
      return phone.length > 4 ? `${phone.slice(0, 3)}*****${phone.slice(-3)}` : phone;
    }
    const [local] = email.split('@');
    return local.length > 3 ? `${local.slice(0, 3)}${'*'.repeat(local.length - 3)}@...` : `${local}@...`;
  };

  const handlePublicLinkClick = () => {
    toast('Sign out first to visit public pages.', { icon: '⚠️' });
  };

  const publicLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About Us', href: '/about', icon: Info },
    { label: 'Engineering', href: '/engineering', icon: Globe },
    { label: 'Agri-Sourcing', href: '/agriculture', icon: Globe },
    { label: 'Project Gallery', href: '/gallery', icon: Image },
    { label: 'Contact Us', href: '/#contact', icon: Phone },
  ];

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFCFF] via-[#FFFDF9] to-[#F3F6FA] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#D4900A]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <img src="/images/geranium emblem.png" alt="Geranium" className="w-12 h-12 object-contain animate-pulse filter drop-shadow-[0_0_10px_rgba(212,144,10,0.4)]" />
          <div className="w-10 h-10 border-2 border-[#D4900A] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // ── Layout ─────────────────────────────────────────────────────────────────
  const sharedNav = { activeView, setActiveView, isSuperAdmin, publicLinks, handlePublicLinkClick, handleSignOut };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-hidden selection:bg-[#D4900A] selection:text-white">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4900A]/6 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B5EA7]/4 rounded-full translate-y-1/4 -translate-x-1/4 blur-3xl pointer-events-none" />

      <AdminSidebar {...sharedNav} />
      <AdminMobileDrawer mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} {...sharedNav} />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <AdminHeader setMobileMenuOpen={setMobileMenuOpen} activeView={activeView} user={user} role={role} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeView === 'overview' && (
            <DashboardOverview 
              totalAdmins={adminsList.length} 
              setActiveView={setActiveView} 
              onFileSelect={(file) => {
                setDashboardFile(file);
                setActiveView('employees');
              }}
            />
          )}

          {activeView === 'users' && isSuperAdmin && (
            <AdminUsersView
              adminsList={adminsList}
              fetchingAdmins={fetchingAdmins}
              fetchAdmins={fetchAdmins}
              currentUserId={user?.id}
              handleUpdateRole={handleUpdateRole}
              handleUpdateUserSetting={handleUpdateUserSetting}
              formatIdentifier={formatIdentifier}
              onlineUserIds={onlineUserIds}
            />
          )}

          {activeView === 'settings' && isSuperAdmin && (
            <SystemSettingsView
              mathChallengeEnabled={mathChallengeEnabled}
              phoneAliasEnabled={phoneAliasEnabled}
              handleToggleSetting={handleToggleSetting}
            />
          )}

          {activeView === 'employees' && (
            <EmployeeRecordsView 
              initialFile={dashboardFile}
              onClearInitialFile={() => setDashboardFile(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
