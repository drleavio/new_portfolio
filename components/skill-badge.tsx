"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-background border rounded-lg p-3 text-center shadow-sm hover:border-primary/50 transition-colors"
    >
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  )
}
