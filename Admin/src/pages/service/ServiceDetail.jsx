import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid as SubDataGrid } from '@mui/x-data-grid';

const subServicesColumns = [
	{ field: 'name', headerName: 'SubService Name', flex: 1 },
	{ field: 'price', headerName: 'Price', flex: 1 },
	{ field: 'description', headerName: 'Description', flex: 2 },
];

const ServiceDetail = ({ open, onClose, row }) => {
	// Use subServices from row if available, else empty array
	const subServicesRows = Array.isArray(row?.subServices)
		? row.subServices.map((sub, idx) => ({ id: sub._id || idx + 1, ...sub }))
		: [];

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>View Sub Service Details</DialogTitle>
			<DialogContent>
				<Typography variant="body2" mb={2}>Service detail form goes here.</Typography>
				<Typography variant="h6" fontWeight={600} mb={1}>SubServices</Typography>
				<Box sx={{ height: 250, width: '100%', mb: 2 }}>
					<SubDataGrid
						rows={subServicesRows}
						columns={subServicesColumns}
						pageSize={2}
						rowsPerPageOptions={[2, 5, 10]}
						disableSelectionOnClick
						autoHeight
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" color="primary" onClick={() => alert('Save logic here')}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ServiceDetail;
