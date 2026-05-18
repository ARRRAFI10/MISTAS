import { motion } from 'framer-motion'
import { Section, CornerDecor } from '../ui'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
})

export default function WelcomeMessage() {
  return (
    <Section className="py-20 bg-white overflow-hidden relative">

      {/* Ambient blobs — pure CSS, no JS cost */}
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-forest-50 rounded-full blur-3xl opacity-70 animate-float-ambient pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-forest-50 rounded-full blur-3xl opacity-50 animate-float-ambient-alt pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-forest-50 rounded-full blur-2xl opacity-30 animate-float-ambient-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — image panel, slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="relative h-[480px] bg-forest-100 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("image.jpeg")`,
                    backgroundSize: 'fill',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-forest-900/20" />
              </div>

              {/* Floating President card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="absolute -bottom-6 -right-6 bg-forest-900 text-white p-6 w-56 rounded-2xl"
              >
                <div className="font-mono text-[9px] tracking-widest uppercase text-forest-400 mb-2">Message from</div>
                <div className="font-display text-base font-semibold text-white mb-1">President, MISTAS</div>
                <div className="font-sans text-xs text-forest-400">Major General Md Hakimuzzaman, SGP, ndc, afwc, psc</div>
                <div className="w-8 h-0.5 bg-forest-500 mt-3" />
              </motion.div>

              <CornerDecor className="absolute top-4 left-4 text-forest-400 opacity-60" />
            </div>
          </motion.div>

          {/* Right — text, staggered entry */}
          <div>
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-forest-600" />
              <span className="section-label">Welcome Message</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.2)} className="font-display text-4xl text-forest-900 leading-snug mb-6">
              A Letter to Every <br />
              <em className="italic text-forest-600">MIST Graduate</em>
            </motion.h2>

            <div className="space-y-4 font-body text-forest-700 leading-relaxed text-[15px]">
              <motion.p {...fadeUp(0.3)}>
                As you walk through the gates of MIST — whether for the first time as a student, or again as a returning graduate — you carry with you the mark of an institution that has shaped generations of leaders, engineers, and visionaries.
              </motion.p>
              <motion.p {...fadeUp(0.38)}>
                MISTAS was founded on a single belief: that the bonds forged in the corridors of MIST do not end at graduation. They grow stronger with time, distance, and shared purpose.
              </motion.p>
              <motion.p {...fadeUp(0.46)}>
                This platform is your home — a place to reconnect, contribute, mentor, and be inspired. We invite you to be an active part of this living, breathing community.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.55)} className="mt-8 pt-6 border-t border-forest-100 flex items-center gap-4">
              <div>
                <div className="font-sans font-semibold text-sm text-forest-900">Major General Md Hakimuzzaman, SGP, ndc, afwc, psc</div>
                <div className="font-mono text-xs text-forest-500 tracking-wide">President, MISTAS • CE-02</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </Section>
  )
}
