import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Rss, Users, ArrowRight } from 'lucide-react'
import { deptGroups } from '../../data/communityData'

export default function CommunityDepartmentsPage() {
  const featured = deptGroups[0]
  const secondary = deptGroups.slice(1, 3)
  const rest = deptGroups.slice(3)

  return (
    <>
      {/* Hero */}
      <div className="bg-forest-950 pt-24 pb-0 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
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
            className="flex items-center gap-4 py-8 mb-10 border-b border-forest-800"
          >
            <Link to="/community" className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-500 hover:text-forest-300 transition-colors">
              Community
            </Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Department Groups</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Department</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Groups</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-5 lg:pb-4"
            >
              <div className="border-l-2 border-forest-600 pl-6">
                <p className="font-body text-forest-300 text-lg leading-relaxed mb-6">
                  Connect with alumni from your discipline. Each department has a dedicated group for discussions, job referrals, and research collaboration.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {deptGroups.length} Groups
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {deptGroups.reduce((s, g) => s + g.members, 0).toLocaleString()} Members
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-800">
            {[
              { n: deptGroups.length, l: 'Active Groups' },
              { n: deptGroups.reduce((s, g) => s + g.members, 0).toLocaleString(), l: 'Total Members' },
              { n: deptGroups.reduce((s, g) => s + g.posts, 0).toLocaleString(), l: 'Total Posts' },
              { n: '16+', l: 'Departments' },
            ].map(({ n, l }) => (
              <div key={l} className="py-6 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Link
              to={`/community/departments/${featured.id}`}
              className="block bg-forest-900 relative overflow-hidden group hover:bg-forest-800 transition-colors duration-300"
            >
              <div className="absolute -bottom-8 -right-8 text-[180px] leading-none select-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
                {featured.icon}
              </div>
              <div className="relative grid lg:grid-cols-12 gap-0">
                {/* Color stripe */}
                <div className={`${featured.color} lg:col-span-1 min-h-[8px] lg:min-h-0`} />
                {/* Content */}
                <div className="lg:col-span-11 p-10">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400 bg-forest-800 border border-forest-700 px-3 py-1.5">
                      Featured
                    </span>
                    <span className="font-sans text-xs font-bold text-white bg-forest-700 border border-forest-600 px-3 py-1.5">
                      {featured.shortCode}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500">
                      {featured.members.toLocaleString()} members
                    </span>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="text-5xl mb-4">{featured.icon}</div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-2">{featured.dept}</div>
                      <h2 className="font-display text-4xl font-bold text-white mb-3 group-hover:text-forest-300 transition-colors">
                        {featured.name}
                      </h2>
                      <p className="font-body text-forest-300 leading-relaxed">{featured.desc}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-3">Topics</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featured.topics.map(t => (
                            <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-300 border border-forest-700 px-2 py-1">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-forest-500 text-sm">
                          <span className="flex items-center gap-1.5"><Rss size={12} /> {featured.posts.toLocaleString()} posts</span>
                          <span className="flex items-center gap-1.5"><Users size={12} /> {featured.members.toLocaleString()}</span>
                        </div>
                        <span className="flex items-center gap-2 text-forest-300 font-sans text-sm font-bold group-hover:gap-3 transition-all">
                          Open Group <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary two */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {secondary.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/community/departments/${g.id}`}
                  className="block border border-forest-100 bg-white hover:shadow-xl hover:border-forest-300 transition-all duration-300 group overflow-hidden h-full"
                >
                  <div className={`${g.color} h-1.5 w-full`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{g.icon}</span>
                        <div>
                          <span className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{g.dept}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-sans text-xs font-bold text-white bg-forest-800 px-2 py-0.5">{g.shortCode}</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-forest-400 tabular-nums">{g.members.toLocaleString()} mbrs</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">
                      {g.name}
                    </h3>
                    <p className="font-sans text-sm text-forest-500 leading-relaxed mb-5">{g.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {g.topics.slice(0, 3).map(t => (
                        <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-500 border border-forest-100 px-2 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-forest-100">
                      <span className="font-sans text-xs text-forest-400 flex items-center gap-1.5"><Rss size={10} /> {g.posts.toLocaleString()} posts</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-forest-700 group-hover:gap-3 transition-all">
                        Open Group <ChevronRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Rest */}
          <div className="grid sm:grid-cols-3 gap-5">
            {rest.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/community/departments/${g.id}`}
                  className="block border border-forest-100 bg-white hover:shadow-lg hover:border-forest-300 transition-all duration-300 group overflow-hidden h-full"
                >
                  <div className={`${g.color} h-1 w-full`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{g.icon}</span>
                      <span className="font-sans text-xs font-bold text-white bg-forest-800 px-2 py-0.5">{g.shortCode}</span>
                    </div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">{g.dept}</div>
                    <h3 className="font-display text-xl font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">{g.name}</h3>
                    <p className="font-sans text-sm text-forest-500 leading-relaxed mb-4">{g.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-forest-100">
                      <span className="font-sans text-xs text-forest-400">{g.members.toLocaleString()} members</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-forest-600 group-hover:gap-2 transition-all">
                        Open <ChevronRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA for missing dept */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 border border-dashed border-forest-300 p-8 text-center bg-forest-50/40"
          >
            <h4 className="font-display text-xl text-forest-900 mb-2">Don't see your department?</h4>
            <p className="font-sans text-sm text-forest-500 mb-4">Request a new department group — we support all 16 MIST departments.</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Request a Group <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  )
}
