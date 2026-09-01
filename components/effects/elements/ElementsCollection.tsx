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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!mounted || !canvasRef.current) return;

    // Check WebGL2 support first
    const testCanvas = document.createElement('canvas');
    const testGl = testCanvas.getContext('webgl2');
    if (!testGl) {
      console.warn('WebGL2 not supported, skipping elemental marks');
      return;
    }

    // Ensure canvas has valid dimensions
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(Math.floor(rect.width * dpr), 100);
      canvas.height = Math.max(Math.floor(rect.height * dpr), 100);
    }

    const config: ElementalMarksConfig = {
      variant,
      speed,
      particleAmount,
      opacity,
    };

    const renderer = new ElementalMarksRenderer(canvas, config);
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [mounted, variant]);

  useEffect(() => {
    rendererRef.current?.updateConfig({ speed, particleAmount, opacity });
  }, [speed, particleAmount, opacity]);

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={`elements-collection ${className}`}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0a0a1a', ...style }}
      />
    );
  }

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
