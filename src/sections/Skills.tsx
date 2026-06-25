import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, Server, Brain } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const FRONTEND = [
  { name: 'React', level: 95 },
  { name: 'JavaScript', level: 92 },
  { name: 'TypeScript', level: 78 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'HTML5', level: 96 },
  { name: 'CSS3', level: 90 },
  { name: 'Vite', level: 85 },
  { name: 'Framer Motion', level: 80 },
]

const BACKEND = [
  { name: 'Node.js', level: 88 },
  { name: 'Express.js', level: 85 },
  { name: 'MongoDB', level: 82 },
  { name: 'REST APIs', level: 90 },
  { name: 'JWT Auth', level: 80 },
  { name: 'Cloud APIs', level: 75 },
]

const AI_SKILLS = [
  { name: 'Python', level: 88 },
  { name: 'Machine Learning', level: 80 },
  { name: 'Computer Vision', level: 78 },
  { name: 'Deep Learning', level: 72 },
  { name: 'AI Models', level: 82 },
  { name: 'Data Science', level: 70 },
  { name: 'Neural Networks', level: 74 },
]

// ─── Reusable: skill pill row ─────────────────────────────────────────────────

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => (
  <div className="flex items-center gap-3 group/bar">
    <span className="text-xs text-gray-400 w-28 shrink-0 group-hover/bar:text-white transition-colors">{name}</span>
    <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
      />
    </div>
    <span className="text-[10px] text-gray-600 w-7 text-right">{level}</span>
  </div>
)

// ─── Reusable: floating particles inside card ─────────────────────────────────

const CardParticles = ({ color }: { color: string }) => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full opacity-40"
        style={{ background: color, left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
        animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      />
    ))}
  </div>
)

// ─── Magnetic tilt card ───────────────────────────────────────────────────────

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Neural net SVG (AI card) ─────────────────────────────────────────────────

const NeuralNet = () => {
  const nodes = [
    { cx: 60, cy: 80 }, { cx: 60, cy: 140 }, { cx: 60, cy: 200 },
    { cx: 150, cy: 60 }, { cx: 150, cy: 120 }, { cx: 150, cy: 180 }, { cx: 150, cy: 240 },
    { cx: 240, cy: 80 }, { cx: 240, cy: 160 }, { cx: 240, cy: 220 },
    { cx: 310, cy: 140 },
  ]
  const edges = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],
    [3,7],[4,7],[4,8],[5,8],[5,9],[6,9],
    [7,10],[8,10],[9,10],
  ]

  return (
    <svg viewBox="0 0 370 300" className="w-full h-full opacity-25" style={{ filter: 'blur(0.3px)' }}>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#8a2be2" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.04, ease: 'easeOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx} cy={n.cy} r="5"
          fill="#8a2be2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          // @ts-ignore
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

// ─── Card components ──────────────────────────────────────────────────────────

const FrontendCard = () => {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard className="h-full">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative h-full rounded-3xl border border-cyan/10 bg-[#050d12] overflow-hidden p-7 flex flex-col gap-6"
      >
        <CardParticles color="#00f0ff" />
        {/* Glow blob */}
        <motion.div animate={{ opacity: hovered ? 0.18 : 0.08 }} className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan blur-[80px] pointer-events-none transition-all duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0">
            <Code2 size={20} className="text-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Frontend</h3>
            <p className="text-xs text-gray-500">Interface engineering</p>
          </div>
        </div>

        {/* Orbit ring decoration */}
        <div className="relative z-10 flex items-center justify-center py-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border border-dashed border-cyan/15 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 border border-dotted border-cyan/10 rounded-full" />
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-full bg-cyan/5 border border-cyan/20 flex items-center justify-center">
              <Code2 size={20} className="text-cyan/70" />
            </motion.div>
            {/* Orbiting dot */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 flex items-start justify-center pt-1">
              <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_#00f0ff]" />
            </motion.div>
          </div>
        </div>

        {/* Skill bars */}
        <div className="relative z-10 flex flex-col gap-3 flex-1">
          {FRONTEND.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} color="#00f0ff" />)}
        </div>
      </motion.div>
    </TiltCard>
  )
}

const BackendCard = () => {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard className="h-full">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative h-full rounded-3xl border border-emerald-500/10 bg-[#050f09] overflow-hidden p-7 flex flex-col gap-6"
      >
        <CardParticles color="#10b981" />
        <motion.div animate={{ opacity: hovered ? 0.18 : 0.08 }} className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-emerald-500 blur-[80px] pointer-events-none transition-all duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Server size={20} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Backend</h3>
            <p className="text-xs text-gray-500">Server & data systems</p>
          </div>
        </div>

        {/* DB node animation */}
        <div className="relative z-10 flex items-center justify-center py-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border border-dashed border-emerald-500/15 rounded-full" />
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-12 h-12 rounded-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
              <Server size={20} className="text-emerald-400/70" />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 flex items-start justify-center pt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </motion.div>
          </div>
        </div>

        {/* Skill bars */}
        <div className="relative z-10 flex flex-col gap-3 flex-1">
          {BACKEND.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} color="#10b981" />)}
        </div>
      </motion.div>
    </TiltCard>
  )
}

const AICard = () => {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard className="h-full lg:col-span-2">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative h-full rounded-3xl border border-violet/15 bg-[#0a0512] overflow-hidden p-7 flex flex-col gap-6"
      >
        <CardParticles color="#8a2be2" />
        <motion.div animate={{ opacity: hovered ? 0.22 : 0.1 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full bg-violet blur-[100px] pointer-events-none transition-all duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0">
              <Brain size={20} className="text-violet" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Artificial Intelligence</h3>
              <p className="text-xs text-gray-500">Neural intelligence systems</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/20">
            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-violet" />
            <span className="text-[10px] font-medium text-violet/80 tracking-wide">AI Active</span>
          </div>
        </div>

        {/* Neural net + skill bars split */}
        <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Neural net visualization */}
          <div className="flex items-center justify-center">
            <div className="w-full h-48 sm:h-full max-h-64">
              <NeuralNet />
            </div>
          </div>
          {/* Skill bars */}
          <div className="flex flex-col gap-3 justify-center">
            {AI_SKILLS.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} color="#8a2be2" />)}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const Skills = () => {
  return (
    <section id="skills" className="relative py-28 bg-dark-bg z-10 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-violet/5 blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-7xl relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4"
          >
            Stack & Expertise
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-electric-blue to-violet">
              Universe
            </span>
          </h2>
          <p className="text-gray-500 text-base mt-3 max-w-md mx-auto">
            Technologies powering my digital creations
          </p>
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="h-[2px] rounded-full bg-gradient-to-r from-cyan to-violet mx-auto mt-6"
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 auto-rows-auto">
          <motion.div className="lg:col-span-1 min-h-[560px]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }}>
            <FrontendCard />
          </motion.div>
          <motion.div className="lg:col-span-1 min-h-[560px]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.1 }}>
            <BackendCard />
          </motion.div>
          <motion.div className="lg:col-span-2 min-h-[560px]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.2 }}>
            <AICard />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Skills
