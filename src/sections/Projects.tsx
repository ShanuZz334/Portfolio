import { motion } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { ExternalLink, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import ProjectModal from '../components/ProjectModal'
import StockyAIEngine from '../components/projectVisuals/StockyAIEngine'
import GeoFaceAIEngine from '../components/projectVisuals/GeoFaceAIEngine'

const Projects = () => {
  const stockyProject = PORTFOLIO_DATA.projects.find(p => p.id === 'stocky')!
  const geofaceProject = PORTFOLIO_DATA.projects.find(p => p.id === 'geoface')!

  const [modalData, setModalData] = useState<{ isOpen: boolean; project: any }>({
    isOpen: false,
    project: null
  })

  const openModal = (project: any) => {
    setModalData({
      isOpen: true,
      project: project
    })
  }

  return (
    <section id="projects" className="relative py-24 bg-graphite z-10">
      <div className="container px-6 mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-electric-blue">Projects</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-cyan"></div>
        </motion.div>

        {/* ─── STOCKY ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-3xl p-[1px] bg-gradient-to-b from-electric-blue/50 to-transparent group"
        >
          <div className="bg-dark-bg rounded-[23px] overflow-hidden flex flex-col xl:flex-row relative xl:h-[700px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-700"></div>

            {/* Info */}
            <div className="p-8 md:p-12 xl:w-1/2 flex flex-col justify-center z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black bg-green-400 rounded-full">
                  {stockyProject.status}
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-gray-300 border border-white/10 rounded-full glass">
                  {stockyProject.projectType}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{stockyProject.title}</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{stockyProject.description}</p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {stockyProject.features.slice(0, 8).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {stockyProject.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs text-electric-blue bg-electric-blue/10 rounded-full border border-electric-blue/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a href={stockyProject.liveLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-black transition-all rounded-lg bg-white hover:bg-electric-blue">
                  View Live Project <ExternalLink size={18} />
                </a>
                <button 
                  onClick={() => openModal(stockyProject)}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all border rounded-lg border-white/20 hover:bg-white/10 cursor-pointer">
                  Project Details <ImageIcon size={18} />
                </button>
              </div>
            </div>

            {/* Mockup */}
            <div className="xl:w-1/2 bg-gradient-to-br from-[#0a0f1a] to-[#050505] flex items-center justify-center relative overflow-hidden border-t xl:border-t-0 xl:border-l border-white/5 min-h-[400px] xl:min-h-full">
              <StockyAIEngine />
            </div>
          </div>
        </motion.div>

        {/* ─── GEOFACE ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-[1px] bg-gradient-to-b from-violet/50 to-transparent group"
        >
          <div className="bg-dark-bg rounded-[23px] overflow-hidden flex flex-col xl:flex-row-reverse relative xl:h-[700px]">
            <div className="absolute top-0 left-0 w-96 h-96 bg-violet/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-violet/20 transition-all duration-700"></div>

            {/* Info */}
            <div className="p-8 md:p-12 xl:w-1/2 flex flex-col justify-center z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black bg-violet rounded-full">
                  Completed Startup Product
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-gray-300 border border-white/10 rounded-full glass">
                  AI Powered Identity Verification Platform
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">GeoFace</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                GeoFace is an AI-powered smart attendance and identity verification platform designed to transform traditional attendance systems using artificial intelligence, computer vision, and location intelligence. A complete verification ecosystem that ensures secure, automated, and proxy-free attendance management.
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'AI Face Recognition System',
                    'Real-time Identity Verification',
                    'Geolocation Authentication',
                    'Anti Proxy Attendance Protection',
                    'Automated Attendance Processing',
                    'Smart Student Management',
                    'Secure Digital Records',
                    'Institution Analytics Dashboard',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Python', 'Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Face Recognition', 'Geolocation APIs', 'Full Stack Development', 'Database Management'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs text-violet bg-violet/10 rounded-full border border-violet/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a
                  href={geofaceProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-black transition-all rounded-lg bg-white hover:bg-violet cursor-pointer">
                  Download APK <ExternalLink size={18} />
                </a>
                <button
                  onClick={() => openModal(geofaceProject)}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all border rounded-lg border-white/20 hover:bg-white/10 cursor-pointer">
                  Project Details <ImageIcon size={18} />
                </button>
              </div>
            </div>

            {/* GeoFace Visual Mockup */}
            <div className="xl:w-1/2 bg-gradient-to-bl from-[#0d0a1a] to-[#050505] flex items-center justify-center relative overflow-hidden border-t xl:border-t-0 xl:border-r border-white/5 min-h-[400px] xl:min-h-full">
              <GeoFaceAIEngine />
            </div>
          </div>
        </motion.div>

      </div>
      
      <ProjectModal 
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        project={modalData.project}
      />
    </section>
  )
}

export default Projects
