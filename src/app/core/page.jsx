'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Mail, Phone, Linkedin, Instagram, Facebook,
  Award, Users, Target, Briefcase, GraduationCap,
  Star, ChevronRight, ChevronLeft, MapPin, Calendar, ExternalLink
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
// import { BorderBeam } from "@/components/ui/border-beam" // Removed if not used or to simplify

const CoreCommitteeSection = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  // Replace with your actual committee members data
  const committeeMembers = [
    {
      name: "Sayyid Hudaib Adil Jifri",
      role: "President",
      category: "leadership",
      department: "General Department",
      year: "Final Year",
      image: "/images/core/president.webp",
      bio: "Leading the union with vision and dedication to student welfare and academic excellence.",
      location: "Mannarkkad",
      phone: "+91 62351 63130",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Overall union leadership", "Strategic planning", "Student representation"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Abdulla Rashid Eletti",
      role: "General Secretary",
      category: "leadership",
      department: "Lugha Department",
      year: "Final Year",
      image: "/images/core/secretary.webp",
      bio: "Coordinating all union activities and ensuring smooth operations across all departments.",
      location: "Elettil Vattoli",
      phone: "+91 79074 13615",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Administrative coordination", "Meeting management", "Documentation"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Yahya Qasim Hikami",
      role: "Treasurer",
      category: "secretaries",
      department: "Lugha Department",
      year: "Final Year",
      image: "/images/core/treasurer.webp",
      bio: "Managing financial operations and ensuring transparent budget allocation.",
      location: "Deshamangalam",
      phone: "+91 89436 61810",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Financial management", "Budget planning", "Financial reporting"],
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Sayyid Muhammed Jalal Shihab",
      role: "Vice President",
      category: "leadership",
      department: "General Department",
      year: "Final Year",
      image: "/images/core/vp1.webp",
      bio: "Supporting leadership initiatives and coordinating academic programs.",
      location: "Munduparamba",
      phone: "+91 70348 38316",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Academic coordination", "Program oversight", "Leadership support"],
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Sayyid Adnan Hydrosi",
      role: "Vice President",
      category: "leadership",
      department: "Aqeeda Department",
      year: "First Year",
      image: "/images/core/vp2.webp",
      bio: "Overseeing cultural activities and student welfare programs.",
      location: "Koonammoochi",
      phone: "+91 99479 01269",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Cultural programs", "Student welfare", "Event coordination"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Ubaid Nizami Pakkana",
      role: "Joint Secretary",
      category: "secretaries",
      department: "Hadeeth Department",
      year: "Finel Year",
      image: "/images/core/joint-sec1.webp",
      bio: "Managing administrative tasks and supporting secretarial operations.",
      location: "Pakkana",
      phone: "+91 75980 24308",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Administrative support", "Documentation", "Meeting coordination"],
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Muhammed Nafih Elamkulam",
      role: "Joint Secretary",
      category: "secretaries",
      department: "General Department",
      year: "First Year",
      image: "/images/core/joint-sec2.webp",
      bio: "Assisting in organizational activities and communication management.",
      location: "Elamkulam",
      phone: "+91 80783 50280",
      social: { linkedin: "#", instagram: "#", facebook: "#" },
      responsibilities: ["Communication management", "Record keeping", "Event assistance"],
      color: "from-green-500 to-emerald-600"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Members', icon: <Users className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Award className="w-4 h-4" /> },
    { id: 'secretaries', label: 'Secretaries', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'coordinators', label: 'Coordinators', icon: <Target className="w-4 h-4" /> }
  ]

  const filteredMembers = activeCategory === 'all'
    ? committeeMembers
    : committeeMembers.filter(member => member.category === activeCategory)

  // -- Components --

  const MemberCard = ({ member, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
      onClick={() => setSelectedMember(member)}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='48' font-family='sans-serif'%3EPhoto%3C/text%3E%3C/svg%3E"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          {member.department}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-400">View Profile</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )

  const MemberModal = ({ member, onClose }) => {
    if (!member) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="w-full md:w-2/5 h-64 md:h-auto relative">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='48' font-family='sans-serif'%3EPhoto%3C/text%3E%3C/svg%3E"
              }}
            />
            <div className="absolute top-4 left-4 md:hidden">
              <span className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {member.role}
              </span>
            </div>
          </div>

          <div className="flex-1 p-8 md:p-10 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <span className="hidden md:inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {member.role}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h2>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>{member.department} • {member.year}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {member.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Responsibilities</h4>
                <ul className="space-y-2">
                  {member.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {member.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    {member.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Social links placeholder if needed */}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            The Team
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            CORE <span className="text-slate-400 dark:text-slate-600">COMMITTEE</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Meet the dedicated student leaders working to uphold the values and mission of Noorul Ulama.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default CoreCommitteeSection