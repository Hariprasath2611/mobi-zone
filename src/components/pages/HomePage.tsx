// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Wrench, ShoppingBag, Star, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

// --- 1. UTILITIES & SHARED COMPONENTS ---

/**
 * AnimatedElement
 * Mandatory implementation for scroll-triggered reveals using IntersectionObserver.
 */
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via style if needed, or just let CSS handle it
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`reveal-base ${className || ''}`}>{children}</div>;
};

/**
 * StickyCursor
 * A custom cursor effect that follows the mouse (optional enhancement for "Living" feel)
 */
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 w-6 h-6 bg-neonaccent rounded-full mix-blend-difference pointer-events-none z-50 transition-transform duration-75 ease-out hidden lg:block"
            style={{ 
                transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)` 
            }}
        />
    );
};

// --- 2. SECTIONS ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative w-full bg-background bg-liquid-ether overflow-hidden">
      {/* Top Bar - Neon Accent */}
      <div className="w-full bg-secondary py-4 px-6 lg:px-12 border-b border-primary/20">
        <div className="max-w-[120rem] mx-auto flex justify-between items-center">
          <span className="font-heading uppercase text-sm tracking-widest text-primary">Est. 2024</span>
          <div className="flex gap-8">
            <span className="font-heading uppercase text-sm tracking-widest text-primary hidden sm:block">Premium Devices</span>
            <span className="font-heading uppercase text-sm tracking-widest text-primary hidden sm:block">Expert Repairs</span>
          </div>
          <Link to="/store" className="font-heading uppercase text-sm tracking-widest text-neonaccent flex items-center gap-2 hover:underline">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pt-20 pb-32">
        
        {/* Split Intro Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border-b border-primary/10 pb-12">
          <AnimatedElement>
            <h2 className="font-heading text-2xl lg:text-3xl uppercase leading-tight text-primary max-w-xl">
              The curated collection of mobile technology for the modern era.
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <p className="font-paragraph text-lg text-primary/80 max-w-xl md:ml-auto">
              Founded on the principles of precision and performance, we pride ourselves on presenting thought-provoking technology and reliable service solutions for the devices that connect your world.
            </p>
          </AnimatedElement>
        </div>

        {/* Massive Typography */}
        <div className="relative w-full overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[18vw] leading-[0.8] uppercase text-neonaccent tracking-tighter text-center md:text-left"
          >
            MOBILE
          </motion.h1>
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[18vw] leading-[0.8] uppercase text-neonaccent tracking-tighter text-right"
          >
            FUTURE
          </motion.h1>
        </div>

        {/* Hero Image with Parallax */}
        <div className="relative w-full h-[70vh] overflow-hidden bg-secondary">
            <motion.div style={{ y: y1 }} className="w-full h-[120%] -mt-[10%]">
                <Image 
                    src="https://static.wixstatic.com/media/5283f4_167d746e338a4df296a2e86d1b5b1b12~mv2.png?originWidth=1600&originHeight=896"
                    alt="Latest smartphone model in sleek environment"
                    className="w-full h-full object-cover"
                    width={2400}
                />
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-12 left-6 lg:left-12 bg-secondary p-6 max-w-xs border border-neonaccent/30 shadow-2xl z-10"
            >
                <p className="font-heading uppercase text-sm text-neonaccent mb-2">New Arrival</p>
                <p className="font-paragraph text-sm text-primary/80 mb-4">Experience the next generation of connectivity with our latest flagship devices.</p>
                <Link to="/store" className="text-xs font-heading uppercase underline decoration-neonaccent decoration-2 underline-offset-4">View Collection</Link>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  return (
    <div className="w-full bg-secondary py-8 overflow-hidden border-y border-primary/20">
      <div className="marquee-container flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl lg:text-6xl font-heading uppercase text-transparent stroke-text-cyan">REPAIRS</span>
              <Star className="w-8 h-8 text-neonaccent fill-neonaccent" />
              <span className="text-4xl lg:text-6xl font-heading uppercase text-primary">ACCESSORIES</span>
              <Star className="w-8 h-8 text-neonaccent fill-neonaccent" />
              <span className="text-4xl lg:text-6xl font-heading uppercase text-transparent stroke-text-cyan">DEVICES</span>
              <Star className="w-8 h-8 text-neonaccent fill-neonaccent" />
              <span className="text-4xl lg:text-6xl font-heading uppercase text-primary">UPGRADES</span>
              <Star className="w-8 h-8 text-neonaccent fill-neonaccent" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const StickyServicesSection = () => {
    const services = [
        {
            id: "01",
            title: "Screen Replacement",
            desc: "Premium OLED and LCD replacements for all major brands. Restoring clarity and touch responsiveness.",
            icon: <Smartphone className="w-6 h-6" />,
            image: "https://static.wixstatic.com/media/5283f4_f0e144890a654d75a109aa7a763746ac~mv2.png?originWidth=576&originHeight=448"
        },
        {
            id: "02",
            title: "Battery Diagnostics",
            desc: "Comprehensive power analysis and battery replacement to ensure your device lasts all day.",
            icon: <Zap className="w-6 h-6" />,
            image: "https://static.wixstatic.com/media/5283f4_f981dc75274743e9aa27f8af5b3543fc~mv2.png?originWidth=576&originHeight=448"
        },
        {
            id: "03",
            title: "Hardware Repair",
            desc: "Micro-soldering and component-level repairs for water damage, charging ports, and logic boards.",
            icon: <Wrench className="w-6 h-6" />,
            image: "https://static.wixstatic.com/media/5283f4_0bce7fdf43f4442692839e8ddbfa2a9a~mv2.png?originWidth=576&originHeight=448"
        }
    ];

    return (
        <section className="w-full bg-background bg-liquid-ether py-32 border-b border-primary/10">
            <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Sticky Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <AnimatedElement>
                                <h2 className="font-heading text-5xl lg:text-7xl uppercase text-primary mb-8 leading-none">
                                    Expert<br/><span className="text-transparent stroke-text-cyan">Services</span>
                                </h2>
                            </AnimatedElement>
                            <AnimatedElement delay={100}>
                                <p className="font-paragraph text-lg text-primary/70 mb-8 max-w-md">
                                    Our certified technicians use state-of-the-art diagnostic tools to bring your devices back to life. Quality guaranteed.
                                </p>
                            </AnimatedElement>
                            <AnimatedElement delay={200}>
                                <Link to="/services">
                                    <Button className="bg-neonaccent text-background hover:bg-neonaccent/80 rounded-none px-8 py-6 font-heading uppercase tracking-wider text-sm transition-all duration-300">
                                        View All Services
                                    </Button>
                                </Link>
                            </AnimatedElement>
                        </div>
                    </div>

                    {/* Scrolling Content */}
                    <div className="lg:w-2/3 space-y-24">
                        {services.map((service, index) => (
                            <AnimatedElement key={index} className="group">
                                <div className="border-t border-primary/20 pt-8">
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="font-heading text-neonaccent text-xl">/{service.id}</span>
                                        <div className="p-3 bg-secondary rounded-full group-hover:bg-neonaccent/20 transition-colors duration-300">
                                            <Smartphone className="w-6 h-6 text-neonaccent" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="font-heading text-3xl uppercase text-primary mb-4">{service.title}</h3>
                                            <p className="font-paragraph text-primary/70 mb-6">{service.desc}</p>
                                            <Link to="/services" className="inline-flex items-center gap-2 font-heading uppercase text-sm border-b border-neonaccent pb-1 text-neonaccent hover:text-neonaccent/80 transition-colors">
                                                Book Service <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="relative overflow-hidden aspect-[4/3] bg-secondary">
                                            <div className="absolute inset-0 bg-neonaccent/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                            <Image 
                                                src={service.image} 
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                width={600}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturedProductGrid = () => {
    return (
        <section className="w-full bg-secondary py-32">
            <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-primary/20 pb-8">
                    <AnimatedElement>
                        <h2 className="font-heading text-4xl lg:text-6xl uppercase text-primary">
                            Curated<br/>Essentials
                        </h2>
                    </AnimatedElement>
                    <AnimatedElement delay={200}>
                        <Link to="/store" className="hidden md:flex items-center gap-2 font-heading uppercase text-sm text-neonaccent hover:text-neonaccent/80 transition-colors">
                            Shop All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </AnimatedElement>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
                    {/* Large Feature Item */}
                    <div className="md:col-span-8 h-[500px] md:h-full relative group overflow-hidden border border-primary/20">
                        <AnimatedElement className="w-full h-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                            <Image 
                                src="https://static.wixstatic.com/media/5283f4_8902434ae24544e7b07b1a0deb34109f~mv2.png?originWidth=1152&originHeight=768"
                                alt="Premium Headphones"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                width={1200}
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="font-heading text-neonaccent text-sm uppercase mb-2">Audio</p>
                                        <h3 className="font-heading text-3xl uppercase mb-4 text-primary">Sonic Precision Series</h3>
                                        <p className="font-paragraph text-primary/70 max-w-md mb-6">Immersive soundscapes delivered through cutting-edge noise cancellation technology.</p>
                                    </div>
                                    <Button variant="outline" className="border-neonaccent text-neonaccent hover:bg-neonaccent hover:text-background rounded-none uppercase font-heading">
                                        Shop Audio
                                    </Button>
                                </div>
                            </div>
                        </AnimatedElement>
                    </div>

                    {/* Side Column Items */}
                    <div className="md:col-span-4 flex flex-col gap-6 h-full">
                        <div className="flex-1 relative group overflow-hidden border border-primary/20 min-h-[300px]">
                            <AnimatedElement delay={100} className="w-full h-full">
                                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors z-10" />
                                <Image 
                                    src="https://static.wixstatic.com/media/5283f4_1cf1b8f168be4aa1b8126ed106285dd3~mv2.png?originWidth=1152&originHeight=768"
                                    alt="Protective Cases"
                                    className="w-full h-full object-cover"
                                    width={600}
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <h3 className="font-heading text-2xl uppercase mb-2 text-primary">Protection</h3>
                                    <Link to="/store" className="text-sm font-heading uppercase underline decoration-neonaccent decoration-2 underline-offset-4 text-neonaccent">View Cases</Link>
                                </div>
                            </AnimatedElement>
                        </div>
                        <div className="flex-1 relative group overflow-hidden border border-primary/20 min-h-[300px]">
                            <AnimatedElement delay={200} className="w-full h-full">
                                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors z-10" />
                                <Image 
                                    src="https://static.wixstatic.com/media/5283f4_0b0aca3a92b949a3ab9d79ea670598c1~mv2.png?originWidth=1152&originHeight=768"
                                    alt="Fast Chargers"
                                    className="w-full h-full object-cover"
                                    width={600}
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <h3 className="font-heading text-2xl uppercase mb-2 text-primary">Power</h3>
                                    <Link to="/store" className="text-sm font-heading uppercase underline decoration-neonaccent decoration-2 underline-offset-4 text-neonaccent">View Chargers</Link>
                                </div>
                            </AnimatedElement>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTASection = () => {
    return (
        <section className="w-full bg-background bg-liquid-ether py-32 relative overflow-hidden">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-neonaccent transform rotate-12 translate-y-12" />
                <div className="absolute top-0 right-0 w-px h-full bg-neonaccent transform -rotate-12 translate-x-12" />
                <div className="w-full h-full grid grid-cols-12 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-neonaccent/20 h-full" />
                    ))}
                </div>
            </div>

            <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <AnimatedElement>
                        <div className="inline-flex items-center gap-2 border border-neonaccent px-4 py-2 rounded-full mb-8">
                            <span className="w-2 h-2 bg-neonaccent rounded-full animate-pulse" />
                            <span className="font-heading text-xs uppercase tracking-widest text-neonaccent">Available Now</span>
                        </div>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={100}>
                        <h2 className="font-heading text-5xl md:text-7xl lg:text-9xl uppercase text-neonaccent leading-[0.9] mb-12 tracking-tighter">
                            Ready to<br/>Upgrade?
                        </h2>
                    </AnimatedElement>

                    <AnimatedElement delay={200}>
                        <p className="font-paragraph text-xl text-primary max-w-2xl mb-12">
                            Explore our complete catalog of mobile devices and accessories. Find the perfect match for your lifestyle today.
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={300}>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/store">
                                <Button className="bg-neonaccent text-background hover:bg-neonaccent/80 border-2 border-neonaccent rounded-none px-12 py-8 text-lg font-heading uppercase tracking-wider transition-all duration-300">
                                    Shop Collection
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" className="bg-transparent border-2 border-neonaccent text-neonaccent hover:bg-neonaccent hover:text-background rounded-none px-12 py-8 text-lg font-heading uppercase tracking-wider transition-all duration-300">
                                    Contact Support
                                </Button>
                            </Link>
                        </div>
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};

// --- 3. MAIN PAGE COMPONENT ---

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background bg-liquid-ether selection:bg-neonaccent selection:text-background">
      <style>{`
        .reveal-base {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-base.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stroke-text-cyan {
          -webkit-text-stroke: 1px #00d4ff;
          color: transparent;
        }
        .stroke-text-white {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
      
      <CustomCursor />
      
      <HeroSection />
      <MarqueeSection />
      <StickyServicesSection />
      <FeaturedProductGrid />
      <CTASection />
    </div>
  );
}