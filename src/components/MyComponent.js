import React from "react";

class MyComponent extends React.Component {
    state = { // the way that React controls data of Componment
        name: 'Hieu Ho',
        address: 'Saigon',
        age: 33
    } // State is only a javascript object
    render() {
        return (
            <div>My first name is {this.state.name} and I'm from {this.state.address}</div>
        );
    }
}

export default MyComponent;
