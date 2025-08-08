import React from "react";
import { Box, TextField, MenuItem, Stack, Button, Grid } from "@mui/material";

const FilterBar = ({ filters, setFilters, onFilter }) => {
  // Example options, replace with real data as needed
  const locations = ["All", "Delhi", "Mumbai", "Bangalore"];
  const brands = ["All", "Toyota", "Honda", "Ford"];
  const models = ["All", "Innova", "Civic", "Figo"];
  const services = ["All", "Car Spa", "Repair", "Inspection", "Emergency", "Car Rentals", "Scheduled Maintenance", "Vehicle Inspection"];
  const vendors = ["All", "AutoCare Garage", "Speedy Rentals", "Elite Motors"];

  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 1, sm: 2 },
        background: 'rgba(255, 107, 53, 0.08)', // light orange
        borderRadius: 3,
        boxShadow: 2,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'auto',
      }}
    >
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ width: '100%', maxWidth: 1200 }}>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Location"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 100, sm: 150 }, width: '100%', borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: '#000 !important' } }}
          >
            {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Car Brand"
            value={filters.brand}
            onChange={e => setFilters({ ...filters, brand: e.target.value })}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 100, sm: 150 }, width: '100%', borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: '#000 !important' } }}
          >
            {brands.map(brand => <MenuItem key={brand} value={brand}>{brand}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Car Model"
            value={filters.model}
            onChange={e => setFilters({ ...filters, model: e.target.value })}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 100, sm: 150 }, width: '100%', borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: '#000 !important' } }}
          >
            {models.map(model => <MenuItem key={model} value={model}>{model}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Service"
            value={filters.service}
            onChange={e => setFilters({ ...filters, service: e.target.value })}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 100, sm: 150 }, width: '100%', borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: '#000 !important' } }}
          >
            {services.map(service => <MenuItem key={service} value={service}>{service}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Vendor"
            value={filters.vendor}
            onChange={e => setFilters({ ...filters, vendor: e.target.value })}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 100, sm: 150 }, width: '100%', borderRadius: 2, background: 'transparent', '& .MuiFilledInput-root': { borderRadius: 2, background: 'transparent' }, '& label': { color: '#000 !important' } }}
          >
            {vendors.map(vendor => <MenuItem key={vendor} value={vendor}>{vendor}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2} display="flex" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={onFilter}
            sx={{
              minWidth: { xs: 80, sm: 110 },
              borderRadius: 2,
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 },
              background: '#ff6b35',
              color: '#fff',
              boxShadow: 1,
              width: '100%',
              '&:hover': { background: '#ff8c42' },
            }}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBar;
