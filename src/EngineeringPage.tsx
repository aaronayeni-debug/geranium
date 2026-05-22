import { CheckCircle2, ArrowRight } from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { CustomIcons } from "./components/CustomIcons";

const reclamationServices = [
  {
    title: "1. Engineered Land Reclamation",
    desc: "Professional conversion of swampy, submerged, and unusable land into dry, structurally stable platforms suitable for residential, industrial, and commercial projects."
  },
  {
    title: "2. High-Volume Sharp Sand Supply & Filling",
    desc: "Reliable supply and controlled placement of sharp sand for mass filling and foundation preparation. Applications: Estate development, road sub-base, and structural foundation works."
  },
  {
    title: "3. Precision Sand Spreading, Grading & Compaction",
    desc: "Uniform leveling and accurate layering using modern earthmoving equipment. Deliverables: Proper elevation, drainage-ready slopes, and compaction-ready surfaces."
  },
  {
    title: "4. Specialized Swamp Development & Conversion",
    desc: "Our flagship service—complete transformation of wetlands through site inspection, strategic drainage planning, sand deposition, and final grading."
  }
];

const projectTypes = [
  { title: "Residential Estates", desc: "Stable platforms for large housing developments.", icon: CustomIcons.Blueprint },
  { title: "Industrial & Commercial Parks", desc: "High load-bearing land suitable for factories and logistics hubs.", icon: CustomIcons.Factory },
  { title: "Government & Infrastructure Projects", desc: "Schools, hospitals, roads, and public developments on reclaimed land.", icon: CustomIcons.LandReclamation },
  { title: "Agriculture & Aquacultural Centers", desc: "Transformation of wetlands into productive farmland or fish farming zones.", icon: CustomIcons.Agriculture },
];

