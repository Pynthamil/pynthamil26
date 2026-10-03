"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";

interface CanvasItem {
  id: string;
  image: string;
  rotation: number;
  x: number;
  y: number;
  width?: string;
  aspect?: string;
}

const canvasItems: CanvasItem[] = [
  // Left side: img2 and img4 from photo-dump
  {
    id: "photo-img2",
    image: "/photo-dump/img2.JPG",
    rotation: 0,
    x: -420,
    y: -80,
    width: "w-44 sm:w-52",
    aspect: "aspect-[3/4]",
  },
  {
    id: "photo-img4",
    image: "/photo-dump/img4.jpg",
    rotation: 0,
    x: -300,
    y: 100,
    width: "w-48 sm:w-56",
    aspect: "aspect-[3/4]",
  },

  // Right side: Blog post cover illustrations
  {
    id: "blog-cover-post2",
    image: "/blog-covers/post2.svg",
    rotation: 0,
    x: 200,
    y: -80,
    width: "w-64 sm:w-72",
    aspect: "aspect-[16/10]",
  },
  {
    id: "blog-cover-intro",
    image: "/blog-covers/post_intro.svg",
    rotation: 0,
    x: 70,
    y: 120,
    width: "w-64 sm:w-72",
    aspect: "aspect-[16/10]",
  },
  {
    id: "blog-cover-post1",
    image: "/blog-covers/post1.svg",
    rotation: 0,
    x: 320,
    y: 130,
    width: "w-64 sm:w-72",
    aspect: "aspect-[16/10]",
  },
];

export function PlaySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center overflow-visible font-sans py-6">
      {/* Interactive Draggable Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[750px] sm:h-[820px] flex items-center justify-center my-auto overflow-visible"
      >
        {canvasItems.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.15}
            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50, cursor: "grabbing" }}
            whileHover={{ scale: 1.03, zIndex: 40 }}
            initial={{ x: item.x, y: item.y, rotate: item.rotation }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute cursor-grab select-none ${item.width || "w-56"}`}
          >
            <img
              src={item.image}
              alt="Play canvas item"
              className={`w-full h-auto object-cover rounded-xl shadow-md pointer-events-none ${item.aspect || ""}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
