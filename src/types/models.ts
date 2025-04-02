export interface GoalFile {
    id: number;
    systemName: string;
    displayName: string;
    goalId: number;
    uploadDate: string;
}

export interface GoalInfo {
    id: number;
    description: string;
    onCreated: string;
    onUpdated: string;
    isActive: boolean;
    files?: Array<GoalFile>; 
}

export interface Element {
    id: number;
    title: string;
    goalInfo: Array<GoalInfo>
}

export interface Partition {
    id: number;
    title: string;
    elements: Array<Element>;
}

export interface User {
    id: number;
    login: string;
    password?: string; 
    role: 'admin' | 'user';
}