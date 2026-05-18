import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Briefcase, Calendar, Bell, Settings, LogOut,
  MessageSquare, Star, Edit, Shield, Globe, MapPin,
  TrendingUp, CheckCircle, Clock, ChevronRight, Award,
  Users, BookOpen, Linkedin, Mail, Phone, Upload,
  BarChart2, FileText, GraduationCap, Activity
} from 'lucide-react'

const sidebarLinks = [
  { label: 'Dashboard', icon: BarChart2, id: 'dashboard' },
  { label: 'My Profile', icon: User, id: 'profile' },
  { label: 'Job Activity', icon: Briefcase, id: 'jobs' },
  { label: 'My Events', icon: Calendar, id: 'events' },
  { label: 'Notifications', icon: Bell, id: 'notifications', badge: 3 },
  { label: 'Membership', icon: Shield, id: 'membership' },
  { label: 'Privacy Settings', icon: Settings, id: 'privacy' },
]

const recentActivity = [
  { type: 'event', text: 'Registered for "Career & Tech Symposium 2025"', time: '2 hours ago', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
  { type: 'job', text: 'Applied to "Senior Software Engineer" at bKash', time: '1 day ago', icon: Briefcase, color: 'text-forest-600 bg-forest-50' },
  { type: 'forum', text: 'Replied in "Breaking into Big Tech" discussion', time: '2 days ago', icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
  { type: 'mentor', text: 'Mentorship session with Dr. Nusrat Jahan completed', time: '5 days ago', icon: Star, color: 'text-amber-600 bg-amber-50' },
  { type: 'profile', text: 'Profile updated with new job title', time: '1 week ago', icon: Edit, color: 'text-zinc-600 bg-zinc-50' },
]

const upcomingEvents = [
  { title: 'Career & Tech Symposium 2025', date: 'Jun 6, 2025', type: 'Seminar' },
  { title: 'CSE Alumni Network Meetup', date: 'Jun 15, 2025', type: 'Networking' },
  { title: 'Annual Reunion 2025', date: 'Jul 12, 2025', type: 'Reunion' },
]

const notifications = [
  { text: 'New job posting matched your profile: "AI Research Scientist" at Samsung', time: '1h', unread: true },
  { text: 'Your mentorship request to Dr. Nusrat Jahan was accepted', time: '3h', unread: true },
  { text: 'MISTAS Annual Reunion 2025 — Early bird registration ends in 7 days', time: '1d', unread: true },
  { text: 'New discussion in CSE Alumni Network: "Top AI tools for 2025"', time: '2d', unread: false },
  { text: 'Your membership renewal is due in 45 days', time: '3d', unread: false },
]

export default function PortalPage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [editMode, setEditMode] = useState(false)

  const alumnus = {
    name: 'Mohammad Arif Hossain',
    batch: 'CSE 2010',
    role: 'Senior Software Engineer',
    org: 'bKash Limited',
    location: 'Dhaka, Bangladesh',
    email: 'arif.hossain@alumni.mist.ac.bd',
    phone: '+880 1711-000000',
    membership: 'Lifetime Member',
    memberSince: 'January 2011',
    profileCompletion: 82,
    initials: 'AH',
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">

      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside className="w-64 bg-forest-950 flex-shrink-0 hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-forest-900">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">MISTAS</div>
              <div className="font-mono text-[8px] text-forest-500 tracking-widest uppercase">Alumni Portal</div>
            </div>
          </Link>
        </div>

        {/* Profile snippet */}
        <div className="px-5 py-5 border-b border-forest-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="font-display text-sm font-bold text-white">{alumnus.initials}</span>
            </div>
            <div className="min-w-0">
              <div className="font-sans font-semibold text-sm text-white truncate">{alumnus.name}</div>
              <div className="font-mono text-[9px] text-forest-400 tracking-wide truncate">{alumnus.batch}</div>
            </div>
          </div>

          {/* Profile completion bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] font-mono text-forest-500 mb-1.5">
              <span>Profile Complete</span>
              <span className="text-forest-400">{alumnus.profileCompletion}%</span>
            </div>
            <div className="h-1 bg-forest-900 rounded-full">
              <div
                className="h-full bg-forest-500 rounded-full transition-all duration-500"
                style={{ width: `${alumnus.profileCompletion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3">
          {sidebarLinks.map(({ label, icon: Icon, id, badge }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-sans font-medium mb-0.5 transition-all duration-200 text-left ${
                activeSection === id
                  ? 'bg-forest-700 text-white'
                  : 'text-forest-400 hover:bg-forest-900 hover:text-forest-200'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={16} />
                {label}
              </span>
              {badge && (
                <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-mono flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-forest-900">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-sans text-forest-500 hover:text-forest-300 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-display text-xl text-forest-900 font-bold capitalize">
            {sidebarLinks.find((l) => l.id === activeSection)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-forest-700 hover:border-forest-300 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-forest-700 rounded-xl flex items-center justify-center">
              <span className="font-display text-xs font-bold text-white">{alumnus.initials}</span>
            </div>
          </div>
        </div>

        <div className="p-6">

          {/* ── Dashboard ── */}
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Welcome banner */}
              <div className="bg-forest-900 text-white p-6 mb-6 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-36 h-36 bg-forest-700 rounded-full opacity-30" />
                <div className="relative">
                  <p className="font-mono text-xs text-forest-400 tracking-widest uppercase mb-1">Good morning</p>
                  <h2 className="font-display text-2xl font-bold mb-1">Welcome back, {alumnus.name.split(' ')[1]}!</h2>
                  <p className="font-sans text-sm text-forest-300">You have 3 unread notifications and 2 upcoming events.</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Activity, label: 'Sessions', value: '8', sub: 'this month' },
                  { icon: Briefcase, label: 'Applications', value: '3', sub: 'active' },
                  { icon: Calendar, label: 'Events Registered', value: '2', sub: 'upcoming' },
                  { icon: Users, label: 'Connections', value: '47', sub: 'alumni' },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="bg-white border border-zinc-100 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={16} className="text-forest-500" />
                      <TrendingUp size={12} className="text-emerald-400" />
                    </div>
                    <div className="font-display text-3xl font-bold text-forest-900 mb-0.5">{value}</div>
                    <div className="font-mono text-[10px] text-forest-400 tracking-widest uppercase">{label}</div>
                    <div className="font-sans text-xs text-zinc-400 mt-1">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white border border-zinc-100">
                  <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                    <h3 className="font-sans font-bold text-forest-900 text-sm">Recent Activity</h3>
                    <span className="font-mono text-[10px] text-forest-400 tracking-widest uppercase">Last 30 days</span>
                  </div>
                  <div className="divide-y divide-zinc-50">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex gap-3 px-5 py-3.5 hover:bg-zinc-50 transition-colors">
                        <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                          <item.icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-xs text-forest-700 leading-snug">{item.text}</p>
                          <p className="font-mono text-[10px] text-zinc-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="space-y-4">
                  <div className="bg-white border border-zinc-100">
                    <div className="px-5 py-4 border-b border-zinc-100">
                      <h3 className="font-sans font-bold text-forest-900 text-sm">Upcoming Events</h3>
                    </div>
                    <div className="divide-y divide-zinc-50">
                      {upcomingEvents.map((event, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                          <div className="w-10 h-10 bg-forest-50 border border-forest-100 flex items-center justify-center flex-shrink-0">
                            <Calendar size={16} className="text-forest-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-forest-900 truncate">{event.title}</p>
                            <p className="font-mono text-[10px] text-forest-400 mt-0.5">{event.date}</p>
                          </div>
                          <span className="text-[9px] font-mono tracking-widest uppercase text-forest-500 bg-forest-50 border border-forest-100 px-2 py-0.5 flex-shrink-0">{event.type}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-zinc-100">
                      <button
                        onClick={() => setActiveSection('events')}
                        className="text-xs font-sans font-bold text-forest-700 hover:text-forest-900 flex items-center gap-1 transition-colors"
                      >
                        View All Events <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Membership card */}
                  <div className="bg-forest-900 p-5 relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-forest-700 rounded-full opacity-40" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield size={16} className="text-gold-400" />
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gold-400">Lifetime Member</span>
                      </div>
                      <p className="font-sans text-xs text-forest-300 mb-3">Member since {alumnus.memberSince} · Verified</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-forest-400" />
                        <span className="font-sans text-xs text-forest-300">All features unlocked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Profile ── */}
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl"
            >
              <div className="bg-white border border-zinc-100 mb-6">
                <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                  <h3 className="font-sans font-bold text-forest-900">Profile Details</h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`flex items-center gap-2 text-sm font-sans font-medium px-4 py-2 transition-all ${editMode ? 'bg-forest-700 text-white' : 'border border-forest-300 text-forest-700 hover:bg-forest-50'}`}
                  >
                    {editMode ? <><CheckCircle size={14} /> Save Changes</> : <><Edit size={14} /> Edit Profile</>}
                  </button>
                </div>

                {/* Profile header */}
                <div className="p-6 flex items-center gap-6 border-b border-zinc-100">
                  <div className="relative">
                    <div className="w-20 h-20 bg-forest-700 rounded-xl flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-white">{alumnus.initials}</span>
                    </div>
                    {editMode && (
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-forest-700 text-white flex items-center justify-center hover:bg-forest-800 transition-colors">
                        <Upload size={12} />
                      </button>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-forest-900 font-bold">{alumnus.name}</h2>
                    <p className="font-sans text-sm text-forest-500 mt-0.5">{alumnus.role} · {alumnus.org}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-gold-600 bg-yellow-50 border border-yellow-200 px-2 py-0.5">{alumnus.membership}</span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-forest-600 bg-forest-50 border border-forest-100 px-2 py-0.5">{alumnus.batch}</span>
                    </div>
                  </div>
                </div>

                {/* Profile fields */}
                <div className="p-6 grid sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Email', value: alumnus.email, icon: Mail },
                    { label: 'Phone', value: alumnus.phone, icon: Phone },
                    { label: 'Location', value: alumnus.location, icon: MapPin },
                    { label: 'LinkedIn', value: 'linkedin.com/in/arif-hossain', icon: Linkedin },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-400 mb-2 flex items-center gap-1.5">
                        <Icon size={10} /> {label}
                      </label>
                      {editMode ? (
                        <input
                          defaultValue={value}
                          className="w-full border border-forest-200 px-3 py-2.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors"
                        />
                      ) : (
                        <p className="font-sans text-sm text-forest-700">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile completion */}
              <div className="bg-white border border-zinc-100 p-6">
                <h3 className="font-sans font-bold text-forest-900 mb-4 text-sm">Profile Completion</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-2 bg-forest-50 rounded-full">
                    <div
                      className="h-full bg-forest-600 rounded-full"
                      style={{ width: `${alumnus.profileCompletion}%` }}
                    />
                  </div>
                  <span className="font-display text-xl font-bold text-forest-800">{alumnus.profileCompletion}%</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Basic Info', done: true },
                    { label: 'Academic Details', done: true },
                    { label: 'Profile Photo', done: false },
                    { label: 'Career History', done: true },
                    { label: 'LinkedIn Linked', done: true },
                    { label: 'Skills / Expertise', done: false },
                  ].map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-2 text-sm font-sans">
                      {done ? (
                        <CheckCircle size={14} className="text-forest-500 flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 border-2 border-zinc-300 rounded-full flex-shrink-0" />
                      )}
                      <span className={done ? 'text-forest-700' : 'text-zinc-400'}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Notifications ── */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl"
            >
              <div className="bg-white border border-zinc-100">
                <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                  <h3 className="font-sans font-bold text-forest-900">Notifications</h3>
                  <button className="text-xs font-sans text-forest-500 hover:text-forest-700">Mark all read</button>
                </div>
                <div className="divide-y divide-zinc-50">
                  {notifications.map((notif, i) => (
                    <div key={i} className={`flex gap-4 px-5 py-4 transition-colors hover:bg-zinc-50 ${notif.unread ? 'bg-forest-50/30' : ''}`}>
                      {notif.unread && <div className="w-2 h-2 bg-forest-500 rounded-full mt-1.5 flex-shrink-0" />}
                      {!notif.unread && <div className="w-2 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className={`font-sans text-sm leading-relaxed ${notif.unread ? 'text-forest-900 font-medium' : 'text-zinc-500'}`}>{notif.text}</p>
                        <p className="font-mono text-[10px] text-zinc-400 mt-1">{notif.time} ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Membership ── */}
          {activeSection === 'membership' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl"
            >
              <div className="bg-forest-900 text-white p-8 mb-6 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-forest-700 rounded-full opacity-30" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={24} className="text-gold-400" />
                    <span className="font-mono text-sm tracking-widest uppercase text-gold-400">Lifetime Membership</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-2">{alumnus.name}</h2>
                  <p className="font-sans text-sm text-forest-300">Member ID: MISTAS-2011-4821 · {alumnus.batch}</p>
                  <p className="font-sans text-sm text-forest-400 mt-1">Active since {alumnus.memberSince}</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-100 p-6">
                <h3 className="font-sans font-bold text-forest-900 mb-5 text-sm">Membership Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Full alumni directory access',
                    'Priority event registration',
                    'Job board posting & searching',
                    'Exclusive lifetime member events',
                    'Community forum access',
                    'Lifetime directory listing',
                    'Voting rights in MISTAS elections',
                    'All future portal features',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm font-sans text-forest-700">
                      <CheckCircle size={14} className="text-forest-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Privacy Settings ── */}
          {activeSection === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl"
            >
              <div className="bg-white border border-zinc-100">
                <div className="px-5 py-4 border-b border-zinc-100">
                  <h3 className="font-sans font-bold text-forest-900">Privacy Settings</h3>
                  <p className="font-sans text-xs text-forest-500 mt-1">Control who can see your profile information.</p>
                </div>
                <div className="divide-y divide-zinc-50">
                  {[
                    { label: 'Show email to other alumni', desc: 'Your email will be visible in the directory', enabled: false },
                    { label: 'Show phone number', desc: 'Phone visible to verified alumni only', enabled: false },
                    { label: 'Show current employer', desc: 'Organization name in directory listing', enabled: true },
                    { label: 'Show location', desc: 'City and country visible in directory', enabled: true },
                    { label: 'Allow mentorship requests', desc: 'Other alumni can request you as mentor', enabled: true },
                    { label: 'Receive job match notifications', desc: 'Get notified of relevant job postings', enabled: true },
                    { label: 'Appear in public directory', desc: 'Your profile shows up in search results', enabled: true },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="font-sans font-medium text-sm text-forest-900">{setting.label}</p>
                        <p className="font-sans text-xs text-zinc-400 mt-0.5">{setting.desc}</p>
                      </div>
                      <label className="relative cursor-pointer flex-shrink-0 ml-4">
                        <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                        <div className="w-10 h-6 bg-zinc-200 peer-checked:bg-forest-600 rounded-full transition-colors" />
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 border-t border-zinc-100">
                  <button className="btn-primary text-sm flex items-center gap-2">
                    Save Settings <CheckCircle size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Other sections placeholder ── */}
          {(activeSection === 'jobs' || activeSection === 'events') && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-forest-50 border border-forest-100 flex items-center justify-center mx-auto mb-5">
                {activeSection === 'jobs' ? <Briefcase size={24} className="text-forest-400" /> : <Calendar size={24} className="text-forest-400" />}
              </div>
              <h3 className="font-display text-xl text-forest-900 font-bold mb-2 capitalize">
                {activeSection === 'jobs' ? 'Job Activity' : 'My Events'}
              </h3>
              <p className="font-body text-forest-500 mb-6 text-sm leading-relaxed">
                {activeSection === 'jobs'
                  ? 'Track your job applications, saved jobs, and referrals in one place.'
                  : 'View all events you have registered for, with details and updates.'}
              </p>
              <Link
                to={activeSection === 'jobs' ? '/careers' : '/news'}
                className="btn-primary inline-flex items-center gap-2"
              >
                {activeSection === 'jobs' ? 'Browse Jobs' : 'Browse Events'} <ChevronRight size={14} />
              </Link>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  )
}
