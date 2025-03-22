export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    username: string;
    role: string;
}

export interface RegistrationRequestDto {
    login: string;
    password: string;
}

export interface AddGoalResponseDto {
    title: string,
    description: string
    isActive?: boolean; 
};

export interface EditGoalResponseDto {
    id: number,
    title?: string,
    description?: string
    isActive?: boolean; 
}