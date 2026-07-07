// src/components/sections/AboutSection.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Heart, Landmark, Users } from 'lucide-react'
import Image from 'next/image'

const AboutSection = () => {
  const content = {
    title: "ROOTED IN",
    highlight: "TRADITION",
    description: "Since 1985, Noorul Ulama has stood as a beacon of Islamic scholarship and community service. We bridge the gap between sacred knowledge and modern excellence, fostering a generation of leaders who carry the torch of wisdom.",
    stats: [
      { label: "Years of Heritage", value: "39+" },
      { label: "Active Members", value: "2000+" },
      { label: "Community Projects", value: "100+" }
    ],
    features: [
      {
        title: "Islamic Values",
        desc: "Guided by authentic teachings"
      },
      {
        title: "Modern Vision",
        desc: "Embracing contemporary progress"
      },
      {
        title: "Social Impact",
        desc: "Serving humanity with compassion"
      }
    ]
  }

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Typography & Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:sticky lg:top-24"
          >
            <div className="space-y-2">
              {/* <span className="text-sm font-semibold tracking-[0.2em] text-emerald-600 dark:text-emerald-500 uppercase">Who We Are</span> */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
                {content.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-500 dark:to-emerald-300">
                  {content.highlight}
                </span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-xl">
              {content.description}
            </p>

            {/* Minimal Features List */}
            <div className="space-y-6 pt-4 border-t border-border/40">
              {content.features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors" />
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground hover:text-emerald-600 transition-colors">
              Read our full story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right Column: Visuals & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pt-12 lg:pt-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-slate-100 dark:bg-slate-900">
              <Image
                src="/img/4.webp"
                alt="About Noorul Ulama"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Floating Stats - Minimal */}
              <div className="absolute bottom-0 left-0 right-0 p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 bg-black/20 backdrop-blur-md">
                {content.stats.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative background outline for depth */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-border/40 rounded-[2px]" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection