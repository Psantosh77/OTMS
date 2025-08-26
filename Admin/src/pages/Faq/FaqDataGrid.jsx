import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';

const FaqDataGrid = ({ data = [], onEdit, onDeleteSuccess }) => {
  // Map data to include 'id' field for DataGrid
  const rows = Array.isArray(data)
    ? data.map(faq => ({ ...faq, id: faq._id }))
    : [];

  // Common function to call delete/undelete API
  const callFaqIsActiveApi = async (_id, isActive) => {
    try {
      const { postApi } = await import('../../utils/apiConfig/apiService');
      await postApi({
        url: 'faq/deleteUndelete',
        payload: { _id, isActive }
      });
      alert(`FAQ ${isActive ? 'restored' : 'deleted'} successfully!`);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (err) {
      alert(
        `Error ${isActive ? 'restoring' : 'deleting'} FAQ: ` +
          (err?.message || JSON.stringify(err))
      );
    }
  };

  // Column configuration
  const columns = [
    { field: 'category', headerName: 'Category', width: 150, minWidth: 120 },
    { field: 'question', headerName: 'Question', flex: 2, minWidth: 200 },
    { field: 'answer', headerName: 'Answer', flex: 2, minWidth: 200 },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 100,
      renderCell: (params) => (params.value ? 'True' : 'False'),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          {params.row.isActive ? (
            <IconButton
              color="error"
              size="small"
              onClick={() => callFaqIsActiveApi(params.row._id, false)}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              size="small"
              onClick={() => callFaqIsActiveApi(params.row._id, true)}
            >
              <UndoIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  // Responsive page size: mobile = 3 rows, desktop = 5 rows
  const pageSize = window.innerWidth < 600 ? 3 : 5;

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, minWidth: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[3, 5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default FaqDataGrid;
