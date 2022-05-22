import UserService from "../../api/UserService";
import {IListItemData} from "../../models/IListItemData";
import ChoiceService from "../../api/ChoiceService";

export async function getTodayChoices() {
    const response = await UserService.getUsers();
    const todayChoices: IListItemData[] = []
    await Promise.all(response.data.map(async (user) => {
        await ChoiceService.getTodayChoice(user.userId)
            .then(({data}) => {
                todayChoices.push({
                    login: user.login,
                    description: data.description
                });
            }).catch((e) => {
                if (e?.response?.data.message === 'No choice today')
                    todayChoices.push({
                        login: user.login,
                        description: 'o'
                    });
            })
    }));
    return todayChoices;
}

export interface TodayListState {
    initLoading: boolean;
    loading?: boolean;
    data: IListItemData[];
    list: IListItemData[];
}