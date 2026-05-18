import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Star, Linkedin, Award, GraduationCap,
  ChevronDown, ChevronRight, ChevronLeft, Globe, Users,
  X, ArrowRight, Building2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ALUMNI, NOTABLE, DEPT_CFG, FALLBACK, cfg } from '../data/alumni'

const DEPT_CHIPS = ['All', 'CE', 'CSE', 'EECE', 'ME', 'AE', 'PME', 'EWCE', 'IPE', 'NAME', 'BME', 'NSE', 'Arch', 'URP', 'Math', 'Chem']

const BATCHES = ['All Batches', ...Array.from({ length: 27 }, (_, i) => `${1998 + i}`)]

/* ══════════════════════════════════════════════════════════════════════════════
   HALL OF FAME CAROUSEL
══════════════════════════════════════════════════════════════════════════════ */
const PER_PAGE = 3

const slideVariants = {
  enter: dir => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: dir => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

function HallOfFameCarousel() {
  const [[page, dir], setSlide] = useState([0, 1])
  const isPaused = useRef(false)
  const totalPages = Math.ceil(NOTABLE.length / PER_PAGE)

  const visible = Array.from({ length: PER_PAGE }, (_, i) =>
    NOTABLE[(page * PER_PAGE + i) % NOTABLE.length]
  )

  const next = useCallback(() => {
    setSlide(([p]) => [(p + 1) % totalPages, 1])
  }, [totalPages])

  const prev = useCallback(() => {
    setSlide(([p]) => [(p - 1 + totalPages) % totalPages, -1])
  }, [totalPages])

  useEffect(() => {
    const t = setInterval(() => { if (!isPaused.current) next() }, 4500)
    return () => clearInterval(t)
  }, [next])

  return (
    <div
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star size={13} className="text-amber-500" fill="currentColor" />
            <span className="font-mono text-xs tracking-widest uppercase text-amber-600 font-bold">Hall of Fame</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-950 font-bold">Distinguished Alumni</h2>
          <p className="font-sans text-sm text-zinc-400 mt-1 max-w-sm">
            Award winners &amp; global leaders from our community
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-zinc-200 hover:border-forest-400 hover:bg-forest-50 flex items-center justify-center text-zinc-400 hover:text-forest-700 transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setSlide(([p]) => [i, i > p ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 bg-forest-700' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-zinc-200 hover:border-forest-400 hover:bg-forest-50 flex items-center justify-center text-zinc-400 hover:text-forest-700 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide window */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visible.map((a, i) => {
              const c = cfg(a.dept)
              return (
                <motion.div
                  key={`${a.id}-${i}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-2xl bg-forest-950 cursor-pointer"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Background */}
                  {a.image ? (
                    <div className="absolute inset-0">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
                    </div>
                  ) : (
                    <>
                      <div className={`absolute inset-0 ${c.bg} opacity-10 rounded-2xl`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent rounded-2xl" />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '35%' }}>
                        <div className={`w-24 h-24 rounded-full ${c.bg} flex items-center justify-center font-display text-3xl font-bold text-white shadow-xl`}>
                          {a.initials}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                    <span className={`${c.bg} text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shadow`}>
                      {a.dept} · {a.batch}
                    </span>
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <Star size={9} fill="white" className="text-white" />
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">Notable</span>
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-display text-xl text-white font-bold mb-0.5 leading-tight">{a.name}</h3>
                    <p className="font-sans text-forest-300 text-sm mb-3">
                      {a.role} &middot; <span className="text-forest-400">{a.company}</span>
                    </p>

                    {a.award && (
                      <div className="flex items-start gap-2 bg-amber-500/15 border border-amber-500/30 rounded-2xl px-3 py-2.5 mb-4">
                        <Award size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-amber-300 leading-snug">{a.award}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-forest-400 text-xs font-sans">
                        <MapPin size={11} />
                        {a.location}, {a.country}
                      </span>
                      <Link
                        to={`/alumni/${a.id}`}
                        className="text-xs font-mono text-forest-300 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        Profile <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>

                  {/* Hover bottom glow line */}
                  <div className={`absolute bottom-0 left-4 right-4 h-0.5 ${c.bg} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20`} />
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-0.5 bg-zinc-200 rounded-full overflow-hidden">
        <motion.div
          key={page}
          className="h-full bg-forest-600 rounded-full"
          initial={{ width: `${(page / totalPages) * 100}%` }}
          animate={{ width: `${((page + 1) / totalPages) * 100}%` }}
          transition={{ duration: 4.5, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function DirectoryPage() {
  const [search,        setSearch]        = useState('')
  const [activeDept,    setActiveDept]    = useState('All')
  const [selectedBatch, setSelectedBatch] = useState('All Batches')
  const [notableOnly,   setNotableOnly]   = useState(false)
  const [showDeptFilter, setShowDeptFilter] = useState(false)  // closed by default

  const filtered = ALUMNI.filter(a => {
    const q = search.toLowerCase()
    const matchSearch  = !search || a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.company.toLowerCase().includes(q)
    const matchDept    = activeDept === 'All' || a.dept === activeDept
    const matchBatch   = selectedBatch === 'All Batches' || a.batch === selectedBatch
    const matchNotable = !notableOnly || a.notable
    return matchSearch && matchDept && matchBatch && matchNotable
  })

  const hasActiveFilter = activeDept !== 'All' || selectedBatch !== 'All Batches' || notableOnly

  function clearAll() {
    setActiveDept('All')
    setSelectedBatch('All Batches')
    setNotableOnly(false)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative bg-forest-950 overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Rings */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.07 }} transition={{ duration: 2 }}
          className="absolute -right-48 -top-48 w-[800px] h-[800px] border-[90px] border-forest-400 rounded-full pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.04 }} transition={{ duration: 2, delay: 0.4 }}
          className="absolute -left-32 bottom-0 w-[500px] h-[500px] border-[60px] border-forest-600 rounded-full pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-forest-500 mb-8"
          >
            <Link to="/" className="hover:text-forest-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-forest-300">Alumni Directory</span>
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-10">
            <div className="w-12 h-0.5 bg-forest-500 mb-6" />
            <h1 className="font-display text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              Our Global <br />
              <em className="italic text-forest-400">Alumni Network</em>
            </h1>
            <p className="font-body text-forest-300 text-lg leading-relaxed max-w-xl">
              Discover fellow MISTians shaping industries across 85+ countries —
              from Silicon Valley to Dhaka, our alumni are everywhere.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: Users,         val: '12,800+', label: 'Alumni Registered' },
              { icon: Globe,         val: '85+',     label: 'Countries' },
              { icon: GraduationCap, val: '27',      label: 'Batches' },
              { icon: Award,         val: '340+',    label: 'Award Winners' },
            ].map(({ icon: Icon, val, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-900/80 border border-forest-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-forest-400" />
                </div>
                <div>
                  <div className="font-display text-2xl text-white font-bold leading-none">{val}</div>
                  <div className="font-mono text-[10px] text-forest-500 tracking-wider uppercase mt-1">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="relative max-w-2xl"
          >
            <Search size={17} className="absolute left-5 top-1/2 -translate-y-1/2 text-forest-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, role, or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-forest-900/60 border border-forest-700 text-white placeholder-forest-500 pl-12 pr-12 py-4 rounded-2xl font-sans text-sm focus:outline-none focus:border-forest-400 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>

        {/* Ellipse transition edge */}
        <div className="h-10 bg-zinc-50" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} />
      </section>

      {/* ══════════════════════════════
          HALL OF FAME (with carousel)
      ══════════════════════════════ */}
      <section className="bg-zinc-50 pt-4 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <HallOfFameCarousel />
        </div>
      </section>

      {/* ══════════════════════════════
          MAIN DIRECTORY
      ══════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Collapsible Dept Filter ── */}
          <div className="mb-6 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Toggle button */}
            <button
              onClick={() => setShowDeptFilter(v => !v)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 font-bold">
                  Filter by Department
                </span>
                {activeDept !== 'All' && (
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold font-mono text-white uppercase tracking-wider ${cfg(activeDept).bg}`}>
                    {activeDept} · {cfg(activeDept).label}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-sans text-zinc-400">
                  {showDeptFilter ? 'Hide' : 'Show all departments'}
                </span>
                <motion.div animate={{ rotate: showDeptFilter ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} className="text-zinc-400" />
                </motion.div>
              </div>
            </button>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
              {showDeptFilter && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 border-t border-zinc-100 bg-zinc-50/80">
                    <div className="flex flex-wrap gap-2">
                      {DEPT_CHIPS.map(d => (
                        <button
                          key={d}
                          onClick={() => setActiveDept(d)}
                          className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                            activeDept === d
                              ? d === 'All'
                                ? 'bg-forest-900 text-white shadow-md'
                                : `${cfg(d).bg} text-white shadow-md`
                              : 'bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700'
                          }`}
                        >
                          {d === 'All' ? 'All Departments' : d}
                        </button>
                      ))}
                    </div>
                    {activeDept !== 'All' && (
                      <p className="mt-3 text-xs font-sans text-zinc-400">
                        Showing alumni from: <strong className={`${cfg(activeDept).text}`}>{cfg(activeDept).label}</strong>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Secondary filter row ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-zinc-100">
            <p className="text-sm font-sans text-zinc-400">
              Showing{' '}
              <span className="text-zinc-900 font-bold">{filtered.length}</span>{' '}
              of {ALUMNI.length} alumni
              {search && (
                <> matching <em className="text-zinc-600 not-italic font-semibold">"{search}"</em></>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Batch dropdown */}
              <div className="relative">
                <select
                  value={selectedBatch}
                  onChange={e => setSelectedBatch(e.target.value)}
                  className="appearance-none bg-zinc-100 px-4 py-2 pr-8 rounded-xl text-xs font-mono text-zinc-600 focus:outline-none cursor-pointer border-0 hover:bg-zinc-200 transition-colors"
                >
                  {BATCHES.map(b => <option key={b}>{b}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              {/* Notable toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" checked={notableOnly} onChange={e => setNotableOnly(e.target.checked)} />
                  <div className="w-9 h-5 bg-zinc-200 peer-checked:bg-forest-600 rounded-full transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Notable only</span>
              </label>

              {/* Reset */}
              {hasActiveFilter && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full"
                >
                  <X size={10} /> Reset filters
                </button>
              )}
            </div>
          </div>

          {/* ── Alumni Cards Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDept}-${selectedBatch}-${notableOnly}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((a, i) => {
                const c = cfg(a.dept)
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group relative bg-white rounded-2xl hover:shadow-xl hover:shadow-zinc-300/60 transition-all duration-500 flex flex-col overflow-hidden border border-zinc-100 hover:border-zinc-200"
                  >
                    {/* ── Dark banner ── */}
                    <div className="relative h-[84px] bg-forest-950 flex-shrink-0 overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                          backgroundSize: '14px 14px',
                        }}
                      />
                      {a.notable && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400/20 border border-amber-400/50 rounded-full px-2 py-0.5">
                          <Star size={8} fill="#fbbf24" className="text-amber-400" />
                          <span className="font-mono text-[8px] text-amber-300 tracking-[0.15em] uppercase font-bold">Notable</span>
                        </div>
                      )}
                    </div>

                    {/* ── Floating circle avatar ── */}
                    <div className="flex justify-center -mt-14 mb-3 relative z-10">
                      <div className={`w-28 h-28 rounded-full overflow-hidden shadow-xl flex-shrink-0 transition-transform duration-400 group-hover:scale-105 ${
                        a.notable ? 'ring-4 ring-amber-400' : 'ring-4 ring-white'
                      }`}>
                        {a.image ? (
                          <img
                            src={a.image}
                            alt={a.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className={`w-full h-full ${c.bg} flex items-center justify-center`}>
                            <span className="font-display text-2xl font-bold text-white select-none">{a.initials}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Card body ── */}
                    <div className="px-4 pb-4 flex-1 flex flex-col">

                      {/* Dept + Batch */}
                      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border ${c.text} bg-zinc-50 border-zinc-100`}>
                          {a.dept}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-100 uppercase tracking-wider">
                          Batch {a.batch}
                        </span>
                      </div>

                      {/* Name — 2 lines */}
                      <h3 className="font-display text-sm text-center text-zinc-900 font-bold leading-snug mb-1 line-clamp-2 min-h-[2.625rem] group-hover:text-forest-800 transition-colors">
                        {a.name}
                      </h3>

                      {/* Role — 1 line */}
                      <p className="text-[11px] font-sans text-zinc-400 text-center line-clamp-1 min-h-[1.1rem] mb-1.5">
                        {a.role}
                      </p>

                      {/* Company — 2 lines */}
                      <div className="flex items-start justify-center gap-1 min-h-[2.25rem] mb-3">
                        <Building2 size={10} className="text-forest-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] font-sans font-semibold text-forest-600 line-clamp-2 leading-snug">{a.company}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-[11px] font-sans mb-3">
                        <MapPin size={10} className="flex-shrink-0" />
                        <span className="line-clamp-1">{a.location}, {a.country}</span>
                      </div>

                      {/* Award — fixed-height slot */}
                      <div className="min-h-[2.5rem] mb-1">
                        {a.award && (
                          <div className="flex items-start gap-1.5 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1.5">
                            <Award size={9} className="text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-[10px] font-sans text-amber-700 leading-snug line-clamp-2">{a.award}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1" />

                      {/* View Profile */}
                      <Link
                        to={`/alumni/${a.id}`}
                        className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-sans font-bold text-forest-700 hover:text-forest-900 group/link"
                      >
                        <span>View Profile</span>
                        <ChevronRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300">
                <Search size={32} />
              </div>
              <h3 className="font-display text-xl text-zinc-900 font-bold mb-2">No Alumni Found</h3>
              <p className="font-sans text-sm text-zinc-400 mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearch(''); clearAll() }}
                className="px-6 py-2.5 rounded-2xl bg-forest-900 text-white font-sans text-sm hover:bg-forest-800 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="bg-forest-950 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.06 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[70px] border-forest-500 rounded-full pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-0.5 bg-forest-500 mb-8 mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
            Not in our directory <em className="italic text-forest-400">yet?</em>
          </h2>
          <p className="font-body text-forest-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Join 12,800+ MISTians. Register your profile and stay connected with the global MISTAS community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-3.5 flex items-center gap-2 text-base">
              Join MISTAS <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-outline px-8 py-3.5 text-base rounded-2xl">
              Update My Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
