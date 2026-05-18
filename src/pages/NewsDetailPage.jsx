import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, ArrowLeft, ChevronRight, Tag, User
} from 'lucide-react'
import { newsItems } from '../data/newsData'

function BodyBlock({ block, isFirst }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={`font-body text-forest-700 leading-relaxed mb-6 ${isFirst ? 'text-xl first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-forest-900 first-letter:float-left first-letter:leading-none first-letter:mr-3 first-letter:mt-1' : 'text-lg'}`}>
          {block.text}
        </p>
      )
    case 'heading':
      return (
        <h2 className="font-display text-2xl font-bold text-forest-900 mt-12 mb-5 leading-snug">
          {block.text}
        </h2>
      )
    case 'subheading':
      return (
        <h3 className="font-display text-xl font-bold text-forest-800 mt-8 mb-3 leading-snug">
          {block.text}
        </h3>
      )
    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="my-10 relative pl-8 pr-6 py-6 bg-forest-50 border-l-4 border-forest-600 rounded-r-2xl"
        >
          <div className="absolute -top-3 left-6 font-display text-6xl text-forest-600 leading-none select-none">"</div>
          <p className="font-display text-xl italic text-forest-800 leading-relaxed mb-4 pt-2">
            {block.text}
          </p>
          {block.attribution && (
            <cite className="font-mono text-[11px] tracking-widest uppercase text-forest-500 not-italic block">
              — {block.attribution}
            </cite>
          )}
        </motion.blockquote>
      )
    case 'list':
      return (
        <ul className="mb-8 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 font-body text-forest-700 text-lg leading-relaxed"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-forest-600 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function NewsDetailPage() {
  const { id } = useParams()
  const article = newsItems.find(n => n.id === Number(id))
  const others = newsItems.filter(n => n.id !== Number(id))
  const related = others.slice(0, 3)
  const prevArticle = newsItems[newsItems.findIndex(n => n.id === Number(id)) - 1]
  const nextArticle = newsItems[newsItems.findIndex(n => n.id === Number(id)) + 1]

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-display text-4xl text-forest-900 mb-4">Article not found</h1>
          <Link to="/news" className="btn-primary">Back to News</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-white pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 py-6 mb-10 border-b border-zinc-100"
          >
            <Link to="/news" className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-400 hover:text-zinc-700 transition-colors">
              News & Events
            </Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500">
              {article.category}
            </span>
            <div className="flex-1 border-t border-zinc-100 ml-2" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-400">
              {article.readTime}
            </span>
          </motion.div>

          {/* Article header */}
          <div className="max-w-4xl pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              <span className={`inline-flex items-center text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 border mb-8 ${article.catColor}`}>
                {article.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.05] mb-8"
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-body text-zinc-500 text-xl leading-relaxed mb-10 max-w-3xl"
            >
              {article.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <div className="flex items-center gap-3 border border-zinc-200 bg-zinc-50 px-4 py-2.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <User size={13} className="text-forest-600" />
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-zinc-900 leading-none">{article.author}</div>
                  <div className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase mt-0.5">{article.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-5 text-xs text-zinc-400 font-mono tracking-widest uppercase px-4">
                <span className="flex items-center gap-1.5"><Calendar size={11} /> {article.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={11} /> {article.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Hero image ────────────────────────────────────────────── */}
      {article.image && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: '460px' }}
            >
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Article body + sidebar ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 xl:gap-16">

            {/* ── Main article ── */}
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                {article.body.map((block, i) => (
                  <BodyBlock key={i} block={block} isFirst={i === 0} />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-14 pt-10 border-t border-forest-100">
                <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-forest-400 mr-2">
                  <Tag size={11} /> Tags
                </span>
                {article.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 border border-forest-200 text-forest-600 hover:bg-forest-50 hover:border-forest-400 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Prev / Next navigation */}
              <div className="flex items-stretch gap-4 mt-10 pt-8 border-t border-forest-100">
                {prevArticle ? (
                  <Link to={`/news/${prevArticle.id}`}
                    className="flex-1 flex items-center gap-3 border border-forest-100 p-5 rounded-2xl hover:border-forest-300 hover:shadow-md transition-all group">
                    <ArrowLeft size={16} className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">Previous</div>
                      <p className="font-sans text-sm font-semibold text-forest-800 group-hover:text-forest-600 truncate transition-colors">{prevArticle.title}</p>
                    </div>
                  </Link>
                ) : <div className="flex-1" />}

                {nextArticle && (
                  <Link to={`/news/${nextArticle.id}`}
                    className="flex-1 flex items-center justify-end gap-3 border border-forest-100 p-5 rounded-2xl hover:border-forest-300 hover:shadow-md transition-all text-right group">
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-1">Next</div>
                      <p className="font-sans text-sm font-semibold text-forest-800 group-hover:text-forest-600 truncate transition-colors">{nextArticle.title}</p>
                    </div>
                    <ChevronRight size={16} className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 transition-colors" />
                  </Link>
                )}
              </div>

              <div className="mt-6">
                <Link to="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors">
                  <ArrowLeft size={14} /> Back to News & Events
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">

                {/* Related articles */}
                <div className="border border-forest-100 rounded-2xl p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">
                    More Articles
                  </div>
                  <div className="space-y-4">
                    {related.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Link to={`/news/${item.id}`}
                          className="flex gap-3 group">
                          <div className={`w-1 flex-shrink-0 rounded-full ${item.catDot} mt-1`} style={{ minHeight: '16px' }} />
                          <div className="min-w-0">
                            <span className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 border inline-block mb-1 ${item.catColor}`}>
                              {item.category}
                            </span>
                            <p className="font-sans text-sm font-semibold text-forest-800 group-hover:text-forest-600 transition-colors leading-snug line-clamp-2">
                              {item.title}
                            </p>
                            <p className="font-mono text-[9px] text-forest-400 tracking-wider mt-1">{item.date}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <Link to="/news"
                    className="mt-5 pt-4 border-t border-forest-100 flex items-center justify-between font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors">
                    All articles <ChevronRight size={13} />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More News Strip ───────────────────────────────────────── */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-10">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-600">More from MISTAS</span>
            <div className="flex-1 border-t border-zinc-200" />
            <Link to="/news" className="font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors flex items-center gap-1.5">
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/news/${item.id}`}
                  className="block group border border-zinc-200 bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:border-forest-200 transition-all duration-300">
                  {item.image && (
                    <div className="h-40 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className={`inline-flex items-center text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 border mb-3 ${item.catColor}`}>
                      {item.category}
                    </span>
                    <h3 className="font-sans font-bold text-zinc-900 text-sm leading-snug group-hover:text-forest-700 transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[9px] text-zinc-400 tracking-wider">{item.date}</span>
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
