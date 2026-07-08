'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Check, Home, Heart, Smartphone, MessageSquare, ShieldCheck, HeartHandshake, Copy, User, Phone, Info, AlertTriangle, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface DonationData {
    name: string
    phone: string
    message: string
    amount: number
    customAmount: string
    agreedToTerms: boolean
    donationId?: string
    paymentMethod: 'online' | 'offline' | ''
}

export default function DonatePage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [copiedUpi, setCopiedUpi] = useState(false)
    const [selectedApp, setSelectedApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other' | ''>('')
    const [isWaitingForPayment, setIsWaitingForPayment] = useState(false)
    const [showStatusConfirm, setShowStatusConfirm] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)
    const [settingsUpi, setSettingsUpi] = useState('123456@sbi')

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data && data.data.upiId) {
                    setSettingsUpi(data.data.upiId)
                }
            })
            .catch(err => console.error('Failed to load settings:', err))
    }, [])

    useEffect(() => {
        const handleFocus = () => {
            if (isWaitingForPayment) {
                setTimeout(() => {
                    setShowStatusConfirm(true)
                }, 500)
            }
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [isWaitingForPayment])

    const [formData, setFormData] = useState<DonationData>({
        name: '',
        phone: '',
        message: '',
        amount: 1000,
        customAmount: '',
        agreedToTerms: false,
        donationId: '',
        paymentMethod: ''
    })

    const presetAmounts = [500, 1000, 2500, 5000]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const selectPresetAmount = (amt: number) => {
        setFormData(prev => ({
            ...prev,
            amount: amt,
            customAmount: amt.toString()
        }))
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setFormData(prev => ({
            ...prev,
            customAmount: val,
            amount: val ? parseInt(val, 10) || 0 : 0
        }))
    }

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            agreedToTerms: e.target.checked
        }))
    }

    const validateForm = () => {
        if (!formData.name.trim()) {
            alert('Please enter your name.')
            return false
        }
        if (!formData.phone.trim()) {
            alert('Please enter your phone number.')
            return false
        }
        if (formData.amount <= 0) {
            alert('Please select or enter a valid donation amount.')
            return false
        }
        if (!formData.agreedToTerms) {
            alert('You must agree to the terms and conditions to proceed.')
            return false
        }
        return true
    }

    const handleProceedToPayment = () => {
        if (!validateForm()) return
        setFormData(prev => ({
            ...prev,
            paymentMethod: 'online'
        }))
        setStep(2)
    }

    const submitDonation = async () => {
        if (!selectedApp) {
            alert('Please select a payment application first.')
            return
        }

        setLoading(true)
        setPaymentFailed(false)
        try {
            const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

            const donationId = `DON-${Math.floor(100000 + Math.random() * 900000)}`
            const finalData = {
                bookingId: donationId,
                name: formData.name,
                phone: formData.phone,
                phone2: '',
                place: 'Donation Page',
                address: formData.message || 'General Donation for Dars',
                post: '',
                pinCode: '',
                copies: 1,
                totalAmount: formData.amount,
                paymentMethod: 'online',
                deliveryMethod: 'donation'
            }

            setFormData(prev => ({ ...prev, donationId }))

            // 1. Launch the UPI app link
            const baseParams = `pa=${settingsUpi}&pn=JawharathulUloomSuffaDars&cu=INR&am=${formData.amount}&url=${encodeURIComponent(window.location.origin + '/donate')}`
            let upiUrl = `upi://pay?${baseParams}`

            if (typeof window !== 'undefined') {
                const ua = navigator.userAgent || navigator.vendor || (window as any).opera
                const isAndroid = /android/i.test(ua)
                const isIos = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream

                if (selectedApp === 'gpay') {
                    if (isAndroid) {
                        upiUrl = `intent://pay?${baseParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`
                    } else if (isIos) {
                        upiUrl = `gpay://upi/pay?${baseParams}`
                    }
                } else if (selectedApp === 'phonepe') {
                    if (isAndroid) {
                        upiUrl = `intent://pay?${baseParams}#Intent;scheme=upi;package=com.phonepe.app;end;`
                    } else if (isIos) {
                        upiUrl = `phonepe://pay?${baseParams}`
                    }
                } else if (selectedApp === 'paytm') {
                    if (isAndroid) {
                        upiUrl = `intent://pay?${baseParams}#Intent;scheme=upi;package=net.one97.paytm;end;`
                    } else if (isIos) {
                        upiUrl = `paytmmp://pay?${baseParams}`
                    }
                }
            }

            window.location.href = upiUrl
            
            // Set waiting state so focus handler will trigger modal when user switches back to browser
            setIsWaitingForPayment(true)

            // 2. Log payment details in background spreadsheet
            if (GOOGLE_SCRIPT_URL) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalData),
                })
            } else {
                console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set. Skipping spreadsheet logging.")
            }

        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to initiate transaction. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handlePaymentSuccess = () => {
        setIsWaitingForPayment(false)
        setShowStatusConfirm(false)
        setStep(3)
    }

    const handlePaymentFailed = () => {
        setIsWaitingForPayment(false)
        setShowStatusConfirm(false)
        setPaymentFailed(true)
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(settingsUpi)
        setCopiedUpi(true)
        setTimeout(() => setCopiedUpi(false), 2000)
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 pt-24 md:pt-32 flex items-center justify-center transition-colors">
            <div className="w-full max-w-2xl bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors" title="Back to Home">
                            <Home className="w-5 h-5 text-slate-500" />
                        </Link>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <HeartHandshake className="w-6 h-6 text-primary" />
                            Dars Donation Fund
                        </h1>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                        Step {step} of 3
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${step >= s
                                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                                    : 'bg-muted text-muted-foreground border border-border'
                                    }`}>
                                    {step > s ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : s}
                                </div>
                                {s < 3 && (
                                    <div className={`w-16 md:w-24 h-1 rounded-full mx-2 transition-colors duration-300 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="min-h-[380px]">
                        {/* Step 1: Donor & Amount Selection */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold mb-2">Support Islamic Education</h2>
                                    <p className="text-muted-foreground text-sm">Your contribution helps sustain and nourish students of Dars with pure Islamic knowledge.</p>
                                </div>

                                {/* Section 1: Donation Amount */}
                                <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-border/60 rounded-2xl p-5 md:p-6 space-y-5">
                                    <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                                        <Heart className="w-5 h-5 text-primary" />
                                        <h3 className="font-bold text-base">Select Donation Amount</h3>
                                    </div>

                                    {/* Preset Amount Selection */}
                                    <div className="space-y-3">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose Option (₹)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {presetAmounts.map((amt) => (
                                                <button
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => selectPresetAmount(amt)}
                                                    className={`py-3.5 px-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${formData.amount === amt
                                                        ? 'border-primary bg-primary/10 text-primary scale-[1.03] shadow-md shadow-primary/5'
                                                        : 'border-border bg-card hover:border-primary/40 text-foreground hover:bg-slate-50 dark:hover:bg-slate-800'
                                                        }`}
                                                >
                                                    ₹{amt.toLocaleString()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Amount Input */}
                                    <div className="space-y-2">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Or Enter Custom Amount (₹)</label>
                                        <div className="relative rounded-xl overflow-hidden shadow-sm">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl text-muted-foreground/80">₹</span>
                                            <input
                                                type="number"
                                                value={formData.customAmount}
                                                onChange={handleCustomAmountChange}
                                                className="w-full pl-9 pr-4 py-4 rounded-xl border border-border bg-card dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-xl tracking-wide placeholder:text-muted-foreground/40 text-primary"
                                                placeholder="Enter other amount"
                                                min="10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Donor Details */}
                                <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-border/60 rounded-2xl p-5 md:p-6 space-y-5">
                                    <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                                        <User className="w-5 h-5 text-primary" />
                                        <h3 className="font-bold text-base">Donor Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Donor Name */}
                                        <div className="space-y-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                                                    <User className="w-4 h-4" />
                                                </span>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div className="space-y-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number (WhatsApp) *</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                                                    <Phone className="w-4 h-4" />
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message (Optional)</label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-3.5 text-muted-foreground/60">
                                                <MessageSquare className="w-4 h-4" />
                                            </span>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm font-medium leading-relaxed"
                                                placeholder="Write prayers, comments, or intentions (e.g. For parents, Isaal-i Thawab)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Conditions Checkbox */}
                                <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-border/80 mt-2">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={formData.agreedToTerms}
                                            onChange={handleTermsChange}
                                            className="w-5 h-5 accent-primary rounded border-border focus:ring-primary/20 cursor-pointer mt-0.5"
                                        />
                                    </div>
                                    <label htmlFor="terms" className="text-xs sm:text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
                                        I agree to the <span className="font-semibold text-primary underline">Terms and Conditions</span> and confirm that this donation is made voluntarily to support the Dars Islamic education platform.
                                    </label>
                                </div>

                                {/* Submit button */}
                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:scale-[1.01] hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                                >
                                    Proceed to Donate ₹{formData.amount.toLocaleString()}
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        {/* Step 2: Payment options (Google Pay, PhonePe, Paytm, Other UPI) */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn text-center">
                                <div className="max-w-md mx-auto space-y-4">
                                    {paymentFailed && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-4 flex items-start gap-3 text-left animate-fadeIn">
                                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-sm">Payment Failed or Cancelled</h4>
                                                <p className="text-xs opacity-90 mt-0.5">There was an issue processing your transaction. Please select your payment application and try again.</p>
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="text-2xl font-bold mb-1">Select Payment Method</h3>
                                    <p className="text-muted-foreground text-sm">Select your preferred UPI app to complete your donation.</p>

                                    <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl py-3 px-6 my-2 shadow-sm animate-pulse-slow">
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">Donation Amount</span>
                                        <span className="text-3xl font-extrabold text-primary">₹{formData.amount.toLocaleString()}</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 pt-2">
                                        {/* Google Pay */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApp('gpay')}
                                            className={`w-full text-foreground border py-4 px-6 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-between gap-3 group ${
                                                selectedApp === 'gpay'
                                                    ? 'border-primary bg-primary/[0.04]'
                                                    : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/30 hover:border-primary/50 hover:bg-primary/[0.02]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2.5">
                                                    <svg viewBox="0 0 24 24" className="w-full h-full">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.91-4.53-6.19-4.53z" fill="#FBBC05"/>
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm md:text-base font-bold">Google Pay</span>
                                            </div>
                                            <span className={`text-xs font-semibold transition-colors ${selectedApp === 'gpay' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>Select GPay &rarr;</span>
                                        </button>

                                        {/* PhonePe */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApp('phonepe')}
                                            className={`w-full text-foreground border py-4 px-6 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-between gap-3 group ${
                                                selectedApp === 'phonepe'
                                                    ? 'border-primary bg-primary/[0.04]'
                                                    : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/30 hover:border-primary/50 hover:bg-primary/[0.02]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#5F259F]/10 dark:bg-[#5F259F]/20 flex items-center justify-center p-2.5">
                                                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                                        <rect width="24" height="24" rx="5" fill="#5F259F"/>
                                                        <path d="M8 6h4.5c1.1 0 2 .9 2 2s-.9 2-2 2H9.5v5H8V6zm1.5 2.5h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H9.5v1z" fill="#FFFFFF"/>
                                                        <path d="M12.5 10.5H15c1.1 0 2 .9 2 2s-.9 2-2 2H13.5v3.5H12v-7.5zm1.5 2.5h1.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H14v1z" fill="#FFFFFF" opacity="0.8"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm md:text-base font-bold">PhonePe</span>
                                            </div>
                                            <span className={`text-xs font-semibold transition-colors ${selectedApp === 'phonepe' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>Select PhonePe &rarr;</span>
                                        </button>

                                        {/* Paytm */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApp('paytm')}
                                            className={`w-full text-foreground border py-4 px-6 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-between gap-3 group ${
                                                selectedApp === 'paytm'
                                                    ? 'border-primary bg-primary/[0.04]'
                                                    : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/30 hover:border-primary/50 hover:bg-primary/[0.02]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#00baf2]/10 dark:bg-[#00baf2]/20 flex items-center justify-center p-2">
                                                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                                        <rect x="1" y="4" width="15" height="15" rx="4.5" fill="#00baf2" opacity="0.85"/>
                                                        <rect x="8" y="5" width="15" height="15" rx="4.5" fill="#002970" opacity="0.95"/>
                                                        <path d="M12 9v7m-3.5-3.5h7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm md:text-base font-bold">Paytm</span>
                                            </div>
                                            <span className={`text-xs font-semibold transition-colors ${selectedApp === 'paytm' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>Select Paytm &rarr;</span>
                                        </button>

                                        {/* All Online Pay / Other UPI */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApp('other')}
                                            className={`w-full text-foreground border py-4 px-6 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-between gap-3 group ${
                                                selectedApp === 'other'
                                                    ? 'border-primary bg-primary/[0.04]'
                                                    : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/30 hover:border-primary/50 hover:bg-primary/[0.02]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center p-2.5 text-primary">
                                                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                                                        <line x1="2" y1="10" x2="22" y2="10"/>
                                                        <path d="M6 14h4"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm md:text-base font-bold">All Online Pay / Other UPI</span>
                                            </div>
                                            <span className={`text-xs font-semibold transition-colors ${selectedApp === 'other' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>Select UPI &rarr;</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/20 text-amber-800 dark:text-amber-300 text-xs text-left mt-6 leading-relaxed max-w-md mx-auto">
                                    <strong>How it works:</strong> Tap on your preferred payment app above, then click <strong>"Complete Donation"</strong>. This will open the app to make the transfer. After completing the payment, return to the browser to confirm your receipt.
                                </div>

                                <div className="flex gap-3 max-w-md mx-auto pt-6 border-t border-border">
                                    <button
                                        onClick={handleBack}
                                        disabled={loading}
                                        className="py-3 px-6 rounded-xl border border-border font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-sm"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                    <button
                                        onClick={submitDonation}
                                        disabled={loading}
                                        className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processing...' : 'Complete Donation'}
                                        <Check className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Success Screen / Share Receipt */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn text-center py-6">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary animate-bounce-slow">
                                    <Heart className="w-10 h-10 fill-current animate-pulse text-red-500" />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-extrabold text-foreground mb-2">Jazakallah Khair!</h2>
                                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                                        May Almighty Allah reward your charity abundantly and accept this contribution as a source of blessing in this life and the hereafter.
                                    </p>
                                </div>

                                {/* Confirmation Box */}
                                <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-border border-dashed text-left space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-border">
                                        <span className="text-sm font-semibold text-muted-foreground">Receipt / Reference</span>
                                        <span className="text-sm font-bold text-primary">{formData.donationId || 'DON-XXXXXX'}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <span className="text-muted-foreground">Donor Name:</span>
                                        <span className="font-semibold text-right">{formData.name}</span>

                                        <span className="text-muted-foreground">Phone Number:</span>
                                        <span className="font-semibold text-right">{formData.phone}</span>

                                        <span className="text-muted-foreground">Amount Donated:</span>
                                        <span className="font-bold text-primary text-right text-lg">₹{formData.amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Whatsapp Share Instruction */}
                                <div className="max-w-md mx-auto space-y-4 pt-4">
                                    <div className="text-xs text-muted-foreground">
                                        Please share the payment transaction screenshot on our official WhatsApp with your donation ID: <strong>{formData.donationId}</strong>.
                                    </div>
                                    <a
                                        href={`https://wa.me/9037150678?text=Assalamu%20Alaikum.%20I%20have%20donated%20Rs.%20${formData.amount}%20to%20Jawharathul%20Uloom%20Suffa%20Dars.%20Donation%20ID:%20${formData.donationId}.%20Please%20find%20the%20screenshot%20attached.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-sm"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.6.35 1.095.541 1.749.541 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.72-5.728zM12 4.8c4.01 0 7.26 3.2 7.26 7.141 0 3.94-3.25 7.141-7.26 7.141-1.04 0-2.33-.21-3.32-.69l-4.5 1.25 1.25-4.5c-.58-1.09-.95-2.28-.95-3.2C4.74 8 7.99 4.8 12 4.8zM17.47 14.28c-.2-.1-1.18-.58-1.36-.65-.18-.08-.31-.12-.44.1-.13.22-.51.65-.63.79-.12.13-.25.15-.45.05-.2-.1-.85-.31-1.62-1-.6-.54-1-1.2-1.12-1.41-.12-.2-.01-.31.09-.4.08-.09.19-.24.28-.35.09-.11.12-.19.18-.31.06-.12.03-.23-.01-.32-.04-.09-.44-1.06-.6-1.45-.16-.39-.32-.33-.44-.34l-.38-.01c-.13 0-.34.05-.52.25-.18.2-1.04.69-1.04 1.7 0 1.01.73 1.99.83 2.13.1.14 1.44 2.19 3.49 3.08 1.48.64 1.78.51 2.13.48.35-.03 1.18-.48 1.34-.95.16-.47.16-.88.11-.95-.05-.08-.18-.12-.38-.22z" /></svg>
                                        Share Receipt on WhatsApp
                                    </a>
                                    <Link href="/" className="inline-block text-xs font-semibold text-primary hover:underline mt-4">
                                        Return to Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment status verification modal */}
            {showStatusConfirm && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="w-full max-w-md bg-card rounded-3xl border border-border shadow-2xl p-6 space-y-6 text-center animate-scaleIn">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <HelpCircle className="w-8 h-8 animate-bounce-slow" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Confirm Payment Status</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">Did your payment of <span className="font-semibold text-primary">₹{formData.amount.toLocaleString()}</span> complete successfully in your UPI app?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={handlePaymentFailed}
                                className="py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/30 text-red-500 bg-red-50/50 dark:bg-red-950/20 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-sm"
                            >
                                No, Payment Failed
                            </button>
                            <button
                                onClick={handlePaymentSuccess}
                                className="py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 hover:scale-[1.01] transition-all shadow-md text-sm"
                            >
                                Yes, Successful
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
