import React from 'react';
import '../styles/DoctorCard.css';

function DoctorCard({ doctor }) {
  const {
    fullName = 'N/A',
    specialtyPracticed = [],
    certifications = [],
    education = [],
    clinicalAreas = []
  } = doctor;

  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <h2 className="doctor-name">{fullName}</h2>
      </div>

      <div className="doctor-section">
        <h3>Specialty Practiced</h3>
        {Array.isArray(specialtyPracticed) && specialtyPracticed.length > 0 ? (
          <ul className="doctor-list">
            {specialtyPracticed.map((specialty, idx) => (
              <li key={idx}>
                {typeof specialty === 'string' ? specialty : specialty.name || 'N/A'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">Not available</p>
        )}
      </div>

      <div className="doctor-section">
        <h3>Certifications</h3>
        {Array.isArray(certifications) && certifications.length > 0 ? (
          <ul className="doctor-list">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                {typeof cert === 'string' ? (
                  cert
                ) : (
                  <>
                    <strong>{cert.name || 'N/A'}</strong>
                    {cert.type && <span> - {cert.type}</span>}
                    {cert.board && <span> ({cert.board})</span>}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">Not available</p>
        )}
      </div>

      <div className="doctor-section">
        <h3>Education</h3>
        {Array.isArray(education) && education.length > 0 ? (
          <ul className="doctor-list">
            {education.map((edu, idx) => (
              <li key={idx}>
                {typeof edu === 'string' ? (
                  edu
                ) : (
                  <>
                    {edu.name || 'N/A'}
                    {edu.type && <span> - {edu.type}</span>}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">Not available</p>
        )}
      </div>

      {Array.isArray(clinicalAreas) && clinicalAreas.length > 0 && (
        <div className="doctor-section">
          <h3>Clinical Areas</h3>
          <div className="clinical-areas">
            {clinicalAreas.slice(0, 5).map((area, idx) => (
              <span key={idx} className="clinical-badge">
                {area.name || 'N/A'}
              </span>
            ))}
            {clinicalAreas.length > 5 && (
              <span className="clinical-more">+{clinicalAreas.length - 5} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorCard;
