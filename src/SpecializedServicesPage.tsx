import { CheckCircle2 } from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { CustomIcons } from "./components/CustomIcons";

const synergyBenefits = [
  { title: "Dual-Continent Presence", desc: "Seamless operations bridging Nigeria's abundant resources with US market standards, regulatory expertise, and global distribution networks." },
  { title: "End-to-End Control", desc: "Full visibility and management from farm or mine to the final processed, certified product — minimizing risks and maximizing quality and margins." },
  { title: "Scalable Infrastructure", desc: "Phased expansion model that mitigates investment risk while enabling sustainable, long-term growth and adaptability to market demand." },
  { title: "Sustainability & Impact", desc: "Commitment to responsible practices that generate local employment, support communities, and meet stringent international ESG requirements." }
];

const infrastructureServices = [
  {
    icon: CustomIcons.RealEstate,
    title: "Real Estate Development (PPP)",
    desc: "Leveraging Public-Private Partnerships to address housing deficits. We deliver innovative, affordable housing and infrastructure solutions, delivering over 1,000 housing units annually to transform spaces into thriving communities."
  },
  {
    icon: CustomIcons.Toll,
    title: "Toll Infrastructure",
    desc: "Developing world-class toll infrastructure to enhance transportation networks. From design and construction to proactive maintenance, we ensure smooth, efficient travel experiences and reliable road networks."
  },
  {
    icon: CustomIcons.Pipeline,
    title: "Park & Pay Intelligent Transport",
    desc: "Modern mobility solutions including advanced traffic management systems, IoT integration for smart parking, and real-time data analysis to optimize urban transportation networks and generate sustainable revenue."
  }
];

const technicalServices = [
  {
    title: "SCADA & Automation",
    items: ["Real-time monitoring and control for facilities.", "PLC programming, robotics integration, and AI-driven maintenance.", "IoT-enabled diagnostics and data acquisition."]
  },
  {
    title: "DCS & LNG Facilities",
    items: ["Scalable and reliable control frameworks with HMI interfaces.", "Modular design of liquefaction plants and cryogenic heat exchangers.", "Compression station design and commissioning."]
  },
  {
    title: "Precision Management",
    items: ["End-to-End Maintenance & Reliability Support.", "Preventive & Predictive Maintenance to minimize shutdowns.", "Compliance & Asset Integrity documentation."]
  }
];

export function SpecializedServicesPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#040D1A] py-10 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/images/geranium service 1.jpeg')] bg-cover bg-center opacity-10" />
        
        {/* Subtle Wavy Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200C200 100 400 300 700 200C1000 100 1200 300 1500 200" stroke="white" strokeWidth="1" opacity="0.4"/>
            <path d="M-100 250C200 150 400 350 700 250C1000 150 1200 350 1500 250" stroke="white" strokeWidth="1" opacity="0.2"/>
          </svg>
        </div>

        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4900A] text-xs font-bold uppercase tracking-widest mb-6">
            Global Operations & Commodities
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Elevating Global <span className="text-[#D4900A]">Commodities & Infrastructure</span>
          </h1>
          <p className="text-xl text-slate-300">
            Bridging the gap between abundant raw natural resources and high-value industrial products through strategic investment in advanced processing, infrastructure, and responsible mining.
          </p>
        </div>
      </section>

      {/* Synergy Section */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0B254A 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1B5EA7]/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B254A] mb-6">A Powerful Transatlantic Synergy</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Geranium Group combines on-ground operational excellence in Nigeria with global market access and compliance expertise in the United States. Together, we create a vertically integrated platform that maximizes value at every stage of the supply chain.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#1B5EA7]/10 flex items-center justify-center shrink-0">
                     <CustomIcons.GlobeConnect className="w-6 h-6 text-[#1B5EA7]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B254A] mb-1">Geranium Limited (Nigeria)</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">The powerhouse of local sourcing and operational excellence. We manage sustainable procurement, logistics, and on-ground execution, generating employment and supporting community development.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#D4900A]/10 flex items-center justify-center shrink-0">
                     <CustomIcons.GlobeConnect className="w-6 h-6 text-[#D4900A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B254A] mb-1">Geranium International LLC (Florida, USA)</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Our US-based entity serves as the global gateway for international distribution, regulatory compliance (FDA, EU standards), investor relations, and access to premium markets.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0B254A] rounded-[40px] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4900A] opacity-10 rounded-full blur-3xl" />
               <h3 className="text-2xl font-display font-bold mb-8">Strategic Benefits</h3>
               <div className="space-y-6 relative z-10">
                 {synergyBenefits.map(b => (
                   <div key={b.title}>
                     <h4 className="font-bold text-[#D4900A] mb-1">{b.title}</h4>
                     <p className="text-white/70 text-sm leading-relaxed">{b.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 & 2 */}
      <section className="py-10 bg-slate-50 relative overflow-hidden">
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4900A]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        
        <div className="container-site relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0B254A] mb-4">Industrial Value Addition & Mining</h2>
            <p className="text-slate-500 text-lg">Executing a strategic transition from exporting raw commodities to producing high-margin, refined industrial ingredients and responsible solid minerals.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             {/* Phase 1 */}
             <div className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4900A]/10 flex items-center justify-center text-[#D4900A]">
                    <CustomIcons.Agriculture className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Phase 1</div>
                    <h3 className="text-2xl font-bold text-[#0B254A]">Agro-Processing</h3>
                  </div>
                </div>
                <div className="space-y-6">
                   <div>
                     <h4 className="font-bold text-[#0B254A]">Palm Oil & Soya Oil</h4>
                     <p className="text-sm text-slate-500 mt-1">State-of-the-art refining and fractionation facilities producing premium crude and refined oil for industrial applications (food processing, oleochemicals). Advanced extraction yielding high-protein soya meal.</p>
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0B254A]">Sesame Seeds</h4>
                     <p className="text-sm text-slate-500 mt-1">Modern cleaning, dehulling, sorting, and oil-pressing technology that meets stringent international culinary and pharmaceutical standards.</p>
                   </div>
                </div>
             </div>

             {/* Phase 2 */}
             <div className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1B5EA7]/10 flex items-center justify-center text-[#1B5EA7]">
                    <CustomIcons.Mining className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Phase 2</div>
                    <h3 className="text-2xl font-bold text-[#0B254A]">Mining Sector Development</h3>
                  </div>
                </div>
                <div className="space-y-6">
                   <div>
                     <h4 className="font-bold text-[#0B254A]">Commodity Trading & Infrastructure</h4>
                     <p className="text-sm text-slate-500 mt-1">Established, transparent channels for the ethical sourcing and global sale of high-demand minerals. Moving beyond basic extraction into modern mining infrastructure, processing facilities, and power solutions.</p>
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0B254A]">Sustainable Practices</h4>
                     <p className="text-sm text-slate-500 mt-1">Implementing eco-friendly mining technologies, land rehabilitation programs, and community development initiatives aligned with global ESG standards.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Tolls */}
      <section className="py-10 bg-white relative overflow-hidden">
         {/* Background Art */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2" />
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(11,37,74,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(11,37,74,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <div className="container-site relative z-10">
            <div className="mb-16">
               <h2 className="text-3xl font-display font-bold text-[#0B254A] mb-4">Infrastructure & Urban Development</h2>
               <p className="text-slate-500 text-lg max-w-2xl">From affordable housing to intelligent toll systems, we are shaping the future of urban mobility and living spaces.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {infrastructureServices.map(s => (
                 <div key={s.title} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <s.icon className="w-12 h-12 text-[#1B5EA7] mb-6" />
                    <h4 className="text-xl font-bold text-[#0B254A] mb-3">{s.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* EPC & Manpower */}
      <section className="py-10 bg-[#0B254A] text-white relative overflow-hidden">
         {/* Background Art */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 0)', backgroundSize: '30px 30px' }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1B5EA7]/20 rounded-full blur-[120px]" />
         
         <div className="container-site relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-3xl font-display font-bold mb-6">EPC & Precision Maintenance</h2>
                  <p className="text-white/70 mb-10 leading-relaxed">
                     We provide innovative, efficient, and sustainable solutions for the manufacturing industry and gas production sector. Our focus is simple: keep your critical assets running safely and efficiently.
                  </p>
                  
                  <div className="space-y-8">
                     {technicalServices.map(ts => (
                       <div key={ts.title}>
                          <h4 className="text-[#D4900A] font-bold mb-3 flex items-center gap-2">
                            <CustomIcons.Automation className="w-5 h-5" />
                            {ts.title}
                          </h4>
                          <ul className="space-y-2">
                             {ts.items.map(item => (
                               <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                                 <CheckCircle2 className="w-4 h-4 text-[#3D8B37] shrink-0 mt-0.5" />
                                 {item}
                               </li>
                             ))}
                          </ul>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div>
                  <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-md">
                     <div className="w-16 h-16 rounded-2xl bg-[#D4900A]/20 flex items-center justify-center mb-6 text-[#D4900A]">
                        <CustomIcons.Manpower className="w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Manpower Outsourcing & HR Services</h3>
                     <p className="text-white/70 mb-8 leading-relaxed">
                        Geranium Limited is a professional recruitment placing agency and manpower outsourcing company in Nigeria, delivering reliable workforce solutions to organizations across multiple sectors.
                     </p>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {["Permanent Staffing", "Contract Staffing", "Payroll Outsourcing", "International Supply", "Oil & Gas Support", "Engineering Support", "Logistics & Supply", "Facility Management"].map(i => (
                          <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#D4900A]" />
                             {i}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <ContactSection />
    </div>
  );
}
