import React, { useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const BrandModelForm = ({
  manufacturers = [],
  selectedBrand = '',
  setSelectedBrand,
  models = [],
  selectedModel = '',
  setSelectedModel,
  selectedBrandObj = null,
  selectedModelObj = null,
  handleBrandModelSubmit,
  handleClose
}) => {
  // New fields state
  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [registrationExpiry, setRegistrationExpiry] = useState(null);
  const [insuranceExpiry, setInsuranceExpiry] = useState(null);

  // Popup state for brand/model
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [showModelPopup, setShowModelPopup] = useState(false);
  const brandInputRef = useRef(null);
  const modelInputRef = useRef(null);

  // Close popups on outside click
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (showBrandPopup && brandInputRef.current && !brandInputRef.current.contains(e.target)) {
        setShowBrandPopup(false);
      }
      if (showModelPopup && modelInputRef.current && !modelInputRef.current.contains(e.target)) {
        setShowModelPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBrandPopup, showModelPopup]);

  // Wrap submit to include new fields in payload
  const onSubmit = (e) => {
    e.preventDefault();
    handleBrandModelSubmit({
      year,
      engine_size: engineSize,
      vin_number: vinNumber,
      registration_expiry: registrationExpiry ? registrationExpiry.format('YYYY-MM') : '',
      insurance_expiry: insuranceExpiry ? insuranceExpiry.format('YYYY-MM') : ''
    });
  };

  return (
    <div
      style={{
        width: '40vw',
        minWidth: '40vw',
        maxWidth: 1200,
        position: 'fixed',
        top: '43%',
        left: '89%',
        transform: 'translate(-80%, -47%)',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 2px 32px rgba(34,34,34,0.18)',
        padding: 20,
        zIndex: 2000
      }}
    >
      {handleClose && (
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#888',
            zIndex: 10
          }}
          aria-label="Close"
        >
          &times;
        </button>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={onSubmit}>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div className="mb-4" ref={brandInputRef} style={{ position: 'relative' }}>
              <label htmlFor="brand" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Select Brand
              </label>
              <input
                id="brand"
                className="form-control form-control-modern"
                type="text"
                value={selectedBrandObj ? selectedBrandObj.display_name : ''}
                placeholder="Choose a brand"
                readOnly
                onClick={() => setShowBrandPopup(true)}
                required
                style={{ cursor: 'pointer', background: '#f9f9f9' }}
              />
              {showBrandPopup && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  maxHeight: '60vh',
                  minHeight: 120,
                  overflowY: 'auto',
                  background: '#fff',
                  border: '2px solid #ff6b35',
                  borderRadius: 14,
                  zIndex: 1001,
                  boxShadow: '0 6px 32px rgba(34,34,34,0.18)'
                }}>
                  {manufacturers.map(m => (
                    <div
                      key={m.id}
                      style={{ padding: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', background: String(selectedBrand) === String(m.id) ? '#f6f6f6' : '#fff' }}
                      onClick={() => {
                        setSelectedBrand(String(m.id));
                        setShowBrandPopup(false);
                      }}
                    >
                      {m.logo_url && <img src={m.logo_url} alt={m.display_name} style={{ width: 32, height: 16, objectFit: 'contain', marginRight: 8 }} />}
                      <span>{m.display_name}</span>
                    </div>
                  ))}
                  {manufacturers.length === 0 && <div style={{ padding: 10, color: '#888' }}>No brands found</div>}
                </div>
              )}
              {selectedBrandObj && (
                <div className="d-flex align-items-center mt-2">
                  <img src={selectedBrandObj.logo_url} alt={selectedBrandObj.display_name} style={{ width: 40, height: 20, objectFit: 'contain', marginRight: 8 }} />
                  <span>{selectedBrandObj.display_name}</span>
                </div>
              )}
            </div>
            <div className="mb-4" ref={modelInputRef} style={{ position: 'relative' }}>
              <label htmlFor="model" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Select Model
              </label>
              <input
                id="model"
                className="form-control form-control-modern"
                type="text"
                value={selectedModelObj ? selectedModelObj.display_name : ''}
                placeholder="Choose a model"
                readOnly
                onClick={() => selectedBrand && setShowModelPopup(true)}
                required
                disabled={!selectedBrand}
                style={{ cursor: selectedBrand ? 'pointer' : 'not-allowed', background: '#f9f9f9' }}
              />
              {showModelPopup && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  maxHeight: 220,
                  overflowY: 'auto',
                  background: '#fff',
                  border: '1.5px solid #eee',
                  borderRadius: 10,
                  zIndex: 1001,
                  boxShadow: '0 2px 12px rgba(34,34,34,0.10)'
                }}>
                  {models.map(m => (
                    <div
                      key={m.id}
                      style={{ padding: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', background: String(selectedModel) === String(m.id) ? '#f6f6f6' : '#fff' }}
                      onClick={() => {
                        setSelectedModel(String(m.id));
                        setShowModelPopup(false);
                      }}
                    >
                      {m.logo && <img src={m.logo} alt={m.display_name} style={{ width: 32, height: 16, objectFit: 'contain', marginRight: 8 }} />}
                      <span>{m.display_name}</span>
                    </div>
                  ))}
                  {models.length === 0 && <div style={{ padding: 10, color: '#888' }}>No models found</div>}
                </div>
              )}
              {selectedModelObj && (
                <div className="d-flex align-items-center mt-2">
                  <img src={selectedModelObj.logo} alt={selectedModelObj.display_name} style={{ width: 40, height: 20, objectFit: 'contain', marginRight: 8 }} />
                  <span>{selectedModelObj.display_name}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Year
              </label>
              <select
                id="year"
                className="form-control form-control-modern"
                value={year}
                onChange={e => setYear(e.target.value)}
                required
                style={{ cursor: 'pointer', background: '#f9f9f9' }}
              >
                <option value="">Select year</option>
                {Array.from({ length: (new Date().getFullYear() + 1) - 1900 + 1 }, (_, i) => (new Date().getFullYear() + 1) - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="mb-4">
              <label htmlFor="engineSize" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Engine Size (Cylinders)
              </label>
              <input
                id="engineSize"
                className="form-control form-control-modern"
                type="number"
                min="1"
                max="16"
                value={engineSize}
                onChange={e => setEngineSize(e.target.value)}
                placeholder="e.g. 4, 6, 8"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="vinNumber" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                VIN Number
              </label>
              <input
                id="vinNumber"
                className="form-control form-control-modern"
                type="text"
                value={vinNumber}
                onChange={e => setVinNumber(e.target.value)}
                placeholder="Enter VIN number"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="registrationExpiry" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Registration Expiry
              </label>
              <DatePicker
                views={['year', 'month']}
                label="Registration Expiry"
                value={registrationExpiry}
                onChange={setRegistrationExpiry}
                renderInput={(params) => <TextField {...params} fullWidth required size="small" />}
                minDate={dayjs('1900-01-01')}
                maxDate={dayjs().add(10, 'year')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="insuranceExpiry" className="form-label fw-semibold mb-3" style={{ fontSize: '16px' }}>
                Insurance Expiry
              </label>
              <DatePicker
                views={['year', 'month']}
                label="Insurance Expiry"
                value={insuranceExpiry}
                onChange={setInsuranceExpiry}
                renderInput={(params) => <TextField {...params} fullWidth required size="small" />}
                minDate={dayjs('1900-01-01')}
                maxDate={dayjs().add(10, 'year')}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-send-otp w-100" disabled={!selectedBrand || !selectedModel}
          style={{ marginTop: 12 }}>
          Proceed
        </button>
      </form>
      </LocalizationProvider>
    </div>
  );
};

export default BrandModelForm;