export function EngineeringPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#0B254A] to-[#1B5EA7] py-10 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/geranium engineering img.jpeg')] bg-cover bg-center" />
        
        {/* Subtle Wavy Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200C200 100 400 300 700 200C1000 100 1200 300 1500 200" stroke="white" strokeWidth="1" opacity="0.4"/>
            <path d="M-100 250C200 150 400 350 700 250C1000 150 1200 350 1500 250" stroke="white" strokeWidth="1" opacity="0.2"/>
          </svg>
        </div>

        <div className="container-site relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
             Engineering Solutions for a Better Tomorrow
           </div>
           <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Land Reclamation & Sand Filling Experts</h1>
           <p className="text-xl text-white/80 max-w-3xl mx-auto">
             Transform Swampy, Waterlogged Land into Premium, Build-Ready Property.
           </p>
        </div>
      </section>

      {/* Main Intro */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0B254A 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B5EA7]/5 rounded-full blur-3xl" />
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[40px] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-[#0B254A]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src="/images/geranium engineering img.jpeg" alt="Land Reclamation" className="w-full h-auto" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0B254A] mb-6">
                From Swamp to <span className="text-[#1B5EA7]">Solid Ground</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Geranium Limited delivers engineered large-scale land reclamation and road filling solutions 
                trusted by residential estate developers, industrial investors, construction firms, and public infrastructure projects across Nigeria.
                We turn unusable terrain into stable, profitable foundations, efficiently, professionally, and responsibly. We build the future from the soil up.
              </p>
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-8">
                <h3 className="text-xl font-bold text-[#0B254A] mb-4 flex items-center gap-2">
                   <CustomIcons.Environment className="w-8 h-8 text-[#1B5EA7]" />
                   The Challenge We Solve
                </h3>
                <p className="text-sm text-slate-500 mb-4">Across Nigeria, vast areas of high-value land remain undeveloped due to:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Persistent flooding and swamp conditions.", 
                    "Weak soil bearing capacity.", 
                    "High water table and poor drainage.", 
                    "Long-term settlement and structural failure risks."
                  ].map((f, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 border border-slate-100 flex items-start gap-3">
                      <span className="leading-snug text-sm text-slate-600 relative z-10 group-hover:text-[#0B254A] transition-colors">{f}</span>
                      <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#1B5EA7]" />
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-600 leading-relaxed font-medium">
                  Without proper reclamation, projects suffer delays, cost overruns, regulatory challenges, and structural instability. Geranium Limited provides a permanent, engineered solution—enabling developers and investors to proceed with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Developers Choose Us */}
      <section className="py-10 bg-[#EEF3FA] relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none opacity-[0.04]">
          <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-64 md:h-[400px]">
             <path d="M-100 0 C 300 200, 600 -100, 1500 300 V 0 H -100 Z" stroke="#0B254A" strokeWidth="1" />
             <path d="M-100 0 C 300 300, 600 0, 1500 400 V 0 H -100 Z" stroke="#0B254A" strokeWidth="1.5" />
             <path d="M-100 0 C 300 400, 600 100, 1500 500 V 0 H -100 Z" stroke="#0B254A" strokeWidth="0.5" />
             <path d="M-100 0 C 200 100, 700 300, 1500 100 V 0 H -100 Z" stroke="#0B254A" strokeWidth="2" opacity="0.3"/>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-48 md:h-[400px] translate-y-1/4">
            <path d="M0 200 C 100 50, 200 350, 360 200 C 520 50, 620 350, 720 200 C 820 50, 920 350, 1080 200 C 1240 50, 1340 350, 1440 200" stroke="#0B254A" strokeWidth="1" />
            <path d="M0 200 C 150 -50, 250 450, 360 200 C 470 -50, 570 450, 720 200 C 870 -50, 970 450, 1080 200 C 1190 -50, 1290 450, 1440 200" stroke="#0B254A" strokeWidth="2" />
            <path d="M0 200 C 120 100, 240 300, 360 200 C 480 100, 600 300, 720 200 C 840 100, 960 300, 1080 200 C 1200 100, 1320 300, 1440 200" stroke="#0B254A" strokeWidth="1" />
            <path d="M0 200 C 80 150, 280 250, 360 200 C 440 150, 640 250, 720 200 C 800 150, 1000 250, 1080 200 C 1160 150, 1360 250, 1440 200" stroke="#0B254A" strokeWidth="0.5" />
            <path d="M0 200 C 180 -10, 180 410, 360 200 C 540 -10, 540 410, 720 200 C 900 -10, 900 410, 1080 200 C 1260 -10, 1260 410, 1440 200" stroke="#0B254A" strokeWidth="1.5" opacity="0.5" />
            <path d="M0 200 C 100 350, 260 50, 360 200 C 460 350, 620 50, 720 200 C 820 350, 980 50, 1080 200 C 1180 350, 1340 50, 1440 200" stroke="#0B254A" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1B5EA7]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

        <div className="container-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B254A] mb-4">Why Developers & Investors Choose Us</h2>
            <p className="text-slate-500">We don't just fill land—we engineer it to last with proven methods and heavy-duty capacity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Proven Field Experience", desc: "Successfully executed multi-hectare reclamation projects across difficult terrains.", color: "#1B5EA7", bg: "bg-[#1B5EA7]/10" },
              { title: "End-to-End Execution", desc: "From site inspection and soil assessment to final leveling and handover.", color: "#3D8B37", bg: "bg-[#3D8B37]/10" },
              { title: "High-Quality Sand Supply", desc: "Sourced exclusively from approved locations and tested for suitability.", color: "#D4900A", bg: "bg-[#D4900A]/10" },
              { title: "Heavy-Duty Capacity", desc: "Fleet capable of handling large-scale developments efficiently and on schedule.", color: "#1B5EA7", bg: "bg-[#1B5EA7]/10" },
              { title: "Eco-Responsible Operations", desc: "Drainage-focused reclamation methods that promote long-term land stability.", color: "#3D8B37", bg: "bg-[#3D8B37]/10" },
            ].map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-white p-8 transition-all duration-500 border border-slate-100 text-left">
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="text-5xl font-display font-black text-slate-100 transition-colors duration-500 group-hover:text-slate-200">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="relative z-10 flex flex-col justify-between h-[calc(100%-6rem)]">
                  <div>
                    <h4 className="text-xl font-bold text-[#0B254A] mb-3 leading-tight transition-colors duration-300" style={{ '--hover-color': feature.color } as any} onMouseEnter={(e) => e.currentTarget.style.color = feature.color} onMouseLeave={(e) => e.currentTarget.style.color = '#0B254A'}>{feature.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-body">{feature.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: feature.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1B5EA7 2px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4900A]/5 rounded-full blur-[80px]" />
        
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4900A]/10 text-[#D4900A] text-xs font-bold uppercase tracking-widest mb-4">
              Our Expertise
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0B254A]">Specialized Reclamation Services</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reclamationServices.map((s, i) => {
              const color = i % 2 === 0 ? "#1B5EA7" : "#D4900A";
              return (
                <div key={i} className="group relative overflow-hidden bg-slate-50 p-10 rounded-[2rem] border border-slate-100 transition-all duration-500">
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <span className="text-5xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-[#0B254A] mb-4 transition-colors duration-300" onMouseEnter={(e) => e.currentTarget.style.color = color} onMouseLeave={(e) => e.currentTarget.style.color = '#0B254A'}>{s.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-body">{s.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: color }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Types & Process */}
      <section className="py-10 bg-[#040D1A] text-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1B5EA7]/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4900A]/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Project Types */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Project Types We Serve</h2>
              <div className="space-y-6">
                {projectTypes.map((pt, i) => (
                  <div key={i} className="group relative overflow-hidden flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
                    <div className="relative z-10">
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#D4900A] transition-colors">{pt.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{pt.desc}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#D4900A]" />
                  </div>
                ))}
              </div>
            </div>

            {/* The Process */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Our Reclamation Process</h2>
              <div className="relative border-l-2 border-white/10 ml-6 space-y-10 pb-4">
                {[
                  { title: "Site Consultation & Assessment", desc: "Physical inspection, terrain evaluation, and documentation." },
                  { title: "Engineering & Planning", desc: "Planning fill volume estimation, reclamation methodology, and drainage design." },
                  { title: "Material Sourcing & Mobilization", desc: "Approved sharp sand supply and equipment deployment." },
                  { title: "Controlled Filling & Spreading", desc: "Layered deposition with precise leveling and monitoring." },
                  { title: "Quality Control & Handover", desc: "Final grading, inspection, and client walkthrough." }
                ].map((step, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#1B5EA7] border-4 border-[#040D1A]" />
                    <h4 className="text-lg font-bold text-white mb-2">{i+1}. {step.title}</h4>
                    <p className="text-white/60 text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-white/5 p-8 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold text-[#D4900A] mb-4">Why Our Approach Works</h4>
                <p className="text-white/70 text-sm mb-4">Unlike uncontrolled filling, our engineered method focuses on:</p>
                <ul className="grid grid-cols-2 gap-3 text-sm font-semibold text-white/90">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4900A]" /> Long-term soil stability</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4900A]" /> Reduced settlement risks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4900A]" /> Proper water flow mgmt</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4900A]" /> Constructed-ready land</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-white text-center relative overflow-hidden">
         {/* Background Art */}
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0B254A 1px, transparent 0)', backgroundSize: '24px 24px' }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[#1B5EA7]/5 rounded-[100px] blur-3xl" />
         
         <div className="container-site max-w-3xl relative z-10">
            <h2 className="text-4xl font-display font-bold text-[#0B254A] mb-6">Ready to Reclaim Your Land?</h2>
            <p className="text-lg text-slate-600 mb-10">
               Let Geranium Limited handle the most critical stage of your development—the ground itself. Contact us today for free professional site inspection, accurate volume and cost estimation, and expert project consultation.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[#D4900A] hover:bg-[#B07608] text-white font-bold px-10 py-4 rounded-full transition-all duration-200 hover:shadow-xl text-lg">
               Contact Our Experts <ArrowRight className="w-5 h-5" />
            </a>
         </div>
      </section>

      <ContactSection />
    </div>
  );
}

