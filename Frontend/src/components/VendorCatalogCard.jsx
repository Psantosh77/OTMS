import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack } from "@mui/material";

const VendorCatalogCard = ({ vendor }) => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, overflow: 'hidden', width: '100%', m: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 220, position: 'relative' }}>
      <Box sx={{ position: 'relative', width: { xs: '100%', md: '33%' }, minWidth: { md: 0 } }}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: { xs: 260, md: 300 }, objectFit: 'cover' }}
          image={vendor.image || "https://source.unsplash.com/featured/?car,garage"}
          alt={vendor.name}
        />
        {/* Rating badge */}
        {vendor.rating && (
          <Box sx={{ position: 'absolute', top: 12, right: 12, background: '#fff', borderRadius: 2, px: 1.5, py: 0.5, boxShadow: 2, display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 15 }}>
            <span style={{ color: '#ffb400', marginRight: 4 }}>★</span> {vendor.rating}
          </Box>
        )}
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {vendor.name}
        </Typography>
        {vendor.address && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mr: 1 }}>
              {vendor.address}
            </Typography>
            {vendor.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', background: '#fffbe6', borderRadius: 1, px: 1, py: 0.2, ml: 1, fontWeight: 600, fontSize: 14 }}>
                <span style={{ color: '#ffb400', marginRight: 3 }}>★</span> {vendor.rating}
              </Box>
            )}
          </Box>
        )}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {vendor.description}
        </Typography>
        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight={600} mb={1} color="primary">Services Offered:</Typography>
          <Stack component="ul" spacing={2} sx={{ pl: 0, mb: 0 }}>
            {vendor.services.map((service, idx) => (
              <Box component="li" key={idx} sx={{ display: 'flex', alignItems: 'center', fontSize: 20, color: '#222', listStyle: 'none', mb: 1.2 }}>
                <span style={{ display: 'inline-block', width: 28, height: 28, background: '#ff6b35', borderRadius: '50%', color: '#fff', textAlign: 'center', lineHeight: '28px', fontSize: 18, marginRight: 14 }}>✔</span>
                {service}
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VendorCatalogCard;
