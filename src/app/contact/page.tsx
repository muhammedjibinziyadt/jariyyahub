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
  Twitter,
  Youtube,
  ExternalLink,
  Clock,
  Globe
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
        "Faizabad, Pattikkad PO",
        "Malappuram, Kerala 679325"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["jamianooriya@gmail.com"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 98470 70200", "+91 97473 99584"]
    }
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, url: "#", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, url: "#", label: "YouTube" }
  ]

  return (
    <section id="contact-section" className="py-24 sm:py-32 bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            WE'D <span className="text-slate-400 dark:text-slate-600">HEAR FROM YOU.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a question about our programs or want to get involved? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid gap-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Follow our Socials</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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