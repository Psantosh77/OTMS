import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

/**
 * ModelSelectModal - Material UI modal for selecting a car model
 * Props:
 *   open: boolean - whether the modal is open
 *   onClose: function - called to close the modal
 *   models: array - list of model objects {id, display_name, logo}
 *   selectedModel: string - currently selected model id
 *   setSelectedModel: function - called with new model id
 */
const ModelSelectModal = ({ open, onClose, models, selectedModel, setSelectedModel }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Select Model</DialogTitle>
      <DialogContent dividers>
        <List>
          {models && models.length > 0 ? (
            models.map(m => (
              <ListItem key={m.id} disablePadding>
                <ListItemButton
                  selected={String(selectedModel) === String(m.id)}
                  onClick={() => {
                    setSelectedModel(String(m.id));
                    onClose();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={m.logo} alt={m.display_name} variant="square" sx={{ width: 32, height: 16, mr: 1, bgcolor: 'transparent' }} />
                  </ListItemAvatar>
                  <ListItemText primary={m.display_name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No models found" sx={{ color: '#888' }} />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelectModal;
