import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MembershipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Left image slides in from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-55vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right content slides in from right
      scrollTl.fromTo(
        contentRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thanks for joining! Check your email for confirmation.');
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-7 bg-[#0B0C0F]"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[46vw] h-full overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/membership_img.jpg"
          alt="Membership"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      {/* Right Panel */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 w-[54vw] h-full bg-[#0B0C0F] flex flex-col justify-center px-[6vw]"
        style={{ zIndex: 3 }}
      >
        {/* Micro label */}
        <span className="micro-label text-[#FF2D2D] mb-4">
          MEMBERSHIP
        </span>

        {/* Headline */}
        <h2 className="headline-lg text-[#F4F6F8] mb-6">
          JOIN THE<br />
          <span className="text-[#FF2D2D]">CREW</span>
        </h2>

        {/* Body */}
        <p className="body-text max-w-[34vw] mb-10">
          Early access, exclusive colorways, and members-only drops.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-[34vw]">
          <div className="flex gap-3 mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <button type="submit" className="btn-primary flex-shrink-0">
              GET ACCESS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#A6ACB6]">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
};

export default MembershipSection;
