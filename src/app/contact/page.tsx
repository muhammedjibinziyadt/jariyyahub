"use client";

import React from "react";
import { useEffect, useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)
    alert('Message sent successfully!')
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: [
        "Pulpatta PO",
        "Malappuram, Kerala 679325"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["jariyahub@gmail.com"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 8281102606"]
    }
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: "https://www.facebook.com/jawharathululoomsuffadars", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/jawahrathul_uloom_suffa_dars/?hl=en", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, url: "https://www.youtube.com/channel/UCsNNaTn6vyHI1YfAGZnD2_Q", label: "YouTube" }
  ]

  return (
    <section id="contact-section" className="py-24 sm:py-32 bg-background min-h-screen flex items-center relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            WE'D <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">HEAR FROM YOU.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            Have a question about our programs or want to get involved? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 rounded-3xl p-6 flex items-start gap-6 shadow-md hover:shadow-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/10 rounded-3xl shadow-md">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Follow our Socials</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:border-emerald-600 hover:text-white transition-all duration-300 shadow-sm"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/15 transition-all font-medium"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/15 transition-all font-medium"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/15 transition-all font-medium"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none font-medium"
                    placeholder="Tell us about your query..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-500 text-white py-4 px-8 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection