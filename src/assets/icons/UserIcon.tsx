import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const UserIcon: FC<IconProps> = props => {

    const {
        className,
        color = '#ffffff',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        <svg fill={color} 
        width={width}
        height={height} 
        className={className}
        onClick={onClick}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg">
            <path d="M2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3ZM6.256,20a7,7,0,0,1,11.488,0ZM4,4H20V19.937a8.95,8.95,0,0,0-16,0Zm8,10a4,4,0,1,0-4-4A4,4,0,0,0,12,14Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,8Z"/>
        </svg>
    );
}