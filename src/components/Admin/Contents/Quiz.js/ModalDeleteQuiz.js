import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUQuiz } from '../../../../services/ApiServices';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitDeleteQuiz = async () => {
        let res = await deleteUQuiz(dataDelete.id);
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
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to delete Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz? ID: <b>{dataDelete && dataDelete.id ? dataDelete.id : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;