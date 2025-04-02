import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const DownloadIcon: FC<IconProps> = props => {
    const {
        className,
        color = 'currentColor',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            onClick={onClick}
            className={className}
            style={{ cursor: 'pointer' }}
        >
            <path 
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
            />
        </svg>
    );
};