'use client';

import { EndpointsEnum } from '@/typings/endpoints.enum';
import { LocalStorageItemsEnum } from '@/typings/localStorageItems.enum';
import Typography from '@mui/material/Typography';
import { ReactElement, useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

interface Props {
  id: string;
}

export default function RewardsLeft({ id }: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [amountLeft, setAmountLeft] = useState<number | null>(null);

  useEffect((): void => {
    const init = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const {
          data: { rewardsLeft }
        } = (await axios.post('/api/' + EndpointsEnum.GET_REWARDS_LEFT, {
          eventId: id,
          adminJwt: localStorage.getItem(LocalStorageItemsEnum.JWT) as string
        })) as AxiosResponse<{ rewardsLeft: number }>;
        setAmountLeft(rewardsLeft);
      } finally {
        setIsLoading(false);
      }
    };
    init().finally();
  }, [id]);

  return isLoading && !amountLeft ? (
    <Typography variant={'h6'}>Ładowanie...</Typography>
  ) : (
    <Typography variant={'h6'}>
      Pozostało do odebrania:{' '}
      <Typography component={'span'} sx={{ fontSize: '2rem', fontWeight: 700 }} color={'secondary'}>
        {amountLeft}
      </Typography>{' '}
      szt.
    </Typography>
  );
}
