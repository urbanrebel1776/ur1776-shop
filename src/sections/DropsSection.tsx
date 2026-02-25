import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const drops = [
  {
    date: '14',
    month: 'FEB',
    title: 'JACKET DROP — FIELD COATS & LINERS',
    description: 'Heavyweight outerwear built for the elements. Limited run of 200 pieces.',
  },
  {
    date: '03',
    month: 'MAR',
    title: 'GRAPHIC PACK — PRINTED TEES & HOODIES',
    description: 'Bold prints, oversized fits. Drop-exclusive designs never to be restocked.',
  },
  {
    date: '21',
    month: 'MAR',
    title: 'BAG PROGRAM — TOTES & SLINGS',
    description: 'Utility-focused carry solutions. Water-resistant fabrics, all-black hardware.',
  },
];

const DropsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Timeline items animation
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: '-6vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.12,
            }
          );
        }
      });

      // Divider lines animation
      lineRefs.current.forEach((line) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0B0C0F] py-[10vh] px-[6vw] z-section-5"
    >
      {/* Heading Block */}
      <div ref={headingRef} className="max-w-[46vw] mb-16">
        <h2 className="headline-lg text-[#F4F6F8] mb-4">
          UPCOMING<br />
          <span className="text-[#FF2D2D]">DROPS</span>
        </h2>
        <p className="body-text">
          Limited runs. No restocks. Mark your calendar.
        </p>
      </div>

      {/* Timeline List */}
      <div className="max-w-[60vw]">
        {drops.map((drop, index) => (
          <div key={drop.title}>
            <div
              ref={(el) => { itemRefs.current[index] = el; }}
              className="flex gap-8 py-8"
            >
              {/* Date Block */}
              <div className="flex-shrink-0 w-20">
                <span className="block text-[#FF2D2D] font-display font-bold text-3xl">
                  {drop.date}
                </span>
                <span className="micro-label">{drop.month}</span>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="font-display font-bold text-xl text-[#F4F6F8] uppercase tracking-tight mb-2">
                  {drop.title}
                </h3>
                <p className="body-text">
                  {drop.description}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              ref={(el) => { lineRefs.current[index] = el; }}
              className="h-px bg-[rgba(244,246,248,0.12)] origin-left"
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <a href="#" className="link-arrow">
          Get drop reminders
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default DropsSection;
