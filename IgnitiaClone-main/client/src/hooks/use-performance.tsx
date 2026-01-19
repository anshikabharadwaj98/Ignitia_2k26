import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  isLowPerformance: boolean;
  isReducedMotion: boolean;
  devicePixelRatio: number;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowPerformance: false,
    isReducedMotion: false,
    devicePixelRatio: 1,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Simple performance benchmark
    const checkPerformance = () => {
      const start = performance.now();
      // Simple CPU benchmark
      for (let i = 0; i < 100000; i++) {
        Math.random() * Math.random();
      }
      const end = performance.now();
      return end - start > 10; // If it takes more than 10ms, consider it low performance
    };

    // Check connection speed
    const getConnectionSpeed = (): 'slow' | 'fast' | 'unknown' => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          return effectiveType === 'slow-2g' || effectiveType === '2g' ? 'slow' : 'fast';
        }
      }
      return 'unknown';
    };

    // Check if device has limited resources
    const checkDeviceCapabilities = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as any).deviceMemory || 4;
      
      // Consider low performance if less than 4 cores or less than 4GB RAM
      return hardwareConcurrency < 4 || deviceMemory < 4;
    };

    const updateMetrics = () => {
      setMetrics({
        isLowPerformance: checkPerformance() || checkDeviceCapabilities(),
        isReducedMotion: mediaQuery.matches,
        devicePixelRatio: window.devicePixelRatio || 1,
        connectionSpeed: getConnectionSpeed()
      });
    };

    updateMetrics();

    const handleChange = () => {
      updateMetrics();
    };

    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    // Re-check performance periodically
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        isLowPerformance: checkPerformance() || checkDeviceCapabilities()
      }));
    }, 30000); // Check every 30 seconds

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
      clearInterval(interval);
    };
  }, []);

  return metrics;
}