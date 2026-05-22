import { Quote } from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { CountUp } from "./components/CountUp";
import { siteContent } from "./data/siteContent";

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-slate-50 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1B5EA7]/5 -skew-x-12 translate-x-1/2" />
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#0B254A] mb-6">
              Building a <span className="text-[#1B5EA7]">Legacy</span> of Trust
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Since 2004, Geranium Limited has been at the forefront of engineering innovation 
              and industrial excellence across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Art - matching EngineeringPage style */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0B254A 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B5EA7]/5 rounded-full blur-3xl" />

        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Column - First in DOM for mobile top priority */}
            <div className="rounded-[40px] overflow-hidden shadow-xl relative group">
              <div className="absolute inset-0 bg-[#0B254A]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src="/images/geranium about us img.jpeg" alt="Geranium History" className="w-full h-auto" />
            </div>

            {/* Text Column */}
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0B254A] mb-6">
                Our <span className="text-[#1B5EA7]">Story</span>
              </h2>
              <div className="space-y-6">
                {siteContent.about.story.map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-lg">
                    {para}
                  </p>
                ))}
                
                <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-slate-100">
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-[#1B5EA7]">
                      <CountUp end={20} suffix="+" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-[#3D8B37]">
                      <CountUp end={500} suffix="+" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Mission Cards */}
      <section className="py-10 bg-slate-50">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 transition-all duration-500 border border-slate-100">
              <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="text-5xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">01</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-[#0B254A] mb-4 leading-tight group-hover:text-[#1B5EA7] transition-colors duration-300">Our Mission</h3>
                <p className="text-slate-500 leading-relaxed font-body">
                  To provide innovative services that offer top-tier engineering solutions, 
                  driving both innovation and efficiency. We strive to partner with various 
                  industries to create a sustainable future through our expert services.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#1B5EA7]" />
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 transition-all duration-500 border border-slate-100">
              <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="text-5xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">02</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-[#0B254A] mb-4 leading-tight group-hover:text-[#3D8B37] transition-colors duration-300">Our Vision</h3>
                <p className="text-slate-500 leading-relaxed font-body">
                  To be the most reliable and innovative solution partner in Africa, 
                  recognized for our excellence in engineering, maritime, and agricultural 
                  sectors, building lasting value for all stakeholders.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#3D8B37]" />
            </div>
          </div>
        </div>
      </section>

      {/* COO Message Dedicated */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="bg-[#0B254A] rounded-[48px] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/images/geranium coo.png.jpeg')] bg-cover bg-center opacity-20 grayscale" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-0">
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-[#D4900A] mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">COO's Message</h2>
                <div className="space-y-6 text-slate-300 leading-relaxed italic text-lg">
                  <p>
                    "{siteContent.about.coo.message}"
                  </p>
                </div>
                <div className="mt-10">
                  <div className="text-white font-bold text-xl">Folaranmi Esan</div>
                  <div className="text-[#D4900A] uppercase tracking-widest text-xs font-bold mt-1">Chief Operating Officer</div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src="/images/geranium coo.png.jpeg" alt="Folaranmi Esan" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 bg-slate-50">
        <div className="container-site">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-display font-bold text-[#0B254A]">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Integrity", desc: "Honesty and transparency in all our dealings, ensuring trust with clients and partners.", color: "#1B5EA7", bg: "bg-[#1B5EA7]/10" },
              { title: "Reliability", desc: "Consistently delivering high-quality results on time and within budget.", color: "#3D8B37", bg: "bg-[#3D8B37]/10" },
              { title: "Collaboration", desc: "Working together with stakeholders to achieve shared goals and sustainable growth.", color: "#D4900A", bg: "bg-[#D4900A]/10" }
            ].map((v, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 transition-all duration-500 border border-slate-100 text-left">
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="text-5xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-display font-bold text-[#0B254A] mb-3 leading-tight transition-colors duration-300" style={{ '--hover-color': v.color } as any} onMouseEnter={(e) => e.currentTarget.style.color = v.color} onMouseLeave={(e) => e.currentTarget.style.color = '#0B254A'}>{v.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-body">{v.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: v.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
