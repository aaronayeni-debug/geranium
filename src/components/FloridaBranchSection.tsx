import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

export function FloridaBranchSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#040D1A] relative overflow-hidden z-20">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container-site relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="w-full">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1B5EA7]/20 border border-[#1B5EA7]/30 text-[#4A90E2] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              EST. 1974
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-[1.1]">
              Building the future <br className="hidden md:block" /> of <span className="text-[#D4900A]">Florida</span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-10 max-w-xl font-body leading-relaxed">
              Geranium is a company that has been at the forefront of engineering and infrastructure development. Our Florida branch brings decades of specialized expertise, offering innovative solutions tailored to the unique environmental and industrial needs of the region. From robust pipeline maintenance to cutting-edge land reclamation, we are committed to building a resilient future for Florida's communities and businesses.
            </p>

            <Link 
              to="/about"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1B5EA7] text-white font-bold rounded-xl shadow-lg shadow-[#1B5EA7]/20 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl group cursor-pointer"
            >
              <span className="font-body tracking-wide">ABOUT GERANIUM</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content - Map */}
          <div className="w-full relative flex justify-center items-center h-[300px] md:h-[400px] lg:h-[600px]">
            {/* Cut-out circular SVG/Shape - hidden on mobile, visible on lg */}
            <div className="hidden lg:block absolute -right-[20%] top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#071528] rounded-l-full border-l border-[#1B5EA7]/20 shadow-[inset_40px_0_100px_rgba(27,94,167,0.05)] -z-10"></div>
            
            {/* Map Graphic Container */}
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              
              {/* Florida dotted map representation */}
              <svg 
                viewBox="0 0 200 200" 
                className="w-[80%] h-[80%] text-[#1B5EA7]/50 drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 0 20px rgba(27,94,167,0.2))" }}
              >
                {/* Abstract Dotted Florida Shape */}
                <path 
                  d="M 30 50 C 50 45 90 40 110 50 C 120 60 130 80 135 110 C 140 140 150 170 130 190 C 120 180 125 160 115 150 C 110 120 95 90 85 70 C 70 60 50 65 30 70 C 20 60 20 55 30 50 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Marker */}
              <div className="absolute top-[45%] right-[35%] flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
                <MapPin className="w-8 h-8 text-[#D4900A] fill-[#D4900A]/20" />
                <div className="mt-2 px-3 py-1.5 bg-white text-[#040D1A] text-xs font-bold rounded-lg shadow-xl whitespace-nowrap relative">
                  Florida Branch
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                </div>
              </div>

              {/* Decorative ping ring around marker location */}
              <div className="absolute top-[45%] right-[35%] w-8 h-8 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4900A] opacity-20" style={{ animationDuration: '2s' }}></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
