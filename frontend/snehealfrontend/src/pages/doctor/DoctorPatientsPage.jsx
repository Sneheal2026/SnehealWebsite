import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEngagedPatients } from '../../lib/doctorService';
import { useFetchOnce } from '../../hooks/useFetchOnce';
import { asArray, patientDisplayName, patientSubtitle } from './doctorUtils';

const DoctorPatientsPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetchOnce(() => fetchEngagedPatients(), []);
  const patients = asArray(data);

  return (
    <>
      <header className="doctor-page-header">
        <h1>Engaged patients</h1>
        <p>Patients you are actively caring for through Sneheal.</p>
      </header>

      {error && (
        <div className="doctor-alert doctor-alert--error" role="alert">
          {error}
        </div>
      )}

      {loading && <div className="doctor-spinner" role="status" aria-label="Loading patients" />}

      {!loading && !error && patients.length === 0 && (
        <div className="doctor-empty">No engaged patients yet.</div>
      )}

      {!loading && patients.length > 0 && (
        <div className="doctor-list">
          {patients.map((patient) => {
            const id = patient.id || patient.userId || patient.customerId;
            return (
              <button
                key={id}
                type="button"
                className="doctor-list-item"
                onClick={() => navigate(`/doctor/patients/${id}`)}
              >
                <div>
                  <div className="doctor-list-item__name">{patientDisplayName(patient)}</div>
                  <div className="doctor-list-item__meta">{patientSubtitle(patient)}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DoctorPatientsPage;
