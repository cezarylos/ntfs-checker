'use client';

import { setMe } from '@/store/global/global.slice';
import { useAppDispatch } from '@/store/store';
import { LocalStorageItemsEnum } from '@/typings/localStorageItems.enum';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

export default function Logout(): ReactElement {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onLogout = (): void => {
    dispatch(setMe(null));
    localStorage.removeItem(LocalStorageItemsEnum.JWT);
    router.push('/login');
  };

  return (
    <Button onClick={onLogout} color={'secondary'} variant={'contained'}>
      Wyloguj
    </Button>
  );
}
