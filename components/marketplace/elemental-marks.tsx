'use client'

import { useEffect, useRef } from 'react'

const SDF_SIZE = 512
const SDF_SPREAD = 128
const D_RANGE = (SDF_SPREAD * 2) / SDF_SIZE
const SIM_RES = 512
const DPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.75) : 1

function rasterizeLogo(img: HTMLImageElement) {
  const c = document.createElement('canvas')
  c.width = c.height = SDF_SIZE
  const ctx = c.getContext('2d')!
  const scale = Math.min((SDF_SIZE * 0.7) / img.width, (SDF_SIZE * 0.7) / img.height)
  const w = img.width * scale
  const h = img.height * scale
  ctx.drawImage(img, (SDF_SIZE - w) / 2, (SDF_SIZE - h) / 2, w, h)
  return ctx.getImageData(0, 0, SDF_SIZE, SDF_SIZE)
}

function chamfer(d: Float32Array, w: number, h: number) {
  const D1 = 1, D2 = Math.SQRT2
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; let v = d[i]
    if (x > 0) v = Math.min(v, d[i - 1] + D1)
    if (y > 0) { v = Math.min(v, d[i - w] + D1); if (x > 0) v = Math.min(v, d[i - w - 1] + D2); if (x < w - 1) v = Math.min(v, d[i - w + 1] + D2) }
    d[i] = v
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x; let v = d[i]
    if (x < w - 1) v = Math.min(v, d[i + 1] + D1)
    if (y < h - 1) { v = Math.min(v, d[i + w] + D1); if (x < w - 1) v = Math.min(v, d[i + w + 1] + D2); if (x > 0) v = Math.min(v, d[i + w - 1] + D2) }
    d[i] = v
  }
}

function buildSDF(img: ImageData) {
  const n = SDF_SIZE * SDF_SIZE
  const dOut = new Float32Array(n), dIn = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const inside = img.data[i * 4 + 3] > 127
    dOut[i] = inside ? 0 : 1e9
    dIn[i] = inside ? 1e9 : 0
  }
  chamfer(dOut, SDF_SIZE, SDF_SIZE)
  chamfer(dIn, SDF_SIZE, SDF_SIZE)
  const enc = new Uint8Array(n)
  for (let i = 0; i < n; i++) {
    const d = dOut[i] - dIn[i]
    enc[i] = Math.max(0, Math.min(255, Math.round((0.5 + 0.5 * d / SDF_SPREAD) * 255)))
  }
  return enc
}

function edgePoints(img: ImageData) {
  const S = SDF_SIZE, pts: number[] = []
  const a = (x: number, y: number) => img.data[(y * S + x) * 4 + 3] > 127
  for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
    if (!a(x, y)) continue
    const l = a(x - 1, y), r = a(x + 1, y), u = a(x, y - 1), dn = a(x, y + 1)
    if (l && r && u && dn) continue
    const gx = (r ? 1 : 0) - (l ? 1 : 0)
    const gy = (dn ? 1 : 0) - (u ? 1 : 0)
    let nx = -gx, ny = gy
    const len = Math.hypot(nx, ny)
    if (!len) { nx = 0; ny = 1 } else { nx /= len; ny /= len }
    pts.push((x + 0.5) / S, 1 - (y + 0.5) / S, nx, ny)
  }
  return pts
}

function makeParticleData(pts: number[], count: number) {
  const data = new Float32Array(count * 5)
  const nPts = pts.length / 4
  for (let i = 0; i < count; i++) {
    const j = (Math.random() * nPts) | 0
    data[i * 5] = pts[j * 4]; data[i * 5 + 1] = pts[j * 4 + 1]
    data[i * 5 + 2] = pts[j * 4 + 2]; data[i * 5 + 3] = pts[j * 4 + 3]
    data[i * 5 + 4] = Math.random() * 100 + i * 0.618
  }
  return data
}

