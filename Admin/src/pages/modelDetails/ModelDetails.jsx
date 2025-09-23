import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import AddEditModel from './AddEditModel';

const ModelDetails = () => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [vehicleTab, setVehicleTab] = useState('All');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { postApi } = await import('../../utils/apiConfig/apiService');
  const res = await postApi({ url: 'cardata/getallmanufacturers', payload: {} });
        const manufacturers = res?.data?.manufacturers || [];
        // Flatten car_models into a single array of models, injecting brand info
        const models = [];
        manufacturers.forEach(m => {
          const brandDisplay = m.display_name || m.name || '';
          const brandId = m.id || m._id;
          const carModels = Array.isArray(m.car_models) ? m.car_models : [];
          carModels.forEach(cm => {
            models.push({ ...cm, id: cm._id || cm.id || `${brandId}_${cm.id || cm._id}`, brand_display: brandDisplay, brand_id: brandId });
          });
        });
        setRows(models);
      } catch (err) {
        alert('Failed to fetch models: ' + (err?.message || JSON.stringify(err)));
      }
    };
    fetchModels();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setAddEditOpen(true);
  };

  const callModelActiveApi = async (id, active) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, is_usable: active } : r));
    alert(`Model ${active ? 'restored' : 'deleted'} (active=${active})`);
  };

  const columns = [
    { field: 'display_name', headerName: 'Model Name', flex: 1 },
    { field: 'brand_display', headerName: 'Brand', flex: 1 },
    { field: 'vehicle_type', headerName: 'Vehicle Type', flex: 1 },
    { field: 'is_usable', headerName: 'Usable', flex: 1, renderCell: (p) => p.value ? 'Yes' : 'No' },
    {
      field: 'actions', headerName: 'Actions', flex: 1, sortable: false, filterable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" color="primary" onClick={() => alert(JSON.stringify(params.row, null, 2))} sx={{ mr: 1 }}>
            <InfoIcon />
          </IconButton>
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          {params.row.is_usable ? (
            <IconButton size="small" color="error" onClick={() => callModelActiveApi(params.row.id, false)}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton size="small" color="primary" onClick={() => callModelActiveApi(params.row.id, true)}>
              <AddIcon />
            </IconButton>
          )}
        </>
      )
    }
  ];

  return (
    <Box sx={{ height: 500, width: '100%', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={700}>Model Details</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedRow(null); setAddEditOpen(true); }}>Add Model</Button>
        </Box>
        <Tabs value={vehicleTab} onChange={(e, v) => setVehicleTab(v)} aria-label="vehicle type tabs" sx={{ mb: 2 }}>
          <Tab label="All" value="All" />
          <Tab label="Passenger" value="Passenger" />
          <Tab label="Commercial" value="Commercial" />
          <Tab label="Bike" value="Bike" />
        </Tabs>
        {/* Filter rows based on selected vehicle tab */}
        { /* rowsToShow is derived from rows and vehicleTab */ }
        
        <DataGrid
          rows={rows.filter(r => vehicleTab === 'All' ? true : ((r.vehicle_type || 'Passenger') === vehicleTab))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5,10,20]}
          disableSelectionOnClick
          autoHeight
        />
        <AddEditModel open={addEditOpen} onClose={() => setAddEditOpen(false)} initialData={selectedRow} onSave={async (payload) => {
          try {
            const { postApi } = await import('../../utils/apiConfig/apiService');
            const res = await postApi({ url: 'cardata/addcarmodellist', payload });
            const saved = res.data && Array.isArray(res.data) ? res.data[0] : res.data;
            const newRow = { ...saved, id: saved._id || saved.id || Date.now() };
            setRows(prev => selectedRow ? prev.map(r => r.id === (selectedRow.id || selectedRow._id) ? newRow : r) : [...prev, newRow]);
            alert('Model saved');
          } catch (err) {
            alert('Failed to save model: ' + (err?.message || JSON.stringify(err)));
          }
        }} />
      </Paper>
    </Box>
  );
};

export default ModelDetails;
