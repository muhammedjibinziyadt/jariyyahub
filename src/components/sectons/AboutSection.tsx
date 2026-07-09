// src/components/sectons/AboutSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutSection = () => {
  const cards = [
    {
      image: "/images/computer_lab.png",
      title: "ആധുനിക കമ്പ്യൂട്ടർ ലാബ്",
      description: "വിദ്യാർത്ഥികൾക്ക് ഡിജിറ്റൽ മേഖലയിൽ മികച്ച കമ്പ്യൂട്ടർ പഠന സൗകര്യം"
    },
    {
      image: "/images/library.png",
      title: "വിശാലമായ ലൈബ്രറി",
      description: "പഠനത്തിനും ഗവേഷണത്തിനും ഉപയോഗപ്രദമായ മികച്ച പുസ്തകശേഖരം"
    },
    {
      image: "/images/students_classroom.png",
      title: "ദീനി & ആധുനിക വിദ്യാഭ്യാസം",
      description: "ദീനി, ലൗകിക വിദ്യാഭ്യാസം ഉയർന്ന നിലവാരത്തിൽ"
    }
  ]

  return (
    <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-slate-950/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-violet-500 to-violet-600 rounded-full hidden sm:block" />
          <div className="w-2 h-2 rounded-full bg-violet-600 hidden sm:block" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-malayalam tracking-wide px-4 text-center">
            നമ്മുടെ പദ്ധതികൾ
          </h2>
          <div className="w-2 h-2 rounded-full bg-violet-600 hidden sm:block" />
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-violet-500 to-violet-600 rounded-full hidden sm:block" />
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full max-w-[350px] mx-auto md:max-w-none bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 hover:border-violet-500/40 hover:shadow-2xl shadow-lg rounded-3xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image Container - Aspect 4/3 for larger visual weight */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content Section - Balanced padding & text sizes */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-malayalam mb-3 tracking-wide group-hover:text-violet-600 transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-malayalam leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutSection