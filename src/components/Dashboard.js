// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnimals } from '../api/api';
import AnimalModal from './AnimalModal';

function Dashboard() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    async function loadAnimals() {
      try {
        const animalsData = await fetchAnimals();
        setAnimals(animalsData);
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

  return (
    <div>
      <h1>Animals Dashboard</h1>
      <Link to="/add-animal">Add Animal</Link>
      {animals.length > 0 ? (
        <div>
          {animals.map(animal => (
            <div key={animal.animalId} className="animal-card" onClick={() => handleAnimalClick(animal)}>
              <img src={animal.image} alt={animal.nickName} className="animal-image" />
              <div>
                <p>Nickname: {animal.nickName}</p>
                <p>Type: {animal.type}</p>
                <p>Color: {animal.color}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No animals data available.</p>
      )}
      {selectedAnimal && (
        <AnimalModal animal={selectedAnimal} onClose={handleCloseModal} />
      )}
    <style jsx>{`
    .animal-card {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 10px;
        cursor: pointer;
    }

    .animal-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 20px;
    }

    a {
        display: block;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: fit-content;
    }

    a:hover {
        background-color: #45a049;
    }
    `}</style>

    </div>
  );
}

export default Dashboard;
