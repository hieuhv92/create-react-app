import { useState } from 'react';
import { Button } from 'react-bootstrap';
// import './ManageUser.scss';
import { toast } from 'react-toastify';
import { postUpdatePassword } from '../../services/ApiServices';

import { logout } from '../../services/ApiServices';
import { doLogout } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Password = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setShow } = props;
    const handleClose = () => {
        setShow(false);
    };

    const account = useSelector(state => state.user.account);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updateUserPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('The new password and confirmation pass are not Matching!!');
            return;
        }
        let reponseData = await postUpdatePassword(currentPassword, newPassword);
        if (reponseData && reponseData.EC === 0) {
            toast.success(reponseData.EM);
            handleLogout();
        }
        if (reponseData && reponseData.EC !== 0) {
            toast.error(reponseData.EM);
        }
    }

    const handleLogout = async () => {
        const res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <>
            <form className="row g-3 mt-1">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <hr />
                <div className='btn-update'>
                    <Button variant="warning" onClick={() => updateUserPassword()}>
                        Update
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Password;