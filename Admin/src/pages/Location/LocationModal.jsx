

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function makeEmptyAddress() {
  return {
    area: '', district: '', street: '', building: '', floor: '', apartment: '', po_box: '', landmark: '', makani_number: '', gps: { lat: '', lng: '' }
  };
}

function makeEmptyCity() {
  return {
    name: '', postal_code: '', icon: '', makani_number: '', location_type: '', location_file: '', address: [ makeEmptyAddress() ]
  };
}

function LocationModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    emirate: '',
    icon: '',
    isActive: true,
    location_type: '',
    cities: [ makeEmptyCity() ]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Map possible legacy shape to new shape if needed
      setForm(prev => ({ ...prev, ...initialData }));
    } else {
      setForm({ emirate: '', icon: '', isActive: true, location_type: '', cities: [ makeEmptyCity() ] });
    }
  }, [initialData, isOpen]);

  const updateField = (path, value) => {
    setForm(prev => {
      const out = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = out;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!(p in cur)) cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length -1]] = value;
      return out;
    });
  };

  const addCity = () => setForm(prev => ({ ...prev, cities: [ ...prev.cities, makeEmptyCity() ] }));
  const removeCity = (index) => setForm(prev => ({ ...prev, cities: prev.cities.filter((c,i) => i !== index) }));
  const addAddress = (cityIdx) => setForm(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.cities[cityIdx].address.push(makeEmptyAddress()); return copy; });
  const removeAddress = (cityIdx, addrIdx) => setForm(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.cities[cityIdx].address = copy.cities[cityIdx].address.filter((a,i) => i !== addrIdx); return copy; });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
      try {
        // Validate minimal required fields: emirate + at least one city
        if (!form.emirate) throw new Error('Emirate is required');
        if (!Array.isArray(form.cities) || form.cities.length === 0) throw new Error('At least one city is required');

        const payload = JSON.parse(JSON.stringify(form));
        // normalize location_type to lowercase where present
        if (payload.location_type) payload.location_type = String(payload.location_type).trim().toLowerCase();
        payload.cities = payload.cities.map(city => {
          const c = { ...city };
          if (c.location_type) c.location_type = String(c.location_type).trim().toLowerCase();
          // coerce empty gps strings to numbers or null
          if (Array.isArray(c.address)) {
            c.address = c.address.map(a => ({
              ...a,
              gps: a.gps && a.gps.lat !== '' ? { lat: Number(a.gps.lat), lng: Number(a.gps.lng) } : undefined
            }));
          }
          return c;
        });

        // Return payload to parent and let parent handle posting
        if (onSubmit) onSubmit(payload);
        onClose();
      } catch (err) {
        console.error('Save failed', err);
        alert(err?.message || err?.toString() || 'Save failed');
      } finally {
        setSaving(false);
      }
  };

  return (
    <Dialog open={!!isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? 'Edit Location' : 'Add Location'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Emirate" value={form.emirate} onChange={e => updateField('emirate', e.target.value)} required />
            <TextField label="Icon URL" value={form.icon} onChange={e => updateField('icon', e.target.value)} placeholder="https://..." />
            <FormControl fullWidth>
              <InputLabel id="loc-type-label">Location Type</InputLabel>
              <Select labelId="loc-type-label" value={form.location_type || ''} label="Location Type" onChange={e => updateField('location_type', e.target.value)}>
                <MenuItem value={''}><em>None</em></MenuItem>
                <MenuItem value={'onsite'}>Onsite</MenuItem>
                <MenuItem value={'offsite'}>Offsite</MenuItem>
                <MenuItem value={'remote'}>Remote</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="isActive-label">Is Active</InputLabel>
              <Select labelId="isActive-label" value={form.isActive ? 'true' : 'false'} onChange={e => updateField('isActive', e.target.value === 'true')}>
                <MenuItem value={'true'}>True</MenuItem>
                <MenuItem value={'false'}>False</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Cities</Typography>
                <IconButton size="small" onClick={addCity}><AddIcon /></IconButton>
              </Stack>

              {form.cities.map((city, ci) => (
                <Box key={ci} mt={2} p={2} borderRadius={1} style={{ border: '1px solid #eee' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField label="Name" value={city.name} onChange={e => updateField(`cities.${ci}.name`, e.target.value)} required />
                    <TextField label="Postal Code" value={city.postal_code} onChange={e => updateField(`cities.${ci}.postal_code`, e.target.value)} />
                    <TextField label="Icon URL" value={city.icon} onChange={e => updateField(`cities.${ci}.icon`, e.target.value)} />
                    <TextField label="Makani Number" value={city.makani_number} onChange={e => updateField(`cities.${ci}.makani_number`, e.target.value)} />
                    <TextField label="Location File URL" value={city.location_file} onChange={e => updateField(`cities.${ci}.location_file`, e.target.value)} />
                    <FormControl sx={{ minWidth: 140 }}>
                      <InputLabel id={`city-type-${ci}`}>City Type</InputLabel>
                      <Select labelId={`city-type-${ci}`} value={city.location_type || ''} label="City Type" onChange={e => updateField(`cities.${ci}.location_type`, e.target.value)}>
                        <MenuItem value={''}><em>None</em></MenuItem>
                        <MenuItem value={'onsite'}>Onsite</MenuItem>
                        <MenuItem value={'offsite'}>Offsite</MenuItem>
                        <MenuItem value={'remote'}>Remote</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton onClick={() => removeCity(ci)}><DeleteIcon /></IconButton>
                  </Stack>

                  <Box mt={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">Addresses</Typography>
                      <IconButton size="small" onClick={() => addAddress(ci)}><AddIcon /></IconButton>
                    </Stack>

                    {city.address && city.address.map((addr, ai) => (
                      <Box key={ai} mt={1} p={1} style={{ border: '1px dashed #ddd' }}>
                        <Stack spacing={1}>
                          <TextField label="Area" value={addr.area} onChange={e => updateField(`cities.${ci}.address.${ai}.area`, e.target.value)} />
                          <TextField label="District" value={addr.district} onChange={e => updateField(`cities.${ci}.address.${ai}.district`, e.target.value)} />
                          <TextField label="Street" value={addr.street} onChange={e => updateField(`cities.${ci}.address.${ai}.street`, e.target.value)} />
                          <TextField label="Building" value={addr.building} onChange={e => updateField(`cities.${ci}.address.${ai}.building`, e.target.value)} />
                          <Stack direction="row" spacing={1}>
                            <TextField label="Floor" value={addr.floor} onChange={e => updateField(`cities.${ci}.address.${ai}.floor`, e.target.value)} />
                            <TextField label="Apartment" value={addr.apartment} onChange={e => updateField(`cities.${ci}.address.${ai}.apartment`, e.target.value)} />
                            <TextField label="PO Box" value={addr.po_box} onChange={e => updateField(`cities.${ci}.address.${ai}.po_box`, e.target.value)} />
                          </Stack>
                          <TextField label="Landmark" value={addr.landmark} onChange={e => updateField(`cities.${ci}.address.${ai}.landmark`, e.target.value)} />
                          <TextField label="Makani Number" value={addr.makani_number} onChange={e => updateField(`cities.${ci}.address.${ai}.makani_number`, e.target.value)} />
                          <Stack direction="row" spacing={1}>
                            <TextField label="GPS Lat" value={addr.gps?.lat} onChange={e => updateField(`cities.${ci}.address.${ai}.gps.lat`, e.target.value)} />
                            <TextField label="GPS Lng" value={addr.gps?.lng} onChange={e => updateField(`cities.${ci}.address.${ai}.gps.lng`, e.target.value)} />
                            <IconButton onClick={() => removeAddress(ci, ai)}><DeleteIcon /></IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary" disabled={saving}>{saving ? 'Saving...' : (initialData ? 'Update' : 'Save')}</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LocationModal;
