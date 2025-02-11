import { FC } from 'react';

interface IconProps {
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export const LogoIcon: FC<IconProps> = props => {

    const {
        className,
        color = '#ffffff',
        height = 28,
        width = 28,
        onClick
    } = props;

    return (
            <svg width={width} height={height}
            className={className}
            onClick={onClick}
            fill={color}
            version="1.1" 
            id="Layer_1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" xmlSpace="preserve">
                <g>
                    <g>
                        <rect x="56.363" y="138.124" width="106.805" height="30.417"/>
                    </g>
                </g>
                <g>
                    <g>
                        <rect x="56.363" y="191.729" width="158.484" height="30.417"/>
                    </g>
                </g>
                <g>
                    <g>
                        <rect x="56.363" y="245.325" width="158.484" height="30.417"/>
                    </g>
                </g>
                <g>
                    <g>
                        <rect x="56.363" y="298.92" width="158.484" height="30.417"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M389.519,46.834h-26.246h-30.417H0v373.799h332.857v44.533l43.539-24.355l43.54,24.355v-44.533H512V46.834h-92.064
                            H389.519z M240.792,390.216H30.417V77.251h210.375V390.216z M332.857,138.127h-35.701v30.417h35.701v23.181h-35.701v30.417h35.701
                            v23.181h-35.701v30.417h35.701v23.181h-35.701v30.417h35.701v60.876h-61.648V77.251h61.648V138.127z M389.52,413.299
                            l-13.123-7.341l-13.123,7.34V77.251h26.246V413.299z M481.583,390.216h-61.647V329.34h35.7v-30.417h-35.7v-23.181h35.7v-30.417
                            h-35.7v-23.181h35.7v-30.417h-35.7v-23.181h35.7v-30.417h-35.7V77.251h61.647V390.216z"/>
                    </g>
                </g>
        </svg>

    );
}