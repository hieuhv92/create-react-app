import React, { useEffect, useState } from "react";
import logo from '../logo.svg';

//Class component => stateful
// class DisplayInfo extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         isShowListUser: true
//     //     }
//     // }

//     // componentDidMount() {
//     //     //Running: contructor => render => componentDidMount
//     //     setTimeout(() => {
//     //         document.title = 'Learning ReactJS'
//     //     }, 3000)
//     // }

//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     if (this.props.listUsers !== prevProps.listUsers) {

//     //     }
//     // }

//     // handleShowHideListUser = (event) => {
//     //     this.setState({
//     //         isShowListUser: !this.state.isShowListUser
//     //     })
//     // }
//     state = {
//         isShowListUser: true
//     }
//     render() {
//         //pros => properties
//         //destruturing array/object
//         // const { name, age } = this.props;
//         const { listUsers } = this.props;
//         // console.table(listUsers)
//         return (
//             <div className="display-info-container">
//                 {/* <img src={logo} /> */}
//                 {/* <div>
//                     <span onClick={(event) => { this.handleShowHideListUser(event) }}>{this.state.isShowListUser ? 'Hide' : 'Show'} list user</span>
//                 </div> */}
//                 {this.state.isShowListUser &&
//                     <>
//                         {
//                             listUsers.map((user) => {
//                                 return (
//                                     <div key={user.id} className={+user.age > 34 ? 'red' : 'green'}>
//                                         <div>My name's {user.name}</div>
//                                         <div>My age's {user.age}</div>
//                                         <div>
//                                             <button onClick={() => { this.props.handleDeleteUser(user.id) }}>x</button>
//                                         </div>
//                                         <hr />
//                                     </div>
//                                 )
//                             })
//                         }
//                     </>
//                 }
//                 {/* <div>My name's {name}</div>
//                 <div>My age's {age}</div> */}
//             </div >
//         )
//     }
// }

//Funcition Component => stateless
const DisplayInfo = (props) => {
    const { listUsers } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true); //destructuring assignment
    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    useEffect(() => {
        setTimeout(() => {
            document.title = 'Learning ReactJS'
        }, 3000)
    }, []) //run one time
    useEffect(() => { //render => useEffect
        if (listUsers.length === 0) {
            alert('You deleted all the users')
        }
    }, [listUsers])
    return (
        <div className="display-info-container">
            {/* <img src={logo} /> */}
            <div>
                <span onClick={() => { handleShowHideListUser() }}>{isShowHideListUser === true ? 'Hide' : 'Show'} list user</span>
            </div>
            {isShowHideListUser &&
                <>
                    {
                        listUsers.map((user) => {
                            return (
                                <div key={user.id} className={+user.age > 34 ? 'red' : 'green'}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <div>
                                        <button onClick={() => { props.handleDeleteUser(user.id) }}>x</button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </>
            }
            {/* <div>My name's {name}</div>
                <div>My age's {age}</div> */}
        </div >
    )
}

export default DisplayInfo;