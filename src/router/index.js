import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import routeConfig from './routeConfig';
import getRoutesView from './getRoutesView';

export default () => (
    <BrowserRouter>
        <div className="page">
            {getRoutesView(routeConfig)}
        </div>
    </BrowserRouter>
);