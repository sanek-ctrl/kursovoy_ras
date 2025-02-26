import { FC } from 'react';
import { UsersListProps } from './UsersListProps';
import { Button } from '../button';
import './usersListStyles.scss';

export const UsersList: FC<UsersListProps> = props => {
    const {
        onResetPermissions,
        onSetAdminRole,
        usersList,
    } = props;

    return (
        <div className="users-list">
            {usersList.map(user => (
                <div key={user.id} className="users-list_item">
                    <div className="users-list_item-info">
                        <span>
                            <strong>Логин: </strong>
                            <span>{user.login}</span>
                        </span>
                        <span>
                            <strong>Пароль: </strong>
                            <span>{user.password}</span>
                        </span>
                        <span>
                            <strong>Роль: </strong>
                            <span>{user.role}</span>
                        </span>
                    </div>
                    <div className="users-list_item_actions">
                        <Button
                            text="Сделать администратором"
                            type="primary"
                            onClick={() => onSetAdminRole(user.id)}
                        />
                        <Button
                            text="Убрать права"
                            type="secondary"
                            onClick={() => onResetPermissions(user.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};