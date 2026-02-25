import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const collectionItems = [
  { name: 'OUTERWEAR', image: '/collection_outerwear.jpg' },
  { name: 'GRAPHIC TEES', image: '/collection_tees.jpg' },
  { name: 'BOTTOMS', image: '/collection_bottoms.jpg' },
  { name: 'HEADWEAR', image: '/collection_headwear.jpg' },
  { name: 'BAGS', image: '/collection_bags.jpg' },
  { name: 'ACCESSORIES', image: '/collection_accessories.jpg' },
];

const CollectionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Grid cards slide in from right with stagger
      cardRefs.current.forEach((card, index) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: '60vw', opacity: 0, scale: 0.96 },
            { x: 0, opacity: 1, scale: 1, ease: 'none' },
            0 + index * 0.025
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

      cardRefs.current.forEach((card, index) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: 0, opacity: 1 },
            { y: '-10vh', opacity: 0, ease: 'power2.in' },
            0.70 + index * 0.015
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-section-3 bg-[#0B0C0F]"
    >
      {/* Left Headline Column */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[26vw]"
        style={{ zIndex: 3 }}
      >
        <h2 className="headline-lg text-[#F4F6F8] mb-6">
          THE<br />
          <span className="text-[#FF2D2D]">COLLECTION</span>
        </h2>
        <p className="body-text mb-8">
          Outerwear, tees, bottoms, and accessories—designed oversized, built to last.
        </p>
        <a href="#" className="link-arrow">
          Shop all categories
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Right Grid (3x2) */}
      <div
        ref={gridRef}
        className="absolute left-[36vw] top-[14vh] w-[58vw] h-[72vh]"
        style={{ zIndex: 2 }}
      >
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full">
          {collectionItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="relative overflow-hidden card-border group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover img-urban transition-transform duration-500 group-hover:scale-105"
              />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="micro-label text-[#F4F6F8]">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
