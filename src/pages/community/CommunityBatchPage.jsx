import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Users, MessageSquare, ChevronRight, ArrowRight, BookOpen } from 'lucide-react'
import { batchGroups } from '../../data/communityData'

export default function CommunityBatchPage() {
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
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Batch Groups</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Batch</span>
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
                  Reconnect with your graduating class. Each batch has its own group, representatives, and shared discussion space.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {batchGroups.length} Batches
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-forest-400 border border-forest-700 px-3 py-2">
                    {batchGroups.reduce((s, b) => s + b.members, 0).toLocaleString()} Members
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-4 divide-x divide-forest-800">
            {[
              { n: batchGroups.length, label: 'Active Batches' },
              { n: batchGroups.filter(b => b.status === 'Active').length, label: 'Active Groups' },
              { n: batchGroups.reduce((s, b) => s + b.members, 0).toLocaleString(), label: 'Total Members' },
              { n: batchGroups.reduce((s, b) => s + b.posts, 0).toLocaleString(), label: 'Total Posts' },
            ].map(({ n, label }) => (
              <div key={label} className="py-6 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">All Batches</span>
            <div className="flex-1 border-t border-forest-100" />
            <Link to="/contact" className="text-xs font-bold text-forest-600 flex items-center gap-1 hover:gap-2 transition-all">
              Older batches? Get in touch <ArrowRight size={11} />
            </Link>
          </div>

          {/* Featured — latest batch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link
              to={`/community/batch/${batchGroups[0].year}`}
              className="block bg-forest-900 p-10 relative overflow-hidden group hover:bg-forest-800 transition-colors duration-300"
            >
              <div className="absolute right-6 bottom-0 font-display font-bold text-white/[0.04] leading-none select-none text-[220px]">
                {batchGroups[0].year}
              </div>
              <div className="relative grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white bg-forest-700 border border-forest-600 px-3 py-1.5">
                      Latest Batch
                    </span>
                    <span className={`flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase ${batchGroups[0].status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${batchGroups[0].status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {batchGroups[0].status}
                    </span>
                  </div>
                  <h2 className="font-display text-6xl font-bold text-white mb-2">
                    Batch <span className="text-forest-400">'{String(batchGroups[0].year).slice(2)}</span>
                  </h2>
                  <p className="font-sans text-forest-400 mt-2">{batchGroups[0].departments} departments · Rep: {batchGroups[0].lead}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Users size={16} />, v: batchGroups[0].members.toLocaleString(), l: 'Members' },
                    { icon: <BookOpen size={16} />, v: batchGroups[0].departments, l: 'Depts.' },
                    { icon: <MessageSquare size={16} />, v: batchGroups[0].posts, l: 'Posts' },
                  ].map(({ icon, v, l }) => (
                    <div key={l} className="text-center border border-forest-700 py-4 px-2">
                      <div className="text-forest-400 flex justify-center mb-2">{icon}</div>
                      <div className="font-display text-xl font-bold text-white">{v}</div>
                      <div className="font-mono text-[8px] text-forest-500 tracking-widest uppercase mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mt-6 flex items-center gap-2 text-forest-400 group-hover:text-forest-300 text-sm font-sans font-bold transition-colors">
                Open Batch Group <ChevronRight size={14} />
              </div>
            </Link>
          </motion.div>

          {/* Rest of batches */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {batchGroups.slice(1).map((b, i) => (
              <motion.div
                key={b.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/community/batch/${b.year}`}
                  className="block border border-forest-100 p-7 bg-white hover:shadow-lg hover:border-forest-300 transition-all duration-300 group relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-forest-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${b.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{b.status}</span>
                      </div>
                      <h3 className="font-display text-5xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors">
                        {b.year}
                      </h3>
                    </div>
                    <GraduationCap size={20} className="text-forest-200 group-hover:text-forest-400 transition-colors mt-1" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { v: b.members.toLocaleString(), l: 'Members' },
                      { v: b.departments, l: 'Depts' },
                      { v: b.posts, l: 'Posts' },
                    ].map(({ v, l }) => (
                      <div key={l} className="text-center border border-forest-100 py-3">
                        <div className="font-display text-lg font-bold text-forest-800">{v}</div>
                        <div className="font-mono text-[8px] text-forest-400 tracking-widest uppercase">{l}</div>
                      </div>
                    ))}
                  </div>

                  <p className="font-sans text-xs text-forest-500 mb-4">
                    <span className="text-forest-400">Rep —</span> {b.lead}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest-600 group-hover:gap-3 transition-all">
                    Open Group <ChevronRight size={11} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
