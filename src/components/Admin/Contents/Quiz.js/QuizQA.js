import { useState, useEffect } from 'react';
import Select from 'react-select';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA
} from '../../../../services/ApiServices';
import { v4 as uuidv4 } from 'uuid';
import { PiPlusCircleFill } from "react-icons/pi";
import { PiMinusCircleFill } from "react-icons/pi";
import { TbHexagonPlusFilled } from "react-icons/tb";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { LuImageUp } from "react-icons/lu";
import _ from 'lodash';
import './QuizQA.scss';
import { toast } from 'react-toastify';
import { normalize, schema } from 'normalizr';
import { produce } from "immer";

const QuizQA = (props) => {
    const questionId = uuidv4();
    const answerId = uuidv4();
    const [questions, setQuestions] = useState({
        [questionId]: {
            id: questionId,
            description: '',
            imageFile: '',
            imageName: '',
            answers: [answerId]
        }
    });
    const [answers, setAnswers] = useState({
        [answerId]: {
            id: answerId,
            description: '',
            isCorrect: false
        }
    });

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataPreviewImage, setDataPreviewImage] = useState({ title: "", url: "" });
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);

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

    const fetchQuizWithQA = async () => {
        const res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0 && res.DT) {
            let newQA = [];
            for (var i in res.DT.qa) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `question-${q.id}.png`
                    q.imageFile = dataURLtoFile(`data:image/png;base64,${q.imageFile}`, q.imageName);
                }
                newQA.push(q);
            }
            const answer = new schema.Entity('answer');
            const question = new schema.Entity('question', {
                answers: [answer]
            });
            const normalizedData = normalize(newQA, [question]);

            setQuestions(normalizedData.entities.question);
            setAnswers(normalizedData.entities.answer);
        }
    }

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleQuestionActions = (type, questionId) => {
        if (type === 'ADD') {
            const qId = uuidv4();
            const aId = uuidv4();
            const newQ = {
                id: qId,
                description: '',
                imageFile: '',
                imageName: '',
                answers: [aId]
            }
            const newA = {
                id: aId,
                description: '',
                isCorrect: false
            }

            setQuestions(produce((draft) => {
                draft[qId] = newQ;
            }));

            setAnswers(produce((draft) => {
                draft[aId] = newA;
            }))
        }

        if (type === 'REMOVE') {
            if (questions[questionId] && questions[questionId].answers && questions[questionId].answers.length > 0) {
                setAnswers(produce((draft) => {
                    questions[questionId].answers.forEach((item) => {
                        delete draft[item];
                    })
                }))
            }
            setQuestions(produce((draft) => {
                delete draft[questionId];
            }));
        }
    }

    const handleAnswerActions = (type, qId, aId) => {
        if (type === 'ADD') {
            const aId = uuidv4();
            const newA = {
                id: aId,
                description: '',
                isCorrect: false
            }
            setQuestions(produce((draft) => {
                draft[qId].answers.push(aId);
            }));

            setAnswers(produce((draft) => {
                draft[aId] = newA;
            }))
        }

        if (type === 'REMOVE') {
            setAnswers(produce((draft) => {
                delete draft[aId];
            }))
            if (questions[qId] && questions[qId].answers && questions[qId].answers.length > 0) {
                let newAnswerArr = questions[qId].answers.filter(item => item !== aId)
                setQuestions(produce((draft) => {
                    draft[qId].answers = newAnswerArr;
                }));
            }
        }
    }

    const handleQuestionDescription = (qId, value) => {
        if (!qId) {
            return;
        }
        if (questions[qId]) {
            setQuestions(produce((draft) => {
                draft[qId].description = value;
            }));
        }
    }

    const handleOnChangeImageFile = (qId, event) => {
        if (!qId) {
            return;
        }
        if (questions[qId] && event.target && event.target.files && event.target.files[0]) {
            setQuestions(produce((draft) => {
                draft[qId].imageFile = event.target.files[0];
                draft[qId].imageName = event.target.files[0].name;
            }));
        }
    }

    const handleAnwsersOnChange = (type, qId, aId, value) => {
        if (!qId || !aId || !type) {
            return;
        }

        if (answers[aId]) {
            setAnswers(produce((draft) => {
                if (type === 'CHECKBOX') {
                    draft[aId].isCorrect = value;
                }
                if (type === 'INPUT') {
                    draft[aId].description = value;
                }
            }))
        }
    }

    const handleSubmitQuestions = async (qId) => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!!');
            return;
        }

        let payload = {
            "quizId": selectedQuiz.value,
            "questions": []
        }

        for (let i in questions) {
            let qData = {};
            let q = questions[i];

            qData.id = q.id;
            qData.description = q.description;
            qData.imageFile = q.imageFile;
            qData.imageName = q.imageName;
            qData.answers = [];

            if (qData.imageFile) {
                qData.imageFile = await toBase64(qData.imageFile);
            }

            for (let j in q.answers) {
                let aData = {
                    id: '',
                    description: '',
                    isCorrect: false
                }
                let aId = q.answers[j];
                if (answers[aId]) {
                    aData.id = answers[aId].id;
                    aData.description = answers[aId].description;
                    aData.isCorrect = answers[aId].isCorrect;
                    qData.answers.push(aData);
                }
            }
            payload.questions.push(qData);
        }

        const res = await postUpsertQA(payload);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        } else {
            toast.error(res.EM);
        }
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handlePreviewImage = (questionData) => {
        setDataPreviewImage({
            url: URL.createObjectURL(questionData.imageFile),
            title: questionData.imageName
        });
        setIsPreviewImage(true);
    }

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
                        className="select-quiz"
                    />
                </div>
                <div className='mt-3 mb-2'>Add questions:</div>
                <div className='q-main mb-4'>
                    {questions && Object.entries(questions).map(([keyQ], index) => (
                        <>
                            <div key={questions[keyQ].id} className="questions-content-section">
                                <div className="form-floating description">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={questions[keyQ].description}
                                        onChange={(event) => handleQuestionDescription(questions[keyQ].id, event.target.value)}
                                    />
                                    <label>Question {index + 1} 's descrition</label>
                                </div>
                                <div className="group-upload">
                                    <label htmlFor={`${questions[keyQ].id}`} className='label-upload'><LuImageUp /></label>
                                    <input
                                        id={`${questions[keyQ].id}`}
                                        type='file'
                                        hidden
                                        onChange={(event) => handleOnChangeImageFile(questions[keyQ].id, event)}
                                    />
                                    <span>{questions[keyQ].imageFile ? <span className="preview-image" onClick={() => handlePreviewImage(questions[keyQ])}>{questions[keyQ].imageName}</span> : 'No file is uploaded!!'}</span>
                                </div>
                                <div className="btn-add-question-group">
                                    <span className="icon-add" onClick={() => handleQuestionActions('ADD', '')}><PiPlusCircleFill /></span>
                                    {Object.keys(questions).length > 1 &&
                                        <span className="icon-remove" onClick={() => handleQuestionActions('REMOVE', questions[keyQ].id)}><PiMinusCircleFill /></span>
                                    }
                                </div>
                            </div >
                            {questions[keyQ].answers && questions[keyQ].answers.length > 0 &&
                                questions[keyQ].answers.map((keyA, index) => {
                                    return (
                                        <div key={keyA} className="answers-content-section">
                                            <input
                                                className="form-check-input is-correct"
                                                type="checkbox"
                                                checked={answers[keyA].isCorrect}
                                                onChange={(event) => handleAnwsersOnChange('CHECKBOX', questions[keyQ].id, answers[keyA].id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={answers[keyA].description}
                                                    onChange={(event) => handleAnwsersOnChange('INPUT', questions[keyQ].id, answers[keyA].id, event.target.value)}
                                                />
                                                <label>Answer {index + 1}</label>
                                            </div>
                                            <div className="btn-add-answer-group">
                                                <span className="icon-add" onClick={() => handleAnswerActions('ADD', questions[keyQ].id, '')}><TbHexagonPlusFilled /></span>
                                                {questions[keyQ].answers.length > 1 &&
                                                    <span className="icon-remove" onClick={() => handleAnswerActions('REMOVE', questions[keyQ].id, answers[keyA].id)}><TbHexagonMinusFilled /></span>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </>
                    ))}
                </div>
                <div className='mt-3 mb-2'>
                    {
                        questions && Object.keys(questions).length > 0 &&
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