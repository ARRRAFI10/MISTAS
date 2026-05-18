import { useState, useEffect } from 'react'
import { Section, SectionHeader, Tag } from '../components/ui'
import { Shield, Eye, Target, BookOpen, Users, Award, MapPin, ChevronRight, Milestone } from 'lucide-react'
import { motion } from 'framer-motion'

const TAB_DEFS = [
  { id: 'association',  label: 'Association',  icon: Shield,    num: '01' },
  { id: 'mission',      label: 'Mission',      icon: Target,    num: '02' },
  { id: 'history',      label: 'History',      icon: Milestone, num: '03' },
  { id: 'council',      label: 'Council',      icon: Users,     num: '04' },
  { id: 'constitution', label: 'Constitution', icon: BookOpen,  num: '05' },
]

const objectives = [
  'Strengthen bonds among MIST graduates across generations and disciplines',
  'Facilitate knowledge transfer and mentorship between alumni and current students',
  'Promote professional development and career advancement of members',
  'Support MIST in its academic and institutional development',
  'Foster research collaboration and innovation among alumni networks',
  'Represent alumni interests in national and international forums',
  'Organize reunions, seminars, and events for community building',
  'Provide scholarships and financial support to deserving students',
]

const councilMembers = [
  { name: 'Major General Md Hakimuzzaman, SGP, ndc, afwc, psc', role: 'President', batch: 'CE-02', initials: 'HK' },
  { name: 'Brig. Gen. (Retd.) Nasir Ahmed', role: 'Vice President', batch: 'EEE-1997', initials: 'NA' },
  { name: 'Col. (Retd.) Farid Hossain', role: 'Secretary General', batch: 'ME-1998', initials: 'FH' },
  { name: 'Dr. Lubna Khatun', role: 'Joint Secretary', batch: 'CSE-2000', initials: 'LK' },
  { name: 'Eng. Imran Shah', role: 'Treasurer', batch: 'CE-2001', initials: 'IS' },
  { name: 'Dr. Tania Islam', role: 'Cultural Secretary', batch: 'EEE-2002', initials: 'TI' },
]

const GraduationCap = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v5" /></svg>
)

const milestones = [
  { year: '1998', event: 'MIST Founded by the Bangladesh Army', icon: Shield },
  { year: '2002', event: 'First batch of graduates — 68 engineers', icon: GraduationCap },
  { year: '2004', event: 'MISTAS formally established', icon: Milestone },
  { year: '2008', event: 'First annual reunion event with 500+ attendees', icon: Users },
  { year: '2012', event: 'International chapter launched in North America', icon: MapPin },
  { year: '2016', event: '5,000 alumni milestone reached', icon: Award },
  { year: '2019', event: 'Digital portal and online directory launched', icon: BookOpen },
  { year: '2024', event: '12,000+ alumni across 85+ countries', icon: Target },
]


