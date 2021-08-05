import { motion, AnimatePresence } from "framer-motion"

export const AnimatedHomeGif = ({ children, isLoaded }) => {
  const variants = {
    hidden: { scale: 0, rotate: 360 },
    visible: { scale: 1, rotate: 0 },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedError = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedMobileMenu = ({ children, className, onClickHandler }) => {
  const variants = {
    hide: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    transition: { type: "ease" },
  }

  return (
    <motion.div
      className={className}
      key="mobileMenu"
      initial="hide"
      animate="visible"
      exit="hide"
      transition="transition"
      variants={variants}
      onClick={onClickHandler}
    >
      {children}
    </motion.div>
  )
}

export const AnimateUnmounting = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}

export const AnimateGifPanel = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  )
}

export const AnimateGifButton = ({ children, className }) => {
  return (
    <motion.a
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.2, rotate: 360 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export const AnimateLoader = ({ children }) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 720 }}
      transition={{
        type: "spring",
        repeat: Infinity,
        duration: 2,
        bounce: 0.15,
      }}
    >
      {children}
    </motion.div>
  )
}

export const AnimateAutocomplete = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ height: 0 }}
      animate={{ height: 250 }}
    >
      {children}
    </motion.div>
  )
}
