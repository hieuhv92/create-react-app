import React from "react";

class DisplayInfo extends React.Component {
    render() {
        //pros => properties
        //destruturing array/object
        // const { name, age } = this.props;
        const { listUsers } = this.props;

        return (
            <div>
                {listUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
                {/* <div>My name's {name}</div>
                <div>My age's {age}</div> */}
            </div>
        )
    }
}

export default DisplayInfo;