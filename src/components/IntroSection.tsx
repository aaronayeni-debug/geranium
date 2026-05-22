import { ComposableMap, Geographies, Geography, Marker, Sphere, Line } from "react-simple-maps";

export function IntroSection() {
  return (
    <section className="pt-3 pb-20 md:pt-12 md:pb-32 lg:pt-12 lg:pb-36 bg-[#EEF3FA] relative z-20">
      
      {/* Bottom curve transitioning into Gallery (which is #040D1A) */}
      <div className="hidden md:block absolute -bottom-[1px] left-0 right-0 w-full pointer-events-none z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[50px] md:h-[100px] fill-[#040D1A]">
          <path d="M0,100 Q720,0 1440,100 Z" />
        </svg>
      </div>

      <div className="container-site relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-0 md:gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="w-full relative z-20 pb-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#0B254A] mb-4 leading-[1.1]">
              A Universal <br className="hidden md:block" /> <span className="text-[#D4900A]">Powerhouse</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-0 max-w-xl font-body leading-relaxed">
              Geranium Group seamlessly combines on-ground operational excellence in Africa with global market access and stringent compliance expertise. We create a vertically integrated platform that bridges abundant natural resources with international standards and distribution networks.
            </p>
          </div>

          {/* Right Content - Map */}
          <div className="w-full relative flex justify-center sm:mt-5 sm:mb-5 items-center h-[260px] sm:h-[320px] md:h-[450px] lg:h-[500px] pb-0">
            {/* Cut-out circular SVG/Shape - hidden on mobile, visible on lg */}
            <div className="hidden lg:block absolute -right-[15%] top-1/2 -translate-y-1/2 w-[100%] h-[115%] bg-[#E5EDF8] rounded-l-full border-l border-[#1B5EA7]/10 shadow-[inset_40px_0_100px_rgba(27,94,167,0.02)] -z-10"></div>

            {/* Map Graphic Container */}
            <div className="relative w-full max-w-[650px] aspect-[4/3] flex items-center justify-center lg:translate-x-16">
              
              <ComposableMap
                projection="geoOrthographic"
                projectionConfig={{
                  rotate: [35, -15, 0], // Focus on Atlantic
                  scale: 280
                }}
                className="w-full h-full drop-shadow-2xl opacity-100"
              >
                <defs>
                  <pattern id="intro-dots" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#1B5EA7" opacity="0.7" />
                  </pattern>
                  <linearGradient id="transatlantic-line" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B5EA7" />
                    <stop offset="100%" stopColor="#D4900A" />
                  </linearGradient>
                </defs>
                
                <Sphere id="intro-sphere" fill="#D1E0F3" stroke="#1B5EA7" strokeWidth={0.2} opacity={0.5} />
                
                <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="url(#intro-dots)"
                        stroke="transparent"
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#0B254A" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Connection Line */}
                <Line
                  from={[-81.5, 27.7]} // Florida
                  to={[3.4, 6.5]} // Lagos
                  stroke="url(#transatlantic-line)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />

                {/* Florida Marker */}
                <Marker coordinates={[-81.5, 27.7]}>
                  <circle r={5} fill="#1B5EA7" />
                  <circle r={12} fill="#1B5EA7" opacity={0.3} className="animate-ping" style={{ animationDuration: '3s' }} />
                  <foreignObject x="-45" y="-35" width="110" height="30" className="overflow-visible pointer-events-none">
                    <div className="bg-white px-2 py-1.5 rounded-lg shadow-xl border border-slate-100 flex items-center justify-center relative">
                       <span className="text-[#0B254A] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Florida, USA 🇺🇸</span>
                       <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100"></div>
                    </div>
                  </foreignObject>
                </Marker>

                {/* HQ Marker */}
                <Marker coordinates={[3.4, 6.5]}>
                  <circle r={6} fill="#D4900A" />
                  <circle r={14} fill="#D4900A" opacity={0.2} className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                  <foreignObject x="-50" y="10" width="110" height="30" className="overflow-visible pointer-events-none">
                    <div className="bg-white px-2 py-1.5 rounded-lg shadow-xl border border-slate-100 flex items-center justify-center relative">
                       <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-slate-100"></div>
                       <span className="text-[#0B254A] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Lagos, Nigeria 🇳🇬</span>
                    </div>
                  </foreignObject>
                </Marker>

              </ComposableMap>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
