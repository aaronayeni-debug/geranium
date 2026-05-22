import { Quote } from "lucide-react";
import { siteContent } from "./data/siteContent";
import { ContactSection } from "./components/ContactSection";

const { coo } = siteContent.about;

export function CooMessagePage() {
  return (
    <div className="pt-20">
      <section className="bg-[#0B254A] py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/geranium coo.png.jpeg')] bg-cover bg-center opacity-10 grayscale" />
        <div className="container-site relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4900A] text-xs font-bold uppercase tracking-widest mb-6">
            Executive Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Message from the <span className="text-[#D4900A]">COO</span>
          </h1>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="rounded-[40px] overflow-hidden shadow-2xl mb-8">
                <img src="/images/geranium coo.png.jpeg" alt={coo.name} className="w-full h-auto" />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-display font-bold text-[#0B254A]">{coo.name}</h2>
                <p className="text-[#D4900A] font-bold uppercase tracking-widest text-xs mt-1">{coo.role}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <Quote className="w-16 h-16 text-[#1B5EA7]/20" />
              <div className="prose prose-lg max-w-none text-slate-600 space-y-8 italic">
                {coo.fullMessage.map((para, i) => (
                  <p key={i} className="leading-relaxed text-xl">
                    "{para}"
                  </p>
                ))}
              </div>
              
              <div className="pt-10 border-t border-slate-100">
                <p className="text-slate-500 font-medium">Sincerely,</p>
                <div className="mt-4">
                   <div className="text-2xl font-display font-bold text-[#0B254A]">{coo.name}</div>
                   <div className="text-slate-400 text-sm mt-1">{coo.role}, Geranium Limited</div>
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
