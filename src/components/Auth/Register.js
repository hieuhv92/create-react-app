import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/Helpers';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const navigate = useNavigate();

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('eyeOff');

    const handleToggle = () => {
        if (type === 'password') {
            setIcon('eye');
            setType('text');
        } else {
            setIcon('eyeOff');
            setType('password');
        }
    }

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Invalid email!');
            return;
        }

        if (!email) {
            toast.error("Please type a valid email!");
            return;
        }

        if (!password) {
            toast.error("Please type a valid password!");
            return;
        }

        const data = await postRegister(email, password, username);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="signup-container">
            <div className='header'>
                <span>Already have an account? </span>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
            <div className='title'>
                Hieu Ho IT
            </div>
            <div className='welcome'>
                Start your journey?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password (*)</label>
                    <input
                        type={type}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="field-icon" onClick={() => handleToggle()}>
                        {icon === 'eyeOff' ? <IoMdEyeOff /> : <IoEye />}
                    </span>
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type={'input'}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button onClick={() => handleRegister()} className='btn-submit'>Create My Account</button>
                </div>
                <div className='text-center'>
                    <span className='back-home' onClick={() => navigate('/')}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register;