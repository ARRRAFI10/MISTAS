import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react'
import { Section, SectionHeader, Tag } from '../ui'
import { motion } from 'framer-motion'

const news = [
  {
    id: 1,
    tag: 'Global Reunion',
    tagColor: 'green',
    title: 'MIST Alumni in Australia Celebrate Grand Reunion in Melbourne',
    excerpt: 'On 18 April 2026, the first-ever reunion of MIST alumni in Australia was held in Melbourne, bringing together former students for an unforgettable evening of nostalgia and cultural celebration.',
    date: 'Apr 18, 2026',
    readTime: '4 min read',
    image: '/australia-reunion.jpg',
    featured: true,
  },
  {
    id: 2,
    tag: 'Seminar',
    tagColor: 'gold',
    title: 'International Career Seminar with Industry Leaders',
    excerpt: 'Prominent alumni from Fortune 500 companies to share insights on global career opportunities.',
    date: 'Nov 28, 2024',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    tag: 'Achievement',
    tagColor: 'green',
    title: 'MIST Alumnus Appointed as Joint Secretary',
    excerpt: 'Celebrating Brigadier General (Retd.) Rafiq Islam\'s appointment to a key national position.',
    date: 'Nov 20, 2024',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
]

const upcomingEvents = [
  { date: { day: '15', month: 'DEC' }, title: 'Annual Alumni Reunion 2024', location: 'MIST Campus, Dhaka', time: '09:00 AM' },
  { date: { day: '22', month: 'DEC' }, title: 'Tech Talk: AI in Defence Systems', location: 'Online Webinar', time: '07:30 PM' },
  { date: { day: '05', month: 'JAN' }, title: 'Batch 2005 — 20-Year Reunion', location: 'Radisson Blu, Dhaka', time: '06:00 PM' },
  { date: { day: '18', month: 'JAN' }, title: 'Mentorship Program Launch 2025', location: 'MIST Auditorium', time: '10:00 AM' },
]

export default function NewsEvents() {
  const [featured, ...rest] = news

  return (
    <Section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-forest-600" />
              <span className="font-mono text-xs text-forest-600 tracking-[0.3em] uppercase font-bold">Latest Updates</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-900 font-bold tracking-tight">News & Announcements</h2>
          </div>
          <Link to="/news" className="group flex items-center gap-2 text-sm font-sans font-bold text-forest-700 hover:text-forest-900 transition-colors">
            View All Updates
            <span className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center group-hover:bg-forest-100 transition-colors">
               <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left Column: News */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-2xl hover:shadow-forest-900/10 transition-all duration-500 cursor-pointer"
            >
              <div className="h-72 relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-6 left-6">
                   <span className="px-4 py-1.5 bg-forest-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                     {featured.tag}
                   </span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-2"><Calendar size={12} className="text-forest-500"/> {featured.date}</span>
                  <span className="flex items-center gap-2"><Clock size={12} className="text-forest-500"/> {featured.readTime}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-zinc-900 mb-4 group-hover:text-forest-700 transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="font-body text-zinc-600 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-forest-700 group-hover:text-forest-900">
                  Read Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>

            {/* Sub Articles */}
            <div className="grid md:grid-cols-2 gap-8">
              {rest.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-forest-900 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                         {item.tag}
                       </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-zinc-900 mb-3 group-hover:text-forest-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-forest-400"/> {item.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
          {/* Right Column: Demo Events & Announcements */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-display text-2xl font-bold text-zinc-900 mb-4">More Highlights</h3>
            <div className="grid gap-4">
              {rest.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-lg transition-all cursor-pointer flex"
                >
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-l-[2rem] flex-shrink-0" />
                  <div className="p-6 flex flex-col flex-1">
                    <Tag color={item.tagColor}>{item.tag}</Tag>
                    <h4 className="font-display text-lg font-semibold text-zinc-900 mt-2">{item.title}</h4>
                    <p className="font-body text-sm text-zinc-600 mt-2">{item.excerpt}</p>
                    <span className="flex items-center gap-1 mt-3 text-xs text-forest-500"><Calendar size={12} /> {item.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      <section className="mt-16">
  <div className="flex items-center gap-3 mb-8">
    <div className="w-10 h-px bg-forest-600" />
    <span className="font-mono text-xs text-forest-600 tracking-[0.3em] uppercase font-bold">Upcoming Events</span>
  </div>
  <h3 className="font-display text-3xl md:text-4xl text-zinc-900 font-bold mb-6">Stay Informed</h3>
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {upcomingEvents.map((event, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 * i }}
        className="group p-6 bg-white rounded-2xl border border-zinc-100 hover:shadow-lg transition-all cursor-pointer"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-forest-500/10 rounded-full flex items-center justify-center text-forest-600 font-display text-2xl font-bold">
            {event.date.day}
          </div>
          <div>
            <h4 className="font-sans font-bold text-base text-zinc-900">{event.title}</h4>
            <p className="text-xs text-zinc-500">{event.location}</p>
            <p className="flex items-center text-xs text-zinc-500 mt-1"><Clock size={12} className="mr-1" /> {event.time}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>
</div>
    </Section>
  )
}
