import { motion, useReducedMotion } from "framer-motion"
import { useEffect } from "react"

const IntroAnimation = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(
      onComplete,
      prefersReducedMotion ? 100 : 1800,
    )

    return () => window.clearTimeout(timer)
  }, [onComplete, prefersReducedMotion])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.45,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#002e5d] px-6"
      role="status"
      aria-live="polite"
      aria-label="Loading Shashank Punna's portfolio"
    >
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.18, 1],
                opacity: [0.35, 0.7, 0.35],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-[130px]"
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.42em] text-cyan-200/80 sm:text-xs"
        >
          Portfolio
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 72 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl"
          >
            SHASHANK PUNNA<span className="text-cyan-300">.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-7 h-px w-32 origin-left bg-gradient-to-r from-cyan-300 via-white/80 to-violet-400"
        />
      </div>
    </motion.div>
  )
}

export default IntroAnimation