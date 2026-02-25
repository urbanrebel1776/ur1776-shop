import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LookbookSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

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
      // Left hero image slides in from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-70vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right caption slides in from right
      scrollTl.fromTo(
        captionRef.current,
        { x: '40vw', opacity: 0 },
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
        captionRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-4 bg-[#0B0C0F]"
    >
      {/* Left Hero Image */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[12vh] w-[58vw] h-[76vh] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/lookbook_01.jpg"
          alt="Lookbook feature"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      {/* Right Caption Panel */}
      <div
        ref={captionRef}
        className="absolute right-[6vw] top-[28vh] w-[28vw]"
        style={{ zIndex: 3 }}
      >
        {/* Micro label */}
        <span className="micro-label text-[#FF2D2D] mb-4 block">
          LOOKBOOK 01
        </span>

        {/* Title */}
        <h2 className="headline-md text-[#F4F6F8] mb-6">
          STREET<br />
          FORMALITY
        </h2>

        {/* Body */}
        <p className="body-text mb-8">
          Tailored chaos. Clean lines over loud textures. This is how UR 1776 shows up after dark.
        </p>

        {/* CTA */}
        <button className="btn-secondary">
          Explore the shoot
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default LookbookSection;
