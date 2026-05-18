import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Users, Rss, ChevronRight, Heart, Pin, Shield } from 'lucide-react'
import { deptGroups } from '../../data/communityData'

const seedMessages = (dept) => [
  { id: 1, author: 'Tanvir A.', avatar: 'TA', text: `Anyone here attending the ${dept.shortCode} alumni meet next month?`, time: '3d ago', likes: 11, mine: false },
  { id: 2, author: 'Nusrat J.', avatar: 'NJ', text: 'Yes! I\'ll be there. We should organize a small dinner the evening before.', time: '3d ago', likes: 9, mine: false },
  { id: 3, author: 'Karim U.', avatar: 'KU', text: 'Great idea. I can book the restaurant near MIST campus. How many people roughly?', time: '2d ago', likes: 14, mine: false },
  { id: 4, author: 'You', avatar: 'ME', text: 'Count me in. I\'m in Dhaka that week anyway.', time: '1d ago', likes: 4, mine: true },
  { id: 5, author: 'Tanvir A.', avatar: 'TA', text: 'Perfect. I\'ll start a separate thread for RSVP. Watch the announcements.', time: '20h ago', likes: 7, mine: false },
]

const seedPosts = (dept) => [
  { id: 1, title: `Job opening: Senior ${dept.shortCode} Engineer at Brac Bank`, author: 'Rafiq M.', category: 'Jobs', likes: 23, comments: 8, time: '2d ago' },
  { id: 2, title: `Research paper on ${dept.topics?.[0]} — looking for co-authors`, author: 'Dr. Tahmina R.', category: 'Research', likes: 18, comments: 14, time: '4d ago' },
  { id: 3, title: 'Visa tips for skilled professionals in Germany', author: 'Ismat H.', category: 'Career', likes: 45, comments: 31, time: '1w ago' },
]

