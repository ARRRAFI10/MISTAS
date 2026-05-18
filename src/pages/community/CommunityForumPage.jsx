import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageSquare, TrendingUp, PenSquare, ChevronRight, ArrowRight, Search, X, ChevronDown } from 'lucide-react'
import { forumTopics } from '../../data/communityData'

const MotionLink  = motion(Link)
const CARD_SHADOW = '5px 7px 0px 0px #d1fae5, 0 2px 8px rgba(0,0,0,0.04)'
const CARD_HOVER  = '9px 13px 0px 0px #6ee7b7, 0 10px 24px rgba(0,0,0,0.08)'
const springHover = { type: 'spring', stiffness: 350, damping: 22 }

const categories = [
  { label: 'Career',           color: 'text-blue-600 bg-blue-50 border-blue-200',     dot: 'bg-blue-500',   posts: 1840 },
  { label: 'Higher Studies',   color: 'text-purple-600 bg-purple-50 border-purple-200', dot: 'bg-purple-500', posts: 1120 },
  { label: 'Technical',        color: 'text-forest-600 bg-forest-50 border-forest-200', dot: 'bg-forest-500', posts: 920  },
  { label: 'Entrepreneurship', color: 'text-orange-600 bg-orange-50 border-orange-200', dot: 'bg-orange-500', posts: 580  },
  { label: 'Campus Life',      color: 'text-pink-600 bg-pink-50 border-pink-200',       dot: 'bg-pink-500',   posts: 740  },
  { label: 'General',          color: 'text-zinc-600 bg-zinc-50 border-zinc-200',       dot: 'bg-zinc-400',   posts: 460  },
]
const catColor = (label) => categories.find(c => c.label === label)?.color || ''
const catDot   = (label) => categories.find(c => c.label === label)?.dot   || 'bg-forest-400'

