// src/components/sectons/AboutSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Monitor, Code, GraduationCap, Users } from 'lucide-react'

const AboutSection = () => {
  const cards = [
    {
      icon: Monitor,
      title: "ആധുനിക സൗകര്യം",
      description: "പുതിയ കമ്പ്യൂട്ടറുകൾ ലഭ്യമാക്കുന്നു",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-500/10"
    },
    {
      icon: Code,
      title: "കൗശല വികസനം",
      description: "ഡിജിറ്റൽ കഴിവുകൾ വളർത്തുന്നു",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: GraduationCap,
      title: "ഉന്നത വിദ്യാഭ്യാസം",
      description: "ഭാവിയെലെ ജോലികളിലേക്ക് വിദ്യാർത്ഥികളെ നയിക്കുന്നു",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-500/10"
    },
    {
      icon: Users,
      title: "ഭാവി പണിതുയർത്തുക",
      description: "നമ്മുടെ തലമുറയുടെ ഭാവി ഉന്നതമാക്കാം",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10"
    }
  ]

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-card/50 dark:bg-slate-900/40 backdrop-blur-md border border-border/60 hover:border-emerald-500/45 hover:shadow-2xl shadow-lg rounded-[2rem] p-8 flex flex-col items-center text-center gap-5 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-full ${card.bgColor} flex items-center justify-center ${card.color} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-malayalam tracking-wide">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-malayalam leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutSection