import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { CustomIcons } from "./components/CustomIcons";

const maintenanceServices = [
  { title: "Routine Inspections & Monitoring", desc: "Using advanced technology such as smart pigs, inline inspection tools, and aerial surveillance, we detect leaks, corrosion, and structural weaknesses." },
  { title: "Preventive Maintenance & Repairs", desc: "We conduct corrosion control, coating applications, valve maintenance, and welding repairs to enhance pipeline longevity." },
  { title: "Leak Detection & Integrity Assessment", desc: "Through non-destructive testing (NDT), hydrostatic testing, and ultrasonic inspection, we identify and rectify potential pipeline issues." },
  { title: "Emergency Response & Repairs", desc: "Our rapid-response team is available 24/7 to handle pipeline ruptures, leaks, or other emergencies." },
  { title: "Cathodic Protection Services", desc: "We provide cathodic protection system installation and monitoring to prevent pipeline corrosion and degradation." },
  { title: "Pipeline Cleaning & Pigging", desc: "Our cleaning and pigging services remove debris, prevent internal buildup, and optimize pipeline efficiency." }
];

const hddServices = [
  "Pipeline & Utility Installation: We install pipelines for oil, gas, water, fiber optics, and telecommunications using HDD technology.",
  "Crossing & Borehole Engineering: We design and execute precise HDD bore paths, minimizing environmental and structural impact.",
  "Rock & Soil Drilling Expertise: Our drilling techniques cater to various geological conditions, including hard rock, clay, and sandy soil.",
  "Environmental Compliance & Safety: Our HDD solutions comply with industry regulations, environmental impact assessments (EIA), and safety protocols.",
  "Turnkey HDD Solutions: We offer complete project management from feasibility studies to final execution, ensuring project success."
];

export function PipelinePage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#040D1A] to-[#0B254A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3D8B37 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D8B37]/10 border border-[#3D8B37]/30 text-[#3D8B37] text-xs font-bold uppercase tracking-widest mb-6">
            Pipeline Maintenance Services & HDD Drilling
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Comprehensive Pipeline <span className="text-[#3D8B37]">Solutions</span>
          </h1>
          <p className="text-xl text-slate-300">
            At Geranium Limited, we specialize in providing high-quality pipeline maintenance services for gas pipelines and crude oil lines. Our team of skilled professionals ensures the reliability, safety, and efficiency of your pipeline infrastructure.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EBF5EA] -skew-x-12 translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#3D8B37 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#3D8B37]/5 rounded-full blur-3xl" />
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[40px] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-[#0B254A]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="/images/geranium pipe.jpeg" 
                alt="Pipeline Maintenance Services" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-[#0B254A] mb-6">Minimizing Downtime & Preventing Failures</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                We work diligently to ensure that your pipeline networks operate efficiently, meeting both regulatory and industry standards. Our commitment to safety, environmental compliance, and operational excellence sets us apart.
              </p>
              
              <div className="bg-[#EBF5EA] p-8 rounded-3xl border border-[#3D8B37]/10">
                <h3 className="text-xl font-bold text-[#0B254A] mb-6 flex items-center gap-3">
                   <CustomIcons.Pipeline className="w-8 h-8 text-[#3D8B37]" />
                   Why Choose Geranium Limited?
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "Industry Expertise", desc: "Years of experience in pipeline maintenance and HDD drilling." },
                    { title: "Advanced Technology", desc: "Utilization of cutting-edge inspection and drilling equipment." },
                    { title: "Commitment to Safety", desc: "Adherence to strict HSE standards and regulatory compliance." },
                    { title: "Minimal Environmental Impact", desc: "Sustainable and eco-friendly trenchless pipeline solutions." },
                    { title: "24/7 Emergency Support", desc: "Rapid response teams for urgent repairs and crisis management." }
                  ].map(f => (
                    <li key={f.title} className="flex items-start gap-3 text-slate-700">
                       <CheckCircle2 className="w-5 h-5 text-[#3D8B37] shrink-0 mt-0.5" />
                       <div>
                         <span className="font-bold text-[#0B254A]">{f.title}:</span> <span className="text-sm">{f.desc}</span>
                       </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Breakdown */}
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
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3D8B37]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-[#0B254A]">Our Pipeline Maintenance Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maintenanceServices.map((s, i) => (
              <div key={i} className="group relative overflow-hidden bg-white p-8 rounded-[2rem] border border-slate-100 transition-all duration-500">
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="text-5xl font-display font-black text-slate-100 transition-colors duration-500 group-hover:text-slate-200">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-[#0B254A] mb-3 leading-tight group-hover:text-[#3D8B37] transition-colors duration-300">{s.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-body">{s.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#3D8B37]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HDD Section */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="bg-[#040D1A] rounded-[48px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3D8B37]/5 -skew-x-12 translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D8B37]/20 border border-[#3D8B37]/30 text-[#3D8B37] text-xs font-bold uppercase tracking-widest mb-6">
                  Trenchless Solutions
                </div>
                <h2 className="text-4xl font-display font-bold text-white mb-6">HDD Drilling Services</h2>
                <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                  We offer Horizontal Directional Drilling (HDD) services, providing a cost-effective 
                  and minimally invasive solution for installing pipelines under rivers, highways, 
                  railways, and urban areas without disrupting the surface.
                </p>
                
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                   <div className="flex items-center gap-4 text-white">
                      <CustomIcons.Drill className="w-12 h-12 text-[#3D8B37]" />
                      <p className="text-sm text-white/80 font-medium leading-relaxed">
                        With our state-of-the-art HDD rigs, experienced drilling crew, and innovative engineering solutions, we ensure that your pipeline projects are executed efficiently, reducing costs and construction time.
                      </p>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-2xl text-white font-bold mb-6">Our HDD Services Include:</h3>
                <div className="space-y-4">
                  {hddServices.map((item, index) => {
                    const [title, desc] = item.split(': ');
                    return (
                      <div key={index} className="group relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
                        <div className="w-10 h-10 rounded-xl bg-[#3D8B37]/20 flex items-center justify-center shrink-0 mt-0.5">
                           <span className="text-[#3D8B37] text-sm font-bold">{index + 1}</span>
                        </div>
                        <div className="relative z-10">
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#3D8B37] transition-colors">{title}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#3D8B37]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-slate-50 text-center relative overflow-hidden">
         {/* Background Art */}
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0B254A 1px, transparent 0)', backgroundSize: '24px 24px' }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[#3D8B37]/5 rounded-[100px] blur-3xl" />
         
         <div className="container-site max-w-3xl relative z-10">
            <h2 className="text-4xl font-display font-bold text-[#0B254A] mb-6">Secure Your Pipeline Infrastructure</h2>
            <p className="text-lg text-slate-600 mb-10">
               Contact Geranium Limited today for reliable maintenance, emergency response, and state-of-the-art HDD drilling solutions.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[#3D8B37] hover:bg-[#2C6A27] text-white font-bold px-10 py-4 rounded-full transition-all duration-200 hover:shadow-xl text-lg">
               Consult Our Engineers <ArrowRight className="w-5 h-5" />
            </a>
         </div>
      </section>

      <ContactSection />
    </div>
  );
}
