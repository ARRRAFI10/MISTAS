import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, GraduationCap, Shield, CheckCircle,
  ArrowRight, ArrowLeft, Star, Award,
  Eye, EyeOff, Upload, Globe, Linkedin, Users, MapPin
} from 'lucide-react'

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Academic Info', icon: GraduationCap },
  { id: 3, label: 'Membership', icon: Shield },
  { id: 4, label: 'Confirm', icon: CheckCircle },
]

const departments = [
  'Civil Engineering',
  'Electrical & Electronic Engineering',
  'Mechanical Engineering',
  'Computer Science & Engineering',
  'Architecture',
  'Nuclear Engineering',
  'Aeronautical Engineering',
  'Naval Architecture & Marine Engineering',
  'Biomedical Engineering',
  'Industrial & Production Engineering',
]

const membershipTiers = [
  {
    id: 'regular',
    name: 'Regular Member',
    price: 'BDT 500',
    period: 'per year',
    icon: Star,
    features: [
      'Full alumni directory access',
      'Job board posting & searching',
      'Event registration access',
      'Monthly newsletter',
      'Community forum access',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Member',
    price: 'BDT 5,000',
    period: 'one-time payment',
    icon: Award,
    featured: true,
    features: [
      'Everything in Regular',
      'Permanent membership badge',
      'Priority event seating',
      'Exclusive lifetime member events',
      'Lifetime directory listing',
      'Voting rights in MISTAS elections',
    ],
  },
]

const inputCls = 'w-full border border-zinc-300 rounded-lg px-4 py-3 text-sm font-sans text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-100 transition-all bg-white'
const labelCls = 'block text-xs font-semibold tracking-wide uppercase text-zinc-600 mb-1.5'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedTier, setSelectedTier] = useState('lifetime')
  const [completed, setCompleted] = useState(false)

  const progress = ((step - 1) / (steps.length - 1)) * 100

  const nextStep = () => step < steps.length && setStep(step + 1)
  const prevStep = () => step > 1 && setStep(step - 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-forest-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h2 className="font-display text-4xl text-zinc-900 font-bold mb-4">Welcome to MISTAS!</h2>
          <p className="font-body text-zinc-600 leading-relaxed mb-4">
            Your registration is complete. Your account is under review and will be activated within 1–2 business days after verification.
          </p>
          <p className="font-sans text-sm text-zinc-400 mb-8">
            A confirmation email has been sent to your registered address.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="btn-primary flex items-center gap-2">
              Sign In <ArrowRight size={14} />
            </Link>
            <Link to="/" className="btn-outline flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/3 bg-forest-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(34,197,94,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.05) 0%, transparent 50%)`
        }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-forest-800 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-forest-600 rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">M</span>
            </div>
            <span className="font-display font-bold text-white text-xl">MISTAS</span>
          </Link>

          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
              Join the MIST Alumni Network
            </h1>
            <p className="font-body text-forest-300 text-base leading-relaxed">
              Connect with thousands of MIST graduates across Bangladesh and the globe.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Users, title: '12,000+ Alumni', desc: 'Active members from every batch and department' },
              { icon: MapPin, title: '40+ Countries', desc: 'A global community always close to home' },
              { icon: Award, title: 'Exclusive Benefits', desc: 'Events, jobs, mentorship and alumni recognition' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-forest-400" />
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">{title}</div>
                  <div className="font-sans text-forest-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="font-sans text-sm text-forest-500">
            Already a member?{' '}
            <Link to="/login" className="text-forest-300 font-semibold hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right panel: form ───────────────────────────────────────── */}
      <div className="flex-1 bg-white flex flex-col min-h-screen">

        {/* Mobile header */}
        <div className="lg:hidden bg-forest-950 py-4 px-6 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold text-white">MISTAS</Link>
          <Link to="/login" className="text-xs font-sans text-forest-400 hover:text-white transition-colors">Already a member?</Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl mx-auto px-6 py-10">

            {/* Step progress */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                {steps.map((s, i) => {
                  const Icon = s.icon
                  const isComplete = step > s.id
                  const isCurrent = step === s.id
                  return (
                    <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isComplete ? 'bg-forest-600 border-forest-600' :
                          isCurrent ? 'bg-white border-forest-600 shadow-md shadow-forest-100' :
                          'bg-white border-zinc-200'
                        }`}>
                          {isComplete
                            ? <CheckCircle size={15} className="text-white" />
                            : <Icon size={15} className={isCurrent ? 'text-forest-600' : 'text-zinc-300'} />
                          }
                        </div>
                        <span className={`font-mono text-[9px] tracking-widest uppercase hidden sm:block whitespace-nowrap ${
                          isCurrent ? 'text-forest-700 font-bold' : isComplete ? 'text-forest-500' : 'text-zinc-300'
                        }`}>
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-0.5 mb-4 mx-1 rounded-full overflow-hidden bg-zinc-100">
                          <motion.div
                            className="h-full bg-forest-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: isComplete ? '100%' : '0%' }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form steps */}
            <AnimatePresence mode="wait">

              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="step1"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-zinc-900 mb-1">Personal Information</h2>
                    <p className="text-sm text-zinc-500">Your basic contact and account details.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>First Name *</label>
                        <input type="text" className={inputCls} placeholder="First name" required />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name *</label>
                        <input type="text" className={inputCls} placeholder="Last name" required />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" className={inputCls} placeholder="your@email.com" required />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input type="tel" className={inputCls} placeholder="+880 1xxxxxxxxx" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Password *</label>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} className={inputCls + ' pr-11'} placeholder="Min. 8 characters" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Confirm Password *</label>
                        <input type="password" className={inputCls} placeholder="Repeat password" required />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Profile Photo (optional)</label>
                      <div className="flex items-center gap-4 p-4 border-2 border-dashed border-zinc-200 rounded-xl hover:border-forest-400 transition-colors cursor-pointer bg-zinc-50 hover:bg-forest-50/50">
                        <div className="w-11 h-11 bg-white rounded-lg border border-zinc-200 flex items-center justify-center flex-shrink-0">
                          <Upload size={16} className="text-zinc-400" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-zinc-700">Click to upload photo</p>
                          <p className="font-sans text-xs text-zinc-400 mt-0.5">JPG or PNG, max 2 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div key="step2"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-zinc-900 mb-1">Academic & Career Details</h2>
                    <p className="text-sm text-zinc-500">Your MIST background and current career information.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Department *</label>
                        <select required className={inputCls + ' appearance-none cursor-pointer'}>
                          <option value="">Select department</option>
                          {departments.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Graduation Year *</label>
                        <input type="number" min="1998" max="2026" className={inputCls} placeholder="e.g. 2012" required />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>MIST Student ID</label>
                      <input type="text" className={inputCls} placeholder="e.g. 200812345" />
                    </div>
                    <div>
                      <label className={labelCls}>Thesis / Project Title (optional)</label>
                      <input type="text" className={inputCls} placeholder="Your final year thesis title" />
                    </div>
                    <div className="pt-4 border-t border-zinc-100">
                      <p className="font-semibold text-xs tracking-wide uppercase text-zinc-500 mb-4">Current Career</p>
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>Job Title</label>
                            <input type="text" className={inputCls} placeholder="e.g. Senior Engineer" />
                          </div>
                          <div>
                            <label className={labelCls}>Organization</label>
                            <input type="text" className={inputCls} placeholder="e.g. Google, Bangladesh Army" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>Country of Residence *</label>
                            <input required type="text" className={inputCls} placeholder="e.g. Bangladesh, USA" />
                          </div>
                          <div>
                            <label className={labelCls}>City</label>
                            <input type="text" className={inputCls} placeholder="e.g. Dhaka, London" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls + ' flex items-center gap-1.5'}><Linkedin size={11} /> LinkedIn URL</label>
                            <input type="url" className={inputCls} placeholder="linkedin.com/in/yourprofile" />
                          </div>
                          <div>
                            <label className={labelCls + ' flex items-center gap-1.5'}><Globe size={11} /> Personal Website</label>
                            <input type="url" className={inputCls} placeholder="yourwebsite.com" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div key="step3"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-zinc-900 mb-1">Choose Membership</h2>
                    <p className="text-sm text-zinc-500">Select the membership tier that suits you best.</p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {membershipTiers.map((tier) => {
                      const Icon = tier.icon
                      const isSelected = selectedTier === tier.id
                      return (
                        <button key={tier.id} type="button" onClick={() => setSelectedTier(tier.id)}
                          className={`w-full text-left border-2 rounded-2xl p-6 transition-all duration-200 relative overflow-hidden ${
                            isSelected
                              ? tier.id === 'lifetime'
                                ? 'border-amber-400 bg-amber-50/60 shadow-md shadow-amber-100'
                                : 'border-forest-500 bg-forest-50 shadow-md shadow-forest-100'
                              : 'border-zinc-200 bg-white hover:border-zinc-300'
                          }`}>
                          {tier.featured && (
                            <div className="absolute top-4 right-4 bg-amber-500 text-white text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full">
                              Recommended
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              tier.id === 'lifetime' ? 'bg-amber-500' : 'bg-forest-600'
                            }`}>
                              <Icon size={18} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-3">
                                <h3 className="font-display text-lg font-bold text-zinc-900">{tier.name}</h3>
                              </div>
                              <div className="flex items-baseline gap-2 mb-4">
                                <span className="font-display text-2xl font-bold text-zinc-900">{tier.price}</span>
                                <span className="font-sans text-xs text-zinc-400">{tier.period}</span>
                              </div>
                              <ul className="space-y-1.5">
                                {tier.features.map((f, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-600">
                                    <CheckCircle size={13} className={`mt-0.5 flex-shrink-0 ${tier.id === 'lifetime' ? 'text-amber-500' : 'text-forest-500'}`} />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {isSelected && (
                            <div className={`absolute top-4 left-4 w-5 h-5 rounded-full flex items-center justify-center ${
                              tier.id === 'lifetime' ? 'bg-amber-500' : 'bg-forest-600'
                            }`}>
                              <CheckCircle size={12} className="text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  <div>
                    <label className={labelCls + ' mb-3'}>Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'sslcommerz', label: 'SSLCommerz', desc: 'Cards & Mobile Banking' },
                        { id: 'bkash', label: 'bKash', desc: 'Mobile Banking' },
                        { id: 'bank', label: 'Bank Transfer', desc: 'Direct transfer' },
                      ].map((method) => (
                        <button key={method.id} type="button"
                          className="border-2 border-zinc-200 rounded-xl p-4 text-center hover:border-forest-400 hover:bg-forest-50/50 transition-all">
                          <div className="font-sans font-bold text-sm text-zinc-800">{method.label}</div>
                          <div className="font-sans text-xs text-zinc-400 mt-1 leading-tight">{method.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <motion.div key="step4"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-zinc-900 mb-1">Confirm & Submit</h2>
                    <p className="text-sm text-zinc-500">Review your details before submitting.</p>
                  </div>
                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Membership Tier', value: selectedTier === 'lifetime' ? 'Lifetime Member — BDT 5,000 (one-time)' : 'Regular Member — BDT 500 / year' },
                      { label: 'Account Activation', value: 'Within 1–2 business days after verification' },
                      { label: 'Verification Method', value: 'MIST student ID or graduation certificate' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                        <CheckCircle size={16} className="text-forest-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-sans text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-0.5">{label}</div>
                          <div className="font-sans text-sm font-medium text-zinc-900">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-3 mb-6 p-4 border border-zinc-200 rounded-xl bg-zinc-50">
                    <input type="checkbox" id="terms" className="mt-0.5 accent-forest-600 cursor-pointer" required />
                    <label htmlFor="terms" className="font-sans text-sm text-zinc-600 leading-relaxed cursor-pointer">
                      I confirm that I am a graduate of MIST and agree to the{' '}
                      <Link to="/terms" className="text-forest-700 font-semibold underline hover:text-forest-900">Terms & Conditions</Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-forest-700 font-semibold underline hover:text-forest-900">Privacy Policy</Link>{' '}
                      of MISTAS.
                    </label>
                  </div>
                  <button onClick={handleSubmit}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base rounded-xl">
                    Complete Registration <CheckCircle size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-zinc-100">
              <button onClick={prevStep} disabled={step === 1}
                className={`flex items-center gap-2 font-sans text-sm font-semibold transition-all rounded-lg px-4 py-2 ${
                  step === 1
                    ? 'text-zinc-300 cursor-not-allowed'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}>
                <ArrowLeft size={15} /> Back
              </button>
              <span className="font-mono text-xs text-zinc-400 tracking-widest">
                {step} / {steps.length}
              </span>
              {step < steps.length ? (
                <button onClick={nextStep} className="btn-primary flex items-center gap-2 text-sm rounded-lg">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <span className="text-xs font-sans text-zinc-300">Submit above</span>
              )}
            </div>

            <p className="text-center font-sans text-sm text-zinc-400 mt-6 lg:hidden">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-forest-700 hover:text-forest-900">
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
