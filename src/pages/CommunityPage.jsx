import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronDown, Users, GraduationCap, Globe,
  MessageSquare, ArrowRight, Search, X, Heart
} from 'lucide-react'
import { batchGroups, deptGroups, chapters, forumTopics } from '../data/communityData'

// ── Static hub config ──────────────────────────────────────────────────────
const hubs = [
  {
    path: '/community/batch',
    icon: <GraduationCap size={26} />,
    num: '01',
    label: 'Batch Groups',
    desc: 'Reconnect with your graduating class. Each batch year has its own group, representatives, and group chat.',
    stats: [
      { v: batchGroups.length, l: 'Batches' },
      { v: batchGroups.reduce((s, b) => s + b.members, 0).toLocaleString(), l: 'Members' },
    ],
    stripe: 'bg-forest-600',
    iconColor: 'text-forest-600',
    numColor: 'text-forest-50',
    ctaColor: 'text-forest-700 group-hover:text-forest-900',
    chipBorder: 'border-forest-100',
    chipText: 'text-forest-700',
    chipLabel: 'text-forest-400',
    chipBg: 'bg-forest-50',
    normalShadow: '6px 8px 0px 0px #bbf7d0, 0 2px 12px rgba(0,0,0,0.05)',
    hoverShadow:  '10px 14px 0px 0px #6ee7b7, 0 12px 32px rgba(0,0,0,0.10)',
  },
  {
    path: '/community/departments',
    icon: <Users size={26} />,
    num: '02',
    label: 'Department Groups',
    desc: 'Connect with alumni from your discipline — CSE, EEE, Civil, ME and more. Job referrals, research, chat.',
    stats: [
      { v: deptGroups.length, l: 'Groups' },
      { v: deptGroups.reduce((s, g) => s + g.members, 0).toLocaleString(), l: 'Members' },
    ],
    stripe: 'bg-blue-600',
    iconColor: 'text-blue-600',
    numColor: 'text-blue-50',
    ctaColor: 'text-blue-700 group-hover:text-blue-900',
    chipBorder: 'border-blue-100',
    chipText: 'text-blue-700',
    chipLabel: 'text-blue-400',
    chipBg: 'bg-blue-50',
    normalShadow: '6px 8px 0px 0px #bfdbfe, 0 2px 12px rgba(0,0,0,0.05)',
    hoverShadow:  '10px 14px 0px 0px #93c5fd, 0 12px 32px rgba(0,0,0,0.10)',
  },
  {
    path: '/community/chapters',
    icon: <Globe size={26} />,
    num: '03',
    label: 'Regional Chapters',
    desc: 'Find MIST alumni near you across 6 global regions and 18 city chapters. Join or start a local chapter.',
    stats: [
      { v: chapters.length, l: 'Regions' },
      { v: chapters.reduce((s, r) => s + r.chapters.length, 0), l: 'Chapters' },
    ],
    stripe: 'bg-amber-500',
    iconColor: 'text-amber-600',
    numColor: 'text-amber-50',
    ctaColor: 'text-amber-700 group-hover:text-amber-900',
    chipBorder: 'border-amber-100',
    chipText: 'text-amber-700',
    chipLabel: 'text-amber-400',
    chipBg: 'bg-amber-50',
    normalShadow: '6px 8px 0px 0px #fde68a, 0 2px 12px rgba(0,0,0,0.05)',
    hoverShadow:  '10px 14px 0px 0px #fcd34d, 0 12px 32px rgba(0,0,0,0.10)',
  },
  {
    path: '/community/forum',
    icon: <MessageSquare size={26} />,
    num: '04',
    label: 'Discussion Forum',
    desc: 'Open knowledge exchange — career advice, higher studies, technical topics, and alumni stories.',
    stats: [
      { v: forumTopics.length, l: 'Hot Threads' },
      { v: '5,660+', l: 'Total Posts' },
    ],
    stripe: 'bg-purple-600',
    iconColor: 'text-purple-600',
    numColor: 'text-purple-50',
    ctaColor: 'text-purple-700 group-hover:text-purple-900',
    chipBorder: 'border-purple-100',
    chipText: 'text-purple-700',
    chipLabel: 'text-purple-400',
    chipBg: 'bg-purple-50',
    normalShadow: '6px 8px 0px 0px #e9d5ff, 0 2px 12px rgba(0,0,0,0.05)',
    hoverShadow:  '10px 14px 0px 0px #d8b4fe, 0 12px 32px rgba(0,0,0,0.10)',
  },
]

const MotionLink = motion(Link)

