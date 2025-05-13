import { useState } from "react";
import ModalCreateModal from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
const ManageUser = (props) => {
    const [showCreateUserModal, setMhowCreateUserModal] = useState(false);
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setMhowCreateUserModal(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">
                    Table User
                </div>
                <ModalCreateModal show={showCreateUserModal} setShow={setMhowCreateUserModal} />
            </div>
        </div>
    )
}

export default ManageUser;
