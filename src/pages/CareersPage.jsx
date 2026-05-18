import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase, Search, MapPin, Clock, ArrowRight, Filter,
  Building2, BookOpen, Star, ChevronRight, Send, Upload,
  TrendingUp, Users, Globe, Download, ExternalLink, Award, Zap
} from 'lucide-react'
import { Section, SectionHeader, Tag } from '../components/ui'

const jobTypes = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract']
const jobCategories = ['All Fields', 'Software Engineering', 'Civil Engineering', 'Electrical Engg.', 'Research', 'Management', 'Defense', 'Entrepreneurship']

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'bKash Limited',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    category: 'Software Engineering',
    posted: '2 days ago',
    salary: 'BDT 1.5–2.5L/mo',
    postedBy: 'Nazmus Sakib · CSE 2012',
    tags: ['React', 'Node.js', 'AWS'],
    featured: true,
  },
  {
    id: 2,
    title: 'Structural Design Engineer',
    company: 'Louis Berger Group',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time',
    category: 'Civil Engineering',
    posted: '4 days ago',
    salary: '$4,000–$6,500/mo',
    postedBy: 'Eng. Farid Hossain · CE 1998',
    tags: ['ETABS', 'AutoCAD', 'Bridge Design'],
    featured: false,
  },
  {
    id: 3,
    title: 'AI Research Scientist',
    company: 'Samsung Research',
    location: 'Seoul, South Korea (Remote ok)',
    type: 'Full-time',
    category: 'Research',
    posted: '1 week ago',
    salary: 'KRW 80–120M/yr',
    postedBy: 'Eng. Reza Chowdhury · EEE 2005',
    tags: ['Deep Learning', 'PyTorch', 'NLP'],
    featured: true,
  },
  {
    id: 4,
    title: 'Electrical Project Engineer',
    company: 'GE Power Bangladesh',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    category: 'Electrical Engg.',
    posted: '3 days ago',
    salary: 'BDT 80–140K/mo',
    postedBy: 'Dr. Lubna Khatun · EEE 2000',
    tags: ['HV Systems', 'SCADA', 'PLC'],
    featured: false,
  },
  {
    id: 5,
    title: 'Lead Product Manager',
    company: 'Pathao',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    category: 'Management',
    posted: '5 days ago',
    salary: 'BDT 1.2–2.0L/mo',
    postedBy: 'Arif Hossain · CSE 2010',
    tags: ['Product Strategy', 'Agile', 'Data-driven'],
    featured: false,
  },
  {
    id: 6,
    title: 'Defense Systems Analyst (Intern → FT)',
    company: 'DESO, UK MoD',
    location: 'London, UK',
    type: 'Full-time',
    category: 'Defense',
    posted: '1 week ago',
    salary: '£40–55K/yr',
    postedBy: 'Dr. Anika Sultana · ME 2007',
    tags: ['Systems Analysis', 'Defence Policy', 'Clearance Required'],
    featured: false,
  },
]

const internships = [
  { company: 'Grameenphone', role: 'Network Engineering Intern', duration: '3 months', stipend: 'BDT 25K/mo', deadline: 'Jun 1, 2025', dept: 'EEE/CSE' },
  { company: 'BJIT Group', role: 'Software Development Intern', duration: '6 months', stipend: 'BDT 20K/mo', deadline: 'May 25, 2025', dept: 'CSE' },
  { company: 'LGED Bangladesh', role: 'Civil Engineering Intern', duration: '3 months', stipend: 'BDT 15K/mo', deadline: 'Jun 15, 2025', dept: 'CE' },
  { company: 'Huawei Bangladesh', role: 'R&D Intern', duration: '4 months', stipend: 'BDT 30K/mo', deadline: 'May 30, 2025', dept: 'EEE/CSE' },
]

const resources = [
  { title: 'MIST CV Template — ATS Optimized', type: 'PDF', size: '340 KB', downloads: 2840, icon: Download },
  { title: 'Interview Prep Guide — Engg. Roles', type: 'PDF', size: '1.2 MB', downloads: 1920, icon: BookOpen },
  { title: 'GRE & IELTS Resource Pack', type: 'ZIP', size: '8.4 MB', downloads: 3150, icon: Globe },
  { title: 'LinkedIn Profile Optimization Checklist', type: 'PDF', size: '180 KB', downloads: 4200, icon: TrendingUp },
]

