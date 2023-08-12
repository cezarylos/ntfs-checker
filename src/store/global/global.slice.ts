import { StrapiService } from '@/services/strapi.service';
import { AppState } from '@/store/store';
import { MeInterface } from '@/typings/me.interface';
import { Slices } from '@/typings/slices';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getMe = createAsyncThunk(`${Slices.GLOBAL}/getMe`, async (): Promise<MeInterface | null> => {
  try {
    return await StrapiService.getMe();
  } catch (e) {
    throw new Error(e as string);
  }
});

type SliceState = {
  isLoading: boolean;
  me: MeInterface | null;
};

const initialState = {
  isLoading: false,
  me: null
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
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.me = payload;
    });
  }
});

export const { setMe, setIsLoading } = globalSlice.actions;

export const selectIsLoading = (state: AppState) => state.global.isLoading;
export const selectMe = (state: AppState) => state.global.me;
// export const selectIsMyEventTokensLoading = (state: AppState) => state.global.isMyEventTokensLoading;
// export const selectEventSupplyData = (state: AppState) => state.global.eventTokensSupplyData;
// export const selectMyEventTokens = (state: AppState) => state.global.myEventTokens;
// export const selectIsShowWeb3BlockerModal = (state: AppState) => state.global.isShowWeb3BlockerModal;

export default globalSlice.reducer;
