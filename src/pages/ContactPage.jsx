import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, ArrowRight, CheckCircle,
  MessageSquare, Clock, HelpCircle, Send, ChevronDown,
  AlertCircle, Paperclip, ExternalLink
} from 'lucide-react'
import { Section, SectionHeader } from '../components/ui'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    primary: 'MIST, Mirpur Cantonment',
    secondary: 'Dhaka-1216, Bangladesh',
    action: 'Get Directions',
  },
  {
    icon: Mail,
    label: 'Email',
    primary: 'info@mistas.edu.bd',
    secondary: 'alumni@mist.ac.bd',
    action: 'Send Email',
  },
  {
    icon: Phone,
    label: 'Phone',
    primary: '+880 2-9005576',
    secondary: '+880 1711-000000 (Alumni Cell)',
    action: 'Call Now',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    primary: 'Sun – Thu: 9:00 AM – 5:00 PM',
    secondary: 'Fri – Sat: Closed',
    action: null,
  },
]

const faqs = [
  {
    q: 'How do I update my alumni profile information?',
    a: 'Log into the Alumni Portal using your registered email. Navigate to "My Profile" → "Edit Profile" to update any personal, academic, or career information.',
  },
  {
    q: 'How can I reset my MISTAS portal password?',
    a: 'Click "Forgot Password" on the login page. A reset link will be sent to your registered email address within a few minutes.',
  },
  {
    q: 'How do I register for the Annual Reunion?',
    a: 'Visit the News & Events section, find the Annual Reunion event, and click "Register". You will receive a confirmation email with all event details.',
  },
  {
    q: 'Can current MIST students access the Alumni Portal?',
    a: 'The Alumni Portal is exclusively for MIST graduates. Final-year students (6 months before graduation) can create a provisional account pending graduation verification.',
  },
  {
    q: 'How do I post a job on the MISTAS Career Board?',
    a: 'You must be a registered alumnus to post jobs. Log in, go to Careers, and click "Post a Job". All posts are reviewed by our team within 24 hours.',
  },
]

