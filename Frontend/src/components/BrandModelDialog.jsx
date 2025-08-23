import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { apiService } from '../utils/apiService';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const BrandModelDialog = ({ open, onClose, email, selectedCity, onSelect }) => {
  const [brandList, setBrandList] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelList, setModelList] = useState([]);
  const [modelSearch, setModelSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBrandObj, setSelectedBrandObj] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedModelObj, setSelectedModelObj] = useState(null);
  const [step, setStep] = useState(0); // 0: brand, 1: model, 2: fuel, 3: cylinder
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedCylinder, setSelectedCylinder] = useState('');

  useEffect(() => {
    if (open && email) {
      setLoadingBrands(true);
      apiService.post('/cardata/getallmanufacturers', { email })
        .then(res => {
          const brands = res.data?.data?.manufacturers || [];
          setBrandList(brands);
        })
        .catch(() => setBrandList([]))
        .finally(() => setLoadingBrands(false));
    }
  }, [open, email]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.display_name);
    setSelectedBrandObj(brand);
    setModelList(brand.car_models || []);
    setModelSearch('');
    setStep(1);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model.display_name);
    setSelectedModelObj(model);
    setStep(2);
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setStep(3);
  };

  const handleCylinderSelect = (cylinder) => {
    setSelectedCylinder(cylinder);
    if (onSelect) {
      onSelect({
        brand: selectedBrandObj,
        model: selectedModelObj,
        variant: selectedVariant,
        cylinder: cylinder,
        city: selectedCity
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ minWidth: 340, minHeight: 200, padding: 24 }}>
        {step === 0 && (
          <>
            <h3 style={{ marginBottom: 16, fontWeight: 500 }}>Select Brand</h3>
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
          </>
        )}
        {step === 1 && selectedBrandObj && (
          <>
            <h3 style={{ margin: '24px 0 16px', fontWeight: 500 }}>Select Model</h3>
            <input
              type="text"
              placeholder="Search model..."
              value={modelSearch}
              onChange={e => setModelSearch(e.target.value)}
              style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15 }}
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
          </>
        )}
        {step === 2 && (
          <>
            <h3 style={{ margin: '24px 0 16px', fontWeight: 500 }}>Select Fuel Type</h3>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={4} sm={4} md={4}>
                <Button onClick={() => handleVariantSelect('Petrol')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <LocalGasStationIcon sx={{ color: '#1976d2', fontSize: 36, mb: 1 }} />
                  <span style={{ fontSize: 15, color: '#222' }}>Petrol</span>
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Button onClick={() => handleVariantSelect('Diesel')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <DirectionsCarIcon sx={{ color: '#388e3c', fontSize: 36, mb: 1 }} />
                  <span style={{ fontSize: 15, color: '#222' }}>Diesel</span>
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Button onClick={() => handleVariantSelect('Electric')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <FlashOnIcon sx={{ color: '#fbc02d', fontSize: 36, mb: 1 }} />
                  <span style={{ fontSize: 15, color: '#222' }}>Electric</span>
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        {step === 3 && (
          <>
            <h3 style={{ margin: '24px 0 16px', fontWeight: 500 }}>Select Number of Cylinders</h3>
            <Grid container spacing={2} justifyContent="center">
              {[3, 4, 5, 6, '8+'].map((cylinder) => (
                <Grid item xs={4} sm={2} md={2} key={cylinder}>
                  <Button onClick={() => handleCylinderSelect(cylinder)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                    <span style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{cylinder}</span>
                    <span style={{ fontSize: 15, color: '#222' }}>Cylinders</span>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default BrandModelDialog;
