import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">PDF to XML Converter</h1>
        <p className="lead">
          Convert your PDF documents to structured XML format while preserving document structure and formatting.
        </p>
        <hr className="my-4" />
        <p>
          Upload your PDF files, convert them to XML, and manage your conversion history all in one place.
        </p>
        {user ? (
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Dashboard
          </Link>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary btn-lg me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Easy Conversion</h5>
              <p className="card-text">
                Upload your PDF files and convert them to structured XML with just a few clicks.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Preserve Structure</h5>
              <p className="card-text">
                Our converter maintains document structure including paragraphs and headers.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage History</h5>
              <p className="card-text">
                Access your conversion history and download previously converted documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
