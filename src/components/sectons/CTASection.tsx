// src/components/sections/CTASection.tsx
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Mail, MessageCircle, Users } from 'lucide-react'

const CTASection = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 text-white overflow-hidden">

      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">LEAD?</span>
            </h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are shaping the future through Islamic excellence and community service.
            </p>
          </motion.div>

          {/* Quick Links / Pathways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
          >
            {[
              { icon: Users, label: "Join Community", desc: "Become a member today" },
              { icon: Calendar, label: "Attend Events", desc: "Workshops & Conferences" },
              { icon: MessageCircle, label: "Get in Touch", desc: "We're here to help" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer text-left">
                <item.icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg">{item.label}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Newsletter - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-16 max-w-lg mx-auto"
          >
            <div className="flex items-center gap-2 justify-center mb-4 text-sm font-medium tracking-widest uppercase text-slate-500">
              <Mail className="w-4 h-4" />
              <span>Newsletter</span>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-light"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors flex items-center gap-2"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="mt-4 text-emerald-400 text-sm">Thank you for subscribing!</p>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default CTASection