import {IChoice} from "../models/IChoice";
import {AxiosResponse} from "axios";
import {$authHost} from "../http";

export default class ChoiceService {
    static async makeChoice(choiceDto: IChoice): Promise<AxiosResponse<IChoice>> {
        const data = await $authHost.post('choice', choiceDto)
        return data
    }
    static async getAllChoices(userId: number): Promise<AxiosResponse<IChoice[]>> {
        const data = await $authHost.get(`choice/${userId}`)
        return data
    }
    static async getTodayChoice(userId: number): Promise<AxiosResponse<IChoice>> {
        const data = await $authHost.get(`choice/today/${userId}`)
        return data
    }
}