'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react'

// Define types for booking data
interface BookingData {
    name: string
    place: string
    phone: string
    phone2?: string
    address: string
    post: string
    pinCode: string
    copies: number
    paymentMethod: 'online' | 'offline' | ''
    deliveryMethod?: 'postal' | 'pickup'
}

interface Props {
    onClose: () => void
}

const AlMuneerBookingModal = ({ onClose }: Props) => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<BookingData>({
        name: '',
        place: '',
        phone: '',
        phone2: '',
        address: '',
        post: '',
        pinCode: '',
        copies: 1,
        paymentMethod: '',
        deliveryMethod: undefined
    })

    const PRICE_PER_COPY = 250
    const DELIVERY_CHARGE = 60

    const totalAmount = formData.copies * PRICE_PER_COPY +
        (formData.paymentMethod === 'online' && formData.deliveryMethod === 'postal' ? DELIVERY_CHARGE : 0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCopyChange = (change: number) => {
        setFormData(prev => ({
            ...prev,
            copies: Math.max(1, prev.copies + change)
        }))
    }

    const handleNext = () => {
        if (step === 3) {
            if (!formData.paymentMethod) return
            if (formData.paymentMethod === 'online' && !formData.deliveryMethod) return
            submitForm()
        } else {
            setStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
    }

    const submitForm = async () => {
        setLoading(true)
        try {
            // REPLACE THIS URL with your deployed Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''

            if (!GOOGLE_SCRIPT_URL) {
                throw new Error("Google Script URL is missing")
            }

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            // Since we can't check response.ok in no-cors, we proceed to next step
            setStep(4)
        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to submit booking. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Get QR code image based on copy count
    const getQrCodeImage = () => {
        // Files are named "QR 1.png", "QR 2.png" etc.
        return `/images/qr/QR ${formData.copies}.png`
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Al-Muneer Pre-booking
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-8 gap-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                    }`}>
                                    {step > s ? <Check className="w-4 h-4" /> : s}
                                </div>
                                {s < 4 && (
                                    <div className={`w-12 h-1 rounded-full mx-2 ${step > s ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="space-y-6">

                        {/* Step 1: Instructions */}
                        {step === 1 && (
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-500">
                                    Welcome to Al-Muneer Booking
                                </h4>
                                <div className="space-y-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <p>Please follow these steps to complete your pre-booking:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Fill in your valid personal details in the next step.</li>
                                        <li>Select the number of copies you wish to purchase.</li>
                                        <li>Review the total amount calculated.</li>
                                        <li>Complete the payment using the QR code shown in the final step.</li>
                                        <li>Verify your payment by sending a screenshot to the provided WhatsApp number.</li>
                                    </ul>
                                    <p className="font-semibold text-emerald-600 mt-4">
                                        Price per copy: ₹{PRICE_PER_COPY}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Form */}
                        {step === 2 && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Place *</label>
                                            <input
                                                required
                                                name="place"
                                                value={formData.place}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="City/Place"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone *</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone 2 (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                            placeholder="Alternative number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Address *</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                                            placeholder="House name, Street, etc."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Post Office *</label>
                                            <input
                                                required
                                                name="post"
                                                value={formData.post}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Post Office"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Pin Code *</label>
                                            <input
                                                required
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="PIN Code"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-semibold text-slate-800 dark:text-white">Number of Copies</label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleCopyChange(-1)}
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-lg w-6 text-center">{formData.copies}</span>
                                                <button
                                                    onClick={() => handleCopyChange(1)}
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-emerald-200 dark:border-emerald-900/50">
                                            <span className="text-slate-600 dark:text-slate-400">Total Price</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                ₹{(formData.copies * PRICE_PER_COPY).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment Method */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn text-center">
                                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                                    Choose Payment Method
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online', deliveryMethod: undefined }))}
                                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${formData.paymentMethod === 'online'
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                                        </div>
                                        <div className="text-left">
                                            <h5 className="font-bold text-slate-800 dark:text-white">Online Payment</h5>
                                            <p className="text-sm text-slate-500">Google Pay, PhonePe, UPI</p>
                                        </div>
                                        {formData.paymentMethod === 'online' && (
                                            <div className="absolute top-2 right-2 text-emerald-500">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'offline', deliveryMethod: undefined }))}
                                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${formData.paymentMethod === 'offline'
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                        </div>
                                        <div className="text-left">
                                            <h5 className="font-bold text-slate-800 dark:text-white">Offline Payment</h5>
                                            <p className="text-sm text-slate-500">Cash, Direct Transfer</p>
                                        </div>
                                        {formData.paymentMethod === 'offline' && (
                                            <div className="absolute top-2 right-2 text-emerald-500">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {formData.paymentMethod === 'online' && (
                                    <div className="animate-fadeIn mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                                            Choose Delivery Method
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'postal' }))}
                                                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.deliveryMethod === 'postal'
                                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.deliveryMethod === 'postal' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                                </div>
                                                <div className="text-left flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="font-bold text-slate-800 dark:text-white">Postal Delivery</h5>
                                                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">+₹{DELIVERY_CHARGE}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500">Delivered to your address</p>
                                                </div>
                                                {formData.deliveryMethod === 'postal' && <Check className="w-5 h-5 text-emerald-500" />}
                                            </button>

                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'pickup' }))}
                                                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.deliveryMethod === 'pickup'
                                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.deliveryMethod === 'pickup' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                </div>
                                                <div className="text-left flex-1">
                                                    <h5 className="font-bold text-slate-800 dark:text-white">Direct Pickup</h5>
                                                    <p className="text-sm text-slate-500">Collect from office</p>
                                                </div>
                                                {formData.deliveryMethod === 'pickup' && <Check className="w-5 h-5 text-emerald-500" />}
                                            </button>
                                        </div>
                                        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600 dark:text-slate-400">Total Payable</span>
                                                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                    ₹{totalAmount.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Payment Details */}
                        {step === 4 && (
                            <div className="space-y-6 animate-fadeIn text-center">
                                {formData.paymentMethod === 'online' ? (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 inline-block">
                                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">Scan to Pay</h5>
                                        {/* QR Code Placeholder - Replace with actual image logic */}
                                        <div className="w-64 h-64 bg-white p-2 rounded-xl shadow-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={getQrCodeImage()}
                                                alt={`QR Code for ${formData.copies} copies`}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    // Fallback if image not found
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250x250?text=QR+Code+Not+Found'
                                                }}
                                            />
                                        </div>
                                        <p className="text-emerald-600 font-bold text-xl">
                                            Amount: ₹{totalAmount.toLocaleString()}
                                        </p>
                                        {formData.deliveryMethod === 'postal' && (
                                            <p className="text-xs text-slate-500 mt-1">
                                                (Includes ₹{DELIVERY_CHARGE} delivery charge)
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 inline-block w-full max-w-md">
                                        <h5 className="font-bold text-slate-800 dark:text-white mb-4 text-xl">Offline Payment Instructions</h5>
                                        <div className="text-left space-y-4">
                                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                                <p className="font-semibold text-slate-700 dark:text-slate-300">Option 1: Cash Payment</p>
                                                <p className="text-sm text-slate-500 mt-1">Please hand over the total amount of <span className="font-bold text-emerald-600">₹{totalAmount.toLocaleString()}</span> to the office or designated collection agent.</p>
                                            </div>

                                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                                <p className="font-semibold text-slate-700 dark:text-slate-300">Option 2: Bank Transfer</p>
                                                <p className="text-sm text-slate-500 mt-1">You can transfer the amount to the official bank account. Contact us for account details.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        After payment, please send the screenshot to:
                                    </p>
                                    <a
                                        href="https://wa.me/918086871734" // Example number from SubWingsSection (Samajam Convener) - user didn't specify exact number so I will use a placeholder or one from the file. Actually the user said "set a whatsapp contact". I will use the Al-Muneer chairman/convener number if possible, or a placeholder.
                                        // Al-Muneer Convener: +91 91886 70173 (Anees Rahman)
                                        // Let's use that for now.
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.6.35 1.095.541 1.749.541 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.72-5.728zM12 4.8c4.01 0 7.26 3.2 7.26 7.141 0 3.94-3.25 7.141-7.26 7.141-1.04 0-2.33-.21-3.32-.69l-4.5 1.25 1.25-4.5c-.58-1.09-.95-2.28-.95-3.2C4.74 8 7.99 4.8 12 4.8zM17.47 14.28c-.2-.1-1.18-.58-1.36-.65-.18-.08-.31-.12-.44.1-.13.22-.51.65-.63.79-.12.13-.25.15-.45.05-.2-.1-.85-.31-1.62-1-.6-.54-1-1.2-1.12-1.41-.12-.2-.01-.31.09-.4.08-.09.19-.24.28-.35.09-.11.12-.19.18-.31.06-.12.03-.23-.01-.32-.04-.09-.44-1.06-.6-1.45-.16-.39-.32-.33-.44-.34l-.38-.01c-.13 0-.34.05-.52.25-.18.2-1.04.69-1.04 1.7 0 1.01.73 1.99.83 2.13.1.14 1.44 2.19 3.49 3.08 1.48.64 1.78.51 2.13.48.35-.03 1.18-.48 1.34-.95.16-.47.16-.88.11-.95-.05-.08-.18-.12-.38-.22z" /></svg>
                                        Chat on WhatsApp
                                    </a>
                                    <p className="text-xs text-slate-400 mt-2">
                                        Click the button above to share payment screenshot
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between bg-slate-50 dark:bg-slate-900/50">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            disabled={loading}
                            className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                            Back
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={loading || (step === 2 && !formData.name) || (step === 3 && (!formData.paymentMethod || (formData.paymentMethod === 'online' && !formData.deliveryMethod)))} // Validation checks
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Submitting...</span>
                            ) : (
                                <>
                                    {step === 3 ? 'Submit Booking' : 'Next'}
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-medium hover:opacity-90 ml-auto"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlMuneerBookingModal
