'use client';

import { selectIsLoading } from '@/store/global/global.slice';
import { useAppSelector } from '@/store/store';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function GlobalLoader(): ReactElement {
  const isLoading = useAppSelector(selectIsLoading);

  return isLoading ? (
    <Stack
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        bgcolor: 'secondary.main',
        pointerEvents: 'none'
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        src={'/logo1.gif'}
        width={0}
        height={0}
        alt={'Logo'}
        fill={false}
        priority
        sizes={'100vw'}
        style={{ width: 'auto', height: '7rem' }}
      />
      <Typography color={'warning'} variant={'h2'}>
        Ładowanie...
      </Typography>
    </Stack>
  ) : (
    <></>
  );
}
