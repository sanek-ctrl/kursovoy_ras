import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from '../../services';
import { stat } from 'fs';

const NAME = 'user';

interface UserState {
    loading: boolean;
    accessToken?: string | null;
    userName?: string | null;
    role?: string | null;
    userError?: string | null;
}

const initialState: UserState = {
    loading: false,
    accessToken: '',
    role: '',
    userName: ''

}

const isLoading = (action: AnyAction) => action.type.endsWith('pending');
const isError = (action: AnyAction) => action.type.endsWith('rejected');

const userSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access_token;
                state.userName = action.payload.username;
                state.role = action.payload.role;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access_token;
                state.userName = action.payload.username;
                state.role = action.payload.role;
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.userError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.userError = action.payload;
            })
    }
});

export const userReducer = userSlice.reducer;