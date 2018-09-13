import React, {Component} from 'react';
import './Error.css';

class Error extends Component {
    props = {
        text: '',
        show: false
    };

    render() {
        return (
            this.props.show &&
            <div className="error-block">
                <div className="error">{this.props.text}</div>
            </div>
        );
    }
}

export {Error};