import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, ArrowRight, ChevronRight,
  MessageSquare, Heart, Rss, PenSquare, TrendingUp,
  Star, Mail
} from 'lucide-react'
import { SectionHeader } from '../components/ui'

const chapters = [
  {
    region: 'South Asia',
    flag: '🇧🇩',
    chapters: [
      { city: 'Dhaka', country: 'Bangladesh', members: 4820, active: true, lead: 'Col. (Retd.) Farid Hossain' },
      { city: 'Chittagong', country: 'Bangladesh', members: 640, active: true, lead: 'Eng. Morshed Ali' },
      { city: 'Sylhet', country: 'Bangladesh', members: 290, active: true, lead: 'Dr. Kamrul Islam' },
    ],
    color: 'bg-forest-700',
    lightColor: 'bg-forest-50',
    borderColor: 'border-forest-200',
    hoverBorder: 'hover:border-forest-400',
    total: 5750,
  },
  {
    region: 'North America',
    flag: '🇺🇸',
    chapters: [
      { city: 'New York', country: 'USA', members: 380, active: true, lead: 'Eng. Shahriar Ahmed' },
      { city: 'San Francisco', country: 'USA', members: 510, active: true, lead: 'Dr. Nusrat Jahan' },
      { city: 'Toronto', country: 'Canada', members: 210, active: true, lead: 'Eng. Raihan Khan' },
    ],
    color: 'bg-blue-700',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    total: 1100,
  },
  {
    region: 'Europe',
    flag: '🇬🇧',
    chapters: [
      { city: 'London', country: 'UK', members: 290, active: true, lead: 'Dr. Anika Sultana' },
      { city: 'Berlin', country: 'Germany', members: 140, active: false, lead: 'Eng. Ismat Hossain' },
      { city: 'Stockholm', country: 'Sweden', members: 95, active: false, lead: 'Dr. Tania Islam' },
    ],
    color: 'bg-purple-700',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    total: 525,
  },
  {
    region: 'Middle East',
    flag: '🇸🇦',
    chapters: [
      { city: 'Riyadh', country: 'Saudi Arabia', members: 620, active: true, lead: 'Eng. Tariq Hassan' },
      { city: 'Dubai', country: 'UAE', members: 470, active: true, lead: 'Eng. Sazzad Hossain' },
      { city: 'Qatar', country: 'Qatar', members: 195, active: false, lead: 'Eng. Masud Rana' },
    ],
    color: 'bg-amber-700',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    total: 1285,
  },
  {
    region: 'Asia Pacific',
    flag: '🇦🇺',
    chapters: [
      { city: 'Sydney', country: 'Australia', members: 210, active: true, lead: 'Dr. Rezwan Karim' },
      { city: 'Tokyo', country: 'Japan', members: 88, active: false, lead: 'Eng. Bipul Das' },
      { city: 'Seoul', country: 'South Korea', members: 165, active: true, lead: 'Eng. Ashraful C.' },
    ],
    color: 'bg-teal-700',
    lightColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    hoverBorder: 'hover:border-teal-400',
    total: 463,
  },
  {
    region: 'South East Asia',
    flag: '🇸🇬',
    chapters: [
      { city: 'Singapore', country: 'Singapore', members: 142, active: true, lead: 'Eng. Farhan Islam' },
      { city: 'Kuala Lumpur', country: 'Malaysia', members: 98, active: false, lead: 'Eng. Rafiq Hassan' },
    ],
    color: 'bg-rose-700',
    lightColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    hoverBorder: 'hover:border-rose-400',
    total: 240,
  },
]

const groups = [
  { name: 'CSE Alumni Network', members: 2840, posts: 1240, icon: '💻', desc: 'Tech, software, AI and computer science discussions' },
  { name: 'Civil Engineers Bangladesh', members: 1920, posts: 870, icon: '🏗️', desc: 'Infrastructure, structural and environmental engineering' },
  { name: 'EEE Professionals', members: 1540, posts: 620, icon: '⚡', desc: 'Electrical, electronics and power systems professionals' },
  { name: 'MIST Entrepreneurs', members: 680, posts: 340, icon: '🚀', desc: 'Startup founders, investors and business leaders' },
  { name: 'Women in MIST', members: 520, posts: 290, icon: '👩‍💻', desc: 'Empowering women graduates across disciplines' },
  { name: 'MIST Research Network', members: 740, posts: 410, icon: '🔬', desc: 'Academic researchers and PhD scholars worldwide' },
]

