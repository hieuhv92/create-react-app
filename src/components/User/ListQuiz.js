import { useEffect, useState } from "react";
import { postQuizByUser } from '../../services/ApiServices';
import './ListQuiz.scss';

const ListQuiz = () => {
    const [arrQuiz, setArrayQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])
    const getQuizData = async () => {
        const respone = await postQuizByUser();
        if (respone && +respone.EC === 0) {
            setArrayQuiz(respone.DT);
        }
    }
    return (
        <div className="list-quiz-container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button href="#" className="btn btn-primary">Go somewhere</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>You don't have any quiz.</div>
            }
        </div>
    )
}

export default ListQuiz;