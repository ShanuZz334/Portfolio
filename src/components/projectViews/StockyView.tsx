import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Code, Layers, Activity, Database, BarChart2, Cpu, LineChart, Globe, Target } from 'lucide-react'

export const StockyView = ({ project }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const showcase = project.showcase || []

  useEffect(() => {
    if (showcase.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % showcase.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [showcase.length])
  return (
    <div className="relative w-full text-white overflow-hidden pb-32 font-sans bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent blur-[100px]" />
        {/* Subtle grid */}
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
           <defs>
            <pattern id="stockGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stockGrid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 flex flex-col gap-32">
        
        {/* 1. HERO SECTION REDESIGN */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest w-max shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              🚀 AI FINTECH PLATFORM
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Stocky
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-lg">
              AI-powered trading intelligence platform analyzing market data, technical indicators, options flow, and global signals.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-bold mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">AI Engine</span>
              <span className="text-gray-600">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">200+ Indicators</span>
              <span className="text-gray-600">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Market Intelligence</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all">
                  <ExternalLink size={18} /> View Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                  <Code size={18} /> Explore Code
                </a>
              )}
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="relative"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[#0a0a0a]"
            >
              {/* No color overlay - clean image */}
              {showcase.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={showcase[currentSlide].image}
                    alt={showcase[currentSlide].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-auto object-cover"
                  />
                </AnimatePresence>
              ) : (
                <img src={project.images?.[0]} alt="Stocky Dashboard" className="w-full h-auto object-cover" />
              )}

              {/* Slide dots */}
              {showcase.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {showcase.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-green-400' : 'w-1.5 bg-white/30'}`}
                    />
                  ))}
                </div>
              )}


            </motion.div>
          </motion.div>
        </section>

        {/* 2. AI ENGINE SHOWCASE */}
        <section className="flex flex-col items-center text-center">
          <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-12">Stocky Intelligence Engine</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-5xl">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-3 w-40">
              <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                <Database size={24} />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data Input</span>
            </motion.div>
            
            <div className="hidden md:flex h-[2px] flex-1 bg-gradient-to-r from-white/5 via-green-500/50 to-white/5 relative overflow-hidden">
               <motion.div animate={{ x: ['-100%', '300%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-green-400 to-transparent blur-sm" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-3 w-40">
              <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-cyan-400 shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
                <Activity size={24} />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">300+ Market<br/>Parameters</span>
            </motion.div>

            <div className="hidden md:flex h-[2px] flex-1 bg-gradient-to-r from-white/5 via-cyan-500/50 to-white/5 relative overflow-hidden">
               <motion.div animate={{ x: ['-100%', '300%'] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-3 w-40 z-10 relative">
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#111] border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <Cpu size={32} />
              </div>
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider text-center">AI Processing<br/>Engine</span>
            </motion.div>

            <div className="hidden md:flex h-[2px] flex-1 bg-gradient-to-r from-white/5 via-violet-500/50 to-white/5 relative overflow-hidden">
               <motion.div animate={{ x: ['-100%', '300%'] }} transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-sm" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-3 w-40">
              <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider text-center">Trading<br/>Insights</span>
            </motion.div>
          </div>
        </section>

        {/* 3. MARKET INTELLIGENCE PIPELINE */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Intelligence Pipeline</h2>
            <p className="text-gray-400">How Stocky processes global data into actionable insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
            
            {[
              { title: "Market Data Collection", desc: "Collects NIFTY, Options, Global Markets, & Events", icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
              { title: "Analysis Engine", desc: "Processes Technical indicators, Fundamentals, & Volatility", icon: BarChart2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
              { title: "AI Decision Layer", desc: "Generates Stocky Score, Market condition, & Risk level", icon: Cpu, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
              { title: "Trader Dashboard", desc: "Visualizes actionable insights and intelligence", icon: LineChart, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl z-10 hover:-translate-y-2 transition-transform"
              >
                <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center ${step.color} mb-4`}>
                  <step.icon size={20} />
                </div>
                <div className="text-[10px] text-gray-500 font-mono mb-2">0{i+1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. SYSTEM ARCHITECTURE & 5. KEY FEATURES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4">
             <h3 className="text-2xl font-bold mb-8">System Architecture</h3>
             <div className="flex flex-col gap-0">
               {[
                 { name: "USER INTERFACE", tech: "React + Tailwind", icon: Layers, color: "border-cyan-500/30" },
                 { name: "API GATEWAY", tech: "Node.js + Express", icon: Activity, color: "border-green-500/30" },
                 { name: "DATA LAYER", tech: "MongoDB Atlas", icon: Database, color: "border-blue-500/30" },
                 { name: "INTELLIGENCE CORE", tech: "AI Analysis Engine", icon: Cpu, color: "border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]" }
               ].map((layer, i, arr) => (
                 <div key={i} className="relative flex flex-col items-center">
                   <div className={`w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border ${layer.color} backdrop-blur-md z-10`}>
                     <layer.icon size={20} className="text-gray-400" />
                     <div>
                       <div className="text-xs font-bold text-gray-300 tracking-wider">{layer.name}</div>
                       <div className="text-[10px] text-gray-500 font-mono">{layer.tech}</div>
                     </div>
                   </div>
                   {i !== arr.length - 1 && (
                     <div className="h-6 w-[2px] bg-white/10 relative">
                       <motion.div animate={{ y: [0, 24] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white/40" />
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>

          <div className="lg:col-span-8">
            <h3 className="text-2xl font-bold mb-8">Premium Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Market Dashboard", desc: "Real-time market overview with AI-generated insights.", badge: "React", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
                { title: "Technical Analysis", desc: "200+ indicators combined into intelligent scoring.", badge: "AI Engine", badgeColor: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
                { title: "Options Analytics", desc: "Options chain analysis with market sentiment detection.", badge: "Real-time", badgeColor: "text-green-400 bg-green-400/10 border-green-400/20" },
                { title: "Trade Journal", desc: "Track performance and trading psychology.", badge: "Database", badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20" }
              ].map((mod, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-white mb-2">{mod.title}</h4>
                    <p className="text-sm text-gray-400">{mod.desc}</p>
                  </div>
                  <div className="relative z-10 mt-4">
                    <span className={`inline-block px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${mod.badgeColor}`}>{mod.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 6. INSIDE STOCKY (LIVE DASHBOARD) */}
        <section className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem]">
           <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-[2rem]" />
           <div className="relative bg-[#050505] rounded-[2rem] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl">
             <div className="mb-8">
               <div className="text-[10px] font-bold text-green-400 tracking-widest uppercase mb-2">Inside Stocky</div>
               <h3 className="text-3xl font-bold">Live AI Analysis Stream</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Gauge Card */}
               <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center">
                 <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Stocky Score</div>
                 <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                     <motion.circle initial={{ strokeDasharray: "0 300" }} whileInView={{ strokeDasharray: "240 300" }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeOut" }} cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                     <span className="text-4xl font-black text-green-400">87</span>
                     <span className="text-[9px] text-green-500 font-bold tracking-widest uppercase">Bullish</span>
                   </div>
                 </div>
               </div>

               {/* Market Cards */}
               <div className="flex flex-col gap-4">
                 <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-white">NIFTY 50</span>
                     <span className="text-xs font-bold text-green-400">▲ +0.42%</span>
                   </div>
                   <div className="text-2xl font-black text-white">24,119.58</div>
                   <div className="h-8 mt-2 opacity-50"><svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full"><path d="M0,30 L10,25 L20,28 L30,15 L40,20 L50,10 L60,15 L70,5 L80,10 L90,2 L100,5" fill="none" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg></div>
                 </div>
                 <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-white">BANK NIFTY</span>
                     <span className="text-xs font-bold text-green-400">▲ +0.81%</span>
                   </div>
                   <div className="text-2xl font-black text-white">52,431.10</div>
                   <div className="h-8 mt-2 opacity-50"><svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full"><path d="M0,30 L20,25 L40,15 L60,18 L80,5 L100,0" fill="none" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg></div>
                 </div>
               </div>

               {/* Stream */}
               <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                 <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4 flex items-center justify-between">
                   Log Stream
                   <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                 </div>
                 <div className="flex-1 font-mono text-[10px] text-gray-400 flex flex-col justify-end gap-2">
                   <div className="opacity-40">{'>'} Analyzing MACD divergence...</div>
                   <div className="opacity-60">{'>'} Options PCR indicating support.</div>
                   <div className="opacity-80 text-cyan-400">{'>'} Volatility contraction detected.</div>
                   <div className="text-green-400">{'>'} AI Engine: Favorable entry conditions.</div>
                 </div>
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
               </div>
             </div>
           </div>
        </section>

        {/* 7. ANIMATED IMPACT STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "300+", label: "Market Signals Processed", color: "text-white" },
            { value: "200+", label: "Technical Indicators", color: "text-cyan-400" },
            { value: "7+", label: "Analysis Modules", color: "text-blue-400" },
            { value: "AI", label: "Decision Engine", color: "text-violet-400" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
            >
               <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter ${stat.color}`}>{stat.value}</div>
               <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </section>

      </div>
    </div>
  )
}
