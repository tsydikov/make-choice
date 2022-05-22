import {AuthActionCreators} from "./user/action-creators";
import {ChoiceActionCreators} from "./choice/action-creators";
import {ConfirmFormActionCreators} from "./confirmForm/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...ChoiceActionCreators,
    ...ConfirmFormActionCreators,
}
