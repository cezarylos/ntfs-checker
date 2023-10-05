import RewardsLeft from '@/components/rewardsLeft/rewardsLeft';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { ReactElement } from 'react';
import * as React from 'react';

export default function Event({ params: { id } }: { params: { id: string } }): ReactElement {
  return (
    <Stack sx={{ position: 'relative', flex: 1, paddingBottom: '7rem' }} justifyContent={'center'}>
      <Box sx={{ position: 'absolute', top: '-1rem', left: 0, right: 0, margin: 'auto', textAlign: 'center' }}>
        <RewardsLeft id={id} />
      </Box>
      <Link href={`/events/${id}/scanner`}>
        <Button variant={'contained'} color={'primary'} sx={{ width: '100%', maxWidth: '500px' }}>
          <Typography variant={'h3'} textAlign={'center'} p={2}>
            SKANUJ QR KOD
          </Typography>
        </Button>
      </Link>
    </Stack>
  );
}
