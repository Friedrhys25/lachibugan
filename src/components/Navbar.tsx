'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User, ShieldCheck } from 'lucide-react'
import { NAV_LINKS, RESTAURANT_INFO } from '@/lib/constants'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const adminHref = mounted && localStorage.getItem('admin_auth') ? "/admin" : "/login"

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-1' : 'bg-transparent py-3'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/lachibugan/images/laChibugan.jpg"
                                alt="LA.Chibugan Logo"
                                fill
                                className="object-contain rounded-full border-2 border-primary"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold tracking-wider uppercase transition-colors ${scrolled ? 'text-white hover:text-primary' : 'text-white md:text-white drop-shadow-md hover:text-primary'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href={adminHref}
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-primary/20 flex items-center space-x-2"
                        >
                            <ShieldCheck size={14} />
                            <span>System Admin</span>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-50 bg-black flex flex-col pt-24 px-8"
                    >
                        <button
                            className="absolute top-8 right-8 text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col space-y-8 items-center pt-20">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-3xl font-black text-white hover:text-primary uppercase tracking-tighter"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto pb-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                            L.A. CHIBUGAN - Grill & Fastfood
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
