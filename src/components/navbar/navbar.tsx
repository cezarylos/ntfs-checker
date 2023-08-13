import ThemeSwitch from '@/components/theme-switch/theme-switch';
import { AppBar, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ReactElement } from 'react';

import LogoutButton from '../logout-button/logout-button';

export default function Navbar(): ReactElement {
  return (
    <AppBar position="static">
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        height={64}
        alignItems={'center'}
        p={2}
        sx={{ position: 'relative' }}
      >
        <ThemeSwitch />
        <Typography
          variant="h4"
          textAlign={'center'}
          sx={{ position: 'absolute', left: 0, right: 0, width: 'fit-content' }}
          m={'auto'}
        >
          RealBrain
        </Typography>
        <LogoutButton />
      </Stack>
    </AppBar>
  );
}
