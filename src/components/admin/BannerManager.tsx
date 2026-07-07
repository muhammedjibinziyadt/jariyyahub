
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, CheckCircle, ExternalLink, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Banner {
    _id: string;
    imageUrl: string;
    link?: string;
    title?: string;
    isActive: boolean;
    createdAt: string;
}

export default function BannerManager() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrl: '',
        link: '',
        title: ''
    });

    const fetchBanners = async () => {
        try {
            const res = await axios.get('/api/banners?all=true');
            if (res.data.success) {
                setBanners(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Vercel Serverless Function body size limit is 4.5MB
        if (file.size > 4.5 * 1024 * 1024) {
            alert('File is too large. Please upload an image smaller than 4.5MB.');
            return;
        }

        setUploading(true);
        try {
            const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            });

            const data = await res.json();

            if (data.success) {
                setFormData(prev => ({ ...prev, imageUrl: data.url }));
            } else {
                alert(`Upload failed: ${data.error || 'Server error'}`);
            }
        } catch (err: any) {
            console.error('Upload error:', err);
            alert(`Upload error: ${err.message || 'Upload failed'}`);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) return alert('Please upload or provide an image URL');

        try {
            await axios.post('/api/banners', formData);
            setFormData({ imageUrl: '', link: '', title: '' });
            fetchBanners();
        } catch (err) {
            alert('Failed to add banner');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;
        try {
            await axios.delete(`/api/banners/${id}`);
            fetchBanners();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await axios.put(`/api/banners/${id}`, { isActive: !currentStatus });
            fetchBanners();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-10 text-slate-500 flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading banners...</div>;

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* ADD FORM */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-8">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-emerald-500" />
                        Add New Banner
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Banner Image</label>
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="banner-upload"
                                />
                                <label
                                    htmlFor="banner-upload"
                                    className="w-full h-32 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all group overflow-hidden bg-slate-950"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                    ) : formData.imageUrl ? (
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-6 h-6 text-slate-600 group-hover:text-emerald-500 mb-2" />
                                            <span className="text-xs text-slate-500">Click to upload</span>
                                        </>
                                    )}
                                </label>
                                <div className="text-center text-slate-600 text-[10px]">OR</div>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="Image URL (e.g. https://...)"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Title (Optional)</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                placeholder="Banner title"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Target Link (Optional)</label>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                placeholder="https://..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Publish Banner
                        </button>
                    </form>
                </div>
            </div>

            {/* LIST */}
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-white mb-6">Active Banners ({banners.length})</h2>

                {banners.length === 0 && (
                    <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
                        <p className="text-slate-500">No banners yet.</p>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                    {banners.map((banner) => (
                        <div key={banner._id} className={`bg-slate-900 rounded-xl overflow-hidden border transition-all flex flex-col group ${banner.isActive ? 'border-slate-800 hover:border-slate-700' : 'border-slate-800/50 opacity-60'}`}>
                            <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                                <img src={banner.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={banner.title || 'Banner'} />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleToggleActive(banner._id, banner.isActive)}
                                        className={`p-1.5 rounded-lg transition-colors shadow-lg backdrop-blur-md ${banner.isActive ? 'bg-emerald-500/80 text-white hover:bg-emerald-500' : 'bg-slate-700/80 text-slate-400 hover:bg-slate-700'}`}
                                        title="Toggle Status"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner._id)}
                                        className="p-1.5 bg-red-500/80 text-white hover:bg-red-500 rounded-lg transition-colors shadow-lg backdrop-blur-md"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {!banner.isActive && (
                                    <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center">
                                        <span className="text-xs font-bold uppercase tracking-widest text-white bg-slate-800 px-3 py-1 rounded-full">Inactive</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="text-white font-medium truncate">{banner.title || 'Untitled Banner'}</h3>
                                {banner.link && (
                                    <a href={banner.link} target="_blank" className="text-xs text-blue-400 flex items-center gap-1 hover:underline truncate">
                                        <ExternalLink className="w-3 h-3" /> {banner.link}
                                    </a>
                                )}
                                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                                    Added: {new Date(banner.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
