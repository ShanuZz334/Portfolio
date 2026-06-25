import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Code, Shield, MapPin, ScanFace, CheckCircle2, Cpu, Database, Smartphone, Lock, Eye, Users } from 'lucide-react'

export const GeoFaceView = ({ project }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const showcase = project.showcase || []

  useEffect(() => {
    if (showcase.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % showcase.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [showcase.length])
  const steps = [
    {
      num: '01',
      title: 'Identity Capture',
      desc: 'Face data is securely captured via the mobile camera.',
      icon: ScanFace,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-400/20',
    },
    {
      num: '02',
      title: 'AI Recognition',
      desc: "Computer vision model validates the user's identity in real-time.",
      icon: Eye,
      color: 'text-violet-400',
      bg: 'bg-violet-400/10',
      border: 'border-violet-400/20',
    },
    {
      num: '03',
      title: 'Geo Validation',
      desc: 'Location is compared against the authorized attendance zone.',
      icon: MapPin,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
    },
    {
      num: '04',
      title: 'Attendance Approval',
      desc: 'Secure verification is completed and recorded instantly.',
      icon: CheckCircle2,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/20',
    },
  ]

  const archLayers = [
    { name: 'MOBILE INTERFACE', tech: 'React Native · UI Layer', icon: Smartphone, color: 'border-cyan-500/30' },
    { name: 'AUTHENTICATION API', tech: 'Python · REST Gateway', icon: Lock, color: 'border-violet-500/30' },
    { name: 'AI VISION ENGINE', tech: 'Face Recognition Models', icon: Cpu, color: 'border-fuchsia-500/30 shadow-[0_0_15px_rgba(192,38,211,0.1)]' },
    { name: 'LOCATION ENGINE', tech: 'GPS Geofencing Module', icon: MapPin, color: 'border-emerald-500/30' },
    { name: 'DATABASE LAYER', tech: 'Secure Attendance Store', icon: Database, color: 'border-blue-500/30' },
  ]

  const modules = [
    {
      icon: Eye,
      title: 'Face Intelligence',
      desc: 'AI-powered biometric verification using deep learning models.',
      tags: ['Computer Vision', 'ML'],
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-400/20',
    },
    {
      icon: MapPin,
      title: 'Location Engine',
      desc: 'GPS-based geofence validation for authorized zones only.',
      tags: ['GeoFence', 'GPS'],
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
    },
    {
      icon: Shield,
      title: 'Security Layer',
      desc: 'Prevents proxy attendance via anti-spoofing mechanisms.',
      tags: ['Authentication', 'Anti-Spoof'],
      color: 'text-violet-400',
      bg: 'bg-violet-400/10',
      border: 'border-violet-400/20',
    },
    {
      icon: Users,
      title: 'Admin Dashboard',
      desc: 'Institution-level attendance monitoring and reporting.',
      tags: ['Analytics', 'Reports'],
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
    },
  ]

  const metrics = [
    { value: '98%', label: 'Face Match Confidence', color: 'text-cyan-400' },
    { value: '3m', label: 'Location Accuracy', color: 'text-emerald-400' },
    { value: 'AI', label: 'Verification Engine', color: 'text-violet-400' },
    { value: 'Realtime', label: 'Processing Speed', color: 'text-white' },
  ]

  const pipelineNodes = [
    { label: 'USER', icon: Smartphone, color: 'text-gray-400' },
    { label: 'FACE CAPTURE', icon: ScanFace, color: 'text-cyan-400' },
    { label: 'AI MODEL', icon: Cpu, color: 'text-violet-400' },
    { label: 'LOCATION CHECK', icon: MapPin, color: 'text-emerald-400' },
    { label: 'VERIFIED ACCESS', icon: CheckCircle2, color: 'text-green-400' },
  ]

  return (
    <div className="relative w-full text-white overflow-hidden pb-32 bg-[#050505]">

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-violet-500/10 via-transparent to-transparent blur-[100px]" />
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geoGrid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 flex flex-col gap-32">

        {/* === 1. HERO === */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest w-max shadow-[0_0_20px_rgba(139,92,246,0.1)]">
              🛡️ AI SECURITY PLATFORM
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              GeoFace
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-lg">
              AI-powered attendance verification using facial recognition,{' '}
              <span className="text-cyan-400 font-semibold">geolocation intelligence</span>, and secure identity validation.
            </p>

            {/* Highlight keywords */}
            <div className="flex flex-wrap gap-3 text-sm font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Computer Vision</span>
              <span className="text-gray-600">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Location Intelligence</span>
              <span className="text-gray-600">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Authentication</span>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              {['✓ Face Recognition', '✓ GPS Verification', '✓ Anti Spoof Security'].map((pill) => (
                <span key={pill} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/[0.04] border border-white/10 text-gray-300">
                  {pill}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-4">
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all"
                >
                  <ExternalLink size={17} /> Download App
                </a>
              )}
              {project.githubLink && project.githubLink !== 'https://github.com/ADD_GITHUB_LINK' && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                >
                  <Code size={17} /> Explore Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — floating app preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto flex justify-center"
              layout
            >
              {/* Scan ring animation */}
              <motion.div
                layout
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl border border-violet-400/30"
              />

              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(139,92,246,0.05)] bg-[#0a0a0a]">
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent pointer-events-none z-10" />

                {showcase.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      layout
                      key={currentSlide}
                      src={showcase[currentSlide].image}
                      alt={showcase[currentSlide].title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, layout: { duration: 0.6, ease: "easeInOut" } }}
                      className={`w-full object-cover mx-auto ${showcase[currentSlide].image.includes('mobile') ? 'max-w-[220px] md:max-w-[260px]' : 'max-w-xl md:max-w-2xl'}`}
                    />
                  </AnimatePresence>
                ) : (
                  <motion.img
                    layout
                    src={project.showcase?.[0]?.image || project.images?.[0]}
                    alt="GeoFace App Preview"
                    className={`w-full object-cover mx-auto ${(project.showcase?.[0]?.image || project.images?.[0] || '').includes('mobile') ? 'max-w-[220px] md:max-w-[260px]' : 'max-w-xl md:max-w-2xl'}`}
                  />
                )}

                {/* Slide dots */}
                {showcase.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {showcase.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-violet-500' : 'w-1.5 bg-white/30'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* === 2. AI VERIFICATION ENGINE FLOW === */}
        <section className="flex flex-col items-center">
          <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-3">
            GeoFace Intelligence Flow
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Verification Pipeline</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-5xl">
            {pipelineNodes.map((node, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 w-36"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center ${node.color} shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]`}>
                    <node.icon size={24} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${node.color}`}>{node.label}</span>
                </motion.div>

                {i < pipelineNodes.length - 1 && (
                  <div className="hidden md:block h-[2px] w-12 bg-gradient-to-r from-white/10 via-violet-500/40 to-white/10 relative overflow-hidden shrink-0">
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* === 3. HOW IT WORKS === */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Four-step verification process ensuring secure and accurate attendance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] w-[75%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:-translate-y-2 transition-transform z-10"
              >
                <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center ${step.color} mb-4`}>
                  <step.icon size={20} />
                </div>
                <div className="text-[10px] font-mono text-gray-500 mb-2">Step {step.num}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>

                {/* completion dot */}
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${step.bg.replace('/10', '')} animate-pulse`} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* === 4. ARCHITECTURE + 5. MODULES === */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Architecture */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold mb-8">System Architecture</h3>
            <div className="flex flex-col gap-0">
              {archLayers.map((layer, i, arr) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div className={`w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border ${layer.color} backdrop-blur-md z-10`}>
                    <layer.icon size={18} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-gray-200 tracking-wider">{layer.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{layer.tech}</div>
                    </div>
                  </div>
                  {i !== arr.length - 1 && (
                    <div className="h-5 w-[2px] bg-white/10 relative overflow-hidden">
                      <motion.div
                        animate={{ y: [0, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white/40"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Feature modules */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-bold mb-8">AI Security Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-colors relative overflow-hidden flex flex-col gap-4 min-h-[170px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={`w-11 h-11 rounded-xl ${mod.bg} ${mod.border} border flex items-center justify-center ${mod.color} relative z-10`}>
                    <mod.icon size={20} />
                  </div>

                  <div className="relative z-10 flex flex-col gap-1 flex-1">
                    <h4 className="text-lg font-bold text-white">{mod.title}</h4>
                    <p className="text-sm text-gray-400">{mod.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {mod.tags.map((tag) => (
                      <span key={tag} className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${mod.border} ${mod.color} ${mod.bg}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </section>



        {/* === 7. IMPACT METRICS === */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter ${m.color}`}>{m.value}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{m.label}</div>
            </motion.div>
          ))}
        </section>

        {/* === 8. STARTUP BADGE === */}
        {project.additionalInfo && (
          <section className="relative p-1 bg-gradient-to-r from-violet-500/20 via-white/5 to-violet-500/20 rounded-2xl">
            <div className="bg-[#050505] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">Startup Status</div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.additionalInfo.stage}</h3>
                <p className="text-gray-400">{project.additionalInfo.funding}</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-bold text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                Awaiting Funding / Launch
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
