import { useCallback, useEffect, useState } from 'react';
import type { ComponentDocConfig } from '../types';
const loaders = import.meta.glob<Record<string, unknown>>('../docs/components/*.tsx');
const cache = new Map<string, ComponentDocConfig>();
export function useComponentDoc(route: string) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    route: string;
    config?: ComponentDocConfig;
    error?: string;
  }>({ route, config: cache.get(route) });
  useEffect(() => {
    if (route === 'button') return;
    let cancelled = false;
    const cached = cache.get(route);
    if (cached) {
      setState({ route, config: cached });
      return;
    }
    setState({ route });
    const loader = loaders['../docs/components/' + route + '.tsx'];
    const load = async () => {
      try {
        if (!loader) throw new Error('Documentation is unavailable.');
        const module = await loader();
        const config = Object.values(module).find(
          (value): value is ComponentDocConfig =>
            !!value && typeof value === 'object' && 'examples' in value,
        );
        if (!config) throw new Error('Documentation is unavailable.');
        cache.set(route, config);
        if (!cancelled) setState({ route, config });
      } catch (error) {
        if (!cancelled)
          setState({
            route,
            error: error instanceof Error ? error.message : 'Unable to load documentation.',
          });
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [route, attempt]);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  return {
    config: state.route === route ? state.config : cache.get(route),
    error: state.route === route ? state.error : undefined,
    retry,
  };
}
