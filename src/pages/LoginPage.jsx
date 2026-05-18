import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, GraduationCap, Shield, Users, Globe } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    // auth logic placeholder
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left Brand Panel ──────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] bg-forest-950 flex-col relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Decorative circles */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] border-[60px] border-forest-400 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute -top-20 -right-20 w-[300px] h-[300px] border-[40px] border-forest-500 rounded-full"
        />

        <div className="relative flex-1 flex flex-col justify-between p-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-white">MISTAS</div>
              <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Alumni Association</div>
            </div>
          </Link>

          {/* Main text */}
          <div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="w-12 h-0.5 bg-forest-500 mb-8" />
              <h2 className="font-display text-5xl text-white font-bold mb-5 leading-tight">
                Welcome <br /> Back to <br />
                <em className="italic text-forest-400">MISTAS</em>
              </h2>
              <p className="font-body text-forest-300 leading-relaxed text-lg max-w-sm">
                Sign in to access your alumni portal — your profile, events, job board, and community.
              </p>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 space-y-3"
            >
              {[
                { icon: Users, text: '12,847 alumni connected' },
                { icon: Globe, text: 'Network spanning 85+ countries' },
                { icon: Shield, text: 'Secure, verified alumni portal' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={text} className="flex items-center gap-3 text-sm font-sans text-forest-400">
                  <div className="w-7 h-7 bg-forest-800 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-forest-400" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom copyright */}
          <div className="font-mono text-[9px] text-forest-700 tracking-widest uppercase">
            © {new Date().getFullYear()} MISTAS — All Rights Reserved
          </div>
        </div>
      </div>

      {/* ── Right Login Form ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white lg:bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-forest-700 rounded-xl flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <div className="font-display font-bold text-xl text-forest-900">MISTAS</div>
          </div>

          <h1 className="font-display text-3xl text-forest-900 font-bold mb-2">Sign In</h1>
          <p className="font-sans text-sm text-forest-500 mb-8">
            Access your alumni portal account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Email Address</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono tracking-widest uppercase text-forest-500">Password</label>
                <Link to="/forgot-password" className="text-xs font-sans text-forest-600 hover:text-forest-800 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-forest-200 px-4 py-3.5 text-sm font-sans text-forest-900 focus:outline-none focus:border-forest-500 transition-colors bg-white pr-11"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                <div className="w-9 h-5 bg-zinc-200 peer-checked:bg-forest-600 rounded-full transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
              </div>
              <span className="font-sans text-sm text-forest-600">Keep me signed in</span>
            </label>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              Sign In to Portal <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-forest-100" />
            <span className="font-mono text-xs text-forest-300 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-forest-100" />
          </div>

          {/* Admin login */}
          <button
            type="button"
            className="w-full border border-forest-200 py-3.5 font-sans text-sm font-medium text-forest-700 hover:border-forest-400 hover:bg-forest-50 transition-all flex items-center justify-center gap-2"
          >
            <Shield size={15} className="text-forest-500" /> Sign in as Administrator
          </button>

          <p className="text-center font-sans text-sm text-forest-500 mt-7">
            Not yet a member?{' '}
            <Link to="/register" className="font-bold text-forest-700 hover:text-forest-900 animated-underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
