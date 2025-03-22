import { AccessTokenKey } from '../constants/commonConstants';
import { AxiosInstance } from './axiosInstance';
import { AddGoalResponseDto, EditGoalResponseDto } from '../types/apiTypes';

const { axiosDelete, axiosGet, axiosPut, axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getGoals = async (isActive?: boolean) => {
    const response = await axiosGet('/api/Goals/all', {
        params: { isActive } 
    });
    return response; 
};

const addGoal = async (addGoalData: AddGoalResponseDto) => {
    const response = await axiosPost('/api/Goals', addGoalData);
    return response; 
};

const getGoal = async (id: string | number) => {
    const response = await axiosPost('/api/Goals/get', { id }); 
    return response; 
};

const editGoal = async (editGoalData: EditGoalResponseDto) => {
    const response = await axiosPut('/api/Goals', editGoalData);
    return response; 
};

const deleteGoal = async (id: string | number) => {
    const response = await axiosDelete('/api/Goals', { data: { id } }); 
    return response;
};

const completeGoal = async (id: string | number) => {
    const response = await axiosPost('/api/Goals/complete', { id });
    return response;
};

export const Goals = {
    getGoals,
    getGoal,
    addGoal,
    editGoal,
    deleteGoal,
    completeGoal
};