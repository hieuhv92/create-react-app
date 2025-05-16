import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizData } from '../../services/ApiServices'
import _ from 'lodash';

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;

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
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;