/**
 * Performance monitoring utilities
 * Zet DEBUG_PERF op true om ook in productie te monitoren
 */

// 🔧 Zet deze op true om performance monitoring te activeren
export const DEBUG_PERF = true;

const isDev = import.meta.env.DEV || DEBUG_PERF;

export const perf = {
  /**
   * Start een timer met een label
   */
  start(label: string) {
    if (!isDev) return;
    console.time(`⏱️ ${label}`);
    performance.mark(`${label}-start`);
  },

  /**
   * Stop een timer en log de tijd
   */
  end(label: string) {
    if (!isDev) return;
    console.timeEnd(`⏱️ ${label}`);
    performance.mark(`${label}-end`);
    try {
      performance.measure(label, `${label}-start`, `${label}-end`);
    } catch (e) {
      // Ignore if marks don't exist
    }
  },

  /**
   * Log data size
   */
  logSize(label: string, data: any) {
    if (!isDev) return;
    const size = JSON.stringify(data).length;
    console.log(`📦 ${label}:`, (size / 1024).toFixed(2), "KB");
  },

  /**
   * Log een custom metric
   */
  log(label: string, value?: any) {
    if (!isDev) return;
    if (value !== undefined) {
      console.log(`📊 ${label}:`, value);
    } else {
      console.log(`📊 ${label}`);
    }
  },

  /**
   * Meet de tijd van een async functie
   */
  async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    if (!isDev) return fn();

    this.start(label);
    const result = await fn();
    this.end(label);
    return result;
  },

  /**
   * Meet de tijd van een sync functie
   */
  measureSync<T>(label: string, fn: () => T): T {
    if (!isDev) return fn();

    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  },
};

/**
 * Hook om component lifecycle te meten
 */
export function usePerformanceMonitor(componentName: string) {
  if (!isDev) return;

  perf.log(`${componentName} - Component created`);

  // Return cleanup functie
  return () => {
    perf.log(`${componentName} - Component destroyed`);
  };
}