const VERT = `#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const GLSL_COMMON = `
precision highp float;
uniform sampler2D uSDF;
uniform float uTime;
uniform float uAspect;
uniform vec2  uScale;
uniform vec2  uShift;
uniform vec3  uPointer;
in vec2 vUv;
out vec4 frag;
float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); float a=hash21(i),b=hash21(i+vec2(1,0)),c=hash21(i+vec2(0,1)),d=hash21(i+vec2(1,1)); return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; mat2 r=mat2(0.8,-0.6,0.6,0.8); for(int i=0;i<5;i++){v+=a*vnoise(p);p=r*p*2.03;a*=0.5;}return v; }
float sdf(vec2 uv){
  vec2 m = 0.5 + (uv - 0.5 - uShift) * uScale;
  vec2 mc = clamp(m, 0.0, 1.0);
  float d = (texture(uSDF, vec2(mc.x, 1.0 - mc.y)).r - 0.5) * ${D_RANGE.toFixed(4)};
  return d + length(m - mc);
}
float edgeFade(vec2 uv){
  return smoothstep(0.0,0.05,uv.x)*smoothstep(1.0,0.95,uv.x)*smoothstep(0.0,0.05,uv.y)*smoothstep(1.0,0.95,uv.y);
}`

const FRAG_SIM = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec3 uDrop;
in vec2 vUv;
out vec4 frag;
void main(){
  vec2 s = texture(uState, vUv).rg;
  float l=texture(uState,vUv-vec2(uTexel.x,0.0)).r, r=texture(uState,vUv+vec2(uTexel.x,0.0)).r;
  float u=texture(uState,vUv+vec2(0.0,uTexel.y)).r, d=texture(uState,vUv-vec2(0.0,uTexel.y)).r;
  float next=(l+r+u+d)*0.5-s.g; next*=0.984;
  if(uDrop.z!=0.0){float dd=distance(vUv,uDrop.xy);next+=uDrop.z*exp(-dd*dd*3800.0);}
  frag=vec4(next,s.r,0.0,1.0);
}`

const FRAG_WATER = `#version 300 es
${GLSL_COMMON}
uniform sampler2D uState;
uniform vec2 uSimTexel;
vec2 simUV(vec2 uv){return 0.5+(uv-0.5)*vec2(uAspect,1.0)/max(uAspect,1.0);}
void main(){
  vec2 suv=simUV(vUv); float h=texture(uState,suv).r;
  float hx=texture(uState,suv+vec2(uSimTexel.x,0.0)).r-texture(uState,suv-vec2(uSimTexel.x,0.0)).r;
  float hy=texture(uState,suv+vec2(0.0,uSimTexel.y)).r-texture(uState,suv-vec2(0.0,uSimTexel.y)).r;
  vec2 grad=vec2(hx,hy); vec3 nrm=normalize(vec3(-grad*30.0,1.0));
  vec2 ruv=vUv+grad*0.22; float d=sdf(ruv);
  vec3 col=mix(vec3(0.006,0.030,0.055),vec3(0.012,0.078,0.125),vUv.y*0.8+h*0.25);
  col+=vec3(0.02,0.10,0.13)*fbm(vUv*vec2(uAspect,1.0)*3.0+uTime*0.05)*0.3;
  float logo=smoothstep(0.005,-0.005,d); float glow=exp(-max(d,0.0)/0.09)*0.26;
  vec3 markCol=mix(vec3(0.55,0.92,1.0),vec3(0.95,1.0,1.0),logo*0.6);
  col+=markCol*(logo*0.92+glow);
  col+=vec3(0.09,0.30,0.40)*clamp(h*1.8,-0.06,1.0);
  col+=vec3(0.25,0.55,0.65)*pow(clamp(h*2.6,0.0,1.0),2.0)*0.5;
  vec3 L=normalize(vec3(-0.35,0.55,0.75)); vec3 H=normalize(L+vec3(0.0,0.0,1.0));
  float spec=pow(max(dot(nrm,H),0.0),150.0); col+=spec*vec3(0.65,0.9,1.0)*0.9;
  col*=0.35+0.65*edgeFade(vUv); col+=(hash21(vUv*617.0+uTime)-0.5)/128.0;
  frag=vec4(col,1.0);
}`

