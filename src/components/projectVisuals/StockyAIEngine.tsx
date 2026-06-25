import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

// ─── Live ticking value hook ──────────────────────────────────────────────────
const useTickingValue = (base: number, variance: number) => {
  const [value, setValue] = useState(base)
  const [up, setUp] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      const delta = (Math.random() - 0.48) * variance
      setUp(delta >= 0)
      setValue(p => p + delta)
    }, 2400)
    return () => clearInterval(t)
  }, [variance])
  return { value, up }
}

// ─── Tiny sparkline ───────────────────────────────────────────────────────────
const Sparkline = ({ up }: { up: boolean }) => {
  const [pts, setPts] = useState(() => Array.from({ length: 16 }, () => 30 + Math.random() * 40))
  useEffect(() => {
    const t = setInterval(() => setPts(p => [...p.slice(1), 30 + Math.random() * 40]), 1800)
    return () => clearInterval(t)
  }, [])
  const max = Math.max(...pts), min = Math.min(...pts)
  const norm = (v: number) => 100 - ((v - min) / (max - min + 1)) * 100
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${norm(v)}`).join(' ')
  const color = up ? '#10b981' : '#ef4444'
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-14 h-6">
      <polyline points={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  )
}

// ─── Market row card ──────────────────────────────────────────────────────────
const MarketRow = ({ symbol, base, variance, decimals = 2 }: { symbol: string; base: number; variance: number; decimals?: number }) => {
  const { value, up } = useTickingValue(base, variance)
  const pct = ((value - base) / base * 100)
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">{symbol}</span>
        <span className="text-sm font-mono font-bold text-white">{value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
      </div>
      <div className="flex items-center gap-3">
        <Sparkline up={up} />
        <span className={`flex items-center gap-0.5 text-[11px] font-mono font-semibold min-w-[52px] justify-end ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {up ? '+' : ''}{pct.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

// ─── AI Score ring ────────────────────────────────────────────────────────────
const SCORE = 87
const R = 52
const CIRC = 2 * Math.PI * R

const ScoreRing = () => (
  <div className="relative flex items-center justify-center">
    {/* Outer scan ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="absolute w-[148px] h-[148px] rounded-full border border-dashed border-white/[0.06]"
    />
    {/* Ambient glow */}
    <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 blur-xl" />

    <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
      {/* Track */}
      <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      {/* Score arc */}
      <motion.circle
        cx="64" cy="64" r={R}
        fill="none"
        stroke="url(#scoreGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC }}
        animate={{ strokeDashoffset: CIRC * (1 - SCORE / 100) }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
      />
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>

    {/* Center text */}
    <div className="absolute flex flex-col items-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-3xl font-black text-white font-mono leading-none"
      >
        {SCORE}
      </motion.span>
      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">/ 100</span>
    </div>
  </div>
)

// ─── Metric pill ──────────────────────────────────────────────────────────────
const MetricPill = ({ label, value, color, delay }: { label: string; value: string; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]"
  >
    <span className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</span>
    <span className={`text-[11px] font-bold ${color}`}>{value}</span>
  </motion.div>
)

// ─── AI terminal log ──────────────────────────────────────────────────────────
const LOG_ITEMS = [
  'Market structure analyzed',
  '200+ indicators processed',
  'Option chain scanned',
  'Sentiment model updated',
]

const AITerminal = ({ bars }: { bars: number[] }) => {
  const [visibleCount, setVisibleCount] = useState(0)
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setVisibleCount(Math.min(i, LOG_ITEMS.length))
      if (i >= LOG_ITEMS.length) clearInterval(t)
    }, 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex gap-4 min-h-0">
      {/* Bar chart */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-end gap-[3px] h-14 px-0.5">
          {bars.map((h, idx) => (
            <motion.div
              key={idx}
              animate={{ height: `${Math.max(h * 100, 6)}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex-1 rounded-[2px]"
              style={{ background: `rgba(16,185,129,${0.18 + h * 0.65})` }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Analysis Stream</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-emerald-400 font-mono tracking-wide">LIVE</span>
          </div>
        </div>
      </div>

      {/* Log */}
      <div className="flex flex-col gap-1.5 justify-center min-w-[148px]">
        <span className="text-[9px] text-gray-600 uppercase tracking-widest mb-0.5">AI Engine Active</span>
        <AnimatePresence>
          {LOG_ITEMS.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1.5"
            >
              <Check size={9} className="text-emerald-400 shrink-0" />
              <span className="text-[10px] text-gray-400 leading-snug">{item}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const BAR_COUNT = 28

const StockyAIEngine = () => {
  const [bars, setBars] = useState(() => Array.from({ length: BAR_COUNT }, () => Math.random()))

  useEffect(() => {
    const t = setInterval(() => setBars(p => [...p.slice(1), Math.random()]), 420)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 bg-[#06090f] overflow-hidden flex flex-col">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/[0.05] blur-[60px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col h-full p-4 gap-3">

        {/* ── Header bar ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Stocky Intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 tracking-wide">LIVE</span>
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────────────── */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* Left: Market feed */}
          <div className="flex-1 bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5 flex flex-col">
            <span className="text-[9px] font-semibold text-gray-600 uppercase tracking-widest mb-2">Market Intelligence</span>
            <div className="flex flex-col flex-1 justify-between">
              <MarketRow symbol="NIFTY 50" base={24105} variance={6} decimals={2} />
              <MarketRow symbol="BANK NIFTY" base={52430} variance={16} decimals={2} />
              <MarketRow symbol="SENSEX" base={79430} variance={22} decimals={2} />
              <MarketRow symbol="INDIA VIX" base={14.20} variance={0.12} decimals={2} />
            </div>
          </div>

          {/* Right: AI Score */}
          <div className="w-[176px] shrink-0 bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5 flex flex-col items-center gap-3">
            <span className="text-[9px] font-semibold text-gray-600 uppercase tracking-widest">AI Score</span>
            <ScoreRing />
            <p className="text-[10px] text-gray-400 text-center leading-tight font-medium">Strong Market<br />Confidence</p>
            <div className="grid grid-cols-2 gap-1.5 w-full">
              <MetricPill label="Trend" value="BULLISH" color="text-emerald-400" delay={1.4} />
              <MetricPill label="Risk" value="LOW" color="text-sky-400" delay={1.5} />
              <MetricPill label="Momentum" value="HIGH" color="text-emerald-400" delay={1.6} />
              <MetricPill label="Volatility" value="STABLE" color="text-yellow-400" delay={1.7} />
            </div>
          </div>

        </div>

        {/* ── Bottom: AI Terminal ─────────────────────────────────────── */}
        <div className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5">
          <AITerminal bars={bars} />
        </div>

      </div>
    </div>
  )
}

export default StockyAIEngine
