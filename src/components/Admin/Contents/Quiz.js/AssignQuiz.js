import { useState, useEffect } from 'react';
import Select from 'react-select';
import {
    getAllQuizForAdmin, getAllUsers, postAssignQuizToUser
} from '../../../../services/ApiServices';
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0 && res.DT) {
            let listQuizRes = res.DT.map(item => {
                return {
                    value: item.id,
                    label: item.id + ' - ' + item.description,
                }
            })
            setListQuiz(listQuizRes);
        }
    }
    const fetchUser = async () => {
        const res = await getAllUsers();
        if (res && res.EC === 0 && res.DT) {
            let listUserRes = res.DT.map(item => {
                return {
                    value: item.id,
                    label: item.id + ' - ' + item.email,
                }
            })
            setListUser(listUserRes);
        }
    }

    const handleSubitAssignQuiz = async () => {
        const res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    placeholder="Quiz Type"
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    placeholder="Quiz Type"
                />
            </div>
            <div>
                <buton className="btn btn-warning mt-3" onClick={() => handleSubitAssignQuiz()}>Assign</buton>
            </div>
        </div>
    )
}

export default AssignQuiz;