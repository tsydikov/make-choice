import {ConfirmFormAction, ConfirmFormEnum, ConfirmFormState} from "./types";

const initialState: ConfirmFormState = {
    visible: false
}

export default function ConfirmFormReducer(state = initialState, action: ConfirmFormAction): ConfirmFormState {
    switch (action.type) {
        case ConfirmFormEnum.SET_VISIBLE:
            return {...state, visible: action.payload}
        default:
            return state;
    }
}