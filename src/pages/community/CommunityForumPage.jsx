import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, TrendingUp, PenSquare, ChevronRight, ArrowRight } from 'lucide-react'
import { forumTopics } from '../../data/communityData'

const categories = [
  { label: 'Career', color: 'text-blue-600 bg-blue-50 border-blue-200', posts: 1840 },
  { label: 'Higher Studies', color: 'text-purple-600 bg-purple-50 border-purple-200', posts: 1120 },
  { label: 'Technical', color: 'text-forest-600 bg-forest-50 border-forest-200', posts: 920 },
  { label: 'Entrepreneurship', color: 'text-orange-600 bg-orange-50 border-orange-200', posts: 580 },
  { label: 'Campus Life', color: 'text-pink-600 bg-pink-50 border-pink-200', posts: 740 },
  { label: 'General', color: 'text-zinc-600 bg-zinc-50 border-zinc-200', posts: 460 },
]

const catColor = (label) => categories.find(c => c.label === label)?.color || ''

export default function CommunityForumPage() {
  const featured = forumTopics[0]
  const rest = forumTopics.slice(1)

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
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Discussion Forum</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16">
            <div className="lg:col-span-7">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
                <div className="font-display font-bold tracking-tight leading-[0.88]">
                  <span className="block text-[80px] md:text-[110px] text-white">Discussion</span>
                  <span className="block text-[80px] md:text-[110px] italic text-forest-400">Forum</span>
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
                  Open knowledge exchange for all MIST alumni. Ask questions, share experiences, and learn from a global network.
                </p>
                <button className="btn-primary flex items-center gap-2">
                  Start a Discussion <PenSquare size={14} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-forest-800 grid grid-cols-3 md:grid-cols-6 divide-x divide-forest-800">
            {categories.map(({ label, posts }) => (
              <div key={label} className="py-5 px-4 text-center">
                <div className="font-display text-xl font-bold text-white">{posts.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Main */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-6 mb-10">
                <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-400">Trending</span>
                <div className="flex-1 border-t border-forest-100" />
                <button className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                  New Post <PenSquare size={11} />
                </button>
              </div>

              {/* Featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/community/forum/${featured.id}`}
                  className="block group border-l-4 border-forest-600 pl-8 pb-10 mb-8 border-b border-forest-100 hover:border-l-forest-400 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border ${catColor(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="font-mono text-[10px] text-forest-400 bg-forest-50 border border-forest-100 px-2 py-1 flex items-center gap-1">
                      <TrendingUp size={8} /> Trending
                    </span>
                    {featured.pinned && (
                      <span className="font-mono text-[10px] text-forest-400">Pinned</span>
                    )}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors leading-tight mb-4">
                    {featured.title}
                  </h2>
                  <p className="font-sans text-sm text-forest-400 mb-6">by {featured.author}</p>
                  <div className="flex items-center gap-6 text-sm text-forest-400 flex-wrap">
                    <span className="flex items-center gap-2"><Heart size={13} /> {featured.upvotes} upvotes</span>
                    <span className="flex items-center gap-2"><MessageSquare size={13} /> {featured.comments} comments</span>
                    <span className="ml-auto font-sans font-bold text-forest-700 flex items-center gap-1.5 group-hover:gap-3 transition-all text-sm">
                      Read Thread <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Rest */}
              <div>
                {rest.map((topic, i) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/community/forum/${topic.id}`}
                      className="flex gap-6 py-6 border-b border-forest-100 cursor-pointer hover:bg-forest-50/60 px-4 -mx-4 transition-colors duration-200 group"
                    >
                      <div className="font-display text-4xl font-bold text-forest-100 group-hover:text-forest-200 transition-colors w-10 flex-shrink-0 text-right leading-none pt-1">
                        {String(i + 2).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border ${catColor(topic.category)}`}>
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
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <button className="btn-outline flex items-center gap-2">Browse All <ArrowRight size={14} /></button>
                <button className="btn-primary flex items-center gap-2">Start Discussion <PenSquare size={14} /></button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">
                    Browse by Category
                  </h3>
                  <div className="space-y-1.5">
                    {categories.map((cat, i) => (
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
                </div>

                <div className="bg-forest-950 p-7 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-forest-800 rounded-full opacity-50" />
                  <div className="relative">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-4">Alumni Stories</div>
                    <h4 className="font-display text-xl text-white font-bold mb-3">Share Your Story</h4>
                    <p className="font-sans text-sm text-forest-300 leading-relaxed mb-5">
                      Your journey could inspire thousands of MISTians. Write a post and pay it forward.
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
