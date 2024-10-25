// components/Modal.js
const Modal = ({ data, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default Modal;
