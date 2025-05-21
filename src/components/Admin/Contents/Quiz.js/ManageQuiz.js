import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreatNewQuiz } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from "react-bootstrap";
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

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

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // setPreviewImage(URL.createObjectURL(event.target.files[0]));
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
        } else {
            toast.error(response.EM);
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
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
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign Quiz to User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz;