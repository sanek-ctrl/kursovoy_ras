export interface GoalInfo {
    id: number;
    description: string;
    onCreated: string;
    onUpdated: string;
    isActive: boolean;
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
    password: string;
    role: 'admin' | 'moderator' | 'user';
}