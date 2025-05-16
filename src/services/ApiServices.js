// import axios from 'axios';
import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } });
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const getUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) => {
    return axios.post('/api/v1/login', {
        email: userEmail,
        password: userPassword
    });
}

const postRegister = (userEmail, userPassword, userName) => {
    return axios.post('/api/v1/register', {
        email: userEmail,
        password: userPassword,
        username: userName
    });
}

const postQuizByUser = (userEmail, userPassword, userName) => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizData = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUsersWithPaginate,
    postLogin,
    postRegister,
    postQuizByUser,
    getQuizData
}