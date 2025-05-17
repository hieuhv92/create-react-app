import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';

const ManageQuiz = (props) => {
    const options = [
        { value: 'EASY', label: 'Chocolate' },
        { value: 'MEDIUM', label: 'Strawberry' },
        { value: 'HOT', label: 'Vanilla' },
    ];

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState();

    const handleChangeFile = () => {
        console.log('aaa');
    }

    return (
        <div className="quiz-container">
            <div className="title">Manage Quiz</div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder='Name'
                            value={name}
                            onChange={() => setName()}
                        />
                        <label for="">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text"
                            className="form-control"
                            placeholder='Description'
                            value={description}
                            onChange={() => setDescription()}
                        />
                        <label for="">Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            // value={selectedOption}
                            // onChange={this.handleChange}
                            options={options}
                            placeholder="Quiz Type"
                        />
                    </div>
                    <div className='more-actions form-group'>
                        <label className='mb-1'>Upload Image</label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={() => handleChangeFile()}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="">Table</div>
            <div></div>
        </div>
    )
}

export default ManageQuiz;