const FRAG_LIGHTNING = `#version 300 es
${GLSL_COMMON}
void main(){
  float t=uTime; float d=sdf(vUv); vec2 pp=vUv*vec2(uAspect,1.0);
  vec3 col=vec3(0.010,0.011,0.024);
  col+=vec3(0.035,0.04,0.075)*fbm(pp*2.2+vec2(t*0.04,t*0.01));
  float slot=floor(t*0.45); float ph=fract(t*0.45);
  float big=step(0.68,hash21(vec2(slot,3.7)))*exp(-ph*16.0);
  float inside=smoothstep(0.005,-0.005,d);
  vec3 body=vec3(0.055,0.06,0.10)+big*vec3(0.55,0.58,0.85);
  col=mix(col,body,inside);
  float rim=exp(-abs(d)/0.012)*0.5; col+=rim*vec3(0.35,0.4,0.8);
  vec2 dp=(vUv-uPointer.xy)*vec2(uAspect,1.0);
  float pb=1.0+2.4*uPointer.z*exp(-dot(dp,dp)*34.0);
  float fade=edgeFade(vUv);
  for(int i=0;i<3;i++){float fi=float(i);float n=fbm(pp*mix(3.0,8.0,fi/2.0)+vec2(t*(1.2+fi*0.9),fi*19.3))-0.5;
    float e=abs(d+n*0.11);float fl=hash21(vec2(floor(t*(6.0+fi*3.0)),fi));fl=mix(0.15,1.0,smoothstep(0.25,0.95,fl));
    float bolt=pow(0.0042*pb/(e+0.0022),1.35)*fl;bolt=min(bolt,6.0);
    col+=bolt*mix(vec3(0.38,0.42,1.0),vec3(0.92,0.9,1.0),fi/2.0)*fade;}
  float n0=fbm(pp*5.0+vec2(t*2.4,7.7))-0.5;float e0=abs(d+n0*0.10);
  float corefl=mix(0.25,1.15,hash21(vec2(floor(t*9.0),11.0)));
  col+=min(pow(0.0026*pb/(e0+0.0016),1.6),8.0)*corefl*vec3(1.0)*fade;
  col+=big*vec3(0.30,0.32,0.55)*(0.25+0.75*inside);
  col=col/(1.0+col*0.18); col*=0.4+0.6*edgeFade(vUv);
  col+=(hash21(vUv*431.0+uTime)-0.5)/128.0; frag=vec4(col,1.0);
}`

