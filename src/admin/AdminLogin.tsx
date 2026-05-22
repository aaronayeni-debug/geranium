import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Eye, EyeOff, LayoutDashboard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function formatNigerianPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

function PasswordRule({ met, text }: { met: boolean; text: string }) {
  return (
    <span className={`flex items-center text-[11px] ${met ? 'text-green-600 font-semibold' : 'text-slate-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 transition-colors ${met ? 'bg-green-500' : 'bg-slate-300'}`} />
      {text}
    </span>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  // Login state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpIdentifier, setSignUpIdentifier] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Auth challenge state
  const [loading, setLoading] = useState(false);
  const [challengeQuestion, setChallengeQuestion] = useState('');
  const [challengeAnswer, setChallengeAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const [mathChallengeEnabled, setMathChallengeEnabled] = useState(true);
  const [existingSessionUser, setExistingSessionUser] = useState<any>(null);
  const [checkingExistingSession, setCheckingExistingSession] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: roleRow, error: roleError } = await supabase
            .from('admin_roles').select('role')
            .eq('user_id', session.user.id).maybeSingle();
          if (!roleError && roleRow && (roleRow.role === 'admin' || roleRow.role === 'super_admin')) {
            setExistingSessionUser(session.user);
          } else {
            await supabase.auth.signOut();
          }
        }
        const { data } = await supabase.from('system_settings').select('key, value');
        if (data) {
          const s = data.find(x => x.key === 'math_challenge_enabled');
          if (s) setMathChallengeEnabled(s.value === 'true' || s.value === true);
        }
      } catch (err) {
        console.warn('Portal init error:', err);
      } finally {
        setCheckingExistingSession(false);
      }
    };
    init();
  }, []);

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let finalEmail = identifier.trim();
    if (!finalEmail.includes('@')) {
      finalEmail = `${finalEmail.replace(/[^0-9+]/g, '')}@phone.local`;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: finalEmail, password });
      if (error) throw error;
      let userMathEnabled = mathChallengeEnabled;
      if (data.session) {
        const { data: roleRow } = await supabase.from('admin_roles')
          .select('math_challenge_enabled').eq('user_id', data.session.user.id).maybeSingle();
        if (roleRow && typeof roleRow.math_challenge_enabled === 'boolean') {
          userMathEnabled = roleRow.math_challenge_enabled;
        }
      }
      if (userMathEnabled) {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setChallengeQuestion(`What is ${n1} + ${n2}?`);
        setChallengeAnswer(n1 + n2);
      } else {
        toast.success('Access Granted! Welcome Admin.');
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials or account does not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (parseInt(userAnswer) === challengeAnswer) {
        toast.success('Access Granted! Welcome Admin.');
        setChallengeQuestion(''); setUserAnswer('');
        navigate('/admin/dashboard');
      } else {
        throw new Error('Incorrect answer to security challenge.');
      }
    } catch (err: any) {
      toast.error(err.message);
      await supabase.auth.signOut();
      setChallengeQuestion(''); setUserAnswer('');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let finalEmail = signUpIdentifier.trim();
    const isPhone = !finalEmail.includes('@');
    if (isPhone) finalEmail = `${finalEmail.replace(/[^0-9+]/g, '')}@phone.local`;
    try {
      const { error } = await supabase.auth.signUp({
        email: finalEmail, password: signUpPassword,
        options: { data: { first_name: firstName, last_name: lastName, phone: isPhone ? signUpIdentifier : null } },
      });
      if (error) throw error;
      toast.success('Registration successful!');
      if (mathChallengeEnabled) {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setIsSignUp(false);
        setChallengeQuestion(`What is ${n1} + ${n2}?`);
        setChallengeAnswer(n1 + n2);
      } else {
        setIsSignUp(false);
        navigate('/admin/dashboard');
      }
      setFirstName(''); setLastName(''); setSignUpIdentifier(''); setSignUpPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };



  const inputCls = 'w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#D4900A]/60 focus:border-[#D4900A] outline-none text-slate-800 placeholder-slate-400 text-sm transition-all shadow-sm';
  const labelCls = 'block text-[11px] font-bold text-slate-500 mb-1.5 tracking-wider uppercase';

  // ── Background wrapper ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFCFF] via-[#FFFDF9] to-[#F3F6FA] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#D4900A] selection:text-white">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[#1B5EA7]/5 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[#D4900A]/6 blur-[160px]" />
      </div>

      {/* ── Checking session ────────────────────────────────────────────────── */}
      {checkingExistingSession ? (
        <div className="relative z-10 flex flex-col items-center gap-5">
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-white/80 border border-[#D4900A]/40 flex items-center justify-center p-4 shadow-[0_8px_30px_rgba(212,144,10,0.15)] backdrop-blur-md"
          >
            <img src="/images/geranium emblem.png" alt="Geranium" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(212,144,10,0.4)]" />
          </motion.div>
          <p className="text-slate-500 font-bold tracking-widest text-xs uppercase animate-pulse">Verifying Session…</p>
        </div>

      /* ── Existing session bypass ──────────────────────────────────────────── */
      ) : existingSessionUser ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-[0_20px_60px_rgba(150,155,170,0.15)] p-8 text-center z-10 flex flex-col items-center"
        >
          <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-[#FFFDF9] border border-[#D4900A]/40 flex items-center justify-center p-3.5 shadow-[0_8px_30px_rgba(212,144,10,0.15)] mb-5">
            <img src="/images/geranium emblem.png" alt="Geranium" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(212,144,10,0.3)]" />
          </motion.div>
          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider mb-4 border border-emerald-100 uppercase">⚡ Secure Session Active</span>
          <h2 className="text-xl font-extrabold text-slate-800 mb-1">Welcome Back!</h2>
          <p className="text-slate-500 text-xs mb-1">Currently signed in as:</p>
          <p className="font-bold text-slate-700 text-sm break-all mb-6">
            {existingSessionUser.email?.endsWith('@phone.local')
              ? existingSessionUser.email.replace('@phone.local', '')
              : existingSessionUser.email}
          </p>
          <div className="w-full space-y-3">
            <button onClick={() => navigate('/admin/dashboard')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D4900A] to-[#B07608] hover:from-[#B07608] hover:to-[#916005] text-white font-bold shadow-md shadow-[#D4900A]/20 transition-all text-sm cursor-pointer">
              <LayoutDashboard size={16} /> Go to Dashboard
            </button>
            <button onClick={async () => { setLoading(true); await supabase.auth.signOut(); setExistingSessionUser(null); setLoading(false); toast.success('Signed out.'); }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold border border-slate-200 transition-all text-sm cursor-pointer disabled:opacity-50">
              <LogOut size={15} /> {loading ? 'Clearing…' : 'Sign Out / Switch Account'}
            </button>
          </div>
        </motion.div>

      /* ── Main split card ─────────────────────────────────────────────────── */
      ) : (
        <div className="relative w-full max-w-4xl min-h-[580px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(150,155,170,0.2)] overflow-hidden flex flex-col md:flex-row z-10">

          {/* ── Dark panel — order swaps via CSS, content fades ── */}
          <div className={`relative hidden md:flex w-full md:w-5/12 bg-gradient-to-br from-[#0A1C36] via-[#122A4E] to-[#071324] flex-col items-center justify-center p-10 text-center text-white transition-all duration-500 ${isSignUp ? 'md:order-first' : 'md:order-last'}`}>
            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D4900A]/8 blur-3xl" />
            </div>

            <div className="relative z-10 flex items-center justify-center mb-8">
              <img src="/images/geranium emblem.png" alt="Geranium" className="w-10 h-10 object-contain mr-3 filter drop-shadow-[0_0_10px_rgba(212,144,10,0.3)] animate-pulse" />
              <span className="text-2xl font-bold tracking-widest uppercase bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Geranium</span>
            </div>

            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div key="dark-signin" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="relative z-10">
                  <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Welcome Back!</h2>
                  <p className="text-gray-300 mb-8 text-sm leading-relaxed">Already have an admin account?<br />Sign in securely.</p>
                  <button onClick={() => setIsSignUp(false)}
                    className="px-10 py-3 rounded-full border border-[#D4900A] text-[#D4900A] font-semibold hover:bg-[#D4900A] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(212,144,10,0.15)] cursor-pointer text-sm">
                    Sign In
                  </button>
                </motion.div>
              ) : (
                <motion.div key="dark-signup" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="relative z-10">
                  <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">New Administrator?</h2>
                  <p className="text-gray-300 mb-8 text-sm leading-relaxed">Register a secure profile to<br />access the administrative tools.</p>
                  <button onClick={() => setIsSignUp(true)}
                    className="px-10 py-3 rounded-full border border-[#D4900A] text-[#D4900A] font-semibold hover:bg-[#D4900A] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(212,144,10,0.15)] cursor-pointer text-sm">
                    Create Account
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── White form panel ───────────────────────────────────────────── */}
          <div className={`w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12 bg-white ${isSignUp ? 'md:order-last' : 'md:order-first'}`}>
            <AnimatePresence mode="wait">

              {/* Security challenge */}
              {challengeQuestion ? (
                <motion.div key="challenge" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }} className="max-w-sm mx-auto w-full">
                  <div className="text-center mb-6">
                    <span className="inline-block bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border border-amber-100 uppercase">⚠️ Verification Required</span>
                    <h2 className="text-xl font-bold text-slate-800 mt-4 mb-1">Security Challenge</h2>
                    <p className="text-slate-600 text-sm font-semibold">{challengeQuestion}</p>
                  </div>
                  <form onSubmit={handleVerifyChallenge} className="space-y-4">
                    <input type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)}
                      className={`${inputCls} text-center text-2xl font-bold tracking-widest`} placeholder="0" required />
                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-semibold transition-all disabled:opacity-70 shadow-md cursor-pointer text-sm">
                      {loading ? 'Verifying…' : 'Verify Access'}
                    </button>
                  </form>
                </motion.div>

              /* Sign In form */
              ) : !isSignUp ? (
                <motion.div key="signin" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }} className="max-w-sm mx-auto w-full">
                  {/* Mobile emblem */}
                  <div className="mb-6 flex flex-col items-center md:hidden">
                    <div className="w-14 h-14 rounded-full bg-[#FFFDF9] border border-[#D4900A]/40 flex items-center justify-center p-3 shadow-[0_8px_30px_rgba(212,144,10,0.12)] mb-2">
                      <img src="/images/geranium emblem.png" alt="Geranium" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(212,144,10,0.3)]" />
                    </div>
                    <span className="text-xl font-extrabold text-slate-800 tracking-widest uppercase">Geranium</span>
                    <span className="text-[10px] text-[#D4900A] tracking-widest uppercase font-bold mt-0.5">Secure Admin Portal</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-800 mb-1 hidden md:block">Sign In</h2>
                  <p className="text-slate-500 text-sm mb-7 hidden md:block">Enter administrative credentials below</p>

                  <form onSubmit={handleInitialLogin} className="space-y-4">
                    <div>
                      <label className={labelCls}>Email or Phone <span className="text-red-400">*</span></label>
                      <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)}
                        onBlur={() => { if (identifier && !identifier.includes('@')) setIdentifier(formatNigerianPhone(identifier)); }}
                        className={inputCls} placeholder="Enter phone or email" required autoComplete="username" />
                    </div>
                    <div>
                      <label className={labelCls}>Password <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                          className={`${inputCls} pr-10`} placeholder="••••••••" required autoComplete="current-password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D4900A] transition-colors cursor-pointer">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-[#D4900A] focus:ring-[#D4900A]" /> Remember me
                      </label>
                      <a href="#" className="text-[#D4900A] hover:text-[#B07608] font-semibold hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4900A] to-[#B07608] hover:from-[#B07608] hover:to-[#916005] text-white font-bold shadow-md shadow-[#D4900A]/20 transition-all duration-300 disabled:opacity-70 text-sm cursor-pointer mt-1">
                      {loading ? 'Securing Link…' : 'Sign In'}
                    </button>
                    <p className="text-center text-sm text-slate-500 md:hidden mt-2">
                      New Administrator?{' '}
                      <button type="button" onClick={() => setIsSignUp(true)} className="text-[#D4900A] font-bold hover:underline cursor-pointer">Create Account</button>
                    </p>
                  </form>
                </motion.div>

              /* Sign Up form */
              ) : (
                <motion.div key="signup" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }} className="max-w-md mx-auto w-full">
                  {/* Mobile emblem */}
                  <div className="mb-6 flex flex-col items-center md:hidden">
                    <div className="w-14 h-14 rounded-full bg-[#FFFDF9] border border-[#D4900A]/40 flex items-center justify-center p-3 shadow-[0_8px_30px_rgba(212,144,10,0.12)] mb-2">
                      <img src="/images/geranium emblem.png" alt="Geranium" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(212,144,10,0.3)]" />
                    </div>
                    <span className="text-xl font-extrabold text-slate-800 tracking-widest uppercase">Geranium</span>
                    <span className="text-[10px] text-[#D4900A] tracking-widest uppercase font-bold mt-0.5">Secure Admin Portal</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Create Account</h2>
                  <p className="text-slate-500 text-sm mb-6">Register for secure administrative access</p>

                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* 2×2 grid: row 1 = First / Last, row 2 = Email / Password */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>First name <span className="text-red-400">*</span></label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputCls} placeholder="First" required autoComplete="given-name" />
                      </div>
                      <div>
                        <label className={labelCls}>Last name <span className="text-red-400">*</span></label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputCls} placeholder="Last" required autoComplete="family-name" />
                      </div>
                      <div>
                        <label className={labelCls}>Email or Phone <span className="text-red-400">*</span></label>
                        <input type="text" value={signUpIdentifier} onChange={e => setSignUpIdentifier(e.target.value)} className={inputCls} placeholder="Email or phone" required autoComplete="username" />
                      </div>
                      <div>
                        <label className={labelCls}>Password <span className="text-red-400">*</span></label>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)}
                            className={`${inputCls} pr-10`} placeholder="••••••••" required autoComplete="new-password" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D4900A] transition-colors cursor-pointer">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                      <PasswordRule met={signUpPassword.length >= 8} text="8 Characters" />
                      <PasswordRule met={/[!@#$%^&*(),.?":{}|<>]/.test(signUpPassword)} text="1 Symbol" />
                      <PasswordRule met={/\d/.test(signUpPassword)} text="1 Number" />
                      <PasswordRule met={/[a-z]/.test(signUpPassword)} text="Lowercase" />
                      <PasswordRule met={/[A-Z]/.test(signUpPassword)} text="Uppercase" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4900A] to-[#B07608] hover:from-[#B07608] hover:to-[#916005] text-white font-bold shadow-md shadow-[#D4900A]/20 transition-all duration-300 disabled:opacity-70 text-sm cursor-pointer">
                      {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                    <p className="text-center text-sm text-slate-500 md:hidden mt-2">
                      Already have an account?{' '}
                      <button type="button" onClick={() => setIsSignUp(false)} className="text-[#D4900A] font-bold hover:underline cursor-pointer">Sign In</button>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
