'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, CheckCircle, ExternalLink, Video, Image as ImageIcon, Loader2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoItem {
    _id: string;
    youtubeId: string;
    title: string;
    desc?: string;
    isActive: boolean;
    createdAt: string;
}

interface PhotoItem {
    _id: string;
    src: string;
    title: string;
    desc?: string;
    isActive: boolean;
    createdAt: string;
}

export default function MediaManager() {
    const [subTab, setSubTab] = useState<'videos' | 'photos'>('videos');
    
    // Videos State
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [videosLoading, setVideosLoading] = useState(true);
    const [videoForm, setVideoForm] = useState({
        youtubeLink: '',
        title: '',
        desc: ''
    });

    // Photos State
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [photosLoading, setPhotosLoading] = useState(true);
    const [photoUploading, setPhotoUploading] = useState(false);
    const [photoForm, setPhotoForm] = useState({
        src: '',
        title: '',
        desc: ''
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

    // Trigger Helpers
    const triggerAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setAlertDialog({
            isOpen: true,
            title,
            message,
            type
        });
    };

    // Fetch data
    const fetchVideos = async () => {
        setVideosLoading(true);
        try {
            const res = await axios.get('/api/media-videos?all=true');
            if (res.data.success) {
                setVideos(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch videos:', err);
        } finally {
            setVideosLoading(false);
        }
    };

    const fetchPhotos = async () => {
        setPhotosLoading(true);
        try {
            const res = await axios.get('/api/media-images?all=true');
            if (res.data.success) {
                setPhotos(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch photos:', err);
        } finally {
            setPhotosLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
        fetchPhotos();
    }, []);

    // Video Handlers
    const handleVideoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoForm.youtubeLink) {
            return triggerAlert('Validation Error', 'Please enter a YouTube link or ID', 'error');
        }

        try {
            await axios.post('/api/media-videos', videoForm);
            setVideoForm({ youtubeLink: '', title: '', desc: '' });
            fetchVideos();
            triggerAlert('Success', 'Video successfully added', 'success');
        } catch (err: any) {
            triggerAlert('Submission Failed', err.response?.data?.error || 'Failed to add video', 'error');
        }
    };

    const handleVideoDelete = async (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Video',
            message: 'Are you sure you want to permanently delete this video? This action cannot be undone.',
            isLoading: false,
            onConfirm: async () => {
                setConfirmDialog(prev => ({ ...prev, isLoading: true }));
                try {
                    await axios.delete(`/api/media-videos/${id}`);
                    fetchVideos();
                } catch (err) {
                    triggerAlert('Error', 'Failed to delete video', 'error');
                } finally {
                    setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: () => {}, isLoading: false });
                }
            }
        });
    };

    const handleVideoToggle = async (id: string, currentStatus: boolean) => {
        try {
            await axios.put(`/api/media-videos/${id}`, { isActive: !currentStatus });
            fetchVideos();
        } catch (err) {
            triggerAlert('Error', 'Failed to update status', 'error');
        }
    };

    // Photo Handlers
    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4.5 * 1024 * 1024) {
            return triggerAlert('File Size Limit', 'File is too large. Please upload an image smaller than 4.5MB.', 'error');
        }

        setPhotoUploading(true);
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
                setPhotoForm(prev => ({ ...prev, src: data.url }));
            } else {
                triggerAlert('Upload Failed', data.error || 'Server error during upload', 'error');
            }
        } catch (err: any) {
            console.error('Upload error:', err);
            triggerAlert('Upload Error', err.message || 'Upload failed', 'error');
        } finally {
            setPhotoUploading(false);
        }
    };

    const handlePhotoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!photoForm.src) {
            return triggerAlert('Validation Error', 'Please upload or provide an image URL', 'error');
        }

        try {
            await axios.post('/api/media-images', photoForm);
            setPhotoForm({ src: '', title: '', desc: '' });
            fetchPhotos();
            triggerAlert('Success', 'Photo successfully added', 'success');
        } catch (err) {
            triggerAlert('Submission Failed', 'Failed to add photo', 'error');
        }
    };

    const handlePhotoDelete = async (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Photo',
            message: 'Are you sure you want to permanently delete this photo? This action cannot be undone.',
            isLoading: false,
            onConfirm: async () => {
                setConfirmDialog(prev => ({ ...prev, isLoading: true }));
                try {
                    await axios.delete(`/api/media-images/${id}`);
                    fetchPhotos();
                } catch (err) {
                    triggerAlert('Error', 'Failed to delete photo', 'error');
                } finally {
                    setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: () => {}, isLoading: false });
                }
            }
        });
    };

    const handlePhotoToggle = async (id: string, currentStatus: boolean) => {
        try {
            await axios.put(`/api/media-images/${id}`, { isActive: !currentStatus });
            fetchPhotos();
        } catch (err) {
            triggerAlert('Error', 'Failed to update status', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Media Manager</h2>
                    <p className="text-slate-400 text-sm">Add and manage YouTube videos and gallery photos displayed on the homepage.</p>
                </div>

                {/* Sub Tab Controls */}
                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setSubTab('videos')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${
                            subTab === 'videos' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <Video className="w-4 h-4" />
                        YouTube Videos
                    </button>
                    <button
                        onClick={() => setSubTab('photos')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${
                            subTab === 'photos' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        Gallery Photos
                    </button>
                </div>
            </div>

            {subTab === 'videos' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Video Form */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plus className="text-emerald-500 w-5 h-5" /> Add YouTube Video
                        </h3>
                        <form onSubmit={handleVideoSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400">YouTube URL or Video ID</label>
                                <input
                                    type="text"
                                    required
                                    value={videoForm.youtubeLink}
                                    onChange={(e) => setVideoForm(prev => ({ ...prev, youtubeLink: e.target.value }))}
                                    placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400">Video Title</label>
                                <input
                                    type="text"
                                    required
                                    value={videoForm.title}
                                    onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter descriptive title"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400">Description (Optional)</label>
                                <textarea
                                    value={videoForm.desc}
                                    onChange={(e) => setVideoForm(prev => ({ ...prev, desc: e.target.value }))}
                                    placeholder="Enter short description"
                                    rows={3}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                            >
                                Add Video
                            </button>
                        </form>
                    </div>

                    {/* Videos List */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">Active YouTube Videos</h3>
                        
                        {videosLoading ? (
                            <div className="flex items-center justify-center py-12 text-slate-500 gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                                <span>Loading videos...</span>
                            </div>
                        ) : videos.length === 0 ? (
                            <div className="text-center py-12 text-slate-500 text-sm">
                                No videos added yet.
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                                {videos.map((video) => (
                                    <div key={video._id} className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl items-start justify-between">
                                        <div className="flex gap-4 items-start">
                                            {/* Thumbnail Preview */}
                                            <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <Play className="w-4 h-4 text-white fill-current" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white leading-snug line-clamp-1">{video.title}</h4>
                                                {video.desc && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{video.desc}</p>}
                                                <span className="inline-block text-[10px] text-slate-600 mt-2">ID: {video.youtubeId}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleVideoToggle(video._id, video.isActive)}
                                                className={`p-1.5 rounded-lg border transition-colors ${
                                                    video.isActive
                                                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-500'
                                                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                                }`}
                                                title={video.isActive ? 'Active' : 'Inactive'}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleVideoDelete(video._id)}
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
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Photo Form */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plus className="text-emerald-500 w-5 h-5" /> Add Gallery Photo
                        </h3>
                        <form onSubmit={handlePhotoSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 block">Upload Image</label>
                                <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors bg-slate-950/50 relative">
                                    {photoForm.src ? (
                                        <div className="space-y-3">
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mx-auto">
                                                <img src={photoForm.src} alt="Uploaded preview" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setPhotoForm(prev => ({ ...prev, src: '' }))}
                                                className="text-xs text-red-500 hover:underline"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                            {photoUploading ? (
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
                                                            onChange={handlePhotoUpload}
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
                                    value={photoForm.src}
                                    onChange={(e) => setPhotoForm(prev => ({ ...prev, src: e.target.value }))}
                                    placeholder="https://example.com/image.png"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400">Photo Title</label>
                                <input
                                    type="text"
                                    required
                                    value={photoForm.title}
                                    onChange={(e) => setPhotoForm(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter descriptive title"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400">Description (Optional)</label>
                                <textarea
                                    value={photoForm.desc}
                                    onChange={(e) => setPhotoForm(prev => ({ ...prev, desc: e.target.value }))}
                                    placeholder="Enter short description"
                                    rows={3}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                            >
                                Add Photo
                            </button>
                        </form>
                    </div>

                    {/* Photos List */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">Active Gallery Photos</h3>
                        
                        {photosLoading ? (
                            <div className="flex items-center justify-center py-12 text-slate-500 gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                                <span>Loading photos...</span>
                            </div>
                        ) : photos.length === 0 ? (
                            <div className="text-center py-12 text-slate-500 text-sm">
                                No photos added yet.
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                                {photos.map((photo) => (
                                    <div key={photo._id} className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl items-start justify-between">
                                        <div className="flex gap-4 items-start">
                                            {/* Image Preview */}
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                                                <img
                                                    src={photo.src}
                                                    alt={photo.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white leading-snug line-clamp-1">{photo.title}</h4>
                                                {photo.desc && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{photo.desc}</p>}
                                                <a
                                                    href={photo.src}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-[10px] text-emerald-500 mt-2 hover:underline"
                                                >
                                                    View full image <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePhotoToggle(photo._id, photo.isActive)}
                                                className={`p-1.5 rounded-lg border transition-colors ${
                                                    photo.isActive
                                                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-500'
                                                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                                }`}
                                                title={photo.isActive ? 'Active' : 'Inactive'}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePhotoDelete(photo._id)}
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
            )}

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
