import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, MapPin, Phone, MessageCircle, Video } from 'lucide-react'
import { RESTAURANT_INFO } from '@/lib/constants'

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative w-16 h-16">
                                <Image src="/images/laChibugan.jpg" alt="Logo" fill className="rounded-full border-2 border-primary" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
                                {RESTAURANT_INFO.name}
                            </span>
                        </Link>
                        <p className="text-gray-500 text-lg italic leading-relaxed font-medium">
                            "{RESTAURANT_INFO.motto}"
                        </p>
                        <div className="flex space-x-4">
                            <Link href={`https://instagram.com/${RESTAURANT_INFO.socials.instagram}`} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300">
                                <Instagram size={20} />
                            </Link>
                            <Link href={`https://m.me/${RESTAURANT_INFO.socials.messenger}`} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300">
                                <MessageCircle size={20} />
                            </Link>
                            <Link href={`https://tiktok.com/@${RESTAURANT_INFO.socials.tiktok}`} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300">
                                <Video size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-4">
                        <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
                        <ul className="space-y-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
                            <li><Link href="/" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all mr-0 group-hover:mr-2" />Home</Link></li>
                            <li><Link href="/menu" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all mr-0 group-hover:mr-2" />Menu</Link></li>
                            <li><Link href="#about" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all mr-0 group-hover:mr-2" />About Us</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all mr-0 group-hover:mr-2" />Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4">
                        <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs mb-8">Get In Touch</h4>
                        <ul className="space-y-6 text-gray-400">
                            <li className="flex items-start space-x-4">
                                <MapPin size={22} className="text-primary shrink-0" />
                                <span className="font-bold leading-relaxed">{RESTAURANT_INFO.address}</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Phone size={22} className="text-primary shrink-0" />
                                <span className="font-bold text-lg">{RESTAURANT_INFO.phone}</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Mail size={22} className="text-primary shrink-0" />
                                <span className="font-bold">{RESTAURANT_INFO.socials.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div className="pt-4">
                        <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs mb-8">Working Hours</h4>
                        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">Monday - Saturday</p>
                                <p className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{RESTAURANT_INFO.hours}</p>
                                <div className="w-full h-1 bg-white/10 mb-6" />
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Sunday</p>
                                <p className="text-sm text-gray-400 font-bold uppercase italic">Closed for family time</p>
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                        © {new Date().getFullYear()} {RESTAURANT_INFO.name}. Coded with passion & fire.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
