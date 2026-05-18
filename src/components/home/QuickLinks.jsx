import { Link } from 'react-router-dom'
import { Briefcase, Users, BookOpen, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section } from '../ui'

const quickLinks = [
  {
    icon: Users,
    title: 'Alumni Directory',
    description: 'Find and connect with MIST graduates from any batch, department, or location worldwide.',
    cta: 'Search Directory',
    path: '/directory',
    accent: 'from-forest-800 to-forest-600',
  },
  {
    icon: Briefcase,
    title: 'Job & Internship Board',
    description: 'Explore career opportunities posted by alumni and companies, or share openings at your organization.',
    cta: 'View Opportunities',
    path: '/careers',
    accent: 'from-forest-700 to-forest-500',
  },
  {
    icon: BookOpen,
    title: 'Mentorship Program',
    description: 'Connect with experienced alumni mentors or offer your expertise to guide the next generation.',
    cta: 'Get Mentored',
    path: '/engagement',
    accent: 'from-forest-900 to-forest-700',
  },
]

export default function QuickLinks() {
  return (
    <Section className="py-20 bg-forest-50 overflow-hidden relative">

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #155515 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-forest-500" />
            <span className="section-label">Quick Access</span>
            <div className="w-6 h-px bg-forest-500" />
          </div>
          <h2 className="display-heading text-3xl md:text-4xl">What Are You Looking For?</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map(({ icon: Icon, title, description, cta, path, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.13, ease: 'easeOut' }}
            >
              <Link
                to={path}
                className="group relative bg-white border border-forest-200 overflow-hidden rounded-2xl hover:border-forest-400 hover:shadow-xl transition-all duration-400 block h-full"
              >
                <div className={`h-1.5 bg-gradient-to-r ${accent}`} />

                <div className="p-8">
                  <div className={`w-12 h-12 bg-gradient-to-br ${accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="font-display text-xl text-forest-900 mb-3 group-hover:text-forest-700 transition-colors">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-forest-600 leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-sans font-semibold text-forest-700 group-hover:gap-3 transition-all">
                    {cta} <ArrowRight size={14} />
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                  <Icon size={80} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
