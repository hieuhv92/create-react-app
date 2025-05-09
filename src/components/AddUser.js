import React, { useState } from "react";

// class AddUser extends React.Component {
//     state = { // the way that React controls data of Componment
//         name: '',
//         address: 'Saigon',
//         age: ''
//     } // State is only a javascript object

//     handleOnchangeName = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }

//     handleOnchangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1),
//             name: this.state.name,
//             age: this.state.age
//         })
//     }
//     render() {
//         return (
//             <div> My first name is {this.state.name} and I'm {this.state.age} years old
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <label>Your Name:</label>
//                     <input value={this.state.name} type="text" onChange={(event) => { this.handleOnchangeName(event) }} />

//                     <label>Your Age:</label>
//                     <input value={this.state.age} type="text" onChange={(event) => { this.handleOnchangeAge(event) }} />
//                     <button onClick={(event) => { this.handleOnSubmit(event) }}>submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUser = (props) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('Saigon');
    const [age, setAge] = useState('');

    const handleOnchangeName = (event) => {
        // this.setState({
        //     name: event.target.value
        // })
        setName(event.target.value)
    }

    const handleOnchangeAge = (event) => {
        // this.setState({
        //     age: event.target.value
        // })
        setAge(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: name,
            age: age
        })
    }
    return (
        <div> My first name is {name} and I'm {age} years old
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Your Name:</label>
                <input value={name} type="text" onChange={(event) => handleOnchangeName(event)} />

                <label>Your Age:</label>
                <input value={age} type="text" onChange={(event) => handleOnchangeAge(event)} />
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddUser;