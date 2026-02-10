import React, { useState, useEffect } from 'react';
import DoctorCard from './components/DoctorCard';
import SearchBox from './components/SearchBox';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load doctor data from JSON file
    const loadDoctors = async () => {
      try {
        const response = await fetch('/doctor_info.json');
        const data = await response.json();
        // Handle both single doctor object and array of doctors
        const doctorsList = Array.isArray(data) ? data : [data];
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList);
        setLoading(false);
      } catch (err) {
        setError('Failed to load doctor information: ' + err.message);
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleSearch = (results) => {
    setFilteredDoctors(results);
  };

  if (loading) {
    return <div className="app-container"><p>Loading doctor information...</p></div>;
  }

  if (error) {
    return <div className="app-container"><p className="error">{error}</p></div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Doctor Information Directory</h1>
      </header>
      
      <SearchBox doctors={doctors} onSearch={handleSearch} />
      
      <main className="doctors-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))
        ) : (
          <p className="no-results">No doctors found matching your search.</p>
        )}
      </main>
    </div>
  );
}

export default App;
