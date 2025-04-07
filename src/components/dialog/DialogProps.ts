import { PropsWithChildren } from "react";

export interface DialogProps extends PropsWithChildren{
    className?: string;
    title: string;
    onCancel?: () => void;
    onSave?: (() => void) | null;
    open?: boolean;
    cancelButtonType?: 'primary' | 'secondary';
}