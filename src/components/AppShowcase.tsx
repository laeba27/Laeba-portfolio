import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Maximize2 } from 'lucide-react';
import { APP_CARDS } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalCards = APP_CARDS.length;
    const isMobile = window.innerWidth < 768;
    
    // We want the ScrollTrigger to scrub the progress from 0 to 1
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=500%', // 5 screens of scrolling for 5 cards
      pin: true,
      scrub: true, // Snappy 1:1 scroll without lag
      snap: {
         snapTo: 1 / totalCards, // Snap to each card perfectly
         duration: { min: 0.1, max: 0.2 },
         delay: 0,
         ease: 'power1.inOut'
      },
      onUpdate: (self) => {
        // self.progress goes from 0 to 1
        const progress = self.progress;
        
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          let relativeProgress = (progress - (index / totalCards)) % 1;
          if (relativeProgress < 0) relativeProgress += 1; // JS modulo bug fix for negatives
          if (relativeProgress >  0.5) relativeProgress -= 1;
          if (relativeProgress < -0.5) relativeProgress += 1;
          
          const diff = relativeProgress * totalCards;
          
          // Translate X: space them out evenly without huge gaps
          // The center card matches the phone perfectly. 
          // Side cards are offset by ~250px so they peek out nicely.
          const xOffset = diff * (isMobile ? -220 : -340); 
          
          // Slight 3D rotation
          let rotateY = diff * -15; 
          rotateY = Math.max(-25, Math.min(25, rotateY));
          const rotateX = Math.abs(diff) * -1;
          
          // Deeper Z translation to give a curved carousel feel
          const zZ = -(Math.abs(diff) * 120);
          
          const absDiff = Math.abs(diff);
          
          // Keep cards at the same size when moving to sides
          const scale = 1;
          
          // Subtle blur on sides
          const blur = isMobile ? Math.min(3, absDiff * 3) : Math.min(5, absDiff * 3);
          
          // Opacity fades out towards the edges (show 2 left, 2 right)
          const opacity = absDiff > 2.5 ? 0 : Math.max(0.7, 1 - absDiff * 0.15);
          
          const boxShadow = `0 ${5 + (1 - absDiff)*10}px ${10 + (1 - absDiff)*20}px rgba(0,0,0,0.15)`;

          gsap.set(card, {
            x: xOffset,
            z: zZ,
            rotateY: rotateY,
            rotateX: rotateX,
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            boxShadow: boxShadow
          });
        });
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F8F9FA] overflow-hidden flex items-center justify-center perspective-[1200px]">
      
      {/* No heading, just the immersive interactive gallery */}
      
      {/* Solid white background piece perfectly fitting behind the transparent center of the phone, to block the gray background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[296px] md:w-[318px] h-[641px] md:h-[695px] rounded-[38px] md:rounded-[40px] bg-[#fdfdfd] z-0 shadow-lg"></div>

      {/* Cards Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center absolute inset-0 z-20 pointer-events-none transform-style-preserve-3d"
      >
        {APP_CARDS.map((card, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            // Inner dimensions of the phone (accounting for borders)
            className="absolute w-[296px] md:w-[318px] h-[641px] md:h-[695px] rounded-[38px] md:rounded-[40px] overflow-hidden shadow-2xl bg-[#fdfdfd]"
            style={{ 
              transformOrigin: '50% 50%',
              // Initial state for JS-less or before GSAP loads
              opacity: 0, 
            }}
          >
            {/* Image Background */}
            <div 
               className="absolute inset-0 bg-cover bg-center rounded-[38px] md:rounded-[40px]"
               style={{ backgroundImage: `url(${card.image})` }}
            />
          </div>
        ))}
      </div>

      {/* The Phone Mockup Frame */}
      {/* 320x693 for mobile, 348x753 for desktop (maintains roughly 19.5:9 ratio of iPhone 15) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[350px] h-[665px] md:h-[727px] rounded-[50px] md:rounded-[56px] border-[12px] md:border-[16px] border-[#1c1c1e] z-30 pointer-events-none shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden bg-transparent">
        
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[95px] md:w-[105px] h-[28px] md:h-[32px] bg-[#1c1c1e] rounded-[30px] z-50"></div>
        
        {/* Status Bar */}
        <div className="absolute top-0 w-full px-6 pt-3 flex justify-between items-center text-black z-50 text-[12.5px] font-medium tracking-tight">
          <span className="ml-1 mt-0.5">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
            {/* Cellular signal */}
            <svg width="15" height="10" viewBox="0 0 16 10" fill="currentColor"><rect y="6" width="3" height="4" rx="1"/><rect x="4" y="4" width="3" height="6" rx="1"/><rect x="8" y="2" width="3" height="8" rx="1"/><rect x="12" width="3" height="10" rx="1"/></svg>
            {/* Wi-Fi */}
            <svg width="14" height="10" viewBox="0 0 16 12" fill="currentColor"><path d="M7.99992 11.6667C8.9204 11.6667 9.66659 10.9205 9.66659 10C9.66659 9.07952 8.9204 8.33333 7.99992 8.33333C7.07944 8.33333 6.33325 9.07952 6.33325 10C6.33325 10.9205 7.07944 11.6667 7.99992 11.6667Z"/><path d="M11.9056 6.36838C9.74697 4.20979 6.248 4.20976 4.08933 6.36838C3.7634 6.69429 3.23497 6.69427 2.90906 6.36833L2.2472 5.70644C1.92128 5.38052 1.9213 4.85208 2.24724 4.52618C5.42289 1.35061 10.5721 1.35062 13.7477 4.52618C14.0736 4.85208 14.0736 5.38052 13.7477 5.70644L13.0858 6.36833C12.7599 6.69427 12.2315 6.69429 11.9056 6.36838Z"/><path d="M15.5891 2.68472C11.396 -1.50831 4.60338 -1.50849 0.410142 2.68453C0.0842279 3.01043 0.0842095 3.53886 0.410115 3.86479L1.07198 4.52669C1.39789 4.85261 1.92633 4.85263 2.25225 4.52672C5.42817 1.35097 10.5714 1.35106 13.7471 4.52672C14.0731 4.85263 14.6015 4.85261 14.9274 4.52669L15.5893 3.86479C15.9152 3.53886 15.9152 3.01043 15.5891 2.68472Z"/></svg>
            {/* Battery */}
            <div className="w-[22px] h-[11px] border border-black/30 rounded-[4px] p-[1.5px] pr-[1px] relative">
              <div className="bg-black w-[80%] h-full rounded-[1.5px]"></div>
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2.5px] h-[4px] bg-black/40 rounded-r-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Center Transparent Area exactly where cards sit */}
        <div className="flex-grow w-full bg-transparent"></div>

      </div>

      {/* Expand/View full screen button at bottom right (like in screenshot) */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-50">
         <div className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-white transition-all text-[#0a2540] hover:scale-105">
            <Maximize2 size={24} />
         </div>
      </div>
      
    </section>
  );
}
