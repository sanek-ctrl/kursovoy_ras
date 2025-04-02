import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { UsersList } from '../../components/usersList';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths, UserNameKey } from '../../constants/commonConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import {
    fetchAllUsers,
    promoteToAdmin,
    demoteFromAdmin,
    fetchUserGoals
} from '../../services/adminService';
import './administrationPageStyles.scss';

export const AdministrationPage: FC = () => {
    const dispatch = useAppDispatch();
    const { users, userGoals, loading, error } = useAppSelector((state) => state.admin);
    const { userName } = useAppSelector((state) => state.user);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleMakeAdmin = (id: number) => {
        dispatch(promoteToAdmin(id));
    };

    const handleRemoveAdmin = (id: number) => {
        dispatch(demoteFromAdmin(id));
    };

    const handleViewGoals = async (id: number) => {
        setSelectedUserId(id);
        await dispatch(fetchUserGoals(id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout title="Администрирование">
            <div className="administration-page">
                <div className="administration-page__header">
                    <Button
                        text="На главную"
                        onClick={() => navigate(`${RoutesPaths.Main}`)}
                        className="navigate-btn"
                        type="primary"
                    />
                </div>
                <div className="administration-page__content">
                    <div className="users-section">
                        <UsersList
                            usersList={users}
                            onMakeAdmin={handleMakeAdmin}
                            onRemoveAdmin={handleRemoveAdmin}
                            onViewGoals={handleViewGoals}
                            selectedUserId={selectedUserId}
                            currentUserLogin={userName}
                        />
                    </div>
                    
                    <div className="goals-section">
                        {selectedUserId ? (
                            <>
                                <h3>Цели пользователя #{selectedUserId}</h3>
                                {userGoals.length === 0 ? (
                                    <p>У пользователя нет целей</p>
                                ) : (
                                    <ul className="goals-list">
                                        {userGoals.map((goal) => (
                                            <li key={goal.id} className="goal-item">
                                                <h4>{goal.title}</h4>
                                                <p>{goal.description}</p>
                                                <div className="goal-status">
                                                    Статус: {goal.isActive ? 'Активна' : 'Завершена'}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <div className="empty-state">
                                Нажмите "Просмотреть цели" для отображения списка
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};