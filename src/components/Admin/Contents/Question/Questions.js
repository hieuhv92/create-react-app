import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { PiPlusCircleFill } from "react-icons/pi";
import { PiMinusCircleFill } from "react-icons/pi";

import { TbHexagonPlusFilled } from "react-icons/tb";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { LuImageUp } from "react-icons/lu";

const Questions = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HOT', label: 'HOT' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={selectedQuiz}
                        options={options}
                        placeholder="Quiz Type"
                    />
                </div>
                <div className='mt-3'>Add questions:</div>
                <div>
                    <div className="questions-content-section">
                        <div className="form-floating description">
                            <input type="text" className="form-control" />
                            <label>Descrition</label>
                        </div>
                        <div className="group-upload">
                            <label className='label-upload'><LuImageUp /></label>
                            <input type='file' hidden />
                            <span>No file is uploaded!!</span>
                        </div>
                        <div className="btn-add-question-group">
                            <span className="icon-add"><PiPlusCircleFill /></span>
                            <span className="icon-remove"><PiMinusCircleFill /></span>
                        </div>
                    </div>
                    <div className="answers-content-section">
                        <input className="form-check-input is-correct" type="checkbox" />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" />
                            <label>Answer1</label>
                        </div>
                        <div className="btn-add-answer-group">
                            <span className="icon-add"><TbHexagonPlusFilled /></span>
                            <span className="icon-remove"><TbHexagonMinusFilled /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;