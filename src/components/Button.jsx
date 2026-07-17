import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { playSound } from '../utils/audio'

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const { isMuted } = useStore()
  
  const baseStyle = "w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center transition-colors"
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    accent: "bg-accent hover:bg-accent-hover text-white",
    danger: "bg-danger hover:bg-danger-hover text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    dark: "bg-dark-card hover:bg-dark-border text-white",
  }

  const handleClick = (e) => {
    playSound('click', isMuted)
    if (onClick) onClick(e)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
