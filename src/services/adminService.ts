import { createAsyncThunk } from '@reduxjs/toolkit';
import { Users } from '../api';
import { AsyncThunkOptions } from '../types/toolkitTypes';
import { UserDto } from '../types/apiTypes';

const NAMESPACE = 'admin';

export const fetchAllUsers = createAsyncThunk<UserDto[], void, AsyncThunkOptions>(
    `${NAMESPACE}/fetchAllUsers`,
    async (_, { rejectWithValue }) => {
        try {
            return await Users.getAllUsers();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const promoteToAdmin = createAsyncThunk<void, number, AsyncThunkOptions>(
    `${NAMESPACE}/promoteToAdmin`,
    async (userId, { rejectWithValue }) => {
        try {
            await Users.makeAdmin(userId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const demoteFromAdmin = createAsyncThunk<void, number, AsyncThunkOptions>(
    `${NAMESPACE}/demoteFromAdmin`,
    async (userId, { rejectWithValue }) => {
        try {
            await Users.removeAdmin(userId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchUserGoals = createAsyncThunk<any, number, AsyncThunkOptions>(
    `${NAMESPACE}/fetchUserGoals`,
    async (userId, { rejectWithValue }) => {
        try {
            return await Users.getUserGoals(userId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);