import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import "./Modal.css";

const Modal = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  return <button onClick={showModal}>Show modal</button>;
};

export default Modal;
