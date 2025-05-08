import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: 'Hieu', age: 15 },
            { id: 2, name: 'Cris', age: 33 },
            { id: 3, name: 'Dev', age: 35 }
        ]
    }
    render() {
        return (
            <div>
                <UserInfo />
                <br />
                <br />
                <DisplayInfo listUsers={this.state.listUsers} />
            </div>
        );
    }
}

export default MyComponent;
