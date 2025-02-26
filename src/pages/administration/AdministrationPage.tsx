import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { UsersList } from '../../components/usersList';
import { User } from '../../types/models';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import './administrationPageStyles.scss';

const staticUserListData: Array<User> = [
    {
        id: 1,
        login: 'user',
        password: '1234',
        role: 'user'
    },
    {
        id: 2,
        login: 'admin',
        password: 'admin',
        role: 'admin'
    },
];

export const AdministrationPage: FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setUsers(staticUserListData);
        }, 500);
    }, []);

    const setAdminRoleHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u => u.id === id);
            if (currentUser) {
                currentUser.role = 'admin';
            }
            return cloneArray;
        });
    };

    const resetPermissionsHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u => u.id === id);
            if (currentUser) {
                currentUser.role = 'user';
            }
            return cloneArray;
        });
    };

    return (
        <Layout title="Администрирование">
            <div className="administration-page">
                <div className="administration-page__header">
                    <Button
                        text="На главную"
                        onClick={() => navigate(`/${RoutesPaths.Main}`)}
                        className="navigate-btn"
                        type="primary"
                    />
                </div>
                <div className="administration-page__content">
                    <UsersList
                        onSetAdminRole={setAdminRoleHandler}
                        onResetPermissions={resetPermissionsHandler}
                        usersList={users}
                    />
                </div>
            </div>
        </Layout>
    );
};