export interface ConfirmFormState {
    visible: boolean;
}

export enum ConfirmFormEnum {
    SET_VISIBLE = "SET_VISIBLE",
}

export interface SetConfirmFormAction {
    type: ConfirmFormEnum.SET_VISIBLE;
    payload: boolean;
}

export type ConfirmFormAction =
    SetConfirmFormAction