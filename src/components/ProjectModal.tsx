import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GenericView } from './projectViews/GenericView'
import { StockyView } from './projectViews/StockyView'
import { GeoFaceView } from './projectViews/GeoFaceView'

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [isPaused, setIsPaused] = useState(false)

  // Manage body scroll and hide navbar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.style.overflow = 'auto'
      document.documentElement.classList.remove('modal-open')
    }
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto overflow-x-hidden"
        >
          {/* Global Premium Back Button */}
          <div className="fixed top-6 left-4 md:left-8 z-[110]">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-cyan-500/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:bg-white/10 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:-translate-x-1"
            >
              <ArrowLeft size={16} className="text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Back to Portfolio</span>
            </button>
          </div>

          {/* Conditional Rendering based on project ID */}
          {project.id === 'stocky' ? (
            <StockyView project={project} />
          ) : project.id === 'geoface' ? (
            <GeoFaceView project={project} />
          ) : (
            <GenericView project={project} isPaused={isPaused} setIsPaused={setIsPaused} />
          )}

        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use createPortal to mount the modal at the document.body level
  // This completely bypasses any parent stacking context (z-index) issues.
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}

export default ProjectModal
