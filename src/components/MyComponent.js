import React from "react";
import AddUser from "./AddUser";
import DisplayInfo from "./DisplayInfo";
import './DisplayInfo.scss';

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: 'Hieu', age: 15 },
            { id: 2, name: 'Cris', age: 33 },
            { id: 3, name: 'Dev', age: 35 }
        ]
    }
    handleAddNewUser = (userObject) => {
        this.setState({
            listUsers: [userObject, ...this.state.listUsers]
        })
    }
    handleDeleteUser = (userId) => {
        let restOfListUsers = this.state.listUsers;
        restOfListUsers = restOfListUsers.filter(item => {
            return item.id !== userId;
        })
        this.setState({
            listUsers: restOfListUsers
        })
    }

    render() {
        return (
            //Fragment
            <>
                <AddUser handleAddNewUser={this.handleAddNewUser} />
                <br />
                <br />
                <DisplayInfo listUsers={this.state.listUsers} handleDeleteUser={this.handleDeleteUser} />
            </>
        );
    }
}

export default MyComponent;
