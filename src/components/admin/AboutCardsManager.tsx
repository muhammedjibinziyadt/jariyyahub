'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, CheckCircle, ExternalLink, Image as ImageIcon, Loader2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutCard {
    _id: string;
    image: string;
    title: string;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export default function AboutCardsManager() {
    const [cards, setCards] = useState<AboutCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        image: '',
        title: '',
        description: ''
    });

    // Custom Popups State
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void | Promise<void>;
        isLoading: boolean;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {},
        isLoading: false
    });

    const [alertDialog, setAlertDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    const triggerAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setAlertDialog({ isOpen: true, title, message, type });
    };

    const fetchCards = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/about-cards?all=true');
            if (res.data.success) {
                setCards(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch cards:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4.5 * 1024 * 1024) {
            return triggerAlert('File Size Limit', 'File is too large. Please upload an image smaller than 4.5MB.', 'error');
        }

        setUploading(true);
        try {
            const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            const data = await res.json();
            if (data.success) {
                setForm(prev => ({ ...prev, image: data.url }));
            } else {
                triggerAlert('Upload Failed', data.error || 'Server error during upload', 'error');
            }
        } catch (err: any) {
            console.error('Upload error:', err);
            triggerAlert('Upload Error', err.message || 'Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.image || !form.title || !form.description) {
            return triggerAlert('Validation Error', 'Please fill in all fields (Image, Title, Description)', 'error');
        }

        try {
            await axios.post('/api/about-cards', form);
            setForm({ image: '', title: '', description: '' });
            fetchCards();
            triggerAlert('Success', 'About Card successfully added', 'success');
        } catch (err) {
            triggerAlert('Submission Failed', 'Failed to add card', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Card',
            message: 'Are you sure you want to permanently delete this card? This action cannot be undone.',
            isLoading: false,
            onConfirm: async () => {
                setConfirmDialog(prev => ({ ...prev, isLoading: true }));
                try {
                    await axios.delete(`/api/about-cards/${id}`);
                    fetchCards();
                } catch (err) {
                    triggerAlert('Error', 'Failed to delete card', 'error');
                } finally {
                    setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: () => {}, isLoading: false });
                }
            }
        });
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            await axios.put(`/api/about-cards/${id}`, { isActive: !currentStatus });
            fetchCards();
        } catch (err) {
            triggerAlert('Error', 'Failed to update status', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">About Cards Manager</h2>
                    <p className="text-slate-400 text-sm">Add and manage the cards shown in the 'Our Projects' section on the homepage.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Plus className="text-emerald-500 w-5 h-5" /> Add Project Card
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 block">Upload Image</label>
                            <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors bg-slate-950/50 relative">
                                {form.image ? (
                                    <div className="space-y-3">
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mx-auto">
                                            <img src={form.image} alt="Uploaded preview" className="w-full h-full object-cover" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, image: '' }))}
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-4">
                                        <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                        {uploading ? (
                                            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                                                <span>Uploading...</span>
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="cursor-pointer text-xs text-emerald-500 hover:underline font-semibold block">
                                                    Browse file
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <span className="text-[10px] text-slate-600">Max size: 4.5MB</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400">Or Paste Image URL</label>
                            <input
                                type="text"
                                value={form.image}
                                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="https://example.com/image.png"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400">Card Title</label>
                            <input
                                type="text"
                                required
                                value={form.title}
                                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter card title"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400">Description</label>
                            <textarea
                                required
                                value={form.description}
                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter card description"
                                rows={4}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                        >
                            Add Card
                        </button>
                    </form>
                </div>

                {/* Cards List */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Active Cards</h3>
                    
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-slate-500 gap-2">
                            <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                            <span>Loading cards...</span>
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 text-sm">
                            No cards added yet.
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                            {cards.map((card) => (
                                <div key={card._id} className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl items-start justify-between">
                                    <div className="flex gap-4 items-start w-full">
                                        {/* Image Preview */}
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-white leading-snug">{card.title}</h4>
                                            <p className="text-xs text-slate-400 mt-1 line-clamp-3">{card.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggle(card._id, card.isActive)}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                card.isActive
                                                    ? 'bg-emerald-950/30 border-emerald-800 text-emerald-500'
                                                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                            }`}
                                            title={card.isActive ? 'Active' : 'Inactive'}
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(card._id)}
                                            className="p-1.5 rounded-lg border border-slate-800 text-red-500 hover:bg-red-950/20 hover:border-red-900 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Confirm Dialog Modal */}
            <AnimatePresence>
                {confirmDialog.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl relative"
                        >
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white">{confirmDialog.title}</h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{confirmDialog.message}</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                                    disabled={confirmDialog.isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDialog.onConfirm}
                                    className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm text-white font-medium transition-colors flex items-center gap-2"
                                    disabled={confirmDialog.isLoading}
                                >
                                    {confirmDialog.isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Custom Alert Dialog Modal */}
                {alertDialog.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl relative"
                        >
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    {alertDialog.type === 'error' ? (
                                        <span className="text-red-500 font-bold">⚠</span>
                                    ) : alertDialog.type === 'success' ? (
                                        <span className="text-emerald-500 font-bold">✓</span>
                                    ) : (
                                        <span className="text-blue-500 font-bold">ℹ</span>
                                    )}
                                    {alertDialog.title}
                                </h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{alertDialog.message}</p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setAlertDialog(prev => ({ ...prev, isOpen: false }))}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm text-white font-medium transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
