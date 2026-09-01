'use client'

import React, { useRef, useEffect, useCallback } from 'react';
import { GenerativeTreeRenderer, GenerativeTreeConfig } from './generative-tree-renderer';

interface GenerativeTreeProps {
  speed?: number;
  size?: number;
  particles?: number;
  opacity?: number;
  palette?: string[];
  wind?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_PALETTE = [
  '#4a7c59', '#5a8c69', '#6a9c79', '#7aac89', '#8abc99',
  '#3a6c49', '#2a5c39', '#6ab07a', '#8ac09a', '#a0d0a0',
];

export function GenerativeTree({
  speed = 1.0,
  size = 1.0,
  particles = 1.0,
  opacity = 1.0,
  palette = DEFAULT_PALETTE,
  wind = 0,
  className = '',
  style,
}: GenerativeTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GenerativeTreeRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current || !rendererRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rendererRef.current.setPointer(x, y, 1);
  }, []);

  const handlePointerLeave = useCallback(() => {
    rendererRef.current?.setPointer(0.5, 0.5, 0);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config: GenerativeTreeConfig = {
      speed,
      size,
      particles,
      opacity,
      palette,
      wind,
    };

    const renderer = new GenerativeTreeRenderer(canvasRef.current, config);
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.updateConfig({ speed, size, particles, opacity, palette, wind });
  }, [speed, size, particles, opacity, palette, wind]);

  return (
    <div
      ref={containerRef}
      className={`generative-tree ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
