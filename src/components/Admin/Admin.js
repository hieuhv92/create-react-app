import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Languages from '../Header/Languages';

const Admin = (props) => {
    const [collapse, setCollapse] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapse={collapse} />
            </div>
            <div className="admin-content">
                <div className="admin-header">

                    <span className="left-side" onClick={() => setCollapse(!collapse)}> <FaBars /></span>
                    <div className="right-side">
                        <Languages />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>

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