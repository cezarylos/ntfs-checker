import LoginGuard from '@/app/(main)/login-guard';
import GlobalLoader from '@/components/global-loader/global-loader';
import Navbar from '@/components/navbar/navbar';
import { Stack } from '@mui/material';
import * as React from 'react';
import { ReactElement } from 'react';

export default function Layout({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <LoginGuard>
      <GlobalLoader />
      <Stack sx={{ flexGrow: 1, height: '100vh' }}>
        <Navbar />
        <Stack p={2} sx={{ flexGrow: 1 }}>
          {children}
        </Stack>
      </Stack>
    </LoginGuard>
  );
}
