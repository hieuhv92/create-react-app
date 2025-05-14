import ModalCreateModal from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";

import { getAllUsers } from "../../../services/ApiServices"
import ModalUpdateModal from "./ModalUpdateUser";
const ManageUser = (props) => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});

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
    const handleClickBtnUpdate = (user) => {
        setShowUpdateUserModal(true);
        setDataUpdate(user);
    }
    const resetUpdateData = () => {
        setDataUpdate('');
    }
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowCreateUserModal(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateModal
                    show={showCreateUserModal}
                    setShow={setShowCreateUserModal}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateModal
                    show={showUpdateUserModal}
                    setShow={setShowUpdateUserModal}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}

export default ManageUser;
