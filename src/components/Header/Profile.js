import { useState, useEffect } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postUpdateProfile } from '../../services/ApiServices';
import _ from "lodash";
import UserInfo from './UserInfo';
import Password from './Password';
import History from './History';

const Profile = (props) => {
    const { show, setShow, account } = props;

    const handleClose = () => {
        setShow(false);
        setUsername('');
        setImage('');
        setPreviewImage('');
    };

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account])


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const updateUserInformation = async () => {
        let reponseData = await postUpdateProfile(username, image);
        if (reponseData && reponseData.EC === 0) {
            toast.success(reponseData.EM);
            handleClose();
        }
        if (reponseData && reponseData.EC !== 0) {
            toast.error(reponseData.EM);
        }
    }

    //Need to check new password and confirm pass word

    return (
        <div className="profile-container">
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Manage User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="userInfor" id="uncontrolled-tab-example">
                        <Tab eventKey="userInfor" title="Manage User Information">
                            <UserInfo setClose={handleClose} />
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password">
                            <Password setClose={handleClose} />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Profile;