import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../utils/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInEmail } from "../redux/userSlice"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const LoginModal = ({ showModal, handleCloseModal }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  // Brand/model states
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [brandModelSubmitted, setBrandModelSubmitted] = useState(false);

  const timerRef = useRef(null);
  const otpInputRef = useRef(null);
  const dispatch = useDispatch();
  const loggedInEmail = useSelector(state => state.user.loggedInEmail);
  const navigate = useNavigate();

  // Helper for showing messages
  const showMessage = (msg, isError = false) => {
    setSuccessMessage(msg);
    if (isError) setTimeout(() => setSuccessMessage(''), 4000);
  };

  // OTP verified state
  const isOtpVerified = otpSent && successMessage?.toLowerCase().includes('otp verified');

  // Reset modal state on close
  useEffect(() => {
    if (!showModal) {
      setEmail('');
      setOtp('');
      setIsLoading(false);
      setIsVerifying(false);
      setOtpSent(false);
      setCountdown(0);
      setSuccessMessage('');
      setManufacturers([]);
      setSelectedBrand('');
      setModels([]);
      setSelectedModel('');
      setBrandModelSubmitted(false);
      clearInterval(timerRef.current);
    }
  }, [showModal]);

  // Fetch models when selectedBrand changes
  useEffect(() => {
    if (selectedBrand) {
      const brandObj = manufacturers.find(m => String(m.id) === String(selectedBrand));
      setModels(brandObj?.car_models || []);
      setSelectedModel(''); // Reset model when brand changes
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedBrand, manufacturers]);

  // Send OTP
  const handleSendOTP = async () => {
    setIsLoading(true);
    await apiService.post(
      '/auth/sendotp',
      { email },
      {},
      () => {
        setIsLoading(false);
        setOtpSent(true);
        showMessage('OTP sent successfully! Check your email.');
        setCountdown(60);
        timerRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      },
      () => {
        setIsLoading(false);
        showMessage('Failed to send OTP. Please try again.', true);
      }
    );
  };

  // Verify OTP and fetch manufacturers
  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    await apiService.post(
      '/auth/verifyOpt',
      { email, otp },
      {},
      () => {
        setIsVerifying(false);
        showMessage('OTP verified successfully!');
        apiService.post(
          '/cardata/getallmanufacturers',
          { email },
          {},
          (response) => {
            // Fix: use response.data for axios
            const data = response?.data;
            if (data?.data?.manufacturers) {
              setManufacturers(data.data.manufacturers);
              if (data.data.selectedBrandId) setSelectedBrand(String(data.data.selectedBrandId));
              else if (data.data.manufacturers.length === 1) setSelectedBrand(String(data.data.manufacturers[0].id));
              if (data.data.selectedModelId) setSelectedModel(String(data.data.selectedModelId));
            } else {
              setManufacturers([]);
              setSelectedBrand('');
              setModels([]);
              setSelectedModel('');
            }
          },
          () => {
            setManufacturers([]);
            setSelectedBrand('');
            setModels([]);
            setSelectedModel('');
          }
        );
      },
      () => {
        setIsVerifying(false);
        showMessage('Invalid OTP. Please try again.', true);
      }
    );
  };

  // Submit brand/model
  const handleBrandModelSubmit = async (e) => {
    e.preventDefault();
    await apiService.post(
      '/user/updateuser',
      {
        email,
        brand_id: selectedBrand,
        model_id: selectedModel
      },
      {},
      () => {
        setBrandModelSubmitted(true);
        showMessage('User updated successfully!');
        dispatch(setLoggedInEmail(email));
        handleCloseModal();
        navigate("/dashboard");
      },
      () => {
        showMessage('Failed to update user. Please try again.', true);
      }
    );
  };

  if (!showModal) return null;

  // Find selected brand object for logo display
  const selectedBrandObj = manufacturers.find(m => String(m.id) === String(selectedBrand)) || null;
  const selectedModelObj = models.find(m => String(m.id) === String(selectedModel)) || null;

  return (
    <div className="modal fade show d-block modal-modern">
      <div className="modal-dialog" style={{ position: 'fixed', right: '30px', top: '30px', margin: '0', maxWidth: '500px', width: '500px' }}>
        <div className="modal-content modal-content-modern">
          <div className="modal-header modal-header-modern d-flex justify-content-between align-items-center">
            <h5 className="modal-title modal-title-modern m-0">Welcome Back</h5>
            <button type="button" className="btn-close-modern" onClick={handleCloseModal}>×</button>
          </div>
          <div className="modal-body" style={{ padding: '30px' }}>
            {successMessage && (
              <div className={successMessage.toLowerCase().includes('fail') || successMessage.toLowerCase().includes('invalid') ? 'error-message' : 'success-message'}>
                {successMessage}
              </div>
            )}

            {/* OTP Form */}
            {!isOtpVerified && (
              <form onSubmit={(e) => {
                e.preventDefault();
                otpSent
                  ? (!isOtpVerified && handleVerifyOTP())
                  : handleSendOTP();
              }}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-modern"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isLoading || otpSent}
                  />
                </div>

                {otpSent && !isOtpVerified && (
                  <div className="mb-4">
                    <label htmlFor="otp" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      ref={otpInputRef}
                      className="form-control form-control-modern"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                      disabled={isVerifying}
                    />
                  </div>
                )}

                {!isOtpVerified && otpSent && (
                  <button type="submit" className="btn btn-send-otp w-100" disabled={isVerifying}>
                    {isVerifying ? <><span className="loading-spinner me-2"></span>Verifying OTP...</> : 'Submit'}
                  </button>
                )}

                {!otpSent && (
                  <button type="submit" className="btn btn-send-otp w-100" disabled={isLoading || countdown > 0}>
                    {isLoading ? <><span className="loading-spinner me-2"></span>Sending OTP...</> : countdown > 0 ? `Resend OTP in ${countdown}s` : 'Send OTP'}
                  </button>
                )}
              </form>
            )}

            {/* Brand/Model Form after OTP verification */}
            {isOtpVerified && !brandModelSubmitted && (
              <form onSubmit={handleBrandModelSubmit}>
                <div className="mb-4">
                  <label htmlFor="brand" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                    Select Brand
                  </label>
                  <select
                    id="brand"
                    className="form-control form-control-modern"
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    required
                  >
                    <option value="">Choose a brand</option>
                    {manufacturers.map(m => (
                      <option key={m.id} value={String(m.id)}>
                        {m.display_name}
                      </option>
                    ))}
                  </select>
                  {selectedBrandObj && (
                    <div className="d-flex align-items-center mt-2">
                      <img src={selectedBrandObj.logo_url} alt={selectedBrandObj.display_name} style={{ width: 40, height: 20, objectFit: 'contain', marginRight: 8 }} />
                      <span>{selectedBrandObj.display_name}</span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="model" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                    Select Model
                  </label>
                  <select
                    id="model"
                    className="form-control form-control-modern"
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    required
                    disabled={!selectedBrand}
                  >
                    <option value="">Choose a model</option>
                    {models.map(m => (
                      <option key={m.id} value={String(m.id)}>
                        {m.display_name}
                      </option>
                    ))}
                  </select>
                  {selectedModelObj && (
                    <div className="d-flex align-items-center mt-2">
                      <img src={selectedModelObj.logo} alt={selectedModelObj.display_name} style={{ width: 40, height: 20, objectFit: 'contain', marginRight: 8 }} />
                      <span>{selectedModelObj.display_name}</span>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-send-otp w-100" disabled={!selectedBrand || !selectedModel}>
                  Proceed
                </button>
              </form>
            )}

            {isOtpVerified && brandModelSubmitted && (
              <div className="success-message mt-3">
                Welcome, <b>{email}</b>!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginModal;

