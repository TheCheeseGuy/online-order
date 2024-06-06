import React from 'react';

const Modal = ({ url, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <iframe src={url} title="Payment" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
      </div>
    </div>
  );
};

export default Modal;