const FRAG_FIRE = `#version 300 es
${GLSL_COMMON}
uniform float uWind;
vec3 fireRamp(float x){x=clamp(x,0.0,1.0);vec3 c=mix(vec3(0.0),vec3(0.45,0.06,0.02),smoothstep(0.02,0.30,x));
  c=mix(c,vec3(0.95,0.34,0.08),smoothstep(0.28,0.55,x));c=mix(c,vec3(1.0,0.68,0.22),smoothstep(0.52,0.78,x));
  c=mix(c,vec3(1.0,0.97,0.88),smoothstep(0.78,0.97,x));return c;}
void main(){
  float t=uTime; float d0=sdf(vUv); vec2 pp=vUv*vec2(uAspect,1.0);
  float e=0.012;
  vec2 g=vec2(sdf(vUv+vec2(e,0.0))-sdf(vUv-vec2(e,0.0)),sdf(vUv+vec2(0.0,e))-sdf(vUv-vec2(0.0,e)));
  float upw=smoothstep(-0.2,0.9,normalize(g+1e-5).y);
  vec2 dp=(vUv-uPointer.xy)*vec2(uAspect,1.0); float stoke=uPointer.z*exp(-dot(dp,dp)*26.0);
  float n1=fbm(vec2(pp.x*12.0,pp.y*3.0-t*2.1)); float n2=fbm(vec2(pp.x*6.0+41.3,pp.y*1.7-t*1.25));
  float d0f=d0+(hash21(vUv*771.0+t*1.3)-0.5)*0.004;
  float rise=max(0.0,n1*1.15+n2*0.65-0.5)*1.3;
  float adv=smoothstep(-0.03,0.22,d0f);
  float lick=0.30*(1.0+stoke*0.8);
  vec2 offs=vec2((n2-0.5)*0.05+uWind*0.05,-rise*lick*adv);
  float df=sdf(vUv+offs); df+=(hash21(vUv*997.0+uTime)-0.5)*0.004;
  float heat=clamp(1.0-df/0.07,0.0,1.0); heat*=mix(0.1,1.0,upw);
  heat*=1.0-0.45*smoothstep(0.08,0.26,d0f);
  float tongue=smoothstep(0.25,0.70,heat); float body=pow(heat,2.2)*0.45;
  float f=max(tongue,body)*(0.95+0.25*stoke);
  vec3 col=vec3(0.012,0.006,0.004);
  col+=fireRamp(f*(1.05-0.4*smoothstep(0.02,0.25,d0)));
  float inside=smoothstep(0.004,-0.004,d0); float core=smoothstep(0.0,-0.02,d0);
  vec3 markCol=mix(vec3(1.0,0.92,0.78),vec3(1.0,1.0,0.98),core);
  col=mix(col,markCol,inside);
  col+=exp(-max(d0,0.0)/0.035)*vec3(1.0,0.55,0.22)*0.35*(1.0-inside*0.9);
  col+=exp(-max(d0,0.0)/0.12)*vec3(0.55,0.14,0.03)*0.35*(0.6+0.4*n2);
  col=col/(1.0+col*0.12); col*=0.35+0.65*edgeFade(vUv);
  col+=(hash21(vUv*523.0+uTime)-0.5)/128.0; frag=vec4(col,1.0);
}`

const PART_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
layout(location=1) in vec2 aNorm;
layout(location=2) in float aSeed;
uniform float uTime,uAspect;uniform vec2 uScale,uShift;uniform float uDpr,uWind;
uniform vec4 uCfgA,uCfgB;
out float vFade,vMixC;
float h1(float n){return fract(sin(n)*43758.5453);}
void main(){
  float hs=h1(aSeed*1.31);float life=mix(uCfgA.y,uCfgA.z,hs);
  float tt=uTime/life+aSeed*13.7;float ph=fract(tt);float cyc=floor(tt);
  float r1=h1(aSeed+cyc*0.317),r2=h1(aSeed*2.13+cyc*0.771);
  float on=step(uCfgB.w,r2);
  vec2 dir=normalize(mix(vec2(0.0,1.0),aNorm,uCfgA.w)+(vec2(r1,h1(r1*7.0))-0.5)*0.8);
  float trav=uCfgA.x*(0.45+0.9*r1);
  vec2 p=aPos+aNorm*0.004+dir*trav*ph;
  p.x+=sin(ph*10.0+r1*40.0+uTime*0.5)*uCfgB.x*ph;
  p.x+=uWind*0.08*ph;
  vec2 uv=0.5+uShift+(p-0.5)/uScale;
  vFade=on*smoothstep(0.0,0.12,ph)*smoothstep(1.0,0.5,ph)*mix(0.35,1.0,r2);
  vMixC=h1(aSeed*3.7+cyc);
  gl_Position=vec4(uv*2.0-1.0,0.0,1.0);
  gl_PointSize=mix(uCfgB.y,uCfgB.z,h1(aSeed*5.11+cyc))*uDpr*(1.0-0.45*ph);
}`

const PART_FRAG = `#version 300 es
precision highp float;
uniform vec3 uColA,uColB;
in float vFade,vMixC;
out vec4 frag;
void main(){
  vec2 q=gl_PointCoord*2.0-1.0;float r2=dot(q,q);
  if(r2>1.0)discard;
  float a=exp(-r2*3.5)*(1.0-r2);
  frag=vec4(mix(uColA,uColB,vMixC)*a*vFade,1.0);
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src); gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(sh)); return null }
  return sh
}

