import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        return (
            <div className="react-demo">
                <h1>Hello React! Hello React Router!</h1>
                <div>
                    <Link to="/app/categoryone">categoryOne</Link>
                </div>
                <div>
                    <Link to="/app/categorytwo">categoryTwo</Link>
                </div>
                { this.props.children }
            </div>
        )
    }
};