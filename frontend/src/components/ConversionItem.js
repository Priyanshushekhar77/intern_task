import React from 'react';
import { Link } from 'react-router-dom';

const ConversionItem = ({ conversion }) => {
  const date = new Date(conversion.createdAt).toLocaleDateString();
  
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{conversion.originalFilename}</h5>
        <p className="card-text">
          <small className="text-muted">Converted on {date}</small>
        </p>
        <Link to={`/conversions/${conversion._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ConversionItem;
