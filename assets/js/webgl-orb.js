export function initOrbitalCanvas(canvas, options = {}) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });

  if (!gl) {
    canvas.remove();
    return;
  }

  const vertexSource = `#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `#version 300 es
    precision highp float;

    out vec4 outColor;

    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    uniform float u_scroll;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amp * noise(p);
        p = mat2(1.62, -1.18, 1.18, 1.62) * p + 0.21;
        amp *= 0.5;
      }
      return value;
    }

    float ring(vec2 uv, float radius, float thickness) {
      float distanceToRing = abs(length(uv) - radius);
      return smoothstep(thickness, 0.0, distanceToRing);
    }

    vec3 palette(float t) {
      vec3 a = vec3(0.55, 0.22, 1.00);
      vec3 b = vec3(0.05, 0.72, 1.00);
      vec3 c = vec3(1.00, 0.18, 0.72);
      return mix(mix(a, b, smoothstep(0.0, 0.72, t)), c, smoothstep(0.52, 1.0, t));
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 uv = (frag - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      vec2 pointer = (u_pointer - 0.5) * vec2(0.22, -0.22);
      uv += pointer;

      float time = u_time * 0.28;
      float scrollShift = u_scroll * 0.00065;
      float radius = length(uv);
      float angle = atan(uv.y, uv.x);

      vec2 warped = uv;
      warped.x += 0.055 * sin(uv.y * 8.0 + time * 1.7);
      warped.y += 0.055 * cos(uv.x * 7.0 - time * 1.4);

      float nebula = fbm(warped * 3.2 + vec2(time * 0.22, -time * 0.18 + scrollShift));
      float fine = fbm(warped * 9.0 - vec2(time * 0.14, time * 0.08));
      float halo = smoothstep(0.95, 0.05, radius);

      float orbitA = ring(warped + vec2(0.05 * sin(time), 0.0), 0.42 + 0.015 * sin(time * 1.2), 0.018);
      float orbitB = ring(warped * mat2(cos(0.62), -sin(0.62), sin(0.62), cos(0.62)), 0.68, 0.012);
      float orbitC = ring(warped * mat2(cos(-0.36), -sin(-0.36), sin(-0.36), cos(-0.36)), 0.88, 0.008);

      float beam = pow(max(0.0, cos(angle * 3.0 - time * 1.7)), 18.0) * smoothstep(1.1, 0.15, radius);
      float core = smoothstep(0.42, 0.02, radius);
      float starField = step(0.994, noise(floor((uv + 1.0) * u_resolution.xy * 0.11))) * smoothstep(0.25, 1.1, radius);

      vec3 violet = vec3(0.18, 0.06, 0.40);
      vec3 blue = vec3(0.02, 0.43, 0.95);
      vec3 pink = vec3(1.00, 0.15, 0.72);
      vec3 gold = vec3(1.00, 0.76, 0.24);

      vec3 color = vec3(0.0);
      color += palette(nebula) * nebula * halo * 0.9;
      color += violet * core * 1.7;
      color += blue * orbitA * 0.9;
      color += pink * orbitB * 0.85;
      color += gold * orbitC * 0.42;
      color += pink * beam * 0.45;
      color += vec3(1.0, 0.92, 0.75) * starField * (0.25 + fine);

      color = pow(color, vec3(0.92));
      float alpha = clamp(halo * 0.68 + (orbitA + orbitB + orbitC) * 0.42 + core * 0.22 + starField, 0.0, 0.88);
      alpha *= smoothstep(1.2, 0.2, radius);

      outColor = vec4(color, alpha);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  if (!program) {
    canvas.remove();
    return;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const scrollLocation = gl.getUniformLocation(program, 'u_scroll');

  const pointer = { x: 0.5, y: 0.5 };
  let animationFrame = 0;
  let start = performance.now();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function draw(now) {
    resize();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(pointerLocation, pointer.x, pointer.y);
    gl.uniform1f(timeLocation, (now - start) / 1000);
    gl.uniform1f(scrollLocation, window.scrollY || 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (!options.reducedMotion) {
      animationFrame = requestAnimationFrame(draw);
    }
  }

  const onPointerMove = (event) => {
    pointer.x += (event.clientX / window.innerWidth - pointer.x) * 0.22;
    pointer.y += (event.clientY / window.innerHeight - pointer.y) * 0.22;
  };

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  if (options.reducedMotion) {
    draw(start + 160);
  } else {
    animationFrame = requestAnimationFrame(draw);
  }

  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    gl.deleteBuffer(positionBuffer);
    gl.deleteProgram(program);
  };
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
