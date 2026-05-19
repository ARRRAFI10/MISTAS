import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Camera, Film, Image, Play } from 'lucide-react'
import NewsEventsHero from '../components/news/NewsEventsHero'
import { SectionHeader } from '../components/ui'

const gallery = [
  { src: '/slider1.png', caption: 'Annual Reunion 2024', type: 'photo' },
  { src: '/slider2.jpg', caption: 'Career Fair 2024', type: 'photo' },
  { src: '/slider3.jpg', caption: 'MIST Campus View', type: 'photo' },
  { src: '/slider4.jpg', caption: 'Tech Symposium 2024', type: 'photo' },
  { src: '/slider5.jpg', caption: 'Graduation Ceremony', type: 'photo' },
  //{ src: '/slider6.png', caption: 'Alumni Recognition Night', type: 'photo' },
 
]

export default function ArchivePage() {
  const [archiveTab, setArchiveTab] = useState('Photos')
  const [lightbox, setLightbox] = useState(null)

  const archiveItems =
    archiveTab === 'Photos'
      ? gallery.filter((g) => g.type === 'photo')
      : gallery.filter((g) => g.type === 'video')

  return (
    <>
      <NewsEventsHero />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader label="Archive" title="Photo & Video Gallery" />
            <div className="flex gap-1 bg-forest-50 p-1 border border-forest-100 mb-12">
              {['Photos', 'Videos'].map((t) => (
                <button
                  key={t}
                  onClick={() => setArchiveTab(t)}
                  className={`px-6 py-2 font-sans text-sm font-medium transition-all ${
                    archiveTab === t ? 'bg-forest-700 text-white' : 'text-forest-600 hover:text-forest-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {t === 'Photos' ? <Camera size={14} /> : <Film size={14} />}
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {archiveItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-square overflow-hidden cursor-pointer bg-forest-900"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-forest-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play size={28} className="text-white" fill="white" />
                  ) : (
                    <Image size={28} className="text-white" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-sans text-xs text-white font-medium">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn-outline flex items-center gap-2 mx-auto">
              Load More <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain" />
              <p className="text-center text-sm text-white/70 font-sans mt-3">{lightbox.caption}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors font-bold text-lg"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
