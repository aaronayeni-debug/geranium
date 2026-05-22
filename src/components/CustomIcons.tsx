
export const CustomIcons = {
  LandReclamation: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 44L26 32L38 40L54 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 54L26 42L38 50L54 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M32 10V20M32 20L26 14M32 20L38 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Excavator: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 44C12 48.4183 15.5817 52 20 52H44C48.4183 52 52 48.4183 52 44V36H12V44Z" fill="currentColor" opacity="0.2"/>
      <path d="M12 44C12 48.4183 15.5817 52 20 52H44C48.4183 52 52 48.4183 52 44M12 44V36H52V44M12 44H52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="44" r="4" stroke="currentColor" strokeWidth="3"/>
      <circle cx="44" cy="44" r="4" stroke="currentColor" strokeWidth="3"/>
      <path d="M24 36V20C24 15.5817 27.5817 12 32 12H40V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 24H12L8 32V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Blueprint: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 20H48M16 28H32M16 36H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 44V28L48 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Environment: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56V24M32 24C32 24 20 20 20 32C20 44 32 40 32 40M32 24C32 24 44 20 44 32C44 44 32 40 32 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 56H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" opacity="0.5"/>
    </svg>
  ),
  Quality: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12L37.1057 22.3527L48.5317 24.015L40.2658 32.0673L42.218 43.455L32 38.08L21.782 43.455L23.7342 32.0673L15.4683 24.015L26.8943 22.3527L32 12Z" fill="currentColor" opacity="0.2"/>
      <path d="M32 12L37.1057 22.3527L48.5317 24.015L40.2658 32.0673L42.218 43.455L32 38.08L21.782 43.455L23.7342 32.0673L15.4683 24.015L26.8943 22.3527L32 12Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Pipeline: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32H20C24.4183 32 28 35.5817 28 40V48C28 52.4183 31.5817 56 36 56H56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H20C24.4183 16 28 19.5817 28 24V40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      <path d="M40 8H56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="28" cy="40" r="8" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  Drill: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8V56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 20L40 28M24 36L40 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 12H44V20L32 56L20 20V12Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10L14 18V30C14 43.1466 21.6569 54.8933 32 60C42.3431 54.8933 50 43.1466 50 30V18L32 10Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 32L30 36L38 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Factory: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 56H56V24L44 32V20L32 28V16L20 24V56H8Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="16" y="40" width="8" height="16" fill="currentColor" opacity="0.3"/>
      <rect x="32" y="40" width="8" height="16" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  Agriculture: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56V24M32 24C32 24 20 16 16 32C12 48 32 40 32 40M32 24C32 24 44 16 48 32C52 48 32 40 32 40" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 56H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Automation: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3"/>
      <path d="M32 16V8M32 56V48M16 32H8M56 32H48M20.6863 20.6863L15.0294 15.0294M48.9706 48.9706L43.3137 43.3137M43.3137 20.6863L48.9706 15.0294M15.0294 48.9706L20.6863 43.3137" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
    </svg>
  ),
  Mining: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 16L16 28V48L32 56L48 48V28L32 16Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M32 16V36M32 36L16 28M32 36L48 28M16 48L32 56L48 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="36" r="4" fill="currentColor"/>
    </svg>
  ),
  RealEstate: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 56H56M16 56V24L32 12L48 24V56M24 56V40H40V56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 32H28M36 32H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 24L32 12L48 24V56H16V24Z" fill="currentColor" opacity="0.1"/>
    </svg>
  ),
  Toll: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 48L48 16M48 48L16 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
      <rect x="24" y="24" width="16" height="16" rx="8" fill="currentColor" stroke="currentColor" strokeWidth="3"/>
      <path d="M8 32H20M44 32H56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  GlobeConnect: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="32" r="12" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3"/>
      <circle cx="44" cy="32" r="12" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3"/>
      <path d="M28 32H36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4"/>
      <path d="M20 20C20 20 32 12 44 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  Manpower: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="8" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="3"/>
      <path d="M16 48C16 40 24 36 32 36C40 36 48 40 48 48V56H16V48Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="16" cy="28" r="6" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path d="M8 48C8 44 12 42 16 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <circle cx="48" cy="28" r="6" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path d="M56 48C56 44 52 42 48 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  Leaf: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56C32 56 16 44 16 28C16 12 32 8 32 8C32 8 48 12 48 28C48 44 32 56 32 56Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 56V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 40L24 36M32 32L40 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  Logistics: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 48H52V32L44 24H36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 48H36V16H12V48Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="48" r="4" fill="currentColor"/>
      <circle cx="44" cy="48" r="4" fill="currentColor"/>
      <path d="M16 28H24M16 36H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Capacity: ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 16L12 28L32 40L52 28L32 16Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M12 36L32 48L52 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 44L32 56L52 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 28V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
};
