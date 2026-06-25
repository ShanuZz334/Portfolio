import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Rocket, Code2, CheckCircle2 } from 'lucide-react'

// --- Animated Counter Hook ---
const useAnimatedCounter = (target: number, duration: number = 2) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / (duration * 1000), 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - percentage, 3)
      setCount(Math.floor(easeOut * target))

      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return count
}

const StatCard = ({ value, label, plus = false, delay = 0 }: { value: number, label: string, plus?: boolean, delay?: number }) => {
  const count = useAnimatedCounter(value)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm"
    >
      <div className="text-3xl font-bold font-mono text-white mb-1">
        {count}{plus && <span className="text-cyan">+</span>}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 text-center">{label}</div>
    </motion.div>
  )
}

const MilestoneNode = ({ label, active, delay }: { label: string, active: boolean, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className="relative flex items-center justify-center w-full my-12"
  >
    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dark-bg border-2 border-white/10 z-20">
       <motion.div 
         initial={{ scale: 0 }}
         whileInView={{ scale: active ? 1 : 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.4, delay: delay + 0.2 }}
         className="absolute inset-[2px] bg-cyan rounded-full" 
       />
       {active && (
         <motion.div
           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute inset-0 bg-cyan rounded-full blur-sm"
         />
       )}
    </div>
    <div className="absolute left-1/2 translate-x-6 text-[10px] font-bold tracking-widest uppercase text-gray-500">
      {label}
    </div>
  </motion.div>
)


const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="relative py-32 bg-[#06090f] z-10 overflow-hidden" ref={containerRef}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Soft Gradients */}
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-cyan/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-violet/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Building Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-electric-blue to-violet">Products</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-medium mb-6">
            From concepts to scalable AI-driven applications
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[2px] rounded-full bg-gradient-to-r from-cyan to-violet mx-auto"
          />
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 max-w-4xl mx-auto">
          <StatCard value={2} label="Products Built" plus delay={0} />
          <StatCard value={200} label="Indicators Engineered" plus delay={0.1} />
          <StatCard value={100} label="Full Stack Architecture" delay={0.2} />
          <StatCard value={100} label="AI First Development" delay={0.3} />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Center Glowing Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan via-violet to-transparent w-full"
              style={{ height: lineHeight, filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5))' }}
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-0">
            
            {/* GeoFace Project */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
              <div className="md:w-[45%] w-full mb-8 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan/30 transition-colors group relative overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/5 blur-3xl rounded-full pointer-events-none group-hover:bg-cyan/10 transition-colors" />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan">
                        <Rocket size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight">GeoFace</h3>
                        <p className="text-xs text-cyan font-medium">AI Attendance Platform</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Status: Building
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                    AI-powered attendance system combining facial recognition and geolocation verification for secure institutional management.
                  </p>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">My Role</h4>
                      <p className="text-xs font-medium text-gray-300">Founder &bull; Full Stack Developer</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Built With</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'AI Models', 'MongoDB'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-300">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Achievements</h4>
                      <ul className="space-y-1.5">
                        {['Designed complete system architecture', 'Built secure authentication flow', 'Created AI verification pipeline'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Milestones for Desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col justify-center h-full w-full pointer-events-none">
                 <MilestoneNode label="IDEA" active={true} delay={0} />
                 <MilestoneNode label="DESIGN" active={true} delay={0.2} />
              </div>

              <div className="hidden md:block w-[45%]" />
            </div>

            {/* Spacer for timeline visuals */}
            <div className="hidden md:block h-32" />

            {/* Stocky Project */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full">
              <div className="md:w-[45%] w-full mb-8 md:mb-0">
                 <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet/30 transition-colors group relative overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-0 left-0 w-48 h-48 bg-violet/5 blur-3xl rounded-full pointer-events-none group-hover:bg-violet/10 transition-colors" />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-violet/10 border border-violet/20 text-violet">
                        <Code2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight">Stocky</h3>
                        <p className="text-xs text-violet font-medium">AI Trading Intelligence</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                      Status: Live
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                    Advanced market analytics platform analyzing 200+ indicators to generate AI-powered market insights and trading strategies.
                  </p>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">My Role</h4>
                      <p className="text-xs font-medium text-gray-300">Creator &bull; Full Stack Developer</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Built With</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Express.js', 'Python AI', 'WebSockets'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-300">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Highlights</h4>
                      <ul className="space-y-1.5">
                        {['AI scoring engine', 'Technical analysis system', 'Options analytics', 'Real-time dashboard'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

               {/* Milestones for Desktop */}
               <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col justify-center h-full w-full pointer-events-none">
                 <MilestoneNode label="BUILD" active={true} delay={0.4} />
                 <MilestoneNode label="DEPLOY" active={true} delay={0.6} />
              </div>

              <div className="hidden md:block w-[45%]" />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience
