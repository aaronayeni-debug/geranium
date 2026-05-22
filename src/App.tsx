import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/ContactSection";
import { Home } from "./Home";
import { AboutPage } from "./AboutPage";
import { CooMessagePage } from "./CooMessagePage";
import { GalleryPage } from "./GalleryPage";
import { EngineeringPage } from "./EngineeringPage";
import { PipelinePage } from "./PipelinePage";
import { AgriculturePage } from "./AgriculturePage";
import { SpecializedServicesPage } from "./SpecializedServicesPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import { supabase } from "./lib/supabaseClient";

import { ScrollToHashElement } from "./components/ScrollToHashElement";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // One-time guard: if a logged-in admin lands on a public page, push them to the dashboard.
    // Runs only on mount — the auth listener below handles subsequent events.
    const handleInitialGuard = async () => {
      if (window.location.pathname.startsWith('/admin')) return; // let /admin and /admin/dashboard handle themselves
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: roleData } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (roleData && (roleData.role === 'admin' || roleData.role === 'super_admin')) {
        navigate('/admin/dashboard', { replace: true });
      }
    };

    handleInitialGuard();

    // Stable auth listener — not tied to location changes to avoid repeated subscriptions.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) return;
      if (window.location.pathname.startsWith('/admin')) return; // already in admin space

      const { data: roleData } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (roleData && (roleData.role === 'admin' || roleData.role === 'super_admin')) {
        navigate('/admin/dashboard', { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Mount-only: auth listener is stable, initial guard runs once

  return (
    <>
      <ScrollToHashElement />
      <Toaster position="top-right" />
      <div className="min-h-screen bg-white">
        {!isAdminRoute && <Navbar />}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/leadership" element={<CooMessagePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/engineering" element={<EngineeringPage />} />
            <Route path="/pipeline" element={<PipelinePage />} />
            <Route path="/agriculture" element={<AgriculturePage />} />
            <Route path="/international" element={<SpecializedServicesPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;