import React from "react";

class MyComponent extends React.Component {
    state = { // the way that React controls data of Componment
        name: 'Hieu Ho',
        address: 'Saigon',
        age: 33
    } // State is only a javascript object

    handleClick(event) {
        // merge State => only React class
        this.setState({
            name: 'Cris',
            age: 50
        })
        // console.log(event.target)
    }

    render() {
        return (
            <div>My first name is {this.state.name} and I'm from {this.state.address}
                <button onClick={(event) => { this.handleClick(event) }}>Click Me</button>
            </div>
        );
    }
}

export default MyComponent;
