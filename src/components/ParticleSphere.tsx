import React, { useEffect, useRef, useState } from 'react';

interface ParticleData {
  id: string;
  name: string;
  type: string;
  value: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
  data: ParticleData;
}

export const ParticleSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<{ x: number, y: number, data: ParticleData } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 500;
    let sphereRadius = Math.min(width, height) * 0.35;

    const types = ['Source', 'Agent', 'Document', 'Entity'];

    // Generate random particles on a sphere surface
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      const isRed = Math.random() > 0.9;
      const type = types[Math.floor(Math.random() * types.length)];
      
      particles.push({
        x, y, z,
        r: Math.random() * 1.5 + 0.8,
        color: isRed ? '#ef4444' : '#ffffff',
        data: {
          id: `node-${i}`,
          name: `${type} ${Math.floor(Math.random() * 1000)}`,
          type: type,
          value: Math.floor(Math.random() * 100)
        }
      });
    }

    let animationFrameId: number;
    let rotX = 0;
    let rotY = 0;
    
    // Interaction state
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetRotX = 0;
    let targetRotY = 0;
    let autoRotateX = 0.001;
    let autoRotateY = 0.002;
    let currentScale = 1;
    let targetScale = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        targetRotX += autoRotateX;
        targetRotY += autoRotateY;
      }

      // Smooth rotation interpolation
      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;
      
      // Smooth scale interpolation
      currentScale += (targetScale - currentScale) * 0.1;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      let closestNode: { x: number, y: number, data: ParticleData, z: number } | null = null;
      let minDistance = 15; // Hover radius

      particles.forEach(p => {
        // Rotate around X
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;

        // Rotate around Y
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        // Project 3D to 2D
        const fov = 250;
        const scale = fov / (fov + z2 * sphereRadius);
        const xProjected = (width / 2) + x2 * sphereRadius * scale * currentScale;
        const yProjected = (height / 2) + y1 * sphereRadius * scale * currentScale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(xProjected, yProjected, p.r * scale * currentScale, 0, Math.PI * 2);
        
        // Depth-based opacity (far points are dimmer)
        const opacity = Math.max(0.1, Math.min(1, (z2 + 1) / 2 + 0.2));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Check hover
        const dx = mouseX - xProjected;
        const dy = mouseY - yProjected;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          // If we found multiple close ones, pick the one closest to the camera (highest z2)
          if (!closestNode || z2 > closestNode.z) {
             closestNode = { x: xProjected, y: yProjected, data: p.data, z: z2 };
          }
        }
      });

      if (closestNode) {
        setHoveredNode({ x: closestNode.x, y: closestNode.y, data: closestNode.data });
        canvas.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      sphereRadius = Math.min(width, height) * 0.35;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        
        targetRotY += deltaX * 0.005;
        targetRotX += deltaY * 0.005;
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseLeave = () => {
      isDragging = false;
      mouseX = -1000;
      mouseY = -1000;
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScale -= e.deltaY * 0.001;
      targetScale = Math.max(0.5, Math.min(targetScale, 3)); // Clamp scale
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block touch-none"
      />
      {hoveredNode && (
        <div 
          className="absolute pointer-events-none bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl z-50 min-w-[150px]"
          style={{
            left: hoveredNode.x + 15,
            top: hoveredNode.y + 15,
          }}
        >
          <div className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">{hoveredNode.data.type}</div>
          <div className="text-sm font-bold text-foreground mb-1">{hoveredNode.data.name}</div>
          <div className="text-[10px] text-gray-500 font-mono">ID: {hoveredNode.data.id}</div>
          <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-border/50 flex justify-between">
            <span>Connections</span>
            <span className="text-foreground font-semibold">{hoveredNode.data.value}</span>
          </div>
        </div>
      )}
    </div>
  );
};
