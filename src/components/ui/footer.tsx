'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle, Heart } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    if (pathname?.startsWith('/admin') || pathname?.startsWith('/donate')) return null;

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 bg-white rounded-xl shadow-sm p-1">
                                    <Image
                                        src="/logo.png"
                                        alt="Jariyya Hub Logo"
                                        width={56}
                                        height={56}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Jariyya Hub</h3>
                                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Students Association</p>
                                </div>
                            </div>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm max-w-sm">
                            Empowering students through Islamic education, cultural heritage, and community service since 1985 at Jamia Nooriyya Arabiyya Pattikkad.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "https://www.facebook.com/jariyyahub" },
                                { icon: Instagram, href: "https://www.instagram.com/jariyyahub" },
                                { icon: Youtube, href: "https://www.youtube.com/jariyyahub" },
                                { icon: MessageCircle, href: "https://wa.me/919847070200" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Navigation</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "Home", href: "/" },
                                    { label: "Core Committee", href: "/core" },
                                    { label: "Sub Wings", href: "/subwing" },
                                    { label: "Contact", href: "/contact" }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "Blog", href: "#" },
                                    { label: "Events", href: "#" },
                                    { label: "Gallery", href: "#" },
                                    { label: "Donate", href: "#" }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="font-bold text-slate-900 dark:text-white">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-emerald-50 dark:bg-slate-900 rounded-lg text-emerald-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-900 dark:text-white font-medium">Jamia Nooriyya Arabiyya</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1">Faizabad, Pattikkad PO<br />Malappuram, Kerala 679325</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-emerald-50 dark:bg-slate-900 rounded-lg text-emerald-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a href="mailto:jamianooriya@gmail.com" className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
                                    jamianooriya@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-emerald-50 dark:bg-slate-900 rounded-lg text-emerald-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    +91 98470 70200
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {currentYear} Jariyya Hub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
