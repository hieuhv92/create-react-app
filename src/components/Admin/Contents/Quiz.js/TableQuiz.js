import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from '../../../../services/ApiServices';
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);

    const [isShowModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

    const [isShowModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleDeleteQuiz = (item) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(item);
    }

    const handleUpdateQuiz = (item) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(item);
    }

    const resetUpdateData = () => {
        setDataUpdateQuiz('');
    }

    return (
        <>
            <div className="">List Quizzes:</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{ display: "flex", gap: "10px" }}>
                                        <button className="btn btn-warning" onClick={() => handleUpdateQuiz(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={isShowModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDeleteQuiz}
                fetchQuiz={fetchQuiz}
                dataUpdate={dataUpdateQuiz}
            />
            <ModalUpdateQuiz
                show={isShowModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataDelete={dataUpdateQuiz}
                fetchQuiz={fetchQuiz}
                dataUpdate={dataUpdateQuiz}
                resetUpdateData={resetUpdateData}
            />
        </>
    )
}

export default TableQuiz;