export default function CareersPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCat, setSelectedCat] = useState('All Fields')

  const filtered = jobs.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchType = selectedType === 'All' || j.type === selectedType
    const matchCat = selectedCat === 'All Fields' || j.category === selectedCat
    return matchSearch && matchType && matchCat
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
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col justify-around py-12 pl-16 pr-6 gap-4"
          >
            {['Software Engineer · Google', 'Research Scientist · MIT', 'VP Engineering · Samsung', 'Civil Engineer · LGED', 'Co-Founder · Startup'].map((text, i) => (
              <div key={i} className="text-white font-mono text-xs tracking-widest opacity-70 truncate">
                ▸ {text}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 font-mono text-xs text-forest-500 mb-8 uppercase tracking-[0.4em]"
          >
            <span>Home</span>
            <div className="w-1 h-1 bg-forest-600 rounded-full" />
            <span className="text-forest-300">Career & Opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-display text-6xl md:text-7xl text-white mb-5 leading-tight font-bold max-w-2xl"
          >
            Your Next <br />
            <em className="italic text-forest-400">Career Move</em> <br />
            Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-forest-300 text-lg leading-relaxed mb-10 max-w-xl"
          >
            Jobs, internships, and referrals — all posted by MIST alumni.
            Exclusively for MISTians, built on trust.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex max-w-2xl bg-white/10 border border-white/20 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 flex-1 px-5">
              <Search size={18} className="text-forest-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, companies, roles..."
                className="flex-1 py-4 bg-transparent text-white placeholder-forest-400 text-sm font-sans focus:outline-none"
              />
            </div>
            <button className="bg-forest-500 hover:bg-forest-400 transition-colors px-8 text-sm font-sans font-bold text-white flex items-center gap-2">
              Search <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Stats strip */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-forest-800">
            {[
              { n: '186', label: 'Open Positions' },
              { n: '94', label: 'Companies Hiring' },
              { n: '42', label: 'Internships' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="font-display text-2xl text-white font-bold">{n}</div>
                <div className="font-mono text-xs text-forest-500 tracking-widest uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Job Portal ─────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white border border-zinc-100 p-6 sticky top-24 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans font-bold text-forest-900 flex items-center gap-2 text-sm">
                    <Filter size={15} className="text-forest-600" /> Filters
                  </h3>
                  <button
                    onClick={() => { setSelectedType('All'); setSelectedCat('All Fields') }}
                    className="text-[10px] font-mono text-forest-500 hover:text-forest-700"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-7">
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-forest-400 mb-3">Job Type</label>
                    <div className="space-y-2">
                      {jobTypes.map((t) => (
                        <label key={t} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => setSelectedType(t)}
                            className={`w-4 h-4 border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedType === t ? 'border-forest-600 bg-forest-600' : 'border-zinc-300 group-hover:border-forest-400'}`}
                          >
                            {selectedType === t && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="text-sm font-sans text-zinc-600 group-hover:text-forest-700 transition-colors">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-forest-400 mb-3">Field</label>
                    <div className="space-y-2">
                      {jobCategories.map((c) => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => setSelectedCat(c)}
                            className={`w-4 h-4 border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedCat === c ? 'border-forest-600 bg-forest-600' : 'border-zinc-300 group-hover:border-forest-400'}`}
                          >
                            {selectedCat === c && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="text-xs font-sans text-zinc-600 group-hover:text-forest-700 transition-colors leading-tight">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <Link to="/portal" className="w-full btn-primary flex items-center justify-center gap-2 text-xs">
                    Post a Job <Briefcase size={13} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-sans text-zinc-500">
                  <span className="font-bold text-zinc-900">{filtered.length}</span> jobs found
                </p>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Posted by Alumni</span>
              </div>

              <div className="space-y-4">
                {filtered.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`group bg-white border transition-all duration-300 hover:shadow-lg overflow-hidden ${job.featured ? 'border-forest-300 shadow-sm' : 'border-zinc-100 hover:border-forest-200'}`}
                  >
                    {job.featured && (
                      <div className="h-0.5 bg-gradient-to-r from-forest-700 via-forest-500 to-transparent" />
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Company Icon */}
                          <div className="w-12 h-12 bg-forest-50 border border-forest-100 flex items-center justify-center flex-shrink-0">
                            <Building2 size={20} className="text-forest-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-sans font-bold text-forest-900 group-hover:text-forest-700 transition-colors">{job.title}</h3>
                              {job.featured && (
                                <span className="text-[9px] font-mono tracking-widest uppercase text-gold-600 bg-yellow-50 border border-yellow-200 px-2 py-0.5">Featured</span>
                              )}
                            </div>
                            <p className="font-sans text-sm text-zinc-500">{job.company}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-400">
                              <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                              <span className="flex items-center gap-1"><Clock size={10} /> {job.posted}</span>
                              <span className="text-forest-600 font-medium">{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-forest-600 bg-forest-50 border border-forest-100 px-2.5 py-1">{job.type}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-sans text-zinc-500 bg-zinc-50 border border-zinc-100 px-2 py-0.5">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-sans text-zinc-400">via {job.postedBy}</span>
                          <button className="btn-primary text-xs py-2 px-5 rounded-xl flex items-center gap-1.5">
                            Apply Now <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-20 text-center bg-white border border-zinc-100">
                  <Search size={32} className="text-zinc-200 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-zinc-900 font-bold mb-2">No jobs found</h3>
                  <p className="text-zinc-400 font-sans text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ── Internship Opportunities ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Internships"
            title="Opportunities for Students"
            subtitle="Internship openings sourced and shared by MIST alumni across companies and institutions."
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
            {internships.map((intern, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden"
              >
                <div className="h-1 w-0 group-hover:w-full bg-gold-500 transition-all duration-500 absolute top-0 left-0" />
                <div className="p-6">
                  <div className="w-10 h-10 bg-forest-50 flex items-center justify-center mb-4">
                    <Building2 size={18} className="text-forest-600" />
                  </div>
                  <h3 className="font-sans font-bold text-forest-900 mb-1 leading-snug">{intern.role}</h3>
                  <p className="font-sans text-sm font-medium text-forest-600 mb-4">{intern.company}</p>
                  <div className="space-y-2 text-xs font-sans text-zinc-500 mb-5">
                    <div className="flex justify-between"><span>Duration</span><span className="text-zinc-700 font-medium">{intern.duration}</span></div>
                    <div className="flex justify-between"><span>Stipend</span><span className="text-forest-600 font-bold">{intern.stipend}</span></div>
                    <div className="flex justify-between"><span>Deadline</span><span className="text-red-500 font-medium">{intern.deadline}</span></div>
                    <div className="flex justify-between"><span>For</span><span className="text-zinc-700 font-medium">{intern.dept}</span></div>
                  </div>
                  <button className="w-full py-2.5 text-xs font-sans font-bold text-forest-700 border border-forest-200 hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-all duration-300 flex items-center justify-center gap-1.5">
                    Apply <Send size={11} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Referral System ───────────────────────────────────────── */}
      <section className="py-20 bg-forest-50 border-y border-forest-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label mb-4">Alumni Referral Network</div>
              <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-6 leading-tight">
                Know Someone Hiring? <br />
                <em className="italic text-forest-600">Refer a MISTian.</em>
              </h2>
              <p className="font-body text-forest-700 text-lg leading-relaxed mb-8 max-w-xl">
                Our referral system connects employers with trusted MIST talent.
                Alumni referrals are the fastest path to hire — and the most reliable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portal" className="btn-primary flex items-center gap-2">
                  Submit a Referral <Users size={15} />
                </Link>
                <Link to="/portal" className="btn-outline flex items-center gap-2">
                  Request a Referral
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Zap, stat: '320+', label: 'Referrals Made', desc: 'Alumni-to-alumni referrals placed this year' },
                { icon: Star, stat: '78%', label: 'Hire Rate', desc: 'Of referred candidates receive job offers' },
                { icon: Award, stat: '45+', label: 'Partner Companies', desc: 'Actively seeking MIST alumni candidates' },
              ].map(({ icon: Icon, stat, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-5 p-5 bg-white border border-forest-100 rounded-2xl hover:border-forest-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-forest-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-forest-300" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-display text-2xl font-bold text-forest-900">{stat}</span>
                      <span className="font-mono text-xs text-forest-500 tracking-widest uppercase">{label}</span>
                    </div>
                    <p className="font-sans text-sm text-forest-500">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Career Resources ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Career Resources"
            title="Free Downloads for MISTians"
            subtitle="Templates, guides, and toolkits to help you navigate your career — built by alumni, for alumni."
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-forest-100 rounded-2xl hover:border-forest-400 hover:shadow-xl transition-all duration-400 bg-white p-6 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-forest-50 -z-0 group-hover:bg-forest-100 transition-colors" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                <div className="relative">
                  <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center mb-5">
                    <res.icon size={16} className="text-white" />
                  </div>
                  <h3 className="font-sans font-bold text-forest-900 text-sm leading-snug mb-3 group-hover:text-forest-700 transition-colors">{res.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-forest-400 mb-5">
                    <span className="bg-forest-50 border border-forest-100 px-2 py-0.5 font-mono">{res.type}</span>
                    <span>{res.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-sans">{res.downloads.toLocaleString()} downloads</span>
                    <button className="w-8 h-8 bg-forest-900 flex items-center justify-center text-white hover:bg-forest-700 transition-colors">
                      <Download size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
