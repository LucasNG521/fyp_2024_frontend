// src/components/EditAnimal.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnimalById, 
    // updateAnimal 
} from '../api/api';
import useForm from '../hooks/useForm';

function EditAnimal() {
  const { animalId } = useParams();
  const [animal, handleChange, setAnimal] = useForm({
    image: "", gender: "", color: "", nickName: "", latitude: "", description: "",
    type: "", breed: "", neuteredStatus: "", healthStatus: "", age: "", longitude: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndSetAnimal() {
      try {
        setLoading(true);
        const data = await fetchAnimalById(animalId);
        setAnimal(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch animal data');
        setLoading(false);
      }
    }

    fetchAndSetAnimal();
  }, [animalId, setAnimal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    //   await updateAnimal(animalId, animal);
      setLoading(false);
      alert('Animal updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update animal');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="edit-animal-container">
      <h1>Edit Animal</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(animal).map(key => (
          key !== 'id' && (
            <label key={key} style={{ display: "block", marginBottom: "10px" }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type={key === 'image' ? 'url' : 'text'}
                name={key}
                value={animal[key]}
                onChange={handleChange}
                style={{ marginLeft: "10px" }}
              />
            </label>
          )
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <style jsx>{`
        .edit-animal-container {
          background-color: #f9f9f9;
          padding: 20px;
          margin: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        input, button {
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
          margin-right: 10px;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default EditAnimal;