const forumCategories = [
  { label: 'Career', color: 'text-blue-600 bg-blue-50 border-blue-200', posts: 1840 },
  { label: 'Higher Studies', color: 'text-purple-600 bg-purple-50 border-purple-200', posts: 1120 },
  { label: 'Technical', color: 'text-forest-600 bg-forest-50 border-forest-200', posts: 920 },
  { label: 'Entrepreneurship', color: 'text-orange-600 bg-orange-50 border-orange-200', posts: 580 },
  { label: 'Campus Life', color: 'text-pink-600 bg-pink-50 border-pink-200', posts: 740 },
  { label: 'General', color: 'text-zinc-600 bg-zinc-50 border-zinc-200', posts: 460 },
]

const trendingTopics = [
  { title: 'How I moved from Bangladesh to Germany as a Mech Engineer', author: 'Ismat H.', category: 'Career', upvotes: 412, comments: 68 },
  { title: 'MIST thesis to MIT PhD — my complete application journey', author: 'Dr. Tahmina R.', category: 'Higher Studies', upvotes: 380, comments: 94 },
  { title: 'Best AI tools for Civil Engineers in 2025', author: 'Eng. Karim', category: 'Technical', upvotes: 265, comments: 41 },
  { title: 'Raising $500K for a Dhaka-based tech startup — AMA', author: 'Arif H.', category: 'Entrepreneurship', upvotes: 310, comments: 86 },
]

