import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FormInput, FormSelect } from '../../components/FormInputs';
import { DoctorRegisterOnly } from '../../components/doctor/DoctorRouteGuards';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import { ApiError } from '../../lib/apiClient';
import { completeRegistration } from '../../lib/authService';
import '../../styles/doctor/doctor-portal.css';

const LANGUAGE_OPTIONS = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'HINDI', label: 'Hindi' },
  { value: 'MARATHI', label: 'Marathi' },
];

const DoctorRegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useDoctorAuth();
  const [form, setForm] = useState({
    username: '',
    language: 'ENGLISH',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await completeRegistration({
        username: form.username.trim(),
        language: form.language,
        role: 'doctor',
        clinic: {
          addressLine: form.addressLine.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
          landmark: form.landmark.trim() || undefined,
        },
      });
      setUser(user);
      navigate('/doctor/dashboard', { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Could not complete registration. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorRegisterOnly>
      <div className="doctor-shell doctor-main--centered">
        <div className="doctor-card" style={{ maxWidth: 560 }}>
          <h1 className="doctor-card__title">Complete your profile</h1>
          <p className="doctor-card__lead">
            Add your clinic details to access the doctor dashboard on the web.
          </p>

          {error && (
            <div className="doctor-alert doctor-alert--error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Display name"
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="Dr. Your Name"
              required
            />
            <FormSelect
              label="Preferred language"
              name="language"
              value={form.language}
              onChange={onChange}
              options={LANGUAGE_OPTIONS}
              required
            />
            <FormInput
              label="Clinic address"
              name="addressLine"
              value={form.addressLine}
              onChange={onChange}
              placeholder="Street / building"
              required
            />
            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={onChange}
              required
            />
            <FormInput
              label="State"
              name="state"
              value={form.state}
              onChange={onChange}
              required
            />
            <FormInput
              label="PIN code"
              name="pincode"
              value={form.pincode}
              onChange={onChange}
              required
            />
            <FormInput
              label="Landmark (optional)"
              name="landmark"
              value={form.landmark}
              onChange={onChange}
            />
            <Button type="submit" variant="primary" className="btn-full" disabled={loading}>
              {loading ? 'Saving…' : 'Complete registration'}
            </Button>
          </form>
        </div>
      </div>
    </DoctorRegisterOnly>
  );
};

export default DoctorRegisterPage;
