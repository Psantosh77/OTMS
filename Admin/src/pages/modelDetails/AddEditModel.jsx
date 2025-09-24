import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const AddEditModel = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    id: undefined,
    brand_id: '',
    name: '',
    display_name: '',
    is_usable: false,
    logo: ''
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || initialData._id,
        brand_id: initialData.brand_id || initialData.brand_id || initialData.brand_id || '',
        name: initialData.name || '',
        display_name: initialData.display_name || initialData.name || '',
        is_usable: !!initialData.is_usable,
        logo: initialData.logo || ''
      });
    } else {
      setForm({ id: undefined, brand_id: '', name: '', display_name: '', is_usable: false, logo: '' });
    }
  }, [initialData, open]);

  useEffect(() => {
    if (!open) return;
    const fetchBrands = async () => {
      try {
        const { postApi } = await import('../../utils/apiConfig/apiService');
  const res = await postApi({ url: 'cardata/getallmanufacturers', payload: {} });
        const manufacturers = res?.data?.manufacturers || [];
        setBrands(manufacturers.map(m => ({ id: m.id || m._id, display_name: m.display_name || m.name })));
      } catch (err) {
        console.warn('Failed to fetch brands for model modal', err);
      }
    };
    fetchBrands();
  }, [open]);

  const handleChange = (key) => (e) => {
    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const payload = {
      id: form.id ? Number(form.id) : undefined,
      brand_id: form.brand_id ? Number(form.brand_id) : undefined,
      name: form.name || '',
      display_name: form.display_name || form.name || '',
      vehicle_type: form.vehicle_type || 'Passenger',
      is_usable: !!form.is_usable,
      logo: form.logo || null
    };

    // backend supports array or single object; send single object
    if (onSave) await onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Model' : 'Add Model'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField select label="Brand" value={form.brand_id} onChange={handleChange('brand_id')}
            helperText="Select manufacturer/brand for this model">
            {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.display_name || b.id}</MenuItem>)}
          </TextField>
          <TextField label="Model Name" value={form.name} onChange={handleChange('name')} />
          <TextField label="Display Name" value={form.display_name} onChange={handleChange('display_name')} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={form.is_usable} onChange={(e) => setForm(prev => ({ ...prev, is_usable: e.target.checked }))} />
              <span>Is Usable</span>
            </label>
          </Box>
          <TextField label="Logo URL" value={form.logo} onChange={handleChange('logo')} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModel;
