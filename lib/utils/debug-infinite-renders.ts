import { useEffect, useRef } from 'react';

// Global render log
if (typeof window !== 'undefined') {
  (window as any).__RENDER_LOG = [];
}

// Debug hook to track renders and identify infinite loops
export function useRenderDebug(componentName: string, props?: Record<string, any>) {
  const renderCount = useRef(0);
  const previousProps = useRef<Record<string, any> | undefined>(undefined);
  const renderTimestamp = useRef<number>(Date.now());
  
  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - renderTimestamp.current;
    renderTimestamp.current = now;
    
    // Add to global render log
    if (typeof window !== 'undefined') {
      const log = (window as any).__RENDER_LOG;
      log.push({
        component: componentName,
        time: now,
        count: renderCount.current,
        timeSinceLastRender
      });
      // Keep only last 100 entries
      if (log.length > 100) {
        log.shift();
      }
    }
    
    // Log if we're rendering too frequently (more than 10 times in 1 second)
    if (renderCount.current > 10 && timeSinceLastRender < 100) {
      console.error(`[INFINITE RENDER WARNING] ${componentName} rendered ${renderCount.current} times. Last render was ${timeSinceLastRender}ms ago.`);
      console.trace('Render stack trace:');
    }
    
    // Log prop changes
    if (previousProps.current && props) {
      const changedProps: string[] = [];
      Object.keys(props).forEach(key => {
        if (previousProps.current![key] !== props[key]) {
          changedProps.push(key);
        }
      });
      
      if (changedProps.length > 0 && renderCount.current > 5) {
        console.warn(`[RENDER DEBUG] ${componentName} re-rendered due to prop changes:`, changedProps);
        changedProps.forEach(prop => {
          console.log(`  - ${prop}:`, previousProps.current![prop], '→', props[prop]);
        });
      }
    }
    
    previousProps.current = props ? { ...props } : undefined;
  });
  
  // Reset counter periodically to avoid false positives
  useEffect(() => {
    const timer = setTimeout(() => {
      if (renderCount.current > 50) {
        console.error(`[RENDER COUNT] ${componentName} rendered ${renderCount.current} times in the last 5 seconds`);
      }
      renderCount.current = 0;
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [componentName]);
}

// Hook to debug useEffect dependencies
export function useEffectDebug(
  effect: () => void | (() => void),
  deps: React.DependencyList,
  componentName: string,
  effectName: string
) {
  const previousDeps = useRef<React.DependencyList | undefined>(undefined);
  
  useEffect(() => {
    if (previousDeps.current) {
      const changedDeps: number[] = [];
      deps.forEach((dep, index) => {
        if (dep !== previousDeps.current![index]) {
          changedDeps.push(index);
        }
      });
      
      if (changedDeps.length > 0) {
        console.log(`[EFFECT DEBUG] ${componentName}.${effectName} triggered due to dependency changes at indices:`, changedDeps);
        changedDeps.forEach(index => {
          console.log(`  - [${index}]:`, previousDeps.current![index], '→', deps[index]);
        });
      }
    }
    
    previousDeps.current = [...deps];
    return effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

// Wrap setState to debug state updates
export function debugSetState<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  componentName: string,
  stateName: string
): React.Dispatch<React.SetStateAction<T>> {
  return (value: React.SetStateAction<T>) => {
    console.log(`[STATE DEBUG] ${componentName}.${stateName} updating:`, value);
    console.trace('State update stack trace:');
    setState(value);
  };
}