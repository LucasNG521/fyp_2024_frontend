import React from 'react';
import '../styles/Modal.css';

function SimpleModal({ isOpen, onClose, onSubmit, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div  className="simple-modal-content">
                    {children}
                </div>
                <div className="modal-actions">
                    <button onClick={onSubmit} className="button-nav">Submit</button>
                    <button onClick={onClose} className="button-nav">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SimpleModal;