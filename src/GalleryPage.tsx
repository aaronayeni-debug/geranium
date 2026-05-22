import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { ContactSection } from "./components/ContactSection";

const projects = [
  { id: 1, img: "/images/geranium gal1.jpeg", title: "Precision Site Surveying", category: "Engineering" },
  { id: 2, img: "/images/geranium gal2.jpeg", title: "Industrial Pipeline Maintenance", category: "Energy" },
  { id: 3, img: "/images/geranium gal3.jpeg", title: "Swamp Construction Works", category: "Construction" },
  { id: 4, img: "/images/geranium gal4.jpeg", title: "Advanced Topographic Leveling", category: "Engineering" },
  { id: 5, img: "/images/geranium gal52.jpeg", title: "Coastal Sand Filling Project", category: "Reclamation" },
  { id: 6, img: "/images/geranium gal6.jpeg", title: "Field Operations & Logistics", category: "Operations" },
];

const categories = ["All", "Engineering", "Energy", "Construction", "Reclamation", "Operations"];

export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-20">
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Background Art - Sonogram Effect */}
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
        <div className="container-site relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF5EA] text-[#3D8B37] text-xs font-bold uppercase tracking-widest mb-6">
              Our Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#0B254A] mb-6">
              Showcasing Our <span className="text-[#3D8B37]">Impact</span> Across Africa
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Explore our diverse range of successful projects, from heavy civil engineering 
              to specialized industrial maintenance.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  filter === cat 
                  ? "bg-[#0B254A] text-white shadow-lg shadow-[#0B254A]/20" 
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <div 
                key={p.id} 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer"
                onClick={() => setSelectedProject(p)}
              >
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B254A]/90 via-[#0B254A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D8B37] mb-2">{p.category}</span>
                  <h3 className="text-white font-display font-bold text-xl">{p.title}</h3>
                  <div className="mt-4 flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <Maximize2 className="w-4 h-4" />
                    View Project
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-[#040D1A]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer z-[210]"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center">
            <img src={selectedProject.img} alt={selectedProject.title} className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl object-contain mb-6" />
            <div className="text-center max-w-3xl px-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D8B37] block mb-2">{selectedProject.category}</span>
              <h3 className="text-white font-display font-bold text-2xl md:text-3xl">{selectedProject.title}</h3>
            </div>
          </div>
        </div>
      )}

      <ContactSection />
    </div>
  );
}
