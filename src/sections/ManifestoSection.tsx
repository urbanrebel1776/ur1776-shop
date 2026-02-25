import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Headline slides in from right
      scrollTl.fromTo(
        headlineRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Body + CTA slides up
      scrollTl.fromTo(
        contentRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
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
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-2 bg-[#0B0C0F]"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[46vw] h-full overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/manifesto_portrait.jpg"
          alt="Editorial portrait"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      {/* Right Text Panel */}
      <div
        className="absolute right-0 top-0 w-[54vw] h-full bg-[#0B0C0F] flex flex-col justify-center px-[6vw]"
        style={{ zIndex: 3 }}
      >
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h2 className="headline-lg text-[#F4F6F8]">
            WEAR THE<br />
            <span className="text-[#FF2D2D]">REVOLT</span>
          </h2>
        </div>

        {/* Body + CTA */}
        <div ref={contentRef}>
          <p className="body-text max-w-[34vw] mb-10">
            UR 1776 is built for the ones who move different. Heavyweight fabrics, 
            precision cuts, and graphics that speak before you do.
          </p>
          <button className="btn-secondary">
            READ OUR STORY
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
