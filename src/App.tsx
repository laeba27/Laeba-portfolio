import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import { Mail, Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import AppShowcase from './components/AppShowcase';
import { PROJECTS, EXPERIENCES, HERO_TEXT, ABOUT_ME_PARTS, ABOUT_IMAGES, SKILLS, CONTACT_DETAILS, SOCIAL_LINKS } from './data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function SparkleText() {
  const textRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const text = HERO_TEXT.title;
  const letters = text.split("");

  useEffect(() => {
    if (!textRef.current) return;

    // GSAP reveal animation
    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        x: -40,
        y: () => (Math.random() - 0.5) * 20,
        rotate: () => (Math.random() - 0.5) * 30,
        filter: 'blur(8px)',
      },
      { 
        opacity: 1, 
        x: 0, 
        y: 0,
        rotate: 0,
        filter: 'blur(0px)',
        stagger: {
          each: 0.05,
          from: "start"
        },
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Dust particles animation
    const particles = textRef.current.querySelectorAll('.particle');
    gsap.to(particles, {
      x: '+=100',
      y: '+=50',
      opacity: 0,
      duration: () => 1 + Math.random(),
      stagger: 0.02,
      delay: 0.5,
      ease: "power1.out"
    });

    // Fade in a "dust/glow" gradient from the left
    gsap.fromTo(".dust-overlay", 
      { x: '-50%', opacity: 0 },
      { x: '100%', opacity: 0.4, duration: 2.5, ease: "power2.inOut", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightStyle: CSSProperties = {
    clipPath: `circle(80px at ${mousePos.x}px ${mousePos.y}px)`,
    WebkitClipPath: `circle(80px at ${mousePos.x}px ${mousePos.y}px)`,
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };

  return (
    <div 
      className="relative cursor-none select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={textRef}
    >
      {/* Base Layer (Art Background / Dark Text) */}
      <h1 className="text-5xl sm:text-6xl md:text-[84px] font-normal leading-[0.9] tracking-tight text-ink relative z-0">
        {letters.map((char, i) => (
          <span key={i} className="char inline-block whitespace-pre relative">
            {char === " " ? "\u00A0" : char}
            {/* Tiny dust particle near each letter */}
            <span className="particle absolute top-0 left-0 w-1 h-1 bg-pastel-clay/40 rounded-full blur-[1px] opacity-100" />
          </span>
        ))}
      </h1>

      {/* Spotlight Layer (Dark Background / Light Text) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-lg bg-ink hidden md:block"
        style={spotlightStyle}
      >
        <h1 className="text-5xl sm:text-6xl md:text-[84px] font-normal leading-[0.9] tracking-tight text-art-bg w-full">
          {letters.map((char, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Dust/Sparkle overlay during animation */}
      <div className="dust-overlay absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-transparent via-pastel-clay/30 to-transparent blur-3xl mix-blend-screen" />

      {/* Custom Cursor Circle */}
      {isHovering && (
        <motion.div 
          animate={{ x: mousePos.x - 80, y: mousePos.y - 80 }}
          transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
          className="absolute w-40 h-40 border border-white/20 rounded-full z-30 pointer-events-none flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white rounded-full animate-ping" />
        </motion.div>
      )}
    </div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all hover:scale-110 hover:bg-pastel-clay border border-white/10 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ArrowDown className="w-5 h-5 md:w-6 md:h-6 rotate-180" />
    </motion.button>
  );
}

function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-ink py-4 md:py-6 flex items-center border-y border-white/10">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
            {['FULL STACK DEVELOPER', 'CREATIVE ENGINEERING', 'UI/UX DESIGN', 'INTERACTIVE EXPERIENCES', 'SYSTEM ARCHITECTURE'].map((skill, j) => (
              <React.Fragment key={j}>
                <span className="text-white/80 font-sans uppercase tracking-[0.2em] text-sm md:text-xl font-bold">
                  {skill}
                </span>
                <span className="text-pastel-clay text-lg md:text-2xl font-serif italic">{"//"}</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // About Section GSAP Refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTriggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!aboutRef.current || !aboutTriggerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin the whole section on desktop
      const pinTrigger = ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top top",
        end: "+=120%", 
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });

      // Progress bar animation
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        }
      });

      // Animate right gallery top to bottom (scrolls down)
      gsap.fromTo(".gallery-inner", 
        { y: "-82%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
          }
        }
      );

      // Animate left paragraph bottom to top (scrolls up)
      gsap.fromTo(".about-para-container",
        { y: 150 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // On mobile, just do a simple parallax without pinning the whole section
      gsap.fromTo(".about-para-container",
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
      
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    return () => mm.revert();
  }, { scope: aboutRef });

  // Journey GSAP Ref
  const journeyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!journeyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeyRef.current,
        start: 'top top',
        end: `+=${EXPERIENCES.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    // Clock Animation
    // Explicitly set the initial rotation so GSAP knows how to parse it easily, overriding the inline style
    gsap.set('.clock-minute-hand', { rotation: -90 });
    tl.to('.clock-minute-hand', {
      rotation: -90 + (EXPERIENCES.length * 720), // 2 full circles per experience to make it spin faster
      ease: 'none',
      duration: 1
    }, 0);

    gsap.set('.clock-hour-hand', { rotation: -90 });
    tl.to('.clock-hour-hand', {
      rotation: -90 + (EXPERIENCES.length * 60), // proportional spin
      ease: 'none',
      duration: 1
    }, 0);

    // Spin the whole dial counter-clockwise, and counter-spin the numbers so they stay upright
    tl.to('.clock-dial', {
       rotation: -(EXPERIENCES.length * 60),
       ease: 'none',
       duration: 1
    }, 0);
    tl.to('.clock-number-container', {
       rotation: `+=${EXPERIENCES.length * 60}`,
       ease: 'none',
       duration: 1
    }, 0);

    // Background color transition for Journey section
    tl.to(journeyRef.current, {
       keyframes: [
          { backgroundColor: '#F9F8F6', duration: 0.25 },
          { backgroundColor: '#EFE9E3', duration: 0.25 },
          { backgroundColor: '#D9CFC7', duration: 0.25 },
          { backgroundColor: '#C9B59C', duration: 0.25 }
       ],
       ease: 'none',
       duration: 1
    }, 0);

    // Fade the pseudo-background of right container to match
    tl.to('.journey-right-bg', {
       keyframes: [
          { backgroundColor: '#F9F8F6', duration: 0.25 },
          { backgroundColor: '#EFE9E3', duration: 0.25 },
          { backgroundColor: '#D9CFC7', duration: 0.25 },
          { backgroundColor: '#C9B59C', duration: 0.25 }
       ],
       ease: 'none',
       duration: 1
    }, 0);

    // Center dot background match (if needed)
    tl.to('.clock-center-dot', {
       keyframes: [
          { backgroundColor: '#F9F8F6', duration: 0.25 },
          { backgroundColor: '#EFE9E3', duration: 0.25 },
          { backgroundColor: '#D9CFC7', duration: 0.25 },
          { backgroundColor: '#C9B59C', duration: 0.25 }
       ],
       ease: 'none',
       duration: 1
    }, 0);

    // Scroll wrapper
    tl.to('.journey-wrapper', {
      y: () => {
         const wh = window.innerHeight;
         const elem = document.querySelector('.journey-wrapper') as HTMLElement;
         const dh = elem ? elem.scrollHeight : 0;
         return -(dh - wh); 
      },
      duration: 1,
      ease: 'none'
    }, 0);

    // Fade items
    EXPERIENCES.forEach((_, i) => {
       const step = 1 / EXPERIENCES.length;
       const start = i * step;
       
       tl.to(`.journey-item-${i}`, {
          opacity: 1,
          duration: step * 0.2,
          ease: 'power1.inOut'
       }, start);

       if (i < EXPERIENCES.length - 1) {
         tl.to(`.journey-item-${i}`, {
            opacity: 0.2,
            duration: step * 0.2,
            ease: 'power1.inOut'
         }, start + step * 0.8);
       }
    });

  }, { scope: journeyRef });

  // Skills Section GSAP Ref
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!skillsRef.current) return;

    gsap.to('.skills-circle', {
      rotation: 180, // Rotate halfway to show the other half
      ease: 'none',
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // Keep icons upright by rotating them in the opposite direction
    gsap.to('.skill-item-inner', {
      rotation: -180,
      ease: 'none',
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
      }
    });

  }, { scope: skillsRef });

  // Projects Section GSAP Ref
  const projectsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!projectsRef.current) return;

    // Initial setup
    PROJECTS.forEach((_, i) => {
      const isEven = i % 2 === 0;
      gsap.set(`.project-media-${i}`, { x: isEven ? "100vw" : "-100vw", opacity: 0 });
      gsap.set(`.project-content-${i}`, { y: 100, opacity: 0 });
      gsap.set(`.project-slide-${i}`, { pointerEvents: "none" });
      gsap.set(`.macbook-lid-${i}`, { rotateX: -95 }); // Lid closed
      gsap.set(`.website-screencap-${i}`, { yPercent: 0 }); // Website at top
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top top",
        end: `+=${PROJECTS.length * 200}%`,
        pin: true,
        scrub: 1.5,
      }
    });

    PROJECTS.forEach((_, i) => {
      const isEven = i % 2 === 0;

      // Start entering -> enable pointer events instantly
      tl.set(`.project-slide-${i}`, { pointerEvents: "auto" });

      // Enter
      tl.to(`.project-media-${i}`, {
        x: "0vw",
        opacity: 1,
        duration: 2.0,
        ease: "power2.out"
      })
      .to(`.project-content-${i}`, {
        y: 0,
        opacity: 1,
        duration: 2.0,
        ease: "power2.out"
      }, "<")
      // Open Lid
      .to(`.macbook-lid-${i}`, {
        rotateX: 0,
        duration: 2.5,
        ease: "power2.inOut"
      }, "-=0.8")
      // Scroll Website
      .to(`.website-screencap-${i}`, {
        yPercent: -40,
        duration: 3.5,
        ease: "power1.inOut"
      }, "-=1.5");

      // Hold in center
      tl.to({}, { duration: 1.5 });

      // Exit (except last one)
      if (i < PROJECTS.length - 1) {
        // Close lid
        tl.to(`.macbook-lid-${i}`, {
          rotateX: -95,
          duration: 2.0,
          ease: "power2.inOut"
        })
        // Slide out
        .to(`.project-media-${i}`, {
          x: isEven ? "100vw" : "-100vw", // media goes back
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut"
        }, "-=1.0")
        .to(`.project-content-${i}`, {
          y: -100,
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut"
        }, "<");

        // Finished exiting -> disable pointer events instantly
        tl.set(`.project-slide-${i}`, { pointerEvents: "none" });
      }
    });

    return () => {
      tl.kill();
    };
  }, { scope: projectsRef });

  // Use constants imported from data.ts

  return (
    <div ref={containerRef} className="bg-art-bg min-h-screen relative overflow-x-hidden custom-scroll selection:bg-pastel-clay/50">
      {/* Background Decor Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <svg className="absolute w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0h40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-ink" />
        </svg>
      </div>

      <ScrollToTop />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="text-center z-10 w-full max-w-5xl"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] uppercase tracking-[0.2em] text-ink/60 mb-8 block font-sans"
          >
            Portfolio 2026 / Volume I
          </motion.span>
          
          <div className="mb-12 flex justify-center">
            <SparkleText />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg italic font-serif opacity-70 max-w-lg mx-auto leading-relaxed"
          >
            {HERO_TEXT.subtitle}
          </motion.p>
          
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.4 }}
           className="mt-12 mx-auto bg-white/80 backdrop-blur-md p-2 rounded-[32px] border border-ink/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center gap-2 max-w-fit"
          >
           <a href="#contact" className="px-6 py-3 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-bold text-ink hover:bg-pastel-clay hover:text-white transition-all">Get in touch</a>
           <a href="#" className="px-6 py-3 rounded-full bg-ink text-white text-xs font-sans uppercase tracking-[0.2em] font-bold hover:bg-pastel-clay transition-all flex items-center gap-2">
            <span>Resume</span>
            <ArrowDown className="w-4 h-4 -rotate-90" />
           </a>
          </motion.div>
        </motion.div>

        {/* Abstract Background Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -left-[10%] w-[50%] aspect-square bg-pastel-mint/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-[10%] w-[40%] aspect-square bg-pastel-rose/30 rounded-full blur-[120px]"
        />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-10 flex flex-col items-start gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink/30 italic font-serif">Deep Whisper</span>
          <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center text-xs">↓</div>
        </motion.div>
      </section>

      {/* Break empty feeling */}
      <MarqueeBanner />

      {/* GSAP Sticky Philosophy Section */}
      <section id="about" ref={aboutRef} className="relative bg-ink/5 overflow-hidden">
        <div ref={aboutTriggerRef} className="w-full h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-20 relative">
          <div className="w-full max-w-7xl h-[85vh] md:h-[85vh] flex flex-col md:flex-row bg-white rounded-[32px] md:rounded-[40px] border border-black/5 overflow-hidden shadow-2xl relative">
            
            {/* Side Label */}
            <div className="hidden md:flex flex-col border-r border-black/10 py-12 px-4 justify-between items-center bg-[#fafafa] w-20 z-30">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.4em] opacity-30 font-sans font-bold">Thought / 2026</span>
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.4em] opacity-30 font-sans font-bold">Philosophy / Core</span>
            </div>

            {/* Left Content: Narrative Section */}
            <div className="flex-[1.4] relative flex flex-col bg-white overflow-hidden border-r border-black/5">
              <div className="pt-12 md:pt-24 px-6 md:px-24 mb-6">
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-pastel-clay-dark font-sans block mb-3 font-bold">Introduction</span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-ink leading-[1] tracking-tighter">
                  About <br className="hidden md:block" /> <span className="text-pastel-clay">Me.</span>
                </h2>
              </div>
              
              <div className="flex-1 relative flex items-center px-6 md:px-24 overflow-hidden">
                <div className="w-full relative z-10 flex flex-col justify-center">
                  <div className="about-para-container w-full">
                    <p className="font-serif text-xl md:text-2xl leading-relaxed max-w-lg text-ink/80">
                      {ABOUT_ME_PARTS.map((text, i) => (
                        <span key={i} className="about-item inline-block">
                          {text}&nbsp;
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-12 md:pb-20 px-6 md:px-24 flex items-center gap-6">
                <div className="flex-1 h-[1px] bg-black/5 overflow-hidden">
                  <div className="progress-bar h-full bg-pastel-clay origin-left scale-x-0" />
                </div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] opacity-30 italic font-bold text-ink">Narrative</span>
              </div>
            </div>

            {/* Right Images: Narrative Gallery */}
            <div className="flex-1 relative overflow-hidden bg-art-bg/10 h-full hidden md:block">
              <div className="gallery-inner flex flex-col gap-12 p-12">
                {ABOUT_IMAGES.map((img, i) => (
                  <div key={i} className="aspect-[4/5] w-full rounded-[28px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl border border-black/5 bg-white">
                    <img 
                      src={img} 
                      alt={`Narrative Visual ${i}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" ref={journeyRef} className="relative bg-[#F4F1EA] text-ink h-screen overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left: Clock */}
          <div className="absolute inset-0 w-full h-full md:relative md:w-1/2 flex items-center justify-start overflow-hidden opacity-20 md:opacity-100 pointer-events-none md:pointer-events-auto z-0">
             {/* Semi-circle */}
             <div className="absolute left-1/2 md:left-0 top-1/2 -translate-y-1/2 w-[120vh] h-[120vh] rounded-full border border-ink/10 -translate-x-1/2 flex items-center justify-center bg-transparent md:bg-[#FAFAF5] shadow-none md:shadow-inner">
                {/* Clock indicators and numbers */}
                <div className="absolute inset-0 w-full h-full clock-dial">
                  {[...Array(12)].map((_, i) => {
                    const num = i === 0 ? 12 : i;
                    // Adjusted angle so 12 is precisely at the top (i=0 -> -90deg)
                    // The wrapper pivots from center. We'll stretch it w-[100%] h-[1px]
                    const angle = i * 30 - 90;
                    return (
                      <div key={i} className="absolute top-1/2 left-0 w-full h-[1px] flex justify-end items-center" style={{ transform: `rotate(${angle}deg)` }}>
                        <div className="absolute right-[80px] md:right-[100px] clock-number-container flex justify-center items-center w-12 h-12" style={{ transform: `rotate(${-angle}deg)` }}>
                          <span className="font-serif text-3xl font-light text-ink/30 italic">{num.toString().padStart(2, '0')}</span>
                        </div>
                        <div className={`mr-4 md:mr-6 bg-ink/20 ${i % 3 === 0 ? 'w-10 md:w-16 h-[2px]' : 'w-6 h-[1px]'}`} />
                      </div>
                    );
                  })}
                </div>
                
                {/* Hands moved outside clock-dial so they spin independently */}
                {/* Minute Hand */}
                <div className="clock-minute-hand absolute top-1/2 left-1/2 w-[2px] h-[2px] z-10 origin-center">
                  <div className="absolute top-1/2 left-0 w-[45vh] h-[2px] bg-ink/40 origin-left rounded-full -translate-y-1/2" />
                </div>
                {/* Hour Hand */}
                <div className="clock-hour-hand absolute top-1/2 left-1/2 w-[2px] h-[2px] z-10 origin-center">
                  <div className="absolute top-1/2 left-0 w-[30vh] h-[4px] bg-ink origin-left rounded-full -translate-y-1/2" />
                </div>

                {/* Center dot outside dial so it doesn't spin */}
                <div className="clock-center-dot absolute top-1/2 left-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#F4F1EA] border-4 border-ink -translate-x-1/2 -translate-y-1/2 shadow-xl z-20" />
             </div>
          </div>
          {/* Right: Content container */}
          <div className="journey-right-bg w-full md:w-1/2 h-full relative overflow-hidden z-10 md:bg-[#F4F1EA]">
             <div className="journey-wrapper absolute top-0 left-0 w-full pt-[50vh] pb-[50vh] px-8 md:px-24 flex flex-col pointer-events-auto">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className={`journey-item-${i} mb-40 opacity-20 transition-opacity duration-300 last:mb-0`}>
                    <span className="text-xs font-sans tracking-[0.2em] uppercase opacity-50 block mb-6">{exp.period}</span>
                    <h3 className="text-4xl md:text-5xl font-serif italic mb-4 text-ink leading-tight">{exp.role}</h3>
                    <h4 className="text-lg md:text-xl font-sans uppercase tracking-widest mb-8 text-pastel-clay-dark">{exp.company}</h4>
                    <p className="font-serif text-xl md:text-2xl leading-relaxed max-w-lg opacity-80 text-ink">{exp.description}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="relative bg-white text-ink h-screen overflow-hidden flex items-end justify-center pb-0">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 bg-[#fafafa]" />
        
        {/* Central Content */}
        <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none mt-10 md:mt-24 bottom-[15vh] md:bottom-[20vh]">
            <h2 className="text-[100px] md:text-[180px] font-serif italic text-ink/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden">Skills</h2>
            <div className="relative text-center pointer-events-auto">
               <div className="w-20 h-20 md:w-32 md:h-32 bg-ink text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative overflow-hidden">
                 <span className="font-serif italic text-3xl md:text-5xl font-light"><span className="text-pastel-clay">{"</>"}</span></span>
                 <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-tr from-white/0 to-white/40" />
               </div>
               <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.3em] opacity-40 block mb-2 font-bold">Full Stack</span>
               <h3 className="text-4xl md:text-6xl font-serif italic text-ink drop-shadow-sm">Digital <span className="text-pastel-clay">Toolkit</span></h3>
            </div>
        </div>

        {/* Outer Rotating Circle */}
        <div className="absolute bottom-0 translate-y-[45%] md:translate-y-1/2 left-1/2 -translate-x-1/2">
          {/* We make the radius large enough that it arcs over the content */}
          <div className="skills-circle relative w-[180vw] h-[180vw] max-w-[800px] max-h-[800px] md:max-w-[1200px] md:max-h-[1200px] border border-ink/10 rounded-full flex items-center justify-center">
            {SKILLS.map((skill, i) => {
               const angle = (i / SKILLS.length) * 360; // Spread evenly
               return (
                 <div 
                   key={i} 
                   className="absolute w-full h-full pointer-events-none" 
                   style={{ transform: `rotate(${angle}deg)` }}
                 >
                   {/* Item container pushed to edge of circle */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-[30px] md:-mt-[40px] pointer-events-auto">
                     {/* Negate static rotation */}
                     <div className="w-full h-full" style={{ transform: `rotate(${-angle}deg)` }}>
                       {/* GSAP inner rotation */}
                       <div className="skill-item-inner relative group cursor-pointer">
                         <div className="w-16 h-16 md:w-24 md:h-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-ink/5 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] hover:bg-white z-10 relative">
                           <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-12 md:h-12 opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 drop-shadow-sm" />
                         </div>
                         {/* Tooltip */}
                         <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-ink/90 backdrop-blur-md text-white text-[10px] md:text-xs tracking-widest uppercase px-4 py-2 rounded-full pointer-events-none whitespace-nowrap shadow-xl z-20 font-sans border border-white/10">
                           {skill.name}
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Project Pinned Section */}
      <section id="projects" ref={projectsRef} className="relative bg-[#fafafa] overflow-hidden h-screen text-ink">
        <div className="absolute inset-0 w-full h-full">
          {PROJECTS.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`project-slide project-slide-${i} absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-24`}>
                {isEven ? (
                  <>
                    {/* Content on Left */}
                    <div className={`project-content-${i} flex-1 flex flex-col items-start justify-center pr-0 md:pr-12 w-full z-10`}>
                      <div>
                        <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-ink/40 mb-4 block">{project.category}</span>
                        <h3 className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight">{project.title}</h3>
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink/70 mb-8 max-w-md">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-6 mt-4">
                          <span className="text-xs uppercase font-sans tracking-widest px-4 py-2 border border-ink/10 rounded-full">React</span>
                          <span className="text-xs uppercase font-sans tracking-widest px-4 py-2 border border-ink/10 rounded-full">Tailwind</span>
                          <a href={project.link} className="flex items-center gap-2 text-xs uppercase font-sans tracking-widest hover:text-pastel-clay transition-colors"><Github size={16}/> GitHub</a>
                        </div>
                      </div>
                    </div>
                    {/* Media on Right */}
                    <div className={`project-media-${i} flex-[1.3] w-full max-w-4xl px-0 md:px-4 relative z-0`}>
                      <div className="w-full" style={{ perspective: "2500px" }}>
                        <div className="w-full relative" style={{ transformStyle: "preserve-3d", transform: "rotateX(5deg) rotateY(-5deg)" }}>
                          {/* Screen / Lid */}
                          <div className={`macbook-lid-${i} relative w-full aspect-[1.6] origin-bottom`} style={{ transformStyle: "preserve-3d", transform: "rotateX(-95deg)" }}>
                            
                            {/* Back of Lid (visible when closed) */}
                            <div className="absolute inset-0 w-full h-full bg-[#f0f0f0] rounded-t-2xl md:rounded-t-3xl border-2 border-[#e0e0e0] flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d5d5d5] flex items-center justify-center opacity-80 shadow-inner">
                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white opacity-80" />
                              </div>
                            </div>
                            
                            {/* Front of Lid (Screen) */}
                            <div className="absolute inset-0 w-full h-full bg-[#111] rounded-t-2xl md:rounded-t-[20px] border-[8px] md:border-[12px] border-[#111] shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
                              <div className="w-full h-full relative overflow-hidden bg-gray-900 rounded-t-lg rounded-b-sm">
                                <img src={project.image} alt={project.title} className={`website-screencap-${i} w-full h-auto min-h-full object-top block`} />
                                <div className={`absolute inset-0 mix-blend-multiply opacity-20 ${project.color} pointer-events-none`} />
                              </div>
                            </div>
                          </div>
                          
                          {/* Base */}
                          <div className="relative w-[104%] -left-[2%] h-3 md:h-5 bg-[#f0f0f0] rounded-b-2xl md:rounded-b-3xl mt-[-1px] shadow-2xl border-t-[2px] border-[#d5d5d5] flex justify-center z-10" style={{ transformStyle: "preserve-3d" }}>
                            <div className="w-1/5 h-1 md:h-2 bg-[#d5d5d5] rounded-b-md shadow-inner"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Media on Left */}
                    <div className={`project-media-${i} flex-[1.3] w-full max-w-4xl px-0 md:px-4 relative md:order-1 order-2 z-0`}>
                      <div className="w-full" style={{ perspective: "2500px" }}>
                        <div className="w-full relative" style={{ transformStyle: "preserve-3d", transform: "rotateX(5deg) rotateY(5deg)" }}>
                          {/* Screen / Lid */}
                          <div className={`macbook-lid-${i} relative w-full aspect-[1.6] origin-bottom`} style={{ transformStyle: "preserve-3d", transform: "rotateX(-95deg)" }}>
                            
                            {/* Back of Lid (visible when closed) */}
                            <div className="absolute inset-0 w-full h-full bg-[#f0f0f0] rounded-t-2xl md:rounded-t-3xl border-2 border-[#e0e0e0] flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d5d5d5] flex items-center justify-center opacity-80 shadow-inner">
                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white opacity-80" />
                              </div>
                            </div>
                            
                            {/* Front of Lid (Screen) */}
                            <div className="absolute inset-0 w-full h-full bg-[#111] rounded-t-2xl md:rounded-t-[20px] border-[8px] md:border-[12px] border-[#111] shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
                              <div className="w-full h-full relative overflow-hidden bg-gray-900 rounded-t-lg rounded-b-sm">
                                <img src={project.image} alt={project.title} className={`website-screencap-${i} w-full h-auto min-h-full object-top block`} />
                                <div className={`absolute inset-0 mix-blend-multiply opacity-20 ${project.color} pointer-events-none`} />
                              </div>
                            </div>
                          </div>
                          
                          {/* Base */}
                          <div className="relative w-[104%] -left-[2%] h-3 md:h-5 bg-[#f0f0f0] rounded-b-2xl md:rounded-b-3xl mt-[-1px] shadow-2xl border-t-[2px] border-[#d5d5d5] flex justify-center z-10" style={{ transformStyle: "preserve-3d" }}>
                            <div className="w-1/5 h-1 md:h-2 bg-[#d5d5d5] rounded-b-md shadow-inner"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Content on Right */}
                    <div className={`project-content-${i} flex-1 flex flex-col items-start md:items-end md:text-right justify-center pl-0 md:pl-12 w-full mt-8 md:mt-0 z-10 md:order-2 order-1`}>
                      <div>
                        <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-ink/40 mb-4 block">{project.category}</span>
                        <h3 className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight">{project.title}</h3>
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink/70 mb-8 max-w-md ml-auto">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap items-center md:justify-end gap-6 mt-4">
                          <span className="text-xs uppercase font-sans tracking-widest px-4 py-2 border border-ink/10 rounded-full">Next.js</span>
                          <span className="text-xs uppercase font-sans tracking-widest px-4 py-2 border border-ink/10 rounded-full">GSAP</span>
                          <a href={project.link} className="flex items-center gap-2 text-xs uppercase font-sans tracking-widest hover:text-pastel-clay transition-colors"><Github size={16}/> GitHub</a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <AppShowcase />

      {/* Contact & Footer Section */}
      <section id="contact" className="bg-ink text-white rounded-[32px] mx-4 md:mx-6 mb-6 p-8 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[90vh]">
        
        {/* Top: Header */}
        <div className="relative z-10 mb-16 md:mb-24">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-sans block mb-6">Let's connect</span>
             <h2 className="text-5xl md:text-7xl font-serif italic mb-4">Start a conversation.</h2>
             <p className="text-white/40 text-xl font-serif max-w-md">Currently open for new opportunities to build something extraordinary.</p>
           </motion.div>
        </div>

        {/* Middle: Contact Form & Info */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 md:gap-24 relative z-10 w-full flex-grow">
           
           {/* Left: Email, Socials (The Info) */}
           <div className="xl:col-span-4 flex flex-col gap-16 justify-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group inline-block w-max"
              >
                 <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans font-bold block mb-4">Direct Communication</span>
                 <a href={`mailto:${CONTACT_DETAILS.email}`} className="font-serif italic text-3xl md:text-3xl lg:text-4xl text-white hover:text-pastel-clay transition-colors block relative z-10 break-all">
                   {CONTACT_DETAILS.email}
                 </a>
                 <div className="absolute -top-12 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-white text-ink text-[10px] md:text-xs uppercase tracking-widest py-2 px-6 rounded-full pointer-events-none whitespace-nowrap shadow-xl z-20 font-bold border border-ink/10">
                   Send message here
                 </div>
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                 <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans font-bold block mb-4">Elsewhere</span>
                 <div className="flex gap-4">
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink hover:scale-110 transition-all duration-300">
                      <Github size={18} />
                    </a>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink hover:scale-110 transition-all duration-300">
                      <Linkedin size={18} />
                    </a>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink hover:scale-110 transition-all duration-300">
                      <Instagram size={18} />
                    </a>
                 </div>
              </motion.div>
           </div>

           {/* Right: Contact Form */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="xl:col-span-8 flex flex-col bg-[#151515] rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden"
           >
              {/* Subtle noise background for form card */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans font-bold block mb-10 relative z-10">Inquiry Form</span>
              
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-12 flex-grow flex flex-col relative z-10">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="border-b border-white/10 pb-4 flex flex-col gap-2 group">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans group-focus-within:text-pastel-clay transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    placeholder="Your email address..." 
                    className="bg-transparent py-2 text-lg focus:text-pastel-clay outline-none transition-colors italic font-serif placeholder:text-white/10"
                  />
                </div>

                <div className="border-b border-white/10 pb-4 flex flex-col gap-2 flex-grow group">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans group-focus-within:text-pastel-clay transition-colors">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={1}
                    placeholder="Tell me about your project..." 
                    className="bg-transparent py-2 text-lg focus:text-pastel-clay outline-none transition-colors resize-none italic font-serif placeholder:text-white/10"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="group flex items-center justify-between bg-white text-ink px-10 py-5 rounded-full font-sans uppercase tracking-[0.2em] text-[10px] lg:text-xs font-bold hover:bg-pastel-clay hover:text-white transition-all transform hover:scale-[1.02] shadow-xl w-full sm:w-auto">
                      <span>Send Message</span>
                      <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-2 transition-transform ml-8" />
                  </button>
                </div>
              </form>
           </motion.div>
        </div>

        {/* Bottom: Footer Area */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10 w-full">
           {/* Copyright */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="order-2 md:order-1 flex flex-col gap-2 w-full md:w-auto"
           >
              <p className="text-white/30 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em]">© {new Date().getFullYear()} Laeba.</p>
              <p className="text-white/10 text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em]">Crafted with silence.</p>
           </motion.div>

           {/* Aesthetic Line Art SVG (Minimal Desk Setup) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 0.4, scale: 1 }}
             whileHover={{ opacity: 1, scale: 1.02 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="w-full md:w-[45%] max-w-[400px] pointer-events-auto order-1 md:order-2 flex justify-end cursor-pointer"
           >
             <svg viewBox="0 0 500 250" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-auto text-pastel-clay drop-shadow-2xl mix-blend-screen">
                {/* Desk Line */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 220 L480 220" />
                {/* Laptop Base */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M120 220 L150 130 L280 140 L310 220 Z" />
                {/* Laptop Screen inner */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M120 220 L320 220 L310 220" />
                {/* Coffee Cup */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M380 220 L380 180 C380 170 410 170 410 180 L410 220 Z" />
                {/* Coffee Cup Handle */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M410 190 C425 190 425 210 410 210" />
                {/* Pen Stand */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M440 220 L445 150 L475 150 L480 220 Z" />
                {/* Pens */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M455 150 L440 90" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M460 150 L465 80" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M465 150 L490 100" />
                {/* Person Head + Torso Silhouette */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M280 140 C280 140 250 80 290 40 C320 10 360 20 370 70 C375 90 370 120 370 120 L330 140" />
                {/* Arm / Hand */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M370 120 C380 140 400 170 410 200" />
                {/* Book on Desk */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M300 230 L340 245 L450 245 L410 230 Z" />
             </svg>
           </motion.div>
        </div>
      </section>
    </div>
  );
}