function createProgram(gl: WebGL2RenderingContext, vSrc: string, fSrc: string) {
  const p = gl.createProgram()!
  const vs = compile(gl, gl.VERTEX_SHADER, vSrc)
  const fs = compile(gl, gl.FRAGMENT_SHADER, fSrc)
  if (!vs || !fs) return null
  gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(p)); return null }
  return p
}

interface PanelConfig {
  zoom: number
  shift: [number, number]
  sim?: boolean
  particles?: {
    count: number; travel: number; lifeMin: number; lifeMax: number; alongNormal: number
    wiggle: number; sizeMin: number; sizeMax: number; sparse: number
    colA: number[]; colB: number[]
  }
}

class Panel {
  el: HTMLElement
  canvas: HTMLCanvasElement
  gl: WebGL2RenderingContext | null = null
  ok = false
  prog: WebGLProgram | null = null
  uni: Record<string, WebGLUniformLocation | null> = {}
  sdfTex: WebGLTexture | null = null
  simProg: WebGLProgram | null = null
  simUni: Record<string, WebGLUniformLocation | null> = {}
  simTex: WebGLTexture[] = []
  simFbo: WebGLFramebuffer[] = []
  simSrc = 0
  partProg: WebGLProgram | null = null
  partUni: Record<string, WebGLUniformLocation | null> = {}
  partVao: WebGLVertexArrayObject | null = null
  aspect = 1
  pointer = { x: 0.5, y: 0.5, active: 0 }
  wind = 0
  windTarget = 0
  dropQueue: { x: number; y: number; s: number }[] = []
  nextAutoDrop = 0.6
  needsResize = false
  cfg: PanelConfig

