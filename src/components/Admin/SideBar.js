// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Admin.scss';
// import { FaGem, FaHeart, FaGithub } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { Link } from 'react-router-dom';
const ProSideBar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    return (
        <>
            <Sidebar>
                <Menu>
                    <MenuItem icon={<FaHeart />} component={<Link to="/admins" />}> Dashboard </MenuItem>
                    <SubMenu label="Features" icon={<FaGem />}>
                        <MenuItem component={<Link to="/admins/manage-users" />}> Manage Users</MenuItem>
                        <MenuItem> Manage Quizs </MenuItem>
                        <MenuItem> Manage Questions </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>;
        </>
    )
}

export default ProSideBar;