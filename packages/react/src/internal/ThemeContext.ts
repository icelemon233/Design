import { createContext, useContext, type CSSProperties } from 'react';

export const ThemeContext = createContext<CSSProperties>({});
export const usePortalTheme = () => useContext(ThemeContext);
