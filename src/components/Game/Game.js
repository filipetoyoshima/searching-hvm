import React from 'react'

class Game extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>The game will happen here, with {this.props.n} numbers</div>
        )
    }
}

export default Game;
