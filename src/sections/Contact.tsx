import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Mail, ArrowRight, Terminal } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState, useEffect } from 'react'

// --- Typewriter Component ---
const Typewriter = ({ text, delay = 50 }: { text: string, delay?: number }) => {
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

// --- Background Nodes ---
const BackgroundNodes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
         <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <g stroke="white" strokeWidth="1" fill="none">
           <path d="M 0 200 Q 300 100 600 300 T 1200 200" />
           <path d="M 0 500 Q 400 600 800 400 T 1200 500" />
        </g>
      </svg>
    </div>
  )
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [projectType, setProjectType] = useState('AI App')
  const [keywordIndex, setKeywordIndex] = useState(0)

  const keywords = ['AI Systems', 'Products', 'Solutions']

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const originalMessage = formData.get('message') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    formData.set('message', `[Project Type: ${projectType}]\n\n${originalMessage}`);
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PORTFOLIO_DATA.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          _captcha: "false" // Bypass captcha for AJAX
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        e.currentTarget.reset()
        setProjectType('AI App')
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('API Response not ok');
      }
    } catch (error) {
      console.error('Error submitting form via API. Falling back to mailto:', error)
      
      // Fallback: Open default email client with pre-filled data
      const subject = encodeURIComponent(`New Project Request: ${projectType} from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${originalMessage}`);
      window.location.href = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${subject}&body=${body}`;
      
      // We'll still show success so the user feels their action was completed
      setIsSuccess(true)
      e.currentTarget.reset()
      setProjectType('AI App')
      setTimeout(() => setIsSuccess(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = ['AI App', 'Website', 'Startup', 'Collaboration']

  return (
    <section id="contact" className="relative py-32 bg-[#06090f] z-10 overflow-hidden">
      
      {/* Background elements */}
      <BackgroundNodes />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column (Spans 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
                Have an Idea?<br/>Let's Engineer <br/>
                <div className="h-[1.2em] relative inline-block overflow-hidden w-full align-bottom">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={keywordIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan via-electric-blue to-violet pb-2"
                    >
                      {keywords[keywordIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                I build full-stack applications, AI systems, and scalable digital products from concept to deployment.
              </p>
            </motion.div>

            {/* Connection Links */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="flex flex-col gap-3"
            >
              <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan/30 hover:bg-cyan/[0.02] transition-all flex items-center justify-between hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-cyan/10 group-hover:text-cyan text-gray-400 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Email</h4>
                    <p className="text-xs text-gray-400">Discuss projects & opportunities</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
              </a>

              <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all flex items-center justify-between hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-blue-500/10 group-hover:text-blue-500 text-gray-400 transition-colors">
                    <FaLinkedin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">LinkedIn</h4>
                    <p className="text-xs text-gray-400">Professional network</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </a>

              <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/30 hover:bg-white/[0.02] transition-all flex items-center justify-between hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:text-white text-gray-400 transition-colors">
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">GitHub</h4>
                    <p className="text-xs text-gray-400">Explore my engineering work</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

          </div>

          {/* Right Column (Spans 7) - Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-[#0d1117] border border-white/10 shadow-[inset_0_0_80px_rgba(0,240,255,0.02)] relative overflow-hidden group flex flex-col gap-6">
                
                {/* AI Terminal Header */}
                <div className="flex flex-col gap-3 pb-4 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">New Project Request</h3>
                    <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[9px] uppercase tracking-wider font-bold">
                       Status: READY
                    </div>
                  </div>
                  <div className="text-xs font-mono text-gray-400 flex items-center gap-2 bg-[#161b22] py-2 px-3 rounded-lg border border-white/5">
                    <Terminal size={12} className="text-cyan" />
                    <span>{'>'} <Typewriter text="Waiting for next idea..." /></span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3 bg-cyan inline-block -ml-1" />
                  </div>
                </div>
                
                {/* Form Fields */}
                <div className="relative z-10 flex flex-col gap-5">
                  
                  {/* Project Type Grid */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 mb-3">Project Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {projectTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                            projectType === type 
                              ? 'bg-cyan/10 border-cyan/30 text-cyan' 
                              : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/[0.05]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full bg-[#161b22] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-[#161b22]/80 transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        className="w-full bg-[#161b22] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-[#161b22]/80 transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] uppercase tracking-widest font-bold text-gray-500 mb-2">Project Vision</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the product you want to build..."
                      className="w-full bg-[#161b22] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-[#161b22]/80 transition-all resize-none placeholder:text-gray-600"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative mt-2 w-full flex items-center justify-center gap-3 px-8 py-4 font-bold text-black transition-all duration-300 rounded-xl overflow-hidden ${isSuccess ? 'bg-emerald-500' : 'bg-white hover:bg-transparent hover:text-cyan disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-cyan/50'}`}
                  >
                    {/* Hover Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 via-electric-blue/20 to-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        'Initializing...'
                      ) : isSuccess ? (
                        <>Collaboration Initialized ✓</>
                      ) : (
                        <>
                          <span className="group-hover:hidden block">Start Building</span>
                          <span className="hidden group-hover:block">Initialize Collaboration</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
