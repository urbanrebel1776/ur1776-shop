import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgARef = useRef<HTMLDivElement>(null);
  const imgBRef = useRef<HTMLDivElement>(null);
  const imgCRef = useRef<HTMLDivElement>(null);
  const imgDRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Images fade in with scale
      loadTl.fromTo(
        [imgARef.current, imgBRef.current, imgCRef.current, imgDRef.current],
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out' }
      );

      // Headline words rise up
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // Overlay fade in
      loadTl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // Subheadline and CTAs
      loadTl.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Scroll-driven EXIT animation (70% - 100%)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([imgARef.current, imgBRef.current, imgCRef.current, imgDRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            gsap.set(overlayRef.current, { opacity: 1 });
          }
        }
      });

      // ENTRANCE (0% - 30%): Keep at settle state (load animation handled it)
      // SETTLE (30% - 70%): Hold static
      // EXIT (70% - 100%): Elements exit

      // Overlay exits
      scrollTl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Headline exits upward
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // CTA exits upward
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Images drift outward
      scrollTl.fromTo(
        imgARef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-18vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imgBRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '18vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imgCRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-18vw', y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        imgDRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '18vw', y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-1 bg-[#0B0C0F] flex items-center justify-center"
    >
      {/* Vignette overlay */}
      <div className="vignette" />

      {/* Micro label at top */}
      <div className="absolute top-[4vh] left-1/2 -translate-x-1/2 z-10">
        <span className="micro-label text-[#A6ACB6]">NEW SEASON — WORLDWIDE SHIPPING</span>
      </div>

      {/* Center Content Overlay - Behind text but above images */}
      <div
        ref={overlayRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-black/50 via-black/30 to-transparent backdrop-blur-[2px]" />
      </div>

      {/* Collage Images */}
      <div
        ref={imgARef}
        className="absolute left-[6vw] top-[10vh] w-[34vw] h-[34vh] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero_img_a.jpg"
          alt="Streetwear model"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      <div
        ref={imgBRef}
        className="absolute right-[6vw] top-[10vh] w-[34vw] h-[34vh] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero_img_b.jpg"
          alt="Streetwear detail"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      <div
        ref={imgCRef}
        className="absolute left-[6vw] bottom-[10vh] w-[34vw] h-[34vh] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero_img_c.jpg"
          alt="Full body streetwear"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      <div
        ref={imgDRef}
        className="absolute right-[6vw] bottom-[10vh] w-[34vw] h-[34vh] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero_img_d.jpg"
          alt="Streetwear accessories"
          className="w-full h-full object-cover img-urban"
        />
      </div>

      {/* Center Headline Block */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[72vw] text-center"
        style={{ zIndex: 5 }}
      >
        <h1 className="headline-xl text-[#F4F6F8] mb-6">
          <span className="word inline-block">BUILT</span>{' '}
          <span className="word inline-block text-[#FF2D2D]">DIFFERENT</span>
        </h1>
        <p className="body-text max-w-xl mx-auto">
          Streetwear engineered for motion. Drop-driven. Detail-obsessed.
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        className="absolute left-1/2 -translate-x-1/2 top-[72%] flex gap-4"
        style={{ zIndex: 5 }}
      >
        <button className="btn-primary">
          SHOP THE DROP
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
        <button className="btn-secondary">
          VIEW LOOKBOOK
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
