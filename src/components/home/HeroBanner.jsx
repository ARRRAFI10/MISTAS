import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "/slider5.jpg",
    title: "ME Alumni Day",
    subtitle: "2023",
    location: "MIST, Dhaka",
  },
  {
    image: "/slider1.png",
    title: "Alumni Reunion",
    subtitle: "2025",
    location: "Australia",
  },
  {
    image: "/slider4.jpg",
    title: "GLOBAL NETWORK",
    subtitle: "12,000+",
    location: "Alumni across 85+ countries",
  },
  {
    image: "/slider3.jpg",
    title: "MIST",
    subtitle: "Automation and Robotics",
    location: "Dhaka, Bangladesh",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden flex items-center">
      {/* Full-Screen Dynamic Image Slider */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 opacity-100"
              style={{
                backgroundImage: `url("${SLIDES[currentSlide].image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Dynamic floating badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-24 right-6 md:right-12 bg-zinc-900/80 backdrop-blur-md border border-white/20 px-8 py-6 w-[300px] rounded-2xl hidden md:block"
            >
              <div className="font-mono text-[10px] text-forest-300 tracking-[0.4em] mb-2 uppercase">
                {SLIDES[currentSlide].title}
              </div>
              <div className="font-display text-3xl text-white font-bold mb-1">
                {SLIDES[currentSlide].subtitle}
              </div>
              <div className="font-sans text-xs text-forest-200 mt-1">
                {SLIDES[currentSlide].location}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-6 md:left-auto md:right-12 flex gap-3 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-500 ${
                currentSlide === index
                  ? "w-12 bg-white"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full py-12 z-10">
        <div className="max-w-2xl">
          {/* Label strip */}
          <div className="flex items-center gap-3 mb-8 animate-on-load stagger-1">
            <div className="w-8 h-px bg-forest-500" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-forest-400">
              MIST Alumni Society
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white leading-[1.02] mb-6 animate-on-load stagger-2">
            Where MIST <br />
            <em className="not-italic text-forest-300">Alumni</em> <br />
            Come Together
          </h1>

          <p className="font-body text-lg text-forest-300 leading-relaxed mb-10 max-w-lg animate-on-load stagger-3">
            MISTAS — connecting thousands of graduates across disciplines,
            generations, and geographies. Your network, your legacy, your
            community.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-5 animate-on-load stagger-4">
            <Link
              to="/register"
              className="btn-primary flex items-center gap-2"
            >
              Join MISTAS
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/directory"
              className="flex items-center gap-2.5 font-sans text-sm font-medium text-forest-300 hover:text-white transition-colors group"
            >
              <span className="w-9 h-9 border border-forest-600 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <Play size={12} className="ml-0.5" />
              </span>
              Explore Directory
            </Link>
          </div>

          {/* Micro-stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-forest-800 animate-on-load stagger-5">
            {[
              { n: "12,000+", label: "Alumni" },
              { n: "85+", label: "Countries" },
              { n: "18", label: "Departments" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="font-display text-2xl text-white font-bold">
                  {n}
                </div>
                <div className="font-mono text-xs text-forest-500 tracking-widest uppercase mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
