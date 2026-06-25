import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Terminal, Cpu, Bot, ScanFace, Database, Activity, CheckCircle2 } from 'lucide-react'

// --- Typewriter Component ---
const Typewriter = ({ text, delay = 30 }: { text: string, delay?: number }) => {
  const [currentText, setCurrentText] = useState('')
  useEffect(() => {
    let timeout: any;
    let index = 0;
    const type = () => {
      setCurrentText(text.substring(0, index + 1))
      index++;
      if (index < text.length) timeout = setTimeout(type, delay);
    }
    type();
    return () => clearTimeout(timeout);
  }, [text, delay])
  return <span>{currentText}</span>
}

// --- Animated Counter Hook ---
const useAnimatedCounter = (target: number, duration: number = 2) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - percentage, 3)
      setCount(Math.floor(easeOut * target))
      if (percentage < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return count
}

const StatCard = ({ value, label, prefix = '', suffix = '', delay = 0 }: { value: number | string, label: string, prefix?: string, suffix?: string, delay?: number }) => {
  const isNumber = typeof value === 'number'
  const count = useAnimatedCounter(isNumber ? value : 0)
  const displayValue = isNumber ? count : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm"
    >
      <div className="text-3xl font-bold font-mono text-white mb-1">
        <span className="text-cyan">{prefix}</span>{displayValue}<span className="text-cyan">{suffix}</span>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 text-center">{label}</div>
    </motion.div>
  )
}

// --- Background Neural Net ---
const BackgroundNeuralNet = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Simplified abstract connections */}
        <g stroke="rgba(0,240,255,0.2)" strokeWidth="1" fill="none">
           <path d="M 100 100 Q 200 150 300 100 T 500 150" />
           <path d="M 200 300 Q 350 200 500 300 T 800 200" />
           <path d="M 50 400 Q 250 500 450 400 T 750 500" />
           <path d="M 600 100 Q 700 200 800 100 T 1000 200" />
        </g>
        <g fill="url(#glow)">
          <motion.circle cx="100" cy="100" r="4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.circle cx="300" cy="100" r="4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="500" cy="150" r="6" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="200" cy="300" r="5" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3.5, repeat: Infinity }} />
          <motion.circle cx="500" cy="300" r="4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4.5, repeat: Infinity, delay: 2 }} />
          <motion.circle cx="450" cy="400" r="5" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }} />
          <motion.circle cx="800" cy="200" r="6" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }} />
        </g>
      </svg>
    </div>
  )
}

// --- Terminal Simulation ---
const TerminalSimulation = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let isActive = true;
    const runSequence = async () => {
      while (isActive) {
        setStep(0)
        await new Promise(r => setTimeout(r, 1000)); if (!isActive) return;
        setStep(1) // Initializing
        await new Promise(r => setTimeout(r, 1500)); if (!isActive) return;
        setStep(2) // Dataset loaded
        await new Promise(r => setTimeout(r, 1500)); if (!isActive) return;
        setStep(3) // Model Arch
        await new Promise(r => setTimeout(r, 1500)); if (!isActive) return;
        setStep(4) // Epoch 1
        await new Promise(r => setTimeout(r, 1500)); if (!isActive) return;
        setStep(5) // Epoch 25
        await new Promise(r => setTimeout(r, 1500)); if (!isActive) return;
        setStep(6) // Optimized
        await new Promise(r => setTimeout(r, 5000)); if (!isActive) return; // Wait before loop
      }
    }
    runSequence()
    return () => { isActive = false }
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-[inset_0_0_40px_rgba(0,240,255,0.03)] flex flex-col font-mono text-sm w-full h-full">
      
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-2 font-medium">
          <Terminal size={14} /> training_pipeline.py
        </div>
        <div className="w-12"></div> {/* Spacer for balance */}
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 overflow-hidden relative flex flex-col gap-3">
        <div className="text-gray-400 flex items-center gap-2">
          <span className="text-cyan">{'>'}</span> {step >= 1 && <Typewriter text="Initializing Neural Engine..." />}
        </div>

        <AnimatePresence>
          {step >= 2 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 mt-2">
                <div className="text-white"><Typewriter text="Dataset Loaded" /></div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-cyan rounded-full" />
                  </div>
                  <span className="text-cyan text-xs">100%</span>
                </div>
             </motion.div>
          )}

          {step >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-gray-300">
              <Typewriter text="Model Architecture:" /><br/>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-violet">Vision Transformer</motion.span>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-white">
              <Typewriter text="Training:" />
            </motion.div>
          )}

          {step >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-xs ml-4 border-l-2 border-white/10 pl-3 py-1 flex flex-col gap-3">
              <div>
                <Typewriter text="Epoch 01" /><br/>
                Loss: <span className="text-red-400">0.854</span><br/>
                Accuracy: <span className="text-yellow-400">65%</span>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <Typewriter text="Epoch 25" /><br/>
                Loss: <span className="text-emerald-400">0.214</span><br/>
                Accuracy: <span className="text-emerald-400">94%</span>
              </motion.div>
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex flex-col gap-1">
              <div className="text-gray-300 mb-1"><Typewriter text="Optimization:" /></div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={14} /> Quantization complete</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={14} /> Model validation passed</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={14} /> Deployment ready</motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blinking Cursor */}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-4 bg-cyan mt-2"
        />
      </div>

    </div>
  )
}

