import React from "react";

class DisplayInfo extends React.Component {
    state = {
        isShowListUser: true
    }
    handleShowHideListUser = (event) => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }
    render() {
        //pros => properties
        //destruturing array/object
        // const { name, age } = this.props;
        const { listUsers } = this.props;
        // console.table(listUsers)
        return (
            <div>
                <div>
                    <span onClick={(event) => { this.handleShowHideListUser(event) }}>{this.state.isShowListUser ? 'Hide' : 'Show'} list user</span>
                </div>
                {this.state.isShowListUser &&
                    < div >
                        {
                            listUsers.map((user) => {
                                return (
                                    <div key={user.id} className={+user.age > 34 ? 'red' : 'green'}>
                                        <div>My name's {user.name}</div>
                                        <div>My age's {user.age}</div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {/* <div>My name's {name}</div>
                <div>My age's {age}</div> */}
            </div >
        )
    }
}

export default DisplayInfo;