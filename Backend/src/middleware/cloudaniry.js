const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbv9j1ldd',
  api_key: '366428492867933',
  api_secret: 'XQF7lS5LV7YjdMoX7155G3-zzpQ'
});

async function uploadToCloudinary(filePath) {
  return cloudinary.uploader.upload(filePath, {
    folder: 'locations'
  });
}

module.exports = { uploadToCloudinary };
