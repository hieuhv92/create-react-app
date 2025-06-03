import { useState, useEffect } from 'react';
import { postCreatNewQuiz, getAllQuizForAdmin } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import { Tab, Tabs } from "react-bootstrap";
import Select from 'react-select';
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import './ManageQuiz.scss';

const ManageQuiz = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HOT', label: 'HOT' },
    ];

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState();
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async (escription) => {
        if (!name || !description) {
            toast.error('Invalid name or description!');
            return;
        }
        if (!image) {
            toast.error('Image not found');
            return;
        }
        const response = await postCreatNewQuiz(description, name, type?.value, image);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            setName('');
            setDescription('');
            setImage('');
            fetchQuiz();
        } else {
            toast.error(response.EM);
        }
    }

    return (
        <div className="quiz-container">
            <Tabs defaultActiveKey="updateQA" id="uncontrolled-tab-example">
                <Tab eventKey="quizInfor" title="Manage Quiz">
                    <div className="add-new mb-3">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder='Name'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="">Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    placeholder='Description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="">Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder="Quiz Type"
                                />
                            </div>
                            <div className='more-actions form-group'>
                                <label className='mb-1'>Upload Image</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>
                            <div>
                                <button
                                    className='btn btn-warning mt-3'
                                    onClick={() => handleSubmitQuiz()}
                                >Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <hr />
                    <div className="list-detail">
                        <TableQuiz listQuiz={listQuiz} fetchQuiz={fetchQuiz} />
                    </div>
                </Tab>
                <Tab eventKey="updateQA" title="Update Q/A Quizzes">
                    <QuizQA />
                </Tab>
                <Tab eventKey="assignQAtoUser" title="Assign Quiz to User">
                    <AssignQuiz />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageQuiz;