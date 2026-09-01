'use client'

import React, { useRef, useEffect, useCallback } from 'react';
import { CondensationRenderer, CondensationConfig } from './condensation-renderer';

interface CondensationBackgroundProps {
  speed?: number;
  drops?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CondensationBackground({
  speed = 1.0,
  drops = 1.0,
  opacity = 1.0,
  className = '',
  style,
}: CondensationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CondensationRenderer | null>(null);
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

    const config: CondensationConfig = {
      speed,
      drops,
      opacity,
    };

    const renderer = new CondensationRenderer(canvasRef.current, config);
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.updateConfig({ speed, drops, opacity });
  }, [speed, drops, opacity]);

  return (
    <div
      ref={containerRef}
      className={`condensation-background ${className}`}
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
