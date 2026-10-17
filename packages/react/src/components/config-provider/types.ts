import React from 'react';

export interface ConfigProviderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Optional CSS variable overrides. Keep this small and semantic; the token
   * package remains the source of truth.
   */
  theme?: Partial<{
    primary: string;
    background: string;
    surface: string;
    text: string;
    radius: string;
  }>;
}
