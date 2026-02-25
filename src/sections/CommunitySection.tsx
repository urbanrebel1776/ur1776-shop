import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const communityImages = [
  '/community_01.jpg',
  '/community_02.jpg',
  '/community_03.jpg',
  '/community_04.jpg',
  '/community_05.jpg',
  '/community_06.jpg',
];

const CommunitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Headline slides in from left
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Mosaic tiles slide in from right with stagger
      tileRefs.current.forEach((tile, index) => {
        if (tile) {
          scrollTl.fromTo(
            tile,
            { x: '60vw', opacity: 0, scale: 0.98 },
            { x: 0, opacity: 1, scale: 1, ease: 'none' },
            0 + index * 0.02
          );
        }
      });

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      tileRefs.current.forEach((tile, index) => {
        if (tile) {
          scrollTl.fromTo(
            tile,
            { y: 0, opacity: 1 },
            { y: '-10vh', opacity: 0, ease: 'power2.in' },
            0.70 + index * 0.01
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-6 bg-[#0B0C0F]"
    >
      {/* Left Headline Column */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[26vw]"
        style={{ zIndex: 3 }}
      >
        <h2 className="headline-lg text-[#F4F6F8] mb-6">
          THE<br />
          <span className="text-[#FF2D2D]">STREETS</span>
        </h2>
        <p className="body-text mb-8">
          Tag #UR1776 to get featured.
        </p>
        <button className="btn-primary">
          Submit your photo
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      {/* Right Mosaic Grid (3x2) */}
      <div
        className="absolute left-[36vw] top-[10vh] w-[58vw] h-[80vh]"
        style={{ zIndex: 2 }}
      >
        <div className="grid grid-cols-3 grid-rows-2 h-full">
          {communityImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => { tileRefs.current[index] = el; }}
              className="relative overflow-hidden card-border group"
            >
              <img
                src={image}
                alt={`Community photo ${index + 1}`}
                className="w-full h-full object-cover img-urban transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
