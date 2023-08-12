'use client';

import FormProvider, { RHFTextField } from '@/components/hook-form';
import { StrapiService } from '@/services/strapi.service';
import { getMe } from '@/store/global/global.slice';
import { useAppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

enum LoginFormFields {
  IDENTIFIER = 'identifier',
  PASSWORD = 'password'
}

export interface LoginFormInterface {
  [LoginFormFields.IDENTIFIER]: string;
  [LoginFormFields.PASSWORD]: string;
}

export default function SignIn(): ReactElement {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = yup.object().shape({
    identifier: yup.string().required('Login lub email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane')
  });

  const methods = useForm<LoginFormInterface>({
    defaultValues: {
      [LoginFormFields.IDENTIFIER]: '',
      [LoginFormFields.PASSWORD]: ''
    },
    resolver: yupResolver(LoginSchema)
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = methods;

  const onSubmit = async (data: LoginFormInterface) => {
    try {
      await StrapiService.login(data);
      await dispatch(getMe());
      enqueueSnackbar('Zalogowano!', { variant: 'success' });
      router.push('/events');
    } catch (e: any) {
      enqueueSnackbar(e?.response?.data?.error?.message ?? 'Error', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }} sizes={'10vw'}></Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Stack sx={{ mt: 1 }} gap={2} minWidth={'100%'}>
            <RHFTextField
              id="email"
              fullWidth
              label="Login lub email"
              name={LoginFormFields.IDENTIFIER}
              autoComplete="login"
              autoFocus
            />
            <RHFTextField
              id="password"
              fullWidth
              label="Hasło"
              name={LoginFormFields.PASSWORD}
              autoComplete="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <LoadingButton
              id="submit"
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={!isValid}
              loading={isSubmitting}
              sx={{ height: 56, textTransform: 'none' }}
            >
              Zaloguj się
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
}
