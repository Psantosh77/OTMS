import React, { useState } from "react";
import axios from 'axios';
import { apiService } from '../../utils/apiService';
import { useNavigate } from 'react-router-dom';
// Razorpay script loader
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useLocation } from "react-router-dom";
import { Box, Typography, Card, Checkbox, FormControlLabel, Divider, List, ListItem, ListItemText, Paper, Button } from "@mui/material";
import 'date-fns';

// Mock service data for demo, now with subServices
const mockServices = [
  {
    name: "Car Spa",
    price: 499,
    subServices: [
      { name: "Interior Cleaning", price: 199 },
      { name: "Exterior Polish", price: 299 },
      { name: "Engine Bay Cleaning", price: 149 },
    ],
  },
  {
    name: "Repair",
    price: 1299,
    subServices: [
      { name: "Brake Repair", price: 499 },
      { name: "AC Repair", price: 399 },
      { name: "Suspension Repair", price: 599 },
    ],
  },
  { name: "Inspection", price: 799, subServices: [ { name: "Emission Test", price: 199 }, { name: "Safety Check", price: 149 } ] },
  { name: "Emergency", price: 999, subServices: [ { name: "Towing", price: 299 }, { name: "Jump Start", price: 199 } ] },
  { name: "Car Rentals", price: 1499, subServices: [ { name: "With Driver", price: 499 }, { name: "Without Driver", price: 0 } ] },
  { name: "Scheduled Maintenance", price: 899, subServices: [ { name: "Oil Change", price: 299 }, { name: "Filter Replacement", price: 199 } ] },
  { name: "Vehicle Inspection", price: 699, subServices: [ { name: "Full Body Check", price: 299 } ] },
];

const ServiceDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const vendorId = params.get("vendorId");
  const navigate = useNavigate();

  // For demo, show all mock services. In real app, filter by vendorId.
  const [selected, setSelected] = useState([]); // main services
  const [selectedSub, setSelectedSub] = useState({}); // { [serviceName]: [subServiceName, ...] }

  // Booking form state (now always visible as filter tab)
  const [serviceType, setServiceType] = useState('remote');
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [bookingError, setBookingError] = useState('');

  // Mock vendor address for demonstration
  const vendorAddress = '123 Main Street, City Center, YourCity';

  // Booking validation
  const validateBooking = () => {
    if (!timeSlot || !address) {
      setBookingError('Please select a time slot and enter address.');
      return false;
    }
    setBookingError('');
    return true;
  };

  // Razorpay payment handler (Pay Now)
  const handleRazorpay = async () => {
    if (!validateBooking()) return;
    // 1. Create order in backend (status: pending)
    try {
      await apiService.post('/order/create', {
        userId: 'demoUser', // Replace with real userId if available
        vendorId,
        services: selected,
        subServices: Object.values(selectedSub).flat(),
        total,
        serviceType,
        timeSlot: timeSlot ? timeSlot.toString() : '',
        address,
        paymentStatus: 'pending',
      });
      // Redirect to order status page after success
      navigate('/order-status');
    } catch (err) {
      alert('Failed to create order.');
      return;
    }
    // ...existing code for Razorpay payment (can be re-enabled if needed)...
  };

  // Prefill address only when switching to garage, and clear when switching away
  React.useEffect(() => {
    if (serviceType === 'garage') {
      setAddress((prev) => prev === '' || prev === vendorAddress ? vendorAddress : prev);
    } else if (address === vendorAddress) {
      setAddress('');
    }
    // eslint-disable-next-line
  }, [serviceType]);

  // Toggle main service
  const handleToggle = (service) => {
    setSelected((prev) => {
      if (prev.includes(service)) {
        // Unselect service: remove from selected and clear sub-services
        setSelectedSub((subPrev) => ({ ...subPrev, [service]: [] }));
        return prev.filter((s) => s !== service);
      } else {
        // Select service: add to selected and select all sub-services if any
        const found = mockServices.find((s) => s.name === service);
        if (found && found.subServices && found.subServices.length > 0) {
          setSelectedSub((subPrev) => ({ ...subPrev, [service]: found.subServices.map((ss) => ss.name) }));
        }
        return [...prev, service];
      }
    });
  };

  // Toggle sub-service
  const handleToggleSub = (service, subService) => {
    setSelectedSub((prev) => {
      const current = prev[service] || [];
      let updated;
      if (current.includes(subService)) {
        updated = current.filter((s) => s !== subService);
      } else {
        updated = [...current, subService];
      }
      // If after update, all sub-services are unchecked, also unselect the main service
      if (updated.length === 0) {
        setSelected((mainPrev) => mainPrev.filter((s) => s !== service));
      } else {
        // If not already selected, select the main service (for consistency)
        setSelected((mainPrev) => mainPrev.includes(service) ? mainPrev : [...mainPrev, service]);
      }
      return { ...prev, [service]: updated };
    });
  };

  // Selected main services
  const selectedServices = mockServices.filter((s) => selected.includes(s.name));
  // Selected sub-services (flattened)
  const selectedSubServices = selectedServices.flatMap((service) => {
    const subList = service.subServices || [];
    const sel = selectedSub[service.name] || [];
    return subList.filter((ss) => sel.includes(ss.name)).map((ss) => ({ ...ss, parent: service.name }));
  });

  // Total calculation: if a service has at least one sub-service selected, ignore its main price
  const total = selectedServices.reduce((sum, s) => {
    const subSel = selectedSub[s.name] || [];
    if (s.subServices && s.subServices.length > 0 && subSel.length > 0) {
      // If any sub-service is selected, ignore main price
      return sum;
    } else {
      return sum + s.price;
    }
  }, 0) + selectedSubServices.reduce((sum, ss) => sum + ss.price, 0);

  // Pay Later handler
  const handlePayLater = async () => {
    if (!validateBooking()) return;
    try {
      await apiService.post('/order/create', {
        userId: 'demoUser', // Replace with real userId if available
        vendorId,
        services: selected,
        subServices: Object.values(selectedSub).flat(),
        total,
        serviceType,
        timeSlot: timeSlot ? timeSlot.toString() : '',
        address,
        paymentStatus: 'pending',
      });
      // Redirect to order status page after success
      navigate('/order-status');
    } catch (err) {
      alert('Failed to create order.');
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#fff3e0', minHeight: '100vh' }}>
      {/* Vendor Info Centered */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <img
          src={`https://source.unsplash.com/100x100/?car,garage,service&sig=${vendorId || 1}`}
          alt="Vendor"
          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, background: '#eee', border: '4px solid #ff9800' }}
        />
        <Typography variant="h5" fontWeight={700} color="#ff9800" align="center" gutterBottom>
          {`Vendor Name${vendorId ? ' #' + vendorId : ''}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={1}>
          Vendor ID: <b>{vendorId}</b>
        </Typography>
      </Box>
      {/* Booking Filter Tab */}
      <Box sx={{ width: '100vw', px: { xs: 1, sm: 3, md: 6 }, mb: 4, position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', maxWidth: '100vw' }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, bgcolor: '#fff', width: '100%', maxWidth: '100%' }}>
          <Typography variant="h6" fontWeight={600} mb={2} color="#ff9800">Book Your Service</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={500} mb={1}>Select Service Type</Typography>
            <RadioGroup
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              row
            >
              <FormControlLabel value="remote" control={<Radio sx={{ color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }} />} label="Remote Service" />
              <FormControlLabel value="garage" control={<Radio sx={{ color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }} />} label="Garage Service" />
              <FormControlLabel value="roadside" control={<Radio sx={{ color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }} />} label="Roadside Assistance" />
            </RadioGroup>
          </Box>
          <Box sx={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Preferred Time Slot"
                value={timeSlot || null}
                onChange={val => setTimeSlot(val)}
                minDateTime={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 0, '& label.Mui-focused': { color: '#ff9800' }, '& .MuiInput-underline:after': { borderBottomColor: '#ff9800' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ff9800' }, '&:hover fieldset': { borderColor: '#fb8c00' }, '&.Mui-focused fieldset': { borderColor: '#ff9800' } } }} />}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ flex: 2 }}>
            <TextField
              label="Service Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              multiline
              minRows={2}
              fullWidth
              sx={{ mt: 0, '& label.Mui-focused': { color: '#ff9800' }, '& .MuiInput-underline:after': { borderBottomColor: '#ff9800' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ff9800' }, '&:hover fieldset': { borderColor: '#fb8c00' }, '&.Mui-focused fieldset': { borderColor: '#ff9800' } } }}
            />
          </Box>
        </Box>
        {bookingError && <Typography color="error" mt={2}>{bookingError}</Typography>}
      </Paper>

      <Box sx={{ height: { xs: 16, md: 32 } }} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
        {/* Service List Card */}
        <Card sx={{ flex: 1, minWidth: 280, p: 3, bgcolor: '#fff' }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Select Services</Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {mockServices.map((service) => (
              <React.Fragment key={service.name}>
                <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 0 }}>
                  {/* Checkbox - first column */}
                  <Checkbox
                    checked={selected.includes(service.name)}
                    onChange={() => handleToggle(service.name)}
                    color="warning"
                    sx={{ mr: 1, color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }}
                  />
                  {/* Service name - second column */}
                  <span style={{ flex: 1, minWidth: 0, fontWeight: 500 }}>{service.name}</span>
                  {/* Image - third column */}
                  <img
                    src={`https://source.unsplash.com/40x40/?${encodeURIComponent(service.name)}&sig=${Math.floor(Math.random()*10000)}`}
                    alt={service.name}
                    style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', marginLeft: 12, background: '#eee' }}
                    loading="lazy"
                  />
                  {/* Price - always right aligned */}
                  <span style={{ color: '#888', minWidth: 60, textAlign: 'right', marginLeft: 16, fontWeight: 600 }}>₹{service.price}</span>
                </ListItem>
                {/* Sub-services, only show if main is selected and has subServices */}
                {selected.includes(service.name) && service.subServices && service.subServices.length > 0 && (
                  <List disablePadding sx={{ pl: 6, pb: 1 }}>
                    {service.subServices.map((sub) => (
                      <ListItem key={sub.name} disablePadding sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 0 }}>
                        <Checkbox
                          checked={selectedSub[service.name]?.includes(sub.name) || false}
                          onChange={() => handleToggleSub(service.name, sub.name)}
                          color="warning"
                          sx={{ mr: 1, color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }}
                        />
                        <span style={{ flex: 1, minWidth: 0 }}>{sub.name}</span>
                        <span style={{ color: '#888', minWidth: 60, textAlign: 'right', marginLeft: 16 }}>₹{sub.price}</span>
                      </ListItem>
                    ))}
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </Card>
        {/* Cart Summary Card */}
        <Paper elevation={3} sx={{ minWidth: 260, maxWidth: 340, p: 3, borderRadius: 3, position: 'relative', width: { xs: '100%', md: 320 }, bgcolor: '#fff' }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Cart</Typography>
          <Divider sx={{ mb: 2 }} />
          {selectedServices.length === 0 && selectedSubServices.length === 0 ? (
            <Typography color="text.secondary" mb={2}>No services selected.</Typography>
          ) : (
            <List>
              {/* Main services */}
              {selectedServices.map((s) => (
                <ListItem key={s.name} sx={{ py: 0.5 }}>
                  <ListItemText primary={s.name} />
                  <Typography fontWeight={500}>₹{s.price}</Typography>
                </ListItem>
              ))}
              {/* Sub-services */}
              {selectedSubServices.map((ss) => (
                <ListItem key={ss.parent + '-' + ss.name} sx={{ py: 0.5, pl: 3 }}>
                  <ListItemText primary={ss.name + ' (' + ss.parent + ')'} />
                  <Typography fontWeight={500}>₹{ss.price}</Typography>
                </ListItem>
              ))}
            </List>
          )}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography fontWeight={600}>Estimated total</Typography>
            <Typography fontWeight={700} color="primary">₹{total}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              disabled={selectedServices.length === 0}
              onClick={handleRazorpay}
              sx={{
                backgroundColor: '#ff9800',
                color: '#fff',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#fb8c00' }
              }}
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              disabled={selectedServices.length === 0}
              onClick={handlePayLater}
              sx={{
                borderColor: '#ff9800',
                color: '#ff9800',
                fontWeight: 600,
                '&:hover': { borderColor: '#fb8c00', color: '#fb8c00' }
              }}
            >
              Pay Later
            </Button>
          </Box>


        </Paper>
      </Box>
    </Box>
    </Box>
  );
};

export default ServiceDetails;
