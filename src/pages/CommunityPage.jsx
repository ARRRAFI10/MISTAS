import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Users, GraduationCap, Globe, MessageSquare, ArrowRight } from 'lucide-react'
import { batchGroups, deptGroups, chapters, forumTopics } from '../data/communityData'

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
  },
]

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
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

      {/* 4 Hub Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">Choose Your Community</span>
            <div className="flex-1 border-t border-forest-100" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-300">4 Spaces</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-forest-100 border border-forest-100">
            {hubs.map((hub, i) => (
              <motion.div
                key={hub.path}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={hub.path}
                  className="flex flex-col bg-white group hover:bg-zinc-50 transition-colors duration-300 relative overflow-hidden h-full"
                >
                  {/* Colored top stripe */}
                  <div className={`${hub.stripe} h-[3px] w-full`} />

                  {/* Ghost number watermark */}
                  <div className={`absolute top-4 right-6 font-display font-bold text-[88px] leading-none select-none pointer-events-none ${hub.numColor} opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500`}>
                    {hub.num}
                  </div>

                  <div className="relative p-8 flex flex-col flex-1">
                    {/* Index + icon row */}
                    <div className="flex items-center justify-between mb-7">
                      <span className={`font-mono text-[10px] tracking-[0.45em] uppercase ${hub.iconColor} opacity-70`}>
                        {hub.num}
                      </span>
                      <div className={`w-11 h-11 flex items-center justify-center border ${hub.chipBorder} ${hub.chipBg} ${hub.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        {hub.icon}
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="font-display text-[28px] font-bold text-forest-950 leading-tight mb-3 group-hover:text-forest-800 transition-colors">
                      {hub.label}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm text-forest-500 leading-relaxed mb-7 flex-1">
                      {hub.desc}
                    </p>

                    {/* Stat chips */}
                    <div className="flex gap-3 mb-7">
                      {hub.stats.map(({ v, l }) => (
                        <div key={l} className={`flex-1 border ${hub.chipBorder} ${hub.chipBg} px-4 py-3 text-center`}>
                          <div className={`font-display text-xl font-bold ${hub.chipText}`}>{v}</div>
                          <div className={`font-mono text-[9px] tracking-widest uppercase mt-0.5 ${hub.chipLabel}`}>{l}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-5 border-t border-forest-100">
                      <span className={`font-sans font-bold text-sm ${hub.ctaColor} transition-colors flex items-center gap-2 group-hover:gap-3 transition-all duration-200`}>
                        Explore <ChevronRight size={14} />
                      </span>
                      <div className={`w-7 h-[2px] ${hub.stripe} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick preview strips */}
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
                        <p className="font-mono text-[9px] text-forest-400 tracking-wider mt-1">{t.category} · {t.upvotes} upvotes</p>
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
