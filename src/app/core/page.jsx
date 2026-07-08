'use client'

import { ExternalLink, Globe, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const LiveWebsitePreview = () => {
  const websiteUrl = "https://www.jawharathululoomsuffadars.online/"

  return (
    <section className="min-h-screen bg-background py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden selection:bg-emerald-500/20">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl text-center space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm block">
            Official Live Platform
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            JAWHARATHUL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 font-bold">ULOOM</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Experience our official website and explore admissions, programs, and updates in real-time.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            Visit Live Website
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Mock Browser Frame with Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full bg-slate-900/40 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Browser Header Bar */}
          <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between">
            {/* Window controls */}
            <div className="flex gap-2 flex-shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* Address Bar */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono w-full max-w-md mx-4 truncate flex items-center gap-1.5 justify-center">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>www.jawharathululoomsuffadars.online</span>
            </div>

            {/* Refresh button mockup */}
            <div className="w-16 flex justify-end gap-3 text-slate-400 dark:text-slate-500 flex-shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>

          {/* Browser Content - The Screenshot */}
          <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
            <img
              src="/images/site_preview.png"
              alt="Jawharathul Uloom Suffa Dars Live Preview"
              className="w-full h-full object-cover object-top transition-transform duration-[2000ms] hover:scale-[1.01]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LiveWebsitePreview