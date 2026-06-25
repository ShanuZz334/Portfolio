import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Code, Layers, Activity, Database, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export const GenericView = ({ project, isPaused, setIsPaused }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const showcase = project.showcase || []
  const flow = project.architectureFlow || []
  const metrics = project.metrics || []
  const architecture = project.architecture || []

  // Auto-play logic
  useEffect(() => {
    if (!project?.showcase || isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % project.showcase.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [project, isPaused])

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col gap-32">
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest mb-6 ${project.badgeColor.replace('bg-', 'text-')}`}
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          {project.status}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
        >
          {project.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed"
        >
          {project.description}
        </motion.p>
      </section>

      {/* 2. AUTO-PLAYING PRODUCT SHOWCASE */}
      {showcase.length > 0 && (
        <section className="relative w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-20 blur-[120px] pointer-events-none ${project.badgeColor}`}></div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative mx-auto max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="h-12 bg-[#141414] border-b border-white/5 flex items-center px-6 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="mx-auto px-4 py-1 bg-white/5 rounded-md text-xs text-gray-500 font-mono tracking-wider hidden md:block">
                {project.title.toLowerCase()}.app
              </div>
            </div>

            <div className="relative aspect-[16/10] md:aspect-video bg-[#050505] overflow-hidden flex items-center justify-center p-4 md:p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={showcase[currentSlide].image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="p-6 md:p-8 bg-[#0f0f0f] border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{showcase[currentSlide].title}</h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{showcase[currentSlide].description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button onClick={() => setCurrentSlide(p => (p === 0 ? showcase.length - 1 : p - 1))} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <div className="flex gap-2">
                  {showcase.map((_: any, i: number) => (
                    <div key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === currentSlide ? `w-8 ${project.badgeColor}` : 'w-2 bg-white/20 hover:bg-white/40'}`} />
                  ))}
                </div>
                <button onClick={() => setCurrentSlide(p => (p + 1) % showcase.length)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. HOW IT WORKS (FLOW) & ARCHITECTURE */}
      {(flow.length > 0 || architecture.length > 0) && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {flow.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Activity className={project.badgeColor.replace('bg-', 'text-')} />
                How It Works
              </h3>
              <div className="relative border-l-2 border-white/10 ml-4 space-y-8 py-4">
                {flow.map((step: string, index: number) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                  >
                    <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full ${project.badgeColor} shadow-[0_0_15px_currentColor]`}></div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
                      <h4 className="text-lg font-semibold text-white">{step}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {architecture.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Layers className={project.badgeColor.replace('bg-', 'text-')} />
                System Architecture
              </h3>
              <div className="flex flex-col gap-4">
                {architecture.map((layer: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors z-10 relative">
                      <Database size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">{layer}</span>
                    </div>
                    {index !== architecture.length - 1 && (
                      <div className="absolute -bottom-4 left-9 w-[2px] h-4 bg-white/10"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. KEY FEATURES GRID */}
      <section>
        <h3 className="text-3xl font-bold text-center text-white mb-12">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors group"
            >
              <CheckCircle2 size={24} className={`mb-4 opacity-50 group-hover:opacity-100 transition-opacity ${project.badgeColor.replace('bg-', 'text-')}`} />
              <h4 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">{feature}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. METRICS */}
      {metrics.length > 0 && (
        <section className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 md:p-16 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {metrics.map((metric: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="pt-10 md:pt-0 first:pt-0 flex flex-col items-center justify-center"
              >
                <span className={`text-5xl md:text-6xl font-black mb-4 tracking-tighter ${project.badgeColor.replace('bg-', 'text-')}`}>
                  {metric.value}
                </span>
                <span className="text-lg text-gray-400 font-medium uppercase tracking-wider">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 6. ACTION FOOTER */}
      <section className="flex flex-wrap items-center justify-center gap-6 pb-20">
        {project.liveLink && project.liveLink !== "#" && (
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noreferrer"
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black transition-transform hover:scale-105 shadow-xl ${project.badgeColor}`}
          >
            <ExternalLink size={20} />
            View Live Project
          </a>
        )}
        {project.githubLink && project.githubLink !== "https://github.com/ADD_GITHUB_LINK" && (
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
          >
            <Code size={20} />
            Source Code
          </a>
        )}
      </section>
    </div>
  )
}
