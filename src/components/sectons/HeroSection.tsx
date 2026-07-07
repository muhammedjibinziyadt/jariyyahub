'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  ChevronRight,
  Play,
  Users,
  BookOpen,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  GraduationCap,
  Bell
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const HeroSection = () => {
  const notifications = [
    "Admission Open 2025-26: Apply Now for Academic Excellence",
    "Results Published: Check the Student Leaderboard for Latest Updates",
    "New Course: Advanced Islamic Studies & Research Methodology",
    "Upcoming Event: Annual Islamic Conference 2025 - Register Early"
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-background overflow-hidden selection:bg-emerald-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Notification Marquee */}
      {/* <div className="absolute top-20 md:top-24 left-0 right-0 z-40">
        <div className="w-full bg-background/50 backdrop-blur-sm border-y border-border/5 overflow-hidden">
          <div className="relative flex items-center h-12 select-none max-w-7xl mx-auto">
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex whitespace-nowrap gap-8 min-w-full px-4"
            >
              {[...notifications, ...notifications, ...notifications, ...notifications].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground/80 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div> */}

      <div className="container px-4 md:px-6 relative z-10 flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl mx-auto"
        >

          {/* Main Typography */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-medium text-emerald-600/80 dark:text-emerald-400/80 font-arabic tracking-wide">
              Jariyya Hub            </h2>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-normal leading-[1.3] font-malayalam">
              വിജ്ഞാനത്തിന്റെ പാതയിൽ <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 font-malayalam">ഒരു കൈത്താങ്ങാകാം</span>
            </h1>
          </div>

          {/* Minimal Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal font-malayalam">
            നിങ്ങളുടെ ചെറിയ സഹായം ഒരു വിദ്യാർത്ഥിയുടെ ഭാവിയെ പ്രകാശിപ്പിക്കും.
            ഇന്ന് ചേർന്നാൽ ഒരു സമൂഹത്തിന്റെ നാളെയുടെ അഭിവൃദ്ധിയുടെ വെളിച്ചമാകും.
          </p>

          {/* Simple Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/donate">
              <button className="h-12 px-8 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2">
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="https://youtu.be/FxE9tuhbrUk" target="_blank" rel="noopener noreferrer">
              <button className="h-12 px-8 rounded-full bg-secondary/50 hover:bg-secondary transition-colors font-medium text-foreground flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Watch Story
              </button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer Stats - Optional clutter, keeping it very clean so maybe just one line */}
      {/* <div className="absolute bottom-10 left-0 right-0 hidden md:flex justify-center gap-12 text-muted-foreground/40 text-sm font-medium tracking-widest uppercase">
        <span>Knowledge</span>
        <span>•</span>
        <span>Culture</span>
        <span>•</span>
        <span>Service</span>
      </div> */}
    </section>
  )
}

export default HeroSection