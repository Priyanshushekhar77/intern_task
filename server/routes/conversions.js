const express = require('express');
const multer = require('multer');
const path = require('path');
const { convertPdfToXml, getConversions, getConversion } = require('../controllers/conversions');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: PDF files only!'));
  }
});

router.post('/', protect, upload.single('pdfFile'), convertPdfToXml);
router.get('/', protect, getConversions);
router.get('/:id', protect, getConversion);

module.exports = router;
