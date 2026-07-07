'use client'

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// --- TYPE DEFINITIONS ---
interface Testimonial {
  imgSrc: string;
  alt: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

// --- PRE-DEFINED POSITIONS FOR THE IMAGES ---
// ALL 13 images will be visible on ALL screen sizes
// Position and size adapt responsively based on viewport
const imagePositions = [
  // Image 1 - Top Left
  { 
    top: '5%', 
    left: '2%', 
    className: 'w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24' 
  },
  // Image 2 - Top Center Left
  { 
    top: '8%', 
    left: '18%', 
    className: 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' 
  },
  // Image 3 - Top Center
  { 
    top: '3%', 
    left: '50%', 
    className: 'w-11 h-11 sm:w-13 sm:h-13 md:w-18 md:h-18 lg:w-22 lg:h-22 -translate-x-1/2' 
  },
  // Image 4 - Top Center Right
  { 
    top: '8%', 
    right: '18%', 
    className: 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' 
  },
  // Image 5 - Top Right
  { 
    top: '5%', 
    right: '2%', 
    className: 'w-13 h-13 sm:w-15 sm:h-15 md:w-22 md:h-22 lg:w-28 lg:h-28' 
  },
  // Image 6 - Middle Left Top
  { 
    top: '25%', 
    left: '1%', 
    className: 'w-11 h-11 sm:w-13 sm:h-13 md:w-20 md:h-20 lg:w-24 lg:h-24' 
  },
  // Image 7 - Middle Left Bottom
  { 
    top: '45%', 
    left: '3%', 
    className: 'w-10 h-10 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-22 lg:h-22' 
  },
  // Image 8 - Middle Right Top
  { 
    top: '25%', 
    right: '1%', 
    className: 'w-11 h-11 sm:w-13 sm:h-13 md:w-20 md:h-20 lg:w-24 lg:h-24' 
  },
  // Image 9 - Middle Right Bottom
  { 
    top: '45%', 
    right: '3%', 
    className: 'w-10 h-10 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-22 lg:h-22' 
  },
  // Image 10 - Bottom Left
  { 
    bottom: '5%', 
    left: '2%', 
    className: 'w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24' 
  },
  // Image 11 - Bottom Center Left
  { 
    bottom: '8%', 
    left: '20%', 
    className: 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' 
  },
  // Image 12 - Bottom Center Right
  { 
    bottom: '8%', 
    right: '20%', 
    className: 'w-11 h-11 sm:w-13 sm:h-13 md:w-18 md:h-18 lg:w-22 lg:h-22' 
  },
  // Image 13 - Bottom Right
  { 
    bottom: '5%', 
    right: '2%', 
    className: 'w-13 h-13 sm:w-15 sm:h-15 md:w-22 md:h-22 lg:w-26 lg:h-26' 
  },
];


// --- ANIMATION LOGIC ---
const imageVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring' as const, 
      stiffness: 260, 
      damping: 20,
      delay: Math.random() * 0.5,
    } 
  },
};

const floatingAnimation = () => ({
  y: [0, Math.random() * -15 - 5, 0],
  transition: {
    duration: Math.random() * 4 + 5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
  },
});

// --- COMPONENT ---
export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText = 'Testimonials',
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: AnimatedTestimonialGridProps) => {

  return (
    <section
      className={cn(
        'relative w-full overflow-visible',
        className
      )}
    >
      {/* Inner Container for max-width and proper spacing */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[700px] sm:min-h-[750px] md:min-h-[800px] lg:min-h-[850px] flex items-center justify-center py-20">
        
        {/* Absolutely Positioned Images - Container for proper positioning */}
        <div className="absolute inset-0 max-w-7xl mx-auto overflow-visible">
          {testimonials.map((testimonial, index) => {
            // Only render if we have a position defined for this index
            if (index >= imagePositions.length) return null;
            
            return (
              <motion.div
                key={index}
                className={cn('absolute rounded-full shadow-xl ', imagePositions[index].className)}
                style={{ 
                  top: imagePositions[index].top, 
                  left: imagePositions[index].left,
                  right: imagePositions[index].right,
                  bottom: imagePositions[index].bottom,
                }}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.1, zIndex: 20 }}
                custom={index}
              >
                <motion.img
                  src={testimonial.imgSrc}
                  alt={testimonial.alt}
                  className="w-full h-full object-cover rounded-full"
                  animate={floatingAnimation()}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto py-16 sm:py-20 md:py-24 px-4">
          {badgeText && (
            <motion.div 
              className="mb-6 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {badgeText}
            </motion.div>
          )}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
          <motion.a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

