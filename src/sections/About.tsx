import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

const About = () => {

  return (
    <section id="about" className="relative py-32 bg-[#050505] z-10 overflow-hidden">
      
      {/* Premium Background: Subtle neural connections & code particles */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.5)" />
              <path d="M30 30 L60 0 M30 30 L0 60 M30 30 L60 60 M30 30 L0 0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="container px-6 mx-auto max-w-7xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Bio + Stats */}
          <div className="lg:col-span-6 flex flex-col gap-12">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                <Activity size={14} className="text-cyan-400" />
                <span>About Me</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6 text-white">
                Engineering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                  Intelligent
                </span> Systems
              </h2>
              
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-medium">
                <p>
                  I am <span className="text-white font-bold">Muhammed Shanif</span>, a Computer Science Engineering student passionate about building intelligent software systems.
                </p>
                <p>
                  I focus on creating AI-powered products that combine <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 font-bold">full-stack engineering</span>, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-bold">machine learning</span>, automation, and real-world problem solving.
                </p>
                <p>
                  I transform ideas into complete applications — from architecture and UI design to backend systems and AI integration.
                </p>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['AI Products', 'Full Stack Engineering', 'Machine Learning', 'System Design'].map((keyword) => (
                  <span key={keyword} className="px-4 py-2 text-xs font-bold text-gray-300 rounded-lg bg-white/5 border border-white/5">
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>



          </div>

          {/* Right Column: Animated Logos */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] lg:min-h-full">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-violet-500/10 rounded-full blur-[60px] pointer-events-none ml-20 mt-20"></div>

            <div className="w-full h-[400px] lg:h-[500px] relative z-10 flex items-center justify-center">
              
              {/* Floating Stocky Logo */}
              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  x: [0, 10, 0],
                  rotate: [-3, 3, -3]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-5 md:top-20 md:left-20 z-20"
              >
                <div className="p-4 rounded-3xl bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,240,255,0.15)] group hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all">
                  <img 
                    src="/images/stocky_logo.png" 
                    alt="Stocky" 
                    className="w-24 h-24 md:w-48 md:h-48 object-contain"
                  />
                </div>
              </motion.div>

              {/* Floating GeoFace Logo */}
              <motion.div
                animate={{ 
                  y: [0, 30, 0],
                  x: [0, -15, 0],
                  rotate: [3, -2, 3]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute bottom-10 right-5 md:bottom-20 md:right-20 z-10"
              >
                <div className="p-4 rounded-3xl bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(138,43,226,0.15)] group hover:shadow-[0_0_40px_rgba(138,43,226,0.3)] transition-all">
                  <img 
                    src="/images/geoface_logo.png" 
                    alt="GeoFace" 
                    className="w-24 h-24 md:w-48 md:h-48 object-contain"
                  />
                </div>
              </motion.div>

              {/* Central connection line or aesthetic element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-cyan-400/0 via-white/20 to-violet-500/0 rotate-45"
              ></motion.div>

            </div>
            
          </div>

        </div>

      </div>
    </section>
  )
}

export default About
