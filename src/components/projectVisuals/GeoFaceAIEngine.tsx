import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Check, MapPin, ScanFace, ShieldCheck, Cpu } from 'lucide-react'

// ─── Step config ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 0, icon: ScanFace, label: 'Face Capture', desc: 'Biometric scan' },
  { id: 1, icon: Cpu,      label: 'AI Analysis',  desc: 'Neural match'  },
  { id: 2, icon: MapPin,   label: 'Location',     desc: 'GPS validate'  },
  { id: 3, icon: ShieldCheck, label: 'Verified',  desc: 'Access granted'},
]

// ─── Animated confidence counter ──────────────────────────────────────────────
const useCounter = (target: number, duration = 2200) => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const raf = requestAnimationFrame(function tick() {
      const t = Math.min((Date.now() - start) / duration, 1)
      setVal(+(target * t).toFixed(1))
      if (t < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

// ─── Security check list ──────────────────────────────────────────────────────
const CHECKS = [
  'Face match verified',
  'GPS consistency checked',
  'Device fingerprint trusted',
  'Anti-spoof protection passed',
]

const SIGNALS = [
  { label: 'Location Accuracy', value: '3 m' },
  { label: 'Verification Time', value: '0.8 s' },
  { label: 'AI Confidence',     value: '98%'  },
  { label: 'Risk Level',        value: 'Low'  },
]

// ─── Abstract face biometric ─────────────────────────────────────────────────
const FaceBiometric = ({ scanY }: { scanY: number }) => (
  <div className="relative w-20 h-24 mx-auto">
    <svg viewBox="0 0 80 96" className="w-full h-full">
      {/* Face outline */}
      <ellipse cx="40" cy="44" rx="24" ry="30" fill="none" stroke="rgba(138,43,226,0.4)" strokeWidth="1.5" />
      {/* Eye dots */}
      <circle cx="28" cy="38" r="2.5" fill="#8a2be2" opacity="0.7" />
      <circle cx="52" cy="38" r="2.5" fill="#8a2be2" opacity="0.7" />
      {/* Detection points */}
      {[
        [40,14],[16,44],[64,44],[28,66],[52,66],[40,74],
        [22,28],[58,28],[30,52],[50,52],
      ].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.5"
          fill="#00f0ff" opacity="0"
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
      {/* Corner brackets */}
      <path d="M10 10 L10 20 M10 10 L20 10" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <path d="M70 10 L70 20 M70 10 L60 10" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <path d="M10 86 L10 76 M10 86 L20 86" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <path d="M70 86 L70 76 M70 86 L60 86" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      {/* Scan line */}
      <line x1="8" y1={scanY * 0.96} x2="72" y2={scanY * 0.96}
        stroke="#8a2be2" strokeWidth="1"
        strokeOpacity="0.6"
        style={{ filter: 'drop-shadow(0 0 4px #8a2be2)' }}
      />
    </svg>
  </div>
)

// ─── Central scanner ──────────────────────────────────────────────────────────
const CentralScanner = () => {
  const confidence = useCounter(98.7, 2400)
  return (
    <div className="relative flex items-center justify-center">
      {/* Outermost slow ring */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-48 h-48 rounded-full border border-dashed border-white/[0.07]" />

      {/* Mid rotating ring */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute w-36 h-36 rounded-full border border-violet/20" />

      {/* Radar sweep */}
      <div className="absolute w-32 h-32 rounded-full overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0,240,255,0.12) 360deg)' }}
        />
        {/* Grid inside */}
        <div className="absolute inset-0 opacity-10 rounded-full overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.8) 1px,transparent 1px)', backgroundSize: '14px 14px' }} />
      </div>

      {/* Pulse rings */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div key={i} className="absolute w-32 h-32 rounded-full border border-cyan/20"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}

      {/* Center content */}
      <div className="relative w-28 h-28 rounded-full bg-[#06090f] border border-white/[0.08] flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 mb-1">
          <MapPin size={18} className="text-cyan" />
        </motion.div>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest leading-tight">Confidence</span>
        <span className="text-xl font-black text-white font-mono">{confidence.toFixed(1)}%</span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const GeoFaceAIEngine = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [scanY, setScanY] = useState(0)
  const [checkCount, setCheckCount] = useState(0)

  // Advance steps
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 3200)
    return () => clearInterval(t)
  }, [])

  // Face scan line
  useEffect(() => {
    const t = setInterval(() => setScanY(p => (p >= 96 ? 0 : p + 1.5)), 22)
    return () => clearInterval(t)
  }, [])

  // Reveal checks one by one
  useEffect(() => {
    setCheckCount(0)
    let i = 0
    const t = setInterval(() => {
      i++
      setCheckCount(Math.min(i, CHECKS.length))
      if (i >= CHECKS.length) clearInterval(t)
    }, 500)
    return () => clearInterval(t)
  }, [activeStep])

  return (
    <div className="absolute inset-0 bg-[#06090f] overflow-hidden flex flex-col">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-violet/[0.07] blur-[60px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col h-full p-4 gap-3">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">GeoFace Verification</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 tracking-wide">SECURE</span>
        </div>

        {/* ── Step Pipeline ─────────────────────────────────────────── */}
        <div className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3">
          <div className="flex items-start">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const done = activeStep > i
              const active = activeStep === i
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1 min-w-[52px]">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-500 ${
                      done   ? 'bg-emerald-500/20 border-emerald-500/40' :
                      active ? 'bg-violet/20 border-violet/50' :
                               'bg-white/[0.03] border-white/[0.08]'
                    }`}>
                      {done
                        ? <Check size={12} className="text-emerald-400" />
                        : <Icon size={12} className={active ? 'text-violet' : 'text-gray-600'} />
                      }
                    </div>
                    <span className={`text-[8px] font-semibold uppercase tracking-wide text-center leading-tight ${
                      done ? 'text-emerald-400' : active ? 'text-violet' : 'text-gray-600'
                    }`}>{step.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-1 mb-3 bg-white/[0.05] relative overflow-hidden">
                      <motion.div className="absolute inset-0 bg-emerald-500"
                        initial={{ scaleX: 0 }} animate={{ scaleX: done ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ originX: 0 }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* Left: Face biometric + security checks */}
          <div className="flex flex-col gap-2.5 w-[130px] shrink-0">

            {/* Face biometric */}
            <div className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3 flex flex-col items-center gap-1">
              <span className="text-[9px] text-gray-600 uppercase tracking-widest">Biometric</span>
              <FaceBiometric scanY={scanY} />
              <div className="flex items-center gap-1.5">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-violet" />
                <span className="text-[9px] text-violet/80 font-mono">SCANNING</span>
              </div>
            </div>

            {/* Security checks */}
            <div className="flex-1 bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3 flex flex-col gap-0.5">
              <span className="text-[9px] text-gray-600 uppercase tracking-widest mb-1.5">Security</span>
              <AnimatePresence>
                {CHECKS.slice(0, checkCount).map((c, i) => (
                  <motion.div key={c}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-1.5 py-1">
                    <Check size={9} className="text-emerald-400 shrink-0" />
                    <span className="text-[9px] text-gray-400 leading-tight">{c}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Scanner */}
          <div className="flex-1 bg-white/[0.025] border border-white/[0.05] rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden relative">
            {/* Inner glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-cyan/[0.04] blur-2xl" />
            </div>
            <CentralScanner />
            <div className="flex flex-col items-center gap-0.5 z-10">
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">Location Verified</span>
              <span className="text-[9px] text-gray-500 text-center leading-tight">Device matches identity profile</span>
            </div>
          </div>

          {/* Right: Live signal */}
          <div className="w-[112px] shrink-0 bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3 flex flex-col gap-1.5">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Live Signal</span>
            {SIGNALS.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5 py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-[8px] text-gray-600 uppercase tracking-wider leading-none">{label}</span>
                <span className={`text-xs font-bold font-mono ${
                  value === 'Low' ? 'text-emerald-400' :
                  value.includes('%') ? 'text-cyan' : 'text-white'
                }`}>{value}</span>
              </div>
            ))}
            {/* Animated risk indicator */}
            <div className="mt-auto pt-2">
              <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }} animate={{ width: '15%' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }} />
              </div>
              <span className="text-[8px] text-gray-600 mt-0.5 block">Risk: Low</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default GeoFaceAIEngine
