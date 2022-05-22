import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {$host} from "../http";
import {ILogin} from "../models/ILogin";

export default class AuthService {
    static async Login(userDto: ILogin): Promise<AxiosResponse<IUser>> {
        const data = await $host.post('auth/login', userDto)
        return data
    }
    static async Registration(userDto: ILogin): Promise<AxiosResponse<IUser>> {
        const data = await $host.post('auth/registration', userDto)
        return data
    }
}