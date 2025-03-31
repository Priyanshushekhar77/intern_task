const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Conversion = require('../models/Conversion');


exports.convertPdfToXml = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a PDF file' });
    }

    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);
    
    // Parse PDF
    const pdfData = await pdfParse(dataBuffer);
    
    // Convert to XML with basic structure preservation
    const xmlContent = convertToStructuredXml(pdfData);

    // Save conversion to database
    const conversion = await Conversion.create({
      user: req.user.id,
      originalFilename: req.file.originalname,
      pdfPath: pdfPath,
      xmlContent: xmlContent
    });

    res.status(201).json({
      success: true,
      data: conversion
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all conversions for a user
// @route   GET /api/conversions
// @access  Private
exports.getConversions = async (req, res, next) => {
  try {
    const conversions = await Conversion.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: conversions.length,
      data: conversions
    });
  } catch (err) {
    next(err);
  }
};


exports.getConversion = async (req, res, next) => {
  try {
    const conversion = await Conversion.findById(req.params.id);

    if (!conversion) {
      return res.status(404).json({ success: false, error: 'Conversion not found' });
    }

    // Make sure user owns conversion
    if (conversion.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to access this conversion' });
    }

    res.status(200).json({
      success: true,
      data: conversion
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to convert PDF data to structured XML
function convertToStructuredXml(pdfData) {
  let text = pdfData.text;
  
  // Split text into paragraphs (based on double newlines)
  const paragraphs = text.split(/\n\s*\n/);
  
  // Create XML structure
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<document>\n';
  xml += `  <metadata>\n`;
  xml += `    <title>${pdfData.info.Title || 'Untitled'}</title>\n`;
  xml += `    <author>${pdfData.info.Author || 'Unknown'}</author>\n`;
  xml += `    <pages>${pdfData.numpages}</pages>\n`;
  xml += `  </metadata>\n`;
  xml += '  <content>\n';
  
  // Process paragraphs
  paragraphs.forEach((paragraph, index) => {
    // Skip empty paragraphs
    if (paragraph.trim() === '') return;
    
    // Check if paragraph might be a header (shorter, ends with no period)
    const isHeader = paragraph.length < 100 && !paragraph.trim().endsWith('.');
    
    if (isHeader) {
      xml += `    <header>${escapeXml(paragraph.trim())}</header>\n`;
    } else {
      xml += `    <paragraph>${escapeXml(paragraph.trim())}</paragraph>\n`;
    }
  });
  
  xml += '  </content>\n';
  xml += '</document>';
  
  return xml;
}


function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
