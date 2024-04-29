import React from 'react';
import '../styles/ExpandedImageModal.css';

function ExpandedImageModal({ imageUrl, onClose }) {
  return (
    <div className="expanded-modal">
      <div className="expanded-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Expanded" className="expanded-image" />
      </div>
    </div>
  );
}

export default ExpandedImageModal;