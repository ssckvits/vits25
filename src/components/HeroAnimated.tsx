import React, { useEffect, useRef } from 'react';

// Lightweight WebGL fullscreen shader background.
// Produces subtle flowing waves and glowing particles using fragment shader.
const vertexShaderSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_primary;
uniform vec3 u_accent;

// small helpers
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), f.x), mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
}

// smooth line field for grid-like circuits
float lineField(vec2 p, float scale, float thickness) {
  vec2 g = fract(p * scale) - 0.5;
  vec2 absG = abs(g);
  float d = min(absG.x, absG.y);
  return smoothstep(thickness, 0.0, d);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 pos = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
  // center coords
  vec2 center = pos - 0.5 * vec2(u_resolution.x / u_resolution.y, 1.0);

  // base dark
  vec3 col = vec3(0.01, 0.01, 0.02);

  // move through the landscape
  float t = u_time * 0.4;

  // perspective depth effect: scale coordinates as if viewing a plane
  float depthFactor = 1.0 + center.y * 2.2;
  vec2 world = center * (1.0 + depthFactor * 1.6);

  // layered grid (circuit traces) with different scales create depth
  float accum = 0.0;
  float glow = 0.0;
  for (int i = 0; i < 36; i++) {
    float fi = float(i);
    // layer depth offset creates parallax
    float layerZ = fi * 0.18 + t * 0.6;
    // subtle horizontal drift per layer
    vec2 p = world * (0.6 + fi * 0.02) + vec2(sin(layerZ * 0.7 + fi)*0.03, cos(layerZ * 0.5 + fi)*0.02);

    // grid lines
    float lines = lineField(p + vec2(layerZ*0.02, layerZ*0.01), 8.0 + fi*0.8, 0.028);
    // secondary finer traces
    float lines2 = lineField(p*1.6, 22.0 + fi*1.2, 0.012);

    // nodes at grid intersections: light up occasionally via noise
    vec2 cell = fract(p * 8.0) - 0.5;
    float node = smoothstep(0.06, 0.0, length(cell));
    float nseed = noise(vec2(fi*12.3, layerZ*0.37));
    float nodePulse = smoothstep(0.2, 0.9, nseed + 0.3 * sin(t*2.0 + fi));
    node *= nodePulse;

    // accumulate color contributions
    float layerIntensity = 1.0 / (1.0 + fi*0.06);
    accum += (lines * 0.9 + lines2 * 0.4) * layerIntensity;
    glow += node * layerIntensity * 1.6;
  }

  // gentle scanline moving across to add life
  float scan = 0.5 + 0.5 * sin((center.y * 6.0 - t * 2.0) * 3.1415);
  accum *= mix(0.9, 1.2, scan * 0.08);

  // color mixing using the theme colors
  vec3 primary = u_primary;
  vec3 accent = u_accent;
  vec3 linesColor = mix(primary, accent, 0.5) * 0.9;
  vec3 nodesColor = accent * 1.05;

  col += accum * linesColor * 0.9;
  col += glow * nodesColor * 0.9;

  // subtle ambient shimmer from noise
  col += 0.03 * vec3(noise(pos*30.0 + t*0.2));

  // vignette and final tone mapping
  float v = smoothstep(0.9, 0.2, length(center) );
  col *= mix(0.7, 1.0, 1.0 - v);

  // tone map
  col = 1.0 - exp(-col);
  // a tiny gamma
  col = pow(col, vec3(0.95));

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Could not compile shader:\n' + info);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsrc: string, fsrc: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsrc);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error('Could not link program:\n' + info);
  }
  return program;
}

const HeroAnimated: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // skip heavy animation when reduced motion is preferred
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true }) as WebGLRenderingContext | null;
    if (!gl) return; // WebGL not supported

    let program: WebGLProgram;
    try {
      program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    } catch (e) {
      console.error('Shader compile/link error', e);
      return;
    }

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const primaryLoc = gl.getUniformLocation(program, 'u_primary');
    const accentLoc = gl.getUniformLocation(program, 'u_accent');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    // read CSS color variables from :root
    const rootStyles = getComputedStyle(document.documentElement);
    // CSS vars are HSL components like '189 94% 43%'; convert to rgb
    function readHslVar(name: string) {
      const v = rootStyles.getPropertyValue(name).trim();
      if (!v) return [0.0, 0.6, 0.45];
      const parts = v.split(/\s+/);
      // expect 'h s% l%'
      const h = parseFloat(parts[0]);
      const s = parseFloat(parts[1]) / 100;
      const l = parseFloat(parts[2]) / 100;
      // convert hsl to rgb
      const c = (1 - Math.abs(2*l - 1)) * s;
      const x = c * (1 - Math.abs((h/60.0) % 2 - 1));
      const m = l - c/2.0;
      let r = 0, g = 0, b = 0;
      if (h < 60) { r = c; g = x; b = 0; }
      else if (h < 120) { r = x; g = c; b = 0; }
      else if (h < 180) { r = 0; g = c; b = x; }
      else if (h < 240) { r = 0; g = x; b = c; }
      else if (h < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      return [r + m, g + m, b + m];
    }

    const primaryRgb = readHslVar('--primary');
    const accentRgb = readHslVar('--accent');

    let start = performance.now();

    function render(now: number) {
      resize();
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc!, canvas.width, canvas.height);
      gl.uniform1f(timeLoc!, (now - start) / 1000);
      gl.uniform3f(primaryLoc!, primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      gl.uniform3f(accentLoc!, accentRgb[0], accentRgb[1], accentRgb[2]);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { gl.deleteProgram(program); } catch (e) {}
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 hero-animated-wrapper" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
      <canvas ref={canvasRef} className="hero-animated-canvas" />
    </div>
  );
};

export default HeroAnimated;
