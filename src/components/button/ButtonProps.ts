export interface ButtonProps {
    text?: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary';
}