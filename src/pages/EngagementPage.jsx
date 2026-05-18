import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, BookOpen, Video, MessageSquare, ArrowRight, CheckCircle,
  Calendar, ChevronRight, Handshake, Lightbulb, Star, Clock,
  Globe, Mail, MapPin, Mic, PenSquare, Rss, TrendingUp, Award
} from 'lucide-react'
import { Section, SectionHeader, Tag } from '../components/ui'

const mentors = [
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Lead ML Engineer · Grammarly',
    dept: 'CSE',
    batch: '2008',
    expertise: ['Machine Learning', 'NLP', 'Career Guidance'],
    initials: 'NJ',
    available: true,
    color: 'bg-forest-700',
    sessions: 24,
    rating: 4.9,
  },
  {
    name: 'Col. Rafiqul Islam',
    role: 'Director · Army Corps of Engineers',
    dept: 'CE',
    batch: '2003',
    expertise: ['Structural Engg.', 'Leadership', 'Military Career'],
    initials: 'RI',
    available: true,
    color: 'bg-forest-800',
    sessions: 41,
    rating: 5.0,
  },
  {
    name: 'Eng. Reza Chowdhury',
    role: 'VP Engineering · Samsung R&D',
    dept: 'EEE',
    batch: '2005',
    expertise: ['Embedded Systems', 'R&D', 'Product Dev.'],
    initials: 'RC',
    available: false,
    color: 'bg-forest-600',
    sessions: 19,
    rating: 4.8,
  },
  {
    name: 'Dr. Anika Sultana',
    role: 'Senior Researcher · MIT Lincoln Lab',
    dept: 'ME',
    batch: '2007',
    expertise: ['Defense Tech', 'Research', 'US Career Path'],
    initials: 'AS',
    available: true,
    color: 'bg-forest-900',
    sessions: 33,
    rating: 4.9,
  },
  {
    name: 'Arif Hossain',
    role: 'Co-Founder · DataBridge AI',
    dept: 'CSE',
    batch: '2010',
    expertise: ['Entrepreneurship', 'AI Startups', 'Fundraising'],
    initials: 'AH',
    available: true,
    color: 'bg-forest-700',
    sessions: 15,
    rating: 4.7,
  },
  {
    name: 'Lt. Col. Shirin Akter',
    role: 'Engineer Officer · Bangladesh Navy',
    dept: 'Naval',
    batch: '2006',
    expertise: ['Naval Engineering', 'Defense', 'Women in STEM'],
    initials: 'SA',
    available: false,
    color: 'bg-forest-800',
    sessions: 28,
    rating: 4.8,
  },
]

const sessions = [
  {
    date: 'May 20',
    day: 'Tuesday',
    title: 'Breaking into Big Tech in 2025',
    speaker: 'Nazmus Sakib',
    org: 'Facebook / Meta',
    type: 'Webinar',
    typeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    slots: 42,
    time: '7:00 PM BST',
  },
  {
    date: 'Jun 4',
    day: 'Wednesday',
    title: 'From MIST to Global Consultancy',
    speaker: 'Dr. Tahmina Rahman',
    org: 'Google DeepMind',
    type: 'Talk',
    typeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    slots: 18,
    time: '6:30 PM BST',
  },
  {
    date: 'Jun 18',
    day: 'Wednesday',
    title: 'Civil Engineering Abroad: A Complete Roadmap',
    speaker: 'Brig. Gen. (Retd.) Al-Amin',
    org: 'BNBC',
    type: 'Workshop',
    typeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    slots: 30,
    time: '5:00 PM BST',
  },
  {
    date: 'Jul 2',
    day: 'Wednesday',
    title: 'Research Career: Academia vs Industry',
    speaker: 'Dr. Anika Sultana',
    org: 'MIT Lincoln Lab',
    type: 'Panel',
    typeColor: 'bg-forest-50 text-forest-700 border-forest-200',
    slots: 60,
    time: '8:00 PM BST',
  },
]

