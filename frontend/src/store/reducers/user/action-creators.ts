import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetLoginForDeleteAction,
    SetUserAction
} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import AuthService from "../../../api/AuthService";
import {ILogin} from "../../../models/ILogin";
import UserService from "../../../api/UserService";

const authorization = (dispatch: AppDispatch, data: IUser) => {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('login', data.login);
    localStorage.setItem('token', data.token);
    dispatch(AuthActionCreators.setUser(data));
    dispatch(AuthActionCreators.setIsAuth(true));
    dispatch(AuthActionCreators.setIsLoading(false));
}
export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setLoginForDelete: (payload: string) : SetLoginForDeleteAction => ({type: AuthActionEnum.SET_LOGIN_FOR_DELETE, payload}),
    getProfile: (login: string) => async (dispatch: AppDispatch) => {
        try {
            const {data} = await UserService.getProfile(login)
            dispatch(AuthActionCreators.setIsLoading(true));
            dispatch(AuthActionCreators.setUser({
                ...data,
                token: localStorage.getItem('token' || '')
            } as IUser));
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            console.log(e)
        }
    },
    login: (loginDto: ILogin) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const {data} = await AuthService.Login(loginDto)
            authorization(dispatch, data)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    },
    registration: (RegistrationDto: ILogin) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const {data} = await AuthService.Registration(RegistrationDto)
            authorization(dispatch, data)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('login')
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
    },
    deleteUser: (login: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            await UserService.delUser(login)
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при удалении'))
        }
    }
}
