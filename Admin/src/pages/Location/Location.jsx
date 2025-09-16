import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import LocationModal from './LocationModal';

const Location = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const { postApi } = await import('../../utils/apiConfig/apiService');
  const res = await postApi({ url: 'locations/getlocation', payload: {} });
  // postApi returns response.data (which may be { success,message,status,data })
  // or some backends might return the array directly. Normalize both shapes.
  const raw = Array.isArray(res) ? res : (res?.data ?? res);
  const data = Array.isArray(raw) ? raw.map(loc => ({ ...loc, id: loc._id || loc.id })) : [];
        setRows(data);
      } catch (err) {
        console.error('Failed to fetch locations', err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleAddClick = () => {
    setSelectedRow(null);
    setAddModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setAddModalOpen(true);
  };

  const handleDetailClick = (row) => {
    setSelectedRow(row);
    setDetailOpen(true);
  };

  const callLocationActiveApi = async (id, isActive) => {
    // optimistic update
    setRows(prev => prev.map(r => r.id === id ? { ...r, isActive } : r));
    try {
      const { postApi } = await import('../../utils/apiConfig/apiService');
      await postApi({ url: 'locations/update-active', payload: { id, isActive } });
    } catch (err) {
      console.error('Failed to update active state', err);
    }
  };

  const columns = [
    { field: 'locationName', headerName: 'Location Name', flex: 1 },
    { field: 'locationCode', headerName: 'Location Code', flex: 1 },
    { field: 'stateName', headerName: 'State', flex: 1 },
    { field: 'district', headerName: 'City/District', flex: 1 },
    { field: 'isActive', headerName: 'Active', flex: 0.6, renderCell: (params) => params.value ? 'True' : 'False' },
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
          {params.row.isActive ? (
            <IconButton color="error" size="small" onClick={() => callLocationActiveApi(params.row.id, false)}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton color="primary" size="small" onClick={() => callLocationActiveApi(params.row.id, true)}>
              <UndoIcon />
            </IconButton>
          )}
        </>
      )
    }
  ];

  // Add or update location - used by modal
  const addOrUpdateLocation = async (locationData) => {
    // If called by modal with pre-uploaded data behavior in other pages, support marker
    if (locationData && locationData.__fromFormData) {
      const loc = locationData.data;
      if (loc.id) setRows(prev => prev.map(r => r.id === loc.id ? loc : r));
      else setRows(prev => [...prev, loc]);
      return;
    }

    try {
      const { postApi } = await import('../../utils/apiConfig/apiService');
      const payload = locationData.id ? { id: locationData.id, ...locationData } : locationData;
      const res = await postApi({ url: 'locations/add', payload });
      const returned = res.data || {};
      const newLoc = { ...returned, id: returned._id || returned.id || locationData.id || Date.now() };
      if (locationData.id) {
        setRows(prev => prev.map(r => r.id === locationData.id ? newLoc : r));
      } else {
        setRows(prev => [...prev, newLoc]);
      }
      alert('Location saved successfully!');
    } catch (err) {
      console.error('Failed to save location', err);
      alert('Failed to save location: ' + (err?.message || JSON.stringify(err)));
    }
  };

  return (
    <Box sx={{ height: 500, width: '100%', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Typography variant="h5" fontWeight={700} mb={1}>Location List</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="medium"
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleAddClick}
          >
            Add Location
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 20, 50]}
          disableSelectionOnClick
          autoHeight
        />

        {addModalOpen && (
          <LocationModal
            isOpen={addModalOpen}
            onClose={() => { setAddModalOpen(false); setSelectedRow(null); }}
            onSubmit={addOrUpdateLocation}
            initialData={selectedRow}
            mode={selectedRow ? 'edit' : 'add'}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Location;