export default function CommunityDeptDetailPage() {
  const { id } = useParams()
  const dept = deptGroups.find(g => g.id === id)
  const [messages, setMessages] = useState(dept ? seedMessages(dept) : [])
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('chat')

  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-forest-900 mb-4">Group not found</h2>
          <Link to="/community/departments" className="btn-primary">Back to Departments</Link>
        </div>
      </div>
    )
  }

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, {
      id: prev.length + 1, author: 'You', avatar: 'ME',
      text, time: 'Just now', likes: 0, mine: true,
    }])
    setInput('')
  }

  return (
    <>
      {/* Header */}
      <div className="bg-forest-950 pt-20 pb-0 relative overflow-hidden">
        <div className={`${dept.color} h-1 w-full absolute top-0`} />
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
            <Link to="/community/departments" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase text-forest-500 hover:text-forest-300 transition-colors">
              <ArrowLeft size={12} /> Department Groups
            </Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className="font-sans text-xs font-bold text-white bg-forest-700 border border-forest-600 px-3 py-1">{dept.shortCode}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-10">
            <div className="flex items-start gap-6">
              <div className="text-5xl">{dept.icon}</div>
              <div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-500 mb-1">{dept.dept}</div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">{dept.name}</h1>
                <p className="font-sans text-forest-400 mt-2 text-sm">Admin: {dept.admin} · {dept.adminTitle}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="btn-primary flex items-center gap-2">
                <Users size={14} /> Join Group
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-forest-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-800">
            {[
              { n: dept.members.toLocaleString(), l: 'Members' },
              { n: dept.posts.toLocaleString(), l: 'Posts' },
              { n: dept.topics.length, l: 'Topics' },
              { n: '1', l: 'Admin' },
            ].map(({ n, l }) => (
              <div key={l} className="py-5 px-6 text-center">
                <div className="font-display text-xl font-bold text-white">{n}</div>
                <div className="font-mono text-[9px] text-forest-500 tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-8">
            {['chat', 'posts', 'members', 'about'].map(tab => (
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

          {/* ── Chat ── */}
          {activeTab === 'chat' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-forest-100 flex flex-col" style={{ minHeight: '560px' }}>
                <div className="border-b border-forest-100 px-6 py-4 flex items-center gap-3">
                  <span className="text-lg">{dept.icon}</span>
                  <span className="font-sans font-semibold text-forest-900 text-sm">{dept.name} Chat</span>
                  <span className="ml-auto font-mono text-[9px] text-forest-400 tracking-widest uppercase">{dept.members.toLocaleString()} members</span>
                </div>

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
                        {!msg.mine && <span className="font-sans text-xs font-semibold text-forest-700">{msg.author}</span>}
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

                <div className="border-t border-forest-100 px-4 py-4 flex gap-3 items-center">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message ${dept.shortCode} group...`}
                    className="flex-1 border border-forest-200 px-4 py-2.5 text-sm font-sans text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-forest-700 hover:bg-forest-600 text-white px-4 py-2.5 flex items-center gap-2 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">Topics</div>
                  <div className="flex flex-wrap gap-2">
                    {dept.topics.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-600 bg-forest-50 border border-forest-200 px-3 py-1.5 cursor-pointer hover:bg-forest-100 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">Group Admin</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center">
                      <Shield size={16} className="text-forest-300" />
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-forest-900 text-sm">{dept.admin}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-wider">{dept.adminTitle}</div>
                    </div>
                  </div>
                </div>

                <div className={`${dept.color} p-6`}>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-white/60 mb-2">Department</div>
                  <div className="font-display text-4xl font-bold text-white/20 leading-none mb-3">{dept.shortCode}</div>
                  <div className="font-sans text-sm text-white/80">{dept.dept}</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Posts ── */}
          {activeTab === 'posts' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans font-semibold text-forest-900">{dept.posts.toLocaleString()} posts</span>
                <button className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                  New Post <Rss size={12} />
                </button>
              </div>
              <div className="bg-white border border-forest-100 divide-y divide-forest-100">
                {seedPosts(dept).map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="px-6 py-5 group cursor-pointer hover:bg-forest-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-[9px] tracking-widest uppercase text-forest-600 bg-forest-50 border border-forest-200 px-2 py-0.5">
                            {p.category}
                          </span>
                        </div>
                        <h3 className="font-sans font-semibold text-forest-900 group-hover:text-forest-700 transition-colors">{p.title}</h3>
                        <p className="font-sans text-xs text-forest-400 mt-1.5">by {p.author} · {p.time}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 text-xs text-forest-400 flex-shrink-0">
                        <span className="flex items-center gap-1"><Heart size={11} /> {p.likes}</span>
                        <span className="flex items-center gap-1"><Send size={11} /> {p.comments}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Members ── */}
          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans font-semibold text-forest-900">{dept.members.toLocaleString()} Members</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => {
                  const names = ['Tanvir Ahmed','Sadia Islam','Rafiq Morshed','Nusrat Jahan','Karim Ullah','Bipul Das','Tania Rahman','Farhan Islam','Rezwan Karim']
                  const roles = ['Senior Engineer','Researcher','Project Manager','Consultant','Data Analyst','Lead Engineer','Specialist','Product Lead','Associate Prof.']
                  const batches = [2018, 2020, 2016, 2022, 2014, 2019, 2021, 2017, 2015]
                  return { name: names[i], role: roles[i], batch: batches[i], initials: names[i].split(' ').map(w => w[0]).join('') }
                }).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-forest-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-forest-300 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center text-xs font-bold text-forest-200 flex-shrink-0">
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-semibold text-forest-900 text-sm truncate">{m.name}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-wider">{dept.shortCode} · {m.batch} · {m.role}</div>
                    </div>
                    <ChevronRight size={13} className="text-forest-200 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── About ── */}
          {activeTab === 'about' && (
            <div className="grid lg:grid-cols-2 gap-10 max-w-4xl">
              <div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4">About This Group</div>
                <p className="font-body text-forest-700 leading-relaxed text-lg mb-6">{dept.about}</p>
                <div className="flex flex-wrap gap-2">
                  {dept.topics.map(t => (
                    <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-forest-600 bg-forest-50 border border-forest-200 px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <div className="border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4">Group Admin</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center">
                      <Shield size={16} className="text-forest-300" />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-forest-900">{dept.admin}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-wider">{dept.adminTitle}</div>
                    </div>
                  </div>
                </div>
                <div className="border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4">Stats</div>
                  <div className="space-y-3">
                    {[
                      { l: 'Total Members', v: dept.members.toLocaleString() },
                      { l: 'Total Posts', v: dept.posts.toLocaleString() },
                      { l: 'Discussion Topics', v: dept.topics.length },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex items-center justify-between">
                        <span className="font-sans text-sm text-forest-500">{l}</span>
                        <span className="font-display font-bold text-forest-900">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
