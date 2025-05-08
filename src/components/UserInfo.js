import React from "react";

class UserInfo extends React.Component {
    state = { // the way that React controls data of Componment
        name: 'Hieu Ho',
        address: 'Saigon',
        age: 33
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
        alert(this.state.name)
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

export default UserInfo;