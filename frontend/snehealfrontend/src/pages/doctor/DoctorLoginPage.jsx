import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FormInput } from '../../components/FormInputs';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import { ApiError } from '../../lib/apiClient';
import { getOtpFromSendOtpResponse, sendOtp, verifyOtp } from '../../lib/authService';
import { resolveAuthRoute } from '../../lib/resolveAuthRoute';
import '../../styles/doctor/doctor-portal.css';

function isValidIndianMobile(digits) {
  return /^[6-9]\d{9}$/.test(digits);
}

function normalizePhone(input) {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
}

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useDoctorAuth();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpAutofilled, setOtpAutofilled] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    const normalized = normalizePhone(phone);
    if (!isValidIndianMobile(normalized)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setLoading(true);
    try {
      const sendResult = await sendOtp(normalized);
      const devOtp = getOtpFromSendOtpResponse(sendResult);
      setPhone(normalized);
      setOtp(devOtp || '');
      setOtpAutofilled(Boolean(devOtp));
      setStep('otp');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp.trim() || otp.trim().length < 4) {
      setError('Enter the OTP sent to your phone.');
      return;
    }
    setLoading(true);
    try {
      const data = await verifyOtp(phone, otp.trim());
      const user = data.user;
      setUser(user);
      navigate(resolveAuthRoute(user, true), { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-shell doctor-main--centered">
      <div className="doctor-card">
        <h1 className="doctor-card__title">Doctor sign in</h1>
        <p className="doctor-card__lead">
          Use the mobile number registered with Sneheal. We will send a one-time password.
        </p>

        {error && (
          <div className="doctor-alert doctor-alert--error" role="alert">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <FormInput
              label="Mobile number"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              required
              autoComplete="tel"
            />
            <Button type="submit" variant="primary" className="btn-full" disabled={loading}>
              {loading ? 'Sending…' : 'Send OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p className="doctor-alert doctor-alert--info">
              OTP sent to <strong>{phone}</strong>
              {otpAutofilled ? (
                <>
                  . <strong>Code filled automatically</strong> (dev OTP from server).
                </>
              ) : null}
            </p>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">One-time password</label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="form-input doctor-otp-row"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter OTP"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="btn-full" disabled={loading}>
              {loading ? 'Verifying…' : 'Verify & continue'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="btn-full mt-md"
              disabled={loading}
              onClick={() => {
                setStep('phone');
                setOtp('');
                setOtpAutofilled(false);
                setError('');
              }}
            >
              Change number
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorLoginPage;
