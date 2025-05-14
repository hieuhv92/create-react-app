import ModalCreateModal from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";

import { getAllUsers } from "../../../services/ApiServices"
const ManageUser = (props) => {
    const [showCreateUserModal, setMhowCreateUserModal] = useState(false);
    const [listUsers, setListUsers] = useState([]);
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
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setMhowCreateUserModal(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers={listUsers} />
                </div>
                <ModalCreateModal
                    show={showCreateUserModal}
                    setShow={setMhowCreateUserModal}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}

export default ManageUser;
