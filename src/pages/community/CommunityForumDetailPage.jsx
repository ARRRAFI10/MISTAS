import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Send, ChevronRight, TrendingUp } from 'lucide-react'
import { forumTopics } from '../../data/communityData'

const categories = [
  { label: 'Career', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { label: 'Higher Studies', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { label: 'Technical', color: 'text-forest-600 bg-forest-50 border-forest-200' },
  { label: 'Entrepreneurship', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { label: 'Campus Life', color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { label: 'General', color: 'text-zinc-600 bg-zinc-50 border-zinc-200' },
]
const catColor = (label) => categories.find(c => c.label === label)?.color || ''

export default function CommunityForumDetailPage() {
  const { id } = useParams()
  const topic = forumTopics.find(t => String(t.id) === id)
  const [replies, setReplies] = useState(topic?.replies || [])
  const [input, setInput] = useState('')
  const [liked, setLiked] = useState(false)

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-forest-900 mb-4">Thread not found</h2>
          <Link to="/community/forum" className="btn-primary">Back to Forum</Link>
        </div>
      </div>
    )
  }

  function postReply() {
    const text = input.trim()
    if (!text) return
    setReplies(prev => [...prev, {
      id: prev.length + 1, author: 'You', avatar: 'ME',
      text, time: 'Just now', likes: 0, mine: true,
    }])
    setInput('')
  }

  return (
    <>
      {/* Header */}
      <div className="bg-forest-950 pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 py-6 border-b border-forest-800">
            <Link to="/community/forum" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase text-forest-500 hover:text-forest-300 transition-colors">
              <ArrowLeft size={12} /> Forum
            </Link>
            <div className="flex-1 border-t border-forest-800" />
            <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border ${catColor(topic.category)}`}>
              {topic.category}
            </span>
          </div>

          <div className="py-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              {topic.pinned && (
                <span className="font-mono text-[10px] text-forest-400 bg-forest-800 border border-forest-700 px-2 py-1 flex items-center gap-1">
                  <TrendingUp size={8} /> Pinned
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              {topic.title}
            </h1>
            <div className="flex items-center gap-4 text-forest-400 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-forest-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {topic.avatar}
                </div>
                <span className="font-sans font-medium text-forest-300">{topic.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Heart size={12} /> {topic.upvotes + (liked ? 1 : 0)} upvotes</span>
              <span className="flex items-center gap-1.5">replies: {replies.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-zinc-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* Thread */}
            <div className="lg:col-span-8 space-y-6">

              {/* Original post */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-forest-100"
              >
                <div className="border-l-4 border-forest-600 px-8 py-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center text-sm font-bold text-forest-200">
                      {topic.avatar}
                    </div>
                    <div>
                      <div className="font-sans font-bold text-forest-900">{topic.author}</div>
                      <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Original Post</div>
                    </div>
                  </div>
                  <div className="font-body text-forest-800 leading-relaxed whitespace-pre-line text-[15px] mb-8">
                    {topic.body}
                  </div>
                  <div className="flex items-center gap-5 pt-5 border-t border-forest-100">
                    <button
                      onClick={() => setLiked(l => !l)}
                      className={`flex items-center gap-2 text-sm font-sans font-medium transition-colors ${liked ? 'text-forest-700' : 'text-forest-400 hover:text-forest-700'}`}
                    >
                      <Heart size={14} className={liked ? 'fill-forest-700' : ''} />
                      {topic.upvotes + (liked ? 1 : 0)} upvotes
                    </button>
                    <span className="text-forest-300">|</span>
                    <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{replies.length} replies</span>
                  </div>
                </div>
              </motion.div>

              {/* Replies */}
              <div>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-forest-400 mb-5">
                  {replies.length} Replies
                </div>
                <div className="space-y-4">
                  {replies.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-white border p-6 ${r.mine ? 'border-forest-300 bg-forest-50/30' : 'border-forest-100'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          r.mine ? 'bg-forest-700 text-white' : 'bg-forest-100 text-forest-700'
                        }`}>
                          {r.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-sans font-semibold text-forest-900 text-sm">{r.author}</span>
                            {r.mine && (
                              <span className="font-mono text-[9px] tracking-widest uppercase text-forest-500 bg-forest-100 px-2 py-0.5">You</span>
                            )}
                            <span className="font-mono text-[9px] text-forest-400 ml-auto">{r.time}</span>
                          </div>
                          <p className="font-sans text-sm text-forest-800 leading-relaxed">{r.text}</p>
                          <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center gap-1.5 text-xs text-forest-400 hover:text-forest-700 transition-colors">
                              <Heart size={11} /> {r.likes}
                            </button>
                            <button className="text-xs text-forest-400 hover:text-forest-700 transition-colors">Reply</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reply input */}
              <div className="bg-white border border-forest-100 p-6">
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4">Add Your Reply</div>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={4}
                  placeholder="Share your thoughts, experience, or ask a follow-up..."
                  className="w-full border border-forest-200 px-4 py-3 text-sm font-sans text-forest-900 placeholder:text-forest-300 focus:outline-none focus:border-forest-500 transition-colors resize-none mb-4"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Replying as: You</span>
                  <button
                    onClick={postReply}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    Post Reply <Send size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Thread info */}
                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">Thread Info</div>
                  <div className="space-y-3">
                    {[
                      { l: 'Category', v: topic.category },
                      { l: 'Upvotes', v: topic.upvotes + (liked ? 1 : 0) },
                      { l: 'Replies', v: replies.length },
                      { l: 'Author', v: topic.author },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">{l}</span>
                        <span className="font-sans text-sm font-medium text-forest-900">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other trending topics */}
                <div className="bg-white border border-forest-100 p-6">
                  <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-4 pb-3 border-b border-forest-100">Other Threads</div>
                  <div className="space-y-3">
                    {forumTopics.filter(t => t.id !== topic.id).map(t => (
                      <Link
                        key={t.id}
                        to={`/community/forum/${t.id}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-2">
                          <ChevronRight size={11} className="text-forest-300 mt-1 flex-shrink-0 group-hover:text-forest-600 transition-colors" />
                          <div>
                            <p className="font-sans text-sm text-forest-700 group-hover:text-forest-900 transition-colors leading-snug">{t.title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="font-mono text-[9px] text-forest-400">{t.upvotes} upvotes</span>
                              <span className="font-mono text-[9px] text-forest-400">{t.comments} replies</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
