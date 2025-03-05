import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddGoalResponseDto, EditGoalResponseDto } from '../types/apiTypes';

const { axiosDelete, axiosGet, axiosPut, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getGoals = async () => {
    const response = await axiosGet('/Goals');
    return response;
};

const addGoal = async(addGoalData: AddGoalResponseDto) => {
    await axiosPost('/Goals/goal', addGoalData) as void;
}

const editGoal = async(editGoalData: EditGoalResponseDto) => {
    await axiosPut('/Goals/goal', editGoalData) as void;
}

const deleteGoal = async(id: string | number) => {
    await axiosDelete(`/Goals/goal?id=${id}`) as void;
}

export const Goals = {
    addGoal,
    editGoal,
    getGoals,
    deleteGoal
}
