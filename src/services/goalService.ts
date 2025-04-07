import { createAsyncThunk } from '@reduxjs/toolkit';
import { Goals } from '../api/goals';
import { AsyncThunkOptions } from '../types/toolkitTypes';
import {
  GoalDto,
  AddGoalRequestDto,
  UpdateGoalRequestDto,
  CompleteGoalRequestDto
} from '../types/apiTypes';
import { RootState } from '../store';

const NAMESPACE = 'goal';

export const fetchGoals = createAsyncThunk<GoalDto[], boolean | undefined, AsyncThunkOptions>(
  `${NAMESPACE}/fetchGoals`,
  async (isActive, { rejectWithValue }) => {
    try {
      return await Goals.getGoals(isActive);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchGoalById = createAsyncThunk<GoalDto, number, AsyncThunkOptions>(
  `${NAMESPACE}/fetchGoalById`,
  async (id, { rejectWithValue }) => {
    try {
      return await Goals.getGoal(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createGoal = createAsyncThunk<GoalDto, AddGoalRequestDto, AsyncThunkOptions>(
  `${NAMESPACE}/createGoal`,
  async (goalData, { rejectWithValue }) => {
    try {
      const data = { ...goalData, isActive: true };
      return await Goals.addGoal(data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateGoal = createAsyncThunk<GoalDto, UpdateGoalRequestDto, AsyncThunkOptions>(
  `${NAMESPACE}/updateGoal`,
  async (goalData, { rejectWithValue }) => {
    try {
      return await Goals.editGoal(goalData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteGoal = createAsyncThunk<number, number, AsyncThunkOptions>(
  `${NAMESPACE}/deleteGoal`,
  async (id, { rejectWithValue }) => {
    try {
      await Goals.deleteGoal(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const completeGoal = createAsyncThunk<GoalDto, number, AsyncThunkOptions>(
  `${NAMESPACE}/completeGoal`,
  async (id, { rejectWithValue }) => {
    try {
      return await Goals.completeGoal(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
)

export const getGoalRecommendations = createAsyncThunk<string, number, AsyncThunkOptions>(
    `${NAMESPACE}/getRecommendations`,
    async (goalId, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      if (state.goal.cachedRecommendations[goalId]) {
        return state.goal.cachedRecommendations[goalId];
      }
      try {
        return await Goals.getGoalRecommendations(goalId);
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }

);