// ── Search index (flat list built once) ───────────────────────────────────
const buildIndex = () => {
  const idx = []
  batchGroups.forEach(b => idx.push({
    type: 'batch',
    typeLabel: 'Batch Groups',
    title: `Batch ${b.year}`,
    sub: `${b.members.toLocaleString()} members · ${b.status} · Rep: ${b.lead}`,
    path: `/community/batch/${b.year}`,
    keywords: `${b.year} ${b.lead} batch mist`,
  }))
  deptGroups.forEach(g => idx.push({
    type: 'dept',
    typeLabel: 'Dept. Groups',
    title: g.name,
    sub: `${g.shortCode} · ${g.dept} · ${g.members.toLocaleString()} members`,
    path: `/community/departments/${g.id}`,
    keywords: `${g.name} ${g.shortCode} ${g.dept} department`,
  }))
  chapters.forEach(r => r.chapters.forEach(c => idx.push({
    type: 'chapter',
    typeLabel: 'Regional',
    title: `${c.city} Chapter`,
    sub: `${r.region} · ${c.country} · ${c.members.toLocaleString()} members · ${c.active ? 'Active' : 'Forming'}`,
    path: `/community/chapters`,
    keywords: `${c.city} ${c.country} ${r.region} chapter`,
  })))
  forumTopics.forEach(t => idx.push({
    type: 'forum',
    typeLabel: 'Forum',
    title: t.title,
    sub: `${t.category} · by ${t.author} · ${t.upvotes} upvotes`,
    path: `/community/forum/${t.id}`,
    keywords: `${t.title} ${t.author} ${t.category} forum`,
  }))
  return idx
}
const searchIndex = buildIndex()

