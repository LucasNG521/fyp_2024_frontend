import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addAnimal } from '../api/animal';
import useForm from '../hooks/useForm';

function AddAnimal() {
  const [animal, handleChange, setAnimal] = useForm({
    image: "", gender: "", color: "", nickName: "", latitude: 113.00, description: "",
    type: "", breed: "", neuteredStatus: "", healthStatus: "", age: 0, longitude: 22.00,
    album: []
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.urls[0]; // Assuming API returns a single URL in an array
    } catch (error) {
      console.error('Failed to upload image', error);
      return '';
    }
  };

  const handleAlbumUpload = async (files) => {
    const urls = [];
    for (let file of files) {
      const url = await handleImageUpload(file);
      if (url) urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (animal.image && typeof animal.image === 'object') {
      const imageUrl = await handleImageUpload(animal.image);
      if (imageUrl) {
        animal.image = imageUrl;
      }
    }

    if (animal.album.length > 0) {
      const albumUrls = await handleAlbumUpload(animal.album);
      if (albumUrls.length > 0) {
        animal.album = albumUrls;
      }
    }

    try {
      setLoading(true);
      console.log(animal)
      await addAnimal(animal);
      setLoading(false);
      alert('Animal added successfully!');
      navigate('/animals');
    } catch (error) {
      setError('Failed to add animal');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setAnimal({ ...animal, image: e.target.files[0] });
  };

  const handleAlbumFilesChange = (e) => {
    setAnimal({ ...animal, album: Array.from(e.target.files) });
  };

  const handleCancel = () => {
    navigate('/animals');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayOrder = [
    'image',
    'type',
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
  ];

  return (
    <div className="add-animal-container">
      <h1>Add Animal</h1>
      <form onSubmit={handleSubmit}>
        {displayOrder.map(key => (
          <div key={key} style={{ display: "block", marginBottom: "10px" }}>
            {key.replace(/([A-Z](?=[a-z]))/g, ' $1').trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
            {key === 'album' ? (
              <>
                <input
                  type="file"
                  name={key}
                  onChange={handleAlbumFilesChange}
                  multiple
                  accept="image/*"
                  style={{ marginLeft: "10px" }}
                />
                {animal.album.map((image, index) => (
                  <div key={index}>
                    <img src={URL.createObjectURL(image)} alt={`Album Image ${index}`} style={{ maxWidth: "100px", marginTop: "10px" }} />
                  </div>
                ))}
              </>
            ) : key === 'image' ? (
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                style={{ marginLeft: "10px" }}
                accept="image/*"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={animal[key]}
                onChange={handleChange}
                style={{ marginLeft: "10px" }}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <style jsx>{`
        .add-animal-container {
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

export default AddAnimal;
