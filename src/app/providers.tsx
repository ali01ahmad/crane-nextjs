'use client';

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { client } from '../lib/apolloClient';
import { store } from '../store';

const theme = createTheme({
  // Your custom theme options (optional)
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <SessionProvider>
          <ReduxProvider store={store}>
            {children}
          </ReduxProvider>
        </SessionProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