  constructor(el: HTMLElement, fragSrc: string, sdf: Uint8Array, edges: number[], cfg: PanelConfig) {
    this.el = el
    this.canvas = el.querySelector('canvas')!
    this.cfg = cfg

    const gl = this.canvas.getContext('webgl2', { alpha: false, antialias: false })
    if (!gl) return
    this.gl = gl

    this.prog = createProgram(gl, VERT, fragSrc)
    if (!this.prog) return

    for (const n of ['uSDF', 'uTime', 'uAspect', 'uScale', 'uShift', 'uPointer', 'uState', 'uSimTexel', 'uWind'])
      this.uni[n] = gl.getUniformLocation(this.prog, n)

    this.sdfTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.sdfTex)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, SDF_SIZE, SDF_SIZE, 0, gl.RED, gl.UNSIGNED_BYTE, sdf)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    if (cfg.sim) {
      if (!gl.getExtension('EXT_color_buffer_float')) return
      this.simProg = createProgram(gl, VERT, FRAG_SIM)
      if (!this.simProg) return
      this.simUni.uState = gl.getUniformLocation(this.simProg, 'uState')
      this.simUni.uTexel = gl.getUniformLocation(this.simProg, 'uTexel')
      this.simUni.uDrop = gl.getUniformLocation(this.simProg, 'uDrop')
      for (let i = 0; i < 2; i++) {
        const t = gl.createTexture()!
        gl.bindTexture(gl.TEXTURE_2D, t)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, SIM_RES, SIM_RES, 0, gl.RG, gl.HALF_FLOAT, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        const f = gl.createFramebuffer()!
        gl.bindFramebuffer(gl.FRAMEBUFFER, f)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0)
        this.simTex.push(t); this.simFbo.push(f)
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    if (cfg.particles) {
      this.partProg = createProgram(gl, PART_VERT, PART_FRAG)
      if (!this.partProg) return
      for (const n of ['uTime', 'uScale', 'uShift', 'uDpr', 'uWind', 'uCfgA', 'uCfgB', 'uColA', 'uColB', 'uAspect'])
        this.partUni[n] = gl.getUniformLocation(this.partProg, n)
      const data = makeParticleData(edges, cfg.particles.count)
      this.partVao = gl.createVertexArray()!
      gl.bindVertexArray(this.partVao)
      const buf = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0)
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 8)
      gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 20, 16)
      gl.bindVertexArray(null)
    }

    this.resize()
    new ResizeObserver(() => this.needsResize = true).observe(el)
    this.bindPointer()
    this.ok = true
  }

  resize() {
    const r = this.el.getBoundingClientRect()
    const w = Math.max(2, Math.round(r.width * DPR))
    const h = Math.max(2, Math.round(r.height * DPR))
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h }
    this.aspect = w / h
  }

  bindPointer() {
    const uv = (e: PointerEvent) => {
      const r = this.el.getBoundingClientRect()
      return { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height }
    }
    let last: { x: number; y: number } | null = null, lastT = 0
    this.el.addEventListener('pointermove', e => {
      const p = uv(e), now = performance.now()
      this.pointer.x = p.x; this.pointer.y = p.y; this.pointer.active = 1
      if (last) {
        const dt = Math.max(8, now - lastT)
        const dx = p.x - last.x, dy = p.y - last.y
        const speed = Math.hypot(dx, dy) / (dt / 1000)
        if (this.cfg.sim && speed > 0.05 && this.dropQueue.length < 6)
          this.dropQueue.push({ x: p.x, y: p.y, s: Math.min(speed * 0.14, 0.55) })
        this.windTarget = Math.max(-1, Math.min(1, dx / (dt / 1000) * 0.55))
      }
      last = p; lastT = now
    })
    this.el.addEventListener('pointerdown', e => {
      const p = uv(e)
      if (this.cfg.sim) this.dropQueue.push({ x: p.x, y: p.y, s: 0.9 })
      this.pointer.x = p.x; this.pointer.y = p.y; this.pointer.active = 1.6
    })
    this.el.addEventListener('pointerup', () => { this.pointer.active = 1 })
    this.el.addEventListener('pointerleave', () => { this.pointer.active = 0; last = null; this.windTarget = 0 })
  }

  toSimUV(x: number, y: number) {
    const a = this.aspect, m = Math.max(a, 1)
    return { x: 0.5 + (x - 0.5) * a / m, y: 0.5 + (y - 0.5) / m }
  }

  stepSim(t: number) {
    const gl = this.gl!
    if (t > this.nextAutoDrop) {
      this.dropQueue.push({ x: 0.12 + Math.random() * 0.76, y: 0.12 + Math.random() * 0.76, s: 0.12 + Math.random() * 0.3 })
      this.nextAutoDrop = t + 0.5 + Math.random() * 1.4
    }
    gl.useProgram(this.simProg)
    gl.viewport(0, 0, SIM_RES, SIM_RES)
    gl.uniform2f(this.simUni.uTexel!, 1 / SIM_RES, 1 / SIM_RES)
    for (let i = 0; i < 2; i++) {
      const drop = this.dropQueue.shift()
      if (drop) { const s = this.toSimUV(drop.x, drop.y); gl.uniform3f(this.simUni.uDrop!, s.x, s.y, drop.s) }
      else gl.uniform3f(this.simUni.uDrop!, 0, 0, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.simFbo[1 - this.simSrc])
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, this.simTex[this.simSrc])
      gl.uniform1i(this.simUni.uState!, 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      this.simSrc = 1 - this.simSrc
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  scaleVec() {
    const z = this.cfg.zoom, a = this.aspect, fit = Math.min(a, 1)
    return [(a / fit) * z, (1 / fit) * z]
  }

  draw(t: number) {
    const gl = this.gl
    if (!gl || !this.ok) return
    if (this.needsResize) { this.needsResize = false; this.resize() }
    if (this.cfg.sim) this.stepSim(t)
    this.wind += (this.windTarget - this.wind) * 0.04
    this.windTarget *= 0.97
    gl.useProgram(this.prog)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    const sc = this.scaleVec()
    gl.uniform1f(this.uni.uTime!, t)
    gl.uniform1f(this.uni.uAspect!, this.aspect)
    gl.uniform2f(this.uni.uScale!, sc[0], sc[1])
    gl.uniform2f(this.uni.uShift!, this.cfg.shift[0], this.cfg.shift[1])
    gl.uniform3f(this.uni.uPointer!, this.pointer.x, this.pointer.y, this.pointer.active)
    if (this.uni.uWind) gl.uniform1f(this.uni.uWind, this.wind)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.sdfTex)
    gl.uniform1i(this.uni.uSDF!, 0)
    if (this.cfg.sim) {
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, this.simTex[this.simSrc])
      gl.uniform1i(this.uni.uState!, 1)
      gl.uniform2f(this.uni.uSimTexel!, 1 / SIM_RES, 1 / SIM_RES)
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (this.cfg.particles) {
      gl.useProgram(this.partProg)
      const P = this.cfg.particles
      gl.uniform1f(this.partUni.uTime!, t)
      gl.uniform2f(this.partUni.uScale!, sc[0], sc[1])
      gl.uniform2f(this.partUni.uShift!, this.cfg.shift[0], this.cfg.shift[1])
      gl.uniform1f(this.partUni.uDpr!, DPR)
      gl.uniform1f(this.partUni.uWind, this.wind)
      gl.uniform1f(this.partUni.uAspect!, this.aspect)
      gl.uniform4f(this.partUni.uCfgA!, P.travel, P.lifeMin, P.lifeMax, P.alongNormal)
      gl.uniform4f(this.partUni.uCfgB!, P.wiggle, P.sizeMin, P.sizeMax, P.sparse)
      gl.uniform3f(this.partUni.uColA!, P.colA[0], P.colA[1], P.colA[2])
      gl.uniform3f(this.partUni.uColB!, P.colB[0], P.colB[1], P.colB[2])
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
      gl.bindVertexArray(this.partVao)
      gl.drawArrays(gl.POINTS, 0, P.count)
      gl.bindVertexArray(null)
      gl.disable(gl.BLEND)
    }
  }
}

