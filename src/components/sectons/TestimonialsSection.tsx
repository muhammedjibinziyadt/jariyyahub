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
    name: "Prophet Muhammad ﷺ",
    role: "Sahih Muslim: 2588",
    image: placeholderImage,
    quote: "قَالَ رَسُولُ اللَّهِ ﷺ:\n\nمَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ.\n\nറസൂലുല്ലാഹ് ﷺ അരുളിച്ചെയ്തു:\n\"സ്വദഖ നൽകുന്നതിലൂടെ ഒരാളുടെ സമ്പത്ത് കുറയുകയില്ല. ക്ഷമിക്കുന്നവന് അല്ലാഹു കൂടുതൽ മഹത്വം നൽകും. അല്ലാഹുവിനുവേണ്ടി വിനയപ്പെടുന്നവനെ അല്ലാഹു ഉയർത്തും.\"",
    achievement: "Hadith on Charity & Humility"
  },
  {
    id: 2,
    name: "Prophet Muhammad ﷺ",
    role: "Sahih al-Bukhari: 1417",
    image: placeholderImage,
    quote: "قَالَ رَسُولُ اللَّهِ ﷺ:\n\nاتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ.\n\nറസൂലുല്ലാഹ് ﷺ അരുളിച്ചെയ്തു:\n\"ഒരു ഈന്തപ്പഴത്തിന്റെ പകുതി ദാനം ചെയ്തുകൊണ്ടെങ്കിലും നരകാഗ്നിയിൽ നിന്ന് നിങ്ങളെത്തന്നെ സംരക്ഷിക്കുവിൻ.\"",
    achievement: "Hadith on Protection from Hellfire"
  },
  {
    id: 3,
    name: "Prophet Muhammad ﷺ",
    role: "Sahih al-Bukhari: 6021",
    image: placeholderImage,
    quote: "قَالَ رَسُولُ اللَّهِ ﷺ:\n\nكُلُّ مَعْرُوفٍ صَدَقَةٌ.\n\nറസൂലുല്ലാഹ് ﷺ അരുളിച്ചെയ്തു:\n\"എല്ലാ സൽപ്രവൃത്തികളും സ്വദഖയാണ്.\"",
    achievement: "Hadith on Good Deeds"
  },
  {
    id: 4,
    name: "Prophet Muhammad ﷺ",
    role: "Sahih Muslim: 1631",
    image: placeholderImage,
    quote: "قَالَ رَسُولُ اللَّهِ ﷺ:\n\nإِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ.\n\nറസൂലുല്ലാഹ് ﷺ അരുളിച്ചെയ്തു:\n\"മനുഷ്യൻ മരിച്ചാൽ അവന്റെ പ്രവൃത്തികൾ അവസാനിക്കുന്നു. എന്നാൽ മൂന്ന് കാര്യങ്ങൾ ഒഴികെ: തുടർന്നുകൊണ്ടിരിക്കുന്ന സ്വദഖ (സ്വദഖ ജാരിയ), പ്രയോജനപ്പെടുന്ന വിജ്ഞാനം, അല്ലെങ്കിൽ അവനുവേണ്ടി പ്രാർത്ഥിക്കുന്ന സദ്സന്താനം.\"",
    achievement: "Hadith on Ongoing Charity (Sadaqah Jariyah)"
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
            HADEES <span className="text-emerald-600">QUOTES</span>
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
                <div className="mb-10 space-y-8 select-none">
                  {/* Arabic Section */}
                  <div className="space-y-4" dir="rtl">
                    <p className="text-lg sm:text-xl md:text-2xl font-arabic text-emerald-600 dark:text-emerald-400 font-medium">
                      {testimonials[currentIndex].quote.split('\n\n')[0]}
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-arabic leading-[1.25] text-slate-900 dark:text-white">
                      {testimonials[currentIndex].quote.split('\n\n')[1]}
                    </p>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-16 h-[1px] bg-slate-200 dark:bg-slate-800 mx-auto" />

                  {/* Malayalam Translation */}
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400 font-malayalam whitespace-pre-line max-w-2xl mx-auto">
                    {testimonials[currentIndex].quote.split('\n\n').slice(2).join('\n\n')}
                  </p>
                </div>
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
