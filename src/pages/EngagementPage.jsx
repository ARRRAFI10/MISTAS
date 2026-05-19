import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, BookOpen, Video, MessageSquare, ArrowRight, CheckCircle,
  Calendar, ChevronRight, Handshake, Lightbulb, Star, Clock,
  Globe, Mail, MapPin, Mic, PenSquare, Rss, TrendingUp, Award, X, ThumbsUp, Share2
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
    id: 1,
    title: 'How I landed a FAANG job from Dhaka — My 8-month journey',
    author: 'Nazmus Sakib',
    dept: 'CSE',
    batch: '2012',
    category: 'Career',
    excerpt: 'From late-night LeetCode sessions to negotiating a $180K package — a raw, step-by-step account of everything that worked and what didn\'t in my FAANG journey from Dhaka.',
    reads: 1240,
    comments: 47,
    hot: true,
    featured: true,
    readTime: '12 min',
    tags: ['FAANG', 'Interview Prep', 'Abroad'],
  },
  {
    id: 2,
    title: 'GRE preparation resources for MIST graduates heading to the US',
    author: 'Dr. Tahmina Rahman',
    dept: 'CSE',
    batch: '2005',
    category: 'Higher Studies',
    excerpt: 'A curated list of free and paid resources, study schedules, and score targets that helped me gain admission to top-10 US grad programs as a MIST alumna.',
    reads: 892,
    comments: 31,
    hot: false,
    featured: false,
    readTime: '8 min',
    tags: ['GRE', 'Grad School', 'USA'],
  },
  {
    id: 3,
    title: 'PE Exam (USA) — A complete guide for Bangladeshi Civil Engineers',
    author: 'Eng. Farid Hossain',
    dept: 'CE',
    batch: '1998',
    category: 'Certifications',
    excerpt: 'Everything you need to know about the PE exam pathway, state licensing boards, and how your MIST civil engineering degree translates to US professional credentials.',
    reads: 673,
    comments: 22,
    hot: false,
    featured: false,
    readTime: '10 min',
    tags: ['PE Exam', 'Civil Eng.', 'USA License'],
  },
  {
    id: 4,
    title: 'Starting a tech startup from Bangladesh — lessons learned',
    author: 'Arif Hossain',
    dept: 'CSE',
    batch: '2010',
    category: 'Entrepreneurship',
    excerpt: 'Three failed pivots, one successful exit, and what I wish I knew before founding DataBridge AI. Honest lessons on fundraising, team-building, and Bangladesh\'s startup ecosystem.',
    reads: 1105,
    comments: 58,
    hot: true,
    featured: false,
    readTime: '15 min',
    tags: ['Startup', 'Fundraising', 'AI'],
  },
  {
    id: 5,
    title: 'Women in STEM at MIST and beyond — breaking barriers',
    author: 'Lt. Col. Shirin Akter',
    dept: 'Naval',
    batch: '2006',
    category: 'Career',
    excerpt: 'From being one of five women in my batch to leading engineering divisions in the Bangladesh Navy — a journey through stereotypes, breakthroughs, and the power of community.',
    reads: 780,
    comments: 35,
    hot: false,
    featured: false,
    readTime: '9 min',
    tags: ['Women in STEM', 'Leadership', 'Military'],
  },
  {
    id: 6,
    title: 'Research vs Industry — making the right choice after MIST',
    author: 'Dr. Anika Sultana',
    dept: 'ME',
    batch: '2007',
    category: 'Career',
    excerpt: 'After 7 years at MIT Lincoln Lab, here\'s my framework for weighing research vs industry for fresh MIST graduates. The answer depends on more than just salary.',
    reads: 950,
    comments: 41,
    hot: true,
    featured: false,
    readTime: '11 min',
    tags: ['Research', 'Industry', 'Career Path'],
  },
]

const discussionCategories = ['All', 'Career', 'Higher Studies', 'Certifications', 'Entrepreneurship']

