import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {IRoute, privateRoutes, publicRoutes, RouteNames} from "../../router";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.user);
    const routeComponent = (route: IRoute) => (
        <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
            key={route.path}
        />)
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route => routeComponent(route))}
                <Redirect to={RouteNames.CALENDAR}/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route => routeComponent(route))}
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    );
};

export default AppRouter;
