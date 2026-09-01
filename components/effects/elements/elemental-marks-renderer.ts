// Raw WebGL2 Elemental Marks Renderer
// Water, Lightning, Fire effects using GLSL shaders

export interface ElementalMarksConfig {
  variant: 'water' | 'lightning' | 'fire';
  speed: number;
  particleAmount: number;
  opacity: number;
  palette?: string[];
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADERS: Record<string, string> = {
  water: `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform float u_time;
uniform float u_speed;
uniform float u_particles;
uniform float u_opacity;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_active;

// Simplex noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed;
  
  // Water ripples
  float d = length(uv - vec2(0.5));
  float ripple = sin(d * 20.0 - t * 2.0) * 0.5 + 0.5;
  ripple *= smoothstep(0.8, 0.0, d);
  
  // Flow noise
  float n1 = snoise(uv * 3.0 + vec2(t * 0.3, t * 0.1));
  float n2 = snoise(uv * 6.0 + vec2(-t * 0.2, t * 0.4));
  float n3 = snoise(uv * 12.0 + vec2(t * 0.1, -t * 0.3));
  
  float flow = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  flow = flow * 0.5 + 0.5;
  
  // Combine
  float water = ripple * 0.4 + flow * 0.6;
  
  // Pointer influence
  float ptrDist = length(uv - u_pointer);
  float ptrInfluence = smoothstep(0.3, 0.0, ptrDist) * u_pointer_active;
  water += ptrInfluence * 0.3;
  
  // Color palette - deep blue water
  vec3 col1 = vec3(0.05, 0.15, 0.35);
  vec3 col2 = vec3(0.1, 0.4, 0.7);
  vec3 col3 = vec3(0.3, 0.7, 0.9);
  vec3 color = mix(col1, col2, water);
  color = mix(color, col3, water * water * 0.5);
  
  // Particles
  float particles = 0.0;
  for (float i = 0.0; i < 8.0; i++) {
    vec2 puv = uv + vec2(sin(t * 0.5 + i * 1.7) * 0.3, cos(t * 0.3 + i * 2.1) * 0.3);
    float p = smoothstep(0.02, 0.0, length(puv - vec2(0.5)) - 0.1);
    particles += p * u_particles;
  }
  color += vec3(0.3, 0.6, 0.9) * particles * 0.15;
  
  fragColor = vec4(color, water * u_opacity);
}`,

  lightning: `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform float u_time;
uniform float u_speed;
uniform float u_particles;
uniform float u_opacity;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_active;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float lightning(vec2 uv, float t) {
  float bolt = 0.0;
  float x = uv.x;
  
  for (float i = 0.0; i < 3.0; i++) {
    float offset = snoise(vec2(x * 5.0 + i * 10.0, t * 3.0 + i * 5.0));
    float y = uv.y - 0.5 - offset * 0.15;
    float width = 0.003 + 0.002 * sin(t * 10.0 + i);
    bolt += smoothstep(width, 0.0, abs(y)) * (0.5 + 0.5 * sin(t * 8.0 + i * 3.0));
  }
  
  // Branches
  for (float i = 0.0; i < 5.0; i++) {
    float bx = 0.2 + i * 0.15;
    float by = 0.3 + snoise(vec2(i * 7.0, t)) * 0.2;
    float d = length(uv - vec2(bx, by));
    bolt += smoothstep(0.05, 0.0, d) * 0.3 * sin(t * 6.0 + i * 2.0);
  }
  
  return bolt;
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed;
  
  // Lightning bolts
  float bolt = lightning(uv, t);
  
  // Electric field noise
  float n1 = snoise(uv * 8.0 + vec2(t * 2.0, 0.0));
  float n2 = snoise(uv * 16.0 + vec2(0.0, t * 3.0));
  float field = n1 * 0.6 + n2 * 0.4;
  field = field * 0.5 + 0.5;
  
  // Glow effect
  float glow = bolt * 2.0 + field * 0.3;
  
  // Pointer influence
  float ptrDist = length(uv - u_pointer);
  float ptrInfluence = smoothstep(0.4, 0.0, ptrDist) * u_pointer_active;
  glow += ptrInfluence * 0.5;
  
  // Color - electric blue/purple
  vec3 col1 = vec3(0.1, 0.05, 0.2);
  vec3 col2 = vec3(0.3, 0.2, 0.8);
  vec3 col3 = vec3(0.7, 0.8, 1.0);
  vec3 color = mix(col1, col2, field);
  color = mix(color, col3, bolt);
  
  // Flash
  float flash = smoothstep(0.95, 1.0, sin(t * 4.0) * 0.5 + 0.5);
  color += vec3(0.5, 0.6, 1.0) * flash * 0.3;
  
  // Particles (sparks)
  float sparks = 0.0;
  for (float i = 0.0; i < 12.0; i++) {
    vec2 puv = uv + vec2(sin(t * 2.0 + i * 1.3) * 0.4, cos(t * 1.5 + i * 1.7) * 0.4);
    float p = smoothstep(0.01, 0.0, length(puv - vec2(0.5)) - 0.15);
    sparks += p * u_particles * step(0.7, sin(t * 10.0 + i * 5.0));
  }
  color += vec3(0.6, 0.7, 1.0) * sparks * 0.4;
  
  fragColor = vec4(color, glow * u_opacity);
}`,

  fire: `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform float u_time;
uniform float u_speed;
uniform float u_particles;
uniform float u_opacity;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_active;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed;
  
  // Fire shape - rises from bottom
  float fireHeight = 0.7 + snoise(vec2(uv.x * 3.0, t)) * 0.15;
  float fireShape = smoothstep(fireHeight, 0.0, uv.y);
  
  // Flickering
  float flicker = snoise(vec2(uv.x * 5.0, t * 4.0)) * 0.2;
  fireShape *= 0.8 + flicker;
  
  // Turbulence
  float turb1 = snoise(vec2(uv.x * 4.0 + t * 0.5, uv.y * 6.0 - t * 2.0));
  float turb2 = snoise(vec2(uv.x * 8.0 - t * 0.3, uv.y * 10.0 - t * 3.0));
  float turbulence = turb1 * 0.6 + turb2 * 0.4;
  
  // Inner glow
  float inner = smoothstep(0.3, 0.0, abs(uv.x - 0.5)) * fireShape;
  inner *= smoothstep(0.0, 0.5, uv.y);
  
  // Pointer influence
  float ptrDist = length(uv - u_pointer);
  float ptrInfluence = smoothstep(0.3, 0.0, ptrDist) * u_pointer_active;
  fireShape += ptrInfluence * 0.3;
  
  // Color palette - fire
  vec3 col1 = vec3(0.1, 0.02, 0.0);   // dark red base
  vec3 col2 = vec3(0.8, 0.2, 0.0);    // orange
  vec3 col3 = vec3(1.0, 0.6, 0.1);    // bright orange
  vec3 col4 = vec3(1.0, 0.95, 0.8);   // white hot center
  
  float grad = uv.y * 0.5 + turbulence * 0.3 + inner * 0.2;
  vec3 color = mix(col1, col2, grad);
  color = mix(color, col3, grad * grad);
  color = mix(color, col4, inner * inner * 0.5);
  
  // Embers
  float embers = 0.0;
  for (float i = 0.0; i < 10.0; i++) {
    vec2 puv = vec2(
      0.5 + sin(t * 0.8 + i * 1.1) * 0.3,
      mod(t * 0.5 + i * 0.1, 1.0)
    );
    float p = smoothstep(0.008, 0.0, length(uv - puv));
    embers += p * u_particles * step(0.5, sin(t * 5.0 + i * 3.0));
  }
  color += vec3(1.0, 0.5, 0.1) * embers * 0.6;
  
  fragColor = vec4(color, fireShape * u_opacity);
}`
};

export class ElementalMarksRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private config: ElementalMarksConfig;
  private animationId: number = 0;
  private startTime: number = 0;
  private pointer = { x: 0.5, y: 0.5, active: 0 };
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, config: ElementalMarksConfig) {
    this.canvas = canvas;
    this.config = config;
    this.init();
  }

  private init() {
    const gl = this.canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }
    this.gl = gl;
    this.setupShaders();
    this.setupGeometry();
    this.startTime = performance.now();
  }

  private setupShaders() {
    const gl = this.gl!;
    
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vs));
      return;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADERS[this.config.variant]);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fs));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    this.program = program;
    gl.useProgram(program);

    // Cache uniforms
    this.uniforms.u_time = gl.getUniformLocation(program, 'u_time');
    this.uniforms.u_speed = gl.getUniformLocation(program, 'u_speed');
    this.uniforms.u_particles = gl.getUniformLocation(program, 'u_particles');
    this.uniforms.u_resolution = gl.getUniformLocation(program, 'u_resolution');
    this.uniforms.u_pointer = gl.getUniformLocation(program, 'u_pointer');
    this.uniforms.u_pointer_active = gl.getUniformLocation(program, 'u_pointer_active');

    // Cleanup shaders
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  }

  private setupGeometry() {
    const gl = this.gl!;
    
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(this.program!, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
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
    }
    if (this.gl) {
      this.gl.viewport(0, 0, cw, ch);
    }
  }

  setPointer(x: number, y: number, active: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = active;
  }

  updateConfig(config: Partial<ElementalMarksConfig>) {
    this.config = { ...this.config, ...config };
  }

  draw() {
    if (this.disposed || !this.gl || !this.program) return;
    
    const gl = this.gl;
    const t = (performance.now() - this.startTime) / 1000;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    gl.uniform1f(this.uniforms.u_time, t);
    gl.uniform1f(this.uniforms.u_speed, this.config.speed);
    gl.uniform1f(this.uniforms.u_particles, this.config.particleAmount);
    gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.u_pointer, this.pointer.x, 1.0 - this.pointer.y);
    gl.uniform1f(this.uniforms.u_pointer_active, this.pointer.active);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
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
    if (this.gl) {
      if (this.vao) this.gl.deleteVertexArray(this.vao);
      if (this.program) this.gl.deleteProgram(this.program);
      this.gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }
}
