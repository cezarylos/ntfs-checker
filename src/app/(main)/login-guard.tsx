'use client';

import { getMe, selectMe, setIsLoading } from '@/store/global/global.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import * as React from 'react';

export default function LoginGuard({ children }: { children: React.ReactNode }): ReactElement {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const me = useAppSelector(selectMe);

  useEffect((): void => {
    const initData = async () => {
      if (me) {
        return;
      }
      try {
        dispatch(setIsLoading(true));
        await dispatch(getMe()).unwrap();
      } catch (e) {
        router.push('/login');
        console.error(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    initData().finally();
  }, [dispatch, me, router]);

  return me ? <>{children}</> : <></>;
}
