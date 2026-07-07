
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Banner {
    _id: string;
    imageUrl: string;
    link?: string;
    title?: string;
}

export default function BannerSection() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get('/api/banners');
                if (res.data.success) {
                    setBanners(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch banners:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    if (loading || banners.length === 0) return null;

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl aspect-[21/9] group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={banners[currentIndex]._id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="relative w-full h-full"
                    >
                        <img
                            src={banners[currentIndex].imageUrl}
                            alt={banners[currentIndex].title || 'Banner'}
                            className="w-full h-full object-cover"
                        />

                        {(banners[currentIndex].title || banners[currentIndex].link) && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-12">
                                {banners[currentIndex].title && (
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-lg md:text-4xl font-bold text-white mb-2 md:mb-4"
                                    >
                                        {banners[currentIndex].title}
                                    </motion.h3>
                                )}
                                {banners[currentIndex].link && (
                                    <motion.a
                                        href={banners[currentIndex].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-flex items-center gap-1.5 md:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all w-fit group"
                                    >
                                        Explore More
                                        <ExternalLink className="w-4 h-4" />
                                    </motion.a>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {banners.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
