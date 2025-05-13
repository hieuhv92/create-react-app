import { FaBars } from "react-icons/fa";
import { useState } from "react";
import ProSideBar from "./SideBar";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Admin = (props) => {
    const [collapse, setCollapse] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <ProSideBar collapse />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapse(!collapse)} />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Admin;