export default function CommunityPage() {
  const [activeRegion, setActiveRegion] = useState(0)
  const region = chapters[activeRegion]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
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
          {/* Editorial masthead */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-500 whitespace-nowrap">MISTAS</span>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-400 whitespace-nowrap">Community &amp; Chapters</span>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-forest-500 whitespace-nowrap">EST. 2010</span>
          </motion.div>

          {/* Main hero grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            {/* Display heading */}
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

            {/* Description + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-5 lg:pb-6"
            >
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-8">
                  From Dhaka to Dubai, London to Los Angeles — MIST alumni chapters span the globe. Find your local community, join groups, and engage in our knowledge forums.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#chapters" className="btn-primary flex items-center justify-center gap-2">
                    Find Your Chapter <Globe size={14} />
                  </a>
                  <a
                    href="#forum"
                    className="btn-outline border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white hover:border-forest-800 flex items-center justify-center gap-2"
                  >
                    Join Forum <MessageSquare size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-6 divide-x divide-forest-800"
          >
            {[
              { n: '85+', label: 'Countries' },
              { n: '18', label: 'Chapters' },
              { n: '12K+', label: 'Members' },
              { n: '24', label: 'Groups' },
              { n: '3.2K', label: 'Forum Posts' },
              { n: '6', label: 'Regions' },
            ].map(({ n, label }) => (
              <div key={label} className="py-6 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Section nav */}
        <div className="border-t border-forest-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8 overflow-x-auto">
              {['Chapters', 'Groups', 'Forum'].map((t) => (
                <a
                  key={t}
                  href={`#${t.toLowerCase()}`}
                  className="py-4 font-mono text-[10px] tracking-[0.35em] uppercase text-forest-500 hover:text-white transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-forest-500"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Regional Chapters ─────────────────────────────────────── */}
      <section id="chapters" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Editorial section header */}
          <div className="flex items-center gap-6 mb-16">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400 whitespace-nowrap">01 — Global Chapters</span>
            <div className="flex-1 border-t border-forest-100" />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-forest-900 whitespace-nowrap"
            >
              Find Your Region
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Region selector */}
            <div className="lg:col-span-3 space-y-1">
              {chapters.map((ch, i) => (
                <motion.button
                  key={ch.region}
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

              {/* Start a chapter */}
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

            {/* Region detail panel */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Region banner */}
                  <div className={`${region.color} p-8 mb-6 relative overflow-hidden`}>
                    <div className="absolute right-6 bottom-0 font-display font-bold text-white/10 leading-none select-none text-[110px]">
                      {region.total.toLocaleString()}
                    </div>
                    <div className="relative">
                      <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-3 block">
                        {region.chapters.length} Chapters Active
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{region.flag}</span>
                        <h2 className="font-display text-4xl font-bold text-white">{region.region}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Chapter cards */}
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
                            {c.active ? 'Active Chapter' : 'Forming'}
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

      {/* ── Community Groups ──────────────────────────────────────── */}
      <section id="groups" className="py-24 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Editorial section header */}
          <div className="flex items-center gap-6 mb-16">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-500 whitespace-nowrap">02 — Community Groups</span>
            <div className="flex-1 border-t border-forest-800" />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-white whitespace-nowrap"
            >
              Find Your Tribe
            </motion.h2>
          </div>

          {/* Featured + secondary top row */}
          <div className="grid lg:grid-cols-12 gap-5 mb-5">
            {/* Featured group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-forest-800 border border-forest-700 p-10 relative overflow-hidden group hover:border-forest-500 transition-all duration-400"
            >
              <div className="absolute -bottom-6 -right-6 text-[160px] leading-none select-none opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                {groups[0].icon}
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400 bg-forest-900 border border-forest-700 px-3 py-1.5">
                    Featured Group
                  </span>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500">
                    {groups[0].members.toLocaleString()} members
                  </span>
                </div>
                <div className="text-5xl mb-5">{groups[0].icon}</div>
                <h3 className="font-display text-4xl font-bold text-white mb-4 leading-tight">{groups[0].name}</h3>
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-8 max-w-md">{groups[0].desc}</p>
                <div className="flex items-center gap-6">
                  <button className="btn-primary flex items-center gap-2">
                    Join Group <ChevronRight size={14} />
                  </button>
                  <span className="font-sans text-sm text-forest-400 flex items-center gap-2">
                    <Rss size={12} /> {groups[0].posts.toLocaleString()} posts
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Two secondary groups stacked */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-5">
              {groups.slice(1, 3).map((group, i) => (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-forest-800 border border-forest-700 p-7 group hover:border-forest-500 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-forest-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top" />
                  <div className="flex items-start gap-4">
                    <span className="text-3xl mt-0.5">{group.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500">
                          {group.members.toLocaleString()} members
                        </span>
                        <span className="font-sans text-xs text-forest-500 flex items-center gap-1">
                          <Rss size={9} /> {group.posts.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-forest-300 transition-colors leading-tight">
                        {group.name}
                      </h3>
                      <p className="font-sans text-sm text-forest-400 mt-1.5 leading-relaxed">{group.desc}</p>
                    </div>
                  </div>
                  <button className="mt-5 text-xs font-bold text-forest-400 group-hover:text-forest-300 flex items-center gap-1.5 hover:gap-3 transition-all">
                    Join Group <ChevronRight size={11} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Remaining 3 groups */}
          <div className="grid sm:grid-cols-3 gap-5">
            {groups.slice(3).map((group, i) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-forest-900 border border-forest-800 p-6 group hover:border-forest-600 hover:bg-forest-800 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{group.icon}</span>
                  <span className="font-mono text-[9px] text-forest-500 tracking-widest uppercase">
                    {group.members.toLocaleString()} mbrs
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-forest-300 transition-colors">
                  {group.name}
                </h3>
                <p className="font-sans text-sm text-forest-500 leading-relaxed mb-5">{group.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-forest-800">
                  <span className="text-xs font-sans text-forest-500 flex items-center gap-1.5">
                    <Rss size={9} /> {group.posts.toLocaleString()} posts
                  </span>
                  <button className="text-xs font-bold text-forest-400 group-hover:text-forest-300 flex items-center gap-1.5 hover:gap-3 transition-all">
                    Join <ChevronRight size={11} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Knowledge Forum ───────────────────────────────────────── */}
      <section id="forum" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Editorial section header */}
          <div className="flex items-center gap-6 mb-16">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400 whitespace-nowrap">03 — Knowledge Forum</span>
            <div className="flex-1 border-t border-forest-100" />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-forest-900 whitespace-nowrap"
            >
              Trending Discussions
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main content column */}
            <div className="lg:col-span-8">
              {/* Featured discussion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group border-l-4 border-forest-600 pl-8 pb-10 mb-8 border-b border-forest-100 cursor-pointer hover:border-l-forest-400 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border ${
                    forumCategories.find((c) => c.label === trendingTopics[0].category)?.color || ''
                  }`}>
                    {trendingTopics[0].category}
                  </span>
                  <span className="font-mono text-[10px] text-forest-400 bg-forest-50 border border-forest-100 px-2 py-1 flex items-center gap-1">
                    <TrendingUp size={8} /> Trending
                  </span>
                  <span className="font-mono text-[10px] text-forest-400">Featured</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors leading-tight mb-4">
                  {trendingTopics[0].title}
                </h2>
                <p className="font-sans text-sm text-forest-400 mb-6">by {trendingTopics[0].author}</p>
                <div className="flex items-center gap-6 text-sm text-forest-400 flex-wrap">
                  <span className="flex items-center gap-2"><Heart size={13} /> {trendingTopics[0].upvotes} upvotes</span>
                  <span className="flex items-center gap-2"><MessageSquare size={13} /> {trendingTopics[0].comments} comments</span>
                  <button className="ml-auto font-sans font-bold text-forest-700 flex items-center gap-1.5 hover:gap-3 transition-all text-sm">
                    Read Thread <ChevronRight size={13} />
                  </button>
                </div>
              </motion.div>

              {/* Remaining discussions */}
              <div>
                {trendingTopics.slice(1).map((topic, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex gap-6 py-6 border-b border-forest-100 cursor-pointer hover:bg-forest-50/60 px-4 -mx-4 transition-colors duration-200 rounded-sm"
                  >
                    <div className="font-display text-4xl font-bold text-forest-100 group-hover:text-forest-200 transition-colors w-10 flex-shrink-0 text-right leading-none pt-1">
                      {String(i + 2).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border ${
                          forumCategories.find((c) => c.label === topic.category)?.color || ''
                        }`}>
                          {topic.category}
                        </span>
                      </div>
                      <h3 className="font-sans font-semibold text-forest-900 group-hover:text-forest-700 transition-colors leading-snug text-base">
                        {topic.title}
                      </h3>
                      <p className="font-sans text-xs text-forest-400 mt-1.5">by {topic.author}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 text-xs text-forest-400 flex-shrink-0">
                      <span className="flex items-center gap-1.5"><Heart size={11} /> {topic.upvotes}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {topic.comments}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <button className="btn-outline flex items-center gap-2">
                  Browse All Topics <ArrowRight size={14} />
                </button>
                <button className="btn-primary flex items-center gap-2">
                  Start Discussion <PenSquare size={14} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">
                  Browse by Category
                </h3>
                <div className="space-y-1.5 mb-10">
                  {forumCategories.map((cat, i) => (
                    <motion.button
                      key={cat.label}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`w-full flex items-center justify-between px-4 py-3 border transition-all hover:shadow-sm text-left ${cat.color}`}
                    >
                      <span className="font-sans font-medium text-sm">{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tabular-nums">{cat.posts.toLocaleString()}</span>
                        <ChevronRight size={11} className="opacity-40" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Editorial CTA */}
                <div className="bg-forest-950 p-7 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-forest-800 rounded-full opacity-50" />
                  <div className="relative">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-4">Alumni Stories</div>
                    <Star size={20} className="text-gold-400 mb-3" />
                    <h4 className="font-display text-xl text-white font-bold mb-3">Share Your Story</h4>
                    <p className="font-sans text-sm text-forest-300 leading-relaxed mb-5">
                      Your career journey could inspire thousands of MISTians. Write a post and pay it forward.
                    </p>
                    <button className="w-full py-3 bg-forest-600 text-white text-sm font-sans font-bold hover:bg-forest-500 transition-colors flex items-center justify-center gap-2">
                      Write a Post <PenSquare size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
