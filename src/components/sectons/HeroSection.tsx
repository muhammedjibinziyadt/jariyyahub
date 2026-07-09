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
  Bell,
  Target
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const HeroSection = () => {
  const [settings, setSettings] = useState({
    targetAmount: 0,
    raisedAmount: 0,
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSettings({
            targetAmount: data.data.targetAmount !== undefined && data.data.targetAmount !== null ? Number(data.data.targetAmount) : 0,
            raisedAmount: data.data.raisedAmount !== undefined && data.data.raisedAmount !== null ? Number(data.data.raisedAmount) : 0,
          })
        }
      })
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  const percentage = settings.targetAmount > 0
    ? Math.min(100, Math.round((settings.raisedAmount / settings.targetAmount) * 100))
    : 0

  const notifications = [
    "വിദ്യാർത്ഥികൾക്ക് ഏറ്റവും നല്ല പഠന സൗകര്യങ്ങൾ ഒരുക്കുന്നു",
    "",
    "New Course: Advanced Islamic Studies & Research Methodology",
    "Upcoming Event: Annual Islamic Conference 2025 - Register Early"
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-background overflow-hidden selection:bg-emerald-500/20 pt-28 md:pt-36 pb-16">
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-normal leading-[1.15] font-malayalam">
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
              <button className="h-12 px-8 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2 cursor-pointer">
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Donation Progress Card */}
          <div className="w-full max-w-3xl mx-auto pt-6 text-left">
            <div className="bg-card/45 dark:bg-slate-900/40 backdrop-blur-md border border-border/60 shadow-xl rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Left side (Progress) */}
              <div className="flex flex-col sm:flex-row items-center gap-5 flex-1 w-full">
                {/* Circular Progress */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="33"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800/80"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="33"
                      stroke="#8b5cf6"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 33}
                      strokeDashoffset={2 * Math.PI * 33 * (1 - percentage / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-slate-800 dark:text-slate-100">{percentage}%</span>
                  </div>
                </div>

                {/* Text and Horizontal Progress */}
                <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                  <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 font-malayalam">
                    പണിയുടെ പുരോഗതി
                  </h4>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 font-malayalam">
                    {percentage}% പൂർത്തിയായി
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-14 border-l border-dashed border-border" />
              <div className="block md:hidden w-full h-[1px] border-t border-dashed border-border" />

              {/* Right side (Goal & Raised Info) */}
              <div className="flex flex-row items-center gap-6 md:gap-8 w-full md:w-auto justify-between md:justify-end">
                {/* Raised Amount */}
                <div className="text-left md:text-right space-y-0.5">
                  <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold font-malayalam block">
                    ലഭിച്ചത്
                  </span>
                  <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-500 tracking-wide">
                    ₹{settings.raisedAmount.toLocaleString('en-IN')}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700/60 hidden sm:block" />

                {/* Goal */}
                <div className="text-left md:text-right space-y-0.5">
                  <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold font-malayalam block">
                    ലക്ഷ്യം
                  </span>
                  <h3 className="text-2xl font-black text-violet-600 dark:text-violet-400 tracking-wide">
                    ₹{settings.targetAmount.toLocaleString('en-IN')}
                  </h3>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-violet-100/60 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                  <Target className="w-6 h-6" />
                </div>
              </div>
            </div>
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