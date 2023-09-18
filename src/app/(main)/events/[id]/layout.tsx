import RewardsLeft from '@/components/rewardsLeft/rewardsLeft';
import { StrapiService } from '@/services/strapi.service';
import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ReactElement } from 'react';

export default async function Layout({
  children,
  params: { id }
}: {
  children: React.ReactNode;
  params: { id: string };
}): Promise<ReactElement> {
  const eventResponse = await StrapiService.getEventById(id);

  const { name } = eventResponse.data.attributes;

  return (
    <Stack sx={{ flexGrow: 1 }} alignItems={'center'}>
      <Typography variant={'h3'} textAlign={'center'} mb={2}>
        {name}
      </Typography>
      <RewardsLeft id={id} />
      <Stack sx={{ flexGrow: 1, width: '100%' }} alignItems={'center'}>
        {children}
      </Stack>
    </Stack>
  );
}
