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
                {this.props.algorithms.map((text, index) => 
                    <Button key={index + '-text'} variant="contained" color="primary" className="Button">
                        {text}
                    </Button>)} 
            </div>
        );
    }
}

export default AlgorithmButton;