import HeroBanner from '../components/home/HeroBanner'
import WelcomeMessage from '../components/home/WelcomeMessage'
import StatsDashboard from '../components/home/StatsDashboard'
import NewsEvents from '../components/home/NewsEvents'
import QuickLinks from '../components/home/QuickLinks'
import AlumniSpotlight from '../components/home/AlumniSpotlight'
import { Link } from 'react-router-dom'
import { ArrowRight, Facebook, Linkedin, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <WelcomeMessage />
      <StatsDashboard />
      <NewsEvents />
      <AlumniSpotlight />
      <QuickLinks />
      {/* Social Media Strip */}
      {/* <section className="py-12 border-t border-forest-100 bg-forest-50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #155515 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <div className="section-label mb-1">Stay Connected</div>
              <h3 className="font-display text-2xl text-forest-900">Follow MISTAS</h3>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
                { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700' },
                { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:bg-red-600' },
              ].map(({ icon: Icon, label, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className={`flex items-center gap-2.5 bg-white border border-forest-200 px-5 py-2.5 text-sm font-sans font-medium text-forest-700 ${color} hover:text-white hover:border-transparent transition-all duration-300`}
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* CTA Banner */}
      <section className="py-20 bg-forest-900 relative overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Animated glow orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-forest-700 rounded-full blur-3xl opacity-20 animate-float-ambient pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-forest-600 rounded-full blur-3xl opacity-15 animate-float-ambient-alt pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 bg-forest-700 rounded-full blur-3xl opacity-10 animate-float-ambient-slow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="section-label text-forest-400 mb-4"
          >
            Join the Network
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            className="font-display text-4xl md:text-5xl text-white mb-6"
          >
            Are You a MIST Graduate?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="font-body text-forest-300 text-lg max-w-xl mx-auto mb-10"
          >
            Register today to access the full alumni network, job board, mentorship programs, and exclusive events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Register Now <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline border-forest-500 text-forest-300 hover:bg-forest-700 hover:text-white hover:border-forest-700 flex items-center gap-2">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
