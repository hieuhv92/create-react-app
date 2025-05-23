import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz } = props;
    const refDiv = useRef([]);

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const getQuestionClassName = (question, index) => {
        let isAnswered = question.answers.find(a => a.isSelected === true);
        if (isAnswered) {
            return 'question selected';
        }

        return 'question';
    }

    const handleClickOnQuestion = (item, index) => {
        props.setIndex(index);
        refDiv.current.forEach(r => {
            if (r.className === 'question clicked') {
                r.className = 'question';
            }
        })
        let isAnswered = item.answers.find(a => a.isSelected === true);
        if (isAnswered) {
            return 'question selected';
        }
        refDiv.current[index].className = 'question clicked';
    }

    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-${index}`}
                                className={getQuestionClassName(item, index)}
                                onClick={() => handleClickOnQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })}
            </div >
        </>
    )
}

export default RightContent;