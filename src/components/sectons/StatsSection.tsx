// src/components/sections/StatsSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Calendar, Globe, Heart, Users } from 'lucide-react'

const stats = [
  {
    label: "Active Students",
    value: "2000+",
    desc: "Pursuing excellence",
    icon: Users
  },
  {
    label: "Annual Events",
    value: "50+",
    desc: "Cultural & academic",
    icon: Calendar
  },
  {
    label: "Sub Wings",
    value: "15+",
    desc: "Specialized departments",
    icon: BookOpen
  },
  {
    label: "Awards Won",
    value: "25+",
    desc: "State & National level",
    icon: Award
  },
  {
    label: "Years Service",
    value: "39",
    desc: "Of continuous legacy",
    icon: Globe
  },
  {
    label: "Community",
    value: "10K+",
    desc: "Lives impacted",
    icon: Heart
  }
]

const StatsSection = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 gap-y-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-4 text-emerald-600/50 group-hover:text-emerald-600 transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection