
'use client';

import { useState } from 'react';
import { LogOut, Activity, Home as HomeIcon, LayoutDashboard, Video, Menu, X, LayoutList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardOverview from '@/components/admin/DashboardOverview';
import MediaManager from '@/components/admin/MediaManager';
import AboutCardsManager from '@/components/admin/AboutCardsManager';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'about-cards'>('overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <nav className="bg-slate-900 border-b border-slate-800 p-4 relative">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-emerald-500" />
                        Admin Portal
                    </h1>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                            <HomeIcon className="w-4 h-4" /> Home
                        </Link>
                        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'overview'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Overview
                            </button>

                            <button
                                onClick={() => setActiveTab('media')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'media'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Video className="w-4 h-4" />
                                Media Gallery
                            </button>

                            <button
                                onClick={() => setActiveTab('about-cards')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'about-cards'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <LayoutList className="w-4 h-4" />
                                About Cards
                            </button>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="block md:hidden text-slate-400 hover:text-white focus:outline-none transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 py-4 px-6 flex flex-col gap-4 z-50 shadow-2xl animate-fadeIn">
                        <Link 
                            href="/" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2 border-b border-slate-800/50"
                        >
                            <HomeIcon className="w-4 h-4" /> Home
                        </Link>
                        
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setActiveTab('overview');
                                    setMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm w-full transition-all ${activeTab === 'overview'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'bg-slate-950 text-slate-400 hover:text-slate-305 hover:bg-slate-900 border border-slate-800'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Overview
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('media');
                                    setMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm w-full transition-all ${activeTab === 'media'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'bg-slate-950 text-slate-400 hover:text-slate-305 hover:bg-slate-900 border border-slate-800'
                                    }`}
                            >
                                <Video className="w-4 h-4" />
                                Media Gallery
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('about-cards');
                                    setMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm w-full transition-all ${activeTab === 'about-cards'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'bg-slate-950 text-slate-400 hover:text-slate-305 hover:bg-slate-900 border border-slate-800'
                                    }`}
                            >
                                <LayoutList className="w-4 h-4" />
                                About Cards
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-350 transition-colors py-2 mt-2"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                )}
            </nav>

            <main className="container mx-auto p-4 sm:p-8">
                {activeTab === 'overview' && (
                    <DashboardOverview />
                )}

                {activeTab === 'media' && (
                    <MediaManager />
                )}

                {activeTab === 'about-cards' && (
                    <AboutCardsManager />
                )}
            </main>
        </div>
    );
}
