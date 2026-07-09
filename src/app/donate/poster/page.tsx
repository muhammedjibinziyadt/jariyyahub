'use client'

import { Suspense } from 'react'
import PosterContent from './PosterContent'

export default function PosterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 px-4 text-center">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 font-medium">Preparing your custom poster...</p>
            </div>
        }>
            <PosterContent />
        </Suspense>
    )
}