const PANEL_CONFIGS: { label: string; effect: string; kanji: string; subtitle: string; tech: string; fragSrc: string; cfg: PanelConfig }[] = [
  {
    label: 'Suv', effect: 'water', kanji: '水', subtitle: 'Sui — Water', tech: 'ping-pong suv to\'lqinlari',
    fragSrc: FRAG_WATER,
    cfg: { sim: true, zoom: 1.06, shift: [0, 0], particles: { count: 160, travel: 0.10, lifeMin: 4.0, lifeMax: 8.0, alongNormal: 0.15, wiggle: 0.02, sizeMin: 1.5, sizeMax: 3.5, sparse: 0.5, colA: [0.10, 0.24, 0.30], colB: [0.22, 0.40, 0.48] } },
  },
  {
    label: 'Chaqnoq', effect: 'lightning', kanji: '雷', subtitle: 'Rai — Lightning', tech: 'elektr chiziq animatsiyasi',
    fragSrc: FRAG_LIGHTNING,
    cfg: { sim: false, zoom: 1.10, shift: [0, 0], particles: { count: 240, travel: 0.055, lifeMin: 0.3, lifeMax: 0.9, alongNormal: 1.0, wiggle: 0.015, sizeMin: 1.2, sizeMax: 2.6, sparse: 0.8, colA: [0.45, 0.50, 1.0], colB: [0.95, 0.95, 1.0] } },
  },
  {
    label: 'Olov', effect: 'fire', kanji: '炎', subtitle: 'En — Flame', tech: 'olov yoyilishi va uchqunlar',
    fragSrc: FRAG_FIRE,
    cfg: { sim: false, zoom: 1.16, shift: [0, -0.04], particles: { count: 420, travel: 0.30, lifeMin: 1.4, lifeMax: 3.0, alongNormal: 0.35, wiggle: 0.035, sizeMin: 1.6, sizeMax: 4.5, sparse: 0.55, colA: [1.0, 0.62, 0.28], colB: [1.0, 0.30, 0.10] } },
  },
]

