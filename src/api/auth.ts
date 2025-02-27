import { AxiosInstance } from './axiosInstance';

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

const signIn = async (loginData: LogimRequestDto) => 
    await axiosPost('/login', loginData) as LogimResponseDto;

const signUp = async(registrationData: RegistrationRequestDto) =>
    await axiosPost('/register', registrationData) as void;

export const Auth = {
    signIn,
    signUp
}