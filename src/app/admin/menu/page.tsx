'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Search, Edit2, Trash2,
    X, Loader2, AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import { MENU_CATEGORIES } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function AdminMenu() {
    const router = useRouter()
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('All')
    const [actionLoading, setActionLoading] = useState(false)

    // Auth Guard
    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth')
        if (!isAuth) {
            router.push('/login')
        }
    }, [router])

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: MENU_CATEGORIES[0].name,
        image_url: '',
        description: '',
        is_featured: false
    })

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setItems(data || [])
        } catch (err) {
            console.error('Error fetching menu items:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item)
            setFormData({
                name: item.name,
                category: item.category,
                image_url: item.image_url || '',
                description: item.description || '',
                is_featured: item.is_featured || false
            })
        } else {
            setEditingItem(null)
            setFormData({
                name: '',
                category: MENU_CATEGORIES[0].name,
                image_url: '',
                description: '',
                is_featured: false
            })
        }
        setIsModalOpen(true)
    }

    const handleSaveItem = async (e: React.FormEvent) => {
        e.preventDefault()
        setActionLoading(true)
        try {
            if (editingItem) {
                // Update
                const { error } = await supabase
                    .from('menu_items')
                    .update(formData)
                    .eq('id', editingItem.id)
                if (error) throw error
            } else {
                // Add
                const { error } = await supabase
                    .from('menu_items')
                    .insert([formData])
                if (error) throw error
            }

            setIsModalOpen(false)
            fetchItems()
        } catch (err) {
            console.error('Error saving item:', err)
            alert('Error saving item')
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        setActionLoading(true)
        try {
            const { error } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchItems()
        } catch (err) {
            console.error('Error deleting item:', err)
        } finally {
            setActionLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_auth')
        router.push('/login')
    }

    return (
        <div className="pt-24 pb-12 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center space-x-3 text-primary mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Inventory System</span>
                        </div>
                        <h1 className="text-4xl font-black font-outfit text-gray-900 uppercase tracking-tighter italic">CHIBUGAN <span className="text-primary italic">STOCKS</span></h1>
                        <p className="text-gray-400 font-medium italic text-sm">Managing {items.length} premium menu offerings</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 text-gray-500 px-6 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all text-xs"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex-1 md:flex-none bg-primary text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                        >
                            <Plus size={18} />
                            <span>Add New Item</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 mb-12">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-16 pr-6 py-4 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-medium placeholder:text-gray-300 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <button
                            onClick={() => setFilter('All')}
                            className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${filter === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            All Dishes
                        </button>
                        {MENU_CATEGORIES.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setFilter(cat.name)}
                                className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${filter === cat.name ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid or Loader */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-6">
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-[10px]">Filtering Flavors...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {items
                                .filter(item => (filter === 'All' || item.category === filter) && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white rounded-[3rem] overflow-hidden border border-gray-50 shadow-sm group hover:shadow-2xl transition-all duration-500 relative p-3"
                                    >
                                        <div className="relative h-64 w-full overflow-hidden rounded-[2.5rem] bg-gray-50">
                                            <Image src={item.image_url || '/images/hero-food.png'} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />

                                            <div className="absolute top-4 right-4 flex space-x-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tight text-lg italic whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</h3>
                                                {item.is_featured && <Star size={14} className="text-accent fill-accent" />}
                                            </div>
                                            <p className="text-gray-400 text-xs italic line-clamp-2 font-medium">"{item.description || 'No specialized description provided yet.'}"</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                            onClick={() => !actionLoading && setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-xl rounded-[4rem] overflow-hidden relative shadow-6xl"
                        >
                            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">{editingItem ? 'REFINE' : 'ENLIST NEW'} <span className="text-primary italic">DISH</span></h2>
                                    <p className="text-gray-400 font-medium italic text-sm">{editingItem ? 'Updating catalog information' : 'Injecting fresh flavor into the system'}</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white rounded-2xl text-gray-400 hover:text-primary transition-all shadow-sm">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveItem} className="p-10 space-y-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Item Nomenclature</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. ULTRA BBQ PLATTER"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Classification</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all appearance-none font-bold text-gray-700"
                                            >
                                                {MENU_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Visual Asset URL</label>
                                            <input
                                                type="text"
                                                value={formData.image_url}
                                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                                placeholder="https://image-source.com/dish.jpg"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Flavor Profile / Description</label>
                                        <textarea
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Detail the ingredients, preparation, and soul of this dish..."
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all resize-none font-bold text-gray-700"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                            className="w-6 h-6 accent-primary rounded-lg"
                                        />
                                        <label htmlFor="featured" className="text-xs font-black uppercase tracking-widest text-gray-600">Promote to Featured Status</label>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        disabled={actionLoading}
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-5 font-black text-xs text-gray-400 uppercase tracking-widest hover:text-black transition-colors disabled:opacity-50"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        disabled={actionLoading}
                                        type="submit"
                                        className="flex-1 bg-primary text-white py-5 rounded-[2rem] font-black shadow-3xl shadow-primary/20 hover:bg-black transition-all flex items-center justify-center space-x-3 disabled:opacity-50 uppercase tracking-widest text-xs"
                                    >
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck size={18} />}
                                        <span>{actionLoading ? 'Synchronizing...' : editingItem ? 'Confirm Update' : 'Publish Dish'}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

function Star({ size, className }: { size: number, className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    )
}

function ShieldCheck({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>
    )
}
