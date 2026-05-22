import { ContactSection } from "./components/ContactSection";
import { siteContent } from "./data/siteContent";


const { products } = siteContent.agriculture;

const agroProcessing = [
  {
    title: "Palm Oil",
    desc: "State-of-the-art refining and fractionation facilities producing premium crude and refined palm oil for industrial applications (food processing, oleochemicals, cosmetics) and consumer markets. Our controlled processing delivers superior stability, purity, and traceability."
  },
  {
    title: "Soya Oil & Soya Meal",
    desc: "Advanced extraction and refining lines yielding high-protein soya meal for livestock and aquaculture feed, alongside refined soya oil for edible and industrial use. We leverage Nigeria’s growing soybean production to deliver consistent, high-quality output."
  },
  {
    title: "Sesame Seeds",
    desc: "Modern cleaning, dehulling, sorting, and oil-pressing technology that meets stringent international culinary, pharmaceutical, and cosmetic standards. Our sesame products boast high oil content, low moisture, and excellent purity."
  }
];

export function AgriculturePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <img 
          src="/images/geranium service 2.jpeg" 
          alt="Agriculture Background" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF5E4] to-transparent" />
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4900A]/10 text-[#D4900A] text-xs font-bold uppercase tracking-widest mb-6">
              Agricultural Division
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#0B254A] mb-6">
              Elevating <span className="text-[#D4900A]">Global Commodities</span>
            </h1>
            <p className="text-xl text-slate-600">
              Geranium Limited (Nigeria) and Geranium International LLC (Florida, USA) are bridging the gap between abundant raw natural resources and high-value industrial products.
            </p>
            <p className="text-xl text-slate-600 mt-4 font-medium">
              Transforming raw potential into premium, sustainable value, delivering higher margins, supply chain security, and long-term growth.
            </p>
          </div>
        </div>
      </section>

      {/* Industrial Value Addition - Agro Processing */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#D4900A 2px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FDF5E4] -skew-x-12 translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#3D8B37]/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/3" />
        
        <div className="container-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D8B37]/10 text-[#3D8B37] text-xs font-bold uppercase tracking-widest mb-4">
                Phase 1: Industrial Value Addition
             </div>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0B254A] mb-6">Agro-Processing & Refining</h2>
             <p className="text-slate-600 text-lg leading-relaxed">
               We are executing a strategic transition from exporting raw commodities to producing high-margin, refined industrial ingredients. By investing in modern processing facilities, Geranium Group captures greater value, ensures consistent quality, reduces supply chain risks, and creates skilled jobs in Nigeria.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agroProcessing.map((item, i) => (
              <div key={item.title} className="group relative overflow-hidden bg-slate-50 p-10 rounded-[2rem] border border-slate-100 transition-all duration-500">
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="text-5xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#0B254A] mb-4 leading-tight group-hover:text-[#3D8B37] transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-body">{item.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#3D8B37]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
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
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4900A]/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B254A]">Our Export-Grade Sourcing</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Beyond processing, we source and export premium agricultural commodities directly from our trusted network of Nigerian farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <div key={i} className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500">
                <div className="aspect-square overflow-hidden bg-white p-6 relative z-10">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-[#0B254A] mb-2 group-hover:text-[#D4900A] transition-colors">{p.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-body">{p.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4900A] font-bold text-sm">
                    Premium Grade
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#D4900A] z-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-10 bg-[#FDF5E4] relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(212,144,10,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,144,10,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B254A] mb-8">Why Source From Geranium?</h2>
              <div className="space-y-6">
                {[
                  { title: "Global Standards", desc: "Our products undergo rigorous quality control to meet EU and US export standards." },
                  { title: "100% Pure & Natural", desc: "We ensure our commodities are processed without harmful additives or preservatives." },
                  { title: "Reliable Logistics", desc: "Efficient supply chain management ensures on-time delivery to any port worldwide." },
                  { title: "Large Capacity", desc: "We maintain significant stock levels to fulfill high-volume industrial orders." }
                ].map((item, i) => {
                  return (
                    <div key={i} className="group relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all duration-500">
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold text-[#0B254A] mb-1 group-hover:text-[#D4900A] transition-colors">{item.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#D4900A]" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 transition-transform duration-700 relative z-10">
                <img src="/images/geranium service 2.jpeg" alt="Agriculture" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4900A]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#3D8B37]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
