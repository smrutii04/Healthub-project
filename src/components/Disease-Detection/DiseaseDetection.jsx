import React, { useState } from 'react';
import axios from 'axios';
import './DiseaseDetection.css';

const DiseaseDetection = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !selectedDisease) {
      alert('Please select a disease and upload an X-ray image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('disease', selectedDisease);

    try {
      const response = await axios.post('http://localhost:5000/api/disease-detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      alert('Error detecting disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-detection-container">
      <h1>AI-Based Disease Detection</h1>
      <form onSubmit={handleSubmit} className="disease-form">
        <div className="form-group">
          <label>Select Disease to Test:</label>
          <select value={selectedDisease} onChange={handleDiseaseChange} className="disease-select">
            <option value="">--Select Disease--</option>
            <option value="pneumonia">Pneumonia</option>
            <option value="tuberculosis">Tuberculosis</option>
            {/* Add more diseases as required */}
          </select>
        </div>

        <div className="form-group">
          <label>Upload X-ray Image:</label>
          <input type="file" onChange={handleFileChange} className="file-input" />
        </div>

        <button type="submit" className="submit-button">
          {loading ? 'Processing...' : 'Detect Disease'}
        </button>
      </form>

      {result && (
        <div className="result-container">
          <h2>Detection Results:</h2>
          <p><strong>Disease Detected:</strong> {result.disease}</p>
          <p><strong>Probability:</strong> {result.probability}%</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
