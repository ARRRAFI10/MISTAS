import { useEffect, useRef, useState } from 'react'

// Animated counter hook
export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

// Section wrapper with animated entry
export function Section({ children, className = '', id = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  )
}

// Section label + heading pattern
export function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <div className="w-6 h-px bg-forest-600" />
        <span className="section-label">{label}</span>
        <div className="w-6 h-px bg-forest-600" />
      </div>
      <h2 className="display-heading text-3xl md:text-4xl mb-3">{title}</h2>
      {subtitle && <p className="body-text text-base max-w-2xl">{subtitle}</p>}
    </div>
  )
}

// Tag pill
export function Tag({ children, color = 'green' }) {
  const colors = {
    green: 'bg-forest-50 text-forest-700 border-forest-200',
    gold: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
  }
  return (
    <span className={`inline-block text-xs font-mono tracking-widest uppercase px-2.5 py-1 border rounded-lg ${colors[color]}`}>
      {children}
    </span>
  )
}

// Decorative corner element
export function CornerDecor({ className = '' }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M0 40V0H40" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Stat card for dashboard
export function StatCard({ number, suffix = '', label, icon: Icon, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(number, 2200, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative bg-white border border-forest-100 p-8 rounded-2xl group hover:border-forest-300 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-forest-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute top-3 right-3">
        <CornerDecor className="text-forest-200 group-hover:text-forest-400 transition-colors" />
      </div>
      {Icon && <Icon size={22} className="text-forest-400 mb-4" />}
      <div className="font-display text-4xl font-bold text-forest-800 mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-mono text-xs tracking-widest uppercase text-forest-500">{label}</div>
    </div>
  )
}
