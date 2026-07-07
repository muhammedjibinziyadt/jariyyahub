'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 -z-10" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>

        {/* Arabic Quote */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-6 mb-8 max-w-lg mx-auto shadow-sm dark:shadow-none">
          <p className="text-2xl text-emerald-600 dark:text-emerald-400 mb-2 font-arabic">
            إِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>
          <p className="text-slate-700 dark:text-gray-300 text-sm">
            &ldquo;Indeed, with hardship comes ease&rdquo;
          </p>
          <p className="text-slate-500 dark:text-gray-500 text-xs mt-1">Quran 94:6</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>

          <button
            onClick={() => history.back()}
            className="group flex items-center gap-3 border-2 border-slate-200 dark:border-white/20 text-slate-700 dark:text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
          <p className="text-slate-500 dark:text-gray-400 mb-4 text-sm">Popular Pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: '/core', label: 'Core Committee' },
              { href: '/subwing', label: 'Sub Wings' },
              { href: '/contact', label: 'Contact Us' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white rounded-lg text-sm transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-emerald-200 dark:hover:border-white/20 shadow-sm hover:shadow-md dark:shadow-none"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .font-arabic {
          font-family: 'Amiri', 'Noto Naskh Arabic', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  )
}

