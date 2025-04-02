import { FC, useState } from 'react';
import { LayoutProps } from './LayoutProps';
import './layoutStyles.scss';
import { LogoIcon } from '../../../assets/icons/LogoIcon';
import { UserMenu } from '../../userMenu';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxToolkitHooks';
import { logOut } from '../../../store/slices/userSlice';
import { MenuItem } from '../../userMenu/UserMenuProps';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../../constants/commonConstants';

export const Layout: FC<LayoutProps> = (props) => {
    const { footer, headerChild, title, children } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Получаем данные пользователя из Redux store
    const { userName, role } = useAppSelector((state) => state.user);

    const logOutHandler = () => {
        dispatch(logOut());
        navigate(RoutesPaths.Login); // Перенаправляем на страницу входа после выхода
    };

    const goToAdministrationHandler = () => {
        navigate(RoutesPaths.Administration);
    };

    // Формируем пункты меню
    const menuItems: MenuItem[] = [
        ...(role === 'admin' ? [{
            id: 'administration',
            action: goToAdministrationHandler,
            label: 'Администрирование'
        }] : []),
        {
            id: 'exit',
            action: logOutHandler,
            label: 'Выйти'
        }
    ];

    return (
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? 'Личный дневник целей и достижений'}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout__user-menu">
                    <UserMenu 
                        username={userName || 'Пользователь'}
                        items={menuItems}
                    />
                </div>
            </div>
            <div className="layout__body">{children}</div>
            <div>{footer}</div>
        </div>
    );
};