// src/components/AddAnimalForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';  // Custom hook for managing form state

function AddAnimalForm() {
  const [animal, handleChange] = useForm({
    image: "", gender: "male", color: "", nickName: "", latitude: "", description: "",
    type: "", breed: "", neuteredStatus: "", healthStatus: "", age: "", longitude: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assume addAnimal is an API call function imported from api.js
    try {
      await addAnimal(animal);
      alert('Animal added successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add animal: ' + error.message);
    }
  };

  return (
    <div className="add-animal-container">
      <h1>Add New Animal</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image URL</label>
        <input type="url" name="image" value={animal.image} onChange={handleChange} />

        <label>Gender</label>
        <div>
          <label><input type="radio" name="gender" value="male" checked={animal.gender === 'male'} onChange={handleChange}/> Male</label>
          <label><input type="radio" name="gender" value="female" checked={animal.gender === 'female'} onChange={handleChange}/> Female</label>
        </div>

        <label htmlFor="color">Color</label>
        <input type="text" name="color" value={animal.color} onChange={handleChange} />

        <label htmlFor="nickName">Nickname</label>
        <input type="text" name="nickName" value={animal.nickName} onChange={handleChange} />

        <label htmlFor="latitude">Latitude</label>
        <input type="text" name="latitude" value={animal.latitude} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <input type="text" name="description" value={animal.description} onChange={handleChange} />

        <label htmlFor="type">Type</label>
        <input type="text" name="type" value={animal.type} onChange={handleChange} />

        <label htmlFor="breed">Breed</label>
        <input type="text" name="breed" value={animal.breed} onChange={handleChange} />

        <label htmlFor="neuteredStatus">Neutered Status</label>
        <input type="text" name="neuteredStatus" value={animal.neuteredStatus} onChange={handleChange} />

        <label htmlFor="healthStatus">Health Status</label>
        <input type="text" name="healthStatus" value={animal.healthStatus} onChange={handleChange} />

        <label htmlFor="age">Age</label>
        <input type="text" name="age" value={animal.age} onChange={handleChange} />

        <label htmlFor="longitude">Longitude</label>
        <input type="text" name="longitude" value={animal.longitude} onChange={handleChange} />

        <button type="submit">Add Animal</button>
      </form>
      <style jsx>{`
        .add-animal-container {
          background-color: #f9f9f9;
          padding: 20px;
          margin: 20px auto;
          border-radius: 10px;
          width: 80%;
          max-width: 600px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 10px;
        }

        input[type="text"], input[type="url"] {
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
        }

        input[type="radio"] {
          margin-right: 5px;
        }

        button {
          padding: 10px;
          margin-top: 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default AddAnimalForm;
