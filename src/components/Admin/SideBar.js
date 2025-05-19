// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Admin.scss';
// import { FaGem, FaHeart, FaGithub } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { MdDashboard } from "react-icons/md";
import { PiListDashesFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

const SideBar = (props) => {

    return (
        <>
            <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
                <Sidebar
                    collapsed={props.collapse}
                    collapsedWidth="60px"
                    transitionDuration={1000}
                    // image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
                    backgroundColor="#bcf3ff"
                >
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                // only apply styles on first level elements of the tree
                                if (level === 0)
                                    return {
                                        color: disabled ? '#f5d9ff' : '#d359ff',
                                        backgroundColor: active ? '#eecef9' : undefined,
                                    };
                            },
                        }}
                    ></Menu>
                    <Menu>
                        <MenuItem icon={<MdDashboard />} component={<Link to="/admin" />}> Dashboard </MenuItem>
                        <SubMenu label="Features" icon={<PiListDashesFill />}>
                            <MenuItem component={<Link to="/admin/manage-users" />}> Manage Users</MenuItem>
                            <MenuItem component={<Link to="/admin/manage-quizzes" />}> Manage Quizs </MenuItem>
                            <MenuItem component={<Link to="/admin/manage-questions" />}> Manage Questions </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
            </div >
        </>
    )
}

export default SideBar;