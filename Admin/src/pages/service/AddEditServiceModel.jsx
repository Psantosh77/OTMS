import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import api from "../../utils/apiConfig/apiconfig";


const ServiceModal = ({
  closeModal,
  addService,
  updateService,
  editingService,
}) => {
  // main fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [couponOffers, setCouponOffers] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState("");
  const [showInHome, setShowInHome] = useState(false);
const [showInService, setShowInService] = useState(false);
  const [serviceType, setServiceType] = useState('garage');


  // subitems

  const [subitems, setSubitems] = useState([]);
const [subitemName, setSubitemName] = useState("");
const [subitemPrice, setSubitemPrice] = useState(0);
const [subitemActive, setSubitemActive] = useState(true);
const [editingSubitemIndex, setEditingSubitemIndex] = useState(null);

  useEffect(() => {
    if (editingService) {
  // title removed per spec
      setName(editingService.name || "");
      setDescription(editingService.description || "");
      setPrice(editingService.price || "");
      setImage(editingService.image || "");
      setActive(editingService.active ?? true);
      setCouponOffers(editingService.couponOffers || []);
      setDiscount(editingService.discount || "");
      // support backend naming variations and normalize subitems for the UI
      const incomingSubitems = editingService.subitems || editingService.subServices || [];
      const normalized = Array.isArray(incomingSubitems)
        ? incomingSubitems.map((s) => ({
            name: s.name || s.title || "",
            price: s.price != null ? s.price : s.amount || 0,
            isActive: s.isActive ?? true,
            description: s.description || "",
          }))
        : [];
      setSubitems(normalized);
      setShowInHome(editingService?.showInHome || false);
setShowInService(editingService?.showInService || false);
  setServiceType(editingService?.serviceType || 'garage');
      // initialize preview from existing image
      if (editingService.image) {
        setImagePreview(editingService.image);
      }

    }
  }, [editingService]);

  // cleanup object URL when imageFile changes or on unmount
  // ref to hold the last created object URL so we can revoke it safely
  const lastObjectUrl = useRef(null);
  useEffect(() => {
    return () => {
      if (lastObjectUrl.current) {
        try {
          URL.revokeObjectURL(lastObjectUrl.current);
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleAddCoupon = () => {
    if (couponInput.trim() !== "") {
      setCouponOffers([...couponOffers, couponInput.trim()]);
      setCouponInput("");
    }
  };

  const handleDeleteCoupon = (index) => {
    setCouponOffers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: editingService?.id || Date.now(),
      name,
      description,
      price,
      image,
      active,
      couponOffers,
      discount,
      subitems,
      showInHome,
      showInService,
    };

    // If an image file was selected, upload it first to backend which returns the hosted URL
    (async () => {
      try {
        let finalResult = null;
        if (imageFile) {
          setUploading(true);
          // send full payload as multipart/form-data
          const formData = new FormData();
          // include id for update if present
          if (editingService?.id) formData.append('id', editingService.id);
          formData.append('name', name);
          formData.append('description', description || '');
          formData.append('price', String(price || '0'));
          formData.append('active', String(active));
          formData.append('serviceType', String(serviceType));
          formData.append('discount', String(discount || '0'));
          formData.append('showInHome', String(showInHome));
          formData.append('showInService', String(showInService));
          // arrays / objects as JSON strings
          formData.append('couponOffers', JSON.stringify(couponOffers || []));
          // backend expects 'subServices'
          formData.append('subServices', JSON.stringify(subitems || []));
          // include image file last
          formData.append('image', imageFile);

          try {
            const res = await api.post('services/addService', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              withCredentials: true,
            });
            finalResult = res?.data;
          } finally {
            setUploading(false);
          }
        } else {
          // no file selected: use JSON-based parent call
          const payload = { ...newService, image, serviceType };
          if (editingService) {
            // call parent update which will post JSON
            updateService(payload);
            closeModal();
            return;
          } else {
            addService(payload);
            closeModal();
            return;
          }
        }

        // If we reached here, we used multipart upload and have server response
        const returnedData = finalResult?.data || finalResult;
        const serviceObj = returnedData
          ? { ...returnedData, id: returnedData._id || returnedData.id || editingService?.id }
          : { ...newService, id: editingService?.id || Date.now() };

        if (editingService) {
          // when using multipart, call parent with marker so parent doesn't re-post
          updateService({ __fromFormData: true, data: serviceObj });
        } else {
          addService({ __fromFormData: true, data: serviceObj });
        }
        closeModal();
      } catch (err) {
        console.error('Image upload or save failed', err);
        setUploading(false);
      }
    })();
  };

  // ---------------------------subitem funtions --------------------------

  
// add / update subitem
const handleAddOrUpdateSubitem = () => {
  if (!subitemName.trim()) return;

  const newSubitem = {
    name: subitemName,
    price: Number(subitemPrice),
    isActive: subitemActive,
  };

  if (editingSubitemIndex !== null) {
    // update existing
    const updated = [...subitems];
    updated[editingSubitemIndex] = newSubitem;
    setSubitems(updated);
    setEditingSubitemIndex(null);
  } else {
    // add new
    setSubitems([...subitems, newSubitem]);
  }

  // reset inputs
  setSubitemName("");
  setSubitemPrice(0);
  setSubitemActive(true);
};

const handleEditSubitem = (index) => {
  const item = subitems[index];
  setSubitemName(item.name);
  setSubitemPrice(item.price);
  setSubitemActive(item.isActive);
  setEditingSubitemIndex(index);
};

const handleDeleteSubitem = (index) => {
  setSubitems(subitems.filter((_, i) => i !== index));
};

  return (
    <Dialog open onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingService ? "Edit Service" : "Add Service"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {/* main fields */}
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Image upload and preview */}
          <Box mb={2}>
            <label htmlFor="service-image" style={{ display: "block", marginBottom: 8 }}>
              <Typography variant="subtitle2">Service Image</Typography>
            </label>
            <input
              id="service-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setImageFile(file);
                  // revoke previous object URL if exists
                  if (lastObjectUrl.current) {
                    try {
                      URL.revokeObjectURL(lastObjectUrl.current);
                    } catch (err) {}
                  }
                  // create a preview URL
                  const url = URL.createObjectURL(file);
                  lastObjectUrl.current = url;
                  setImagePreview(url);
                  // clear any manual image URL so the uploaded file takes precedence
                  setImage("");
                }
              }}
            />
            {/* show selected filename */}
            {imageFile && (
              <Typography variant="caption" display="block" mt={0.5}>
                {imageFile.name}
              </Typography>
            )}

            {/* preview: prefer selected file preview, fallback to existing image URL */}
            {imagePreview ? (
              <Box mt={1}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                />
              </Box>
            ) : image ? (
              <Box mt={1}>
                <img
                  src={image}
                  alt="existing"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                />
              </Box>
            ) : null}
          </Box>
          <TextField
            select
            label="Active"
            value={active}
            onChange={(e) => setActive(e.target.value === "true")}
            fullWidth
            margin="normal"
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </TextField>

          <TextField
            select
            label="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="garage">Garage</MenuItem>
            <MenuItem value="onsite">Onsite</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
          </TextField>

          {/* coupon offers */}
          <Typography variant="subtitle1" mt={2}>
            Coupon Offers
          </Typography>
          <Box display="flex" gap={1} mb={1}>
            <TextField
              label="Add Coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              fullWidth
            />
            <Button variant="outlined" onClick={handleAddCoupon}>
              Add
            </Button>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {couponOffers.map((coupon, index) => (
              <Box
                key={index}
                sx={{
                  p: 1,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography>
                  {typeof coupon === 'string'
                    ? coupon
                    : (coupon.code ? `${coupon.code} — ${coupon.value ?? ''}${coupon.discountType ? ' ('+coupon.discountType+')' : ''}` : JSON.stringify(coupon))}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteCoupon(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <TextField
            label="Discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>Show In</FormLabel>
<RadioGroup
  row
  value={showInHome ? "home" : "service"}
  onChange={(e) => {
    if (e.target.value === "home") {
      setShowInHome(true);
      setShowInService(false);
    } else {
      setShowInHome(false);
      setShowInService(true);
    }
  }}
>
  <FormControlLabel value="home" control={<Radio />} label="Show in Home" />
  <FormControlLabel value="service" control={<Radio />} label="Show in Service" />
</RadioGroup>


          {/* subitems */}
          <Typography variant="h6" fontWeight={600} mb={1}>
            Subitems
          </Typography>
         {/* Subitem input fields */}
<Box display="flex" gap={2} alignItems="center" mb={2}>
  <TextField
    label="Subitem Name"
    value={subitemName}
    onChange={(e) => setSubitemName(e.target.value)}
    fullWidth
  />
  <TextField
    label="Price"
    type="number"
    value={subitemPrice}
    onChange={(e) => setSubitemPrice(e.target.value)}
    sx={{ width: "150px" }}
  />
  <TextField
    select
    label="Active"
    value={subitemActive}
    onChange={(e) => setSubitemActive(e.target.value === "true")}
    sx={{ width: "150px" }}
  >
    <MenuItem value="true">True</MenuItem>
    <MenuItem value="false">False</MenuItem>
  </TextField>
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddOrUpdateSubitem}
  >
    {editingSubitemIndex !== null ? "Update" : "Add"}
  </Button>
</Box>

{/* Subitems Table */}
<Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 1 }}>
  {subitems.length === 0 ? (
    <Typography variant="body2" color="text.secondary">
      No subitems added yet.
    </Typography>
  ) : (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Price</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Active</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subitems.map((item, index) => (
          <tr key={index}>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {item.name}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {item.price}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {item.isActive ? "Yes" : "No"}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleEditSubitem(index)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDeleteSubitem(index)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</Box>
         
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            {editingService ? "Update" : "Save"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ServiceModal;
