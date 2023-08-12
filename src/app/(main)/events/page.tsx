'use client';

import { selectMe } from '@/store/global/global.slice';
import { useAppSelector } from '@/store/store';
import { MeInterface } from '@/typings/me.interface';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

export default function Events(): ReactElement {
  const { events } = useAppSelector(selectMe) as MeInterface;

  if (events.length === 1) {
    redirect(`/events/${events[0].id}`);
  }

  return (
    <Stack gap={4} alignItems={'center'}>
      {events?.map(event => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <Button variant={'contained'} color={'secondary'} sx={{ width: '100%', maxWidth: '500px' }}>
            <Typography variant={'h3'} textAlign={'center'} p={2}>
              {event.name}
            </Typography>
          </Button>
        </Link>
      ))}
    </Stack>
  );
}
