import { motion } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Terminal, FolderGit2, GraduationCap, Layers, Sparkles, ExternalLink, ChevronRight } from 'lucide-react'

const phaseIcons: Record<string, React.ReactNode> = {
  'Origins':           <Terminal size={20} />,
  'Foundation':        <FolderGit2 size={20} />,
  'Engineering':       <GraduationCap size={20} />,
  'Product Building':  <Layers size={20} />,
  'Startup Innovation':<Sparkles size={20} />,
}

const phaseColors: Record<string, string> = {
  'Origins':           'from-gray-500 to-gray-400',
  'Foundation':        'from-blue-500 to-cyan-400',
  'Engineering':       'from-violet-500 to-purple-400',
  'Product Building':  'from-orange-500 to-amber-400',
  'Startup Innovation':'from-electric-blue to-cyan',
}

const phaseDots: Record<string, string> = {
  'Origins':           'bg-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.6)]',
  'Foundation':        'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]',
  'Engineering':       'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]',
  'Product Building':  'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]',
  'Startup Innovation':'bg-electric-blue shadow-[0_0_20px_rgba(0,240,255,0.8)]',
}

const Journey = () => {
  const { timeline } = PORTFOLIO_DATA.about

  return (
    <section id="journey" className="relative py-28 bg-dark-bg z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-electric-blue/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container px-6 mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-electric-blue font-semibold mb-4">Career Timeline</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            From writing first lines of code to building AI-powered startup products.
          </p>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-electric-blue to-violet mx-auto mt-6"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-electric-blue/60 via-violet/30 to-transparent"></div>

          <div className="flex flex-col gap-12">
            {(timeline as any[]).map((item, index) => {
              const isRight = index % 2 === 0
              const isHighlight = item.highlight

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col md:flex-row ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-6 md:gap-0`}
                >
                  {/* Card Side */}
                  <div className={`w-full md:w-[46%] ${isRight ? 'md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}>
                    <div className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 group
                      ${isHighlight
                        ? 'bg-gradient-to-br from-electric-blue/10 to-violet/10 border-electric-blue/40 shadow-[0_0_40px_rgba(0,240,255,0.1)]'
                        : 'glass border-white/8 hover:border-white/20'
                      }`}
                    >
                      {/* Phase badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`p-2 rounded-lg bg-gradient-to-br ${phaseColors[item.phase] || 'from-gray-500 to-gray-400'} text-black shrink-0`}>
                          {phaseIcons[item.phase]}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${phaseColors[item.phase] || 'from-gray-400 to-gray-300'} bg-clip-text text-transparent`}>
                          {item.phase}
                        </span>
                        {isHighlight && (
                          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black bg-electric-blue rounded-full animate-pulse">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Year */}
                      <p className="text-xs font-mono text-cyan mb-2">{item.year}</p>

                      {/* Title */}
                      <h3 className={`font-bold mb-3 leading-snug ${isHighlight ? 'text-2xl text-white' : 'text-xl text-white'}`}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

                      {/* University badge */}
                      {item.badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet/10 border border-violet/30 rounded-lg text-xs text-violet font-medium mb-4">
                          <GraduationCap size={13} /> {item.badge}
                        </div>
                      )}

                      {/* Small projects list */}
                      {item.projects && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Projects Built</p>
                          <div className="flex flex-wrap gap-2">
                            {item.projects.map((p: string, i: number) => (
                              <span key={i} className="flex items-center gap-1 text-xs text-gray-300 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                                <ChevronRight size={10} className="text-cyan" /> {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag: string, i: number) => (
                            <span key={i} className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md
                              ${isHighlight ? 'text-electric-blue bg-electric-blue/10 border border-electric-blue/20' : 'text-gray-400 bg-white/5 border border-white/8'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Products (for 2025-Present) */}
                      {item.products && (
                        <div className="mt-6 flex flex-col gap-4">
                          {item.products.map((product: any, pi: number) => (
                            <div key={pi} className="rounded-xl border border-white/10 bg-white/3 p-5 hover:border-electric-blue/30 transition-colors group/card">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-white font-bold text-base">{product.name}</h4>
                                  <p className="text-[11px] text-cyan font-mono mt-0.5">{product.status}</p>
                                </div>
                                {product.liveLink && (
                                  <a href={product.liveLink} target="_blank" rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-electric-blue/10 text-electric-blue hover:bg-electric-blue hover:text-black transition-all"
                                  >
                                    <ExternalLink size={14} />
                                  </a>
                                )}
                              </div>
                              <p className="text-gray-400 text-xs leading-relaxed mb-3">{product.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {product.features.map((f: string, fi: number) => (
                                  <span key={fi} className="text-[10px] text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center connector / dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center z-10">
                    <div className={`w-5 h-5 rounded-full border-2 border-dark-bg ${phaseDots[item.phase] || 'bg-gray-400'} ${isHighlight ? 'w-6 h-6' : ''}`}></div>
                  </div>

                  {/* Empty opposite side (desktop) */}
                  <div className="hidden md:block md:w-[46%]"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm mb-2">The story is still being written.</p>
          <p className="text-2xl font-bold text-white">Next chapter: <span className="text-electric-blue">Global Impact</span></p>
        </motion.div>

      </div>
    </section>
  )
}

export default Journey
