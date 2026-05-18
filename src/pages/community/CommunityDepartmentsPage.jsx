import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Rss, Users, ArrowRight, Search, X } from 'lucide-react'
import { deptGroups } from '../../data/communityData'

const typeOptions = ['All Types', 'Technical Dept.', 'Cross-Department']

const MotionLink  = motion(Link)
const CARD_SHADOW = '5px 7px 0px 0px #d1fae5, 0 2px 8px rgba(0,0,0,0.04)'
const CARD_HOVER  = '9px 13px 0px 0px #6ee7b7, 0 10px 24px rgba(0,0,0,0.08)'
const DARK_SHADOW = '5px 7px 0px 0px #052e16'
const DARK_HOVER  = '9px 13px 0px 0px #021a0c'
const springHover = { type: 'spring', stiffness: 350, damping: 22 }

export default function CommunityDepartmentsPage() {
  const [query, setQuery]   = useState('')
  const [type, setType]     = useState('All Types')
  const [ddOpen, setDdOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return deptGroups.filter(g => {
      const matchQ = !q || g.name.toLowerCase().includes(q) || g.shortCode.toLowerCase().includes(q) || g.dept.toLowerCase().includes(q)
      const matchT = type === 'All Types' || (type === 'Cross-Department' ? g.dept === 'Cross-Department' : g.dept !== 'Cross-Department')
      return matchQ && matchT
    })
  }, [query, type])

  const featured = filtered[0]
  const secondary = filtered.slice(1, 3)
  const rest = filtered.slice(3)

  return (
    <>
      {/* Hero */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800">
            <Link to="/community" className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-500 hover:text-forest-300 transition-colors">Community</Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Department Groups</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Department</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Groups</span>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="lg:col-span-5 lg:pb-4">
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  Search by department name or code — CSE, EEE, CE, ME and more.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{deptGroups.length} Groups</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{deptGroups.reduce((s, g) => s + g.members, 0).toLocaleString()} Members</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-800">
            {[
              { n: deptGroups.length, l: 'Groups' },
              { n: deptGroups.reduce((s, g) => s + g.members, 0).toLocaleString(), l: 'Members' },
              { n: deptGroups.reduce((s, g) => s + g.posts, 0).toLocaleString(), l: 'Posts' },
              { n: '16+', l: 'Departments' },
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

            {/* Type dropdown */}
            <div className="relative flex-shrink-0">
              <button onClick={() => setDdOpen(p => !p)}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors min-w-[160px]">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest-700 flex-1 truncate">{type}</span>
                <ChevronDown size={12} className={`text-forest-400 transition-transform flex-shrink-0 ${ddOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white border border-forest-200 shadow-xl z-50 py-1">
                    <div className="px-4 py-2 border-b border-forest-100">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Filter by type</span>
                    </div>
                    {typeOptions.map(opt => (
                      <button key={opt} onClick={() => { setType(opt); setDdOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${type === opt ? 'bg-forest-50' : ''}`}>
                        <span className={`w-2 h-2 rounded-full ${opt === 'Technical Dept.' ? 'bg-blue-500' : opt === 'Cross-Department' ? 'bg-pink-500' : 'bg-forest-400'}`} />
                        <span className={`font-sans text-sm ${type === opt ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>{opt}</span>
                        {type === opt && <span className="ml-auto font-mono text-[9px] text-forest-400">✓</span>}
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
                placeholder="Search by department name or code (e.g. CSE, Civil, EEE)…"
                className="w-full h-full border border-forest-200 pl-11 pr-4 py-3.5 font-sans text-sm text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>

            {/* Clear */}
            <AnimatePresence>
              {(query || type !== 'All Types') && (
                <motion.button initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                  onClick={() => { setQuery(''); setType('All Types') }}
                  className="flex items-center justify-center px-4 border border-l-0 border-forest-200 text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors gap-1.5">
                  <X size={13} /> <span className="font-mono text-[9px] tracking-widest uppercase hidden sm:block">Clear</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Quick code pills + count */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">
              {filtered.length} of {deptGroups.length} groups
            </span>
            {deptGroups.map(g => (
              <button key={g.shortCode} onClick={() => setQuery(g.shortCode)}
                className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 border transition-all ${query === g.shortCode ? 'bg-blue-600 text-white border-blue-600' : 'border-forest-200 text-forest-500 hover:border-forest-400 hover:text-forest-700'}`}>
                {g.shortCode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Search size={28} className="text-forest-200 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-forest-900 mb-2">No departments found</h3>
              <p className="font-sans text-sm text-forest-400 mb-6">Try a department code like CSE, EEE, or CE.</p>
              <button onClick={() => { setQuery(''); setType('All Types') }} className="btn-outline">Clear filters</button>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <MotionLink to={`/community/departments/${featured.id}`}
                    whileHover={{ y: -5, x: -2, boxShadow: DARK_HOVER, transition: springHover }}
                    style={{ boxShadow: DARK_SHADOW }}
                    className="block bg-forest-900 relative overflow-hidden group hover:bg-forest-800 transition-colors duration-300 rounded-2xl">
                    <div className="absolute -bottom-8 -right-8 text-[180px] leading-none select-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">{featured.icon}</div>
                    <div className="relative grid lg:grid-cols-12 gap-0">
                      <div className={`${featured.color} lg:col-span-1 min-h-[8px] lg:min-h-0`} />
                      <div className="lg:col-span-11 p-10">
                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                          <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400 bg-forest-800 border border-forest-700 px-3 py-1.5">
                            {query ? 'Top Result' : 'Featured'}
                          </span>
                          <span className="font-sans text-xs font-bold text-white bg-forest-700 border border-forest-600 px-3 py-1.5">{featured.shortCode}</span>
                          <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500">{featured.members.toLocaleString()} members</span>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div>
                            <div className="text-5xl mb-4">{featured.icon}</div>
                            <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-2">{featured.dept}</div>
                            <h2 className="font-display text-4xl font-bold text-white mb-3 group-hover:text-forest-300 transition-colors">{featured.name}</h2>
                            <p className="font-body text-forest-300 leading-relaxed">{featured.desc}</p>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div className="flex flex-wrap gap-2 mb-6">
                              {featured.topics.map(t => (
                                <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-300 border border-forest-700 px-2 py-1">{t}</span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-sans text-sm text-forest-500 flex items-center gap-2"><Rss size={12} /> {featured.posts.toLocaleString()} posts</span>
                              <span className="flex items-center gap-2 text-forest-300 font-sans text-sm font-bold group-hover:gap-3 transition-all">Open Group <ChevronRight size={14} /></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                </motion.div>
              )}

              {/* Secondary */}
              {secondary.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {secondary.map((g, i) => (
                    <MotionLink key={g.id} to={`/community/departments/${g.id}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                      style={{ boxShadow: CARD_SHADOW }}
                      className="block border border-forest-100 bg-white group overflow-hidden h-full rounded-2xl cursor-pointer">
                      <div className={`${g.color} h-1.5 w-full rounded-t-2xl`} />
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">{g.icon}</span>
                            <div>
                              <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{g.dept}</span>
                              <div className="mt-1"><span className="font-sans text-xs font-bold text-white bg-forest-800 px-2 py-0.5 rounded">{g.shortCode}</span></div>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-forest-400 tabular-nums">{g.members.toLocaleString()} mbrs</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">{g.name}</h3>
                        <p className="font-sans text-sm text-forest-500 leading-relaxed mb-5">{g.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {g.topics.slice(0, 3).map(t => (
                            <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-500 border border-forest-100 px-2 py-1 rounded">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-forest-100">
                          <span className="font-sans text-xs text-forest-400 flex items-center gap-1.5"><Rss size={10} /> {g.posts.toLocaleString()} posts</span>
                          <span className="flex items-center gap-1.5 text-xs font-bold text-forest-700 group-hover:gap-3 transition-all">Open Group <ChevronRight size={11} /></span>
                        </div>
                      </div>
                    </MotionLink>
                  ))}
                </div>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-5">
                  {rest.map((g, i) => (
                    <MotionLink key={g.id} to={`/community/departments/${g.id}`}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.5 }}
                      whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                      style={{ boxShadow: CARD_SHADOW }}
                      className="block border border-forest-100 bg-white group overflow-hidden h-full rounded-2xl cursor-pointer">
                      <div className={`${g.color} h-1 w-full rounded-t-2xl`} />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{g.icon}</span>
                          <span className="font-sans text-xs font-bold text-white bg-forest-800 px-2 py-0.5 rounded">{g.shortCode}</span>
                        </div>
                        <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">{g.dept}</div>
                        <h3 className="font-display text-xl font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">{g.name}</h3>
                        <p className="font-sans text-sm text-forest-500 leading-relaxed mb-4">{g.desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-forest-100">
                          <span className="font-sans text-xs text-forest-400">{g.members.toLocaleString()} members</span>
                          <span className="flex items-center gap-1 text-xs font-bold text-forest-600 group-hover:gap-2 transition-all">Open <ChevronRight size={11} /></span>
                        </div>
                      </div>
                    </MotionLink>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 border border-dashed border-forest-300 p-8 text-center bg-forest-50/40">
            <h4 className="font-display text-xl text-forest-900 mb-2">Don't see your department?</h4>
            <p className="font-sans text-sm text-forest-500 mb-4">Request a new department group — we support all 16 MIST departments.</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Request a Group <ArrowRight size={14} /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
