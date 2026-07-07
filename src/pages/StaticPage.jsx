import React from 'react';
import './StaticPage.css';

const StaticPage = ({ title, children }) => {
  return (
    <div className="static-page">
      <div className="static-header">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="container static-content section">
        {children}
      </div>
    </div>
  );
};

export default StaticPage;
