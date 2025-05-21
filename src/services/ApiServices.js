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

const postSubmitQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data })
}

const postCreatNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    const imgFile = new File([image], "image.jpg", { type: "image/jpeg" });
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', imgFile);
    return axios.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`)
}

const deleteUQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const putUpdateQuizData = (id, description, name, type, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (question_id, description, correct_answer) => {
    return axios.post('api/v1/answer', {
        question_id,
        description,
        correct_answer
    });
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId,
        userId
    });
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
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
    getQuizData,
    postSubmitQuiz,
    postCreatNewQuiz,
    getAllQuizForAdmin,
    deleteUQuiz,
    putUpdateQuizData,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuizToUser,
    getQuizWithQA,
    postUpsertQA
}