import React, { useContext } from 'react';
import { ThemeContext } from '../../internal/ThemeContext';
import type { ConfigProviderProps } from './types';
export type { ConfigProviderProps } from './types';
export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  className,
  style,
  theme,
}) => {
  const inherited = useContext(ThemeContext);
  const variables = {
    ...inherited,
    ...(theme?.primary ? { '--cinna-color-primary': theme.primary } : null),
    ...(theme?.background ? { '--cinna-color-bg': theme.background } : null),
    ...(theme?.surface ? { '--cinna-color-surface': theme.surface } : null),
    ...(theme?.text ? { '--cinna-color-text': theme.text } : null),
    ...(theme?.radius ? { '--cinna-radius-md': theme.radius } : null),
    ...Object.fromEntries(
      Object.entries(style ?? {}).filter(
        ([key]) =>
          key.startsWith('--') ||
          ['color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'direction'].includes(
            key,
          ),
      ),
    ),
  } as React.CSSProperties;
  return (
    <ThemeContext.Provider value={variables}>
      <div data-cinna-theme="cloud" className={className} style={{ ...variables, ...style }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
ConfigProvider.displayName = 'ConfigProvider';
