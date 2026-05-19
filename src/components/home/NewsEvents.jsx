import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { events as allEvents } from "../../data/eventsData";
import { newsItems } from "../../data/newsData";
import { Section } from "../ui";

const featuredNews = newsItems.find((n) => n.id === 6);
const restNews = newsItems.filter((n) => n.id !== 6).slice(0, 4);

const upcomingEvents = allEvents.slice(0, 4);

export default function NewsEvents() {
  const featured = featuredNews;
  const rest = restNews;

  return (
    <Section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-forest-600" />
              <span className="font-mono text-xs text-forest-600 tracking-[0.3em] uppercase font-bold">
                Latest Updates
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-900 font-bold tracking-tight">
              News & Announcements
            </h2>
          </div>
          <Link
            to="/news"
            className="group flex items-center gap-2 text-sm font-sans font-bold text-forest-700 hover:text-forest-900 transition-colors"
          >
            View All Updates
            <span className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center group-hover:bg-forest-100 transition-colors">
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Featured Event */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Featured Article */}
            <Link
              to={`/news/${featured.id}`}
              className="block group bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-2xl hover:shadow-forest-900/15 transition-all duration-500"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-80 relative overflow-hidden bg-zinc-200">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-forest-600/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-forest-600 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-2 bg-forest-50 px-3 py-1.5 rounded-lg">
                      <Calendar size={14} className="text-forest-500" />{" "}
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-2 bg-forest-50 px-3 py-1.5 rounded-lg">
                      <Clock size={14} className="text-forest-500" />{" "}
                      {featured.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-zinc-900 mb-4 group-hover:text-forest-700 transition-colors leading-snug">
                    {featured.title}
                  </h3>
                  <p className="font-body text-zinc-600 leading-relaxed mb-8 text-lg">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-forest-700 group-hover:text-forest-900 hover:gap-3 transition-all">
                    Read Article
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Right Column: 4 Events in 2x2 Grid */}
          <div className="lg:col-span-7">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-forest-500" />
                <h3 className="font-display text-2xl font-bold text-zinc-900">
                  More Stories
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {rest.map((item, i) => (
                  <Link key={item.id} to={`/news/${item.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-lg hover:border-forest-300 transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="h-44 relative overflow-hidden bg-zinc-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-forest-900 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-display text-base font-bold text-zinc-900 mb-2 group-hover:text-forest-700 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-600 mb-4 flex-1 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                            <Calendar size={12} className="text-forest-400" />{" "}
                            {item.date}
                          </span>
                          <ChevronRight
                            size={14}
                            className="text-forest-500 group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="mt-20 pt-12 border-t border-zinc-200">
          {/* Ambient background effects */}
          <div className="absolute -right-40 top-1/2 w-96 h-96 bg-forest-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="absolute -left-40 bottom-0 w-80 h-80 bg-forest-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-forest-600" />
              <span className="font-mono text-xs text-forest-600 tracking-[0.3em] uppercase font-bold">
                Upcoming Events
              </span>
            </div>
            <div className="mb-12">
              <h3 className="font-display text-4xl md:text-5xl text-zinc-900 font-bold mb-3">
                Stay Informed
              </h3>
              <p className="text-forest-700 text-lg max-w-2xl">
                Join us for these exciting alumni gatherings, seminars, and
                community events.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.12 * i }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-forest-400/20 to-forest-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 bg-white rounded-2xl border border-zinc-100 hover:border-forest-300 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-500 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Date */}
                    <div className="mb-6 flex items-baseline gap-3">
                      <div className="font-display text-4xl font-bold text-forest-600 leading-none">
                        {event.dateDay}
                      </div>
                      <div className="font-mono text-sm font-semibold text-forest-500 tracking-wide">
                        {event.dateMonth}
                      </div>
                    </div>

                    <div className="flex-1 mb-6">
                      <span
                        className={`font-mono text-[9px] tracking-widest uppercase text-white ${event.typeColor} px-2 py-0.5 inline-block mb-3`}
                      >
                        {event.type}
                      </span>
                      <h4 className="font-display text-lg font-bold text-zinc-900 leading-snug group-hover:text-forest-700 transition-colors">
                        {event.title}
                      </h4>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-zinc-100">
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-forest-500 flex-shrink-0 mt-0.5"
                        />
                        <span className="font-body text-sm text-zinc-600 line-clamp-2">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock
                          size={16}
                          className="text-forest-500 flex-shrink-0"
                        />
                        <span className="font-mono text-sm font-semibold text-zinc-700">
                          {event.time}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4">
                      <Link
                        to={`/events/${event.id}`}
                        className="w-full py-2.5 px-4 bg-forest-50 text-forest-700 font-semibold text-sm rounded-lg hover:bg-forest-100 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ChevronRight
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Section>
  );
}
