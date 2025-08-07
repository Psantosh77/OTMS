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
        clearInterval(timerRef.current);
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
      (response) => {
        setBrandModelSubmitted(true);
        showMessage('User updated successfully!');
        dispatch(setLoggedInEmail(email));
        localStorage.setItem("loggedInEmail", email);

        if (response.status === 200) {
          navigate("/");
        }
        // No extra API calls or blocking logic
      },
      () => {
        showMessage('Failed to update user. Please try again.', true);
      }
    );
  };

  useEffect(() => {
    // Clear timer on unmount
    return () => clearInterval(timerRef.current);
  }, []);

  if (!showModal) return null;

  // Find selected brand object for logo display
  const selectedBrandObj = manufacturers.find(m => String(m.id) === String(selectedBrand)) || null;
  const selectedModelObj = models.find(m => String(m.id) === String(selectedModel)) || null;

  return (
    <div className="modal fade show d-block modal-modern">
      <style jsx>{`
        .modal-modern {
          // background: #f8f9fa;
          z-index: 1050;
        }
        .modal-content-modern {
          border: none;
          border-radius: 18px;
          box-shadow: 0 2px 16px rgba(34,34,34,0.08);
         
          animation: slideInRight 0.4s ease-out;
          width: 420px;
          max-width: 98vw;
        }
        @media (max-width: 600px) {
          .modal-dialog {
            max-width: 100vw !important;
            width: 100vw !important;
            right: 0 !important;
            left: 0 !important;
            top: 0 !important;
            margin: 0 !important;
          }
          .modal-content-modern {
            border-radius: 0;
            width: 100vw !important;
            min-height: 100vh;
            box-shadow: none;
            padding: 0;
          }
          .modal-header-modern {
            padding: 18px 16px 12px;
          }
          .modal-body {
            padding: 18px 16px;
          }
        }
        .modal-header-modern {
          border-bottom: 1px solid #f3f3f3;
          padding: 22px 28px 16px;
          background: #f8f9fa;
        }
        .modal-title-modern {
          color: #222;
          font-weight: 700;
          font-size: 22px;
        }
        .form-control-modern {
          border: 1.5px solid #e9ecef;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 1rem;
          transition: border-color 0.2s;
          background: #fff;
          box-shadow: 0 1px 4px rgba(34,34,34,0.04);
        }
        .form-control-modern:focus {
          border-color: #ff6b35;
          outline: none;
        }
        .btn-send-otp {
          background: #ff6b35;
          border: none;
          border-radius: 14px;
          padding: 13px;
          color: #fff;
          font-weight: 600;
          font-size: 1.08rem;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(255,107,53,0.10);
        }
        .btn-send-otp:hover:not(:disabled) {
          background: #f7931e;
          box-shadow: 0 6px 18px rgba(255,107,53,0.16);
        }
        .btn-send-otp:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .success-message {
          color: #28a745;
          font-size: 15px;
          margin-bottom: 15px;
          padding: 10px;
          background: #eafbe7;
          border-radius: 8px;
          text-align: center;
        }
        .error-message {
          color: #dc3545;
          font-size: 15px;
          margin-bottom: 15px;
          padding: 10px;
          background: #fbeaea;
          border-radius: 8px;
          text-align: center;
        }
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #eee;
          border-radius: 50%;
          border-top-color: #ff6b35;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="modal-dialog" style={{ position: 'fixed', right: '30px', top: '30px', margin: '0', maxWidth: '500px', width: '500px' }}>
        <div className="modal-content modal-content-modern">
          <div className="modal-header modal-header-modern d-flex justify-content-between align-items-center">
            <h5 className="modal-title modal-title-modern m-0">To take care of your car please enter <span className="text-primary"></span></h5>
            {/* Close button removed */}
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

                {/* Show OTP field and submit only if OTP is sent and not verified */}
                {otpSent && !isOtpVerified && (
                  <>
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
                    <button type="submit" className="btn btn-send-otp w-100" disabled={isVerifying}>
                      {isVerifying ? <><span className="loading-spinner me-2"></span>Verifying OTP...</> : 'Submit'}
                    </button>
                    {/* Resend OTP button, enabled only when countdown is 0 */}
                    <button
                      type="button"
                      className="btn btn-send-otp w-100 mt-3"
                      onClick={handleSendOTP}
                      disabled={countdown > 0}
                    >
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                    </button>
                  </>
                )}

                {/* Show Send OTP button only if OTP is not sent */}
                {!otpSent && (
                  <button type="submit" className="btn btn-send-otp w-100" disabled={isLoading || countdown > 0}>
                    {isLoading ? <><span className="loading-spinner me-2"></span>Sending OTP...</> : countdown > 0 ? `Resend OTP in ${countdown}s` : 'Send OTP'}
                  </button>
                )}
              </form>
            )}

            {/* Brand/Model Form after OTP verification */}
            {otpSent && isOtpVerified && (
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

