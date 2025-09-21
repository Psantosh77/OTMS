

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// delete/add icons removed - single-city form
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function makeEmptyAddress() {
  return {
    building_no: '',
    street_no: '',
    address1: '',
    address2: '',
    makani_number: '',
    gps: { lat: '', lng: '' }
  };
}
function makeEmptyCity() {
  return {
    name: '',
    location_type: '',
    address: makeEmptyAddress()
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
  // simple in-memory mapping for emirate->cities (adjust as needed or fetch from API)
  const emirateCities = {
    'Abu Dhabi': ['Abu Dhabi City', 'Al Ain', 'Madinat Zayed'],
    'Dubai': ['Dubai', 'Deira', 'Jumeirah'],
    'Sharjah': ['Sharjah City', 'Khor Fakkan']
  };

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

  // Single-city mode: always keep exactly one city in the form
  // add/remove city functions intentionally removed to prevent deleting or adding cities
  const addAddress = (cityIdx) => setForm(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.cities[cityIdx].address.push(makeEmptyAddress()); return copy; });
  // keep removeAddress for compatibility but don't expose UI to remove addresses
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

        // Ensure we send a single city object in cities[] and address is an object (not array)
        payload.cities = (payload.cities && payload.cities.length) ? payload.cities.map(city => {
          const c = { ...city };
          if (c.location_type) c.location_type = String(c.location_type).trim().toLowerCase();
          // coerce gps to numbers or null if present
          if (c.address && c.address.gps) {
            c.address.gps = {
              lat: c.address.gps.lat != null && c.address.gps.lat !== '' ? Number(c.address.gps.lat) : null,
              lng: c.address.gps.lng != null && c.address.gps.lng !== '' ? Number(c.address.gps.lng) : null
            };
          }
          return c;
        }) : [ makeEmptyCity() ];

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

  const formMarkup = (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, p: 2, borderRadius: 2, border: '1px solid #eee' }}>
      <Typography variant="h6" mb={1}>{initialData ? 'Edit Location' : 'Add Location'}</Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: 320 }}>
              <InputLabel id="emirate-label">Emirate</InputLabel>
              <Select labelId="emirate-label" value={form.emirate || ''} label="Emirate" onChange={e => {
                const val = e.target.value;
                // set emirate and reset city to first option for that emirate
                const cities = emirateCities[val] || [];
                setForm(prev => ({ ...prev, emirate: val, cities: [ { ...makeEmptyCity(), name: cities[0] || '' } ] }));
              }}>
                <MenuItem value={''}><em>None</em></MenuItem>
                {Object.keys(emirateCities).map(em => <MenuItem key={em} value={em}>{em}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: 320 }}>
              <InputLabel id="city-label">City</InputLabel>
              <Select labelId="city-label" value={(form.cities && form.cities[0] && form.cities[0].name) || ''} label="City" onChange={e => updateField('cities.0.name', e.target.value)}>
                <MenuItem value={''}><em>None</em></MenuItem>
                {(emirateCities[form.emirate] || []).map(cn => <MenuItem key={cn} value={cn}>{cn}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}><TextField sx={{ width: 320 }} label="Building / House No" value={form.cities[0].address.building_no} onChange={e => updateField('cities.0.address.building_no', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField sx={{ width: 320 }} label="Street No" value={form.cities[0].address.street_no} onChange={e => updateField('cities.0.address.street_no', e.target.value)} /></Grid>

          <Grid item xs={12} sm={6}><TextField sx={{ width: 320 }} label="Address 1" value={form.cities[0].address.address1} onChange={e => updateField('cities.0.address.address1', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField sx={{ width: 320 }} label="Address 2 (optional)" value={form.cities[0].address.address2} onChange={e => updateField('cities.0.address.address2', e.target.value)} /></Grid>

          <Grid item xs={12} sm={6}><TextField sx={{ width: 320 }} label="Makani Number" value={form.cities[0].address.makani_number} onChange={e => updateField('cities.0.address.makani_number', e.target.value)} /></Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: 320 }}>
              <InputLabel id="loc-type-label">Location Type</InputLabel>
              <Select sx={{ width: '100%' }} labelId="loc-type-label" value={form.location_type || ''} label="Location Type" onChange={e => updateField('location_type', e.target.value)}>
                <MenuItem value={''}><em>None</em></MenuItem>
                <MenuItem value={'onsite'}>Onsite</MenuItem>
                <MenuItem value={'offsite'}>Offsite</MenuItem>
                <MenuItem value={'remote'}>Remote</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: 320 }}>
              <InputLabel id="isActive-label">Is Active</InputLabel>
              <Select sx={{ width: '100%' }} labelId="isActive-label" value={form.isActive ? 'true' : 'false'} onChange={e => updateField('isActive', e.target.value === 'true')}>
                <MenuItem value={'true'}>True</MenuItem>
                <MenuItem value={'false'}>False</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        {/* Inline-only buttons (when not rendering inside Dialog) */}
        {!isOpen && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
                <Button sx={{ width: 320 }} type="submit" variant="contained" color="primary" disabled={saving}>{saving ? 'Saving...' : (initialData ? 'Update' : 'Save')}</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button sx={{ width: 320 }} type="button" variant="outlined" color="secondary" onClick={() => { if (onClose) onClose(); setForm({ emirate: '', icon: '', isActive: true, location_type: '', cities: [ makeEmptyCity() ] }); }}>Cancel</Button>
              </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );

  if (isOpen) {
    return (
      <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{initialData ? 'Edit Location' : 'Add Location'}</DialogTitle>
          <DialogContent>
            {formMarkup}
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" disabled={saving}>{saving ? 'Saving...' : (initialData ? 'Update' : 'Save')}</Button>
            <Button type="button" variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

  return formMarkup;
}

export default LocationModal;
