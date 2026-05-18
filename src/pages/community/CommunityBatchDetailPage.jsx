import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Users, BookOpen, MessageSquare, GraduationCap, Mail, ChevronRight, Heart, Pin } from 'lucide-react'
import { batchGroups } from '../../data/communityData'

const seedMessages = (year) => [
  { id: 1, author: 'Tanvir A.', avatar: 'TA', text: `Welcome to the Batch ${year} group! Great to see everyone here.`, time: '2d ago', likes: 12, mine: false },
  { id: 2, author: 'Sadia K.', avatar: 'SK', text: 'Has anyone been following the MIST alumni reunion plans for next year?', time: '2d ago', likes: 8, mine: false },
  { id: 3, author: 'Rafiq M.', avatar: 'RM', text: 'Yes! I heard it will be held at the MIST campus. Really looking forward to it.', time: '1d ago', likes: 15, mine: false },
  { id: 4, author: 'You', avatar: 'ME', text: 'Count me in! Has the date been confirmed yet?', time: '22h ago', likes: 3, mine: true },
  { id: 5, author: 'Tanvir A.', avatar: 'TA', text: 'Not yet officially but the committee is targeting March. Check the announcements tab.', time: '20h ago', likes: 6, mine: false },
]

const announcements = [
  { id: 1, title: 'Annual Reunion Planning Started', date: 'May 10, 2025', pinned: true },
  { id: 2, title: 'Batch WhatsApp Group — join link inside', date: 'Apr 28, 2025', pinned: false },
  { id: 3, title: 'Job Board: New openings from batch members', date: 'Apr 15, 2025', pinned: false },
]

