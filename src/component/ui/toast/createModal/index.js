/**
 * Modal
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';

export default (className, name) => {
    if (typeof className !== 'string') {
        throw new Error(`[modal error]: invalid parameter className ${className}`);
    }
    const div = document.createElement('div');
    let removed = false;
    const hide = () => {
        if (removed) {
            return;
        }
        removed = true;
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };
    function show(content) {
        removed = false;
        document.body.appendChild(div);
        if (typeof content === 'string' || React.isValidElement(content)) {
            const component = React.createElement(Container, {className, content});
            ReactDOM.render(component, div);
        }
        else {
            throw new Error(`[${name || 'modal'} error]: invalid parameter content ${content}`);
        }
    }
    show.hide = hide;
    return show;
};
