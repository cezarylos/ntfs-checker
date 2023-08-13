'use client';

import { setIsLoading } from '@/store/global/global.slice';
import { useAppDispatch } from '@/store/store';
import { EndpointsEnum } from '@/typings/endpoints.enum';
import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import axios from 'axios';

interface Props {
  id: string;
}

export default function Scanner({ id }: Props): ReactElement {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [encryptedAddress, setEncryptedAddress] = useState<string>('');

  const [rewards, setRewards] = useState<{ id: string; title: string }[]>([]);

  const [open, setOpen] = useState(false);

  const [isCollectAll, setIsCollectAll] = useState<boolean | null>(null);

  const handleClose = () => {
    setOpen(false);
    setIsCollectAll(null);
  };

  const onDecode = (result: string | null) => {
    if (!result) {
      return;
    }
    setEncryptedAddress(result);
  };

  const getRewards = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post('/api/' + EndpointsEnum.VALIDATE_QR_CODE, {
        encryptedAddress,
        eventId: id
      });
      setRewards(res.data);
    } catch (e: any) {
      enqueueSnackbar(e.response.data?.message, { variant: 'error' });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, encryptedAddress, id]);

  useEffect((): void => {
    if (!encryptedAddress) {
      return;
    }
    getRewards().finally();
  }, [encryptedAddress, getRewards]);

  const collectReward =
    (isAll: boolean): (() => void) =>
    (): void => {
      setOpen(true);
      setIsCollectAll(isAll);
    };

  const confirmCollectReward = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      await axios.post('/api/' + EndpointsEnum.COLLECT_REWARD, {
        ticketIds: isCollectAll ? rewards.map(({ id }) => id) : [rewards[0].id]
      });
      router.push(`/events/${id}`);
      enqueueSnackbar('Odebrane!', { variant: 'success' });
    } catch (e: any) {
      enqueueSnackbar(e.response.data?.message, { variant: 'error' });
      setOpen(false);
      await getRewards();
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, getRewards, id, isCollectAll, rewards, router]);

  return (
    <>
      <Stack
        sx={{ width: '100%', maxWidth: '500px', flexGrow: 1 }}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {!encryptedAddress && <QrScanner onDecode={onDecode} onError={error => console.log(error?.message)} />}
        {!!rewards.length && (
          <Stack alignItems={'center'} justifyContent={'center'}>
            <Stack alignItems={'center'} justifyContent={'center'} mb={2}>
              <Typography variant={'body1'} fontSize={'24px'}>
                Do odebrania:
              </Typography>
              <Typography variant={'subtitle1'} fontSize={'36px'}>
                {rewards.length} x {rewards[0].title}
              </Typography>
            </Stack>
            <Stack gap={4} alignItems={'center'} width={'100%'} mt={2}>
              <Button
                variant={'contained'}
                color={'success'}
                sx={{ width: '100%', textTransform: 'initial' }}
                onClick={collectReward(false)}
              >
                <Typography variant={'h3'} textAlign={'center'} p={2}>
                  Odbierz 1 szt.
                </Typography>
              </Button>
              {rewards.length > 1 && (
                <Button
                  variant={'contained'}
                  color={'success'}
                  sx={{ width: '100%', textTransform: 'initial' }}
                  onClick={collectReward(true)}
                >
                  <Typography variant={'h3'} textAlign={'center'} p={2}>
                    Odbierz {rewards.length} szt.
                  </Typography>
                </Button>
              )}
            </Stack>
          </Stack>
        )}
        {!!encryptedAddress && !rewards.length && (
          <Typography variant={'h3'} textAlign={'center'} mt={2}>
            Brak nagród do odebrania
          </Typography>
        )}
        <Link href={`/events/${id}`}>
          <Button variant={'contained'} color={'secondary'} sx={{ width: '200px', marginBottom: '16px' }}>
            <Typography variant={'h3'} textAlign={'center'} px={2}>
              Wróć
            </Typography>
          </Button>
        </Link>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', fontSize: '18px' }}>
          Czy na pewno chcesz odebrać {isCollectAll ? `${rewards.length}` : 1} szt. ?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button color={'error'} onClick={handleClose}>
            <Typography variant={'h5'} textAlign={'center'} px={1}>
              Anuluj
            </Typography>
          </Button>
          <Button color={'success'} onClick={confirmCollectReward} variant={'contained'}>
            <Typography variant={'h5'} textAlign={'center'} px={1}>
              Odbierz
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
