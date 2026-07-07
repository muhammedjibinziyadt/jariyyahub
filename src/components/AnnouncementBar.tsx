'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Zap } from 'lucide-react';
import axios from 'axios';
import { useAnnouncement } from '@/lib/providers/announcement-provider';
import { usePathname } from 'next/navigation';

interface Announcement {
    _id: string;
    text: string;
    link?: string;
    label?: string;
}

const AnnouncementBar = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { isVisible, setIsVisible } = useAnnouncement();
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get('/api/announcements');
                if (res.data.success && res.data.data.length > 0) {
                    setAnnouncements(res.data.data);
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            } catch (err) {
                console.error('Failed to fetch announcements', err);
                setIsVisible(false);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [setIsVisible]);

    useEffect(() => {
        if (announcements.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % announcements.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [announcements.length]);

    if (loading || !isVisible || announcements.length === 0) return null;

    const current = announcements[currentIndex];

    return (
        <div className="relative bg-slate-900 text-white overflow-hidden z-[60] border-b border-slate-800 h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 pointer-events-none" />

            <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
                <div className="flex-1 flex justify-center overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={current._id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 text-xs sm:text-sm font-medium"
                        >
                            {current.label && (
                                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-lg shadow-emerald-500/20">
                                    {current.label}
                                </span>
                            )}

                            <span className="truncate max-w-[200px] sm:max-w-md md:max-w-2xl">
                                {current.text}
                            </span>

                            {current.link && (
                                <a
                                    href={current.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors whitespace-nowrap"
                                >
                                    Visit Now <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                    aria-label="Close announcement"
                >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBar;
