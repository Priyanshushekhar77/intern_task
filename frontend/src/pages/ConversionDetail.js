import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConversion } from '../services/api';

const ConversionDetail = () => {
  const { id } = useParams();
  const [conversion, setConversion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        const res = await getConversion(id);
        setConversion(res.data.data);
      } catch (err) {
        setError('Failed to load conversion details');
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(conversion.xmlContent);
    alert('XML content copied to clipboard!');
  };

  const downloadXml = () => {
    const element = document.createElement('a');
    const file = new Blob([conversion.xmlContent], { type: 'text/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `${conversion.originalFilename.replace('.pdf', '')}.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!conversion) return <div className="container mt-4">Conversion not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Conversion Details</h2>
        <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5>{conversion.originalFilename}</h5>
          <small className="text-muted">
            Converted on {new Date(conversion.createdAt).toLocaleString()}
          </small>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <h6>XML Output</h6>
              <div>
                <button onClick={copyToClipboard} className="btn btn-sm btn-outline-primary me-2">
                  Copy to Clipboard
                </button>
                <button onClick={downloadXml} className="btn btn-sm btn-outline-success">
                  Download XML
                </button>
              </div>
            </div>
            <div className="border p-3 bg-light" style={{ maxHeight: '500px', overflow: 'auto' }}>
              <pre>{conversion.xmlContent}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionDetail;

