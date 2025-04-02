import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchGoals,
    fetchGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal
  } from '../../services/goalService';
import { GoalDto } from '../../types/apiTypes';

interface GoalState {
  goals: GoalDto[];
  activeGoals: GoalDto[];
  completedGoals: GoalDto[];
  selectedGoal: GoalDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  goals: [],
  activeGoals: [],
  completedGoals: [],
  selectedGoal: null,
  loading: false,
  error: null,
};

const isRejectedAction = (action: AnyAction): action is AnyAction & { payload: string } => {
  return action.type.endsWith('/rejected');
};

const isPendingAction = (action: AnyAction): action is AnyAction => {
  return action.type.endsWith('/pending');
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    clearSelectedGoal(state) {
      state.selectedGoal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<GoalDto[]>) => {
        state.loading = false;
        state.goals = action.payload;
        state.activeGoals = action.payload.filter(goal => goal.isActive);
        state.completedGoals = action.payload.filter(goal => !goal.isActive);
      })
      .addCase(fetchGoalById.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        state.selectedGoal = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        state.activeGoals.unshift(action.payload);
        state.goals.unshift(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        const { id } = action.payload;
        
        state.goals = state.goals.map(goal => 
          goal.id === id ? action.payload : goal
        );
        
        if (action.payload.isActive) {
          state.activeGoals = state.activeGoals.map(goal => 
            goal.id === id ? action.payload : goal
          );
        } else {
          state.completedGoals = state.completedGoals.map(goal => 
            goal.id === id ? action.payload : goal
          );
        }
        
        if (state.selectedGoal?.id === id) {
          state.selectedGoal = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<number>) => {
        const id = action.payload;
        state.goals = state.goals.filter(goal => goal.id !== id);
        state.activeGoals = state.activeGoals.filter(goal => goal.id !== id);
        state.completedGoals = state.completedGoals.filter(goal => goal.id !== id);
        
        if (state.selectedGoal?.id === id) {
          state.selectedGoal = null;
        }
      })
      .addCase(completeGoal.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        const completedGoal = action.payload;
        
        state.activeGoals = state.activeGoals.filter(goal => goal.id !== completedGoal.id);
        state.completedGoals.unshift(completedGoal);
        state.goals = state.goals.map(goal => 
          goal.id === completedGoal.id ? completedGoal : goal
        );
        
        if (state.selectedGoal?.id === completedGoal.id) {
          state.selectedGoal = completedGoal;
        }
      })
      
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { clearSelectedGoal } = goalSlice.actions;
export const goalReducer = goalSlice.reducer;