export function ElementalMarks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<Panel[]>([])

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/logotip2.png'
    img.onload = () => {
      const imgData = rasterizeLogo(img)
      const sdf = buildSDF(imgData)
      const edges = edgePoints(imgData)

      const els = containerRef.current?.querySelectorAll<HTMLElement>('.em-panel')
      if (!els) return

      panelsRef.current = []
      els.forEach((el, i) => {
        const cfg = PANEL_CONFIGS[i]
        if (!cfg) return
        const panel = new Panel(el, cfg.fragSrc, sdf, edges, cfg.cfg)
        if (panel.ok) panelsRef.current.push(panel)
      })

      let raf = 0
      const t0 = performance.now()
      const loop = () => {
        const t = (performance.now() - t0) / 1000
        for (const p of panelsRef.current) p.draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      {PANEL_CONFIGS.map((cfg) => (
        <div
          key={cfg.effect}
          className="em-panel"
          data-fx={cfg.effect}
          style={{
            position: 'relative',
            flex: '1 1 0',
            minWidth: 0,
            borderLeft: '1px solid rgba(255,255,255,.07)',
            opacity: 0,
            transform: 'translateY(14px)',
            animation: `emReveal 1.1s cubic-bezier(.22,1,.36,1) forwards`,
          }}
        >
          <canvas style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
          <div style={{
            position: 'absolute', top: 46, right: 18, zIndex: 5,
            fontFamily: 'sans-serif', fontWeight: 800,
            fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 1,
            color: 'transparent', WebkitTextStroke: `1px ${cfg.effect === 'water' ? '#6cd3ff' : cfg.effect === 'lightning' ? '#aab4ff' : '#ff9d6b'}`,
            opacity: 0.55, pointerEvents: 'none', transition: 'opacity .5s, color .5s',
          }}>
            {cfg.kanji}
          </div>
          <div style={{ position: 'absolute', left: 22, bottom: 20, zIndex: 5, pointerEvents: 'none' }}>
            <div style={{ fontSize: 10, letterSpacing: 'normal', color: 'rgba(232,228,220,.22)', marginBottom: 10, textTransform: 'uppercase' as const }}>
              {cfg.subtitle}
            </div>
            <h2 style={{ fontFamily: 'sans-serif', fontWeight: 500, fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: 'normal', color: '#e8e4dc', margin: 0 }}>
              ITSHOP
            </h2>
            <p style={{ marginTop: 8, fontSize: 10, letterSpacing: 'normal', color: 'rgba(232,228,220,.42)', maxWidth: 300, lineHeight: 1.7 }}>
              {cfg.tech}
            </p>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes emReveal { to { opacity: 1; transform: none; } }
        .em-panel:nth-child(1) { animation-delay: .05s; }
        .em-panel:nth-child(2) { animation-delay: .18s; }
        .em-panel:nth-child(3) { animation-delay: .31s; }
        @media (hover:hover) and (min-width: 761px) {
          .em-panel:hover { flex: 1.4 1 0; }
        }
        .em-panel:hover > div:nth-child(2) { opacity: .95 !important; }
        @media (max-width: 760px) {
          .em-panel { min-height: 200px; }
        }
      `}</style>
    </div>
  )
}
