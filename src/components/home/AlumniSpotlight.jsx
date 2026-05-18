import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section, SectionHeader } from '../ui'

const spotlights = [
  {
    name: 'Brig. Gen. (Retd.) Kamal Uddin',
    batch: 'CE — Batch 2001',
    role: 'Director, Bangladesh Army Corps of Engineers',
    quote: 'MIST taught me that engineering is not just about structures — it is about building a nation.',
    initials: 'KU',
    color: 'bg-forest-800',
  },
  {
    name: 'Dr. Sabrina Rahman',
    batch: 'EEE — Batch 2004',
    role: 'Senior Researcher, MIT Media Lab',
    quote: 'The discipline and technical depth I gained at MIST has been the foundation of everything I have achieved abroad.',
    initials: 'SR',
    color: 'bg-forest-600',
  },
  {
    name: 'Eng. Tariq Hassan',
    batch: 'ME — Batch 1999',
    role: 'VP Engineering, Aramco, Saudi Arabia',
    quote: 'From Mirpur Cantonment to the heart of the global energy sector — MIST opened every door.',
    initials: 'TH',
    color: 'bg-forest-700',
  },
]

export default function AlumniSpotlight() {
  return (
    <Section className="py-20 bg-white overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-forest-50 rounded-full blur-3xl opacity-60 animate-float-ambient pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-forest-50 rounded-full blur-3xl opacity-40 animate-float-ambient-alt pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            label="Alumni Spotlight"
            title="Voices of MISTAS"
            subtitle="Stories from our distinguished graduates who are shaping the world."
          />
          <Link to="/directory#spotlight" className="hidden md:flex items-center gap-2 text-sm font-sans font-medium text-forest-700 hover:text-forest-900 animated-underline mb-12">
            More Stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {spotlights.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.14, ease: 'easeOut' }}
              className="relative border border-forest-100 rounded-2xl group hover:border-forest-300 hover:shadow-lg transition-all duration-400 cursor-pointer"
            >
              {/* Top accent bar */}
              <div className="h-1 w-0 group-hover:w-full bg-forest-600 transition-all duration-500 absolute top-0 left-0" />

              <div className="p-7">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.14 }}
                >
                  <Quote size={28} className="text-forest-200 mb-4 group-hover:text-forest-300 transition-colors" />
                </motion.div>

                <p className="font-body italic text-forest-700 text-base leading-relaxed mb-7">
                  "{person.quote}"
                </p>

                <div className="flex items-center gap-4 pt-5 border-t border-forest-100">
                  <div className={`w-11 h-11 ${person.color} flex items-center justify-center rounded-xl shrink-0`}>
                    <span className="font-display text-sm font-bold text-white">{person.initials}</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm text-forest-900">{person.name}</div>
                    <div className="font-mono text-xs text-forest-500 tracking-wide">{person.batch}</div>
                    <div className="font-sans text-xs text-forest-600 mt-0.5">{person.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
