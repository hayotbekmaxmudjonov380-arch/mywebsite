'use client'

import React, { useState, useCallback } from 'react';
import { ElementsCollection, ElementVariant } from './ElementsCollection';
import { GenerativeTree } from './GenerativeTree';
import { CondensationBackground } from './CondensationBackground';

type FamilyVariant = ElementVariant | 'condensation' | 'generative-tree';

interface ElementsBackgroundProps {
  variant?: FamilyVariant;
  speed?: number;
  size?: number;
  particleAmount?: number;
  particles?: number;
  opacity?: number;
  drops?: number;
  palette?: string[];
  wind?: number;
  showControls?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANT_LABELS: Record<FamilyVariant, string> = {
  water: 'Water',
  lightning: 'Lightning',
  fire: 'Fire',
  condensation: 'Condensation',
  'generative-tree': 'Generative Tree',
};

export function ElementsBackground({
  variant = 'water',
  speed = 1.0,
  size = 1.0,
  particleAmount = 1.0,
  particles = 1.0,
  opacity = 1.0,
  drops = 1.0,
  palette,
  wind = 0,
  showControls = false,
  className = '',
  style,
}: ElementsBackgroundProps) {
  const [currentVariant, setCurrentVariant] = useState<FamilyVariant>(variant);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [currentSize, setCurrentSize] = useState(size);
  const [currentParticles, setCurrentParticles] = useState(particleAmount);
  const [currentOpacity, setCurrentOpacity] = useState(opacity);
  const [currentDrops, setCurrentDrops] = useState(drops);
  const [currentWind, setCurrentWind] = useState(wind);

  const handleVariantChange = useCallback((newVariant: FamilyVariant) => {
    setCurrentVariant(newVariant);
  }, []);

  const renderVariant = () => {
    switch (currentVariant) {
      case 'water':
      case 'lightning':
      case 'fire':
        return (
          <ElementsCollection
            variant={currentVariant}
            speed={currentSpeed}
            particleAmount={currentParticles}
            opacity={currentOpacity}
          />
        );
      case 'condensation':
        return (
          <CondensationBackground
            speed={currentSpeed}
            drops={currentDrops}
            opacity={currentOpacity}
          />
        );
      case 'generative-tree':
        return (
          <GenerativeTree
            speed={currentSpeed}
            size={currentSize}
            particles={currentParticles}
            opacity={currentOpacity}
            palette={palette}
            wind={currentWind}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`elements-background ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
    >
      {renderVariant()}

      {showControls && (
        <div className="elements-controls" style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 12,
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 8,
          color: 'white',
          fontSize: 12,
        }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(Object.keys(VARIANT_LABELS) as FamilyVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => handleVariantChange(v)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: 'none',
                  background: currentVariant === v ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                {VARIANT_LABELS[v]}
              </button>
            ))}
          </div>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Speed
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={currentSpeed}
              onChange={(e) => setCurrentSpeed(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Opacity
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentOpacity}
              onChange={(e) => setCurrentOpacity(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
