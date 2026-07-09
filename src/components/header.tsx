'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { DATA } from '@/data/links';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 20);
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:py-4 py-3 px-4",
                    isScrolled
                        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className={cn(
                    "mx-auto max-w-7xl flex items-center justify-between transition-all duration-300",
                    isScrolled ? "" : "bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20"
                )}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <span className="font-bold text-lg md:text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 transition-colors">
                            Jariyya Hub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {DATA.navbar.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-malayalam",
                                    pathname === item.href
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA / Actions */}
                    <div className="flex items-center gap-3">
                        {/* Socials on large screens */}
                        <div className="hidden lg:flex items-center gap-1 pr-3 border-r border-slate-200 dark:border-slate-700 mr-2">
                            {Object.values(DATA.contact.social).filter(s => s.navbar).map((social: any) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 text-slate-500 hover:text-emerald-600 transition-colors"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>

                        <Link href="/donate" className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
                            <span>Donate</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <ModeToggle />

                        {/* Mobile Menu Toggle (Only if NOT using Bottom Dock, but we ARE using Bottom Dock so we can probably hide this or keep it as a backup) */}
                        {/* The Bottom Dock handles navigation on mobile, so we don't strictly need a Hamburger menu, keeping the header clean. */}
                    </div>

                </div>
            </header>
        </>
    );
}
