import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";

interface AddGoalResponseDto {
    title: string;
    description: string;
}

interface EditGoalResponseDto {
    id: number;
    title: string;
    description: string;
}

const { axiosDelete, axiosGet, axiosPut, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');