import { AppBar, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ReactElement } from 'react';

import LogoutButton from '../logout-button/logout-button';

export default function Navbar(): ReactElement {
  return (
    <AppBar position="static">
      <Stack justifyContent={'space-between'} direction={'row'} height={64} alignItems={'center'} p={2}>
        <Typography variant="h4">RealBrain</Typography>
        <LogoutButton />
      </Stack>
    </AppBar>
  );
}
