import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto } from '../types/apiTypes';
import { AsyncThunkOptions } from '../types/toolkitTypes';
import { Auth } from '../api';

const NAMESPACE = 'user';

export const signIn = createAsyncThunk<LoginResponseDto, LoginRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signIn`,
    async(loginData, { rejectWithValue}) => {
        try {
            return await Auth.signIn(loginData);
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const signUp = createAsyncThunk<LoginResponseDto, RegistrationRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signUp`,
    async(registrationData, { rejectWithValue}) => {
        try {
            await Auth.signUp(registrationData);
            return await Auth.signIn({
                login: registrationData.login,
                password: registrationData.password
            });
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
