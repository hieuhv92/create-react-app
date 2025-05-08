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
    render() {
        return (
            <div>
                <AddUser handleAddNewUser={this.handleAddNewUser} />
                <br />
                <br />
                <DisplayInfo listUsers={this.state.listUsers} />
            </div>
        );
    }
}

export default MyComponent;
