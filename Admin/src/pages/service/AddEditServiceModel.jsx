
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ServiceModal = ({ closeModal, addService, updateService, editingService }) => {
  const [title, setTitle] = useState("");
  const [subitems, setSubitems] = useState([{ name: "", price: "" }]);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setSubitems(editingService.subitems);
    }
  }, [editingService]);

  const handleAddSubitem = () => {
    setSubitems([...subitems, { name: "", price: "" }]);
  };

  const handleSubitemChange = (index, field, value) => {
    const updated = [...subitems];
    updated[index][field] = value;
    setSubitems(updated);
  };

  const handleDeleteSubitem = (index) => {
    setSubitems(subitems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = { id: editingService?.id || Date.now(), title, subitems };
    if (editingService) {
      updateService(newService);
    } else {
      addService(newService);
    }
    closeModal();
  };

  return (
    <Dialog open onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Typography variant="h6" fontWeight={600} mb={1}>Subitems</Typography>
          <Box sx={{ height: 300, width: '100%', mb: 2 }}>
            <DataGrid
              rows={subitems.map((item, idx) => ({ id: idx + 1, ...item }))}
              columns={[
                {
                  field: 'name',
                  headerName: 'Subitem Name',
                  flex: 1,
                  editable: true,
                },
                {
                  field: 'price',
                  headerName: 'Price',
                  flex: 1,
                  editable: true,
                  type: 'number',
                },
                {
                  field: 'actions',
                  headerName: 'Action',
                  flex: 0.5,
                  sortable: false,
                  filterable: false,
                  renderCell: (params) => (
                    <IconButton color="error" onClick={() => handleDeleteSubitem(params.row.id - 1)}>
                      <DeleteIcon />
                    </IconButton>
                  ),
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
              autoHeight
              experimentalFeatures={{ newEditingApi: true }}
              onCellEditCommit={(params) => {
                const updated = [...subitems];
                updated[params.id - 1][params.field] = params.value;
                setSubitems(updated);
              }}
            />
          </Box>
          <Button
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddSubitem}
            sx={{ mt: 1 }}
          >
            Add Subitem
          </Button>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            {editingService ? "Update" : "Save"}
          </Button>
          <Button type="button" variant="outlined" color="error" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ServiceModal;
