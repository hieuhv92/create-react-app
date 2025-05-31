
import { useState, useEffect } from 'react';
import { getQuizHistoryData } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import Moment from 'react-moment';


const History = (props) => {
    const [listQuizHistory, setListQuizHistory] = useState([]);

    useEffect(() => {
        fetchQuizHistory()
    }, []);

    const fetchQuizHistory = async () => {
        const res = await getQuizHistoryData();
        if (res && res.EC === 0) {
            setListQuizHistory(res.DT.data)
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct Answer</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizHistory && listQuizHistory.length > 0 &&
                        listQuizHistory.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.quizHistory.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>
                                        <Moment format="DD/MM/YYYY h:mm:ss A">
                                            {item.createdAt}
                                        </Moment>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuizHistory && listQuizHistory.length == 0 &&
                        <tr><td colSpan={4}>Not Found Data</td></tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default History;