'use client';

import NextAppDirEmotionCacheProvider from '@/components/ThemeRegistry/EmotionCache';
import GlobalStyles from '@/components/ThemeRegistry/globalStyles';
import typography from '@/components/ThemeRegistry/typography';
import store from '@/store/store';
import { ThemeOptions } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { createContext, ReactElement, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppLayout({ children }: { children: React.ReactNode }): ReactElement {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: {
        mode
      },
      typography
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);

  return (
    <Provider store={store}>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </NextAppDirEmotionCacheProvider>
    </Provider>
  );
}
