import React from 'react';
import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number_of_cells: 0,
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className='container'>
                <h1>Searching Game</h1>
                <label htmlFor="new-todo">
                    How many cells?
                </label>
                <br/>
                <input
                    id="new-todo"
                    onChange={this.handleChange}
                    value={this.state.text}
                    style={{
                        marginTop: 10
                    }}
                />
                <button>
                    Go!
                </button>
                
            </div>
        )
    };

    handleChange(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                text: e.target.value,
            });
        }
    }

    handleSubmit(e) {
    }
}

export default Home;
