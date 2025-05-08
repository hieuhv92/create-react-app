import React from "react";

class AddUser extends React.Component {
    state = { // the way that React controls data of Componment
        name: '',
        address: 'Saigon',
        age: ''
    } // State is only a javascript object

    handleOnchangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnchangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <div> My first name is {this.state.name} and I'm {this.state.age} years old
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <label>Your Name:</label>
                    <input value={this.state.name} type="text" onChange={(event) => { this.handleOnchangeName(event) }} />

                    <label>Your Age:</label>
                    <input value={this.state.age} type="text" onChange={(event) => { this.handleOnchangeAge(event) }} />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default AddUser;