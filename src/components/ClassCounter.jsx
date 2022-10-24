import React from 'react';

class ClassCounter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment(){
        this.setState({count: this.state.count + 1})
    }

    decrement(){
        if (this.state.count>0){
            this.setState({count: this.state.count - 1})
        }

    }

    render(){
        return (
            <div>
                <h1>RATING: {this.state.count}</h1>
                <button onClick={this.increment}>Like</button>
                <button onClick={this.decrement}>Dislike</button>
            </div>
        )
    }
};

export default ClassCounter;