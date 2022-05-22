import {ReactElement} from "react";

export interface IMenuItem {
    label: string;
    key: string;
    icon?: ReactElement;
}

export const initialMenuItem = [{ label: '', key: 'item-1' }]