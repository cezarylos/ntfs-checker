import { StrapiService } from '@/services/strapi.service';
import { AppState } from '@/store/store';
import { EndpointsEnum } from '@/typings/endpoints.enum';
import { LocalStorageItemsEnum } from '@/typings/localStorageItems.enum';
import { MeInterface } from '@/typings/me.interface';
import { Slices } from '@/typings/slices';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

export const getMe = createAsyncThunk(`${Slices.GLOBAL}/getMe`, async (): Promise<MeInterface | null> => {
  try {
    return await StrapiService.getMe(localStorage.getItem(LocalStorageItemsEnum.JWT) as string);
  } catch (e) {
    throw new Error(e as string);
  }
});

export const getRewardsLeft = createAsyncThunk(
  `${Slices.GLOBAL}/getRewardsLeft`,
  async (eventId: string): Promise<number | undefined> => {
    try {
      const {
        data: { rewardsLeft }
      } = (await axios.post('/api/' + EndpointsEnum.GET_REWARDS_LEFT, {
        eventId,
        adminJwt: localStorage.getItem(LocalStorageItemsEnum.JWT) as string
      })) as AxiosResponse<{ rewardsLeft: number }>;
      return rewardsLeft;
    } finally {
      setIsLoading(false);
    }
  }
);

type SliceState = {
  isLoading: boolean;
  me: MeInterface | null;
  rewardsLeft: number | undefined;
};

const initialState = {
  isLoading: false,
  me: null,
  rewardsLeft: undefined
} as SliceState;

export const globalSlice = createSlice({
  name: Slices.GLOBAL,
  initialState,
  reducers: {
    setIsLoading: (state: SliceState, { payload }: PayloadAction<boolean>): void => {
      state.isLoading = payload;
    },
    setMe: (state: SliceState, { payload }: PayloadAction<MeInterface | null>): void => {
      state.me = payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.me = payload;
      })
      .addCase(getRewardsLeft.fulfilled, (state, { payload }) => {
        state.rewardsLeft = payload;
      });
  }
});

export const { setMe, setIsLoading } = globalSlice.actions;

export const selectIsLoading = (state: AppState) => state.global.isLoading;
export const selectMe = (state: AppState) => state.global.me;
export const selectRewardsLeft = (state: AppState) => state.global.rewardsLeft;

export default globalSlice.reducer;
