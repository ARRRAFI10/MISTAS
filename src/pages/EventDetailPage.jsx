import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowLeft, ChevronRight, X, ChevronLeft, ExternalLink } from 'lucide-react'
import { events } from '../data/eventsData'

const CARD_SHADOW = '5px 7px 0px 0px #d1fae5, 0 2px 8px rgba(0,0,0,0.04)'

function BodyBlock({ block }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="font-body text-forest-700 text-lg leading-relaxed mb-6">{block.text}</p>
    case 'heading':
      return <h2 className="font-display text-2xl font-bold text-forest-900 mt-10 mb-5 leading-snug">{block.text}</h2>
    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="my-10 relative pl-8 pr-6 py-6 bg-forest-50 border-l-4 border-forest-600 rounded-r-2xl"
        >
          <div className="absolute -top-3 left-6 font-display text-6xl text-forest-600 leading-none select-none">"</div>
          <p className="font-display text-xl italic text-forest-800 leading-relaxed mb-4 pt-2">{block.text}</p>
          {block.attribution && (
            <cite className="font-mono text-[11px] tracking-widest uppercase text-forest-500 not-italic block">— {block.attribution}</cite>
          )}
        </motion.blockquote>
      )
    case 'list':
      return (
        <ul className="mb-8 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 font-body text-forest-700 text-lg leading-relaxed">
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

export default function EventDetailPage() {
  const { id } = useParams()
  const event = events.find(e => e.id === Number(id))
  const related = events.filter(e => e.id !== Number(id)).slice(0, 3)

  const [lightboxIdx, setLightboxIdx] = useState(null)

  function prevImg() { setLightboxIdx(i => (i - 1 + event.images.length) % event.images.length) }
  function nextImg() { setLightboxIdx(i => (i + 1) % event.images.length) }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-display text-4xl text-forest-900 mb-4">Event not found</h1>
          <Link to="/news" className="btn-primary">Back to Events</Link>
        </div>
      </div>
    )
  }

  const pct = Math.round((event.attendees / event.maxAttendees) * 100)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-white pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 py-6 mb-10 border-b border-zinc-100">
            <Link to="/news" className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-400 hover:text-zinc-700 transition-colors">News & Events</Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500">Events</span>
            <div className="flex-1 border-t border-zinc-100 ml-2" />
            <span className={`font-mono text-[9px] tracking-widest uppercase text-white ${event.typeColor} px-2.5 py-1 rounded`}>{event.type}</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 pb-10">
            <div className="lg:col-span-8">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.05] mb-8">
                {event.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="font-body text-zinc-500 text-xl leading-relaxed mb-10 max-w-2xl">
                {event.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3">
                {[
                  { icon: Calendar, text: `${event.date}` },
                  { icon: Clock, text: event.time },
                  { icon: MapPin, text: event.location },
                  { icon: Users, text: `${event.attendees} / ${event.maxAttendees} registered` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-4 py-2.5 rounded-xl">
                    <Icon size={13} className="text-forest-500 flex-shrink-0" />
                    <span className="font-sans text-sm text-zinc-700">{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Date block */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div className="text-center border border-zinc-200 bg-zinc-50 px-10 py-8 rounded-2xl w-full">
                <div className="font-display text-7xl font-bold text-forest-600 leading-none">{event.dateDay}</div>
                <div className="font-mono text-lg text-forest-500 tracking-[0.3em] uppercase mt-1">{event.dateMonth}</div>
                <div className="font-sans text-sm text-zinc-400 mt-1">{event.dateYear}</div>
                <div className="mt-5">
                  <div className="w-28 h-1.5 bg-zinc-200 mx-auto mb-2 rounded-full overflow-hidden">
                    <div className="h-full bg-forest-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 tracking-widest">{pct}% seats filled</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main image ────────────────────────────────────────────── */}
      {event.images.length > 0 && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="rounded-2xl overflow-hidden cursor-pointer group relative" style={{ height: '460px' }}
              onClick={() => setLightboxIdx(0)}>
              <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {event.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white">+{event.images.length - 1} more photos</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Content + sidebar ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 xl:gap-16">

            {/* ── Main content ── */}
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                {event.body.map((block, i) => <BodyBlock key={i} block={block} />)}
              </div>

              {/* ── Photo gallery ── */}
              {event.images.length > 1 && (
                <div className="mt-14 pt-10 border-t border-forest-100">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400">Event Gallery</span>
                    <div className="flex-1 border-t border-forest-100" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-forest-300">{event.images.length} photos</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {event.images.map((img, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer bg-forest-100"
                        onClick={() => setLightboxIdx(i)}>
                        <img src={img} alt={`${event.title} — photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/30 transition-colors duration-300 flex items-center justify-center">
                          <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {i === 0 && (
                          <div className="absolute top-2 left-2 bg-forest-900/70 px-2 py-0.5">
                            <span className="font-mono text-[9px] tracking-widest uppercase text-forest-300">Main</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-10 pt-8 border-t border-forest-100">
                <Link to="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors">
                  <ArrowLeft size={14} /> Back to Events
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">

                {/* Register CTA */}
                <div className="bg-forest-950 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-forest-800 rounded-full opacity-30" />
                  <div className="relative">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-3">Seats Available</div>
                    <div className="font-display text-4xl font-bold text-white mb-1">{event.maxAttendees - event.attendees}</div>
                    <div className="font-mono text-[9px] text-forest-500 tracking-wider mb-4">of {event.maxAttendees} total</div>
                    <div className="w-full h-2 bg-forest-800 rounded-full overflow-hidden mb-5">
                      <div className="h-full bg-forest-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <button className="w-full py-3.5 bg-forest-600 hover:bg-forest-500 text-white font-sans font-bold text-sm transition-colors rounded-xl flex items-center justify-center gap-2">
                      Register for this Event
                      <ChevronRight size={15} />
                    </button>
                    <p className="font-mono text-[9px] text-forest-600 tracking-widest text-center mt-3">{event.attendees} already registered</p>
                  </div>
                </div>

                {/* Event details */}
                <div className="border border-forest-100 rounded-2xl p-6" style={{ boxShadow: CARD_SHADOW }}>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">Event Details</div>
                  <div className="space-y-4">
                    {[
                      { icon: Calendar, label: 'Date', value: event.date },
                      { icon: Clock, label: 'Time', value: event.time },
                      { icon: MapPin, label: 'Venue', value: event.location },
                      { icon: Users, label: 'Capacity', value: `${event.maxAttendees} seats` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-forest-600" />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400">{label}</div>
                          <div className="font-sans text-sm font-semibold text-forest-900 mt-0.5">{value}</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full ${event.typeDot}`} />
                      </div>
                      <div>
                        <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400">Type</div>
                        <div className="font-sans text-sm font-semibold text-forest-900 mt-0.5">{event.type}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related events */}
                <div className="border border-forest-100 rounded-2xl p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-5 pb-3 border-b border-forest-100">Other Events</div>
                  <div className="space-y-4">
                    {related.map((ev, i) => (
                      <motion.div key={ev.id} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                        <Link to={`/events/${ev.id}`} className="flex gap-3 group">
                          <div className="w-10 flex-shrink-0 text-center border border-forest-100 rounded-lg py-1.5">
                            <div className="font-display text-lg font-bold text-forest-700 leading-none">{ev.dateDay}</div>
                            <div className="font-mono text-[8px] text-forest-400 tracking-widest uppercase">{ev.dateMonth}</div>
                          </div>
                          <div className="min-w-0">
                            <span className={`font-mono text-[9px] tracking-widest uppercase text-white ${ev.typeColor} px-1.5 py-0.5 inline-block mb-1`}>{ev.type}</span>
                            <p className="font-sans text-sm font-semibold text-forest-800 group-hover:text-forest-600 transition-colors leading-snug line-clamp-2">{ev.title}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <Link to="/news" className="mt-5 pt-4 border-t border-forest-100 flex items-center justify-between font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors">
                    All events <ChevronRight size={13} />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Events Strip ─────────────────────────────────────── */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-10">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-forest-600">Upcoming Events</span>
            <div className="flex-1 border-t border-zinc-200" />
            <Link to="/news" className="font-sans text-sm font-bold text-forest-600 hover:text-forest-900 transition-colors flex items-center gap-1.5">
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((ev, i) => (
              <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/events/${ev.id}`} className="block group border border-zinc-200 bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:border-forest-200 transition-all duration-300">
                  {ev.images.length > 0 && (
                    <div className="h-36 overflow-hidden">
                      <img src={ev.images[0]} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-mono text-[9px] tracking-widest uppercase text-white ${ev.typeColor} px-2 py-0.5`}>{ev.type}</span>
                      <span className="font-mono text-[9px] text-zinc-400 tracking-wider">{ev.date}</span>
                    </div>
                    <h3 className="font-sans font-bold text-zinc-900 text-sm leading-snug group-hover:text-forest-700 transition-colors line-clamp-2">{ev.title}</h3>
                    <div className="flex items-center gap-1.5 mt-3 text-zinc-400 text-xs">
                      <MapPin size={10} /> <span className="truncate">{ev.location}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>

              <img src={event.images[lightboxIdx]} alt={`Photo ${lightboxIdx + 1}`}
                className="w-full max-h-[82vh] object-contain rounded-xl" />

              <div className="flex items-center justify-between mt-3 px-1">
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                  {lightboxIdx + 1} / {event.images.length}
                </span>
                <p className="font-sans text-sm text-white/60">{event.title}</p>
              </div>

              {/* Prev */}
              {event.images.length > 1 && (
                <button onClick={prevImg}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors">
                  <ChevronLeft size={20} />
                </button>
              )}
              {/* Next */}
              {event.images.length > 1 && (
                <button onClick={nextImg}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors">
                  <ChevronRight size={20} />
                </button>
              )}
              {/* Close */}
              <button onClick={() => setLightboxIdx(null)}
                className="absolute -top-4 -right-4 w-9 h-9 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                <X size={16} />
              </button>

              {/* Thumbnail strip */}
              {event.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {event.images.map((img, i) => (
                    <button key={i} onClick={() => setLightboxIdx(i)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === lightboxIdx ? 'border-forest-400' : 'border-white/20 opacity-60 hover:opacity-100'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
