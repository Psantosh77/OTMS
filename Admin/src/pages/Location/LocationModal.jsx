import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

function LocationModal({ isOpen, onClose, onSubmit, initialData, mode }) {
  const [form, setForm] = useState({
    name: '',
    code: '',
    state: '',
    city: '',
    pinNo: '',
    address: '',
    active: true,
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const lastObjectUrl = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.locationName || '',
        code: initialData.locationCode || '',
        state: initialData.stateName || '',
        city: initialData.district || '',
        pinNo: initialData.pinNo || '',
        address: initialData.address || '',
        active: initialData.isActive ?? true,
        description: initialData.description || '',
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      } else {
        setImagePreview('');
      }
    } else {
      setForm({
        name: '',
        code: '',
        state: '',
        city: '',
        pinNo: '',
        address: '',
        active: true,
        description: '',
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If an image file is selected, upload via multipart/form-data to backend which returns saved object
    (async () => {
      try {
        let finalResult = null;
        if (imageFile) {
          setUploading(true);
          const formData = new FormData();
          if (initialData?._id) formData.append('id', initialData._id);
          formData.append('locationName', form.name);
          formData.append('locationCode', form.code);
          formData.append('stateName', form.state);
          formData.append('district', form.city);
          formData.append('pinNo', form.pinNo);
          formData.append('address', form.address);
          formData.append('description', form.description || '');
          formData.append('isActive', String(form.active));
          formData.append('image', imageFile);
          // use local api instance to post multipart
          const api = (await import('../../utils/apiConfig/apiconfig')).default;
          const res = await api.post('locations/add', formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
          finalResult = res?.data;
          setUploading(false);
        } else {
          // fallback to JSON payload
          const payload = {
            ...(initialData?._id ? { id: initialData._id } : {}),
            locationName: form.name,
            locationCode: form.code,
            stateName: form.state,
            district: form.city,
            pinNo: form.pinNo,
            address: form.address,
            description: form.description,
            isActive: form.active,
          };
          onSubmit(payload);
          onClose();
          return;
        }

        const returnedData = finalResult?.data || finalResult;
        const locObj = returnedData ? { ...returnedData, id: returnedData._id || returnedData.id || initialData?._id } : { ...form, id: initialData?._id || Date.now() };
        // pass marker so parent doesn't re-post
        onSubmit({ __fromFormData: true, data: locObj });
        onClose();
      } catch (err) {
        console.error('Location save failed', err);
        setUploading(false);
      }
    })();
  };

  // cleanup object url
  useEffect(() => {
    return () => {
      if (lastObjectUrl.current) {
        try { URL.revokeObjectURL(lastObjectUrl.current); } catch (e) {}
      }
    };
  }, []);

  return (
    <Dialog open={!!isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Location' : 'Add Location'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField name="name" label="Location Name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField name="code" label="Location Code" value={form.code} onChange={handleChange} required fullWidth />
            <TextField name="state" label="State" value={form.state} onChange={handleChange} required fullWidth />
            <TextField name="city" label="City/District" value={form.city} onChange={handleChange} required fullWidth />
            <TextField name="pinNo" label="Pin Code" value={form.pinNo} onChange={handleChange} required fullWidth />
            <TextField name="address" label="Address" value={form.address} onChange={handleChange} required fullWidth multiline rows={2} />
            <TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} />
            {/* Image upload */}
            <div>
              <label htmlFor="location-image" style={{ display: 'block', marginBottom: 8 }}>Location Image</label>
              <input
                id="location-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    if (lastObjectUrl.current) {
                      try { URL.revokeObjectURL(lastObjectUrl.current); } catch (err) {}
                    }
                    const url = URL.createObjectURL(file);
                    lastObjectUrl.current = url;
                    setImagePreview(url);
                  }
                }}
              />
              {imagePreview ? (
                <Box mt={1}>
                  <img src={imagePreview} alt="preview" style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 8 }} />
                </Box>
              ) : null}
            </div>
            <FormControlLabel control={<Checkbox name="active" checked={!!form.active} onChange={handleChange} />} label="Active" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">{mode === 'edit' ? 'Update' : 'Save'}</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LocationModal;
