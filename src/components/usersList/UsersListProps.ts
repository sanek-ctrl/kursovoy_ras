import { User } from "../../types/models";

export interface UsersListProps {
    usersList: Array<User>;
    onSetAdminRole: (id: number) => void;
    onResetPermissions: (id: number) => void;
}