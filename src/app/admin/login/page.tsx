
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            if (res.data.success) {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                        <Lock className="w-6 h-6" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
                <p className="text-slate-400 text-center mb-8 text-sm">Enter email & password to manage site content</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
