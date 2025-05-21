import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuizData } from '../../../../services/ApiServices';
import _ from "lodash";

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setID('');
        setName('');
        setDescription('');
        setType('EASY');
        setImage('');
        setPreviewImage('');
        props.resetUpdateData();
    };

    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setID(dataUpdate.id);
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }


    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuizData(dataUpdate.id, description, name, type, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchQuiz();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload' ><FcPlus />Upload File Image</label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt='preview' /> :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;
