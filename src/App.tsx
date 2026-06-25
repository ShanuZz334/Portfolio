import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

import AILab from './sections/AILab'
import GithubActivity from './sections/GithubActivity'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/10 border-t-electric-blue rounded-full animate-spin"></div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan"
              >
                MS
              </motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 text-sm text-gray-400 tracking-[0.2em] uppercase"
            >
              Initializing Systems
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full overflow-hidden"
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />

              <AILab />
              <GithubActivity />
              <Contact />
            </main>
            
            <footer className="py-8 text-center border-t border-white/5 bg-dark-bg">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Muhammed Shanif. Engineered for the future.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
