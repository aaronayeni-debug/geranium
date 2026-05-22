import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subjectValue = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const subjectMap: Record<string, string> = {
      epc: "EPC & Engineering Inquiry",
      pipeline: "Pipeline Maintenance Inquiry",
      land: "Land Reclamation & Sand Filling Inquiry",
      other: "General Inquiry",
    };

    const subjectText = subjectMap[subjectValue] || "General Inquiry";

    // Build the mailto parameters
    const mailtoSubject = encodeURIComponent(`Geranium Limited: ${subjectText} from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service Interest: ${subjectText}\n\n` +
      `Message:\n${message}`
    );

    // Launch email client
    window.location.href = `mailto:csolutions@geranium-limited.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <section 
      id="contact" 
      className="py-14 bg-[#EEF3FA] relative overflow-hidden z-20"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #040D1A 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#D4900A]/10 text-[#D4900A] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4900A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4900A]"></span>
              </span>
              Connect With Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#040D1A] mb-8 leading-[1.1]">
              Ready to <span className="text-[#D4900A] relative inline-block">
                Partner
                <svg className="absolute w-[110%] h-3 -bottom-1 -left-[5%] text-[#1B5EA7]/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
              </span>
              <br />With You.
            </h2>
            <p className="text-lg text-slate-500 mb-12 max-w-md font-body leading-relaxed">
              Whether you have a specific project in mind or just want to explore our capabilities, our experts are ready to engage.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-xl bg-[#040D1A]/5 border border-[#040D1A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B5EA7]/10 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-[#1B5EA7]" />
                </div>
                <div>
                  <h4 className="text-[#040D1A] font-bold mb-1">Our Headquarters</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    52 Raymond Njoku Street, <br />
                    Ikoyi, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <a 
                href="tel:08076303884" 
                className="flex gap-6 items-start group hover:no-underline cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#040D1A]/5 border border-[#040D1A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3D8B37]/10 transition-all duration-300">
                  <Phone className="w-5 h-5 text-[#3D8B37]" />
                </div>
                <div>
                  <h4 className="text-[#040D1A] font-bold mb-1">Direct Contact</h4>
                  <p className="text-slate-500 text-sm group-hover:text-[#3D8B37] transition-colors">08076303884</p>
                </div>
              </a>

              <a 
                href="mailto:csolutions@geranium-limited.com" 
                className="flex gap-6 items-start group hover:no-underline cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#040D1A]/5 border border-[#040D1A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4900A]/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-[#D4900A]" />
                </div>
                <div>
                  <h4 className="text-[#040D1A] font-bold mb-1">Email Support</h4>
                  <p className="text-slate-500 text-sm group-hover:text-[#D4900A] transition-colors">csolutions@geranium-limited.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(27,94,167,0.1)] relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B5EA7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-1000 group-hover:scale-150"></div>

            <h3 className="text-xl md:text-2xl font-display font-bold text-[#0B254A] mb-6 flex items-center gap-3 relative z-10">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-[#1B5EA7]" />
              Contact us
            </h3>
            
            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Name"
                    className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-3 text-sm text-[#040D1A] placeholder:text-slate-400 focus:outline-none focus:border-[#1B5EA7]/30 focus:ring-4 focus:ring-[#1B5EA7]/10 focus:bg-white transition-all font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-3 text-sm text-[#040D1A] placeholder:text-slate-400 focus:outline-none focus:border-[#1B5EA7]/30 focus:ring-4 focus:ring-[#1B5EA7]/10 focus:bg-white transition-all font-body"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-3 text-sm text-slate-500 focus:outline-none focus:border-[#1B5EA7]/30 focus:ring-4 focus:ring-[#1B5EA7]/10 focus:bg-white transition-all appearance-none font-body cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="epc">EPC & Engineering</option>
                  <option value="pipeline">Pipeline Maintenance</option>
                  <option value="land">Land Reclamation</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="How can we help you today?"
                  className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-3 text-sm text-[#040D1A] placeholder:text-slate-400 focus:outline-none focus:border-[#1B5EA7]/30 focus:ring-4 focus:ring-[#1B5EA7]/10 focus:bg-white transition-all resize-none font-body"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full relative mt-2 overflow-hidden bg-[#040D1A] text-white text-sm font-bold py-4 rounded-xl shadow-lg shadow-[#040D1A]/20 flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#1B5EA7] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 font-body tracking-wide">Send Message</span>
                <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#071528] pt-16 lg:pt-48 pb-10 relative z-20">
      {/* Top curve coming from Contact */}
      <div className="hidden md:block absolute -top-[1px] left-0 right-0 w-full pointer-events-none z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[50px] md:h-[100px] fill-[#EEF3FA]">
          <path d="M0,0 Q720,100 1440,0 Z" />
        </svg>
      </div>
      <div className="container-site relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/geranium emblem.png" alt="Geranium Limited" className="w-10 h-10 object-contain rounded-sm" />
              <span className="font-display font-bold text-white text-xl">Geranium <span className="text-[#D4900A]">Limited</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Delivering innovative, tailored solutions across Africa since 2004. Your reliable solution partner in Engineering, Infrastructure, and beyond.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#1B5EA7] hover:text-white hover:border-[#1B5EA7] transition-all duration-300" aria-label={social}>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Our Services</h4>
            <ul className="space-y-4">
              {[
                { name: 'EPC & Engineering', path: '/engineering' },
                { name: 'Pipeline Maintenance', path: '/pipeline' },
                { name: 'HDD Drilling', path: '/pipeline' },
                { name: 'Land Reclamation', path: '/engineering' },
                { name: 'Maritime Services', path: '/engineering' },
                { name: 'Agri Products', path: '/agriculture' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Team', path: '/about' },
                { name: 'Projects Gallery', path: '/#gallery' },
                { name: 'Contact Center', path: '/#contact' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Stay updated with our latest projects and insights.</p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#1B5EA7] flex-1"
              />
              <button className="bg-[#1B5EA7] hover:bg-[#154A86] text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-center items-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] text-center">
            Copyright © 2026 Geranium Limited - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
