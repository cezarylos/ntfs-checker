'use client';

import { getRewardsLeft, selectRewardsLeft } from '@/store/global/global.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Typography from '@mui/material/Typography';
import { ReactElement, useEffect } from 'react';

interface Props {
  id: string;
}

export default function RewardsLeft({ id }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const rewardsLeft = useAppSelector(selectRewardsLeft);

  useEffect((): void => {
    dispatch(getRewardsLeft(id));
  }, [dispatch, id]);

  return rewardsLeft === undefined ? (
    <Typography variant={'h6'}>Ładowanie...</Typography>
  ) : (
    <Typography variant={'h6'}>
      Pozostało do odebrania:{' '}
      <Typography component={'span'} sx={{ fontSize: '2rem', fontWeight: 700 }} color={'secondary'}>
        {rewardsLeft}
      </Typography>{' '}
      szt.
    </Typography>
  );
}
