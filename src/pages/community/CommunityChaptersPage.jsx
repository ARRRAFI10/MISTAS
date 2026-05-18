import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ArrowRight, ChevronRight, Mail } from 'lucide-react'
import { chapters } from '../../data/communityData'

export default function CommunityChaptersPage() {
  const [activeRegion, setActiveRegion] = useState(0)
  const region = chapters[activeRegion]

  return (
    <>
      {/* Hero */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800"
          >
            <Link to="/community" className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-500 hover:text-forest-300 transition-colors">
              Community
            </Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Regional Chapters</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Regional</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Chapters</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-5 lg:pb-4"
            >
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  From Dhaka to Dubai, London to Los Angeles — MIST alumni chapters span 6 regions across the globe. Find your local community.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {chapters.length} Regions
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {chapters.reduce((s, r) => s + r.chapters.length, 0)} Chapters
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-6 divide-x divide-forest-800">
            {[
              { n: '85+', l: 'Countries' },
              { n: chapters.length, l: 'Regions' },
              { n: chapters.reduce((s, r) => s + r.chapters.length, 0), l: 'Chapters' },
              { n: chapters.reduce((s, r) => s + r.total, 0).toLocaleString(), l: 'Members' },
              { n: chapters.filter(r => r.chapters.every(c => c.active)).length, l: 'Fully Active' },
              { n: chapters.reduce((s, r) => s + r.chapters.filter(c => !c.active).length, 0), l: 'Forming' },
            ].map(({ n, l }) => (
              <div key={l} className="py-6 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Browser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">Browse by Region</span>
            <div className="flex-1 border-t border-forest-100" />
            <Link to="/contact" className="text-xs font-bold text-forest-600 flex items-center gap-1 hover:gap-2 transition-all">
              Start a chapter <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Region selector */}
            <div className="lg:col-span-3 space-y-1">
              {chapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActiveRegion(i)}
                  className={`w-full text-left px-4 py-4 transition-all duration-200 border ${
                    activeRegion === i
                      ? `${ch.color} border-transparent`
                      : 'border-forest-100 bg-white hover:bg-forest-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ch.flag}</span>
                      <span className={`font-sans font-semibold text-sm ${activeRegion === i ? 'text-white' : 'text-forest-900'}`}>
                        {ch.region}
                      </span>
                    </div>
                    <span className={`font-mono text-xs tabular-nums ${activeRegion === i ? 'text-white/60' : 'text-forest-400'}`}>
                      {ch.total.toLocaleString()}
                    </span>
                  </div>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-4 border border-dashed border-forest-300 p-5 bg-forest-50/50"
              >
                <Globe size={18} className="text-forest-400 mb-2" />
                <h4 className="font-sans font-bold text-sm text-forest-900 mb-1">Don't See Your City?</h4>
                <p className="font-sans text-xs text-forest-500 mb-3 leading-relaxed">
                  Start a chapter with full MISTAS support and official recognition.
                </p>
                <Link to="/contact" className="text-xs font-bold text-forest-700 flex items-center gap-1 hover:gap-2 transition-all">
                  Apply Now <ArrowRight size={11} />
                </Link>
              </motion.div>
            </div>

            {/* Region detail */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={`${region.color} p-8 mb-6 relative overflow-hidden`}>
                    <div className="absolute right-6 bottom-0 font-display font-bold text-white/10 leading-none select-none text-[110px]">
                      {region.total.toLocaleString()}
                    </div>
                    <div className="relative">
                      <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-3 block">
                        {region.chapters.length} Chapters · {region.total.toLocaleString()} Alumni
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{region.flag}</span>
                        <h2 className="font-display text-4xl font-bold text-white">{region.region}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {region.chapters.map((c, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.1 }}
                        className={`border ${region.borderColor} p-6 bg-white hover:shadow-md transition-all duration-300 group relative overflow-hidden`}
                      >
                        <div className={`absolute top-0 left-0 right-0 h-[3px] ${region.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`w-2 h-2 rounded-full ${c.active ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                          <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">
                            {c.active ? 'Active' : 'Forming'}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl font-bold text-forest-900 leading-tight">{c.city}</h3>
                        <p className="font-sans text-xs text-forest-400 mt-0.5 mb-5">{c.country}</p>
                        <div className="border-t border-forest-50 pt-4 mb-4">
                          <div className="font-display text-2xl font-bold text-forest-700">{c.members.toLocaleString()}</div>
                          <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Alumni Members</div>
                        </div>
                        <p className="font-sans text-xs text-forest-500 mb-5">
                          <span className="text-forest-400">Lead —</span> {c.lead}
                        </p>
                        <div className="flex gap-4 pt-3 border-t border-forest-50">
                          <button className="text-xs font-sans font-bold text-forest-700 flex items-center gap-1 hover:gap-2 transition-all">
                            Join <ChevronRight size={11} />
                          </button>
                          <button className="text-xs font-sans text-forest-400 flex items-center gap-1.5 hover:text-forest-700 transition-colors">
                            <Mail size={10} /> Contact Lead
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
