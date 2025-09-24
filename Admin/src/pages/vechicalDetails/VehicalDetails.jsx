import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import AddEditManufacturer from './AddEditManufacturer';

const VehicalDetails = () => {
  const [rows, setRows] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addEditOpen, setAddEditOpen] = useState(false);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const { postApi } = await import('../../utils/apiConfig/apiService');
  const res = await postApi({ url: 'cardata/getallmanufacturers', payload: {} });
        const manufacturers = res?.data?.manufacturers || [];
        const mapped = manufacturers.map(m => ({ ...m, id: m._id || m.id }));
        setRows(mapped);
      } catch (err) {
        alert('Failed to fetch manufacturers: ' + (err?.message || JSON.stringify(err)));
      }
    };
    fetchManufacturers();
  }, []);

  const handleEdit = (row) => {
    // TODO: open edit modal
    setSelectedRow(row);
    alert('Edit: ' + (row.display_name || row.id));
  };

  const handleDetail = (row) => {
    setSelectedRow(row);
    setDetailOpen(true);
  };

  const callManufacturerActiveApi = async (id, active) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, is_usable: active } : r));
    alert(`Manufacturer ${active ? 'restored' : 'deleted'} (active=${active})`);
  };

  const columns = [
    { field: 'display_name', headerName: 'Name', flex: 1 },
    { field: 'is_procurable', headerName: 'Procurable', flex: 1, renderCell: (p) => p.value ? 'Yes' : 'No' },
    { field: 'is_usable', headerName: 'Usable', flex: 1, renderCell: (p) => p.value ? 'Yes' : 'No' },
    { field: 'vehicle_type', headerName: 'Vehicle Type', flex: 1 },
    {
      field: 'actions', headerName: 'Actions', flex: 1, sortable: false, filterable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" color="primary" onClick={() => handleDetail(params.row)} sx={{ mr: 1 }}>
            <InfoIcon />
          </IconButton>
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          {params.row.is_usable ? (
            <IconButton size="small" color="error" onClick={() => callManufacturerActiveApi(params.row.id, false)}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton size="small" color="primary" onClick={() => callManufacturerActiveApi(params.row.id, true)}>
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
          <Typography variant="h5" fontWeight={700}>Vehical Details</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedRow(null); setAddEditOpen(true); }}>Add Manufacturer</Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5,10,20]}
          disableSelectionOnClick
          autoHeight
        />
          <AddEditManufacturer open={addEditOpen} onClose={() => setAddEditOpen(false)} initialData={selectedRow} onSave={async (payload) => {
            try {
              const { postApi } = await import('../../utils/apiConfig/apiService');
              const res = await postApi({ url: 'cardata/addmanufacturer', payload });
              const saved = res.data && Array.isArray(res.data) ? res.data[0] : res.data;
              const newRow = { ...saved, id: saved._id || saved.id || Date.now() };
                // If selectedRow exists we treated this as an edit; match by selectedRow.id
                setRows(prev => selectedRow ? prev.map(r => r.id === (selectedRow.id || selectedRow._id) ? newRow : r) : [...prev, newRow]);
              alert('Manufacturer saved');
            } catch (err) {
              alert('Failed to save manufacturer: ' + (err?.message || JSON.stringify(err)));
            }
          }} />
      </Paper>
    </Box>
  );
};

export default VehicalDetails;
