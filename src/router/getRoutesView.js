import React from 'react';
import {Route} from 'react-router-dom';

export default function getRoutesView (routes) {
    const result = renderRoutes(routes, '/');
    return result;
}

function renderRoutes(routes, contentPath) {
    if (!routes || !routes.length) {
        return;
    }
    const children = [];

    const renderRoute = (route, routeContextPath) => {
        const currentPath = route.path;
        // currentPath根据配置文件有可能是'/**',也有可能是'**'
        // 判断是否是'/'开头的绝对路径，是就用，不是就拼接成绝对路径
        let newPath = /^\//.test(currentPath)
            ? currentPath
            : `${routeContextPath}/${currentPath}`;
        // 确保只有一个'/'
        newPath = newPath.replace(/\/+/g, '/');

        if (route.component && route.childRoutes) {
            const childRoutes = renderRoutes(route.childRoutes, newPath);
            // 将子路由塞到父路由里面
            children.push(
                <Route
                    key={newPath}
                    path={newPath}
                    render={props => <route.component {...props}>{childRoutes}</route.component>}
                />
            );
        }
        else if (route.component) {
            children.push(
                <Route
                    key={newPath}
                    path={newPath}
                    component={route.component}
                    exact
                />
            );
        }
        else {
            route.childRoutes.forEach(r => renderRoute(r, newPath));
        }
    }

    routes.forEach(item => renderRoute(item, contentPath));
    return children;
}
