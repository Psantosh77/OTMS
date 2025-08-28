import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Dummy data for demonstration
import ServiceModal from './AddEditServiceModel';
// Remove dummy data, will fetch from API


import { DataGrid as SubDataGrid } from '@mui/x-data-grid';

const subServicesColumns = [
  { field: 'name', headerName: 'SubService Name', flex: 1 },
  { field: 'price', headerName: 'Price', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 2 },
];

import ServiceDetail from './ServiceDetail';

const Service = () => {
  const [rows, setRows] = useState([]);
  // Fetch services from API on mount
  const [addModalOpen, setAddModalOpen] = useState(false);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { postApi } = await import('../../utils/apiConfig/apiService');
        const res = await postApi({ url: 'services/getAllServices', payload: {} });
        // Map API data to grid rows (ensure 'id' field exists)
        const data = Array.isArray(res?.data) ? res.data.map(service => ({
          ...service,
          id: service._id || service.id,
        })) : [];
        setRows(data);
      } catch (err) {
        alert('Failed to fetch services: ' + (err?.message || JSON.stringify(err)));
      }
    };
    fetchServices();
  }, []);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Common function to call delete/undelete API (replace with actual API call)
  const callServiceActiveApi = async (id, active) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, active } : row));
    alert(`Service ${active ? 'restored' : 'deleted'} (active=${active}) successfully!`);
  };

  const handleEdit = (row) => {
    alert('Edit Service: ' + row.name);
  };

  const handleDetailClick = (row) => {
    setSelectedRow(row);
    setDetailOpen(true);
  };

  const handleAddServiceClick = () => {
    setSelectedRow(null);
    setAddModalOpen(true);
  };

 
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: 'name', headerName: 'Service Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'active', headerName: 'Active', flex: 1, renderCell: (params) => params.value ? 'Yes' : 'No' },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => handleDetailClick(params.row)} sx={{ mr: 1 }}>
            <InfoIcon />
          </IconButton>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          {params.row.active ? (
            <IconButton
              color="error"
              size="small"
              onClick={() => callServiceActiveApi(params.row.id, false)}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              size="small"
              onClick={() => callServiceActiveApi(params.row.id, true)}
            >
              <UndoIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Typography variant="h5" fontWeight={700} mb={1}>Service List</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="medium"
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleAddServiceClick}
          >
            Add Service
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
        <ServiceDetail open={detailOpen} onClose={handleDetailClose} row={selectedRow} />
        {addModalOpen && (
          <ServiceModal closeModal={handleAddModalClose} addService={() => {}} updateService={() => {}} />
        )}
      </Paper>
    </Box>
  );
};

export default Service;


