const Location = require('../../model/locationModel/locationModel');
const { sendResponse, sendError } = require('../../utils/response');
const yup = require('yup');

// Validation schemas (reuseable)
const AddressSchema = yup.object({
  area: yup.string().nullable(),
  district: yup.string().nullable(),
  street: yup.string().nullable(),
  building: yup.string().nullable(),
  floor: yup.string().nullable(),
  apartment: yup.string().nullable(),
  po_box: yup.string().nullable(),
  makani_number: yup.string().nullable(),
  landmark: yup.string().nullable(),
  gps: yup.object({ lat: yup.number().nullable(), lng: yup.number().nullable() }).nullable()
}).nullable();

const CitySchema = yup.object({
  name: yup.string().required('city.name is required'),
  postal_code: yup.string().required('city.postal_code is required'),
  icon: yup.string().nullable(),
  location_file: yup.string().nullable(),
  makani_number: yup.string().nullable(),
  location_type: yup.string().transform(v => (v ? String(v).trim().toLowerCase() : v)).oneOf(['onsite', 'offsite', 'remote']).nullable(),
  address: yup.array().of(AddressSchema).nullable()
}).required();

const RequestSchema = yup.object({
  emirate: yup.string().required('emirate is required'),
  icon: yup.string().nullable(),
  isActive: yup.boolean().nullable(),
  location_type: yup.string().transform(v => (v ? String(v).trim().toLowerCase() : v)).oneOf(['onsite', 'offsite', 'remote']).nullable(),
  cities: yup.array().of(CitySchema).required('cities is required').min(1)
});

async function addLocation(req, res) {
  try {
    // handle multipart: parse cities JSON if necessary and pick up uploaded icon
    const raw = Object.assign({}, req.body || {});
    if (raw.cities && typeof raw.cities === 'string') {
      try { raw.cities = JSON.parse(raw.cities); } catch (e) { return sendError(res, { message: 'Invalid cities JSON', data: e.message, status: 400 }); }
    }

    // Sometimes each city's address might be stringified as well (e.g., when using multipart/form-data).
    if (Array.isArray(raw.cities)) {
      raw.cities = raw.cities.map(city => {
        const c = Object.assign({}, city);
        if (c.address && typeof c.address === 'string') {
          try { c.address = JSON.parse(c.address); } catch (e) { /* leave as-is; validation will catch it */ }
        }
        return c;
      });
    }

    if (req.file && req.file.filename) {
      raw.icon = `/uploads/${req.file.filename}`;
    }

    let validated;
    try { validated = await RequestSchema.validate(raw, { abortEarly: false, stripUnknown: true }); }
    catch (err) {
      if (err && err.name === 'ValidationError') {
        const errors = err.inner && err.inner.length ? err.inner.map(e => ({ path: e.path, message: e.message })) : [{ path: err.path, message: err.message }];
        return sendError(res, { message: 'Validation failed', data: errors, status: 400 });
      }
      throw err;
    }

    const doc = new Location({
      emirate: validated.emirate,
      icon: validated.icon,
      isActive: typeof validated.isActive === 'boolean' ? validated.isActive : true,
      location_type: validated.location_type || 'onsite',
      cities: validated.cities
    });

    const saved = await doc.save();
    return sendResponse(res, { message: 'Location created', data: saved, status: 201 });
  } catch (err) {
    console.error('addLocation error:', err);
    return sendError(res, { message: 'Failed to create location', data: err.message });
  }
}

async function listLocations(req, res) {
  try {
    const locations = await Location.find().lean();
    return sendResponse(res, { message: 'Locations fetched', data: locations, status: 200 });
  } catch (err) {
    console.error('listLocations error:', err);
    return sendError(res, { message: 'Failed to fetch locations', data: err.message });
  }
}


// (exports collected at end of file)

async function searchByType(req, res) {
      try {
    const rawType = req.body && req.body.type;
    if (!rawType) return sendError(res, { message: 'type field is required in body', status: 400 });
    const type = String(rawType).trim().toLowerCase();

    const locations = await Location.find({
      $or: [
        { location_type: type },
        { 'cities.location_type': type }
      ]
    }).lean();

    return sendResponse(res, { message: 'Locations fetched by payload type', data: locations, status: 200 });
  } catch (err) {
    console.error('searchByType error:', err);
    return sendError(res, { message: 'Failed to search locations by type', data: err.message });
  }
}

// Export controller functions
module.exports = { addLocation, listLocations, searchByType };




