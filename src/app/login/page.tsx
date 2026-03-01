'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [forgotMode, setForgotMode] = useState(false)
    const [resetSent, setResetSent] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Simulation of the requested fixed credentials
        setTimeout(() => {
            if (formData.password === 'lachibugan') {
                // In a real app, we'd use Supabase Auth or a secure cookie
                // For this request, we'll use a local storage flag to "authorize" the session
                localStorage.setItem('admin_auth', 'true')
                router.push('/admin')
            } else {
                setError('Invalid credentials. Please try again.')
                setIsLoading(false)
            }
        }, 1500)
    }

    const handleForgotCode = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setResetSent(true)
            // As per request: Password reset sent to specific email
            console.log("Reset link sent to: rhysjonathanabalon@gmail.com")
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col items-center mb-12">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                            className="w-24 h-24 mb-6 relative"
                        >
                            <Image src="/images/laChibugan.jpg" alt="Logo" fill className="rounded-full border-4 border-primary shadow-2xl shadow-primary/20" />
                        </motion.div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter text-center">
                            ADMIN <span className="text-primary italic">PORTAL</span>
                        </h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">{forgotMode ? 'Recover Access' : 'Secure Authentication'}</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!forgotMode ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLogin}
                                className="space-y-6"
                            >
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center space-x-3 text-red-400"
                                    >
                                        <AlertCircle size={18} />
                                        <span className="text-sm font-bold">{error}</span>
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Admin Email"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white outline-none focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all font-medium placeholder:text-gray-600"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            required
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Secure Password"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-16 text-white outline-none focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all font-medium placeholder:text-gray-600"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setForgotMode(true)}
                                        className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            <span>Authorize Login</span>
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="forgot"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {resetSent ? (
                                    <div className="text-center space-y-6 py-4">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20">
                                            <ShieldCheck size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Check the Inbox</h3>
                                            <p className="text-gray-500 italic font-medium">A secure reset link has been dispatched to rhysjonathanabalon@gmail.com</p>
                                        </div>
                                        <button
                                            onClick={() => { setForgotMode(false); setResetSent(false) }}
                                            className="text-xs font-black text-primary uppercase tracking-[0.3em] border-b-2 border-primary pb-1 hover:text-white hover:border-white transition-all"
                                        >
                                            Back to Access Point
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleForgotCode} className="space-y-6">
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Registered Admin Email"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white outline-none focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all font-medium placeholder:text-gray-600"
                                            />
                                        </div>
                                        <button
                                            disabled={isLoading}
                                            type="submit"
                                            className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                                        >
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    <span>Send Reset Link</span>
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setForgotMode(false)}
                                            className="w-full text-xs font-black text-gray-500 uppercase tracking-[0.3em] hover:text-white transition-all text-center"
                                        >
                                            Return to Login
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <p className="text-center mt-12 text-gray-600 text-[10px] uppercase font-black tracking-[0.4em]">
                    &copy; {new Date().getFullYear()} L.A. CHIBUGAN INDUSTRIAL RESERVE
                </p>
            </motion.div>
        </div>
    )
}
