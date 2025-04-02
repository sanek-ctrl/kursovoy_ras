import { User } from "../../types/models";

export interface UsersListProps {
    usersList: Array<User>;
    onMakeAdmin: (id: number) => void;
    onRemoveAdmin: (id: number) => void;
    onViewGoals: (id: number) => void;
    selectedUserId?: number | null;
    currentUserId?: number | null; // Добавляем currentUserId
}