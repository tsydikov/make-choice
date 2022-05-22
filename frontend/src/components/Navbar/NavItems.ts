import {RouteNames} from "../../router";
import {INavItem} from "../../models/INavItem";

const NavItems: INavItem[] = [
    {
        text: 'Calendar',
        path: RouteNames.CALENDAR,
        roleAloud: ['user', 'admin']
    },
    {
        text: 'Today',
        path: RouteNames.TODAY,
        roleAloud: ['admin']
    }
]

export default NavItems;