const forumPosts = [
  {
    title: 'How I landed a FAANG job from Dhaka — My 8-month journey',
    author: 'Nazmus Sakib · CSE 2012',
    category: 'Career',
    reads: 1240,
    comments: 47,
    hot: true,
  },
  {
    title: 'GRE preparation resources for MIST graduates heading to the US',
    author: 'Dr. Tahmina Rahman · CSE 2005',
    category: 'Higher Studies',
    reads: 892,
    comments: 31,
    hot: false,
  },
  {
    title: 'PE Exam (USA) — A guide for Bangladeshi Civil Engineers',
    author: 'Eng. Farid Hossain · CE 1998',
    category: 'Certifications',
    reads: 673,
    comments: 22,
    hot: false,
  },
  {
    title: 'Starting a tech startup from Bangladesh — lessons learned',
    author: 'Arif Hossain · CSE 2010',
    category: 'Entrepreneurship',
    reads: 1105,
    comments: 58,
    hot: true,
  },
]

const mentorshipBenefits = [
  'One-on-one career guidance sessions',
  'CV and portfolio review by industry experts',
  'Mock interviews with senior professionals',
  'Graduate school application support',
  'Access to exclusive alumni network',
  'Long-term mentoring relationships',
]

export default function EngagementPage() {
  const [mentorTab, setMentorTab] = useState('find')
  const [formData, setFormData] = useState({ name: '', email: '', dept: '', batch: '', goal: '' })

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────────── */}
      <div className="bg-forest-950 pt-24 pb-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.06 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[80px] border-forest-400 rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 font-mono text-xs text-forest-500 mb-8 uppercase tracking-[0.4em]"
          >
            <span>Home</span>
            <div className="w-1 h-1 bg-forest-600 rounded-full" />
            <span className="text-forest-300">Engagement & Mentorship</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-display text-6xl md:text-7xl text-white mb-6 leading-tight font-bold"
              >
                Connect. <br />
                Learn. <em className="italic text-forest-400">Grow.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-body text-forest-300 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Join a thriving ecosystem of mentors, career guidance sessions, knowledge
                sharing forums, and live webinars — all powered by the MISTAS community.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#mentorship" className="btn-primary flex items-center gap-2">
                  Find a Mentor <ArrowRight size={16} />
                </a>
                <a href="#sessions" className="btn-outline border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white hover:border-forest-800 flex items-center gap-2">
                  View Sessions <Calendar size={16} />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { icon: Handshake, label: 'Active Mentors', value: '156+' },
                { icon: Users, label: 'Mentees Served', value: '840+' },
                { icon: Video, label: 'Webinars Held', value: '94' },
                { icon: MessageSquare, label: 'Forum Posts', value: '3.2K+' },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="bg-forest-900/60 border border-forest-800 p-6 backdrop-blur-sm"
                >
                  <Icon size={20} className="text-forest-400 mb-3" />
                  <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
                  <div className="font-mono text-[10px] text-forest-500 tracking-widest uppercase">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section anchors bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8 overflow-x-auto">
              {['Mentorship', 'Sessions', 'Knowledge', 'Webinars'].map((tab) => (
                <a
                  key={tab}
                  href={`#${tab.toLowerCase()}`}
                  className="py-4 font-mono text-[10px] tracking-[0.3em] uppercase text-forest-500 hover:text-white transition-colors whitespace-nowrap"
                >
                  {tab}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mentorship Program ─────────────────────────────────────── */}
      <section id="mentorship" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <SectionHeader
              label="Mentorship Program"
              title="Learn from Those Who've Been There"
              subtitle="Connect with MIST alumni who are leaders in their fields — ready to guide the next generation."
            />
            <div className="flex gap-1 bg-forest-50 p-1 rounded-none border border-forest-100 flex-shrink-0 mb-12">
              {['find', 'become'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMentorTab(tab)}
                  className={`px-6 py-2.5 font-sans text-sm font-medium transition-all duration-300 ${
                    mentorTab === tab
                      ? 'bg-forest-700 text-white'
                      : 'text-forest-600 hover:text-forest-800'
                  }`}
                >
                  {tab === 'find' ? 'Find a Mentor' : 'Become a Mentor'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mentorTab === 'find' ? (
              <motion.div
                key="find"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {mentors.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-xl transition-all duration-400 bg-white relative overflow-hidden"
                  >
                    <div className="h-1 w-0 group-hover:w-full bg-forest-600 transition-all duration-500 absolute top-0 left-0" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 ${m.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <span className="font-display text-lg font-bold text-white">{m.initials}</span>
                          </div>
                          <div>
                            <h3 className="font-sans font-bold text-forest-900 leading-tight">{m.name}</h3>
                            <p className="font-sans text-xs text-forest-500 mt-0.5">{m.role}</p>
                          </div>
                        </div>
                        <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1 ${m.available ? 'bg-emerald-400' : 'bg-zinc-300'}`} title={m.available ? 'Available' : 'Unavailable'} />
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {m.expertise.map((e) => (
                          <span key={e} className="text-[10px] font-mono tracking-wide text-forest-600 bg-forest-50 border border-forest-100 px-2 py-0.5">
                            {e}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-forest-400 font-sans mb-5 pt-4 border-t border-forest-50">
                        <span className="flex items-center gap-1">
                          <Star size={11} className="text-gold-500 fill-current" />
                          {m.rating}
                        </span>
                        <span>{m.sessions} sessions</span>
                        <span className="font-mono">{m.dept} · {m.batch}</span>
                      </div>

                      <button
                        disabled={!m.available}
                        className={`w-full py-2.5 text-sm font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          m.available
                            ? 'bg-forest-700 text-white hover:bg-forest-800'
                            : 'bg-forest-50 text-forest-300 cursor-not-allowed'
                        }`}
                      >
                        {m.available ? 'Request Mentorship' : 'Currently Unavailable'}
                        {m.available && <ArrowRight size={14} />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="become"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Benefits */}
                <div>
                  <div className="bg-forest-900 p-10 relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-56 h-56 border-[40px] border-forest-700 rounded-full opacity-30" />
                    <div className="relative">
                      <Award size={28} className="text-gold-400 mb-5" />
                      <h3 className="font-display text-3xl text-white font-bold mb-4">Why Become a Mentor?</h3>
                      <p className="font-body text-forest-300 leading-relaxed mb-8">
                        Give back to your alma mater by guiding the next generation of MIST engineers. Share your journey, shape careers.
                      </p>
                      <div className="space-y-3">
                        {mentorshipBenefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-forest-400 mt-0.5 flex-shrink-0" />
                            <span className="font-sans text-sm text-forest-200">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div>
                  <h3 className="font-display text-2xl text-forest-900 font-bold mb-6">Mentor Application</h3>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Full Name</label>
                        <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Email</label>
                        <input type="email" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50" placeholder="you@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Department</label>
                        <select className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50 appearance-none">
                          <option>CSE</option><option>EEE</option><option>CE</option><option>ME</option><option>Architecture</option><option>Naval</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Batch Year</label>
                        <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50" placeholder="e.g. 2008" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Current Role & Organization</label>
                      <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50" placeholder="e.g. Senior Engineer at Google" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Areas of Expertise</label>
                      <textarea rows={3} className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-forest-50/50 resize-none" placeholder="e.g. Machine Learning, Career Transitions, Graduate Studies..." />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      Submit Application <ArrowRight size={15} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Career Guidance Sessions ───────────────────────────────── */}
      <section id="sessions" className="py-24 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <SectionHeader
              label="Career Guidance"
              title="Upcoming Sessions"
              subtitle="Expert-led talks, workshops, and panels from MIST alumni across industries."
            />
            <Link to="/news#events" className="mb-12 hidden md:flex items-center gap-2 text-sm font-sans font-medium text-forest-700 animated-underline">
              See All Events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {sessions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-lg transition-all duration-300 flex gap-0 overflow-hidden"
              >
                {/* Date Column */}
                <div className="w-20 bg-forest-900 flex flex-col items-center justify-center py-6 flex-shrink-0">
                  <span className="font-display text-2xl font-bold text-white leading-none">{s.date.split(' ')[1]}</span>
                  <span className="font-mono text-[9px] tracking-widest text-forest-400 uppercase mt-1">{s.date.split(' ')[0]}</span>
                  <span className="font-sans text-[9px] text-forest-500 mt-2">{s.day}</span>
                </div>
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-sans font-bold text-forest-900 leading-snug group-hover:text-forest-700 transition-colors text-base">
                      {s.title}
                    </h3>
                    <span className={`flex-shrink-0 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 border ${s.typeColor}`}>
                      {s.type}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-forest-500 mb-4">
                    <span className="font-medium text-forest-700">{s.speaker}</span> · {s.org}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-sans text-forest-400">
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {s.time}</span>
                      <span className="flex items-center gap-1.5"><Users size={11} /> {s.slots} seats left</span>
                    </div>
                    <button className="text-xs font-sans font-bold text-forest-700 hover:text-forest-900 flex items-center gap-1.5 group/btn">
                      Register <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Knowledge Sharing Forum ───────────────────────────────── */}
      <section id="knowledge" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <SectionHeader
              label="Knowledge Hub"
              title="Alumni Insights & Discussions"
              subtitle="A curated forum where MIST graduates share career insights, guides, and experiences."
            />
            <Link to="/community#forum" className="mb-12 hidden md:flex items-center gap-2 text-sm font-sans font-medium text-forest-700 animated-underline">
              Enter Forum <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-6 p-6 border border-forest-100 rounded-2xl hover:border-forest-300 hover:bg-forest-50/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 bg-forest-900 flex items-center justify-center flex-shrink-0">
                  <PenSquare size={16} className="text-forest-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    {post.hot && (
                      <span className="text-[9px] font-mono tracking-widest uppercase text-red-500 bg-red-50 border border-red-100 px-2 py-0.5">Trending</span>
                    )}
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest-400 bg-forest-50 border border-forest-100 px-2 py-0.5">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-forest-900 group-hover:text-forest-700 transition-colors truncate">{post.title}</h3>
                  <p className="font-sans text-xs text-forest-400 mt-1">{post.author}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-xs text-forest-400 flex-shrink-0">
                  <span className="flex items-center gap-1.5"><Rss size={11} /> {post.reads.toLocaleString()}</span>
                  <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {post.comments}</span>
                </div>
                <ChevronRight size={16} className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/community#forum" className="btn-outline inline-flex items-center gap-2">
              Browse All Discussions <MessageSquare size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Webinars CTA ──────────────────────────────────────────── */}
      <section id="webinars" className="py-24 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 border-[60px] border-forest-700 rounded-full opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label text-forest-400 mb-4">Live Webinars</div>
              <h2 className="font-display text-5xl text-white font-bold mb-6 leading-tight">
                Host a Talk or <br />
                <em className="italic text-forest-400">Webinar</em>
              </h2>
              <p className="font-body text-forest-300 text-lg leading-relaxed mb-8 max-w-lg">
                Are you an alumnus with expertise to share? Schedule a live session for students
                and fellow graduates. We handle the platform — you bring the knowledge.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portal" className="btn-primary flex items-center gap-2 bg-white text-forest-900 hover:bg-forest-50">
                  Schedule a Session <Mic size={15} />
                </Link>
                <a href="#sessions" className="btn-outline border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white hover:border-forest-800 flex items-center gap-2">
                  View Schedule
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Globe, title: 'Global Reach', desc: 'Sessions broadcast to alumni in 85+ countries via Zoom & YouTube Live' },
                { icon: Video, title: 'Recorded & Archived', desc: 'Every session is recorded and added to the MISTAS knowledge archive' },
                { icon: TrendingUp, title: 'Build Your Profile', desc: 'Speaking at MISTAS events is recognized in your alumni portal profile' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-forest-800/50 border border-forest-700 p-6 flex gap-4"
                >
                  <div className="w-10 h-10 bg-forest-700 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-forest-300" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white mb-1">{title}</h4>
                    <p className="font-sans text-sm text-forest-400 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
