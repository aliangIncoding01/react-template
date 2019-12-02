import React from 'react';
import ReactDom from 'react-dom';

import Router from './router/index';


if (module.hot) {
    module.hot.accept(() => {
        renderApp(<Router />);
    });
}

renderApp(<Router />);

function renderApp(component) {
    ReactDom.render(
        component,
        document.getElementById('root')
    );
}
