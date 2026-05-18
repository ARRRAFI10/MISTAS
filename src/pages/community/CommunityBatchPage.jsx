import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Users, MessageSquare, ChevronRight, ArrowRight, BookOpen, Search, X, ChevronDown } from 'lucide-react'
import { batchGroups } from '../../data/communityData'

const statusOptions = ['All', 'Active', 'Forming']

const MotionLink   = motion(Link)
const CARD_SHADOW  = '5px 7px 0px 0px #d1fae5, 0 2px 8px rgba(0,0,0,0.04)'
const CARD_HOVER   = '9px 13px 0px 0px #6ee7b7, 0 10px 24px rgba(0,0,0,0.08)'
const DARK_SHADOW  = '5px 7px 0px 0px #052e16'
const DARK_HOVER   = '9px 13px 0px 0px #021a0c'
const springHover  = { type: 'spring', stiffness: 350, damping: 22 }

export default function CommunityBatchPage() {
  const [query, setQuery]   = useState('')
  const [status, setStatus] = useState('All')
  const [ddOpen, setDdOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return batchGroups.filter(b => {
      const matchQ = !q || String(b.year).includes(q) || b.lead.toLowerCase().includes(q)
      const matchS = status === 'All' || b.status === status
      return matchQ && matchS
    })
  }, [query, status])

  return (
    <>
      {/* Hero */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800">
            <Link to="/community" className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-500 hover:text-forest-300 transition-colors">Community</Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Batch Groups</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Batch</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Groups</span>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="lg:col-span-5 lg:pb-4">
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  Reconnect with your graduating class. Search by year or representative name.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{batchGroups.length} Batches</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{batchGroups.reduce((s, b) => s + b.members, 0).toLocaleString()} Members</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-800">
            {[
              { n: batchGroups.length, l: 'All Batches' },
              { n: batchGroups.filter(b => b.status === 'Active').length, l: 'Active' },
              { n: batchGroups.reduce((s, b) => s + b.members, 0).toLocaleString(), l: 'Members' },
              { n: batchGroups.reduce((s, b) => s + b.posts, 0).toLocaleString(), l: 'Posts' },
            ].map(({ n, l }) => (
              <div key={l} className="py-6 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border-b border-forest-100 shadow-sm sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-0 items-stretch">

            {/* Status dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setDdOpen(p => !p)}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors min-w-[130px]"
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'Active' ? 'bg-emerald-400' : status === 'Forming' ? 'bg-amber-400' : 'bg-forest-400'}`} />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest-700 flex-1">{status}</span>
                <ChevronDown size={12} className={`text-forest-400 transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-44 bg-white border border-forest-200 shadow-xl z-50 py-1">
                    <div className="px-4 py-2 border-b border-forest-100">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Filter by status</span>
                    </div>
                    {statusOptions.map(opt => (
                      <button key={opt} onClick={() => { setStatus(opt); setDdOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${status === opt ? 'bg-forest-50' : ''}`}>
                        <span className={`w-2 h-2 rounded-full ${opt === 'Active' ? 'bg-emerald-400' : opt === 'Forming' ? 'bg-amber-400' : 'bg-forest-300'}`} />
                        <span className={`font-sans text-sm ${status === opt ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>{opt}</span>
                        {status === opt && <span className="ml-auto font-mono text-[9px] text-forest-400">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search input */}
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by batch year (e.g. 2020) or representative name…"
                className="w-full h-full border border-forest-200 pl-11 pr-4 py-3.5 font-sans text-sm text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>

            {/* Clear */}
            <AnimatePresence>
              {(query || status !== 'All') && (
                <motion.button initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                  onClick={() => { setQuery(''); setStatus('All') }}
                  className="flex items-center justify-center px-4 border border-l-0 border-forest-200 text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors gap-1.5">
                  <X size={13} /> <span className="font-mono text-[9px] tracking-widest uppercase hidden sm:block">Clear</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Result count */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">
              {filtered.length} of {batchGroups.length} batches
            </span>
            {/* Quick year pills */}
            <div className="flex gap-1.5 flex-wrap">
              {batchGroups.slice(0, 5).map(b => (
                <button key={b.year} onClick={() => setQuery(String(b.year))}
                  className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 border transition-all ${query === String(b.year) ? 'bg-forest-800 text-white border-forest-800' : 'border-forest-200 text-forest-500 hover:border-forest-400 hover:text-forest-700'}`}>
                  {b.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Batch Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Search size={28} className="text-forest-200 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-forest-900 mb-2">No batches found</h3>
              <p className="font-sans text-sm text-forest-400 mb-6">Try a different year or clear the filter.</p>
              <button onClick={() => { setQuery(''); setStatus('All') }} className="btn-outline">Clear filters</button>
            </div>
          ) : (
            <>
              {/* Featured (first filtered result) */}
              <AnimatePresence mode="wait">
                <motion.div key={filtered[0]?.year} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8">
                  <MotionLink to={`/community/batch/${filtered[0].year}`}
                    whileHover={{ y: -5, x: -2, boxShadow: DARK_HOVER, transition: springHover }}
                    style={{ boxShadow: DARK_SHADOW }}
                    className="block bg-forest-900 p-10 relative overflow-hidden group hover:bg-forest-800 transition-colors duration-300 rounded-2xl">
                    <div className="absolute right-6 bottom-0 font-display font-bold text-white/[0.04] leading-none select-none text-[220px]">{filtered[0].year}</div>
                    <div className="relative grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="font-mono text-[9px] tracking-widest uppercase text-white bg-forest-700 border border-forest-600 px-3 py-1.5">
                            {query ? 'Top Result' : 'Latest Batch'}
                          </span>
                          <span className={`flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase ${filtered[0].status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${filtered[0].status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {filtered[0].status}
                          </span>
                        </div>
                        <h2 className="font-display text-6xl font-bold text-white mb-2">
                          Batch <span className="text-forest-400">'{String(filtered[0].year).slice(2)}</span>
                        </h2>
                        <p className="font-sans text-forest-400 mt-2">{filtered[0].departments} departments · Rep: {filtered[0].lead}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { icon: <Users size={16} />, v: filtered[0].members.toLocaleString(), l: 'Members' },
                          { icon: <BookOpen size={16} />, v: filtered[0].departments, l: 'Depts.' },
                          { icon: <MessageSquare size={16} />, v: filtered[0].posts, l: 'Posts' },
                        ].map(({ icon, v, l }) => (
                          <div key={l} className="text-center border border-forest-700 py-4 px-2">
                            <div className="text-forest-400 flex justify-center mb-2">{icon}</div>
                            <div className="font-display text-xl font-bold text-white">{v}</div>
                            <div className="font-mono text-[8px] text-forest-500 tracking-widest uppercase mt-0.5">{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative mt-6 flex items-center gap-2 text-forest-400 group-hover:text-forest-300 text-sm font-sans font-bold transition-colors">
                      Open Batch Group <ChevronRight size={14} />
                    </div>
                  </MotionLink>
                </motion.div>
              </AnimatePresence>

              {/* Rest */}
              {filtered.length > 1 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.slice(1).map((b, i) => (
                    <MotionLink key={b.year} to={`/community/batch/${b.year}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                      style={{ boxShadow: CARD_SHADOW }}
                      className="block border border-forest-100 p-7 bg-white group relative overflow-hidden h-full rounded-2xl cursor-pointer">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-forest-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${b.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{b.status}</span>
                          </div>
                          <h3 className="font-display text-5xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors">{b.year}</h3>
                        </div>
                        <GraduationCap size={20} className="text-forest-200 group-hover:text-forest-400 transition-colors mt-1" />
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[{ v: b.members.toLocaleString(), l: 'Members' }, { v: b.departments, l: 'Depts' }, { v: b.posts, l: 'Posts' }].map(({ v, l }) => (
                          <div key={l} className="text-center border border-forest-100 py-3 rounded-xl">
                            <div className="font-display text-lg font-bold text-forest-800">{v}</div>
                            <div className="font-mono text-[8px] text-forest-400 tracking-widest uppercase">{l}</div>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-xs text-forest-500 mb-4"><span className="text-forest-400">Rep — </span>{b.lead}</p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-forest-600 group-hover:gap-3 transition-all">
                        Open Group <ChevronRight size={11} />
                      </div>
                    </MotionLink>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-10 border border-dashed border-forest-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-forest-50/40">
            <div>
              <h4 className="font-sans font-bold text-forest-900 mb-1">Don't see your batch?</h4>
              <p className="font-sans text-sm text-forest-500">Pre-2010 alumni — we'd love to connect you with your cohort.</p>
            </div>
            <Link to="/contact" className="btn-primary flex items-center gap-2 flex-shrink-0">Get In Touch <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
