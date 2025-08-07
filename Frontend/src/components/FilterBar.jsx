import React from "react";
import { Box, TextField, MenuItem, Stack, Button } from "@mui/material";

const FilterBar = ({ filters, setFilters, onFilter }) => {
  // Example options, replace with real data as needed
  const locations = ["All", "Delhi", "Mumbai", "Bangalore"];
  const brands = ["All", "Toyota", "Honda", "Ford"];
  const models = ["All", "Innova", "Civic", "Figo"];
  const services = ["All", "Car Spa", "Repair", "Inspection", "Emergency", "Car Rentals", "Scheduled Maintenance", "Vehicle Inspection"];
  const vendors = ["All", "AutoCare Garage", "Speedy Rentals", "Elite Motors"];

  return (
    <Box sx={{ mb: 3, p: 2, background: 'var(--color-card, #fff)', borderRadius: 3, boxShadow: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems="center" justifyContent="center">
        <TextField
          select
          label="Location"
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
          size="small"
          variant="filled"
          sx={{ minWidth: 150, borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: 'var(--color-text, #222)' } }}
        >
          {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Car Brand"
          value={filters.brand}
          onChange={e => setFilters({ ...filters, brand: e.target.value })}
          size="small"
          variant="filled"
          sx={{ minWidth: 150, borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: 'var(--color-text, #222)' } }}
        >
          {brands.map(brand => <MenuItem key={brand} value={brand}>{brand}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Car Model"
          value={filters.model}
          onChange={e => setFilters({ ...filters, model: e.target.value })}
          size="small"
          variant="filled"
          sx={{ minWidth: 150, borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: 'var(--color-text, #222)' } }}
        >
          {models.map(model => <MenuItem key={model} value={model}>{model}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Service"
          value={filters.service}
          onChange={e => setFilters({ ...filters, service: e.target.value })}
          size="small"
          variant="filled"
          sx={{ minWidth: 150, borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: 'var(--color-text, #222)' } }}
        >
          {services.map(service => <MenuItem key={service} value={service}>{service}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Vendor"
          value={filters.vendor}
          onChange={e => setFilters({ ...filters, vendor: e.target.value })}
          size="small"
          variant="filled"
          sx={{ minWidth: 150, borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: 'var(--color-text, #222)' } }}
        >
          {vendors.map(vendor => <MenuItem key={vendor} value={vendor}>{vendor}</MenuItem>)}
        </TextField>
        <Button variant="contained" color="primary" onClick={onFilter} sx={{ minWidth: 110, borderRadius: 2, fontWeight: 700, fontSize: 16, background: '#ff6b35', color: '#fff', boxShadow: 1, '&:hover': { background: '#ff8c42' } }}>
          Filter
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterBar;
