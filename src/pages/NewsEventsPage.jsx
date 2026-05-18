import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, ArrowRight, Clock, MapPin, Users, ChevronRight,
  Tag as TagIcon, Play, Image, BookOpen, Megaphone, Filter,
  ExternalLink, Camera, Film, ChevronLeft
} from 'lucide-react'
import { Section, SectionHeader } from '../components/ui'
import { newsItems } from '../data/newsData'
import { events } from '../data/eventsData'

const tabs = ['News', 'Events', 'Archive']

const gallery = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', caption: 'Annual Reunion 2024', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', caption: 'Career Fair 2024', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?auto=format&fit=crop&q=80&w=600', caption: 'MIST Campus View', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600', caption: 'Tech Symposium 2024', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600', caption: 'Graduation Ceremony', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=600', caption: 'Alumni Recognition Night', type: 'photo' },
  { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600', caption: 'AI Webinar Series', type: 'video' },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600', caption: 'Leadership Forum 2023', type: 'video' },
]

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState('News')
  const [eventFilter, setEventFilter] = useState('All')
  const [archiveTab, setArchiveTab] = useState('Photos')
  const [lightbox, setLightbox] = useState(null)

  const eventTypes = ['All', 'Reunion', 'Seminar', 'Workshop', 'Award']
  const filteredEvents = eventFilter === 'All' ? events : events.filter((e) => e.type === eventFilter)
  const archiveItems = archiveTab === 'Photos' ? gallery.filter((g) => g.type === 'photo') : gallery.filter((g) => g.type === 'video')

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
          animate={{ scale: 1, opacity: 0.07 }}
          transition={{ duration: 1.5 }}
          className="absolute -right-32 -top-32 w-[500px] h-[500px] border-[60px] border-forest-400 rounded-full"
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
            <span className="text-forest-300">News & Events</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-display text-6xl md:text-7xl text-white mb-5 leading-tight font-bold"
              >
                Stay <em className="italic text-forest-400">Informed.</em>
                <br /> Stay Connected.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-body text-forest-300 text-lg leading-relaxed max-w-xl"
              >
                The latest from the MISTAS community — achievements, events,
                announcements, and alumni milestones from across the globe.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex flex-col gap-3"
            >
              {[
                { icon: Megaphone, label: '24 News Articles', sub: 'This month' },
                { icon: Calendar, label: '6 Upcoming Events', sub: 'Register now' },
                { icon: Camera, label: '400+ Photos', sub: 'In the archive' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-4 bg-forest-900/50 border border-forest-800 px-5 py-3">
                  <Icon size={16} className="text-forest-400" />
                  <span className="font-sans text-sm font-medium text-white">{label}</span>
                  <span className="font-mono text-[10px] text-forest-500 ml-auto">{sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tab nav at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-mono text-[10px] tracking-[0.3em] uppercase border-b-2 transition-all ${
                    activeTab === tab
                      ? 'text-white border-forest-400'
                      : 'text-forest-500 border-transparent hover:text-forest-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Content ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'News' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                {/* Featured Article */}
                {newsItems.filter((n) => n.featured).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid lg:grid-cols-2 gap-0 mb-16 border border-forest-100 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-forest-900">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
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

                {/* Rest of news */}
                <div className="grid md:grid-cols-2 gap-6">
                  {newsItems.filter((n) => !n.featured).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                    <Link to={`/news/${item.id}`} className="block group border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {item.image && (
                        <div className="h-48 overflow-hidden bg-forest-900">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
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
                          <Link to={`/news/${item.id}`} className="flex items-center gap-1.5 font-sans font-bold text-forest-700 hover:text-forest-900 transition-colors">
                            Read <ChevronRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'Events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <section id="events" className="py-20 bg-forest-50">
              <div className="max-w-7xl mx-auto px-6">
                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {eventTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setEventFilter(t)}
                      className={`px-5 py-2 text-sm font-sans font-medium transition-all duration-300 ${
                        eventFilter === t
                          ? 'bg-forest-700 text-white'
                          : 'bg-white border border-forest-200 text-forest-600 hover:border-forest-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Featured event */}
                {filteredEvents.filter((e) => e.featured).map((event) => (
                  <motion.div key={event.id} className="mb-8 bg-forest-900 text-white relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                    />
                    <div className="relative p-10 grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-mono tracking-widest uppercase bg-white text-forest-900 px-3 py-1 font-bold">Featured</span>
                          <span className={`text-[10px] font-mono tracking-widest uppercase text-white ${event.typeColor} px-3 py-1 font-bold`}>{event.type}</span>
                        </div>
                        <h2 className="font-display text-4xl font-bold mb-4 leading-tight">{event.title}</h2>
                        <p className="font-body text-forest-300 leading-relaxed mb-6">{event.description}</p>
                        <div className="flex flex-wrap gap-6 text-sm text-forest-300 mb-8">
                          <span className="flex items-center gap-2"><Calendar size={14} className="text-forest-400" /> {event.date} · {event.time}</span>
                          <span className="flex items-center gap-2"><MapPin size={14} className="text-forest-400" /> {event.location}</span>
                          <span className="flex items-center gap-2"><Users size={14} className="text-forest-400" /> {event.attendees} / {event.maxAttendees} registered</span>
                        </div>
                        <Link to={`/events/${event.id}`} className="btn-primary bg-white text-forest-900 hover:bg-forest-50 inline-flex items-center gap-2">
                          View Details <ArrowRight size={14} />
                        </Link>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-display text-7xl font-bold text-forest-600">{event.dateDay}</div>
                          <div className="font-mono text-sm text-forest-500 tracking-widest uppercase">{event.dateMonth}</div>
                          <div className="font-sans text-xs text-forest-600 mt-1">{event.dateYear}</div>
                          <div className="mt-6">
                            <div className="w-32 h-1.5 bg-forest-800 mx-auto mb-2">
                              <div className="h-full bg-forest-400" style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }} />
                            </div>
                            <div className="font-mono text-[10px] text-forest-500 tracking-widest">
                              {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Events list */}
                <div className="space-y-4">
                  {filteredEvents.filter((e) => !e.featured).map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group bg-white border border-forest-100 rounded-2xl hover:border-forest-300 hover:shadow-lg transition-all duration-300 flex overflow-hidden"
                    >
                      {/* Date block */}
                      <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-6 bg-forest-50 border-r border-forest-100 group-hover:bg-forest-900 group-hover:border-forest-900 transition-colors duration-300">
                        <span className="font-display text-2xl font-bold text-forest-900 group-hover:text-white leading-none transition-colors">{event.date.split(' ')[1].replace(',', '')}</span>
                        <span className="font-mono text-[9px] tracking-widest text-forest-400 group-hover:text-forest-400 uppercase mt-1 transition-colors">{event.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[9px] font-mono tracking-widest uppercase text-white ${event.typeColor} px-2 py-0.5`}>{event.type}</span>
                          </div>
                          <h3 className="font-sans font-bold text-forest-900 group-hover:text-forest-700 transition-colors">{event.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-xs text-forest-400">
                            <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                            <span className="flex items-center gap-1"><Users size={10} /> {event.attendees} attending</span>
                          </div>
                        </div>
                        <Link to={`/events/${event.id}`} className="flex-shrink-0 btn-outline text-xs py-2 px-5 flex items-center gap-1.5">
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="py-20 text-center bg-white border border-forest-100">
                    <Calendar size={32} className="text-forest-200 mx-auto mb-4" />
                    <p className="font-sans text-forest-400">No events found for this category.</p>
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'Archive' && (
          <motion.div
            key="archive"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                  <SectionHeader label="Archive" title="Photo & Video Gallery" />
                  <div className="flex gap-1 bg-forest-50 p-1 border border-forest-100 mb-12">
                    {['Photos', 'Videos'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setArchiveTab(t)}
                        className={`px-6 py-2 font-sans text-sm font-medium transition-all ${
                          archiveTab === t ? 'bg-forest-700 text-white' : 'text-forest-600 hover:text-forest-900'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {t === 'Photos' ? <Camera size={14} /> : <Film size={14} />}
                          {t}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {archiveItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="group relative aspect-square overflow-hidden cursor-pointer bg-forest-900"
                      onClick={() => setLightbox(item)}
                    >
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-forest-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {item.type === 'video' ? (
                          <Play size={28} className="text-white" fill="white" />
                        ) : (
                          <Image size={28} className="text-white" />
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-sans text-xs text-white font-medium">{item.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <button className="btn-outline flex items-center gap-2 mx-auto">
                    Load More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain" />
              <p className="text-center text-sm text-white/70 font-sans mt-3">{lightbox.caption}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors font-bold text-lg"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
