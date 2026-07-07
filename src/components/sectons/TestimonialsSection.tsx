// src/components/sections/TestimonialsSection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2364748b' font-family='sans-serif' font-size='14'%3EUser%3C/text%3E%3C/svg%3E";

const testimonials = [
  {
    id: 1,
    name: "Abdullah Rahman",
    role: "Alumni, Class of 2023",
    image: placeholderImage,
    quote: "Noorul Ulama shaped not just my academic journey but my character. The values I learned here guide me in every aspect of life. The mentorship and brotherhood I experienced are invaluable.",
    achievement: "Masters in Islamic Studies"
  },
  {
    id: 2,
    name: "Muhammed Favas",
    role: "Student, Literature Wing",
    image: placeholderImage,
    quote: "Being part of the Literature Wing has unleashed my creative potential. The supportive environment and excellent guidance have helped me publish my first collection of poems.",
    achievement: "Published Author"
  },
  {
    id: 3,
    name: "Dr. Hassan Ali",
    role: "Faculty Member",
    image: placeholderImage,
    quote: "Working with Noorul Ulama students is inspiring. Their dedication to learning, combined with strong moral values, makes them exceptional individuals who contribute positively to society.",
    achievement: "Professor"
  },
  {
    id: 4,
    name: "Omar Khalil",
    role: "Alumni, Class of 2022",
    image: placeholderImage,
    quote: "The community service initiatives taught me the importance of giving back. The skills and values I gained here helped me establish my own NGO for educational support.",
    achievement: "Social Entrepreneur"
  }
]

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            VOICE OF <span className="text-emerald-600">NOORUL ULAMA</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-3xl px-6"
              >
                <Quote className="w-12 h-12 mx-auto text-emerald-500/20 mb-8" />
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-slate-800 dark:text-slate-200 mb-10">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-emerald-100">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-lg text-slate-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-xs text-slate-500">
                      {testimonials[currentIndex].achievement}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-emerald-600 w-6' : 'bg-slate-300 dark:bg-slate-700'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
