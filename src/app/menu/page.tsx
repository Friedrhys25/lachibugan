'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Star, ArrowRight, Loader2 } from 'lucide-react'
import { MENU_CATEGORIES } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setItems(data || [])
        } catch (err) {
            console.error('Error fetching menu:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredItems = items.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#FAFAFA]">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6 uppercase tracking-tighter">OUR DELICIOUS <span className="text-primary italic">MENU</span></h1>
                        <p className="text-gray-500 text-lg italic font-medium">
                            Explore our wide variety of dishes, from traditional grill specialties to quick fastfood favorites.
                            Everything prepared fresh daily for that authentic home-cooked taste.
                        </p>
                    </motion.div>
                </div>

                {/* Search & Filters */}
                <div className="sticky top-24 z-30 bg-[#FAFAFA]/80 backdrop-blur-xl py-8 mb-16 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-x-auto pb-4 md:pb-0 w-full lg:w-auto scrollbar-hide px-1">
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === 'All' ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary/30 hover:text-gray-900 shadow-sm'}`}
                            >
                                All Items
                            </button>
                            {MENU_CATEGORIES.map(cat => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center space-x-3 whitespace-nowrap ${activeCategory === cat.name ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary/30 hover:text-gray-900 shadow-sm'}`}
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:w-[450px] group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search your favorite food..."
                                className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-16 pr-6 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none shadow-sm transition-all text-sm font-bold placeholder:text-gray-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-12 flex items-center space-x-4">
                    <div className="h-[1px] flex-1 bg-gray-100" />
                    <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-[10px]">Showing {filteredItems.length} items</p>
                    <div className="h-[1px] flex-1 bg-gray-100" />
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-6">
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-xs">Preparing the feast...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -15 }}
                                    className="bg-white rounded-[3rem] p-3 border border-gray-50 shadow-sm hover:shadow-3xl transition-all duration-700 group relative"
                                >
                                    <div className="relative h-80 w-full overflow-hidden rounded-[2.5rem] bg-gray-50">
                                        <Image
                                            src={item.image_url || '/images/hero-food.png'}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                            {item.is_featured && (
                                                <span className="bg-primary px-4 py-1.5 rounded-full text-[9px] font-black text-white border border-primary uppercase tracking-widest shadow-lg">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-10">
                                        <div className="flex items-center justify-between mb-5">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50 px-4 py-1.5 rounded-full">{item.category}</span>
                                            <div className="flex items-center space-x-1.5 text-accent">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-gray-900 font-black text-sm">4.9</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tight leading-none">{item.name}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic font-medium mb-8">"{item.description || 'Freshly prepared for you.'}"</p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <button className="flex items-center space-x-3 text-gray-900 font-black uppercase tracking-widest text-xs hover:text-primary transition-all group/btn">
                                                <span>Customize</span>
                                                <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center"
                    >
                        <div className="w-32 h-32 bg-gray-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-5xl">🍽️</div>
                        <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">No flavors found</h3>
                        <p className="text-gray-400 font-medium italic">Try adjusting your search or filters to find what you're craving.</p>
                        <button
                            onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                            className="mt-10 text-primary font-black uppercase tracking-widest text-xs border-b-2 border-primary pb-1 hover:text-gray-900 hover:border-gray-900 transition-all"
                        >
                            Reset your palette
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
