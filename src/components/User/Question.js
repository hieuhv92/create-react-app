import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, index } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);

    if (_.isEmpty(data)) {
        return (<></>);
    }

    return (
        <>
            {data && data.image ?
                <div className='q-image'>
                    <img
                        style={{ cursor: "pointer" }}
                        src={`data:image/png;base64,${data.image}`}
                        alt="..."
                        onClick={() => setIsPreviewImage(true)} />
                    {isPreviewImage &&
                        <Lightbox
                            image={`data:image/png;base64,${data.image}`}
                            title="question-image"
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
                </div> :
                <div className='q-image'></div>

            }
            <div className="question">Question {index}: {data.questionDescrition}</div>
            <div className="answers">
                {data && data.answers && data.answers.map((a, index) => {
                    return (
                        <div key={`answer-${index}`} className='a-child'>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    checked={a.isSelected}
                                    // onChange={(event) => handleCheckBox(event, `a${a.id}-q${data.questionId}`)}
                                    onChange={() => props.handleCheckBox(a.id, data.questionId)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {a.description}
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Question;