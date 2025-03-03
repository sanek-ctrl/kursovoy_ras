import { AxiosInstance } from './axiosInstance';
import { AccessTokenKey } from '../constants/commonConstants';

const {axiosPost} = AxiosInstance();

interface LogimRequestDto {
    login: string;
    password: string;
}

interface LogimResponseDto {
    access_token: string;
    username: string;
    role: string;
}

interface RegistrationRequestDto {
    login: string;
    password: string;
}

const signIn = async (loginData: LogimRequestDto) => {
    const data = await axiosPost('/login', loginData) as LogimResponseDto;
    sessionStorage.setItem(AccessTokenKey, data.access_token);
    return data;
}

const signUp = async(registrationData: RegistrationRequestDto) =>
    await axiosPost('/register', registrationData) as void;

export const Auth = {
    signIn,
    signUp
}