// src/components/sections/CTASection.tsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Play, X, Image as ImageIcon, Video, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// YouTube videos showcase (User can easily swap out these YouTube IDs)
const videos = [
  {
    id: "1",
    youtubeId: "co0cZ_624D0",
    title: "Jawharathul Uloom Dars - Institutional Overview",
    desc: "A brief look into our educational facilities, daily student activities, and dars learning environment."
  },
  {
    id: "2",
    youtubeId: "dQw4w9WgXcQ", // Standard placeholder ID
    title: "Sadaqah Jariyah: Building the Future of Scholars",
    desc: "Highlights from our charity initiatives, community outreach programs, and student support campaigns."
  }
]

// Local images in the repository representing organization activities
const photos = [
  { src: "/images/library-team.jpg", title: "Student Library Team", desc: "Our library team managing resources for Islamic academic research." },
  { src: "/images/media-wing.jpg", title: "Media Wing Activities", desc: "Recording and documenting students' lectures and creative content." },
  { src: "/images/samajam.jpeg", title: "Students Association Meeting", desc: "Gathering of members planning social work and community campaigns." },
  { src: "/images/sargaposhini.jpg", title: "Linguistic & Cultural Club", desc: "Creative writing and language practice session in Arabic." },
  { src: "/img/1.webp", title: "Islamic Campus Highlights", desc: "Overview of Jamia Nooriyya Arabiyya educational campus." },
  { src: "/img/2.webp", title: "Daily Dars Classroom", desc: "Students engaged in traditional Islamic law and theology classes." }
]

const CTASection = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos')
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null)

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

  const handleNextPhoto = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % photos.length)
    }
  }

  const handlePrevPhoto = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length)
    }
  }

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 text-white overflow-hidden border-t border-slate-900">

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Section Header with Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-emerald-500 text-sm font-semibold tracking-wider uppercase">Media & Impact Gallery</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Donation <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">in Action</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Explore videos and photo galleries showcasing our students' achievements, educational events, and community charity distributions.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'videos'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>YouTube Videos</span>
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'photos'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Impact Gallery</span>
              </button>
            </div>
          </div>

          {/* Grid Content */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === 'videos' ? (
                <motion.div
                  key="videos-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video.youtubeId)}
                      className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 cursor-pointer shadow-xl flex flex-col h-full"
                    >
                      {/* Video Thumbnail Wrapper */}
                      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                        <Image
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          unoptimized
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Video Meta */}
                      <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {video.title}
                          </h3>
                          <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-2">
                            {video.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="photos-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer hover:border-emerald-500/40 transition-colors"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h4 className="font-bold text-sm text-white">{photo.title}</h4>
                        <p className="text-xs text-slate-300 line-clamp-2 font-light mt-1">{photo.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lightbox / Video Modal */}
          <AnimatePresence>
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              >
                <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} />
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
                >
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </motion.div>
            )}

            {/* Photo Lightbox */}
            {activePhotoIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              >
                <div className="absolute inset-0 cursor-pointer" onClick={() => setActivePhotoIdx(null)} />
                <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10">
                  
                  {/* Close button */}
                  <button
                    onClick={() => setActivePhotoIdx(null)}
                    className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Image Display */}
                  <div className="relative w-full h-[70vh] flex items-center justify-center">
                    <Image
                      src={photos[activePhotoIdx].src}
                      alt={photos[activePhotoIdx].title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Left / Right Nav buttons */}
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Meta Details */}
                  <div className="text-center mt-4 max-w-2xl px-6">
                    <h3 className="font-bold text-lg text-white">{photos[activePhotoIdx].title}</h3>
                    <p className="text-sm text-slate-300 font-light mt-1">{photos[activePhotoIdx].desc}</p>
                    <span className="text-xs text-slate-500 mt-2 block">
                      {activePhotoIdx + 1} of {photos.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-16 max-w-lg mx-auto text-center border-t border-white/5"
          >
            <div className="flex items-center gap-2 justify-center mb-4 text-xs font-semibold tracking-widest uppercase text-slate-500">
              <Mail className="w-4.5 h-4.5 text-emerald-500" />
              <span>Subscribe to Updates</span>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-light text-sm"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors text-sm flex items-center gap-2"
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