export default function CommunityBatchDetailPage() {
  const { year } = useParams()
  const batch = batchGroups.find(b => String(b.year) === year)
  const [messages, setMessages] = useState(seedMessages(year))
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('chat')

  if (!batch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-forest-900 mb-4">Batch not found</h2>
          <Link to="/community/batch" className="btn-primary">Back to Batches</Link>
        </div>
      </div>
    )
  }

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      author: 'You',
      avatar: 'ME',
      text,
      time: 'Just now',
      likes: 0,
      mine: true,
    }])
    setInput('')
  }

  return (
    <>
      {/* Header */}
      <div className="bg-forest-950 pt-20 pb-0 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 py-6 border-b border-forest-800">
            <Link to="/community/batch" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase text-forest-500 hover:text-forest-300 transition-colors">
              <ArrowLeft size={12} /> Batch Groups
            </Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-forest-400">Batch {year}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-2 h-2 rounded-full ${batch.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{batch.status} Group</span>
              </div>
              <h1 className="font-display text-6xl md:text-7xl font-bold text-white leading-none">
                Batch <span className="text-forest-400">'{String(batch.year).slice(2)}</span>
              </h1>
              <p className="font-sans text-forest-400 mt-3">
                {batch.departments} departments · Rep: {batch.lead} · {batch.leadTitle}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="btn-primary flex items-center gap-2">
                <Users size={14} /> Join Group
              </button>
              <button className="btn-outline border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white flex items-center gap-2">
                <Mail size={14} /> Contact Rep
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-forest-800 grid grid-cols-3 divide-x divide-forest-800">
            {[
              { n: batch.members.toLocaleString(), l: 'Members', icon: <Users size={14} /> },
              { n: batch.departments, l: 'Departments', icon: <BookOpen size={14} /> },
              { n: batch.posts, l: 'Posts', icon: <MessageSquare size={14} /> },
            ].map(({ n, l, icon }) => (
              <div key={l} className="py-5 px-4 flex items-center gap-4">
                <div className="text-forest-500">{icon}</div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{n}</div>
                  <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase">{l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mt-1">
            {['chat', 'announcements', 'members'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-mono text-[10px] tracking-[0.35em] uppercase transition-colors whitespace-nowrap border-b-2 ${
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

      {/* Body */}
      <div className="bg-zinc-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* ── Chat Tab ── */}
          {activeTab === 'chat' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat window */}
              <div className="lg:col-span-2 bg-white border border-forest-100 flex flex-col" style={{ minHeight: '560px' }}>
                <div className="border-b border-forest-100 px-6 py-4 flex items-center gap-3">
                  <MessageSquare size={16} className="text-forest-500" />
                  <span className="font-sans font-semibold text-forest-900 text-sm">Batch {year} Group Chat</span>
                  <span className="ml-auto font-mono text-[9px] text-forest-400 tracking-widest uppercase">{batch.members.toLocaleString()} members</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.mine ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        msg.mine ? 'bg-forest-600 text-white' : 'bg-forest-100 text-forest-700'
                      }`}>
                        {msg.avatar}
                      </div>
                      <div className={`max-w-[72%] ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        {!msg.mine && (
                          <span className="font-sans text-xs font-semibold text-forest-700">{msg.author}</span>
                        )}
                        <div className={`px-4 py-3 text-sm font-sans leading-relaxed ${
                          msg.mine
                            ? 'bg-forest-700 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl'
                            : 'bg-forest-50 text-forest-800 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
                        }`}>
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[9px] text-forest-400">{msg.time}</span>
                          <button className="flex items-center gap-1 font-mono text-[9px] text-forest-400 hover:text-forest-600 transition-colors">
                            <Heart size={9} /> {msg.likes}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-forest-100 px-4 py-4 flex gap-3 items-center">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message Batch ${year}...`}
                    className="flex-1 border border-forest-200 px-4 py-2.5 text-sm font-sans text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-forest-700 hover:bg-forest-600 text-white px-4 py-2.5 flex items-center gap-2 transition-colors text-sm font-sans font-bold"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* About */}
                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">About This Group</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-forest-800 flex items-center justify-center">
                      <GraduationCap size={18} className="text-forest-300" />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-forest-900 text-sm">MIST Batch {year}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-wider uppercase">{batch.status} · {batch.departments} depts.</div>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-forest-500 leading-relaxed mb-4">
                    Official group for all MIST Batch {year} graduates. Stay connected, share updates, and collaborate.
                  </p>
                  <div className="border-t border-forest-100 pt-4">
                    <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase mb-2">Batch Representative</div>
                    <div className="font-sans font-semibold text-forest-900 text-sm">{batch.lead}</div>
                    <div className="font-sans text-xs text-forest-500">{batch.leadTitle}</div>
                  </div>
                </div>

                {/* Pinned announcements */}
                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">Pinned</div>
                  <div className="space-y-3">
                    {announcements.filter(a => a.pinned).map(a => (
                      <div key={a.id} className="flex items-start gap-2">
                        <Pin size={11} className="text-forest-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-sans text-sm text-forest-900 font-medium">{a.title}</div>
                          <div className="font-mono text-[9px] text-forest-400">{a.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Announcements Tab ── */}
          {activeTab === 'announcements' && (
            <div className="max-w-2xl">
              <div className="bg-white border border-forest-100">
                <div className="border-b border-forest-100 px-6 py-4">
                  <span className="font-sans font-semibold text-forest-900 text-sm">Batch {year} Announcements</span>
                </div>
                <div className="divide-y divide-forest-100">
                  {announcements.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="px-6 py-5 flex items-start gap-4 hover:bg-forest-50/50 transition-colors cursor-pointer"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${a.pinned ? 'bg-forest-800' : 'bg-forest-100'}`}>
                        {a.pinned
                          ? <Pin size={14} className="text-forest-300" />
                          : <MessageSquare size={14} className="text-forest-500" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="font-sans font-semibold text-forest-900">{a.title}</div>
                        <div className="font-mono text-[9px] text-forest-400 tracking-wider mt-1">{a.date}</div>
                      </div>
                      <ChevronRight size={14} className="text-forest-300 mt-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Members Tab ── */}
          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans font-semibold text-forest-900">{batch.members.toLocaleString()} Members</span>
                <span className="font-mono text-[10px] text-forest-400 tracking-widest uppercase">{batch.departments} departments</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => ({
                  name: ['Tanvir Ahmed', 'Sadia Islam', 'Rafiq Morshed', 'Nusrat Jahan', 'Karim Ullah',
                         'Bipul Das', 'Tania Rahman', 'Farhan Islam', 'Rezwan Karim'][i],
                  dept: ['CSE', 'EEE', 'CE', 'ME', 'CSE', 'CE', 'EEE', 'ME', 'CSE'][i],
                  role: ['Software Engineer', 'Power Systems Analyst', 'Structural Engineer', 'R&D Engineer', 'Data Scientist',
                         'Site Engineer', 'Telecom Specialist', 'Product Manager', 'ML Engineer'][i],
                  initials: ['TA', 'SI', 'RM', 'NJ', 'KU', 'BD', 'TR', 'FI', 'RK'][i],
                })).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-forest-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-forest-300 transition-all"
                  >
                    <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center text-xs font-bold text-forest-200 flex-shrink-0">
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-semibold text-forest-900 text-sm truncate">{m.name}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-wider">{m.dept} · {m.role}</div>
                    </div>
                    <ChevronRight size={13} className="text-forest-200 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
