import React from 'react'
import { HeroParallax } from '../components/ui/hero-parallax'
import { heroParallaxProducts } from '../data/hero-parallax'

export default function HeroParallaxPage() {
  return (
    <div className="dark:bg-black bg-white">
      <HeroParallax products={heroParallaxProducts} />
    </div>
  )
}
