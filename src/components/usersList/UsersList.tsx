import { FC } from 'react';
import { Button } from '../button';
import './usersListStyles.scss';

interface UsersListProps {
    usersList: Array<{
        id: number;
        login: string;
        role: 'admin' | 'user';
    }>;
    onMakeAdmin: (id: number) => void;
    onRemoveAdmin: (id: number) => void;
    onViewGoals: (id: number) => void;
    selectedUserId?: number | null;
    currentUserLogin?: string | null;
}

export const UsersList: FC<UsersListProps> = ({ 
    usersList, 
    onMakeAdmin, 
    onRemoveAdmin,
    onViewGoals,
    selectedUserId,
    currentUserLogin
}) => {
    return (
        <div className="users-list">
            {usersList.map(user => (
                <div 
                    key={user.id} 
                    className={`
                        users-list_item 
                        ${user.id === selectedUserId ? 'selected' : ''}
                        ${user.login === currentUserLogin ? 'current-user' : ''}
                    `}
                >
                    <div className="users-list_item-info">
                        <span><strong>ID:</strong> {user.id}</span>
                        <span><strong>Логин:</strong> {user.login}</span>
                        <span><strong>Роль:</strong> {user.role}</span>
                        {user.login === currentUserLogin && <span className="current-user-label">(Вы)</span>}
                    </div>
                    <div className="users-list_item_actions">
                        <Button
                            text="Просмотреть цели"
                            type="primary"
                            onClick={() => onViewGoals(user.id)}
                        />
                        
                        {user.login !== currentUserLogin && (
                            <>
                                {user.role === 'admin' ? (
                                    <Button
                                        text="Снять права администратора"
                                        type="secondary"
                                        onClick={() => onRemoveAdmin(user.id)}
                                    />
                                ) : (
                                    <Button
                                        text="Назначить администратором"
                                        type="secondary"
                                        onClick={() => onMakeAdmin(user.id)}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};