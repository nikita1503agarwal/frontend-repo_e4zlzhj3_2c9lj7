import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// A lightweight WebGL displacement effect using a single fragment shader driven by mouse
export default function DisplaceGallery() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Resize canvas to container
    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader with mouse displacement ripple
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_tex0;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform vec2 u_res;

      float circle(vec2 uv, vec2 p, float r, float blur) {
        float d = length(uv - p);
        return smoothstep(r, r - blur, d);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 m = u_mouse / u_res; // normalized mouse
        float ripple = circle(uv, m, 0.25 + 0.05*sin(u_time*1.2), 0.25);
        vec2 disp = (uv - m) * ripple * 0.15;
        vec3 col = texture2D(u_tex0, uv - disp).rgb;

        // subtle chromatic aberration
        float ca = ripple * 0.006;
        float r = texture2D(u_tex0, uv - disp + vec2(ca,0.0)).r;
        float g = texture2D(u_tex0, uv - disp).g;
        float b = texture2D(u_tex0, uv - disp - vec2(ca,0.0)).b;
        gl_FragColor = vec4(r,g,b,1.0);
      }
    `

    // Compile helpers
    const compile = (src, type) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
      }
      return shader
    }

    const vs = compile(vsSource, gl.VERTEX_SHADER)
    const fs = compile(fsSource, gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const quad = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Texture loading
    const tex = gl.createTexture()
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = 'https://images.unsplash.com/photo-1520975682031-a52c6d192421?q=80&w=1600&auto=format&fit=crop'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      render()
    }

    // Uniforms
    const uTex0 = gl.getUniformLocation(program, 'u_tex0')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_res')

    let mouse = { x: 0, y: 0 }
    let t = 0

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = rect.height - (e.clientY - rect.top)
    }
    containerRef.current.addEventListener('mousemove', onMove)

    function render() {
      t += 0.016
      gl.uniform1i(uTex0, 0)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      requestAnimationFrame(render)
    }

    // Entrance animation
    gsap.from(containerRef.current, { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.2 })

    return () => {
      window.removeEventListener('resize', resize)
      containerRef.current?.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}
