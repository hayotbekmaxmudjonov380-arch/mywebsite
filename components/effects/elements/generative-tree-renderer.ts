// Canvas 2D Generative Tree Renderer
// Painterly generative tree with wind interaction

export interface GenerativeTreeConfig {
  speed: number;
  size: number;
  particles: number;
  opacity: number;
  palette: string[];
  wind: number;
}

interface Branch {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  depth: number;
  children: Branch[];
  swayOffset: number;
  swaySpeed: number;
}

interface Leaf {
  x: number;
  y: number;
  size: number;
  angle: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  opacity: number;
}

export class GenerativeTreeRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: GenerativeTreeConfig;
  private animationId: number = 0;
  private startTime: number = 0;
  private tree: Branch | null = null;
  private leaves: Leaf[] = [];
  private particles: Particle[] = [];
  private wind = 0;
  private windTarget = 0;
  private pointer = { x: 0.5, y: 0.5, active: 0 };
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, config: GenerativeTreeConfig) {
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
    this.generateTree();
  }

  private generateTree() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    this.tree = this.createBranch(
      w * 0.5,
      h * 0.85,
      -Math.PI / 2,
      h * 0.25 * this.config.size,
      8,
      0
    );
    
    this.leaves = [];
    this.collectLeaves(this.tree);
  }

  private createBranch(
    x: number,
    y: number,
    angle: number,
    length: number,
    width: number,
    depth: number
  ): Branch {
    const branch: Branch = {
      x,
      y,
      angle,
      length,
      width,
      depth,
      children: [],
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1.5,
    };

    if (depth < 8 && length > 5) {
      const numChildren = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < numChildren; i++) {
        const childAngle = angle + (Math.random() - 0.5) * 0.8;
        const childLength = length * (0.65 + Math.random() * 0.2);
        const childWidth = width * 0.7;
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        branch.children.push(
          this.createBranch(endX, endY, childAngle, childLength, childWidth, depth + 1)
        );
      }
    }

    return branch;
  }

  private collectLeaves(branch: Branch) {
    if (branch.depth >= 5 && branch.children.length === 0) {
      const numLeaves = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < numLeaves; i++) {
        this.leaves.push({
          x: branch.x + (Math.random() - 0.5) * 20,
          y: branch.y + (Math.random() - 0.5) * 20,
          size: 3 + Math.random() * 6,
          angle: Math.random() * Math.PI * 2,
          color: this.config.palette[Math.floor(Math.random() * this.config.palette.length)],
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: 1 + Math.random() * 2,
          opacity: 0.6 + Math.random() * 0.4,
        });
      }
    }
    branch.children.forEach(child => this.collectLeaves(child));
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
      this.generateTree();
    }
  }

  setPointer(x: number, y: number, active: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = active;
  }

  updateConfig(config: Partial<GenerativeTreeConfig>) {
    this.config = { ...this.config, ...config };
  }

  private drawBranch(branch: Branch, t: number) {
    const ctx = this.ctx!;
    const sway = Math.sin(t * branch.swaySpeed + branch.swayOffset) * 0.05;
    const windSway = this.wind * 0.03 * (branch.depth + 1);
    const totalSway = sway + windSway;

    const endX = branch.x + Math.cos(branch.angle + totalSway) * branch.length;
    const endY = branch.y + Math.sin(branch.angle + totalSway) * branch.length;

    ctx.beginPath();
    ctx.moveTo(branch.x, branch.y);
    
    // Curved branch
    const cpX = (branch.x + endX) / 2 + Math.cos(branch.angle + totalSway + Math.PI / 2) * branch.length * 0.1;
    const cpY = (branch.y + endY) / 2 + Math.sin(branch.angle + totalSway + Math.PI / 2) * branch.length * 0.1;
    ctx.quadraticCurveTo(cpX, cpY, endX, endY);

    const alpha = 1 - branch.depth * 0.08;
    ctx.strokeStyle = `rgba(80, 60, 40, ${alpha})`;
    ctx.lineWidth = branch.width;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw children with updated positions
    branch.children.forEach(child => {
      const updatedChild = { ...child, x: endX, y: endY };
      this.drawBranch(updatedChild, t);
    });
  }

  private drawLeaves(t: number) {
    const ctx = this.ctx!;
    
    this.leaves.forEach(leaf => {
      const sway = Math.sin(t * leaf.swaySpeed + leaf.swayOffset) * 0.1;
      const windSway = this.wind * 0.02;
      
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle + sway + windSway);
      
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.size, leaf.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = leaf.opacity * this.config.opacity;
      ctx.fill();
      
      ctx.restore();
    });
  }

  private updateParticles(t: number, dt: number) {
    // Spawn particles
    if (Math.random() < 0.1 * this.config.particles) {
      this.particles.push({
        x: this.canvas.width * 0.3 + Math.random() * this.canvas.width * 0.4,
        y: this.canvas.height * 0.3 + Math.random() * this.canvas.height * 0.3,
        vx: (Math.random() - 0.5) * 2 + this.wind * 0.5,
        vy: -1 - Math.random() * 2,
        size: 2 + Math.random() * 4,
        color: this.config.palette[Math.floor(Math.random() * this.config.palette.length)],
        life: 0,
        maxLife: 2 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    // Update particles
    this.particles = this.particles.filter(p => {
      p.life += dt;
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.vx *= 0.99;
      p.vy *= 0.99;
      return p.life < p.maxLife;
    });
  }

  private drawParticles() {
    const ctx = this.ctx!;
    
    this.particles.forEach(p => {
      const alpha = (1 - p.life / p.maxLife) * p.opacity * this.config.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  draw() {
    if (this.disposed || !this.ctx) return;
    
    const ctx = this.ctx;
    const t = (performance.now() - this.startTime) / 1000;
    const dt = 1 / 60;

    // Clear
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Wind
    this.wind += (this.windTarget - this.wind) * 0.02;
    this.windTarget *= 0.98;
    
    // Pointer influence on wind
    if (this.pointer.active) {
      this.windTarget += (this.pointer.x - 0.5) * 2;
    }

    // Draw tree
    if (this.tree) {
      this.drawBranch(this.tree, t);
    }

    // Draw leaves
    this.drawLeaves(t);

    // Update and draw particles
    this.updateParticles(t, dt);
    this.drawParticles();
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
    this.tree = null;
    this.leaves = [];
    this.particles = [];
  }
}
