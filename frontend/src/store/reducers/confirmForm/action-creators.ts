import {ConfirmFormEnum, SetConfirmFormAction} from "./types";

export const ConfirmFormActionCreators = {
    setConfirmFormVisible: (payload: boolean): SetConfirmFormAction => ({type: ConfirmFormEnum.SET_VISIBLE, payload})
}