import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Admin = (props) => {
    const [collapse, setCollapse] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapse={collapse} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapse(!collapse)} />
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>
        </div>
    )
}

export default Admin;