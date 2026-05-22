import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight, Phone, ShieldCheck } from "lucide-react";

import { siteContent } from "../data/siteContent";
import { supabase } from "../lib/supabaseClient";

const { epcDivision, internationalDivision } = siteContent.services;

const serviceGroups = [
  {
    title: epcDivision.title,
    path: "/engineering",
    items: epcDivision.items.map(item => ({
      label: item.title,
      desc: item.desc,
      href: "/engineering",
      color: "text-[#1B5EA7]",
      bg: "bg-blue-50"
    }))
  },
  {
    title: internationalDivision.title,
    path: "/international",
    items: internationalDivision.items.map(item => ({
      label: item.title,
      desc: item.desc,
      href: item.title.includes("Pipeline") ? "/pipeline" : item.title.includes("Agri") ? "/agriculture" : "/international",
      color: item.title.includes("Pipeline") ? "text-[#3D8B37]" : "text-[#D4900A]",
      bg: item.title.includes("Pipeline") ? "bg-green-50" : "bg-amber-50"
    }))
  }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Reset menu state on path change during rendering to avoid synchronous setState inside useEffect
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roleData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        if (roleData && (roleData.role === 'admin' || roleData.role === 'super_admin')) {
          setIsAdmin(true);
          return;
        }
      }
      setIsAdmin(false);
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data: roleData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        if (roleData && (roleData.role === 'admin' || roleData.role === 'super_admin')) {
          setIsAdmin(true);
          return;
        }
      }
      setIsAdmin(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_24px_rgba(7,21,40,0.10)] border-b border-white/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to={isAdmin ? "/admin/dashboard" : "/"} 
              className="flex items-center gap-3 shrink-0" 
              aria-label="Geranium Limited home"
            >
              <img
                src="/images/geranium emblem.png"
                alt="Geranium Limited emblem"
                className="w-10 h-10 object-contain rounded-sm"
              />
              <div className="leading-tight">
                <div
                  className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
                    scrolled || location.pathname !== "/" ? "text-[#0B254A]" : "text-white"
                  }`}
                >
                  Geranium <span className="text-[#D4900A]">Limited</span>
                </div>
                <div
                  className={`text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                    scrolled || location.pathname !== "/" ? "text-[#5D8CCF]" : "text-white/60"
                  }`}
                >
                  Your reliable solution partner
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {/* Services mega menu trigger */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    scrolled || location.pathname !== "/"
                      ? "text-[#0B254A] hover:bg-[#EEF3FA]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu */}
                {servicesOpen && (
                  <>
                    {/* Transparent Bridge to prevent hover loss */}
                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                    
                    <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(7,21,40,0.15)] border border-slate-100 p-8 grid grid-cols-2 gap-8 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {serviceGroups.map((group) => (
                        <div key={group.title} className="space-y-5">
                          <Link 
                            to={isAdmin ? "/admin/dashboard" : group.path}
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B5EA7] hover:text-[#D4900A] transition-colors px-2"
                          >
                            {group.title}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <div className="space-y-1">
                            {group.items.map((s) => (
                              <Link
                                key={s.label}
                                to={isAdmin ? "/admin/dashboard" : s.href}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${s.color.replace("text-", "bg-")} group-hover:scale-150 transition-transform`} />
                                <div className="text-sm font-semibold text-[#0B254A] group-hover:translate-x-1 transition-transform">
                                  {s.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {[
                { label: "About", href: "/about" },
                { label: "Executive Vision", href: "/leadership" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={isAdmin ? "/admin/dashboard" : link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    scrolled || location.pathname !== "/"
                      ? "text-[#0B254A] hover:bg-[#EEF3FA]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin ? (
                <>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
                    <ShieldCheck size={14} className="animate-pulse" />
                    Admin Session Active
                  </div>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 bg-[#0B254A] hover:bg-[#1B5EA7] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_16px_rgba(11,37,74,0.4)] cursor-pointer"
                  >
                    <span>Admin Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="tel:+2348000000000"
                    className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
                      scrolled ? "text-[#1B5EA7]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 bg-[#D4900A] hover:bg-[#B07608] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_16px_rgba(212,144,10,0.4)] cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                scrolled ? "text-[#0B254A] hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#040D1A]/60 backdrop-blur-md transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* Drawer */}
        <nav
          className={`absolute top-0 right-0 h-full w-full max-w-sm glass-dark shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <img src="/images/geranium emblem.png" alt="Geranium Limited" className="w-10 h-10 object-contain rounded-sm" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-white leading-none">
                  {isAdmin ? "Admin Portal" : "Geranium Limited"}
                </span>
                <span className="text-[8px] uppercase tracking-widest text-[#D4900A] mt-1">
                  {isAdmin ? "Secure Session Active" : "Premium Solutions"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 pt-12">
            <div className="flex flex-col space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Engineering Services", href: "/engineering" },
                { label: "Pipeline Maintenance", href: "/pipeline" },
                { label: "Agri-Sourcing", href: "/agriculture" },
                { label: "Project Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={isAdmin ? "/admin/dashboard" : link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <span className="text-xl font-display font-medium text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all">
                    {link.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#D4900A] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
