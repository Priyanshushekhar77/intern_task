import React, { useState, useEffect } from 'react';
import { convertPdfToXml, getConversions } from '../services/api';
import ConversionItem from '../components/ConversionItem';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchConversions();
  }, []);

  const fetchConversions = async () => {
    try {
      const res = await getConversions();
      setConversions(res.data.data);
    } catch (err) {
      setError('Failed to load conversions');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      await convertPdfToXml(formData);
      setSuccess('File converted successfully!');
      setFile(null);
      fetchConversions();
      // Reset file input
      document.getElementById('pdfFile').value = '';
    } catch (err) {
      setError(err.response?.data?.error || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>PDF to XML Converter</h2>
      
      <div className="card mb-4">
        <div className="card-header">Upload PDF</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="pdfFile" className="form-label">Select PDF File</label>
              <input
                type="file"
                className="form-control"
                id="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading || !file}>
              {loading ? 'Converting...' : 'Convert to XML'}
            </button>
          </form>
        </div>
      </div>

      <h3>Your Conversions</h3>
      {conversions.length === 0 ? (
        <p>No conversions yet. Upload a PDF to get started!</p>
      ) : (
        conversions.map(conversion => (
          <ConversionItem key={conversion._id} conversion={conversion} />
        ))
      )}
    </div>
  );
};

export default Dashboard;
