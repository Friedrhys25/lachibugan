'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Globe, Phone, MapPin, Mail, Instagram, MessageCircle, Video, LogOut, LayoutDashboard, UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import { RESTAURANT_INFO } from '@/lib/constants'
import { Database } from '@/types/database.types'
import { supabase } from '@/lib/supabase'

type Settings = Database['public']['Tables']['restaurant_settings']['Row']

export default function AdminSettings() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    // Auth Guard
    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth')
        if (!isAuth) {
            router.push('/login')
        }
    }, [router])

    const [settings, setSettings] = useState({
        name: RESTAURANT_INFO.name,
        motto: RESTAURANT_INFO.motto,
        hours: RESTAURANT_INFO.hours,
        address: RESTAURANT_INFO.address,
        phone: RESTAURANT_INFO.phone,
        messenger: RESTAURANT_INFO.socials.messenger,
        instagram: RESTAURANT_INFO.socials.instagram,
        tiktok: RESTAURANT_INFO.socials.tiktok,
        email: RESTAURANT_INFO.socials.email,
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('restaurant_settings')
                .select('*')
                .single()

            if (data) {
                setSettings({
                    name: data.name,
                    motto: data.motto,
                    hours: data.hours,
                    address: data.address,
                    phone: data.phone,
                    messenger: data.messenger || '',
                    instagram: data.instagram || '',
                    tiktok: data.tiktok || '',
                    email: data.email || '',
                })
            }
            if (error && error.code !== 'PGRST116') throw error
        } catch (err) {
            console.error('Error fetching settings:', err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setIsError(false)
        setMessage('')

        try {
            const { error } = await supabase
                .from('restaurant_settings')
                .upsert({
                    id: 1,
                    ...settings,
                    updated_at: new Date().toISOString(),
                })

            if (error) throw error

            setMessage('System configurations updated successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (err: any) {
            console.error('Error saving settings:', err)
            setIsError(true)
            setMessage(err.message || 'Error saving settings')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_auth')
        router.push('/login')
    }

    return (
        <div className="pt-24 pb-12 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Admin Nav */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-6">
                        <Link href="/admin" className="flex items-center space-x-3 text-primary bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                            <LayoutDashboard size={20} />
                            <span className="font-black uppercase tracking-widest text-xs">Core Settings</span>
                        </Link>
                        <Link href="/admin/menu" className="flex items-center space-x-3 text-gray-400 hover:text-primary transition-all px-6 py-3 rounded-2xl">
                            <UtensilsCrossed size={20} />
                            <span className="font-black uppercase tracking-widest text-xs">Menu Management</span>
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-gray-400 hover:text-red-500 transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <LogOut size={18} />
                        <span>Terminate Session</span>
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="p-10 md:p-14 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50/50">
                        <div>
                            <div className="flex items-center space-x-3 text-primary mb-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Environmental Control</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">SYSTEM <span className="text-primary italic">CONFIG</span></h1>
                            <p className="text-gray-400 font-medium italic">Adjust the global parameters of L.A. CHIBUGAN</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-[2rem] font-black flex items-center justify-center space-x-3 hover:bg-black disabled:opacity-50 transition-all shadow-3xl shadow-primary/20 uppercase tracking-widest text-xs"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            <span>{loading ? 'Synchronizing...' : 'Deploy Changes'}</span>
                        </button>
                    </div>

                    <form className="p-10 md:p-14 space-y-12" onSubmit={handleSave}>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-6 rounded-[2rem] border font-black uppercase tracking-widest text-[10px] flex items-center space-x-4 ${isError ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}
                            >
                                <div className={`w-2 h-2 rounded-full animate-pulse ${isError ? 'bg-red-600' : 'bg-green-600'}`} />
                                <span>{message}</span>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Basic Info */}
                            <div className="space-y-8">
                                <h3 className="text-xs font-black flex items-center space-x-3 text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4">
                                    <Globe size={18} />
                                    <span>Identity & Logistics</span>
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Restaurant Title</label>
                                        <input
                                            type="text" name="name" value={settings.name} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Operational Motto</label>
                                        <input
                                            type="text" name="motto" value={settings.motto} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Temporal Boundaries (Hours)</label>
                                        <input
                                            type="text" name="hours" value={settings.hours} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-8">
                                <h3 className="text-xs font-black flex items-center space-x-3 text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4">
                                    <Phone size={18} />
                                    <span>Signal & Location</span>
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Geospatial Address</label>
                                        <input
                                            type="text" name="address" value={settings.address} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Direct Voice Line</label>
                                        <input
                                            type="text" name="phone" value={settings.phone} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest italic">Digital Mail Access</label>
                                        <input
                                            type="email" name="email" value={settings.email} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8">
                            <h3 className="text-xs font-black flex items-center space-x-3 text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4 mb-8">
                                <Instagram size={18} />
                                <span>Platform Integration Handles</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
                                        <MessageCircle size={18} />
                                    </div>
                                    <input
                                        type="text" name="messenger" value={settings.messenger} onChange={handleChange} placeholder="Messenger handle"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
                                        <Instagram size={18} />
                                    </div>
                                    <input
                                        type="text" name="instagram" value={settings.instagram} onChange={handleChange} placeholder="Instagram handle"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
                                        <Video size={18} />
                                    </div>
                                    <input
                                        type="text" name="tiktok" value={settings.tiktok} onChange={handleChange} placeholder="Tiktok handle"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>

                <p className="text-center mt-12 text-gray-400 text-[10px] uppercase font-black tracking-[0.4em]">
                    &copy; {new Date().getFullYear()} L.A. CHIBUGAN INDUSTRIAL RESERVE - AUTHORIZED PERSONNEL ONLY
                </p>
            </div>
        </div>
    )
}
