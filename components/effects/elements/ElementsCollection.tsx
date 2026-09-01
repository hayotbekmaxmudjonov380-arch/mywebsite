'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ElementalMarksRenderer, ElementalMarksConfig } from './elemental-marks-renderer';

export type ElementVariant = 'water' | 'lightning' | 'fire';

interface ElementsCollectionProps {
  variant?: ElementVariant;
  speed?: number;
  particleAmount?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ElementsCollection({
  variant = 'water',
  speed = 1.0,
  particleAmount = 1.0,
  opacity = 1.0,
  className = '',
  style,
}: ElementsCollectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ElementalMarksRenderer | null>(null);
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

    const config: ElementalMarksConfig = {
      variant,
      speed,
      particleAmount,
      opacity,
    };

    const renderer = new ElementalMarksRenderer(canvasRef.current, config);
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [variant]);

  useEffect(() => {
    rendererRef.current?.updateConfig({ speed, particleAmount, opacity });
  }, [speed, particleAmount, opacity]);

  return (
    <div
      ref={containerRef}
      className={`elements-collection ${className}`}
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
