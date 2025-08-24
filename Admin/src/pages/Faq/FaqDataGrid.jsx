import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FaqDataGrid = ({ data = [], onEdit }) => {
  // Map data to include 'id' field for DataGrid
  const rows = Array.isArray(data) ? data.map(faq => ({ ...faq, id: faq._id })) : [];

  const columns = [
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'question', headerName: 'Question', flex: 2 },
    { field: 'answer', headerName: 'Answer', flex: 2 },
    { field: 'isActive', headerName: 'Active', flex: 1, renderCell: (params) => params.value ? 'True' : 'False' },
    { field: 'createdAt', headerName: 'Created At', flex: 1, valueGetter: (params) => new Date(params.value).toLocaleDateString() },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => onEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => alert('Delete ' + params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default FaqDataGrid;
