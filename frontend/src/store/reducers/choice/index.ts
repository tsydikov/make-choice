import {ChoiceAction, ChoiceActionEnum, ChoiceState} from "./types";

const initialState: ChoiceState = {
    choices: []
}

export default function ChoiceReducer(state = initialState, action: ChoiceAction): ChoiceState {
    switch (action.type) {
        case ChoiceActionEnum.SET_CHOICES:
            return {...state, choices: action.payload}
        default:
            return state;
    }
}