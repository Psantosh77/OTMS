import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '../../utils/apiService';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FlashOnIcon from '@mui/icons-material/FlashOn';


const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBrandObj, setSelectedBrandObj] = useState(null);
  const [vinNumber, setVinNumber] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedModelObj, setSelectedModelObj] = useState(null);
  const [registrationDate, setRegistrationDate] = useState('');
  const [registrationDateError, setRegistrationDateError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [modelList, setModelList] = useState([]);
  const [modelSearch, setModelSearch] = useState('');
  const [selectedCylinder, setSelectedCylinder] = useState('');
  const [showCylinderModal, setShowCylinderModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  console.log(showBrandModal)

  useEffect(() => {
    // Prefer email from navigation state, fallback to localStorage
    let userEmail = '';
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      localStorage.setItem('email', location.state.email);
      userEmail = location.state.email;
    } else {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
        userEmail = storedEmail;
      }
    }

    // Fetch manufacturers on mount (after email is set)
    const fetchManufacturers = async (emailToUse) => {
      setLoadingBrands(true);
      try {
        const res = await apiService.post('/cardata/getallmanufacturers', { email: emailToUse });
        const brands = res.data?.data?.manufacturers || [];
        setBrandList(brands);

        // Prefill all user fields if user object present
        const user = res.data?.data?.user;
        const selectedBrandId = res.data?.data?.selectedBrandId;
        const selectedModelId = res.data?.data?.selectedModelId;
        if (selectedBrandId && brands.length > 0) {
          const brandObj = brands.find(b => b._id === selectedBrandId || b.id === selectedBrandId);
          if (brandObj) {
            setSelectedBrand(brandObj.display_name);
            setSelectedBrandObj(brandObj);
            setModelList(brandObj.car_models || []);
            // If modelId present, prefill model
            if (selectedModelId && Array.isArray(brandObj.car_models)) {
              const modelObj = brandObj.car_models.find(m => m._id === selectedModelId || m.id === selectedModelId);
              if (modelObj) {
                setSelectedModel(modelObj.display_name);
                setSelectedModelObj(modelObj);
              }
            }
          }
        }
        // Prefill other fields from user object
        if (user) {
          if (user.vin_number) setVinNumber(user.vin_number);
          // Format ISO date string to yyyy-MM-dd for input fields
          if (user.registration_expiry) {
            const regDate = user.registration_expiry.slice(0, 10);
            setRegistrationDate(regDate);
          }
          if (user.insurance_expiry) {
            const insDate = user.insurance_expiry.slice(0, 10);
            setExpiryDate(insDate);
          }
          if (user.engine_size) setSelectedCylinder(user.engine_size);
        }
      } catch (err) {
        setBrandList([]);
      } finally {
        setLoadingBrands(false);
      }
    };
    if (userEmail) {
      fetchManufacturers(userEmail);
    }
  }, [location.state]);


  const onBrandclickOpenModel = (e) => {
    e.preventDefault();
    setShowBrandModal(true);
    // No need to fetch brands here, already loaded on mount
  };

  // Open model modal for selected brand
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.display_name);
    setSelectedBrandObj(brand);
    setShowBrandModal(false);
    setModelList(brand.car_models || []);
    setModelSearch('');
    setShowModelModal(true);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model.display_name);
    setSelectedModelObj(model);
    setShowModelModal(false);
    setShowVariantModal(true);
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setShowVariantModal(false);
    setShowCylinderModal(true);
  };

  const handleCylinderSelect = (cylinder) => {
    setSelectedCylinder(cylinder);
    setShowCylinderModal(false);
  };

  // Date validation helpers
  const todayStr = new Date().toISOString().split('T')[0];

  const handleRegistrationDateChange = (e) => {
    const value = e.target.value;
    setRegistrationDate(value);
    if (value > todayStr) {
      setRegistrationDateError('Registration date cannot be in the future.');
    } else {
      setRegistrationDateError('');
      // If expiry date is before registration, clear expiry
      if (expiryDate && expiryDate < value) {
        setExpiryDate('');
        setExpiryDateError('');
      }
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    setExpiryDate(value);
    if (registrationDate && value < registrationDate) {
      setExpiryDateError('Expiry date cannot be before registration date.');
    } else if (value < todayStr) {
      setExpiryDateError('Expiry date cannot be in the past.');
    } else {
      setExpiryDateError('');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setUpdateMsg('');
    if (!email || !selectedBrandObj || !selectedModelObj || !registrationDate || !expiryDate || !vinNumber) {
      setUpdateMsg('Please fill all required fields.');
      return;
    }
    setUpdating(true);
    try {
      const payload = {
        email,
        brand_id: selectedBrandObj._id,
        model_id: selectedModelObj._id,
        year: registrationDate.slice(0, 4),
        engine_size: selectedCylinder || '',
        vin_number: vinNumber,
        registration_expiry: registrationDate,
        insurance_expiry: expiryDate,
      };
      const res = await apiService.post('/user/updateuser', payload);

      console.log(res)

      setUpdateMsg(res.data?.message || 'Profile updated successfully!');
      if (res.data?.status === 200) {
        navigate('/client/dashboard');
      console.log("fsts")
       //window.location.href = '/client/dashboard'; // Force reload to reflect changes
      }
    } catch (err) {
      setUpdateMsg(err.response?.data?.message || 'Update failed.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {(loadingBrands || updating) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress size={60} thickness={5} />
        </div>
      )}
      <div style={{ padding: 40, textAlign: 'center', filter: loadingBrands ? 'blur(2px)' : 'none', pointerEvents: loadingBrands ? 'none' : 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px 0 #ff98001a',top:'5rem' , marginBottom:'4rem', position:"relative" }}>
          
      {/* Cylinder Selection Modal */}
      <Dialog open={showCylinderModal} onClose={() => setShowCylinderModal(false)}>
        <div style={{ minWidth: 320, minHeight: 120, padding: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 500 }}>Select Number of Cylinders</h3>
          <Grid container spacing={2} justifyContent="center">
            {[3, 4, 5, 6, '8+'].map((cylinder) => (
              <Grid item xs={4} sm={2} md={2} key={cylinder}>
                <Button
                  onClick={() => handleCylinderSelect(cylinder)}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}
                >
                  <span style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{cylinder}</span>
                  <span style={{ fontSize: 15, color: '#222' }}>Cylinders</span>
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      </Dialog>
        <h2>Update Your Profile</h2>
        <p>Welcome! Please update your user information here.</p>
        <form className="update-user-form">
          <div className="update-user-col">
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: 4, fontWeight: 500, textAlign: 'left' }}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff9800', background: '#fff', color: '#ff9800', fontWeight: 600 }}
                required
                disabled
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="vinNumber" style={{ display: 'block', marginBottom: 4, fontWeight: 500, textAlign: 'left' }}>VIN Number</label>
              <input
                id="vinNumber"
                type="text"
                placeholder="VIN Number"
                name="vinNumber"
                value={vinNumber}
                onChange={e => setVinNumber(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff9800', background: '#fff', color: '#ff9800', fontWeight: 600 }}
                maxLength={17}
                autoComplete="off"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="registrationDate" style={{ display: 'block', marginBottom: 4, fontWeight: 500, textAlign: 'left' }}>Registration Date</label>
              <input
                id="registrationDate"
                type="date"
                placeholder="Registration Date"
                name="registrationDate"
                value={registrationDate}
                onChange={handleRegistrationDateChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: registrationDateError ? '1px solid #f44336' : '#ff9800', background: '#fff', color: '#ff9800', fontWeight: 600 }}
                autoComplete="off"
                max={todayStr}
              />
              {registrationDateError && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{registrationDateError}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="expiryDate" style={{ display: 'block', marginBottom: 4, fontWeight: 500, textAlign: 'left' }}>Expiry Date</label>
              <input
                id="expiryDate"
                type="date"
                placeholder="Expiry Date"
                name="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: expiryDateError ? '1px solid #f44336' : '#ff9800', background: '#fff', color: '#ff9800', fontWeight: 600 }}
                autoComplete="off"
                min={registrationDate || todayStr}
              />
              {expiryDateError && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{expiryDateError}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={onBrandclickOpenModel}
                sx={{
                  justifyContent: 'flex-start',
                  background: '#fff8f0',
                  color: selectedBrand ? '#ff9800' : '#bbb',
                  borderColor: '#ff9800',
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: 16,
                  padding: '8px',
                  margin: 0,
                  fontWeight: 600,
                  '&:hover': { background: '#fff3e0', borderColor: '#ff9800', color: '#ff9800' }
                }}
                aria-label="Select Brand"
              >
                {selectedBrand && selectedModel && selectedVariant && selectedCylinder
                  ? `${selectedBrand} - ${selectedModel} - ${selectedVariant} - ${selectedCylinder} Cyl`
                  : selectedBrand && selectedModel && selectedVariant
                  ? `${selectedBrand} - ${selectedModel} - ${selectedVariant}`
                  : selectedBrand && selectedModel
                  ? `${selectedBrand} - ${selectedModel}`
                  : selectedBrand || 'Select Brand'}
              </Button>
      {/* Variant Selection Modal */}
      <Dialog open={showVariantModal} onClose={() => setShowVariantModal(false)}>
        <div style={{ minWidth: 320, minHeight: 120, padding: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 500 }}>Select Variant</h3>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} sm={4} md={4}>
              <Button
                onClick={() => handleVariantSelect('Petrol')}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}
              >
                <LocalGasStationIcon sx={{ color: '#1976d2', fontSize: 36, mb: 1 }} />
                <span style={{ fontSize: 15, color: '#222' }}>Petrol</span>
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Button
                onClick={() => handleVariantSelect('Diesel')}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}
              >
                <DirectionsCarIcon sx={{ color: '#388e3c', fontSize: 36, mb: 1 }} />
                <span style={{ fontSize: 15, color: '#222' }}>Diesel</span>
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Button
                onClick={() => handleVariantSelect('Electric')}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}
              >
                <FlashOnIcon sx={{ color: '#fbc02d', fontSize: 36, mb: 1 }} />
                <span style={{ fontSize: 15, color: '#222' }}>Electric</span>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Dialog>

      {/* Cylinder Selection Modal */}
      <Dialog open={showCylinderModal} onClose={() => setShowCylinderModal(false)}>
        <div style={{ minWidth: 320, minHeight: 120, padding: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 500 }}>Select Number of Cylinders</h3>
          <Grid container spacing={2} justifyContent="center">
            {[3, 4, 5, 6, '8+'].map((cylinder) => (
              <Grid item xs={4} sm={2} md={2} key={cylinder}>
                <Button
                  onClick={() => handleCylinderSelect(cylinder)}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}
                >
                  <span style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{cylinder}</span>
                  <span style={{ fontSize: 15, color: '#222' }}>Cylinders</span>
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      </Dialog>
            </div>
          </div>
       
          <div style={{ flexBasis: '100%' }}>
            <button
              type="button"
              className="update-user-btn"
              onClick={handleUpdateUser}
              disabled={updating}
              style={{
                width: '100%',
                background: updating ? '#ffb74d' : '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 700,
                fontSize: 18,
                marginTop: 8,
                cursor: updating ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px 0 #ff980033',
                transition: 'background 0.2s',
              }}
            >
              {updating ? 'Updating...' : 'Proceed'}
            </button>
            {updateMsg && <div style={{ marginTop: 12, color: updateMsg.includes('success') ? '#388e3c' : '#f44336', fontWeight: 500 }}>{updateMsg}</div>}
          </div>
        </form>
      </div>
      <Dialog open={showBrandModal} onClose={() => setShowBrandModal(false)}>
        <div style={{ minWidth: 340, minHeight: 200, padding: 24 }}>
          <input
            type="text"
            placeholder="Search brand..."
            value={brandSearch}
            onChange={e => setBrandSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15 }}
            autoFocus
          />
          {loadingBrands ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
              <CircularProgress />
            </div>
          ) : brandList.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>No brands found.</div>
          ) : (
            <Grid container spacing={2}>
              {brandList
                .filter(brand => brand.display_name.toLowerCase().includes(brandSearch.toLowerCase()))
                .map((brand) => {
                  const hasModels = Array.isArray(brand.car_models) && brand.car_models.length > 0;
                  return (
                    <Grid item xs={4} sm={3} md={2} key={brand._id}>
                      <Button
                        onClick={() => hasModels && handleBrandSelect(brand)}
                        disabled={!hasModels}
                        sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 1, border: '1px solid #eee', borderRadius: 2, minHeight: 90,
                          opacity: hasModels ? 1 : 0.5,
                          cursor: hasModels ? 'pointer' : 'not-allowed',
                        }}
                        title={hasModels ? '' : 'No models available'}
                      >
                        <Avatar
                          src={brand.logo_url || '/vite.svg'}
                          alt={brand.display_name}
                          sx={{ width: 48, height: 48, mb: 1, bgcolor: '#fff' }}
                        />
                        <span style={{ fontSize: 14, color: '#222', textAlign: 'center', wordBreak: 'break-word' }}>{brand.display_name}</span>
                        {!hasModels && (
                          <span style={{ color: '#f44336', fontSize: 12, marginTop: 2 }}>No models</span>
                        )}
                      </Button>
                    </Grid>
                  );
                })}
            </Grid>
          )}
        </div>
      </Dialog>

      {/* Model Selection Modal (not nested) */}
      <Dialog open={showModelModal} onClose={() => setShowModelModal(false)}>
        <div style={{ minWidth: 340, minHeight: 200, padding: 24 }}>
          <input
            type="text"
            placeholder="Search model..."
            value={modelSearch}
            onChange={e => setModelSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15 }}
            autoFocus
          />
          {modelList.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>No models found.</div>
          ) : (
            <Grid container spacing={2}>
              {modelList
                .filter(model => model.display_name.toLowerCase().includes(modelSearch.toLowerCase()))
                .map((model) => (
                  <Grid item xs={4} sm={3} md={2} key={model._id}>
                    <Button
                      onClick={() => handleModelSelect(model)}
                      sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 1, border: '1px solid #eee', borderRadius: 2, minHeight: 90
                      }}
                    >
                      <Avatar
                        src={model.logo ? (model.logo.startsWith('http') ? model.logo : (model.logo.startsWith('//') ? 'https:' + model.logo : model.logo)) : '/vite.svg'}
                        alt={model.display_name}
                        sx={{ width: 48, height: 48, mb: 1, bgcolor: '#fff' }}
                      />
                      <span style={{ fontSize: 14, color: '#222', textAlign: 'center', wordBreak: 'break-word' }}>{model.display_name}</span>
                    </Button>
                  </Grid>
                ))}
            </Grid>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default UpdateUser;