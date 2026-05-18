import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight, MapPin, Award, GraduationCap, Linkedin,
  ArrowLeft, Star, Building2, Calendar,
} from 'lucide-react'
import { ALUMNI, cfg } from '../data/alumni'

export default function AlumniProfilePage() {
  const { id } = useParams()
  const alumni = ALUMNI.find(a => a.id === Number(id))

  if (!alumni) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h1 className="font-display text-4xl text-forest-900 font-bold mb-4">Profile Not Found</h1>
          <p className="font-sans text-forest-500 mb-6">This alumni profile does not exist.</p>
          <Link to="/directory" className="btn-primary inline-flex items-center gap-2">
            Back to Directory <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  const c = cfg(alumni.dept)
  const currentIndex = ALUMNI.findIndex(a => a.id === alumni.id)
  const prev = ALUMNI[currentIndex - 1] || null
  const next = ALUMNI[currentIndex + 1] || null

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute -right-40 -top-40 w-[600px] h-[600px] border-[70px] border-forest-400 rounded-full pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 pb-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-forest-500 mb-10"
          >
            <Link to="/" className="hover:text-forest-300 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/directory" className="hover:text-forest-300 transition-colors">Directory</Link>
            <ChevronRight size={10} />
            <span className="text-forest-300 truncate max-w-[200px]">{alumni.name}</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">

            {/* Photo / Avatar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="relative">
                {alumni.image ? (
                  <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                    <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[3/4] ${c.bg} flex items-center justify-center shadow-2xl`}>
                    <span className="font-display text-7xl font-bold text-white/90">{alumni.initials}</span>
                  </div>
                )}
                {alumni.notable && (
                  <div className="absolute -top-3 -right-3 bg-amber-400 text-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                    <Star size={11} fill="white" />
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase">Notable</span>
                  </div>
                )}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${c.bg}`} />
              </div>
            </motion.div>

            {/* Main info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-9"
            >
              {/* Dept + Batch tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`${c.bg} text-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase rounded-full`}>
                  {c.label}
                </span>
                <span className="bg-forest-800 text-forest-300 px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded-full">
                  Batch {alumni.batch}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                {alumni.name}
              </h1>

              {/* Role + Company */}
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={14} className="text-forest-400 flex-shrink-0" />
                <p className="font-body text-forest-200 text-lg">
                  {alumni.role}&ensp;&mdash;&ensp;<span className="text-forest-400">{alumni.company}</span>
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-forest-400 text-sm font-sans mb-8">
                <MapPin size={12} />
                {alumni.location}, {alumni.country}
              </div>

              {/* Bio */}
              <div className="border-l-2 border-forest-600 pl-5 mb-7 max-w-2xl">
                <p className="font-body text-forest-300 text-base leading-relaxed">{alumni.bio}</p>
              </div>

              {/* Award */}
              {alumni.award && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-5 py-3 mb-8"
                >
                  <Award size={15} className="text-amber-400 flex-shrink-0" />
                  <span className="font-sans text-sm text-amber-300">{alumni.award}</span>
                </motion.div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {alumni.linkedin && (
                  <a
                    href={alumni.linkedin}
                    onClick={e => e.preventDefault()}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Linkedin size={14} /> Connect on LinkedIn
                  </a>
                )}
                <Link
                  to="/contact"
                  className="btn-outline border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white hover:border-forest-800 flex items-center gap-2"
                >
                  Send Message
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ellipse transition edge */}
        <div className="h-10 bg-white" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} />
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Main: Timeline · Education · Skills */}
          <div className="lg:col-span-8 space-y-16">

            {/* Career Timeline */}
            {alumni.career?.length > 0 && <section>
              <div className="flex items-center gap-5 mb-8">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 whitespace-nowrap">Career</span>
                <div className="flex-1 border-t border-forest-100" />
                <h2 className="font-display text-2xl font-bold text-forest-900 whitespace-nowrap">Professional Journey</h2>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-forest-100" />

                <div className="space-y-6">
                  {[...(alumni.career ?? [])].reverse().map((job, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-9"
                    >
                      {/* Dot */}
                      <div className={`absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 ${
                        job.current
                          ? `${c.bg} border-white shadow-md`
                          : 'bg-white border-forest-200'
                      }`} />

                      <div className={`p-5 border rounded-2xl transition-all ${
                        job.current
                          ? `border-forest-100 bg-forest-50/60 border-l-4 ${c.bg.replace('bg-', 'border-l-')}`
                          : 'border-forest-100 hover:border-forest-200 hover:bg-forest-50/30'
                      }`}>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 className="font-display text-lg font-bold text-forest-900 leading-tight">{job.role}</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Building2 size={11} className="text-forest-400" />
                              <span className="font-sans text-sm font-semibold text-forest-600">{job.company}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full ${
                              job.current ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                            }`}>
                              {job.current ? 'Current' : 'Former'}
                            </div>
                            <p className="font-mono text-[10px] text-forest-400 mt-1.5 flex items-center justify-end gap-1">
                              <Calendar size={9} /> {job.period}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>}

            {/* Education */}
            <section>
              <div className="flex items-center gap-5 mb-8">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 whitespace-nowrap">Education</span>
                <div className="flex-1 border-t border-forest-100" />
                <h2 className="font-display text-2xl font-bold text-forest-900 whitespace-nowrap">Academic Background</h2>
              </div>

              <div className="space-y-4">
                {alumni.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-5 p-5 border border-forest-100 rounded-2xl hover:border-forest-200 hover:bg-forest-50/30 transition-all"
                  >
                    <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-bold text-forest-900 leading-snug">{edu.degree}</h3>
                      <p className="font-sans text-sm text-forest-600 mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="font-mono text-xs text-forest-400 bg-forest-50 border border-forest-100 px-3 py-1 rounded-full flex-shrink-0">
                      {edu.year}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills */}
            {alumni.skills?.length > 0 && <section>
              <div className="flex items-center gap-5 mb-8">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 whitespace-nowrap">Expertise</span>
                <div className="flex-1 border-t border-forest-100" />
                <h2 className="font-display text-2xl font-bold text-forest-900 whitespace-nowrap">Skills &amp; Expertise</h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {alumni.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 bg-forest-50 border border-forest-100 text-forest-700 font-sans text-sm font-medium rounded-full hover:bg-forest-100 hover:border-forest-200 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </section>}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">

              {/* At a Glance */}
              <div className="border border-forest-100 rounded-2xl overflow-hidden">
                <div className={`${c.bg} px-5 py-3.5`}>
                  <h3 className="font-mono text-[10px] tracking-widest uppercase text-white font-bold">At a Glance</h3>
                </div>
                <div className="divide-y divide-forest-50">
                  {[
                    { label: 'Department', value: c.label },
                    { label: 'Graduation Batch', value: alumni.batch },
                    { label: 'Based in', value: `${alumni.location}, ${alumni.country}` },
                    { label: 'Current Role', value: alumni.role },
                    { label: 'Organisation', value: alumni.company },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-5 py-3.5">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-0.5">{label}</div>
                      <div className="font-sans text-sm font-semibold text-forest-900 leading-snug">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Award */}
              {alumni.award && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={14} className="text-amber-500" />
                    <h3 className="font-mono text-[10px] tracking-widest uppercase text-amber-600 font-bold">Recognition</h3>
                  </div>
                  <p className="font-sans text-sm text-amber-800 leading-relaxed">{alumni.award}</p>
                </motion.div>
              )}

              {/* Connect */}
              <div className="bg-forest-950 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-forest-800 rounded-full opacity-60" />
                <div className="relative">
                  <h4 className="font-display text-lg text-white font-bold mb-2">
                    Connect with {alumni.name.split(' ').at(-1)}
                  </h4>
                  <p className="font-sans text-sm text-forest-300 mb-5 leading-relaxed">
                    Reach out for mentorship, collaboration, or networking.
                  </p>
                  <div className="space-y-2.5">
                    {alumni.linkedin && (
                      <a
                        href={alumni.linkedin}
                        onClick={e => e.preventDefault()}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white text-sm font-sans font-bold hover:bg-blue-500 transition-colors rounded-xl"
                      >
                        <Linkedin size={13} /> View LinkedIn
                      </a>
                    )}
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-forest-700 text-white text-sm font-sans font-bold hover:bg-forest-600 transition-colors rounded-xl"
                    >
                      Send a Message
                    </Link>
                  </div>
                </div>
              </div>

              {/* More from same dept */}
              {(() => {
                const related = ALUMNI.filter(a => a.dept === alumni.dept && a.id !== alumni.id).slice(0, 2)
                if (!related.length) return null
                return (
                  <div className="border border-forest-100 rounded-2xl p-5">
                    <h3 className="font-mono text-[10px] tracking-widest uppercase text-forest-400 mb-4">
                      More from {c.label.split(' ')[0]}
                    </h3>
                    <div className="space-y-3">
                      {related.map(r => {
                        const rc = cfg(r.dept)
                        return (
                          <Link
                            key={r.id}
                            to={`/alumni/${r.id}`}
                            className="flex items-center gap-3 group"
                          >
                            {r.image ? (
                              <img src={r.image} alt={r.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                            ) : (
                              <div className={`w-10 h-10 rounded-xl ${rc.bg} flex items-center justify-center font-display text-sm font-bold text-white flex-shrink-0`}>
                                {r.initials}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-sans text-sm font-bold text-forest-900 group-hover:text-forest-700 transition-colors truncate">
                                {r.name}
                              </div>
                              <div className="font-sans text-xs text-forest-500 truncate">{r.role}</div>
                            </div>
                            <ChevronRight size={13} className="text-forest-300 group-hover:text-forest-600 transition-colors flex-shrink-0 ml-auto" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>

        {/* ── Prev / Next ─────────────────────────────────────── */}
        <div className="mt-20 pt-10 border-t border-forest-100 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/alumni/${prev.id}`}
              className="group flex items-center gap-4 p-5 border border-forest-100 rounded-2xl hover:border-forest-300 hover:bg-forest-50/50 transition-all"
            >
              <ArrowLeft size={18} className="text-forest-300 group-hover:text-forest-700 transition-colors flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">Previous</div>
                <div className="font-display text-base font-bold text-forest-900 group-hover:text-forest-700 transition-colors truncate">{prev.name}</div>
                <div className="font-sans text-xs text-forest-500 truncate">{prev.role}</div>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/alumni/${next.id}`}
              className="group flex items-center justify-end gap-4 p-5 border border-forest-100 rounded-2xl hover:border-forest-300 hover:bg-forest-50/50 transition-all text-right"
            >
              <div className="min-w-0">
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">Next</div>
                <div className="font-display text-base font-bold text-forest-900 group-hover:text-forest-700 transition-colors truncate">{next.name}</div>
                <div className="font-sans text-xs text-forest-500 truncate">{next.role}</div>
              </div>
              <ChevronRight size={18} className="text-forest-300 group-hover:text-forest-700 transition-colors flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Back link */}
        <div className="text-center mt-10">
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-forest-600 hover:text-forest-900 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Alumni Directory
          </Link>
        </div>
      </div>
    </div>
  )
}
