import { ArrowRight, Target, Shield, Zap } from "lucide-react";
import { siteContent } from "../data/siteContent";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1B5EA7]/5 -skew-x-12 translate-x-1/2" aria-hidden="true" />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/geranium about us.jpg"
                alt="Geranium Limited Office/Team"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Mission Card */}
            <div className="absolute -bottom-8 -right-8 glass p-8 rounded-2xl shadow-xl max-w-xs animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#3D8B37]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#3D8B37]" />
                </div>
                <h3 className="font-display font-bold text-[#0B254A]">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {siteContent.about.mission}
              </p>
            </div>
          </div>

          {/* Right: Text side */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1B5EA7] text-xs font-bold uppercase tracking-widest self-start shadow-sm">
              About Geranium Limited
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#040D1A] leading-tight">
              A Legacy of <span className="text-[#1B5EA7]">Engineering Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {siteContent.about.story[0]}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#D4900A]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B254A]">Integrity First</h4>
                  <p className="text-sm text-slate-500 mt-1">Reliable solutions built on transparency and trust.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#3D8B37]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B254A]">Swift Delivery</h4>
                  <p className="text-sm text-slate-500 mt-1">Optimized workflows for on-time project completion.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
                  <img src="/images/geranium emblem.jpeg" alt="" className="w-24 h-24 grayscale" />
               </div>
               <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/geranium coo.png.jpeg"
                    alt="Folaranmi Esan"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#1B5EA7]/20"
                  />
                  <div>
                    <h4 className="font-display font-bold text-[#0B254A]">Folaranmi Esan</h4>
                    <p className="text-xs text-[#1B5EA7] font-semibold uppercase tracking-wider">Chief Operating Officer</p>
                  </div>
               </div>
               <p className="text-sm text-slate-500 italic leading-relaxed">
                 "{siteContent.about.coo.message}"
               </p>
               <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#1B5EA7] mt-4 hover:gap-3 transition-all">
                  Read Full Message <ArrowRight className="w-4 h-4" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
