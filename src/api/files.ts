import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";

export const FilesApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? '';

    const { axiosGet, axiosPost, axiosDelete, axiosBlob } = AxiosInstance(token);

    const getGoalFiles = async (goalId: number) => 
        await axiosGet(`api/Files/goal/${goalId}`); 

    const uploadFile = async (data: { fileString: string, fileName: string, goalId: number }) => 
        await axiosPost('api/Files/upload', data);

    const downloadFile = async (data: { displayName: string, systemName: string }) => 
        await axiosBlob('api/Files/download', data);

    const deleteFile = async (fileId: number) => 
        await axiosDelete(`api/Files/delete/${fileId}`);

    return {
        getGoalFiles,
        uploadFile,
        downloadFile,
        deleteFile
    };
};