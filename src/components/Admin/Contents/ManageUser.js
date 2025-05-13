import ModalCreateModal from "./ModalCreateUser";

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">ManageUser Page</div>
            <div className="user-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table User
                    <ModalCreateModal />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;
