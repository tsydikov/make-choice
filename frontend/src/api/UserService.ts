import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {$authHost} from "../http";

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        const data = await $authHost.get('users')
        return data
    }
    static async getProfile(login: string): Promise<AxiosResponse<IUser>> {
        const data = await $authHost.get(`users/profile/${login}`)
        return data
    }
    static async delUser(login: string): Promise<AxiosResponse<IUser>> {
        const data = await $authHost.delete(`users/${login}`)
        return data
    }
}
