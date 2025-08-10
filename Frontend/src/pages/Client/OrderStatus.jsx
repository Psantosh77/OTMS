import React from 'react';
import { Box, Typography, LinearProgress, Paper, Stepper, Step, StepLabel, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const steps = [
  { label: 'Order Placed', icon: <AssignmentTurnedInIcon sx={{ color: '#ff9800' }} /> },
  { label: 'Mechanic Allotted', icon: <EngineeringIcon sx={{ color: '#1976d2' }} /> },
  { label: 'Service In Progress', icon: <BuildCircleIcon sx={{ color: '#388e3c' }} /> },
  { label: 'Ready for Pickup/Delivery', icon: <DirectionsCarIcon sx={{ color: '#fbc02d' }} /> },
  { label: 'Completed', icon: <DoneAllIcon sx={{ color: '#43a047' }} /> },
];

const getStepLabel = (step) => steps[step]?.label || 'Unknown';

const OrderStatus = ({ orderId, currentStep = 0, order }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff3e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minWidth: 340, maxWidth: 540, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="#ff9800" gutterBottom>
          Order Status
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          Order ID: <b>{orderId}</b>
        </Typography>
        {/* Stepper with icons */}
        <Stepper activeStep={currentStep} alternativeLabel sx={{ my: 3 }}>
          {steps.map((step, idx) => (
            <Step key={step.label} completed={currentStep > idx}>
              <StepLabel StepIconComponent={() => (
                <Avatar sx={{ bgcolor: 'transparent', width: 40, height: 40, boxShadow: currentStep === idx ? 3 : 0 }}>
                  {step.icon}
                </Avatar>
              )}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* Vector image for current step */}
        <Box sx={{ my: 2 }}>
          {currentStep === 0 && (
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Order Placed" width={80} height={80} style={{ marginBottom: 8 }} />
          )}
          {currentStep === 1 && (
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Mechanic Allotted" width={80} height={80} style={{ marginBottom: 8 }} />
          )}
          {currentStep === 2 && (
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" alt="Service In Progress" width={80} height={80} style={{ marginBottom: 8 }} />
          )}
          {currentStep === 3 && (
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Ready for Pickup" width={80} height={80} style={{ marginBottom: 8 }} />
          )}
          {currentStep === 4 && (
            <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Completed" width={80} height={80} style={{ marginBottom: 8 }} />
          )}
        </Box>
        {order && (
          <Box sx={{ textAlign: 'left', mt: 3, mb: 2, bgcolor: '#fff8e1', p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Service Type: <b>{order.serviceType}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Time Slot: <b>{order.timeSlot}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Address: <b>{order.address}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Vendor ID: <b>{order.vendorId}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Total: <b>₹{order.total}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Payment Status: <b>{order.paymentStatus}</b></Typography>
            <Typography variant="subtitle2" color="text.secondary">Services: <b>{order.services?.join(', ')}</b></Typography>
            {order.subServices && order.subServices.length > 0 && (
              <Typography variant="subtitle2" color="text.secondary">Sub-Services: <b>{order.subServices.join(', ')}</b></Typography>
            )}
          </Box>
        )}
        {currentStep === steps.length - 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
            <Typography color="success.main" fontWeight={700}>Service Completed!</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OrderStatus;
