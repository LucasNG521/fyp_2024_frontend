import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnimals} from '../api/animal';
import { getLogs } from '../api/common';
import AnimalModal from './AnimalModal';
import '../styles/Animal.css';

function Animal() {
  const [animals, setAnimals] = useState([]);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadAnimals() {
      try {
        const animalsData = await fetchAnimals();
        setAnimals(animalsData);
        const logsData = await getLogs();

        const latestLogs = logsData.slice(-10);
        setActivityLogs(latestLogs);
      } catch (error) {
        alert('Failed to fetch animals: ' + error.message);
      }
    };

    loadAnimals();
  }, []);

  const handleAnimalClick = animal => {
    setSelectedAnimal(animal);
  };

  const handleCloseModal = () => {
    setSelectedAnimal(null);
  };

  const totalPages = Math.ceil(animals.length / 5);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, animals.length);
  const currentAnimals = animals.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Animals</h1>
      <Link to="/add-animal">Add Animal</Link>
      {currentAnimals.length > 0 ? (
        <div>
          {currentAnimals.map(animal => (
            <div key={animal.animalId} className="animal-card" onClick={() => handleAnimalClick(animal)}>
              <div>
                <img src={animal.image} alt={animal.nickName} className="animal-image" />
                <div style={{paddingLeft:'10px'}}>@{animal.nickName}</div>
              </div>

              <div className='card-content'>
                <div>Type: {animal.type}</div>
                <div>Breed: {animal.breed}</div>
                <div>Color: {animal.color}</div>
                <div>Neutered Status: {animal.neuteredStatus}</div>
                {/* <div>Description: {animal.description}</div> */}
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      ) : (
        <p>No animals data available.</p>
      )}
      {selectedAnimal && (
        <AnimalModal animal={selectedAnimal} onClose={handleCloseModal} />
      )}

    </div>
  );
}

export default Animal;
