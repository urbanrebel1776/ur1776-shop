import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Instagram, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Right form animation
      gsap.fromTo(
        rightRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Footer links animation
      gsap.fromTo(
        footerRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#14171B] py-[10vh] px-[6vw] z-section-8"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 mb-16">
        {/* Left Column - Contact Info */}
        <div ref={leftRef} className="lg:w-1/2">
          <h2 className="headline-lg text-[#F4F6F8] mb-6">
            LET'S BUILD<br />
            <span className="text-[#FF2D2D]">TOGETHER</span>
          </h2>
          <p className="body-text max-w-md mb-8">
            Stockists, collabs, or questions—reach out.
          </p>

          <div className="mb-8">
            <a
              href="mailto:hello@ur1776.com"
              className="text-[#F4F6F8] font-display font-bold text-lg hover:text-[#FF2D2D] transition-colors"
            >
              hello@ur1776.com
            </a>
          </div>

          <div className="mb-8">
            <span className="micro-label block mb-2">LOCATION</span>
            <span className="text-[#F4F6F8]">Los Angeles, CA</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-[rgba(244,246,248,0.15)] text-[#A6ACB6] hover:text-[#F4F6F8] hover:border-[#F4F6F8] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-[rgba(244,246,248,0.15)] text-[#A6ACB6] hover:text-[#F4F6F8] hover:border-[#F4F6F8] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-[rgba(244,246,248,0.15)] text-[#A6ACB6] hover:text-[#F4F6F8] hover:border-[#F4F6F8] transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div ref={rightRef} className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="micro-label block mb-2">NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="micro-label block mb-2">EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="micro-label block mb-2">MESSAGE</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              SEND MESSAGE
              <Send className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        ref={footerRef}
        className="pt-8 border-t border-[rgba(244,246,248,0.1)] flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <p className="text-sm text-[#A6ACB6]">
          © 2026 UR 1776. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-[#A6ACB6] hover:text-[#F4F6F8] transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-[#A6ACB6] hover:text-[#F4F6F8] transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-[#A6ACB6] hover:text-[#F4F6F8] transition-colors">
            Shipping
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
