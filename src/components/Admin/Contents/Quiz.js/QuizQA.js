import { useState, useEffect } from 'react';
import Select from 'react-select';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/ApiServices';
import { v4 as uuidv4 } from 'uuid';
import { PiPlusCircleFill } from "react-icons/pi";
import { PiMinusCircleFill } from "react-icons/pi";
import { TbHexagonPlusFilled } from "react-icons/tb";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { LuImageUp } from "react-icons/lu";
import _ from 'lodash';
import './QuizQA.scss';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion);

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataPreviewImage, setDataPreviewImage] = useState({
        title: '',
        url: ''
    });

    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
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


    const handleAddOrRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
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
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
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

    const handleSubmitQuestions = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!!');
            return;
        }

        //Validate Question


        // await Promise.all(questions.map(async (question) => { => Chay Song Song
        //     //Call to create new question - postCreateNewQuestionForQuiz
        //     const qRes = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);

        //     //Call to create new answer - postCreateNewAnswerForQuestion
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnswerForQuestion(qRes.DT.id, answer.description, answer.isCorrect);
        //     }))
        // }))

        for (const question of questions) {
            const qResponse = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            if (qResponse && qResponse.EC === 0 && qResponse.DT) {
                for (const answer of question.answers) {
                    await postCreateNewAnswerForQuestion(qResponse.DT.id, answer.description, answer.isCorrect);
                }
            }
        }

        toast.success("Created question and answers successully!!");
        setQuestions(initQuestion);
    }

    const handlePreviewImage = (questionData) => {
        setDataPreviewImage({
            url: URL.createObjectURL(questionData.imageFile),
            title: questionData.imageName
        });
        setIsPreviewImage(true)
    }

    // console.log('selected quiz id,' + selectedQuiz.value)

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                            <span>{question.imageFile ? <span className="preview-image" onClick={() => handlePreviewImage(question)}>{question.imageName}</span> : 'No file is uploaded!!'}</span>
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
                                </>
                            )
                        })}
                </div>
                <div className='mt-3 mb-2'>
                    {
                        questions && questions.length > 0 &&
                        <div className='mt-3'>
                            <button onClick={() => handleSubmitQuestions()} className='btn btn-warning'>Save Questions</button>
                        </div>
                    }
                </div>
            </div>
            {isPreviewImage === true &&
                <Lightbox
                    image={dataPreviewImage.url}
                    title={dataPreviewImage.title}
                    onClose={() => setIsPreviewImage(false)}>
                </Lightbox>
            }
        </div>
    )
}

export default QuizQA;