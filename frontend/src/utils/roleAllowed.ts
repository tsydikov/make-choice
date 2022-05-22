import {IUser} from "../models/IUser";

export default function roleAllowed(roles: string[], user: IUser) {
    let allowed = false;
    if (user.roles) {
        user.roles.forEach(userRole => {
            roles.forEach((itemRole: string) => {
                if (userRole === itemRole) allowed = true
            })
        })
    }
    return allowed
}