export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('association')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveTab(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -60% 0px' }
    )
    TAB_DEFS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Page Header - Classic with Animation */}
      <div className="bg-forest-950 pt-24 pb-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Decorative architectural circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -right-24 -top-24 w-96 h-96 border-[40px] border-white rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 font-mono text-xs text-forest-500 mb-8 uppercase tracking-[0.4em]"
          >
            <span>Home</span>
            <div className="w-1 h-1 bg-forest-600 rounded-full" />
            <span className="text-forest-300">About the Association</span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-display text-6xl md:text-8xl text-white mb-8 leading-tight font-bold"
          >
            Legacy & <em className="italic text-forest-400 font-serif">Community</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-body text-forest-300 text-xl max-w-2xl mx-auto leading-relaxed border-t border-forest-800 pt-8"
          >
            Building the strongest bridge between MIST's glorious past and its limitless future. Discover the spirit of MISTAS.
          </motion.p>
        </div>

        {/* Tab nav - anchored at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex divide-x divide-white/5 overflow-x-auto no-scrollbar">
              {TAB_DEFS.map(({ id, label, icon: Icon, num }) => {
                const isActive = activeTab === id
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group relative flex flex-col items-start gap-1.5 px-6 py-4 min-w-[110px] flex-1 text-left transition-colors"
                  >
                    {/* Active accent bar */}
                    <span
                      className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                        isActive ? 'bg-forest-400 opacity-100' : 'bg-transparent opacity-0'
                      }`}
                    />
                    {/* Number */}
                    <span className={`font-display text-2xl font-bold leading-none transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-forest-600 group-hover:text-forest-400'
                    }`}>
                      {num}
                    </span>
                    {/* Icon + Label row */}
                    <span className="flex items-center gap-1.5">
                      <Icon size={11} className={`transition-colors duration-300 ${
                        isActive ? 'text-forest-400' : 'text-forest-500 group-hover:text-forest-300'
                      }`} />
                      <span className={`font-mono text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                        isActive ? 'text-forest-300' : 'text-forest-500 group-hover:text-forest-300'
                      }`}>
                        {label}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section id="association" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="mb-10">
                <div className="w-12 h-0.5 bg-forest-600 mb-6" />
                <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-6">MIST Alumni Association</h2>
                <div className="space-y-6 font-body text-forest-700 text-lg leading-relaxed">
                  <p>
                    The Military Institute of Science and Technology (MIST) Alumni Association — known as MISTAS — is the official body representing graduates of MIST, one of Bangladesh's premier technical institutions.
                  </p>
                  <p>
                    Founded in 2004, MISTAS has grown into a vibrant, global network of over 12,000 engineers, officers, researchers, and leaders serving in military, civil service, and private sectors across the globe.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { icon: Users, label: 'Alumni Base', value: '12,847+' },
                  { icon: Award, label: 'Excellence', value: '25 Years' },
                  { icon: MapPin, label: 'Countries', value: '85+' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-bold text-forest-800 mb-1">{value}</div>
                    <div className="font-mono text-[10px] text-forest-400 tracking-widest uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative p-1 border border-forest-100 rounded-2xl overflow-hidden shadow-2xl group">
                <div className="aspect-[4/5] bg-forest-900 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=600"
                    alt="MIST Campus"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute bottom-8 -left-8 bg-white p-6 shadow-xl max-w-[240px] rounded-2xl hidden md:block border border-forest-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center text-white">
                      <Users size={14} />
                    </div>
                    <span className="font-display font-bold text-forest-900">MISTAS Portal</span>
                  </div>
                  <p className="text-xs text-forest-600 font-sans leading-relaxed">
                    Connecting thousands of graduates across disciplines and generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision - Unique Overlapping Design */}
      <Section id="mission" className="py-24 bg-forest-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-forest-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs tracking-[0.4em] uppercase text-forest-500 mb-3">Foundation</div>
            <h2 className="font-display text-4xl text-forest-900 font-bold">Mission & Vision</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 relative">
            {/* Mission Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-2xl shadow-sm border border-forest-100 relative group"
            >
              <div className="absolute -top-10 right-10 font-display text-[120px] font-bold text-forest-50/50 pointer-events-none group-hover:text-forest-100 transition-colors">M</div>
              <div className="w-16 h-16 bg-forest-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-forest-200">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="font-display text-3xl text-forest-900 font-bold mb-6">Our Mission</h3>
              <p className="font-body text-forest-700 text-lg leading-relaxed">
                To unite and empower MIST graduates through a strong, inclusive, and dynamic alumni network — enabling professional growth, knowledge sharing, and meaningful contribution to national development and the global community.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-forest-900 p-12 rounded-2xl shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute -top-10 right-10 font-display text-[120px] font-bold text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">V</div>
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="font-display text-3xl text-white font-bold mb-6">Our Vision</h3>
              <p className="font-body text-forest-200 text-lg leading-relaxed">
                To be the most impactful alumni association in technical education — a global network of excellence that elevates the MIST brand, supports its students, and contributes to international technological progress.
              </p>
              {/* Decorative light effect */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-forest-500/20 rounded-full blur-[80px]" />
            </motion.div>
          </div>

          {/* Objectives - Unique Grid */}
          <div className="mt-20">
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-forest-100">
              <div className="flex items-center gap-4 mb-12">
                <Shield size={24} className="text-forest-600" />
                <h3 className="font-display text-2xl text-forest-900 font-bold uppercase tracking-wider">Strategic Objectives</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center shrink-0 group-hover:bg-forest-700 transition-colors">
                      <span className="font-mono text-[10px] text-forest-500 group-hover:text-white font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-forest-700 leading-relaxed group-hover:text-forest-900 transition-colors font-medium">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* History - Roadmap Design */}
      <Section id="history" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <SectionHeader label="History" title="The MIST Roadmap" center />
          </div>

          <div className="relative px-4">
            {/* The winding roadmap line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-forest-50 hidden lg:block" />

            <div className="space-y-24 relative">
              {milestones.map(({ year, event, icon: Icon }, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Event Content */}
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <motion.div
                      initial={{ x: i % 2 === 0 ? 50 : -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`inline-block bg-white p-8 rounded-2xl shadow-sm border border-forest-100 ${i % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} hover:shadow-xl hover:border-forest-200 transition-all cursor-default`}
                    >
                      <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                        <div className="w-10 h-10 bg-forest-50 text-forest-700 rounded-xl flex items-center justify-center">
                          <Icon size={20} />
                        </div>
                        <span className="font-display text-2xl font-black text-forest-900 tracking-tighter">{year}</span>
                      </div>
                      <p className="font-body text-forest-700 leading-relaxed text-lg">
                        {event}
                      </p>
                    </motion.div>
                  </div>

                  {/* Roadmap Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-forest-600 shadow-xl z-10">
                    <div className="w-3 h-3 bg-forest-600 rounded-full animate-pulse" />
                  </div>

                  {/* Spacing for layout balance */}
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Council - Circular Photo Holders */}
      <Section id="council" className="py-24 bg-zinc-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Governance"
            title="Executive Council"
            subtitle="The leadership team dedicated to serving the alumni network."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {councilMembers.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-zinc-200 hover:border-forest-500 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center group"
              >
                {/* Circular Photo/Initials Holder */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-forest-50 border-2 border-forest-100 flex items-center justify-center group-hover:border-forest-500 group-hover:bg-forest-900 transition-all duration-500 p-1.5 overflow-hidden shadow-inner">
                    <div className="w-full h-full rounded-full bg-forest-800 flex items-center justify-center group-hover:scale-95 transition-transform">
                      <span className="font-display text-2xl text-white font-bold group-hover:scale-125 transition-transform duration-300">{member.initials}</span>
                    </div>
                  </div>
                  {/* Decorative tag */}
                  <div className="absolute -bottom-2 right-0 bg-forest-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                    <Shield size={12} />
                  </div>
                </div>

                <h3 className="font-sans font-bold text-lg text-forest-900 mb-1 group-hover:text-forest-700 transition-colors leading-tight">
                  {member.name}
                </h3>

                <div className="inline-block mt-2 mb-4">
                  <span className="px-4 py-1.5 bg-forest-50 text-forest-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-forest-100">
                    {member.role}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 w-full flex items-center justify-center gap-2">
                  <Milestone size={14} className="text-forest-400" />
                  <span className="font-mono text-xs text-forest-500 font-medium tracking-wider">{member.batch}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Constitution CTA */}
      <section id="constitution" className="py-20 bg-forest-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-forest-700 text-forest-200 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Founding Document</div>
              <h3 className="font-display text-4xl text-white font-bold mb-6 leading-tight">The MISTAS Constitution</h3>
              <p className="font-body text-lg text-forest-200/80 leading-relaxed">
                The charter that defines our mission, structure, and the democratic principles that guide our global association.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="btn-primary flex items-center gap-3 whitespace-nowrap bg-white text-forest-900 hover:bg-forest-50 px-10 py-5 text-base shadow-2xl"
            >
              <BookOpen size={20} />
              Download PDF
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
