import {IChoice} from "../../../models/IChoice";

export interface ChoiceState {
    choices: IChoice[];
}

export enum ChoiceActionEnum {
    SET_CHOICES = 'SET_CHOICES'
}

export interface SetChoicesAction {
    type: ChoiceActionEnum.SET_CHOICES,
    payload: IChoice[]
}

export type ChoiceAction =
    SetChoicesAction