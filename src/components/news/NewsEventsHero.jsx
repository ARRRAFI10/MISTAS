import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, Camera, Megaphone } from 'lucide-react'

const tabs = [
  { label: 'News', path: '/news' },
  { label: 'Events', path: '/events' },
  { label: 'Archive', path: '/archive' },
]

export default function NewsEventsHero() {
  const { pathname } = useLocation()

  return (
    <div className="bg-forest-950 pt-24 pb-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 1.5 }}
        className="absolute -right-32 -top-32 w-[500px] h-[500px] border-[60px] border-forest-400 rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 font-mono text-xs text-forest-500 mb-8 uppercase tracking-[0.4em]"
        >
          <Link to="/" className="hover:text-forest-300 transition-colors">Home</Link>
          <div className="w-1 h-1 bg-forest-600 rounded-full" />
          <span className="text-forest-300">News & Events</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-display text-6xl md:text-7xl text-white mb-5 leading-tight font-bold"
            >
              Stay <em className="italic text-forest-400">Informed.</em>
              <br /> Stay Connected.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-forest-300 text-lg leading-relaxed max-w-xl"
            >
              The latest from the MISTAS community — achievements, events,
              announcements, and alumni milestones from across the globe.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex flex-col gap-3"
          >
            {[
              { icon: Megaphone, label: '24 News Articles', sub: 'This month' },
              { icon: Calendar, label: '6 Upcoming Events', sub: 'Register now' },
              { icon: Camera, label: '400+ Photos', sub: 'In the archive' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 bg-forest-900/50 border border-forest-800 px-5 py-3">
                <Icon size={16} className="text-forest-400" />
                <span className="font-sans text-sm font-medium text-white">{label}</span>
                <span className="font-mono text-[10px] text-forest-500 ml-auto">{sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-forest-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path
              return (
                <Link
                  key={tab.label}
                  to={tab.path}
                  className={`py-4 font-mono text-xs tracking-[0.3em] uppercase border-b-2 transition-all ${
                    isActive
                      ? 'text-white border-forest-400'
                      : 'text-white/50 border-transparent hover:text-white/80'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
