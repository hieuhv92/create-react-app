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

    handleOnchange = (event) => {
        // alert(event.target.value)
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        alert(this.state.name)
    }

    render() {
        return (
            <div>My first name is {this.state.name} and I'm from {this.state.address}
                {/* <button onClick={(event) => { this.handleClick(event) }}>Click Me</button> */}
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input type="text" onChange={(event) => { this.handleOnchange(event) }} />
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;
