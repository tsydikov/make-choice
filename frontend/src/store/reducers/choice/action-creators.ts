import {IChoice} from "../../../models/IChoice";
import {ChoiceActionEnum, SetChoicesAction} from "./types";
import {AppDispatch} from "../../index";
import ChoiceService from "../../../api/ChoiceService";

export const ChoiceActionCreators = {
    setChoices: (payload: IChoice[]): SetChoicesAction => ({type: ChoiceActionEnum.SET_CHOICES, payload}),
    fetchChoices: (userId: number) => async (dispatch: AppDispatch) => {
        try {
            const { data } = await ChoiceService.getAllChoices(userId)
            dispatch(ChoiceActionCreators.setChoices(data))
        } catch (e) {
            console.log(e)
        }
    },
    makeChoice: (choiceDto: IChoice) => async () => {
      try {
          await ChoiceService.makeChoice(choiceDto)
      } catch (e) {
          console.log(e)
      }
    }
}