const postDiscussions = {
  1: [
    { id: 1, author: 'Tanvir Ahmed', dept: 'CSE', batch: '2015', initials: 'TA', time: '2 days ago', likes: 14, text: 'This is incredibly helpful! How did you handle the system design rounds specifically? I\'ve been struggling with distributed systems questions.', isAuthor: false },
    { id: 2, author: 'Nadia Islam', dept: 'EEE', batch: '2018', initials: 'NI', time: '1 day ago', likes: 9, text: 'The negotiation part really resonated. Most of us undervalue ourselves when it comes to offers from abroad.', isAuthor: false },
    { id: 3, author: 'Nazmus Sakib', dept: 'CSE', batch: '2012', initials: 'NS', time: '23h ago', likes: 31, text: 'For system design I relied on Grokking the System Design Interview and drew analogies from our distributed systems coursework at MIST. Happy to do a follow-up post on that!', isAuthor: true },
    { id: 4, author: 'Rashed Khan', dept: 'CSE', batch: '2016', initials: 'RK', time: '18h ago', likes: 5, text: 'Did your MIST CGPA matter at all during the process? I\'m worried mine might be too low for the resume screen.', isAuthor: false },
  ],
  2: [
    { id: 1, author: 'Farhana Haque', dept: 'CSE', batch: '2019', initials: 'FH', time: '5 days ago', likes: 7, text: 'Would these resources also work for MS in Canada or UK, or are they specifically for the US GRE track?', isAuthor: false },
    { id: 2, author: 'Dr. Tahmina Rahman', dept: 'CSE', batch: '2005', initials: 'TR', time: '4 days ago', likes: 22, text: 'Most are US-focused but Magoosh and the ETS official guide are universally useful. UK programs often don\'t require GRE at all — check each university\'s specific requirements!', isAuthor: true },
    { id: 3, author: 'Imran Hossain', dept: 'ME', batch: '2017', initials: 'IH', time: '3 days ago', likes: 11, text: 'I used Manhattan Prep and scored 328. Can confirm the 60-day schedule in this post is doable if you\'re disciplined about it.', isAuthor: false },
  ],
  3: [
    { id: 1, author: 'Sajid Alam', dept: 'CE', batch: '2008', initials: 'SA', time: '1 week ago', likes: 8, text: 'Which US states are most accessible for Bangladeshi CE graduates in terms of license reciprocity and credential recognition?', isAuthor: false },
    { id: 2, author: 'Eng. Farid Hossain', dept: 'CE', batch: '1998', initials: 'FH', time: '6 days ago', likes: 19, text: 'Texas, Florida, and Georgia are generally more accessible. NCEES credential evaluation is your mandatory first step regardless of state. I can share my evaluation report template.', isAuthor: true },
    { id: 3, author: 'Mithila Chowdhury', dept: 'CE', batch: '2011', initials: 'MC', time: '5 days ago', likes: 12, text: 'Currently going through this process in Virginia. Happy to share my timeline and paperwork checklist if anyone needs it — took me 14 months from MIST transcript to PE stamp.', isAuthor: false },
  ],
  4: [
    { id: 1, author: 'Sabbir Rahman', dept: 'CSE', batch: '2013', initials: 'SR', time: '3 days ago', likes: 13, text: 'What was the fundraising environment like for a Dhaka-based AI startup in 2020-21? I\'m thinking of starting something similar now.', isAuthor: false },
    { id: 2, author: 'Zainab Ahmed', dept: 'CSE', batch: '2014', initials: 'ZA', time: '2 days ago', likes: 20, text: 'The pivot stories are what I needed to read. We keep romanticizing startups and forgetting that failure is part of the process.', isAuthor: false },
    { id: 3, author: 'Arif Hossain', dept: 'CSE', batch: '2010', initials: 'AH', time: '1 day ago', likes: 37, text: 'Local angels were scarce in 2020. We had to go to Singapore-based VCs for our seed round. The ecosystem has improved significantly since — BD Venture and others are much more active now.', isAuthor: true },
  ],
  5: [
    { id: 1, author: 'Mehnaz Parveen', dept: 'CSE', batch: '2020', initials: 'MP', time: '4 days ago', likes: 17, text: 'As a current female student at MIST, this is so inspiring. Did you face any specific institutional challenges during your time here?', isAuthor: false },
    { id: 2, author: 'Lt. Col. Shirin Akter', dept: 'Naval', batch: '2006', initials: 'SA', time: '3 days ago', likes: 41, text: 'Being taken seriously in the cadet culture was the hardest part. But the technical rigor at MIST prepared me better than my peers expected. Proving that through consistent work is the most powerful response.', isAuthor: true },
    { id: 3, author: 'Sadia Malik', dept: 'EEE', batch: '2016', initials: 'SM', time: '2 days ago', likes: 15, text: 'The MISTAS Women in STEM initiative started because of stories like this. We\'re building a mentorship sub-group specifically for female alumni and current students.', isAuthor: false },
  ],
  6: [
    { id: 1, author: 'Hasan Mahmud', dept: 'ME', batch: '2018', initials: 'HM', time: '6 days ago', likes: 10, text: 'How do you handle the publish-or-perish culture in research while also wanting financial stability early in your career?', isAuthor: false },
    { id: 2, author: 'Karim Uddin', dept: 'CSE', batch: '2019', initials: 'KU', time: '5 days ago', likes: 8, text: 'A comparison of progression timelines in both paths would be really helpful. How long to reach "senior" level in each track?', isAuthor: false },
    { id: 3, author: 'Dr. Anika Sultana', dept: 'ME', batch: '2007', initials: 'AS', time: '4 days ago', likes: 29, text: 'In research you trade early salary for intellectual freedom and long-term impact. At senior researcher level (~year 8-10) compensation is competitive with industry. I\'ll do a follow-up with a full timeline comparison!', isAuthor: true },
  ],
}

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
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [replyText, setReplyText] = useState('')

  const featuredPost = activeCategory === 'All' ? forumPosts.find(p => p.featured) : null
  const filteredPosts = forumPosts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesCategory && !(activeCategory === 'All' && p.featured)
  })

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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <SectionHeader
              label="Knowledge Hub"
              title="Alumni Insights & Discussions"
              subtitle="A curated forum where MIST graduates share career insights, guides, and experiences."
            />
            <Link to="/community#forum" className="mb-12 hidden md:flex items-center gap-2 text-sm font-sans font-medium text-forest-700 animated-underline">
              Enter Forum <ArrowRight size={14} />
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {discussionCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-forest-800 text-white border-forest-800'
                    : 'bg-white text-forest-500 border-forest-200 hover:border-forest-400 hover:text-forest-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPost(featuredPost)}
              className="mb-8 group p-8 border-2 border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-xl transition-all duration-300 cursor-pointer bg-forest-50/30 relative overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                <span className="text-[9px] font-mono tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5">Featured</span>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-forest-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb size={20} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest-600 bg-forest-100 border border-forest-200 px-2 py-0.5">{featuredPost.category}</span>
                    <span className="text-[10px] font-sans text-forest-400 flex items-center gap-1"><Clock size={10} /> {featuredPost.readTime} read</span>
                    {featuredPost.hot && (
                      <span className="text-[9px] font-mono tracking-widest uppercase text-red-500 bg-red-50 border border-red-100 px-2 py-0.5">Trending</span>
                    )}
                  </div>
                  <h3 className="font-sans font-bold text-forest-900 text-xl mb-3 group-hover:text-forest-700 transition-colors">{featuredPost.title}</h3>
                  <p className="font-body text-forest-500 text-sm leading-relaxed mb-4 max-w-3xl">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-forest-500 bg-white border border-forest-200 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-forest-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-white">{featuredPost.author.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="font-sans text-xs text-forest-600 font-medium">{featuredPost.author} · {featuredPost.dept} {featuredPost.batch}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-5 text-xs text-forest-400 flex-shrink-0">
                      <span className="flex items-center gap-1.5"><Rss size={11} /> {featuredPost.reads.toLocaleString()} reads</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {featuredPost.comments} comments</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 group-hover:translate-x-1 transition-transform mt-2" />
              </div>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedPost(post)}
              className="group flex items-start gap-5 p-6 border border-forest-100 rounded-2xl hover:border-forest-300 hover:bg-forest-50/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 bg-forest-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PenSquare size={16} className="text-forest-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {post.hot && (
                      <span className="text-[9px] font-mono tracking-widest uppercase text-red-500 bg-red-50 border border-red-100 px-2 py-0.5">Trending</span>
                    )}
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest-400 bg-forest-50 border border-forest-100 px-2 py-0.5">{post.category}</span>
                    <span className="text-[10px] font-sans text-forest-400 flex items-center gap-1"><Clock size={9} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-forest-900 group-hover:text-forest-700 transition-colors mb-1.5">{post.title}</h3>
                  <p className="font-body text-forest-400 text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-sans text-xs text-forest-400">{post.author} · {post.dept} {post.batch}</p>
                    <div className="hidden md:flex items-center gap-4 text-xs text-forest-400 flex-shrink-0">
                      <span className="flex items-center gap-1.5"><Rss size={11} /> {post.reads.toLocaleString()}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {post.comments}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-forest-400 bg-forest-50 border border-forest-100 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
                <ChevronRight size={16} className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 group-hover:translate-x-1 transition-transform mt-1.5" />
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

      {/* ── Discussion Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedPost(null); setReplyText('') }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-start justify-between p-8 pb-6 border-b border-forest-100 flex-shrink-0">
                <div className="flex-1 pr-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest-600 bg-forest-100 border border-forest-200 px-2 py-0.5">{selectedPost.category}</span>
                    <span className="text-[10px] font-sans text-forest-400 flex items-center gap-1"><Clock size={10} /> {selectedPost.readTime} read</span>
                    {selectedPost.hot && <span className="text-[9px] font-mono tracking-widest uppercase text-red-500 bg-red-50 border border-red-100 px-2 py-0.5">Trending</span>}
                  </div>
                  <h2 className="font-sans font-bold text-forest-900 text-xl leading-snug">{selectedPost.title}</h2>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-7 h-7 bg-forest-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-white">
                        {selectedPost.author.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-forest-500">{selectedPost.author} · {selectedPost.dept} {selectedPost.batch}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedPost(null); setReplyText('') }}
                  className="text-forest-400 hover:text-forest-800 transition-colors p-1 flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto">
                {/* Post excerpt & meta */}
                <div className="p-8 border-b border-forest-50">
                  <p className="font-body text-forest-600 text-sm leading-relaxed mb-5">{selectedPost.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-forest-500 bg-forest-50 border border-forest-100 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-xs text-forest-400 font-sans">
                    <span className="flex items-center gap-1.5"><Rss size={11} /> {selectedPost.reads.toLocaleString()} reads</span>
                    <span className="flex items-center gap-1.5"><MessageSquare size={11} /> {selectedPost.comments} comments</span>
                    <button className="flex items-center gap-1.5 hover:text-forest-700 transition-colors ml-auto">
                      <Share2 size={11} /> Share
                    </button>
                  </div>
                </div>

                {/* Thread */}
                <div className="p-8">
                  <h3 className="font-sans font-bold text-forest-900 text-sm mb-6 flex items-center gap-2">
                    <MessageSquare size={14} className="text-forest-500" />
                    Discussion
                    <span className="text-forest-400 font-normal">({(postDiscussions[selectedPost.id] || []).length} comments)</span>
                  </h3>

                  <div className="space-y-6">
                    {(postDiscussions[selectedPost.id] || []).map((comment) => (
                      <div
                        key={comment.id}
                        className={`flex gap-4 ${comment.isAuthor ? 'bg-forest-50 -mx-2 px-4 py-4 rounded-xl border border-forest-100' : ''}`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${comment.isAuthor ? 'bg-forest-700' : 'bg-forest-100'}`}>
                          <span className={`text-[10px] font-bold ${comment.isAuthor ? 'text-white' : 'text-forest-600'}`}>{comment.initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="font-sans text-xs font-semibold text-forest-800">{comment.author}</span>
                            {comment.isAuthor && (
                              <span className="text-[9px] font-mono tracking-widest uppercase text-forest-600 bg-forest-100 border border-forest-200 px-1.5 py-0.5">Author</span>
                            )}
                            <span className="font-mono text-[10px] text-forest-400">{comment.dept} {comment.batch}</span>
                            <span className="font-sans text-[10px] text-forest-300 ml-auto">{comment.time}</span>
                          </div>
                          <p className="font-body text-sm text-forest-600 leading-relaxed">{comment.text}</p>
                          <button className="flex items-center gap-1 mt-2 text-[10px] font-sans text-forest-400 hover:text-forest-700 transition-colors">
                            <ThumbsUp size={10} /> {comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reply Input */}
              <div className="p-6 border-t border-forest-100 bg-forest-50/50 flex-shrink-0">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-forest-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-white">You</span>
                  </div>
                  <div className="flex-1 flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Share your thoughts or ask a question..."
                      className="flex-1 border border-forest-200 bg-white px-4 py-2.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors"
                      onKeyDown={e => { if (e.key === 'Enter' && replyText.trim()) setReplyText('') }}
                    />
                    <button
                      onClick={() => setReplyText('')}
                      disabled={!replyText.trim()}
                      className="bg-forest-700 text-white px-4 py-2.5 text-xs font-mono tracking-widest uppercase hover:bg-forest-800 transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
