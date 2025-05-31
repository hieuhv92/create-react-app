import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postUpdateProfile } from '../../services/ApiServices';
import _ from "lodash";

const UserInfo = (props) => {
    const account = useSelector(state => state.user.account);

    const handleClose = () => {
        setUsername('');
        setImage('');
        setPreviewImage('');
        props.setClose();
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
    return (
        <>
            <form className="row g-3 mt-1">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled="true"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={role}
                        disabled="true"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label label-upload" htmlFor='labelUpload' ><FcPlus />Upload File Image</label>
                    <input
                        type="file"
                        hidden
                        id="labelUpload"
                        onChange={(event) => handleUploadImage(event)} />
                </div>
                <div className="col-md-12 img-preview">
                    {previewImage ?
                        <img src={previewImage} alt='preview' /> :
                        <span>Preview Image</span>
                    }
                </div>
                <div className='btn-update'>
                    <Button variant="warning" onClick={() => updateUserInformation()}>
                        Update
                    </Button>
                </div>
            </form>
        </>
    )
}

export default UserInfo;