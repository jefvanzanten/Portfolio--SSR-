import { onMount, onCleanup } from "solid-js";
import { perf, DEBUG_PERF } from "../utils/performance";

const isDebugEnabled = import.meta.env.DEV || DEBUG_PERF;

export function useRoutePerformance(routeName: string) {
  if (!isDebugEnabled) return;

  onMount(() => {
    const navTiming = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navTiming) {
      const ttfb = navTiming.responseStart - navTiming.requestStart;
      const domReady =
        navTiming.domContentLoadedEventEnd - navTiming.fetchStart;
      const loadComplete = navTiming.loadEventEnd - navTiming.fetchStart;

      perf.log(`${routeName} - Time to First Byte`, `${ttfb.toFixed(0)}ms`);
      perf.log(`${routeName} - DOM Ready`, `${domReady.toFixed(0)}ms`);
      perf.log(`${routeName} - Load Complete`, `${loadComplete.toFixed(0)}ms`);
    }

    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];
    const jsResources = resources.filter((r) => r.name.includes(".js"));
    const cssResources = resources.filter((r) => r.name.includes(".css"));

    const totalJsSize = jsResources.reduce(
      (sum, r) => sum + (r.transferSize || 0),
      0
    );
    const totalCssSize = cssResources.reduce(
      (sum, r) => sum + (r.transferSize || 0),
      0
    );

    perf.log(
      `${routeName} - Total JS loaded`,
      `${(totalJsSize / 1024).toFixed(2)} KB`
    );
    perf.log(
      `${routeName} - Total CSS loaded`,
      `${(totalCssSize / 1024).toFixed(2)} KB`
    );

    const slowResources = resources
      .filter((r) => r.duration > 100)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    if (slowResources.length > 0) {
      console.group(`🐌 ${routeName} - Slowest resources`);
      slowResources.forEach((r) => {
        const filename = r.name.split("/").pop();
        perf.log(
          filename || r.name,
          `${r.duration.toFixed(0)}ms (${((r.transferSize || 0) / 1024).toFixed(
            2
          )} KB)`
        );
      });
      console.groupEnd();
    }

    perf.log(`${routeName} - Component mounted`);
  });

  onCleanup(() => {
    perf.log(`${routeName} - Component unmounted`);
  });
}
