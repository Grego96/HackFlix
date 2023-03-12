import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modalSinglePage.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-sp"
    >
      <iframe
        className="modal-sp"
        width="100%"
        height="480"
        src={`https://www.youtube.com/embed/${props.videoKey}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
