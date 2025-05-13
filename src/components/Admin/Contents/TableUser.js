import { useEffect, useState } from "react";

import { getAllUsers } from "../../../services/ApiServices"

const TableUser = () => {
    const [listUsers, setListUsers] = useState([
        {
            "id": 11,
            "username": "33333",
            "email": "aa@gmail.com",
            "role": "USER"
        }, {
            "id": 10,
            "username": "1111",
            "email": "adad@yopmail.com",
            "role": "USER",
        }
    ]);

    //componentDidmount - run after render
    useEffect(() => {
        fetchListUsers();
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-2">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length == 0 &&
                        <tr><td colSpan={4}>Not Found Data</td></tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;