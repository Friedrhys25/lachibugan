'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, Clock, MapPin, ChevronRight, ChevronLeft, Loader2, X, Instagram, MessageCircle, Video, Mail, Award, Heart, ShieldCheck } from 'lucide-react'
import { RESTAURANT_INFO, MENU_CATEGORIES } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [featuredItems, setFeaturedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSocials, setShowSocials] = useState(false)

  useEffect(() => {
    fetchFeatured()
  }, [])

  const fetchFeatured = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_featured', true)
        .limit(4)

      if (error) throw error
      setFeaturedItems(data || [])
    } catch (err) {
      console.error('Error fetching featured items:', err)
    } finally {
      setLoading(false)
    }
  }

  const AWARDS = [
    { name: "California Legislature Spotlight", image: "/lachibugan/images/awards/californiaLegislature.jpg", year: "2025" },
    { name: "Glassell Park Community Award", image: "/lachibugan/images/awards/glasellPark.jpg", year: "2025" },
    { name: "Yelp Highly Rated Award", image: "/lachibugan/images/awards/yelpAward.jpg", year: "2025" },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center pt-20 bg-black overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <span className="text-primary text-sm font-black uppercase tracking-widest">🔥 Grill & Fastfood</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black font-outfit leading-[0.9] text-white mb-6 uppercase tracking-tighter">
                LASANG <span className="text-primary italic">KINALAKIHAN</span>
              </h1>

              <p className="text-gray-400 text-xl mb-10 leading-relaxed font-medium italic">
                "{RESTAURANT_INFO.motto}"
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/menu"
                  className="bg-primary text-white px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-2xl shadow-primary/30 flex items-center justify-center space-x-3 group"
                >
                  <span>Explore Menu</span>
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setShowSocials(true)}
                  className="bg-transparent text-white border-2 border-white/20 px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  Book Table
                </button>
              </div>
            </motion.div>

            <motion.div
              style={{ y, opacity }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute w-[120%] h-[120%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
              <Image
                src="/lachibugan/images/hero-food.png"
                alt="LA Chibugan Featured Dish"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(238,49,36,0.5)]"
                priority
              />

              {/* Logo Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 hidden md:block"
              >
                <Image src="/lachibugan/images/laChibugan.jpg" alt="Logo" fill className="rounded-full border-4 border-primary shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About/Screenshot Highlight Section */}
      <section className="py-32 bg-white relative overflow-hidden" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-3 text-primary bg-primary/5 px-6 py-2 rounded-full border border-primary/10">
                <Heart size={16} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Locally Owned & Operated</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic">BEYOND JUST <br /><span className="text-primary">A RESTAURANT</span></h2>
              <div className="space-y-6 text-gray-500 text-lg md:text-xl font-medium italic leading-relaxed">
                <p>LA. Chibugan is owned and operated by healthcare workers, which gives us a deep understanding of the importance of nutrition, food safety, and compassionate service.</p>
                <p>We specialize in freshly prepared, hearty, and culturally familiar Filipino meals that are well-suited for group dining, special events, and regular meal service.</p>
              </div>
              <div className="flex flex-wrap gap-8 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg"><Award size={24} /></div>
                  <div className="text-xs font-black uppercase tracking-widest text-black">Award Winning <br />Cuisine</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg"><ShieldCheck size={24} /></div>
                  <div className="text-xs font-black uppercase tracking-widest text-black">Health Worker <br />Owned</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-[4rem] -rotate-2" />
              <div className="relative bg-black rounded-[3.5rem] p-8 md:p-12 shadow-4xl text-white border-4 border-white">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10 uppercase tracking-[0.4em] text-[10px] font-black">
                  <span>Community Partner</span>
                  <span className="text-primary italic">Est. 2024</span>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-3">Our Mission</h4>
                    <p className="italic text-gray-300">"Serving the seniors and vulnerable populations with compassionate service and nutritional excellence."</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-3">Recognitions</h4>
                    <ul className="space-y-3 font-black text-sm uppercase tracking-tighter">
                      <li>- Yelp Award Recipient</li>
                      <li>- Google Top-Rated Business</li>
                      <li>- CA Legislature Spotlight</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 flex justify-center">
                  <Image src="/lachibugan/images/laChibugan.jpg" alt="Seal" width={100} height={100} className="rounded-full grayscale brightness-200 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full blur-[80px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[12px] mb-4 block">Our Excellence</span>
            <h2 className="text-6xl font-black uppercase tracking-tighter italic">RECOGNIZED <span className="text-primary">PRESTIGE</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {AWARDS.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl mb-8">
                  <Image src={award.image} alt={award.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-10 left-10 right-10 z-10">
                    <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 block w-fit">{award.year}</span>
                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{award.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3 block">Categories</span>
              <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter leading-none">Choose Your <span className="text-primary italic">Flavor</span></h2>
            </div>
            <div className="flex space-x-3">
              <button className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                <ChevronLeft size={24} />
              </button>
              <button className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide px-2">
            {MENU_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-[3rem] bg-gray-50 border-2 border-gray-100 flex items-center justify-center text-5xl mb-6 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/20">
                  {category.icon}
                </div>
                <span className="font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Visited / Featured */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Bestsellers</span>
              <h2 className="text-6xl font-black font-outfit uppercase tracking-tighter leading-[0.9]">Most <span className="text-primary italic">Wanted</span></h2>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Filtering the finest...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {(featuredItems.length > 0 ? featuredItems : [1, 2, 3, 4]).map((item, index) => (
                <motion.div
                  key={typeof item === 'object' ? item.id : item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-[3.5rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-700 group hover:shadow-3xl hover:shadow-primary/10"
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-primary text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-2xl">
                        🔥 MUST TRY
                      </span>
                    </div>
                    <Image
                      src={typeof item === 'object' ? (item.image_url || '/images/laChibugan.jpg') : '/images/laChibugan.jpg'}
                      alt={typeof item === 'object' ? item.name : "Food Item"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  </div>
                  <div className="p-10 relative z-20 -mt-12 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{typeof item === 'object' ? item.category : 'Grill Specialty'}</span>
                      <div className="flex items-center space-x-1.5 text-accent">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-black text-white ml-1">4.9</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-primary transition-colors leading-none min-h-[2.5em]">{typeof item === 'object' ? item.name : 'Special BBQ Platter'}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Table Promo Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-black p-16 md:p-24 rounded-[4rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-4xl shadow-black/20"
          >
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">Premium Experience</span>
              <h2 className="text-7xl md:text-8xl font-black mb-8 leading-[0.8] uppercase tracking-tighter italic text-white">READY TO <span className="text-primary italic">RESERVE?</span></h2>
              <p className="text-xl text-gray-400 font-medium italic mb-10">Experience the best grill and fastfood in town. Book your table now through our social media platforms.</p>
              <button
                onClick={() => setShowSocials(true)}
                className="bg-primary text-white px-16 py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-4xl shadow-primary/30"
              >
                Book Table Now
              </button>
            </div>

            <div className="relative w-full md:w-1/2 aspect-square max-w-[400px]">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]" />
              <Image src="/lachibugan/images/laChibugan.jpg" alt="Food decor" fill className="object-contain relative z-10 rounded-full border-4 border-primary/20" />
            </div>

            <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none scale-150">
              <Image src="/lachibugan/images/laChibugan.jpg" alt="Logo Patterns" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-black rounded-[5rem] p-20 md:p-32 flex flex-col lg:flex-row items-center justify-between gap-24 border-8 border-white/5 relative overflow-hidden shadow-4xl shadow-black/50">
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none scale-150 rotate-12">
              <Image src="/images/laChibugan.jpg" alt="Patterns" fill className="object-cover" />
            </div>

            <div className="relative z-10 text-white max-w-2xl text-center lg:text-left">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[12px] mb-8 block bg-primary/10 w-fit px-6 py-2 rounded-full mx-auto lg:mx-0">READY TO EAT?</span>
              <h2 className="text-7xl md:text-9xl font-black mb-12 leading-[0.8] uppercase tracking-tighter italic">VISIT THE <span className="text-primary">GRILL</span></h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] border-2 border-primary/20 flex items-center justify-center shrink-0 shadow-2xl">
                    <MapPin size={40} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2 italic">Locate Us</p>
                    <p className="font-bold text-xl leading-snug">{RESTAURANT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-white/5 text-white rounded-[2rem] border-2 border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
                    <Clock size={40} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 italic">Open Hours</p>
                    <p className="font-bold text-xl leading-snug">{RESTAURANT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-auto flex flex-col items-center">
              <div className="mb-8 text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] italic">Call for Reservation</div>
              <Link
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="group block w-full text-center lg:w-auto bg-white text-black px-24 py-12 rounded-[3.5rem] text-5xl md:text-6xl font-black hover:bg-primary hover:text-white transition-all shadow-4xl relative overflow-hidden"
              >
                <span className="relative z-10">{RESTAURANT_INFO.phone}</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Card Modal */}
      <AnimatePresence>
        {showSocials && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setShowSocials(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden relative shadow-6xl"
            >
              <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Book a <span className="text-primary">Table</span></h3>
                  <p className="text-gray-500 font-medium italic">Choose your preferred platform</p>
                </div>
                <button onClick={() => setShowSocials(false)} className="p-4 bg-white rounded-2xl text-gray-400 hover:text-primary transition-all shadow-sm">
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 grid grid-cols-1 gap-4">
                <Link
                  href={RESTAURANT_INFO.socials.yelp} target="_blank"
                  className="flex items-center justify-between p-6 bg-red-50 hover:bg-red-100 rounded-3xl transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-100">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12.434 19.539c-.193.023-.418.067-.47.067a.46.46 0 0 1-.412-.34.464.464 0 0 1 .054-.343l2.843-5.26c.071-.127.18-.217.31-.258.156-.048.337.009.431.134.195.253 2.91 3.99 3.012 4.148.14.21.11.455-.07.608-.201.171-.433.277-.677.301-1.282.13-4.59.943-4.59-.943v-.06zM6.92 11.528A4.1 4.1 0 0 0 6.64 12c-.085.195-.03.354.12.46.126.096.342.112.51.042 1.353-.574 5.923-2.616 5.923-2.616l.115-.052a.417.417 0 0 0 .227-.333.42.42 0 0 0-.214-.407l-2.071-.97c-.125-.062-.27-.063-.396.002-.132.062 0 0-4.044 3.491v.005zm5.744-8.083c.097-.229.027-.378-.17-.468a3.295 3.295 0 0 0-.58-.168A4.135 4.135 0 0 0 11.332 2.8c-1.398.058-2.158.204-2.158 5.617a.405.405 0 0 0 .193.385c.102.063.228.065.33.003h.005l4.897-2.923a.355.355 0 0 0 .151-.274c-.001-.15-.09-.286-.226-.347-.3-.134-1.87-.816-1.87-.816zm-.972 13.518c-.139-.307-.462-.486-.803-.448-.158.016-.328.093-.418.232l-3.328 4.674c-.114.168-.112.366.005.53a.583.583 0 0 0 .528.267c1.4-.047 3.568-.133 3.568-.133l.477-.024c.245-.01.464-.176.544-.41.084-.247.01-.52-.176-.688-.175-.16-4.041-3.694-4.22-.4c-.139 0 0 0 4.223-3.697v-.003zm-1.815-5.96a.428.428 0 0 0-.62-.12l-5.698 3.504c-.151.087-.247.234-.239.4.004.14.086.27.214.333l.235.12c1.353.684 5.926 2.81 5.926 2.81l.053.024c.123.05.263.033.367-.044.113-.082.167-.223.14-.356a.455.455 0 0 0-.124-.265v-.005l-4.254-6.405 4-6z" /></svg>
                    </div>
                    <div>
                      <p className="font-black text-red-900 uppercase tracking-widest text-xs">Yelp</p>
                      <p className="text-red-700 font-bold">L.A. Chibugan</p>
                    </div>
                  </div>
                  <ArrowRight className="text-red-300 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  href={`https://m.me/${RESTAURANT_INFO.socials.messenger}`} target="_blank"
                  className="flex items-center justify-between p-6 bg-blue-50 hover:bg-blue-100 rounded-3xl transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <MessageCircle size={28} />
                    </div>
                    <div>
                      <p className="font-black text-blue-900 uppercase tracking-widest text-xs">Facebook</p>
                      <p className="text-blue-700 font-bold">Messenger</p>
                    </div>
                  </div>
                  <ArrowRight className="text-blue-300 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  href={`https://instagram.com/${RESTAURANT_INFO.socials.instagram}`} target="_blank"
                  className="flex items-center justify-between p-6 bg-pink-50 hover:bg-pink-100 rounded-3xl transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-pink-600 shadow-sm border border-pink-100">
                      <Instagram size={28} />
                    </div>
                    <div>
                      <p className="font-black text-pink-900 uppercase tracking-widest text-xs">Instagram</p>
                      <p className="text-pink-700 font-bold">@la.chibugan</p>
                    </div>
                  </div>
                  <ArrowRight className="text-pink-300 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  href={`https://tiktok.com/@${RESTAURANT_INFO.socials.tiktok}`} target="_blank"
                  className="flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-200 rounded-3xl transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm border border-gray-100">
                      <Video size={28} />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 uppercase tracking-widest text-xs">TikTok</p>
                      <p className="text-gray-700 font-bold">la.chibugan</p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-300 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  href={`mailto:${RESTAURANT_INFO.socials.email}`}
                  className="flex items-center justify-between p-6 bg-orange-50 hover:bg-orange-100 rounded-3xl transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-100">
                      <Mail size={28} />
                    </div>
                    <div>
                      <p className="font-black text-orange-900 uppercase tracking-widest text-xs">Email</p>
                      <p className="text-orange-700 font-bold">Drop a message</p>
                    </div>
                  </div>
                  <ArrowRight className="text-orange-300 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              <div className="p-10 bg-black text-center">
                <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">LASANG KINALAKIHAN</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
