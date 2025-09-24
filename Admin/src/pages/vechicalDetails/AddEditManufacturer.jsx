import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// MenuItem removed because vehicle_type was removed from the form
import Box from '@mui/material/Box';

const AddEditManufacturer = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    display_name: '',
    is_procurable: false,
    is_usable: false,
    logo_url: '',
    logo_with_name: '',
    tags: '',
    // vehicle_type removed per request
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        display_name: initialData.display_name || '',
        is_procurable: !!initialData.is_procurable,
        is_usable: !!initialData.is_usable,
        logo_url: initialData.logo_url || '',
        logo_with_name: initialData.logo_with_name || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(',') : (initialData.tags || '')
      });
    } else {
      setForm({ display_name: '', is_procurable: false, is_usable: false, logo_url: '', logo_with_name: '', tags: '' });
    }
  }, [initialData, open]);

  const handleChange = (key) => (e) => {
    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // Build payload matching the manufacturer's data shape
    const tagsArray = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const payload = {
      ...(initialData && (initialData.id || initialData._id) ? { id: Number(initialData.id || initialData._id) } : {}),
      display_name: form.display_name || '',
      is_procurable: !!form.is_procurable,
      is_usable: !!form.is_usable,
      logo_url: form.logo_url || null,
      tags: tagsArray,
      logo_with_name: form.logo_with_name || form.logo_url || null,
      // vehicle_type intentionally omitted
    };

    if (onSave) await onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle>{initialData ? 'Edit Manufacturer' : 'Add Manufacturer'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Display Name" value={form.display_name} onChange={handleChange('display_name')} />
          <TextField label="Logo URL" value={form.logo_url} onChange={handleChange('logo_url')} />
          <TextField label="Logo With Name URL" value={form.logo_with_name} onChange={handleChange('logo_with_name')} />
          <TextField label="Tags (comma separated)" value={form.tags} onChange={handleChange('tags')} />
          {/* vehicle_type field removed by request */}
          <FormControlLabel control={<Checkbox checked={form.is_procurable} onChange={handleChange('is_procurable')} />} label="Is Procurable" />
          <FormControlLabel control={<Checkbox checked={form.is_usable} onChange={handleChange('is_usable')} />} label="Is Usable" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditManufacturer;