// --- Experiment Card ---
const ExperimentCard = ({ icon: Icon, title, highlightTitle, highlightValue, highlightColor, contentList, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan/30 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan/30 group-hover:bg-cyan/10 transition-colors text-gray-400 group-hover:text-cyan">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
      </div>

      <div className="flex-1 relative z-10 mb-6">
        <ul className="space-y-2">
          {contentList.map((item: string, i: number) => (
             <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
               <div className="w-1 h-1 rounded-full bg-cyan/50" />
               {item}
             </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{highlightTitle}</div>
        <div className={`text-sm font-semibold ${highlightColor}`}>{highlightValue}</div>
      </div>
    </motion.div>
  )
}


const AILab = () => {
  return (
    <section id="ailab" className="relative py-32 bg-[#06090f] z-10 overflow-hidden">
      
      {/* Background Elements */}
      <BackgroundNeuralNet />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="p-3 rounded-2xl bg-cyan/10 border border-cyan/20 text-cyan relative"
            >
              <Cpu className="w-8 h-8" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border-2 border-cyan/50 rounded-2xl" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              AI Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-electric-blue to-violet">Lab</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <p className="text-gray-400 text-lg md:text-xl">Exploring machine intelligence through real-world experiments.</p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 w-fit">
               <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
               <span className="text-[10px] font-bold tracking-widest text-cyan uppercase">Active Experiments</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard value={4} label="AI Domains" suffix="+" delay={0} />
          <StatCard value={200} label="Indicators Engineered" suffix="+" delay={0.1} />
          <StatCard value="Local" label="AI Deployment" delay={0.2} />
          <StatCard value="Full Stack" label="AI Products" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_calc(60%-24px)] gap-6 items-stretch">
          
          {/* Terminal */}
          <div className="h-full">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full">
              <TerminalSimulation />
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            <ExperimentCard 
              icon={ScanFace}
              title="Vision Intelligence"
              contentList={['Face Recognition', 'Object Detection', 'Image Processing']}
              highlightTitle="GeoFace AI Engine"
              highlightValue="98% Verification Confidence"
              highlightColor="text-cyan"
              delay={0.1}
            />
            <ExperimentCard 
              icon={Database}
              title="Offline AI Systems"
              contentList={['Running local AI models', 'Ollama & Qwen', 'Code generation models']}
              highlightTitle="Capability"
              highlightValue="Private AI Inference"
              highlightColor="text-violet"
              delay={0.2}
            />
            <ExperimentCard 
              icon={Activity}
              title="Prediction Engines"
              contentList={['Market Intelligence', 'Pattern Recognition', 'Data Modeling']}
              highlightTitle="Stocky AI Engine"
              highlightValue="200+ Indicators Analyzed"
              highlightColor="text-emerald-400"
              delay={0.3}
            />
            <ExperimentCard 
              icon={Bot}
              title="AI Agents"
              contentList={['Workflow automation', 'Smart assistants', 'Autonomous pipelines']}
              highlightTitle="Focus Area"
              highlightValue="Intelligent Automation"
              highlightColor="text-yellow-400"
              delay={0.4}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default AILab
