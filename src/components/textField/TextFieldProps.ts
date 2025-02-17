import { LabelWeight } from "../../types/commonTypes";

type InfoType = 'info' | 'error' | 'success';

export interface TextFieldProps {
    labelText?: string;
    type?: React.HTMLInputTypeAttribute;
    info?: string;
    infoType?: InfoType;
    value?: string;
    onChange?: (value: string) => void;
    lblWeight?: LabelWeight;
};