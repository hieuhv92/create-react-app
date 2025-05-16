import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizData } from '../../services/ApiServices'

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestionData();
    }, [quizId]);

    const fetchQuestionData = async () => {
        const reponse = await getQuizData(quizId);
        console.log(reponse);
    }

    return (
        <div className="detail-quiz-container">
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;