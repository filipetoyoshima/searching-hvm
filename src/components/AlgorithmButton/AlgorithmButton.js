import React from 'react';
import Button from '@material-ui/core/Button';
import './AlgorithmButton.css'

class AlgorithmButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <Button variant="contained" color="primary" className="Button" onClick={this.props.onClick}>
                    {this.props.text}
                </Button>
            </div>
        );
    }
}

export default AlgorithmButton;