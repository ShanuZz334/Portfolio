import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Download, ArrowRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1))
        if (currentText === text) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, texts])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan min-h-[40px] inline-block">
      {currentText}
      <span className="animate-pulse text-electric-blue">|</span>
    </span>
  )
}

const Hero = () => {
  const { name, subtitle, roles, badge } = PORTFOLIO_DATA.hero

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-dark-bg flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[2, 0, -5]}>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color="#00f0ff" wireframe />
            </mesh>
          </Float>
          <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={[-3, 1, -8]}>
              <icosahedronGeometry args={[1.5, 0]} />
              <meshBasicMaterial color="#8a2be2" wireframe />
            </mesh>
          </Float>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl pt-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 mb-6 border rounded-full glass border-electric-blue/30"
          >
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">{badge}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Hi, I'm <br />
            <span className="text-white">{name}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl md:text-4xl font-semibold mb-6 h-[40px]"
          >
            <Typewriter texts={roles} />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href={PORTFOLIO_DATA.projects.find(p => p.id === 'stocky')?.liveLink || '#projects'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 font-semibold text-black transition-all rounded-lg bg-electric-blue hover:bg-cyan hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              View Projects <ArrowRight size={20} />
            </a>
            <a href="/resume.pdf" download="Muhammed_Shanif_Resume.pdf" target="_blank" className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all border rounded-lg border-white/20 glass hover:bg-white/10 hover:scale-105">
              <Download size={20} /> Resume
            </a>
            <div className="flex items-center gap-4 ml-4">
              <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="p-3 transition-colors rounded-full glass hover:bg-white/10 hover:text-electric-blue">
                <FaGithub size={24} />
              </a>
              <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="p-3 transition-colors rounded-full glass hover:bg-white/10 hover:text-electric-blue">
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Gradient glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-10 pointer-events-none" />
    </section>
  )
}

export default Hero
