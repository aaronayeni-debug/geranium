import { useState, useEffect, useRef } from "react";
import {
  HardHat,
  Anchor,
  Truck,
  Building2,
  Wheat,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "epc",
    icon: HardHat,
    title: "Engineering, Procurement & Construction",
    abbr: "EPC",
    desc: "Full lifecycle EPC solutions for complex infrastructure from design and procurement to commissioning and handover. Delivering projects on time, on budget.",
    tags: ["Civil Works", "Industrial Plants", "Infrastructure"],
    color: "#1B5EA7",
    bg: "bg-[#EEF3FA]",
    iconBg: "bg-[#1B5EA7]",
    href: "#services",
  },
  {
    id: "pipeline",
    icon: Wrench,
    title: "Pipeline Maintenance & HDD Drilling",
    abbr: "OIL & GAS",
    desc: "Comprehensive pipeline services for gas and crude oil lines routine inspections, preventive maintenance, emergency response, and trenchless HDD installation.",
    tags: ["NDT Testing", "HDD Drilling", "Emergency Response"],
    color: "#3D8B37",
    bg: "bg-[#EBF5EA]",
    iconBg: "bg-[#3D8B37]",
    href: "#pipeline",
  },
  {
    id: "land",
    icon: Truck,
    title: "Land Reclamation & Sand Filling",
    abbr: "CONSTRUCTION",
    desc: "Transform swampy, waterlogged terrain into premium, build-ready land. End-to-end reclamation: site inspection, sand filling, compaction and final grading.",
    tags: ["Swamp Development", "Sand Filling", "Land Grading"],
    color: "#D4900A",
    bg: "bg-[#FDF5E4]",
    iconBg: "bg-[#D4900A]",
    href: "#engineering",
  },
  {
    id: "transport",
    icon: Building2,
    title: "Intelligent Transportation Management",
    abbr: "TRANSPORT",
    desc: "Smart transportation infrastructure toll systems, traffic management, and logistics solutions that move people and goods efficiently across Nigeria and beyond.",
    tags: ["Toll Systems", "Traffic Mgmt", "Logistics"],
    color: "#1B5EA7",
    bg: "bg-[#EEF3FA]",
    iconBg: "bg-[#1B5EA7]",
    href: "#services",
  },
  {
    id: "maritime",
    icon: Anchor,
    title: "Maritime & Crew Manning Services",
    abbr: "MARITIME",
    desc: "Institute of Chartered Shipbrokers-backed maritime operations. Skilled crew deployment, vessel management, and comprehensive marine support services.",
    tags: ["Crew Management", "Vessel Ops", "ICS Member"],
    color: "#3D8B37",
    bg: "bg-[#EBF5EA]",
    iconBg: "bg-[#3D8B37]",
    href: "#services",
  },
  {
    id: "agri",
    icon: Wheat,
    title: "Agricultural & Food Products",
    abbr: "AGRICULTURE",
    desc: "Premium export-grade commodities and consumer food products. Refined Palm Oil, Soya Oil, Sesame Seeds, and Ginger sourced and processed to global standards.",
    tags: ["Palm Oil", "Sesame Seeds", "Export Quality"],
    color: "#D4900A",
    bg: "bg-[#FDF5E4]",
    iconBg: "bg-[#D4900A]",
    href: "#agriculture",
  },
];

export function ServicesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const firstCard = slider.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 24; // Card width + gap (24px)
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startAutoScroll = () => {
      // Only auto-scroll on screens narrower than md (768px)
      if (window.innerWidth >= 768) return;

      intervalId = setInterval(() => {
        if (isPaused) return;

        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 5) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const firstCard = slider.firstElementChild as HTMLElement;
          const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 320; // card width + gap (24px)
          slider.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoScroll();

    const handleResize = () => {
      clearInterval(intervalId);
      startAutoScroll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPaused]);

  return (
    <section id="services" className="py-16 md:py-24 mt-4 md:mt-10 bg-white relative">
      <div className="container-site relative z-20">
        {/* Dynamic Split Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl relative z-20">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1B5EA7]/10 text-[#1B5EA7] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B5EA7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1B5EA7]"></span>
              </span>
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#040D1A] leading-[1.1]">
              Powering <span className="text-[#1B5EA7] relative inline-block">
                Africa's Growth
                <svg className="absolute w-[110%] h-3 -bottom-1 -left-[5%] text-[#D4900A]/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
              </span>
              <br />Across Key Sectors
            </h2>
          </div>
          <p className="text-lg text-slate-500 max-w-sm font-body leading-relaxed lg:pb-2">
            From the seabed to the skyline, our premium engineering solutions deliver excellence at every scale.
          </p>
        </div>

        {/* Premium Interactive Grid / Mobile Auto-scrolling Slider */}
        <div 
          ref={sliderRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible scrollbar-none snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onScroll={handleScroll}
        >
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-slate-100 w-[85vw] sm:w-[380px] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none"
              >
                {/* Giant watermark icon */}
                <div className="absolute -bottom-8 -right-8 text-slate-900 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 transform group-hover:scale-125 group-hover:-rotate-12 pointer-events-none">
                  <Icon className="w-56 h-56" style={{ color: s.color }} />
                </div>

                {/* Top Section: Number + Icon */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <span className="text-6xl font-display font-black text-slate-200 transition-colors duration-500 group-hover:text-slate-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                    style={{ background: s.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col h-[calc(100%-6rem)] justify-between">
                  <div>
                    <span 
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full border"
                      style={{ color: s.color, borderColor: s.color + '30', backgroundColor: s.color + '05' }}
                    >
                      {s.abbr}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#0B254A] mb-4 leading-tight group-hover:text-[#1B5EA7] transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-body mb-8">
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" style={{ color: s.color }}>
                    Explore Service <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Animated bottom border */}
                <div 
                  className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ background: s.color }}
                />
              </article>
            );
          })}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const slider = sliderRef.current;
                if (slider) {
                  const firstCard = slider.firstElementChild as HTMLElement;
                  const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 320;
                  slider.scrollTo({ left: index * cardWidth, behavior: "smooth" });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-[#1B5EA7] w-6" 
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-20 flex justify-center relative z-20">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-[#040D1A] text-white font-bold px-8 py-4 rounded-full overflow-hidden transition-transform hover:scale-105 cursor-pointer shadow-xl shadow-[#040D1A]/20"
          >
            <div className="absolute inset-0 bg-[#1B5EA7] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 font-body tracking-wide">Discuss Your Project</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
