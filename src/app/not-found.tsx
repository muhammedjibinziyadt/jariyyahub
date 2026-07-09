'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-slate-950 px-4 pt-24 pb-12 transition-colors duration-500">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 dark:opacity-[0.02]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center"
      >
        {/* 404 Graphic */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-slate-900 dark:text-white leading-none tracking-tighter select-none drop-shadow-2xl">
            404
          </h1>
          {/* Decorative line through the 404 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-2 sm:h-3 bg-emerald-500 rounded-full transform -rotate-12 mix-blend-multiply dark:mix-blend-screen opacity-80 shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Oops! You've lost your way.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Premium Glassmorphism Arabic Quote Card */}
        <motion.div variants={itemVariants} className="w-full max-w-md mx-auto mb-12">
          <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-emerald-500/30 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-slate-800/40 dark:to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-800/50 shadow-xl dark:shadow-2xl flex flex-col items-center justify-center transition-all duration-300">
              <p className="text-3xl text-emerald-600 dark:text-emerald-400 mb-4 font-arabic leading-relaxed drop-shadow-sm">
                إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </p>
              <div className="h-px w-12 bg-emerald-500/20 mb-4" />
              <p className="text-slate-700 dark:text-slate-300 font-medium tracking-wide">
                &ldquo;Indeed, with hardship comes ease&rdquo;
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                Quran 94:6
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => history.back()}
            className="group flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
          
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('/noise.png')] mix-blend-overlay transition-opacity duration-500" />
            <Home className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Return Home</span>
          </Link>
        </motion.div>

        {/* Floating Particles (Client-side only) */}
        {mounted && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float mix-blend-screen"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  backgroundColor: Math.random() > 0.5 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(45, 212, 191, 0.4)',
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}px, -40px) scale(1.2);
          }
          75% {
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .font-arabic {
          font-family: 'Sakkal Majalla', 'Amiri', 'Noto Naskh Arabic', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  )
}

