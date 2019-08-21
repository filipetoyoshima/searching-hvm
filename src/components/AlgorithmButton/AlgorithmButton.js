import React from 'react';
import Button from '@material-ui/core/Button';
import './AlgorithmButton.css'

class AlgorithmButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            algorithms: ["Busca Binaria","Busca Sequencial"]
        }
    }


    render() {
        return ( 
                this.state.algorithms.map( (text) => 
                <div>
                    <Button variant="contained" color="primary" className="Button">
                        {text}
                    </Button> 
                </div>
                )
           
        );
    }
}

export default AlgorithmButton;