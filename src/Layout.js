import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Contents/ManageUser';
import DashBoard from './components/Admin/Contents/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Contents/Quiz.js/ManageQuiz';
import Questions from './components/Admin/Contents/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';

const NotFound = () => {
    return (
        <div className='alert alert-danger container'> 404 Not Found Page</div>
    )
}

const Layout = () => {
    return (
        <>
            <Suspense fallback="...is loading">
                <Routes>
                    <Route path='/' element={<App />} >
                        <Route index element={<HomePage />} />
                        <Route path="users" element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        } />
                    </Route>

                    <Route path="/quiz/:id" element={<DetailQuiz />} />

                    <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                        <Route path="manage-quizzes" element={<ManageQuiz />} />
                        <Route path="manage-questions" element={<Questions />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Suspense>
        </>
    )
}
export default Layout;