// src/components/sections/FacultySection.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Faculty Data
const faculty = [
    { name: 'Ali Kutty Musliyar', role: 'Principal', image: '/usd-img/ali-kutty-usthad.webp' },
    { name: 'Kottumala Usthad', role: 'Vice Principal', image: '/usd-img/kottumala-usthad.webp' },
    { name: 'Abdul Latheef Faizy', role: 'Professor', image: '/usd-img/bappu-usthad.webp' },
    { name: 'Hamza Faizy Al Haithami', role: 'Professor', image: '/usd-img/haithami-usthad.webp' },
    { name: 'Alavi Faizy', role: 'Professor', image: '/usd-img/alavi-usthad.webp' },
    { name: 'Ziyaudheen Faizy', role: 'Professor', image: '/usd-img/ziyaudheen-usthad.webp' },
    { name: 'Ot Musthafa Faizy', role: 'Professor', image: '/usd-img/ot-usthad.webp' },
    { name: 'Muhammed Ali Shihab Faizy', role: 'Professor', image: '/usd-img/koomanna-usthad.webp' },
];

const FacultySection = () => {
    return (
        <section id="faculty" className="py-24 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-sm font-semibold tracking-[0.2em] text-emerald-600 dark:text-emerald-500 uppercase">
                            Leadership
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground leading-none">
                            ESTEEMED <br /> SCHOLARS
                        </h2>
                    </div>

                    <a href="https://jamianooriya.in/faculties/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors pb-2 md:pb-4 border-b border-transparent hover:border-emerald-600/20">
                        View Full Faculty
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Clean Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {faculty.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="group"
                        >
                            <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-emerald-600 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FacultySection
