import React from "react";
import Login from "../pages/Login";
import WorkCalendar from "../pages/WorkCalendar";
import Today from "../pages/Today";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    CALENDAR = '/',
    TODAY = '/today'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CALENDAR, exact: true, component: WorkCalendar},
    {path: RouteNames.TODAY, exact: true, component: Today}
]
