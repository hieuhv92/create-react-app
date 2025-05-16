import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizData } from '../../services/ApiServices';
import _ from 'lodash';
import './DetailQuiz.scss';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    console.log(location)
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
                        answers.push(item.answers);
                    })

                    return { questionId: key, answers, questionDescrition, image }
                })
                .value()
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
                    <div className="question">Question 1: How are you doing?</div>
                    <div className="answers">
                        <div>A.âfafafa</div>
                        <div>B.âfafafa</div>
                        <div>C.âfafafa</div>
                    </div>
                </div>
                <div className="q-footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
            <div className="right-content">
                Count Down
            </div>
        </div>
    )
}

export default DetailQuiz;