import { useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { PiPlusCircleFill } from "react-icons/pi";
import { PiMinusCircleFill } from "react-icons/pi";
import { TbHexagonPlusFilled } from "react-icons/tb";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { LuImageUp } from "react-icons/lu";
import _ from 'lodash';
import './Questions.scss';

const Questions = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HOT', label: 'HOT' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            image: '',
            imageFile: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ])

    const handleAddOrRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddOrRemoveAnswer = (type, qId, aId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index < 0) { return; }
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aId);
            setQuestions(questionsClone);
        }
    }

    const handleQuestionDescription = (qId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index > - 1) {
            questionsClone[index].description = value;
            setQuestions(questionsClone);
        }
    }

    const handleOnChangeFileQuestion = (qId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].image = event.target.files[0];
            questionsClone[index].imageFile = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnwserOnChange = (type, qId, aId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index < 0) { return; }
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === aId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            // let answerIndex = questionsClone[index].answers.findIndex(item => item.id === aId);
            // if (type === 'CHECKBOX') {
            //     console.log('checked', value);
            //     questionsClone[index].answers[answerIndex].isCorrect = value;
            // }
            // if (type === 'INPUT') {
            //     questionsClone[index].answers[answerIndex].description = value;
            // }
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestions = () => {
        console.log('questions: ', questions)
    }

    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={selectedQuiz}
                        options={options}
                        placeholder="Quiz Type"
                    />
                </div>
                <div className='mt-3 mb-2'>Add questions:</div>
                <div className='q-main mb-4'>
                    {questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <>
                                    <div key={question.id} className="questions-content-section">
                                        <div className="form-floating description">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={question.description}
                                                onChange={(event) => handleQuestionDescription(question.id, event.target.value)}
                                            />
                                            <label>Question {index + 1} 's descrition</label>
                                        </div>
                                        <div className="group-upload">
                                            <label htmlFor={`${question.id}`} className='label-upload'><LuImageUp /></label>
                                            <input
                                                id={`${question.id}`}
                                                type='file'
                                                hidden
                                                onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            />
                                            <span>{question.imageFile ? question.imageFile : 'No file is uploaded!!'}</span>
                                        </div>
                                        <div className="btn-add-question-group">
                                            <span className="icon-add" onClick={() => handleAddOrRemoveQuestion('ADD', '')}><PiPlusCircleFill /></span>
                                            {questions.length > 1 &&
                                                <span className="icon-remove" onClick={() => handleAddOrRemoveQuestion('REMOVE', question.id)}><PiMinusCircleFill /></span>
                                            }
                                        </div>
                                    </div >
                                    {
                                        question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className="answers-content-section">
                                                    <input
                                                        className="form-check-input is-correct"
                                                        type="checkbox"
                                                        value={answer.isCorrect}
                                                        onChange={(event) => handleAnwserOnChange('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                    />
                                                    <div className="form-floating answer-name">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={answer.description}
                                                            onChange={(event) => handleAnwserOnChange('INPUT', question.id, answer.id, event.target.value)}
                                                        />
                                                        <label>Answer {index + 1}</label>
                                                    </div>
                                                    <div className="btn-add-answer-group">
                                                        <span className="icon-add" onClick={() => handleAddOrRemoveAnswer('ADD', question.id, '')}><TbHexagonPlusFilled /></span>
                                                        {question.answers.length > 1 &&
                                                            <span className="icon-remove" onClick={() => handleAddOrRemoveAnswer('REMOVE', question.id, answer.id)}><TbHexagonMinusFilled /></span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {question.answers && question.answers.length > 0 &&
                                        <div className='mt-3'>
                                            <button onClick={() => handleSubmitQuestions()} className='btn btn-warning'>Save Questions</button>
                                        </div>
                                    }
                                </>
                            )
                        })}
                </div>
            </div>
        </div >
    )
}

export default Questions;