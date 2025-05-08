import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <UserInfo />
                <br />
                <br />
                <DisplayInfo name="Hieu" age="30" />
                <hr />
                <DisplayInfo name={"Ho"} age={50} />
            </div>
        );
    }
}

export default MyComponent;
