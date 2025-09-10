import React from 'react'
import { motion } from 'framer-motion'

export default function AbstractBackground() {
  return (
    <div className="bg-abstract">
      {/* 主背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      
      {/* 3D抽象形状 */}
      <motion.div
        className="bg-abstract__shape bg-abstract__shape--1"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="bg-abstract__shape bg-abstract__shape--2"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          rotate: [0, -120, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="bg-abstract__shape bg-abstract__shape--3"
        animate={{
          x: [0, 60, 0],
          y: [0, -50, 0],
          rotate: [0, 240, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />
      
      {/* 网格背景 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* 微妙的粒子效果 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-teal-300/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
