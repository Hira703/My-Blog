const multer = require('multer');

const storage = multer.memoryStorage(); // buffer-based
const upload = multer({ storage });

module.exports = upload;
