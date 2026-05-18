import { Users, Globe, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function StatsDashboard() {
  return (
    <section className="relative py-32 overflow-hidden border-y border-zinc-900 min-h-[80vh] flex items-center">
      
      {/* 
        MIST Tower Background Image 
        USER INSTRUCTION: Place your image in the 'public' folder and name it 'mist-tower.jpg', 
        or update the URL below to match your image file name.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
        style={{ backgroundImage: `url('/mist-tower.jpeg')` }}
      />
      
      {/* 
        Lucrative Premium Overlay (Ultra-Clear)
        Maximizes visibility of the MIST tower image. 
        Gradients are kept minimal and focused strictly on maintaining text contrast on the left side.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Column: Context & Editorial Header */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-0.5 bg-forest-500 mb-8" 
              />
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
              >
                Impact <br/> 
                <span className="text-forest-400 italic font-serif font-light">at scale.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-zinc-400 text-lg leading-relaxed mb-10"
              >
                MISTAS isn't just an association; it's a growing global force. Our graduates are making their mark across industries, disciplines, and international borders.
              </motion.p>
            </div>
            
            <div className="hidden lg:block font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
              MIST Alumni Association <br/>
              Established 2004
            </div>
          </div>

          {/* Right Column: The Asymmetrical Stats Grid with Glass effects */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            
            {/* Stat 1: Massive Hero Stat */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 border-b border-white/10 pb-16 relative group"
            >
               <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/10 font-mono text-xs tracking-[0.3em] text-white uppercase mb-8 shadow-xl">
                  <Users size={14} className="text-forest-400" /> 
                  <span>Total Alumni Network</span>
               </div>
               {/* 
                 Using a slight text-shadow helps the massive white numbers pop against 
                 any bright spots in the background image 
               */}
               <div className="font-display text-[5rem] md:text-[8rem] lg:text-[9rem] font-bold text-white leading-none tracking-tighter group-hover:text-forest-100 transition-colors duration-700 drop-shadow-2xl">
                 12,847<span className="text-forest-500 text-[3rem] md:text-[5rem] lg:text-[6rem] align-top">+</span>
               </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group pt-4"
            >
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/10 font-mono text-[10px] tracking-[0.3em] text-white uppercase mb-6 shadow-lg">
                  <Globe size={14} className="text-forest-400" /> 
                  <span>Countries Reached</span>
               </div>
               <div className="font-display text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter drop-shadow-2xl">
                 85<span className="text-forest-500">+</span>
               </div>
               <p className="font-sans text-sm text-white/90 leading-relaxed max-w-[200px] drop-shadow-md font-medium">
                 A truly global footprint, from Silicon Valley to Singapore.
               </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group pt-4 md:border-l md:border-white/10 md:pl-16"
            >
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/10 font-mono text-[10px] tracking-[0.3em] text-white uppercase mb-6 shadow-lg">
                  <Building2 size={14} className="text-forest-400" /> 
                  <span>Departments</span>
               </div>
               <div className="font-display text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter drop-shadow-2xl">
                 18
               </div>
               <p className="font-sans text-sm text-white/90 leading-relaxed max-w-[200px] drop-shadow-md font-medium">
                 Engineering & Architecture disciplines united.
               </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
