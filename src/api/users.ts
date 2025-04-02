import { AccessTokenKey } from '../constants/commonConstants';
import { AxiosInstance } from './axiosInstance';
import { UserDto } from '../types/apiTypes';

const { axiosGet, axiosPost, axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

export const getAllUsers = async (): Promise<UserDto[]> => {
    const response = await axiosGet('/api/Users');
    return response;
};

export const makeAdmin = async (id: number): Promise<void> => {
    await axiosPost(`/api/Users/${id}/make-admin`);
};

export const removeAdmin = async (id: number): Promise<void> => {
    await axiosPost(`/api/Users/${id}/remove-admin`);
};

export const getUserGoals = async (id: number): Promise<any> => {
    const response = await axiosGet(`/api/Users/${id}/goals`);
    return response;
};

export const Users = {
    getAllUsers,
    makeAdmin,
    removeAdmin,
    getUserGoals
};