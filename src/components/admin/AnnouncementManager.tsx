
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';

interface Announcement {
    _id: string;
    text: string;
    link?: string;
    label?: string;
    isActive: boolean;
    priority: number;
}

export default function AnnouncementManager() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        text: '',
        link: '',
        label: 'New',
        priority: 0
    });

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get('/api/announcements?all=true');
            if (res.data.success) {
                setAnnouncements(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/announcements', formData);
            setFormData({ text: '', link: '', label: 'New', priority: 0 });
            fetchAnnouncements();
        } catch (err) {
            alert('Failed to add announcement');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/announcements/${id}`);
            fetchAnnouncements();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await axios.put(`/api/announcements/${id}`, { isActive: !currentStatus });
            fetchAnnouncements();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-10 text-slate-500 flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading announcements...</div>;

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* ADD FORM */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-8">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-emerald-500" />
                        Add New Announcement
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Announcement Text</label>
                            <textarea
                                required
                                value={formData.text}
                                onChange={e => setFormData({ ...formData, text: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                rows={3}
                                placeholder="e.g. Registration Open for Funoon Fiesta!"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Link (Optional)</label>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Label</label>
                                <select
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                >
                                    <option value="New">New</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Event">Event</option>
                                    <option value="Info">Info</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Priority</label>
                                <input
                                    type="number"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Publish Announcement
                        </button>
                    </form>
                </div>
            </div>

            {/* LIST */}
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-white mb-6">Active Announcements ({announcements.length})</h2>

                {announcements.length === 0 && (
                    <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
                        <p className="text-slate-500">No announcements yet.</p>
                    </div>
                )}

                {announcements.map((item) => (
                    <div key={item._id} className={`bg-slate-900 rounded-xl p-5 border transition-all flex items-start justify-between gap-4 group ${item.isActive ? 'border-slate-800 hover:border-slate-700' : 'border-slate-800/50 opacity-60'}`}>
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.label === 'Urgent' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                    {item.label}
                                </span>
                                {item.link && (
                                    <a href={item.link} target="_blank" className="text-xs text-blue-400 flex items-center gap-1 hover:underline">
                                        {new URL(item.link).hostname} <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                                {!item.isActive && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                                        Inactive
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-200 font-medium leading-relaxed">{item.text}</p>
                            <p className="text-xs text-slate-500">Priority: {item.priority}</p>
                        </div>

                        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleToggleActive(item._id, item.isActive)}
                                className={`p-2 rounded-lg transition-colors ${item.isActive ? 'bg-emerald-900/30 text-emerald-500 hover:bg-emerald-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                title="Toggle Status"
                            >
                                <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 bg-red-900/20 text-red-500 hover:bg-red-900/40 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
