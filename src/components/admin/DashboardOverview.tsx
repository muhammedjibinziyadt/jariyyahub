'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Save, RefreshCw, Target, DollarSign, Smartphone,
    Sparkles, Activity
} from 'lucide-react';

export default function DashboardOverview() {
    const [upiId, setUpiId] = useState('123456@sbi');
    const [targetAmount, setTargetAmount] = useState(0);
    const [raisedAmount, setRaisedAmount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setFetching(true);
        try {
            const res = await axios.get('/api/settings');
            if (res.data.success && res.data.data) {
                const settings = res.data.data;
                setUpiId(settings.upiId || '123456@sbi');
                setTargetAmount(Number(settings.targetAmount) || 0);
                setRaisedAmount(Number(settings.raisedAmount) || 0);
            }
        } catch (err) {
            console.error('Failed to fetch settings:', err);
            showFeedback('Failed to load settings.', 'error');
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/settings', {
                upiId,
                targetAmount: Number(targetAmount),
                raisedAmount: Number(raisedAmount)
            });
            if (res.data.success) {
                showFeedback('Settings updated successfully!', 'success');
            } else {
                showFeedback('Failed to update settings.', 'error');
            }
        } catch (err) {
            console.error('Failed to save settings:', err);
            showFeedback('Failed to update settings.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showFeedback = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 0);
    };

    const percent = targetAmount > 0 ? Math.min(100, Math.round((raisedAmount / targetAmount) * 100)) : 0;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <Activity className="text-emerald-500 w-6 h-6 animate-pulse" />
                        Live Metrics & Configuration
                    </h2>
                    <p className="text-slate-400 text-sm">Real-time donation tracking and VPA configuration settings.</p>
                </div>
                <button
                    onClick={fetchSettings}
                    disabled={fetching}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl transition-all"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${fetching ? 'animate-spin' : ''}`} />
                    Refresh Stats
                </button>
            </div>

            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Raised Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Raised</span>
                        <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight mb-1">
                        ₹{raisedAmount.toLocaleString('en-IN')}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold">Active Fund Capital</p>
                </div>

                {/* Target Goal Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Fundraising Goal</span>
                        <div className="w-9 h-9 bg-violet-500/10 rounded-full flex items-center justify-center text-violet-500">
                            <Target className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight mb-1">
                        ₹{targetAmount.toLocaleString('en-IN')}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold">Target Cap</p>
                </div>

                {/* Progress Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Raised Percent</span>
                        <div className="w-9 h-9 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight mb-1">
                        {percent}%
                    </h3>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-violet-600 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                </div>

                {/* Active Gateway Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active UPI Gateway</span>
                        <div className="w-9 h-9 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                            <Smartphone className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-base font-extrabold text-white tracking-tight break-all truncate mb-1">
                        {upiId}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold">Standard Payee VPA</p>
                </div>
            </div>

            {/* Inputs Grid */}
            <div className="max-w-2xl mx-auto w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                            <Save className="text-emerald-500 w-5 h-5" />
                            Configuration Form
                        </h3>
                        <p className="text-xs text-slate-400 mb-6">Modify live payment IDs and home page fundraising goals.</p>

                        <form onSubmit={handleSave} className="space-y-5">
                            {/* UPI ID input */}
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Standard Payee UPI ID
                                </label>
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="e.g. merchant@sbi"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none transition-all"
                                />
                            </div>

                            {/* Target amount input */}
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Target Goal Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                                    min="1"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none transition-all"
                                />
                            </div>

                            {/* Raised amount input */}
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Current Raised Capital (₹)
                                </label>
                                <input
                                    type="number"
                                    value={raisedAmount}
                                    onChange={(e) => setRaisedAmount(Number(e.target.value))}
                                    min="0"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none transition-all"
                                />
                            </div>

                            {/* Feedback messages */}
                            {message.text && (
                                <div className={`text-xs text-center py-2.5 rounded-lg border font-semibold animate-fadeIn ${message.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={loading || fetching}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Configuration
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 mt-6 text-[10px] text-slate-500 leading-relaxed">
                        <strong>Security Note:</strong> Changes saved through this form will dynamically modify all payment URLs, copy-to-clipboard actions, and home page targets in real-time across the app.
                    </div>
                </div>
            </div>
        </div>
    );
}
