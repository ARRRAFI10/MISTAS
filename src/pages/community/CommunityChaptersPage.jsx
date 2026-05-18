import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ArrowRight, ChevronRight, ChevronDown, Mail, Search, X } from 'lucide-react'
import { chapters } from '../../data/communityData'

// flat list of all individual city chapters
const allCities = chapters.flatMap(r => r.chapters.map(c => ({ ...c, region: r.region, flag: r.flag, color: r.color, borderColor: r.borderColor, regionId: r.id })))
const regionOptions = ['All Regions', ...chapters.map(r => r.region)]
const statusOptions = ['All', 'Active', 'Forming']

const CARD_SHADOW = '5px 7px 0px 0px #d1fae5, 0 2px 8px rgba(0,0,0,0.04)'
const CARD_HOVER  = '9px 13px 0px 0px #6ee7b7, 0 10px 24px rgba(0,0,0,0.08)'
const springHover = { type: 'spring', stiffness: 350, damping: 22 }

export default function CommunityChaptersPage() {
  const [query, setQuery]     = useState('')
  const [region, setRegion]   = useState('All Regions')
  const [status, setStatus]   = useState('All')
  const [regionDd, setRegionDd] = useState(false)
  const [statusDd, setStatusDd] = useState(false)
  const [activeRegion, setActiveRegion] = useState(0)
  const activeR = chapters[activeRegion]

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allCities.filter(c => {
      const matchQ = !q || c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.lead.toLowerCase().includes(q)
      const matchR = region === 'All Regions' || c.region === region
      const matchS = status === 'All' || (status === 'Active' ? c.active : !c.active)
      return matchQ && matchR && matchS
    })
  }, [query, region, status])

  const isFiltering = query || region !== 'All Regions' || status !== 'All'

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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="lg:col-span-5 lg:pb-4">
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  Search by city, country or region. Filter by active status to find established chapters near you.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{chapters.length} Regions</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">{allCities.length} Chapters</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-6 divide-x divide-forest-800">
            {[
              { n: '85+', l: 'Countries' }, { n: chapters.length, l: 'Regions' },
              { n: allCities.length, l: 'Chapters' },
              { n: chapters.reduce((s,r) => s + r.total, 0).toLocaleString(), l: 'Members' },
              { n: allCities.filter(c => c.active).length, l: 'Active' },
              { n: allCities.filter(c => !c.active).length, l: 'Forming' },
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
          <div className="flex gap-0 items-stretch flex-wrap sm:flex-nowrap">

            {/* Region dropdown */}
            <div className="relative flex-shrink-0">
              <button onClick={() => { setRegionDd(p => !p); setStatusDd(false) }}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors min-w-[150px]">
                <Globe size={12} className="text-forest-400 flex-shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-forest-700 flex-1 truncate">{region === 'All Regions' ? 'All Regions' : region.split(' ')[0]}</span>
                <ChevronDown size={12} className={`text-forest-400 transition-transform flex-shrink-0 ${regionDd ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {regionDd && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white border border-forest-200 shadow-xl z-50 py-1">
                    <div className="px-4 py-2 border-b border-forest-100"><span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Filter by region</span></div>
                    {regionOptions.map(opt => (
                      <button key={opt} onClick={() => { setRegion(opt); setRegionDd(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${region === opt ? 'bg-forest-50' : ''}`}>
                        <span className="text-base">{chapters.find(r => r.region === opt)?.flag || '🌍'}</span>
                        <span className={`font-sans text-sm ${region === opt ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>{opt}</span>
                        {region === opt && <span className="ml-auto font-mono text-[9px] text-forest-400">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status dropdown */}
            <div className="relative flex-shrink-0">
              <button onClick={() => { setStatusDd(p => !p); setRegionDd(false) }}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors min-w-[120px]">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'Active' ? 'bg-emerald-400' : status === 'Forming' ? 'bg-amber-400' : 'bg-forest-400'}`} />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest-700 flex-1">{status}</span>
                <ChevronDown size={12} className={`text-forest-400 transition-transform flex-shrink-0 ${statusDd ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {statusDd && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-44 bg-white border border-forest-200 shadow-xl z-50 py-1">
                    <div className="px-4 py-2 border-b border-forest-100"><span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Chapter status</span></div>
                    {statusOptions.map(opt => (
                      <button key={opt} onClick={() => { setStatus(opt); setStatusDd(false) }}
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
            <div className="flex-1 relative min-w-0">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by city, country, or chapter lead…"
                className="w-full h-full border border-forest-200 pl-11 pr-4 py-3.5 font-sans text-sm text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>

            {/* Clear */}
            <AnimatePresence>
              {isFiltering && (
                <motion.button initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                  onClick={() => { setQuery(''); setRegion('All Regions'); setStatus('All') }}
                  className="flex items-center justify-center px-4 border border-l-0 border-forest-200 text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors gap-1.5">
                  <X size={13} /> <span className="font-mono text-[9px] tracking-widest uppercase hidden sm:block">Clear</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{filteredCities.length} of {allCities.length} chapters</span>
            {['Dhaka', 'Dubai', 'London', 'New York', 'Singapore', 'Sydney'].map(city => (
              <button key={city} onClick={() => setQuery(city)}
                className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 border transition-all ${query === city ? 'bg-amber-500 text-white border-amber-500' : 'border-forest-200 text-forest-500 hover:border-forest-400 hover:text-forest-700'}`}>
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {isFiltering ? (
            /* ── Filtered flat results ── */
            filteredCities.length === 0 ? (
              <div className="text-center py-24">
                <Search size={28} className="text-forest-200 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-forest-900 mb-2">No chapters found</h3>
                <p className="font-sans text-sm text-forest-400 mb-6">Try a city name, country, or clear your filters.</p>
                <button onClick={() => { setQuery(''); setRegion('All Regions'); setStatus('All') }} className="btn-outline">Clear filters</button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">{filteredCities.length} chapters found</span>
                  <div className="flex-1 border-t border-forest-100" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCities.map((c, i) => (
                    <motion.div key={`${c.city}-${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                      style={{ boxShadow: CARD_SHADOW }}
                      className="border border-forest-100 p-6 bg-white group relative overflow-hidden rounded-2xl cursor-default">
                      <div className={`absolute top-0 left-0 right-0 h-[3px] ${c.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{c.flag}</span>
                          <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{c.region}</span>
                        </div>
                        <span className={`flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase ${c.active ? 'text-emerald-600' : 'text-amber-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          {c.active ? 'Active' : 'Forming'}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold text-forest-900 leading-tight">{c.city}</h3>
                      <p className="font-sans text-xs text-forest-400 mt-0.5 mb-4">{c.country}</p>
                      <div className="border-t border-forest-50 pt-4 mb-4">
                        <div className="font-display text-2xl font-bold text-forest-700">{c.members.toLocaleString()}</div>
                        <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Alumni Members</div>
                      </div>
                      <p className="font-sans text-xs text-forest-500 mb-4"><span className="text-forest-400">Lead — </span>{c.lead}</p>
                      <div className="flex gap-4 pt-3 border-t border-forest-50">
                        <button className="text-xs font-sans font-bold text-forest-700 flex items-center gap-1 hover:gap-2 transition-all">Join <ChevronRight size={11} /></button>
                        <button className="text-xs font-sans text-forest-400 flex items-center gap-1.5 hover:text-forest-700 transition-colors"><Mail size={10} /> Contact Lead</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* ── Default interactive region selector ── */
            <div>
              <div className="flex items-center gap-6 mb-14">
                <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">Browse by Region</span>
                <div className="flex-1 border-t border-forest-100" />
                <Link to="/contact" className="text-xs font-bold text-forest-600 flex items-center gap-1 hover:gap-2 transition-all">Start a chapter <ArrowRight size={11} /></Link>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3 space-y-1">
                  {chapters.map((ch, i) => (
                    <motion.button key={ch.id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      onClick={() => setActiveRegion(i)}
                      className={`w-full text-left px-4 py-4 transition-all duration-200 border ${activeRegion === i ? `${ch.color} border-transparent` : 'border-forest-100 bg-white hover:bg-forest-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{ch.flag}</span>
                          <span className={`font-sans font-semibold text-sm ${activeRegion === i ? 'text-white' : 'text-forest-900'}`}>{ch.region}</span>
                        </div>
                        <span className={`font-mono text-xs tabular-nums ${activeRegion === i ? 'text-white/60' : 'text-forest-400'}`}>{ch.total.toLocaleString()}</span>
                      </div>
                    </motion.button>
                  ))}
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-4 border border-dashed border-forest-300 p-5 bg-forest-50/50">
                    <Globe size={18} className="text-forest-400 mb-2" />
                    <h4 className="font-sans font-bold text-sm text-forest-900 mb-1">Don't See Your City?</h4>
                    <p className="font-sans text-xs text-forest-500 mb-3 leading-relaxed">Start a chapter with full MISTAS support.</p>
                    <Link to="/contact" className="text-xs font-bold text-forest-700 flex items-center gap-1 hover:gap-2 transition-all">Apply Now <ArrowRight size={11} /></Link>
                  </motion.div>
                </div>

                <div className="lg:col-span-9">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeRegion} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                      <div className={`${activeR.color} p-8 mb-6 relative overflow-hidden`}>
                        <div className="absolute right-6 bottom-0 font-display font-bold text-white/10 leading-none select-none text-[110px]">{activeR.total.toLocaleString()}</div>
                        <div className="relative">
                          <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-3 block">{activeR.chapters.length} Chapters · {activeR.total.toLocaleString()} Alumni</span>
                          <div className="flex items-center gap-4">
                            <span className="text-5xl">{activeR.flag}</span>
                            <h2 className="font-display text-4xl font-bold text-white">{activeR.region}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {activeR.chapters.map((c, j) => (
                          <motion.div key={j} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                            style={{ boxShadow: CARD_SHADOW }}
                            className="border border-forest-100 p-6 bg-white group relative overflow-hidden rounded-2xl">
                            <div className={`absolute top-0 left-0 right-0 h-[3px] ${activeR.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                            <div className="flex items-center gap-2 mb-4">
                              <span className={`w-2 h-2 rounded-full ${c.active ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                              <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{c.active ? 'Active' : 'Forming'}</span>
                            </div>
                            <h3 className="font-display text-3xl font-bold text-forest-900 leading-tight">{c.city}</h3>
                            <p className="font-sans text-xs text-forest-400 mt-0.5 mb-5">{c.country}</p>
                            <div className="border-t border-forest-50 pt-4 mb-4">
                              <div className="font-display text-2xl font-bold text-forest-700">{c.members.toLocaleString()}</div>
                              <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Alumni Members</div>
                            </div>
                            <p className="font-sans text-xs text-forest-500 mb-5"><span className="text-forest-400">Lead — </span>{c.lead}</p>
                            <div className="flex gap-4 pt-3 border-t border-forest-50">
                              <button className="text-xs font-sans font-bold text-forest-700 flex items-center gap-1 hover:gap-2 transition-all">Join <ChevronRight size={11} /></button>
                              <button className="text-xs font-sans text-forest-400 flex items-center gap-1.5 hover:text-forest-700 transition-colors"><Mail size={10} /> Contact Lead</button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
