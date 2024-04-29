import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnimalById, updateAnimal } from '../api/animal';
import useForm from '../hooks/useForm';

function EditAnimal() {
  const { animalId } = useParams();
  const [animal, handleChange, setAnimal] = useForm({
    image: "", gender: "", color: "", nickName: "", latitude: 113.00, description: "",
    type: "", breed: "", neuteredStatus: "", healthStatus: "", age: 0, longitude: 22.00,
    album: []
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
      await updateAnimal(animalId, animal);
      setLoading(false);
      alert('Animal updated successfully!');
      navigate('/animals');
    } catch (error) {
      setError('Failed to update animal');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/animals');
  };

  const handleDeleteImage = (index) => {
    const updatedAlbum = [...animal.album];
    updatedAlbum.splice(index, 1);
    setAnimal({ ...animal, album: updatedAlbum });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayOrder = [
    'image',
    'nickName',
    'gender',
    'color',
    'age',
    'breed',
    'neuteredStatus',
    'healthStatus',
    'description',
    'latitude',
    'longitude',
    'album',
    'video',
    'voiceSample',
    // 'HLS'
  ];

  return (
    <div className="edit-animal-container">
      <h1>Edit Animal</h1>
      <form onSubmit={handleSubmit}>
        {displayOrder.map(key => (
          key !== 'id' && animal[key] !== '' && (
            <div key={key} style={{ display: "block", marginBottom: "10px" }}>
              {key.replace(/([A-Z](?=[a-z]))/g, ' $1').trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
              {Array.isArray(animal[key]) && key === 'album' ? (
                animal[key].map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Album Image ${index}`} style={{ maxWidth: "200px", marginTop: "10px" }} />
                    <button type="button" onClick={() => handleDeleteImage(index)}>Delete</button>
                  </div>
                ))
              ) : key === 'image' ? (
                <div>
                  <img src={animal[key]} alt="Animal Image" style={{ maxWidth: "200px", marginTop: "10px" }} />
                  {/* <input
                    type="file"
                    name={key}
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                  /> */}
                </div>
              ) : (
                <input
                  type={key === 'image' ? 'url' : 'text'}
                  name={key}
                  value={animal[key]}
                  onChange={handleChange}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </div>
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
