const Location = require('../../model/locationModel/locationModel');
const { sendResponse, sendError } = require('../../utils/response');
const yup = require('yup');

// Validation schemas (reuseable)
const AddressSchema = yup.object({
  building_no: yup.string().nullable(),
  street_no: yup.string().nullable(),
  address1: yup.string().nullable(),
  address2: yup.string().nullable(),
  makani_number: yup.string().nullable(),
  
}).nullable();

const CitySchema = yup.object({
  name: yup.string().required('city.name is required'),
  // no per-city location_type; use top-level location_type instead
  // single Address object per city
  address: AddressSchema.nullable()
}).required();

const RequestSchema = yup.object({
  emirate: yup.string().required('emirate is required'),
  icon: yup.string().nullable(),
  isActive: yup.boolean().nullable(),
  location_type: yup.string().transform(v => {
    if (v === undefined || v === null) return null;
    const s = String(v).trim().toLowerCase();
    return s === '' ? null : s;
  }).oneOf(['onsite', 'offsite', 'remote', null]).nullable(),
  cities: yup.array().of(CitySchema).required('cities is required').min(1)
});

async function addLocation(req, res) {
  try {
    // handle multipart: parse cities JSON if necessary and pick up uploaded icon
    const raw = Object.assign({}, req.body || {});
    if (raw.cities && typeof raw.cities === 'string') {
      try { raw.cities = JSON.parse(raw.cities); } catch (e) { return sendError(res, { message: 'Invalid cities JSON', data: e.message, status: 400 }); }
    }

    // Normalize city.address to be a single cleaned object. Clients might send a stringified object, an array, or an object.
    if (Array.isArray(raw.cities)) {
      raw.cities = raw.cities.map(city => {
        const c = Object.assign({}, city);
        // If address is a stringified JSON, parse it. Try parsing repeatedly if double-stringified.
        if (c.address && typeof c.address === 'string') {
          try {
            let parsed = JSON.parse(c.address);
            // handle double-encoded strings
            if (typeof parsed === 'string') parsed = JSON.parse(parsed);
            c.address = parsed;
          } catch (e) { /* leave as-is; validation will catch it */ }
        }

        // If address is an array (legacy), pick the first element or null.
        if (Array.isArray(c.address)) {
          c.address = c.address.length ? c.address[0] : null;
        }

              // Sanitize address fields: strip surrounding quotes and convert 'null' to null
              if (c.address && typeof c.address === 'object') {
                const a = Object.assign({}, c.address);
                const strip = v => {
                  if (v === undefined || v === null) return null;
                  if (typeof v !== 'string') return v;
                  const s = v.trim();
                  if (s === '' || s.toLowerCase() === 'null') return null;
                  // remove wrapping quotes if present: '"value"' or '"..."'
                  const m = s.match(/^"?(.*)"?$/);
                  return m ? m[1] : s;
                };

                a.building_no = strip(a.building_no);
                a.street_no = strip(a.street_no);
                a.address1 = strip(a.address1);
                a.address2 = strip(a.address2);
                a.makani_number = strip(a.makani_number);

                c.address = a;
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
        return sendError(res, { message: 'Validation failed', data: { errors }, status: 400 });
      }
      console.error('Validation processing error:', err);
      return sendError(res, { message: 'Validation processing error', data: { error: err.message }, status: 400 });
    }

    // Whitelist fields to prevent saving unexpected properties
    const normalizedCities = (validated.cities || []).map(ct => {
      const addr = ct.address || null;
      const sanitizedAddr = addr ? {
        building_no: addr.building_no || null,
        street_no: addr.street_no || null,
        address1: addr.address1 || null,
        address2: addr.address2 || null,
        makani_number: addr.makani_number || null,
     
      } : null;

      return {
        name: ct.name,
        address: sanitizedAddr
      };
    });

    const doc = new Location({
      emirate: validated.emirate,
      icon: validated.icon || '',
      isActive: typeof validated.isActive === 'boolean' ? validated.isActive : true,
      location_type: validated.location_type || 'onsite',
      cities: normalizedCities
    });

    const saved = await doc.save();
    return sendResponse(res, { message: 'Location created', data: saved, status: 201 });
  } catch (err) {
    console.error('addLocation error:', err);
    return sendError(res, { message: 'Failed to create location', data: { error: err.message }, status: 500 });
  }
}

async function listLocations(req, res) {
  try {
    const locations = await Location.find().lean();
    return sendResponse(res, { message: 'Locations fetched', data: locations, status: 200 });
  } catch (err) {
    console.error('listLocations error:', err);
    return sendError(res, { message: 'Failed to fetch locations', data: { error: err.message }, status: 500 });
  }
}


// (exports collected at end of file)

async function searchByType(req, res) {
      try {
    const rawType = req.body && req.body.type;
    if (!rawType) return sendError(res, { message: 'type field is required in body', status: 400 });
    const type = String(rawType).trim().toLowerCase();

    const locations = await Location.find({ location_type: type }).lean();

    return sendResponse(res, { message: 'Locations fetched by payload type', data: locations, status: 200 });
  } catch (err) {
    console.error('searchByType error:', err);
    return sendError(res, { message: 'Failed to search locations by type', data: { error: err.message }, status: 500 });
  }
}

// Export controller functions
module.exports = { addLocation, listLocations, searchByType };




