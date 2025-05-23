import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { CgSpinnerTwo } from "react-icons/cg";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    var dispatch = useDispatch();

    const handleLogin = async () => {
        const data = await postLogin(email, password);

        if (data && +data.EC === 0) {
            toast.success(data.EM);
            dispatch(doLogin(data))
            navigate('/');
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't you have an account yet?</span>
                <button onClick={() => navigate('/signup')}>Sign up</button>
            </div>
            <div className='title'>
                Hieu Ho IT
            </div>
            <div className='welcome'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <span className='forgot-password'>Forgot Password?</span>
                <div>
                    <button
                        onClick={() => handleLogin()}
                        className='btn-submit'
                    >
                        <CgSpinnerTwo className='loaderIcon' />
                        <span>Log in</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back-home' onClick={() => navigate('/')}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;