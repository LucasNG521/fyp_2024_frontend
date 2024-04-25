// src/components/AnimalModal.js
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function AnimalModal({ animal, onClose }) {
  const modalRef = useRef(null);

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

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{animal.nickName}</h2>
        <p>Type: {animal.type}</p>
        <p>Gender: {animal.gender}</p>
        <p>Color: {animal.color}</p>
        <p>Age: {animal.age}</p>
        <p>Breed: {animal.breed}</p>
        <p>Neutered Status: {animal.neuteredStatus}</p>
        <p>Health Status: {animal.healthStatus}</p>
        <p>Description: {animal.description}</p>
        <p>Latitude: {animal.latitude}</p>
        <p>Longitude: {animal.longitude}</p>
        <img src={animal.image} alt={animal.nickName} className="animal-image" />
        <Link to={`/editAnimal/${animal.animalId}`} className="edit-button">Edit</Link>

      </div>
        <style jsx>{`
        .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            box-sizing: border-box;
        }

        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
        }

        .animal-image {
            display: block;
            max-width: 100%;
            height: auto;
            margin-top: 20px;
        }
        `}</style>

    </div>
  );
}

export default AnimalModal;
