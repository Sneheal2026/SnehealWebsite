import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronRight,
  FiSearch,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { RiStethoscopeLine } from 'react-icons/ri';
import Button from '../../components/Button';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import { ApiError } from '../../lib/apiClient';
import { searchCustomers } from '../../lib/doctorService';
import { asArray, patientDisplayName, patientSubtitle } from './doctorUtils';

function timeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const DoctorDashboardPage = () => {
  const { user } = useDoctorAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const displayName = useMemo(() => {
    const name = user?.username?.trim();
    if (!name) return 'Doctor';
    return name.toLowerCase().startsWith('dr') ? name : `Dr. ${name}`;
  }, [user?.username]);

  const showIdle =
    !loading && results.length === 0 && !error && !searched && query.trim().length === 0;

  const runSearch = async (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      setError('Enter at least 2 characters to search by name, or a patient ID.');
      return;
    }
    setError('');
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchCustomers(q);
      const list = asArray(data);
      setResults(list);
      if (list.length === 1) {
        const id = list[0].id || list[0].userId;
        if (id) {
          navigate(`/doctor/patients/${id}`);
        }
      }
    } catch (err) {
      setResults([]);
      setError(err instanceof ApiError ? err.message : 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const onQueryChange = (value) => {
    setQuery(value);
    setError('');
    setSearched(false);
    setResults([]);
  };

  return (
    <div className="doctor-home">
      <section className="doctor-home-hero" aria-labelledby="doctor-home-heading">
        <div className="doctor-home-hero__inner">
          <div className="doctor-home-hero__row">
            <span className="doctor-home-badge">
              <RiStethoscopeLine size={14} aria-hidden />
              Clinical workspace
            </span>
            <Link
              to="/doctor/account"
              className="doctor-home-hero__account"
              aria-label="Account settings"
            >
              <FiUser size={20} />
            </Link>
          </div>
          <p className="doctor-home-hero__greeting">{timeGreeting()}</p>
          <h1 id="doctor-home-heading" className="doctor-home-hero__name">
            {displayName}
          </h1>
          <p className="doctor-home-hero__tagline">
            Look up a patient by name or ID, review orders and prescriptions, and support
            care through Sneheal.
          </p>
        </div>
      </section>

      <div className="doctor-home-quick">
        <button
          type="button"
          className="doctor-home-quick-card"
          onClick={() => navigate('/doctor/patients')}
        >
          <span className="doctor-home-quick-card__icon" aria-hidden>
            <FiUsers size={22} />
          </span>
          <span className="doctor-home-quick-card__title">Engaged patients</span>
          <span className="doctor-home-quick-card__desc">
            Open your active patient list and charts.
          </span>
        </button>
        <button
          type="button"
          className="doctor-home-quick-card"
          onClick={() => navigate('/doctor/account')}
        >
          <span className="doctor-home-quick-card__icon" aria-hidden>
            <FiUser size={22} />
          </span>
          <span className="doctor-home-quick-card__title">Your profile</span>
          <span className="doctor-home-quick-card__desc">
            Clinic details, phone, and sign out.
          </span>
        </button>
      </div>

      <section className="doctor-home-panel" aria-labelledby="doctor-lookup-title">
        <div className="doctor-home-section-head">
          <div className="doctor-home-section-accent" aria-hidden />
          <div>
            <h2 id="doctor-lookup-title" className="doctor-home-section-title">
              Patient lookup
            </h2>
            <p className="doctor-home-section-hint">
              Search by patient name or Sneheal user ID. One match opens the chart
              automatically.
            </p>
          </div>
        </div>

        <form className="doctor-home-search" onSubmit={runSearch}>
          <label className="doctor-home-search__field">
            <FiSearch size={18} aria-hidden />
            <input
              type="search"
              className="doctor-home-search__input"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Name or patient ID"
              autoComplete="off"
            />
          </label>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </Button>
        </form>

        <div className="doctor-home-tips">
          <span className="doctor-home-tip">Tip: use patient ID for exact match</span>
          <span className="doctor-home-tip">Tip: at least 2 letters for name search</span>
        </div>

        <button
          type="button"
          className="doctor-home-link-row"
          onClick={() => navigate('/doctor/patients')}
        >
          <span>
            <FiUsers size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Browse all engaged patients
          </span>
          <FiChevronRight size={18} aria-hidden />
        </button>

        {error && (
          <div className="doctor-alert doctor-alert--error mt-md" role="alert">
            {error}
          </div>
        )}

        {showIdle && (
          <div className="doctor-home-idle">
            <div className="doctor-home-idle__accent" aria-hidden />
            <div>
              <p className="doctor-home-idle__title">Ready when you are</p>
              <p className="doctor-home-idle__body">
                Start with a patient lookup above, or open your engaged list to continue
                care.
              </p>
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && !error && (
          <div className="doctor-empty mt-md">No patients matched your search.</div>
        )}
      </section>

      {results.length > 1 && (
        <section aria-labelledby="doctor-results-heading">
          <h2 id="doctor-results-heading" className="doctor-home-results-title">
            {results.length} patients found
          </h2>
          <div className="doctor-list">
            {results.map((patient) => {
              const id = patient.id || patient.userId;
              return (
                <button
                  key={id}
                  type="button"
                  className="doctor-home-result-row"
                  onClick={() => navigate(`/doctor/patients/${id}`)}
                >
                  <span className="doctor-home-result-row__accent" aria-hidden />
                  <span className="doctor-home-result-row__copy">
                    <span className="doctor-home-result-row__name">
                      {patientDisplayName(patient)}
                    </span>
                    <span className="doctor-home-result-row__meta">
                      ID {id}
                      {patientSubtitle(patient) ? ` · ${patientSubtitle(patient)}` : ''}
                    </span>
                  </span>
                  <span className="doctor-home-result-row__action">
                    View chart
                    <FiChevronRight size={16} style={{ verticalAlign: 'middle' }} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default DoctorDashboardPage;
