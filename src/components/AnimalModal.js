import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AnimalModal.css';
import ExpandedImageModal from './ExpandedImageModal';
import Map from './Map';


function AnimalModal({ animal, onClose }) {
  const modalRef = useRef(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleImageClick = (image) => {
    setExpandedImage(image);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleExpandedImageOutsideClick = (event) => {
    // Check if the click is outside the expanded image modal
    if (expandedImage && !event.target.closest('.expanded-image-modal')) {
      handleCloseExpandedImage();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleExpandedImageOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleExpandedImageOutsideClick);
    };
  }, [expandedImage]);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={onClose}>&times;</span>

        
        <img src={animal.image} alt={animal.nickName} className="modal-animal-image" />
        <h2>{animal.nickName}</h2>
        <p>Type: {animal.type}</p>
        <p>Gender: {animal.gender}</p>
        <p>Color: {animal.color}</p>
        <p>Age: {animal.age}</p>
        <p>Breed: {animal.breed}</p>
        <p>Neutered Status: {animal.neuteredStatus}</p>
        <p>Health Status: {animal.healthStatus}</p>
        <p>Description: {animal.description}</p>

        {/* <Map lat={animal.latitude} lng={animal.longitude} /> */}
        <p>Location: {animal.latitude}, {animal.longitude}</p>

     

        {animal.album && animal.album.length > 0 && (
          <div>
            <div className="album">
              {animal.album.map((image, index) => (
                <div key={index} className="album-image">
                  <img
                    src={image}
                    alt={image}
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {expandedImage && (
          <ExpandedImageModal
            imageUrl={expandedImage}
            onClose={handleCloseExpandedImage}
          />
        )}



        {animal.HLS && animal.HLS.length > 0 && (
          <div className="card-container">           
            <h3>HLS</h3>
            <div className="card-grid">
              {animal.HLS.map((hls, index) => (
                <div className="card" key={index}>
                  <img src={hls.captureImage} alt="Capture" className="card-image"/>
                  <div className="card-details">
                    <p>Date: {hls.appearDate}</p>
                    <p>Time: {formatTime(hls.appearTime)} - {formatTime(hls.disappearTime)}</p>
                  </div>
                  <a href={hls.url} target="_blank" rel="noopener noreferrer" className="watch-button">Watch</a>
                </div>
              ))}
            </div>
          </div>
        )}


        <Link to={`/editAnimal/${animal.animalId}`} className="edit-button">Edit</Link>

      </div>

    </div>
  );
}

export default AnimalModal;