const ticketCategories = [
  'Account / Login Issues',
  'Profile Update Help',
  'Event Registration Support',
  'Payment & Membership',
  'Job Posting Assistance',
  'Technical Issue',
  'General Enquiry',
  'Other',
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', category: '', description: '' })
  const [contactSent, setContactSent] = useState(false)
  const [ticketSent, setTicketSent] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSent(true)
  }

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    setTicketSent(true)
  }

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
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-forest-700 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 font-mono text-xs text-forest-500 mb-8 uppercase tracking-[0.4em]"
          >
            <span>Home</span>
            <div className="w-1 h-1 bg-forest-600 rounded-full" />
            <span className="text-forest-300">Contact & Support</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-display text-6xl md:text-7xl text-white mb-5 leading-tight font-bold"
            >
              We're Here <br />
              <em className="italic text-forest-400">to Help.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-forest-300 text-lg leading-relaxed"
            >
              Reach out to the MISTAS team for questions, support, feedback, or
              partnership inquiries. We typically respond within one business day.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Contact Info + Form ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* Contact Info Panel */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="section-label mb-3">Get In Touch</div>
                <h2 className="font-display text-3xl text-forest-900 font-bold mb-4">Contact Information</h2>
                <p className="font-body text-forest-600 leading-relaxed">
                  Our secretariat is based at MIST campus. Reach us via email, phone, or drop by during office hours.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, primary, secondary, action }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-forest-50 border border-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-forest-600" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-widest text-forest-400 uppercase mb-1">{label}</div>
                      <div className="font-sans font-semibold text-forest-900 text-sm">{primary}</div>
                      <div className="font-sans text-xs text-forest-500 mt-0.5">{secondary}</div>
                      {action && (
                        <button className="text-xs font-sans font-bold text-forest-600 hover:text-forest-800 mt-1.5 flex items-center gap-1 transition-colors">
                          {action} <ExternalLink size={10} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 border border-forest-100 overflow-hidden"
              >
                <div className="h-52 bg-forest-50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" />
                  <div className="relative text-center">
                    <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <p className="font-sans text-sm font-medium text-forest-700">MIST Campus</p>
                    <p className="font-mono text-xs text-forest-400 mt-1">Mirpur Cantonment, Dhaka-1216</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-white border-t border-forest-100 text-xs font-sans font-bold text-forest-600 hover:text-forest-800 hover:bg-forest-50 transition-colors"
                >
                  Open in Google Maps <ExternalLink size={11} />
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="section-label mb-3">Send a Message</div>
              <h2 className="font-display text-3xl text-forest-900 font-bold mb-8">How Can We Help?</h2>

              {contactSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-forest-200 bg-forest-50 p-10 text-center"
                >
                  <CheckCircle size={40} className="text-forest-600 mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-forest-900 font-bold mb-2">Message Sent!</h3>
                  <p className="font-body text-forest-600 mb-5">Thank you for reaching out. We will respond to your message within one business day.</p>
                  <button
                    onClick={() => setContactSent(false)}
                    className="btn-outline text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Email Address *</label>
                      <input
                        required
                        type="email"
                        className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Subject *</label>
                    <input
                      required
                      type="text"
                      className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white"
                      placeholder="What is this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Batch & Department (optional)</label>
                    <input
                      type="text"
                      className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white"
                      placeholder="e.g. CSE 2010, CE 2005"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                    Send Message <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Help Desk / Support Ticket ─────────────────────────────── */}
      <section className="py-24 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* FAQs */}
            <div>
              <SectionHeader
                label="FAQ"
                title="Common Questions"
                subtitle="Quick answers to frequently asked questions."
              />

              <div className="space-y-2 mt-6">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="border border-forest-100 bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-forest-50 transition-colors"
                    >
                      <span className="font-sans font-semibold text-sm text-forest-900 leading-snug">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-forest-500 flex-shrink-0 transition-transform duration-300 mt-0.5 ${openFaq === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-4 border-t border-forest-100"
                      >
                        <p className="font-body text-sm text-forest-600 leading-relaxed pt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support Ticket Form */}
            <div>
              <div className="section-label mb-3">Help Desk</div>
              <h2 className="font-display text-3xl text-forest-900 font-bold mb-3">Submit a Support Ticket</h2>
              <p className="font-body text-forest-600 leading-relaxed mb-8">
                For technical issues or account problems, submit a support ticket.
                Our team will respond within 1–2 business days.
              </p>

              {ticketSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-forest-200 bg-white p-8 text-center"
                >
                  <CheckCircle size={36} className="text-forest-600 mx-auto mb-3" />
                  <h3 className="font-display text-xl text-forest-900 font-bold mb-2">Ticket Submitted!</h3>
                  <p className="font-body text-forest-600 text-sm mb-4">
                    Your ticket ID is <span className="font-mono font-bold text-forest-800">#TKT-{Math.floor(Math.random() * 90000 + 10000)}</span>.
                    Expect a reply within 1–2 business days.
                  </p>
                  <button onClick={() => setTicketSent(false)} className="btn-outline text-sm">Submit Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-5 bg-white border border-forest-100 p-7">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Your Name *</label>
                      <input required type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Email *</label>
                      <input required type="email" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors" placeholder="Email address" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Issue Category *</label>
                    <div className="relative">
                      <select required className="w-full appearance-none border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white pr-10">
                        <option value="">Select a category</option>
                        {ticketCategories.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Describe the Issue *</label>
                    <textarea required rows={4} className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors resize-none" placeholder="Please describe your issue in detail..." />
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-dashed border-forest-200 cursor-pointer hover:border-forest-400 transition-colors">
                    <Paperclip size={16} className="text-forest-400" />
                    <span className="font-sans text-sm text-forest-500">Attach a screenshot (optional)</span>
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    Submit Ticket <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feedback ─────────────────────────────────────────────── */}
      <section className="py-20 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageSquare size={28} className="text-forest-400 mx-auto mb-5" />
            <h2 className="font-display text-4xl text-white font-bold mb-4">Share Your Feedback</h2>
            <p className="font-body text-forest-300 text-lg leading-relaxed mb-8">
              Help us improve MISTAS. Your suggestions are directly reviewed by the Executive Council and shape the future of the platform.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left">
              <textarea
                rows={4}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-forest-400 px-5 py-4 text-sm font-sans focus:outline-none focus:border-forest-400 transition-colors resize-none backdrop-blur-sm"
                placeholder="What would you like to improve or suggest?"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" className="bg-white/10 border border-white/20 text-white placeholder-forest-400 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-400 transition-colors" placeholder="Your name (optional)" />
                <input type="email" className="bg-white/10 border border-white/20 text-white placeholder-forest-400 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-400 transition-colors" placeholder="Email (optional)" />
              </div>
              <button type="submit" className="btn-primary bg-white text-forest-900 hover:bg-forest-50 w-full flex items-center justify-center gap-2 py-4">
                Submit Feedback <Send size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}
