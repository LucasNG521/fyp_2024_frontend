import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReportsById, removeReport } from '../api/report';
import { addAnimal, fetchAnimals, updateAnimal } from '../api/animal';
import SimpleModal from './SimpleModal';
import '../styles/ReportDetails.css'; 

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [matchingAnimals, setMatchingAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReport() {
            try {
                const data = await fetchReportsById(id);
                setReport(data);
            } catch (error) {
                console.error('Failed to fetch report:', error);
            }
        }
        fetchReport();
    }, [id]);

    const handleAddToExistingAnimal = async () => {
        try {
            const allAnimals = await fetchAnimals();
            const matches = allAnimals.map(animal => {
                let matchScore = 0;  
    
                if (animal.color === report.color) matchScore++;
                if (animal.type === report.type) matchScore++;
                if (animal.gender === report.gender) matchScore++;
    
                return { animal, matchScore };  
            })
            .filter(item => item.matchScore > 0)  
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 10);  

            matches.forEach(match => {
                if (match.matchScore === 3) {
                    match.matchLevel = 'High';
                } else if (match.matchScore === 2) {
                    match.matchLevel = 'Medium';
                } else if (match.matchScore === 1) {
                    match.matchLevel = 'Low';
                } else {
                    match.matchLevel = 'none';
                }
            });
    
            setMatchingAnimals(matches);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch animals:', error);
            alert('Failed to fetch animals!');
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = async (selectedAnimal) => {
        if (!selectedAnimal) {
            alert('Please select an animal to merge with.');
            return;
        }
        try {

            const mergedData = {
                ...selectedAnimal,
                ...Object.fromEntries(Object.entries(report).filter(([key]) => key !== 'color' && key !== 'type'))
            };
    
            await updateAnimal(selectedAnimal.animalId, mergedData);
            alert('Animal data updated successfully!');
            setIsModalOpen(false);
            removeReport(report.reportId)
            navigate('/animals');  
        } catch (error) {
            console.error('Error updating animal:', error);
            alert('Failed to update animal!');
        }
    };

    const handleAddNewAnimal = async () => {
        try {
            const newAnimalData = {
                image: report.image,
                nickName: report.nickName,
                type: report.type,
                breed: report.breed,
                age: report.age,
                color: report.color,
                gender: report.gender,
                healthStatus: report.healthStatus,
                neuteredStatus: report.neuteredStatus,
                description: report.description,
                latitude: report.latitude,
                longitude: report.longitude,
                album: report.album
            };

            await addAnimal(newAnimalData);
            removeReport(report.reportId)
            alert('Animal added successfully!');
            navigate('/animals');  
        } catch (error) {
            console.error('Failed to add animal:', error);
            alert('Failed to add animal!');
        }
    };

    if (!report) return <p>Loading...</p>;


    return (
        <div className="report-details-container">
            <h1 className="report-details-header">{report.nickName} - Details</h1>
            <img src={report.image} alt={report.nickName} className="report-image-main" />
            <div className="report-details-section">
            <p className="report-detail"><span className="detail-label">Nickname:</span> {report.nickName}</p>
            <p className="report-detail"><span className="detail-label">Gender:</span> {report.gender}</p>
            <p className="report-detail"><span className="detail-label">Age:</span> {report.age}</p>
            <p className="report-detail"><span className="detail-label">Breed:</span> {report.breed}</p>
            <p className="report-detail"><span className="detail-label">Type:</span> {report.type}</p>
            <p className="report-detail"><span className="detail-label">Color:</span> {report.color}</p>
            <p className="report-detail"><span className="detail-label">Health Status:</span> {report.healthStatus}</p>
            <p className="report-detail"><span className="detail-label">Neutered Status:</span> {report.neuteredStatus}</p>
            <p className="report-detail"><span className="detail-label">Description:</span> {report.description}</p>
            <p className="report-detail"><span className="detail-label">Location:</span>  {report.latitude}, {report.longitude}</p>
            <p className="report-detail"><span className="detail-label">Timestamp:</span> {new Date(report.timestamp).toLocaleString()}</p>
            <p className="report-detail"><span className="detail-label">Reported By:</span> {report.userId}</p>
            </div>
            <div>
            <h3 className="report-details-header">Album</h3>
            <div className="report-details-section">
                {report.album && report.album.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} className="report-album-image" />
                ))}
            </div>
            </div>
            <button onClick={handleAddNewAnimal} className="button-nav">Add New Animal</button>
            <button onClick={handleAddToExistingAnimal} className="button-nav">Add to Existing Animal</button>
 
            <SimpleModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={() => handleModalSubmit(selectedAnimal)}>
                <h2>Select an Animal to Merge</h2>
                {matchingAnimals.map(animal => (
                    <div key={animal.animal.animalId} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                            type="radio"
                            id={`radio-${animal.animal.animalId}`}
                            name="animalSelect"
                            value={animal.animal.animalId}
                            onChange={() => setSelectedAnimal(animal.animal)}
                            checked={selectedAnimal && selectedAnimal.animalId === animal.animal.animalId}
                            style={{ marginRight: '10px', opacity: 0, position: 'absolute', left: '-9999px' }} 
                        />
                        <label htmlFor={`radio-${animal.animal.animalId}`} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            width: '100%', 
                            cursor: 'pointer',
                            backgroundColor: (selectedAnimal && selectedAnimal.animalId === animal.animal.animalId) ? '#f0f0f0' : 'transparent', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: (selectedAnimal && selectedAnimal.animalId === animal.animal.animalId) ? '2px solid #007bff' : '2px solid transparent' 
                        }}>
                            <img src={animal.animal.image} alt={animal.animal.nickName} style={{ width: '100px', margin: '10px' }}/>
                            <div>
                                <p>{animal.animal.nickName}</p>
                                <p  style={{ 
                                color: animal.matchLevel === 'High' ? 'green' : 
                                animal.matchLevel === 'Medium' ? 'orange' : 
                                animal.matchLevel === 'Low' ? 'red' : 'black'}}>
                                Match Level: {animal.matchLevel}</p>
                            </div>
                        </label>
                    </div>
                ))}
            </SimpleModal>
        </div>
    );
  }
  
  export default ReportDetails;