import { AccessTokenKey } from '../constants/commonConstants';
import { AxiosInstance } from './axiosInstance';
import { AddGoalResponseDto, EditGoalResponseDto } from '../types/apiTypes';

const {axiosDelete, axiosGet, axiosPut, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getGoals = async () => {
    await axiosGet('/api/Goals/all');
}

const addGoal = async (addGoalData: AddGoalResponseDto) => 
    await axiosPost('/api/Goals', addGoalData) as void;

const getGoal = async (id: string | number) => 
    await axiosPost(`/api/Goals/get?id=${id}`) as void;

const editGoal = async (editGoalData: EditGoalResponseDto) => 
    await axiosPut('/api/Goals', editGoalData) as void;

const deleteGoal = async (id: string | number) => 
    await axiosDelete(`/api/Goals?id=${id}`) as void;

export const Goals = {
    getGoals,
    getGoal,
    addGoal,
    editGoal,
    deleteGoal
}