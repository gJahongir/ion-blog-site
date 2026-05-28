'use client';

import React, { useState, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from './create-emotion-cache';
import { ThemeContextProvider } from './context/ThemeContext';

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a simple div during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeContextProvider>
        <CssBaseline />
        {children}
      </ThemeContextProvider>
    </CacheProvider>
  );
}
