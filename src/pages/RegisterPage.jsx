import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, GraduationCap, CreditCard, CheckCircle,
  ArrowRight, ArrowLeft, Shield, Star, Award,
  Eye, EyeOff, Upload, Globe, Linkedin
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
    color: 'border-forest-300 bg-forest-50',
    badgeColor: 'bg-forest-700',
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
    color: 'border-gold-500 bg-yellow-50',
    badgeColor: 'bg-gold-600',
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

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedTier, setSelectedTier] = useState('lifetime')
  const [completed, setCompleted] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    dept: '', batch: '', studentId: '', thesisTitle: '',
    currentRole: '', organization: '', country: '', city: '',
    linkedin: '', website: '',
    membershipTier: 'lifetime',
    paymentMethod: 'sslcommerz',
  })

  const progress = ((step - 1) / (steps.length - 1)) * 100

  const nextStep = () => step < steps.length && setStep(step + 1)
  const prevStep = () => step > 1 && setStep(step - 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-forest-700 rounded-xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h2 className="font-display text-4xl text-forest-900 font-bold mb-4">Welcome to MISTAS!</h2>
          <p className="font-body text-forest-600 leading-relaxed mb-4">
            Your registration is complete. Your account is under review and will be activated within 1–2 business days after verification by our team.
          </p>
          <p className="font-sans text-sm text-forest-500 mb-8">
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
    <div className="min-h-screen bg-forest-50">
      {/* Header strip */}
      <div className="bg-forest-950 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold text-white">MISTAS</Link>
          <span className="font-mono text-xs text-forest-500 tracking-widest uppercase">Alumni Registration</span>
          <Link to="/login" className="text-xs font-sans text-forest-400 hover:text-white transition-colors">Already a member?</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative mb-3">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-forest-100">
              <motion.div
                className="h-full bg-forest-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {steps.map((s) => {
              const Icon = s.icon
              const isComplete = step > s.id
              const isCurrent = step === s.id
              return (
                <div key={s.id} className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    isComplete
                      ? 'bg-forest-700 border-forest-700'
                      : isCurrent
                      ? 'bg-white border-forest-600 shadow-md'
                      : 'bg-white border-forest-200'
                  }`}>
                    {isComplete ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : (
                      <Icon size={16} className={isCurrent ? 'text-forest-700' : 'text-forest-300'} />
                    )}
                  </div>
                  <span className={`mt-2 font-mono text-[10px] tracking-widest uppercase hidden sm:block ${
                    isCurrent ? 'text-forest-700' : isComplete ? 'text-forest-500' : 'text-forest-300'
                  }`}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-forest-100 shadow-sm">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <h2 className="font-display text-2xl text-forest-900 font-bold mb-1">Personal Information</h2>
                <p className="font-sans text-sm text-forest-500 mb-8">Your basic contact and account details.</p>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">First Name *</label>
                      <input required type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Last Name *</label>
                      <input required type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Email Address *</label>
                    <input required type="email" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Phone Number</label>
                    <input type="tel" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="+880 1xxxxxxxxx" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Password *</label>
                      <div className="relative">
                        <input required type={showPassword ? 'text' : 'password'} className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors pr-10" placeholder="Min. 8 characters" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Confirm Password *</label>
                      <input required type="password" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="Repeat password" />
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Profile Photo (optional)</label>
                    <div className="flex items-center gap-4 p-4 border border-dashed border-forest-200 hover:border-forest-400 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-forest-50 flex items-center justify-center">
                        <Upload size={18} className="text-forest-400" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-forest-700 font-medium">Click to upload photo</p>
                        <p className="font-sans text-xs text-forest-400">JPG or PNG, max 2 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <h2 className="font-display text-2xl text-forest-900 font-bold mb-1">Academic & Career Details</h2>
                <p className="font-sans text-sm text-forest-500 mb-8">Your MIST academic background and current career information.</p>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Department *</label>
                      <div className="relative">
                        <select required className="w-full appearance-none border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors bg-white">
                          <option value="">Select your department</option>
                          {departments.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Graduation Year *</label>
                      <input required type="number" min="1998" max="2025" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. 2012" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">MIST Student ID</label>
                    <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. 200812345" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Thesis / Project Title (optional)</label>
                    <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="Your final year thesis title" />
                  </div>

                  <div className="pt-4 border-t border-forest-50">
                    <p className="font-mono text-xs tracking-widest uppercase text-forest-400 mb-4">Current Career</p>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Current Job Title</label>
                          <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. Senior Engineer" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Organization</label>
                          <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. Google, Bangladesh Army" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">Country of Residence *</label>
                          <input required type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. Bangladesh, USA" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2">City</label>
                          <input type="text" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="e.g. Dhaka, London" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2 flex items-center gap-1.5"><Linkedin size={11} /> LinkedIn URL</label>
                          <input type="url" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="linkedin.com/in/yourprofile" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-2 flex items-center gap-1.5"><Globe size={11} /> Personal Website</label>
                          <input type="url" className="w-full border border-forest-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-forest-500 transition-colors" placeholder="yourwebsite.com" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <h2 className="font-display text-2xl text-forest-900 font-bold mb-1">Choose Membership</h2>
                <p className="font-sans text-sm text-forest-500 mb-8">Select the membership tier that suits you best.</p>

                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  {membershipTiers.map((tier) => {
                    const Icon = tier.icon
                    const isSelected = selectedTier === tier.id
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier.id)}
                        className={`text-left border-2 p-6 transition-all duration-300 relative overflow-hidden ${
                          isSelected
                            ? tier.id === 'lifetime'
                              ? 'border-gold-500 bg-yellow-50'
                              : 'border-forest-500 bg-forest-50'
                            : 'border-forest-100 bg-white hover:border-forest-300'
                        }`}
                      >
                        {tier.featured && (
                          <div className="absolute top-0 right-0 bg-gold-500 text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1">
                            Recommended
                          </div>
                        )}
                        <div className={`w-10 h-10 ${tier.badgeColor} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon size={18} className="text-white" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-forest-900 mb-1">{tier.name}</h3>
                        <div className="flex items-baseline gap-2 mb-5">
                          <span className="font-display text-2xl font-bold text-forest-800">{tier.price}</span>
                          <span className="font-sans text-xs text-forest-400">{tier.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {tier.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-sans text-forest-700">
                              <CheckCircle size={14} className="text-forest-500 mt-0.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        {isSelected && (
                          <div className="absolute bottom-3 right-3">
                            <div className={`w-6 h-6 ${tier.badgeColor} flex items-center justify-center`}>
                              <CheckCircle size={14} className="text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-mono tracking-widest uppercase text-forest-500 mb-4">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'sslcommerz', label: 'SSLCommerz', desc: 'Cards, Mobile Banking' },
                      { id: 'bkash', label: 'bKash', desc: 'Mobile Banking' },
                      { id: 'bank', label: 'Bank Transfer', desc: 'Direct transfer' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        className="border border-forest-200 p-4 text-center hover:border-forest-400 transition-colors"
                      >
                        <div className="font-sans font-bold text-sm text-forest-900">{method.label}</div>
                        <div className="font-sans text-xs text-forest-400 mt-1">{method.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <h2 className="font-display text-2xl text-forest-900 font-bold mb-1">Confirm & Submit</h2>
                <p className="font-sans text-sm text-forest-500 mb-8">Review your details before submitting the registration form.</p>

                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Membership Tier', value: selectedTier === 'lifetime' ? 'Lifetime Member — BDT 5,000' : 'Regular Member — BDT 500/yr' },
                    { label: 'Account Activation', value: 'Within 1–2 business days after verification' },
                    { label: 'Verification Method', value: 'MIST student ID or graduation certificate' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start gap-4 p-4 bg-forest-50 border border-forest-100">
                      <CheckCircle size={16} className="text-forest-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-mono text-xs text-forest-400 tracking-widest uppercase">{label}</div>
                        <div className="font-sans text-sm font-medium text-forest-900 mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 mb-6 p-4 border border-forest-100">
                  <input type="checkbox" id="terms" className="mt-1 accent-forest-600" required />
                  <label htmlFor="terms" className="font-sans text-sm text-forest-600 leading-relaxed cursor-pointer">
                    I confirm that I am a graduate of MIST and agree to the{' '}
                    <Link to="/terms" className="text-forest-700 font-medium underline hover:text-forest-900">Terms & Conditions</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-forest-700 font-medium underline hover:text-forest-900">Privacy Policy</Link>{' '}
                    of MISTAS.
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
                >
                  Complete Registration <CheckCircle size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-8 md:px-10 pb-8 flex items-center justify-between border-t border-forest-50 pt-6">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 font-sans text-sm font-medium transition-all ${
                step === 1 ? 'text-forest-200 cursor-not-allowed' : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <div className="font-mono text-xs text-forest-400 tracking-widest">
              Step {step} of {steps.length}
            </div>
            {step < steps.length ? (
              <button
                onClick={nextStep}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <span className="text-xs font-sans text-forest-300">Submit above</span>
            )}
          </div>
        </div>

        <p className="text-center font-sans text-sm text-forest-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-forest-700 hover:text-forest-900 animated-underline">
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  )
}
