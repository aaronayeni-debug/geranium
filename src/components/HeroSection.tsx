import { ArrowRight, CheckCircle, TrendingUp, Users, Globe } from "lucide-react";
import { ComposableMap, Geographies, Geography, Sphere, Marker, Line } from "react-simple-maps";
import { CountUp } from "./CountUp";
import { Link } from "react-router-dom";
import GeometricBackground from "./Partical";

const stats = [
  { value: 20, label: "Years Experience", icon: TrendingUp, suffix: "+" },
  { value: 500, label: "Projects Delivered", icon: CheckCircle, suffix: "+" },
  { value: 15, label: "African Countries", icon: Globe, suffix: "+" },
  { value: 2000, label: "Workforce Deployed", icon: Users, suffix: "+" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative z-30" aria-label="Hero">
      <GeometricBackground className="hero-mesh min-h-screen flex flex-col justify-center">

      <div className="container-site relative z-10 pt-32 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
          {/* Left: text content */}
          <div className="flex flex-col gap-7 relative z-20 pointer-events-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" aria-hidden="true" />
                Trusted since 2004
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight">
              Engineering Solutions  {" "}
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #4CAF50, #D4900A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for a Sustainable
              </span>
              Future
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Geranium Limited delivers innovative, tailored solutions across{" "}
              <strong className="text-white/90">EPC, Pipeline Maintenance, Land Reclamation, Transportation,
              Real Estate</strong>, and{" "}
              <strong className="text-white/90">Agricultural Products</strong> building lasting value
              for communities and stakeholders.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/engineering"
                className="w-44 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0B254A] font-bold py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(255,255,255,0.25)] cursor-pointer"
              >
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="w-44 inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold py-3.5 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                About Us
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 pt-2">
              {/* <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm shrink-0">
                 <Users className="w-5 h-5 text-[#D4900A]" />
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">2,000+ skilled professionals</span> deployed across Africa
              </p> */}
            </div>
          </div>

          {/* Right: Map & Locations */}
          <div className="absolute inset-0 lg:relative flex items-center justify-center lg:justify-end w-full h-full lg:h-[550px] opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-0 lg:z-10 overflow-hidden lg:overflow-visible">
             <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
                
                {/* Globe Background shadow for 3D effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full shadow-[inset_-40px_-40px_80px_rgba(4,13,26,0.9)] opacity-50 pointer-events-none" />

                <ComposableMap
                  projection="geoOrthographic"
                  projectionConfig={{ rotate: [40, -15, 0], scale: 220 }}
                  width={500}
                  height={500}
                  style={{ overflow: "visible" }}
                  className="w-full h-full absolute inset-0 pointer-events-none z-10 overflow-visible"
                >
                  <defs>
                    <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="1.5" fill="#ffffff" opacity="0.5" />
                    </pattern>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1B5EA7" />
                      <stop offset="100%" stopColor="#3D8B37" />
                    </linearGradient>
                  </defs>

                  {/* Globe border */}
                  <Sphere id="sphere" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

                  <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="url(#dots)"
                          stroke="transparent"
                        />
                      ))
                    }
                  </Geographies>

                  {/* Connection Line */}
                  <Line
                    from={[-81.5, 27.7]} // Florida
                    to={[3.4, 6.5]} // Lagos
                    stroke="url(#line-gradient)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />

                  {/* Florida Marker */}
                  <Marker coordinates={[-81.5, 27.7]}>
                    <circle r={3} fill="#1B5EA7" />
                    <circle r={8} fill="#1B5EA7" opacity={0.3} className="animate-ping" style={{ animationDuration: '3s' }} />
                    <foreignObject x="15" y="-25" width="200" height="60" className="pointer-events-auto overflow-visible">
                       <div className="bg-white rounded-xl py-2 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-2 border border-slate-100 animate-float w-max relative">
                          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1B5EA7] rounded-full" />
                          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-6 h-auto rounded-sm shadow-sm" />
                          <span className="text-[#0B254A] font-bold text-sm whitespace-nowrap">Florida, USA</span>
                       </div>
                    </foreignObject>
                  </Marker>

                  {/* Lagos Marker */}
                  <Marker coordinates={[3.4, 6.5]}>
                    <circle r={3} fill="#3D8B37" />
                    <circle r={8} fill="#3D8B37" opacity={0.3} className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                    <foreignObject x="-215" y="-25" width="200" height="60" className="pointer-events-auto overflow-visible">
                       <div className="bg-white rounded-xl py-2 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-2 border border-slate-100 animate-float float-delay-2 w-max ml-auto relative">
                          <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="w-6 h-auto rounded-sm shadow-sm" />
                          <span className="text-[#0B254A] font-bold text-sm whitespace-nowrap">Lagos, Nigeria</span>
                          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#3D8B37] rounded-full" />
                       </div>
                    </foreignObject>
                  </Marker>
                </ComposableMap>

             </div>
          </div>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,80 C360,0 1080,80 1440,20 L1440,80 Z" />
        </svg>
      </div>

      </GeometricBackground>

      {/* Stats bar overlapping the bottom — outside overflow-hidden so translate-y-1/2 works */}
      <div className="absolute bottom-0 left-0 right-0 z-40 translate-y-1/2 px-4 lg:px-0">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {stats.map(({ value, label, icon: Icon, suffix }) => (
              <div
                key={label}
                className="bg-white rounded-xl lg:rounded-2xl p-3 lg:px-6 lg:py-5 flex flex-row items-center justify-start gap-3 lg:gap-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(7,21,40,0.06)] border border-slate-100 text-left"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 lg:w-6 lg:h-6 text-[#1B5EA7]" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-lg lg:text-2xl font-display font-bold text-[#0B254A]">
                    <CountUp end={value} suffix={suffix} />
                  </div>
                  <div className="text-[8px] lg:text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-tight">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
