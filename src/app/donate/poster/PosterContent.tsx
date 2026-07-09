'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Download, MessageCircle, Home, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export default function PosterContent() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name') || 'Valued Donor'
    const amount = searchParams.get('amount') || '0'
    const donationId = searchParams.get('id') || `DON-${Math.floor(100000 + Math.random() * 900000)}`

    const [posterUrl, setPosterUrl] = useState<string>('')
    const [rendering, setRendering] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = '/images/poster.jpg'
        img.crossOrigin = 'anonymous'

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas')
                // Using the exact 1024x1024 dimensions of the source poster for high resolution
                canvas.width = 1024
                canvas.height = 1024
                const ctx = canvas.getContext('2d')

                if (!ctx) {
                    setError(true)
                    setRendering(false)
                    return
                }

                // Draw base poster image
                ctx.drawImage(img, 0, 0, 1024, 1024)

                // ----------------------------------------------------
                // Draw Glassmorphic Overlay Card
                // Positioned on the right-middle space of the poster:
                // x range: 600 to 980 (width: 380px)
                // y range: 340 to 600 (height: 260px)
                // ----------------------------------------------------
                const cardX = 600
                const cardY = 340
                const cardW = 380
                const cardH = 260
                const radius = 24

                // Draw premium drop shadow for the card
                ctx.shadowColor = 'rgba(0, 0, 0, 0.16)'
                ctx.shadowBlur = 35
                ctx.shadowOffsetX = 0
                ctx.shadowOffsetY = 12

                // White card background with high opacity for readability over graphics
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
                ctx.beginPath()
                ctx.moveTo(cardX + radius, cardY)
                ctx.lineTo(cardX + cardW - radius, cardY)
                ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius)
                ctx.lineTo(cardX + cardW, cardY + cardH - radius)
                ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH)
                ctx.lineTo(cardX + radius, cardY + cardH)
                ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius)
                ctx.lineTo(cardX, cardY + radius)
                ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY)
                ctx.closePath()
                ctx.fill()

                // Reset shadow values to avoid affecting text drawing
                ctx.shadowBlur = 0
                ctx.shadowColor = 'transparent'

                // Emerald green border stroke
                ctx.strokeStyle = '#059669'
                ctx.lineWidth = 3
                ctx.stroke()

                // Card Heading: "സംഭാവന ഉപഹാരം" (Donation Honor Badge)
                ctx.fillStyle = '#065f46'
                ctx.font = 'bold 22px system-ui, -apple-system, sans-serif'
                ctx.textAlign = 'center'
                ctx.fillText('സംഭാവന ഉപഹാരം', cardX + cardW / 2, cardY + 45)

                // Divider line
                ctx.strokeStyle = 'rgba(5, 150, 105, 0.15)'
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.moveTo(cardX + 40, cardY + 65)
                ctx.lineTo(cardX + cardW - 40, cardY + 65)
                ctx.stroke()

                // Label: "ദാതാവ്" (Donor)
                ctx.fillStyle = '#64748b'
                ctx.font = '600 14px system-ui, -apple-system, sans-serif'
                ctx.fillText('ദാതാവ് (Donor)', cardX + cardW / 2, cardY + 95)

                // Donor Name (Auto-wrap / Dynamic size)
                ctx.fillStyle = '#0f172a'
                const displayName = name.trim().toUpperCase()
                let nameFontSize = 24
                if (displayName.length > 25) nameFontSize = 16
                else if (displayName.length > 18) nameFontSize = 20
                ctx.font = `bold ${nameFontSize}px system-ui, -apple-system, sans-serif`
                ctx.fillText(displayName, cardX + cardW / 2, cardY + 130)

                // Label: "സംഭാവന തുക" (Donation Amount)
                ctx.fillStyle = '#64748b'
                ctx.font = '600 14px system-ui, -apple-system, sans-serif'
                ctx.fillText('സംഭാവന തുക (Amount)', cardX + cardW / 2, cardY + 180)

                // Amount
                ctx.fillStyle = '#b45309' // Warm Amber/Gold
                ctx.font = 'bold 28px system-ui, -apple-system, sans-serif'
                ctx.fillText(`₹ ${Number(amount).toLocaleString('en-IN')}`, cardX + cardW / 2, cardY + 220)

                // Export to URL
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
                setPosterUrl(dataUrl)
                setRendering(false)
            } catch (err) {
                console.error('Error rendering poster canvas:', err)
                setError(true)
                setRendering(false)
            }
        }

        img.onerror = () => {
            console.error('Failed to load poster background image.')
            setError(true)
            setRendering(false)
        }
    }, [name, amount, donationId])

    const handleDownload = () => {
        if (!posterUrl) return
        const link = document.createElement('a')
        link.download = `JariyaHub_Poster_${donationId}.jpg`
        link.href = posterUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (rendering) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4 max-w-sm">
                    <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
                    <h2 className="text-xl font-bold">ഉപഹാരം തയ്യാറാക്കുന്നു...</h2>
                    <p className="text-sm text-slate-400">Generating your customized donation poster with your details. Please wait a moment.</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-6 max-w-md bg-slate-950 p-8 rounded-3xl border border-white/5 shadow-2xl">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <div>
                        <h2 className="text-2xl font-bold text-red-400">Generation Failed</h2>
                        <p className="text-sm text-slate-400 mt-2">We could not customize your poster. However, your donation was completed successfully.</p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl text-left border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Donation ID:</span>
                            <span className="font-mono text-white font-bold">{donationId}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Donor Name:</span>
                            <span className="text-white font-semibold">{name}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Amount:</span>
                            <span className="text-emerald-400 font-bold">₹{Number(amount).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="w-full py-3 bg-white/10 hover:bg-white/15 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all">
                            <Home className="w-4 h-4" />
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Side: Visual Poster Preview */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                    <div className="relative group w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:scale-[1.01] transition-all duration-500 bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={posterUrl} 
                            alt="Custom Donation Poster" 
                            className="w-full h-full object-cover"
                        />
                        {/* Mobile long-press hint */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md py-2 px-3 rounded-xl text-center text-[10px] text-slate-300 font-medium md:hidden">
                            Mobile: Long press the image to save directly
                        </div>
                    </div>
                </div>

                {/* Right Side: Action Panel */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">Jazakallah Khair!</h1>
                            <p className="text-emerald-400 text-sm font-semibold tracking-wide mt-0.5">Donation Verified Successfully</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-slate-400 text-sm leading-relaxed">
                            നിങ്ങളുടെ വിലപ്പെട്ട സംഭാവന വിജയകരമായി സ്വീകരിച്ചിരിക്കുന്നു. താഴെയുള്ള ബട്ടണുകൾ ഉപയോഗിച്ച് നിങ്ങളുടെ സ്വന്തം ഉപഹാര പോസ്റ്റർ ഡൗൺലോഡ് ചെയ്യാം അല്ലെങ്കിൽ വാട്സ്ആപ്പിൽ ഷെയർ ചെയ്യാം.
                        </p>

                        {/* Summary Details */}
                        <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-3.5">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Donation Reference:</span>
                                <span className="font-mono text-white font-bold">{donationId}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Donor Name:</span>
                                <span className="text-white font-semibold">{name.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Total Contribution:</span>
                                <span className="text-emerald-400 font-extrabold text-base">₹{Number(amount).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3.5">
                        <button
                            onClick={handleDownload}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2.5 transition-all text-sm cursor-pointer"
                        >
                            <Download className="w-4.5 h-4.5" />
                            Download Poster (പോസ്റ്റർ ഡൗൺലോഡ് ചെയ്യുക)
                        </button>

                        <a
                            href={`https://wa.me/918281102606?text=Assalamu%20Alaikum.%20I%20have%20donated%20Rs.%20${amount}%20to%20Jariya%20Hub.%20Donation%20ID:%20${donationId}.%20Please%20find%20my%20details%20attached.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-emerald-950/50 border border-emerald-500/25 hover:bg-emerald-950/70 text-emerald-400 hover:text-emerald-300 font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all text-sm cursor-pointer"
                        >
                            <MessageCircle className="w-4.5 h-4.5" />
                            Share Receipt on WhatsApp
                        </a>

                        <Link 
                            href="/" 
                            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all text-slate-300 hover:text-white"
                        >
                            <Home className="w-4 h-4" />
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