export default function CommunityForumPage() {
  const [query, setQuery]   = useState('')
  const [cat, setCat]       = useState('All')
  const [ddOpen, setDdOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return forumTopics.filter(t => {
      const matchQ = !q || t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      const matchC = cat === 'All' || t.category === cat
      return matchQ && matchC
    })
  }, [query, cat])

  const isFiltering = query || cat !== 'All'

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
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Discussion Forum</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Discussion</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Forum</span>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="lg:col-span-5 lg:pb-4">
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  Search by topic, author or category. Filter discussions to find exactly what you need.
                </p>
                <button className="btn-primary flex items-center gap-2"><PenSquare size={14} /> Start a Discussion</button>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-6 divide-x divide-forest-800">
            {categories.map(({ label, posts }) => (
              <div key={label} className="py-5 px-4 text-center cursor-pointer group" onClick={() => { setCat(label); setDdOpen(false) }}>
                <div className="font-display text-xl font-bold text-white group-hover:text-forest-300 transition-colors">{posts.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border-b border-forest-100 shadow-sm sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-0 items-stretch">

            {/* Category dropdown */}
            <div className="relative flex-shrink-0">
              <button onClick={() => setDdOpen(p => !p)}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors min-w-[160px]">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat === 'All' ? 'bg-purple-400' : catDot(cat)}`} />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest-700 flex-1 truncate">{cat === 'All' ? 'All Topics' : cat}</span>
                <ChevronDown size={12} className={`text-forest-400 transition-transform flex-shrink-0 ${ddOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-white border border-forest-200 shadow-xl z-50 py-1">
                    <div className="px-4 py-2 border-b border-forest-100"><span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Filter by category</span></div>
                    <button onClick={() => { setCat('All'); setDdOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${cat === 'All' ? 'bg-forest-50' : ''}`}>
                      <span className="w-2 h-2 rounded-full bg-forest-300" />
                      <span className={`font-sans text-sm ${cat === 'All' ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>All Topics</span>
                      {cat === 'All' && <span className="ml-auto font-mono text-[9px] text-forest-400">✓</span>}
                    </button>
                    {categories.map(c => (
                      <button key={c.label} onClick={() => { setCat(c.label); setDdOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${cat === c.label ? 'bg-forest-50' : ''}`}>
                        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                        <span className={`font-sans text-sm flex-1 ${cat === c.label ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>{c.label}</span>
                        <span className="font-mono text-[9px] text-forest-400 tabular-nums">{c.posts.toLocaleString()}</span>
                        {cat === c.label && <span className="font-mono text-[9px] text-forest-400">✓</span>}
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
                placeholder="Search topics, authors, keywords…"
                className="w-full h-full border border-forest-200 pl-11 pr-4 py-3.5 font-sans text-sm text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>

            {/* Clear */}
            <AnimatePresence>
              {isFiltering && (
                <motion.button initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                  onClick={() => { setQuery(''); setCat('All') }}
                  className="flex items-center justify-center px-4 border border-l-0 border-forest-200 text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors gap-1.5">
                  <X size={13} /> <span className="font-mono text-[9px] tracking-widest uppercase hidden sm:block">Clear</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Quick category pills + count */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{filtered.length} of {forumTopics.length} threads</span>
            {categories.map(c => (
              <button key={c.label} onClick={() => setCat(p => p === c.label ? 'All' : c.label)}
                className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 border transition-all ${cat === c.label ? `${c.color} font-bold` : 'border-forest-200 text-forest-500 hover:border-forest-400 hover:text-forest-700'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forum content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Search size={28} className="text-forest-200 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-forest-900 mb-2">No threads found</h3>
              <p className="font-sans text-sm text-forest-400 mb-6">Try a different keyword or clear the category filter.</p>
              <button onClick={() => { setQuery(''); setCat('All') }} className="btn-outline">Clear filters</button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Main */}
              <div className="lg:col-span-8">
                <div className="flex items-center gap-6 mb-10">
                  <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">
                    {isFiltering ? `${filtered.length} results` : 'Trending'}
                  </span>
                  <div className="flex-1 border-t border-forest-100" />
                  <button className="btn-primary text-xs py-2 px-4 flex items-center gap-2">New Post <PenSquare size={11} /></button>
                </div>

                {/* Featured / first result */}
                <AnimatePresence mode="wait">
                  <motion.div key={filtered[0]?.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8">
                    <MotionLink to={`/community/forum/${filtered[0].id}`}
                      whileHover={{ y: -5, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                      style={{ boxShadow: CARD_SHADOW }}
                      className="block group border border-forest-100 rounded-2xl p-8 bg-white cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-forest-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
                      <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border rounded ${catColor(filtered[0].category)}`}>{filtered[0].category}</span>
                        {!isFiltering && <span className="font-mono text-[10px] text-forest-400 bg-forest-50 border border-forest-100 px-2 py-1 flex items-center gap-1 rounded"><TrendingUp size={8} /> Trending</span>}
                        {filtered[0].pinned && <span className="font-mono text-[10px] text-forest-400">Pinned</span>}
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors leading-tight mb-4">{filtered[0].title}</h2>
                      <p className="font-sans text-sm text-forest-400 mb-6">by {filtered[0].author}</p>
                      <div className="flex items-center gap-6 text-sm text-forest-400 flex-wrap">
                        <span className="flex items-center gap-2"><Heart size={13} /> {filtered[0].upvotes} upvotes</span>
                        <span className="flex items-center gap-2"><MessageSquare size={13} /> {filtered[0].comments} comments</span>
                        <span className="ml-auto font-sans font-bold text-forest-700 flex items-center gap-1.5 group-hover:gap-3 transition-all text-sm">Read Thread <ChevronRight size={13} /></span>
                      </div>
                    </MotionLink>
                  </motion.div>
                </AnimatePresence>

                {/* Rest */}
                <div className="space-y-3">
                {filtered.slice(1).map((topic, i) => (
                  <MotionLink key={topic.id} to={`/community/forum/${topic.id}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.45 }}
                    whileHover={{ y: -4, x: -2, boxShadow: CARD_HOVER, transition: springHover }}
                    style={{ boxShadow: CARD_SHADOW }}
                    className="flex gap-6 p-5 border border-forest-100 bg-white rounded-2xl cursor-pointer group relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-forest-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top rounded-l-2xl" />
                    <div className="font-display text-4xl font-bold text-forest-100 group-hover:text-forest-200 transition-colors w-10 flex-shrink-0 text-right leading-none pt-1">
                      {String(i + 2).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border rounded ${catColor(topic.category)}`}>{topic.category}</span>
                      </div>
                      <h3 className="font-sans font-semibold text-forest-900 group-hover:text-forest-700 transition-colors leading-snug text-base">{topic.title}</h3>
                      <p className="font-sans text-xs text-forest-400 mt-1.5">by {topic.author}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 text-xs text-forest-400 flex-shrink-0">
                      <span className="flex items-center gap-1.5"><Heart size={11} /> {topic.upvotes}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {topic.comments}</span>
                    </div>
                  </MotionLink>
                ))}
                </div>

                <div className="flex gap-4 mt-10">
                  <button className="btn-outline flex items-center gap-2">Browse All <ArrowRight size={14} /></button>
                  <button className="btn-primary flex items-center gap-2">Start Discussion <PenSquare size={14} /></button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">Browse by Category</h3>
                    <div className="space-y-1.5">
                      {categories.map((c, i) => (
                        <motion.button key={c.label} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                          onClick={() => setCat(p => p === c.label ? 'All' : c.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 border transition-all hover:shadow-sm text-left ${cat === c.label ? c.color + ' ring-1 ring-inset ring-current' : c.color}`}>
                          <span className="font-sans font-medium text-sm">{c.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold tabular-nums">{c.posts.toLocaleString()}</span>
                            <ChevronRight size={11} className="opacity-40" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-forest-950 p-7 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-forest-800 rounded-full opacity-50" />
                    <div className="relative">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-4">Alumni Stories</div>
                      <h4 className="font-display text-xl text-white font-bold mb-3">Share Your Story</h4>
                      <p className="font-sans text-sm text-forest-300 leading-relaxed mb-5">Your journey could inspire thousands of MISTians.</p>
                      <button className="w-full py-3 bg-forest-600 text-white text-sm font-sans font-bold hover:bg-forest-500 transition-colors flex items-center justify-center gap-2">
                        Write a Post <PenSquare size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