// badge styling per type
const typeMeta = {
  batch:   { bg: 'bg-forest-100', text: 'text-forest-700', dot: 'bg-forest-500' },
  dept:    { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  chapter: { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500'  },
  forum:   { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
}

const filterOptions = [
  { value: 'all',     label: 'All Communities' },
  { value: 'batch',   label: 'Batch Groups' },
  { value: 'dept',    label: 'Dept. Groups' },
  { value: 'chapter', label: 'Regional Chapters' },
  { value: 'forum',   label: 'Discussion Forum' },
]

export default function CommunityPage() {
  const [query, setQuery]     = useState('')
  const [filter, setFilter]   = useState('all')
  const [open, setOpen]       = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const searchRef = useRef(null)

  // close panels on outside click
  useEffect(() => {
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpen(false)
        setFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // close on Escape
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') { setOpen(false); setFilterOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchIndex
      .filter(r =>
        (filter === 'all' || r.type === filter) &&
        (r.keywords.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
      )
      .slice(0, 10)
  }, [query, filter])

  // group results by type for display
  const grouped = useMemo(() => {
    const g = {}
    filteredResults.forEach(r => {
      if (!g[r.type]) g[r.type] = []
      g[r.type].push(r)
    })
    return g
  }, [filteredResults])

  const selectedFilter = filterOptions.find(o => o.value === filter)

  function handleQueryChange(e) {
    setQuery(e.target.value)
    setOpen(true)
    setFilterOpen(false)
  }

  function clearSearch() {
    setQuery('')
    setOpen(false)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.035 }}
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
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-500 whitespace-nowrap">MISTAS</span>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-400 whitespace-nowrap">Community Hub</span>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-500 whitespace-nowrap">EST. 2010</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="font-display font-bold tracking-tight leading-[0.85]">
                  <span className="block text-[96px] md:text-[120px] lg:text-[140px] text-white">Global</span>
                  <span className="block text-[96px] md:text-[120px] lg:text-[140px] italic text-forest-400">MIST</span>
                  <span className="block text-[96px] md:text-[120px] lg:text-[140px] text-white">Family.</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-5 lg:pb-6"
            >
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-8">
                  From batch mates to global chapters, department networks to open discussions — find and connect with your MIST community.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: '85+', l: 'Countries' },
                    { n: '12K+', l: 'Members' },
                    { n: '18', l: 'Chapters' },
                    { n: '3.2K', l: 'Forum Posts' },
                  ].map(({ n, l }) => (
                    <div key={l} className="border border-forest-700 px-4 py-3">
                      <div className="font-display text-xl font-bold text-white">{n}</div>
                      <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Sticky Search Bar ─────────────────────────────────────── */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-forest-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative flex items-stretch gap-0" ref={searchRef}>

            {/* Custom filter dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => { setFilterOpen(p => !p); setOpen(false) }}
                className="h-full flex items-center gap-2 px-4 border border-forest-200 border-r-0 bg-forest-50 hover:bg-forest-100 transition-colors text-left min-w-[160px]"
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  filter === 'all' ? 'bg-forest-400'
                  : filter === 'batch' ? 'bg-forest-500'
                  : filter === 'dept' ? 'bg-blue-500'
                  : filter === 'chapter' ? 'bg-amber-500'
                  : 'bg-purple-500'
                }`} />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest-700 flex-1 truncate">
                  {selectedFilter?.label}
                </span>
                <ChevronDown
                  size={12}
                  className={`text-forest-400 transition-transform duration-200 flex-shrink-0 ${filterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white border border-forest-200 shadow-xl z-50 py-1"
                  >
                    <div className="px-4 py-2 border-b border-forest-100">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Filter by type</span>
                    </div>
                    {filterOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setFilter(opt.value); setFilterOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-forest-50 transition-colors ${
                          filter === opt.value ? 'bg-forest-50' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          opt.value === 'all'     ? 'bg-forest-400'
                          : opt.value === 'batch'   ? 'bg-forest-600'
                          : opt.value === 'dept'    ? 'bg-blue-500'
                          : opt.value === 'chapter' ? 'bg-amber-500'
                          : 'bg-purple-500'
                        }`} />
                        <span className={`font-sans text-sm ${filter === opt.value ? 'font-semibold text-forest-900' : 'text-forest-700'}`}>
                          {opt.label}
                        </span>
                        {filter === opt.value && (
                          <span className="ml-auto font-mono text-[9px] text-forest-400 tracking-widest uppercase">✓</span>
                        )}
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
                onChange={handleQueryChange}
                onFocus={() => query && setOpen(true)}
                placeholder="Search batches by year, departments, cities, forum topics…"
                className="w-full h-full border border-forest-200 pl-11 pr-4 py-3.5 font-sans text-sm text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>

            {/* Clear */}
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  onClick={clearSearch}
                  className="flex items-center justify-center px-4 border border-l-0 border-forest-200 text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Results Panel ── */}
            <AnimatePresence>
              {open && query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-forest-200 shadow-2xl z-50 overflow-hidden"
                >
                  {filteredResults.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                      <Search size={22} className="text-forest-200 mx-auto mb-3" />
                      <p className="font-sans text-sm text-forest-500">
                        No results for <span className="font-semibold text-forest-800">"{query}"</span>
                      </p>
                      <p className="font-mono text-[10px] text-forest-300 tracking-widest uppercase mt-1">
                        Try a batch year, department code, or city name
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-2.5 border-b border-forest-100 flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">
                          {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{query}"
                        </span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-forest-300">
                          {filter !== 'all' && selectedFilter?.label}
                        </span>
                      </div>

                      <div className="max-h-[420px] overflow-y-auto divide-y divide-forest-50">
                        {Object.entries(grouped).map(([type, items]) => {
                          const meta = typeMeta[type]
                          return (
                            <div key={type}>
                              {/* Group header */}
                              <div className="px-5 py-2 bg-forest-50/60 flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500">
                                  {items[0].typeLabel}
                                </span>
                                <span className="font-mono text-[9px] text-forest-400 ml-1">({items.length})</span>
                              </div>

                              {items.map((result, ri) => (
                                <Link
                                  key={ri}
                                  to={result.path}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-forest-50 transition-colors group"
                                >
                                  {/* Type badge */}
                                  <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 flex-shrink-0 ${meta.bg} ${meta.text}`}>
                                    {type === 'batch' ? 'BATCH'
                                      : type === 'dept' ? 'DEPT'
                                      : type === 'chapter' ? 'CHAPTER'
                                      : 'FORUM'}
                                  </span>

                                  {/* Text */}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-sans font-semibold text-sm text-forest-900 group-hover:text-forest-700 transition-colors truncate">
                                      {result.title}
                                    </p>
                                    <p className="font-mono text-[10px] text-forest-400 tracking-wide mt-0.5 truncate">
                                      {result.sub}
                                    </p>
                                  </div>

                                  <ChevronRight size={13} className="text-forest-200 group-hover:text-forest-500 transition-colors flex-shrink-0" />
                                </Link>
                              ))}
                            </div>
                          )
                        })}
                      </div>

                      <div className="px-5 py-3 border-t border-forest-100 bg-forest-50/40 flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">
                          Press <kbd className="bg-white border border-forest-200 px-1.5 py-0.5 text-forest-600 font-sans">Esc</kbd> to close
                        </span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-forest-300">
                          {filteredResults.length} of {searchIndex.filter(r => filter === 'all' || r.type === filter).length}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick filter pills (always visible) */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-300 mr-1">Quick:</span>
            {[
              { q: '2022', f: 'batch',   label: 'Batch 2022' },
              { q: '2020', f: 'batch',   label: 'Batch 2020' },
              { q: 'CSE',  f: 'dept',    label: 'CSE' },
              { q: 'EEE',  f: 'dept',    label: 'EEE' },
              { q: 'Dubai',f: 'chapter', label: 'Dubai' },
              { q: 'London',f:'chapter', label: 'London' },
              { q: 'Career',f:'forum',   label: 'Career' },
            ].map(({ q, f, label }) => (
              <button
                key={label}
                onClick={() => { setQuery(q); setFilter(f); setOpen(true) }}
                className="font-mono text-[9px] tracking-widest uppercase text-forest-500 border border-forest-200 px-2.5 py-1 hover:bg-forest-50 hover:border-forest-400 hover:text-forest-700 transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4 Hub Cards ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">Choose Your Community</span>
            <div className="flex-1 border-t border-forest-100" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-300">4 Spaces</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hubs.map((hub, i) => (
              <MotionLink
                key={hub.path}
                to={hub.path}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -6,
                  x: -2,
                  boxShadow: hub.hoverShadow,
                  transition: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                style={{ boxShadow: hub.normalShadow }}
                className="flex flex-col bg-white group rounded-2xl border border-forest-100 overflow-hidden relative cursor-pointer"
              >
                <div className={`${hub.stripe} h-[3px] w-full`} />
                <div className={`absolute top-4 right-6 font-display font-bold text-[88px] leading-none select-none pointer-events-none ${hub.numColor} opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500`}>
                  {hub.num}
                </div>
                <div className="relative p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-7">
                    <span className={`font-mono text-[10px] tracking-[0.45em] uppercase ${hub.iconColor} opacity-70`}>
                      {hub.num}
                    </span>
                    <div className={`w-11 h-11 flex items-center justify-center rounded-xl border ${hub.chipBorder} ${hub.chipBg} ${hub.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {hub.icon}
                    </div>
                  </div>
                  <h3 className="font-display text-[28px] font-bold text-forest-950 leading-tight mb-3 group-hover:text-forest-800 transition-colors">
                    {hub.label}
                  </h3>
                  <p className="font-sans text-sm text-forest-500 leading-relaxed mb-7 flex-1">
                    {hub.desc}
                  </p>
                  <div className="flex gap-3 mb-7">
                    {hub.stats.map(({ v, l }) => (
                      <div key={l} className={`flex-1 border ${hub.chipBorder} ${hub.chipBg} px-4 py-3 text-center rounded-xl`}>
                        <div className={`font-display text-xl font-bold ${hub.chipText}`}>{v}</div>
                        <div className={`font-mono text-[9px] tracking-widest uppercase mt-0.5 ${hub.chipLabel}`}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-forest-100">
                    <span className={`font-sans font-bold text-sm ${hub.ctaColor} transition-colors flex items-center gap-2 group-hover:gap-3 transition-all duration-200`}>
                      Explore <ChevronRight size={14} />
                    </span>
                    <div className={`w-7 h-[2px] ${hub.stripe} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} />
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Preview Strips ──────────────────────────────────── */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Recent batches */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Latest Batches</span>
                <div className="flex-1 border-t border-forest-100" />
                <Link to="/community/batch" className="text-xs font-bold text-forest-600 flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowRight size={11} />
                </Link>
              </div>
              <div className="space-y-2">
                {batchGroups.slice(0, 4).map((b, i) => (
                  <motion.div
                    key={b.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={`/community/batch/${b.year}`}
                      className="flex items-center justify-between bg-white border border-forest-100 px-5 py-4 group hover:border-forest-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-2 h-2 rounded-full ${b.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className="font-display text-2xl font-bold text-forest-900">{b.year}</span>
                        <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase hidden sm:block">{b.status}</span>
                      </div>
                      <div className="flex items-center gap-6 text-xs text-forest-400">
                        <span>{b.members.toLocaleString()} members</span>
                        <ChevronRight size={13} className="text-forest-200 group-hover:text-forest-500 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent forum threads */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Trending Threads</span>
                <div className="flex-1 border-t border-forest-100" />
                <Link to="/community/forum" className="text-xs font-bold text-forest-600 flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowRight size={11} />
                </Link>
              </div>
              <div className="space-y-2">
                {forumTopics.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={`/community/forum/${t.id}`}
                      className="flex items-start justify-between bg-white border border-forest-100 px-5 py-4 group hover:border-forest-300 hover:shadow-sm transition-all gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-forest-900 group-hover:text-forest-700 transition-colors leading-snug truncate">{t.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-mono text-[9px] text-forest-400 tracking-wider">{t.category}</span>
                          <span className="flex items-center gap-1 font-mono text-[9px] text-forest-400">
                            <Heart size={9} /> {t.upvotes}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={13} className="text-forest-200 group-hover:text-forest-500 transition-colors flex-shrink-0 mt-0.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
