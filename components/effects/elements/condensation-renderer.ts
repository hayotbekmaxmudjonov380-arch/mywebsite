// Canvas 2D Condensation Renderer
// Transparent water droplets on glass effect

export interface CondensationConfig {
  speed: number;
  drops: number;
  opacity: number;
}

interface Droplet {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  trail: { x: number; y: number }[];
  maxTrailLength: number;
  wobble: number;
  wobbleSpeed: number;
}

export class CondensationRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: CondensationConfig;
  private animationId: number = 0;
  private startTime: number = 0;
  private droplets: Droplet[] = [];
  private pointer = { x: 0.5, y: 0.5, active: 0 };
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, config: CondensationConfig) {
    this.canvas = canvas;
    this.config = config;
    this.init();
  }

  private init() {
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      console.error('Canvas 2D not supported');
      return;
    }
    this.startTime = performance.now();
    this.createDroplets();
  }

  private createDroplets() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const count = Math.floor(this.config.drops * 50);

    this.droplets = [];
    for (let i = 0; i < count; i++) {
      this.droplets.push(this.createDroplet(w, h, true));
    }
  }

  private createDroplet(w: number, h: number, randomY = false): Droplet {
    const radius = 2 + Math.random() * 6;
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -radius * 2,
      radius,
      speed: 0.2 + Math.random() * 0.8,
      opacity: 0.1 + Math.random() * 0.3,
      trail: [],
      maxTrailLength: 10 + Math.floor(Math.random() * 20),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.5 + Math.random() * 1.5,
    };
  }

  resize() {
    if (this.disposed) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const cw = Math.floor(w * dpr);
    const ch = Math.floor(h * dpr);
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw;
      this.canvas.height = ch;
      this.createDroplets();
    }
  }

  setPointer(x: number, y: number, active: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = active;
  }

  updateConfig(config: Partial<CondensationConfig>) {
    this.config = { ...this.config, ...config };
  }

  private updateDroplet(droplet: Droplet, t: number, dt: number) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Wobble
    droplet.wobble += droplet.wobbleSpeed * dt;
    const wobbleX = Math.sin(droplet.wobble) * 0.5;

    // Gravity
    droplet.y += droplet.speed * this.config.speed * dt * 60;

    // Pointer influence
    if (this.pointer.active) {
      const ptrX = this.pointer.x * w;
      const ptrY = this.pointer.y * h;
      const dx = droplet.x - ptrX;
      const dy = droplet.y - ptrY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (1 - dist / 100) * 2;
        droplet.x += (dx / dist) * force;
        droplet.y += (dy / dist) * force * 0.5;
      }
    }

    // Move horizontally with wobble
    droplet.x += wobbleX * this.config.speed;

    // Trail
    droplet.trail.push({ x: droplet.x, y: droplet.y });
    if (droplet.trail.length > droplet.maxTrailLength) {
      droplet.trail.shift();
    }

    // Reset if off screen
    if (droplet.y > h + droplet.radius * 2) {
      Object.assign(droplet, this.createDroplet(w, h, false));
    }

    // Wrap horizontally
    if (droplet.x < -droplet.radius) droplet.x = w + droplet.radius;
    if (droplet.x > w + droplet.radius) droplet.x = -droplet.radius;
  }

  private drawDroplet(droplet: Droplet) {
    const ctx = this.ctx!;
    
    // Draw trail
    if (droplet.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(droplet.trail[0].x, droplet.trail[0].y);
      for (let i = 1; i < droplet.trail.length; i++) {
        ctx.lineTo(droplet.trail[i].x, droplet.trail[i].y);
      }
      ctx.strokeStyle = `rgba(200, 220, 240, ${droplet.opacity * 0.3 * this.config.opacity})`;
      ctx.lineWidth = droplet.radius * 0.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Draw droplet
    ctx.beginPath();
    ctx.arc(droplet.x, droplet.y, droplet.radius, 0, Math.PI * 2);
    
    // Glass-like gradient
    const gradient = ctx.createRadialGradient(
      droplet.x - droplet.radius * 0.3,
      droplet.y - droplet.radius * 0.3,
      0,
      droplet.x,
      droplet.y,
      droplet.radius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${droplet.opacity * 0.6 * this.config.opacity})`);
    gradient.addColorStop(0.5, `rgba(200, 220, 240, ${droplet.opacity * 0.4 * this.config.opacity})`);
    gradient.addColorStop(1, `rgba(150, 180, 210, ${droplet.opacity * 0.2 * this.config.opacity})`);
    
    ctx.fillStyle = gradient;
    ctx.fill();

    // Highlight
    ctx.beginPath();
    ctx.arc(
      droplet.x - droplet.radius * 0.2,
      droplet.y - droplet.radius * 0.2,
      droplet.radius * 0.3,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${droplet.opacity * 0.5 * this.config.opacity})`;
    ctx.fill();
  }

  draw() {
    if (this.disposed || !this.ctx) return;
    
    const ctx = this.ctx;
    const t = (performance.now() - this.startTime) / 1000;
    const dt = 1 / 60;

    // Clear
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw droplets
    this.droplets.forEach(droplet => {
      this.updateDroplet(droplet, t, dt);
      this.drawDroplet(droplet);
    });
  }

  start() {
    const loop = () => {
      if (this.disposed) return;
      this.resize();
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.droplets = [];
  }
}
