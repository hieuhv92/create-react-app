import { FaBars } from "react-icons/fa";
import { useState } from "react";
import ProSideBar from "./SideBar";

const Admin = (props) => {
    const [collapse, setCollapse] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <ProSideBar collapse />
            </div>
            <div className="admin-content">
                <FaBars onClick={() => setCollapse(!collapse)} />
            </div>
        </div>
    )
}

export default Admin;