import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizData, postSubmitQuiz } from '../../services/ApiServices';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setdataModalResult] = useState({})

    useEffect(() => {
        fetchQuestionData();
    }, [quizId]);

    const fetchQuestionData = async () => {
        const reponse = await getQuizData(quizId);
        if (reponse && reponse.EC === 0) {
            var data = _.chain(reponse.DT)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescrition, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescrition = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescrition, image }
                })
                .value();
            setDataQuiz(data)
        }
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    }

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const handleCheckBox = (aId, qId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); //React hook doesn't merge state, only React class does
        let question = dataQuizClone.find(item => +item.questionId === +qId);

        if (question && question.answers) {
            question.answers = question.answers.map(aItem => {
                if (+aItem.id === +aId) {
                    aItem.isSelected = !aItem.isSelected;
                }
                return aItem;
            });
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +qId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        let payLoad = {
            quizId: +quizId,
            "answers": []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let userAnswerId = [];
                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })
                answers.push({
                    questionId: +question.questionId,
                    userAnswerId: userAnswerId
                })
            })
            payLoad.answers = answers;
        }
        const respone = await postSubmitQuiz(payLoad);
        if (respone && respone.EC === 0) {
            setdataModalResult({
                countCorrect: respone.DT.countCorrect,
                countTotal: respone.DT.countTotal,
                quizData: respone.DT.quizData
            })
            setIsShowModalResult(true);
        } else {
            alert('Something is wrong');
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="q-title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="q-footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;