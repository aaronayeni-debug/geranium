import { useState } from "react";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  { id: 1, img: "/images/geranium gal1.jpeg", title: "Site Surveying", category: "Engineering" },
  { id: 2, img: "/images/geranium gal2.jpeg", title: "Industrial Pipeline", category: "Maintenance" },
  { id: 3, img: "/images/geranium gal3.jpeg", title: "Civil Infrastructure", category: "Construction" },
  { id: 4, img: "/images/geranium gal4.jpeg", title: "Precision Leveling", category: "Engineering" },
  { id: 5, img: "/images/geranium gal52.jpeg", title: "Reclamation Coastal Sand Filling Project", category: "Dredging" },
  { id: 6, img: "/images/geranium gal6.jpeg", title: "On-site Operations", category: "Operations" },
];

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % projects.length);
  const prev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <section 
      id="gallery" 
      className="py-32 bg-[#040D1A] overflow-hidden relative z-20"
    >
      {/* Bottom curve going into Contact */}
      <div className="hidden md:block absolute -bottom-[1px] left-0 right-0 w-full pointer-events-none z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[50px] md:h-[100px] fill-[#EEF3FA]">
          <path d="M0,100 Q720,0 1440,100 Z" />
        </svg>
      </div>
      <div className="container-site relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D8B37]/10 border border-[#3D8B37]/20 text-[#4CAF50] text-xs font-bold uppercase tracking-widest mb-4">
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Visual Showcase of <span className="text-[#4CAF50]">Innovation</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm">
            A look into our high-impact projects and milestones across diverse industries in Africa.
          </p>
        </div>

        {/* Main Viewer */}
        <div className="relative group">
          <div className="aspect-[4/5] md:aspect-[16/7] rounded-[40px] overflow-hidden bg-[#0B254A] shadow-2xl relative">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D8B37] mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-display font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-8 right-8 glass px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest border-white/10">
            {activeIndex + 1} / {projects.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
          {projects.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                ? "ring-4 ring-[#3D8B37] ring-offset-4" 
                : "opacity-50 hover:opacity-100"
              }`}
            >
              <img src={project.img} alt="" className="w-full h-full object-cover" />
              {idx === activeIndex && (
                <div className="absolute inset-0 bg-[#3D8B37]/20 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
