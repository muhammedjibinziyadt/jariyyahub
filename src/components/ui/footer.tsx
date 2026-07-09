'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    if (pathname?.startsWith('/admin') || pathname?.startsWith('/donate')) return null;

    return (
        <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-20 pb-10 overflow-hidden transition-colors duration-300">
            {/* Soft Ambient Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Section - Spans 5 Columns */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-md group-hover:scale-[1.02] transition-all">
                                    <Image
                                        src="/logo.png"
                                        alt="Jariyya Hub Logo"
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Jariya Hub</h3>
                                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">donation</p>
                                </div>
                            </div>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm max-w-sm font-malayalam">
                            നിങ്ങളുടെ ചെറിയ സഹായം ഒരു വിദ്യാർത്ഥിയുടെ ഭാവിയെ പ്രകാശിപ്പിക്കും. ഇന്ന് ചേർന്നാൽ ഒരു സമൂഹത്തിന്റെ നാളെയുടെ അഭിവൃദ്ധിയുടെ വെളിച്ചമാകും.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "https://www.facebook.com/jariyyahub", label: "Facebook" },
                                { icon: Instagram, href: "https://www.instagram.com/jariyyahub", label: "Instagram" },
                                { icon: Youtube, href: "https://www.youtube.com/jariyyahub", label: "YouTube" },
                                { icon: MessageCircle, href: "https://wa.me/918281102606", label: "WhatsApp" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 hover:-translate-y-0.5 shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links - Spans 3 Columns */}
                    <div className="lg:col-span-3">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 block">
                            Navigation
                        </span>
                        <ul className="space-y-3.5">
                            {[
                                { label: "ഹോം", href: "/" },
                                { label: "ഞങ്ങളെക്കുറിച്ച്", href: "/core" },
                                { label: "ബന്ധപ്പെടുക", href: "/contact" }
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors flex items-center gap-1.5 group"
                                    >
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Spans 4 Columns */}
                    <div className="lg:col-span-4 space-y-6">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 block">
                            Contact Us
                        </span>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl hover:border-emerald-500/25 transition-all">
                                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl mt-0.5">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-900 dark:text-white font-semibold">Jariya Hub</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Pulpatta PO<br />Malappuram, Kerala 679325</p>
                                </div>
                            </div>

                            <a
                                href="mailto:jariyahub@gmail.com"
                                className="flex items-center gap-4 p-3 bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl hover:border-emerald-500/25 transition-all group"
                            >
                                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 transition-colors">
                                    jariyahub@gmail.com
                                </span>
                            </a>

                            <div className="flex items-center gap-4 p-3 bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl hover:border-emerald-500/25 transition-all group">
                                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    +91 8281102606
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {currentYear} Jariya Hub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
