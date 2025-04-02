// UserMenu.tsx
import { FC, useState } from 'react';
import { UserIcon } from '../../assets/icons';
import './userMenuStyles.scss';
import { UserMenuProps } from './UserMenuProps';

export const UserMenu: FC<UserMenuProps> = ({ items, username = 'Пользователь' }) => {
    const [show, setShow] = useState<boolean>(false);

    const showMenuHandler = () => {
        setShow(prev => !prev);
    }

    return (
        <div className='user-menu'>
            <div className="user-menu__header" onClick={showMenuHandler}>
                <span className="user-menu__username">{username}</span>
                <UserIcon className="user-menu__icon"/>
            </div>
            {show && (
                <>
                    <div className='user-menu__menu'>
                        {items.map((item) => (
                            <span 
                                className='user-menu__menu-item' 
                                key={item.id}
                                onClick={() => {
                                    item.action();
                                    setShow(false);
                                }}
                            >
                                {item.label}
                            </span>
                        ))}
                    </div>
                    <div className='user-menu__underlay' onClick={showMenuHandler} />
                </>
            )}
        </div>
    );
};