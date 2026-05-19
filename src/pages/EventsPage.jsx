import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, ChevronRight, Clock, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import NewsEventsHero from '../components/news/NewsEventsHero'
import { events } from '../data/eventsData'

const eventTypes = ['All', 'Reunion', 'Seminar', 'Workshop', 'Award']

export default function EventsPage() {
  const [eventFilter, setEventFilter] = useState('All')

  const filteredEvents =
    eventFilter === 'All' ? events : events.filter((e) => e.type === eventFilter)

  return (
    <>
      <NewsEventsHero />

      <section className="py-20 bg-forest-50">
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
          <AnimatePresence mode="wait">
            {filteredEvents.filter((e) => e.featured).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="mb-8 bg-forest-900 text-white relative overflow-hidden rounded-2xl"
              >
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
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
                          <div
                            className="h-full bg-forest-400"
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          />
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
          </AnimatePresence>

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
                <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-6 bg-forest-50 border-r border-forest-100 group-hover:bg-forest-900 group-hover:border-forest-900 transition-colors duration-300">
                  <span className="font-display text-2xl font-bold text-forest-900 group-hover:text-white leading-none transition-colors">
                    {event.date.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-forest-400 group-hover:text-forest-400 uppercase mt-1 transition-colors">
                    {event.date.split(' ')[0]}
                  </span>
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
                  <Link
                    to={`/events/${event.id}`}
                    className="flex-shrink-0 btn-outline text-xs py-2 px-5 flex items-center gap-1.5"
                  >
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
    </>
  )
}
