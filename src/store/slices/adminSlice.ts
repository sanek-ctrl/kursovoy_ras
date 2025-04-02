import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { UserDto } from '../../types/apiTypes';

interface AdminState {
    users: UserDto[];
    userGoals: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    users: [],
    userGoals: [],
    loading: false,
    error: null
};

type PendingAction = AnyAction & { type: string };
type FulfilledAction<T> = AnyAction & { payload: T };
type RejectedAction = AnyAction & { payload: string };

const isPendingAction = (action: AnyAction): action is PendingAction => {
    return action.type.endsWith('/pending');
};

const isFulfilledAction = <T>(action: AnyAction): action is FulfilledAction<T> => {
    return action.type.endsWith('/fulfilled');
};

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
    return action.type.endsWith('/rejected');
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearUserGoals(state) {
            state.userGoals = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPendingAction,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isRejectedAction,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addMatcher(
                (action): action is FulfilledAction<UserDto[]> => 
                    action.type === 'admin/fetchAllUsers/fulfilled',
                (state, action) => {
                    state.loading = false;
                    state.users = action.payload;
                }
            )
            
            .addMatcher(
                (action): action is FulfilledAction<any[]> => 
                    action.type === 'admin/fetchUserGoals/fulfilled',
                (state, action) => {
                    state.loading = false;
                    state.userGoals = action.payload;
                }
            )
            
            .addMatcher(
                (action): action is AnyAction => 
                    action.type === 'admin/promoteToAdmin/fulfilled',
                (state, action) => {
                    const userId = action.meta.arg;
                    const user = state.users.find(u => u.id === userId);
                    if (user) user.role = 'admin';
                    state.loading = false;
                }
            )
            
            .addMatcher(
                (action): action is AnyAction => 
                    action.type === 'admin/demoteFromAdmin/fulfilled',
                (state, action) => {
                    const userId = action.meta.arg;
                    const user = state.users.find(u => u.id === userId);
                    if (user) user.role = 'user';
                    state.loading = false;
                }
            );
    }
});

export const { clearUserGoals } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;