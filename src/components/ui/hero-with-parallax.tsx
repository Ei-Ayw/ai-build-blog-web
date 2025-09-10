"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { heroParallaxProducts } from "../../data/hero-parallax";

export const HeroWithParallax = () => {
  const navigate = useNavigate();
  const firstRow = heroParallaxProducts.slice(0, 5);
  const secondRow = heroParallaxProducts.slice(5, 10);
  const thirdRow = heroParallaxProducts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden antialiased flex flex-col [perspective:1000px] [transform-style:preserve-3d] bg-white dark:bg-black"
    >
      {/* Hero文字内容 - 固定在顶部 */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24">
        <motion.div
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* 主标题 */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-black">Create Perfect Blogs</span>
            <span className="block text-black">In Seconds</span>
          </motion.h1>
          
          {/* 副标题 */}
          <motion.div
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black/80 py-4 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="mb-2 sm:mb-4 font-medium">Describe your ideas, AI generates complete blog content.</p>
            <p className="font-medium">From title to content, from layout to publish, everything happens in seconds.</p>
          </motion.div>
          
          {/* CTA按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/ai-build-blog-web/templates')}
              className="w-full sm:w-auto bg-white text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg transition-all duration-300 hover:bg-white/90 flex items-center justify-center space-x-2"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Browse Templates</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            
            <motion.button
              className="w-full sm:w-auto bg-transparent border-2 border-black text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg transition-all duration-300 hover:bg-black hover:text-white flex items-center justify-center space-x-2"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
          
          {/* 信任指标 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 text-xs sm:text-sm text-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-center">
              <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
              Free to Start
            </div>
            <div className="flex items-center">
              <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
              No Registration
            </div>
            <div className="flex items-center">
              <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
              AI Powered
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 视差背景卡片 */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="absolute inset-0 z-10"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.link.startsWith('/')) {
      navigate(product.link);
    } else {
      window.open(product.link, '_blank');
    }
  };

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <div
        onClick={handleClick}
        className="block group-hover/product:shadow-2xl cursor-pointer"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold">
        {product.title}
      </h2>
    </motion.div>
  );
};
