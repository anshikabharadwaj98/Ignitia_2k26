import { useEffect, useRef, useState } from 'react';

interface NorthernLightsBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function NorthernLightsBackground({ 
  className = '', 
  intensity = 'medium' 
}: NorthernLightsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    // Enhanced performance detection
    const checkPerformance = () => {
      const start = performance.now();
      // CPU benchmark
      for (let i = 0; i < 100000; i++) {
        Math.random() * Math.random();
      }
      const cpuTime = performance.now() - start;
      
      // Check device capabilities
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as any).deviceMemory || 4;
      
      // Consider low performance if CPU test is slow or limited hardware
      return cpuTime > 10 || hardwareConcurrency < 4 || deviceMemory < 4;
    };
    
    setIsLowPerformance(checkPerformance());

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createGradient = (x1: number, y1: number, x2: number, y2: number, colors: string[]) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      return gradient;
    };

    const drawNorthernLights = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Performance optimization: reduce complexity for low-performance devices
      const complexity = isLowPerformance ? 0.5 : 1;
      const waveCount = Math.floor(5 * complexity);
      const particleCount = Math.floor(20 * complexity);

      // Draw flowing light waves
      for (let i = 0; i < waveCount; i++) {
        const waveOffset = (time * 0.001 + i * 0.5) % (Math.PI * 2);
        const waveHeight = height * 0.3;
        const waveY = height * 0.2 + Math.sin(waveOffset) * 50;

        ctx.save();
        
        // Create wave path
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y = waveY + 
            Math.sin((x * 0.01) + waveOffset) * 30 +
            Math.sin((x * 0.005) + waveOffset * 1.5) * 20 +
            Math.sin((x * 0.002) + waveOffset * 2) * 15;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Create aurora colors
        const colors = [
          `rgba(0, 255, 255, ${0.1 + Math.sin(waveOffset) * 0.05})`, // Cyan
          `rgba(64, 224, 208, ${0.08 + Math.cos(waveOffset * 1.2) * 0.04})`, // Turquoise
          `rgba(0, 255, 127, ${0.06 + Math.sin(waveOffset * 0.8) * 0.03})`, // Spring green
          `rgba(138, 43, 226, ${0.04 + Math.cos(waveOffset * 1.5) * 0.02})`, // Blue violet
          'rgba(0, 255, 255, 0)'
        ];

        const gradient = createGradient(0, waveY - waveHeight, 0, waveY + waveHeight, colors);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = colors[i % 2];
        ctx.shadowBlur = 30;
        ctx.fill();
        
        ctx.restore();
      }

      // Add subtle particle noise
      if (!isReducedMotion && !isLowPerformance) {
        for (let i = 0; i < particleCount; i++) {
          const x = (Math.sin(time * 0.001 + i) * width * 0.5) + width * 0.5;
          const y = (Math.cos(time * 0.0008 + i * 0.5) * height * 0.3) + height * 0.4;
          const opacity = (Math.sin(time * 0.002 + i) + 1) * 0.02;
          
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#00FF7F' : '#8A2BE2';
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const animate = () => {
      if (!isReducedMotion) {
        time += 16; // ~60fps
        drawNorthernLights();
      } else {
        // Static version for reduced motion
        drawNorthernLights();
      }
      
      if (!isReducedMotion) {
        animationId = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
      if (isReducedMotion) {
        drawNorthernLights();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion, isLowPerformance, intensity]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />
      
      {/* CSS-based backup animation for better performance */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-violet-500/10 animate-pulse"
          style={{ 
            animationDuration: '8s',
            animationPlayState: isReducedMotion ? 'paused' : 'running'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-teal-500/8 via-transparent to-cyan-500/8 animate-pulse"
          style={{ 
            animationDuration: '12s',
            animationDelay: '2s',
            animationPlayState: isReducedMotion ? 'paused' : 'running'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-bl from-violet-500/6 via-emerald-500/4 to-transparent animate-pulse"
          style={{ 
            animationDuration: '10s',
            animationDelay: '4s',
            animationPlayState: isReducedMotion ? 'paused' : 'running'
          }}
        />
      </div>
    </div>
  );
}