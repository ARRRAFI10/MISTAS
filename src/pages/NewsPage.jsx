import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, ChevronRight, Clock, Megaphone, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import NewsEventsHero from '../components/news/NewsEventsHero'
import { newsItems } from '../data/newsData'

function parseDate(str) {
  return new Date(str)
}

export default function NewsPage() {
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const isFiltering = search.trim() !== '' || dateFrom !== '' || dateTo !== ''

  const filtered = useMemo(() => {
    let items = newsItems
    const q = search.trim().toLowerCase()
    if (q) {
      items = items.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          (n.author && n.author.toLowerCase().includes(q)) ||
          (n.category && n.category.toLowerCase().includes(q))
      )
    }
    if (dateFrom) {
      const from = new Date(dateFrom)
      items = items.filter((n) => parseDate(n.date) >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59)
      items = items.filter((n) => parseDate(n.date) <= to)
    }
    return items
  }, [search, dateFrom, dateTo])

  function clearFilters() {
    setSearch('')
    setDateFrom('')
    setDateTo('')
  }

  const featuredItems = isFiltering ? [] : newsItems.filter((n) => n.featured)
  const gridItems = isFiltering ? filtered : newsItems.filter((n) => !n.featured)

  return (
    <>
      <NewsEventsHero />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Search & Date Filter Bar ── */}
          <div className="mb-12 p-5 bg-forest-50 border border-forest-100 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by title, author, category…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-forest-200 rounded-lg text-sm font-sans text-forest-900 placeholder:text-forest-400 focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>

              {/* Date From */}
              <div className="relative">
                <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="pl-9 pr-3 py-2.5 bg-white border border-forest-200 rounded-lg text-sm font-sans text-forest-700 focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>

              {/* Date To */}
              <div className="relative">
                <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="pl-9 pr-3 py-2.5 bg-white border border-forest-200 rounded-lg text-sm font-sans text-forest-700 focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>

              {/* Clear */}
              {isFiltering && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-forest-200 rounded-lg text-sm font-sans font-medium text-forest-600 hover:border-forest-400 hover:text-forest-900 transition-colors"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>

            {isFiltering && (
              <p className="mt-3 text-xs font-mono text-forest-500">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* ── Featured Articles (hidden when filtering) ── */}
          <AnimatePresence>
            {featuredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-2 gap-0 mb-16 border border-forest-100 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-forest-900">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                  )}
                </div>
                <div className="p-10 flex flex-col justify-center bg-white">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 border mb-6 w-fit ${item.catColor}`}>
                    <Megaphone size={10} /> {item.category}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-forest-400 uppercase mb-2">Featured</span>
                  <h2 className="font-display text-3xl text-forest-900 font-bold mb-4 leading-snug group-hover:text-forest-700 transition-colors">
                    {item.title}
                  </h2>
                  <p className="font-body text-forest-600 leading-relaxed mb-6">{item.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs text-forest-400 font-sans mb-6">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {item.readTime}</span>
                    <span>·</span>
                    <span>{item.author}</span>
                  </div>
                  <Link to={`/news/${item.id}`} className="btn-primary w-fit flex items-center gap-2 text-sm">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── News Grid ── */}
          {gridItems.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {gridItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={`/news/${item.id}`}
                    className="block group border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {item.image && (
                      <div className="h-48 overflow-hidden bg-forest-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className={`inline-flex items-center text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border mb-4 ${item.catColor}`}>
                        {item.category}
                      </span>
                      <h3 className="font-display text-xl text-forest-900 font-bold mb-3 leading-snug group-hover:text-forest-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-forest-500 leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-forest-400">
                        <div className="flex items-center gap-3">
                          <span>{item.date}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {item.readTime}</span>
                        </div>
                        <span className="flex items-center gap-1.5 font-sans font-bold text-forest-700 hover:text-forest-900 transition-colors">
                          Read <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-forest-100 rounded-2xl">
              <Search size={32} className="text-forest-200 mx-auto mb-4" />
              <p className="font-display text-lg text-forest-400 font-semibold mb-1">No articles found</p>
              <p className="text-sm text-forest-400 font-sans">Try adjusting your search or date range.</p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
