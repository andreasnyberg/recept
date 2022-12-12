import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = (props) => {
  return (
    <div className="error-page">
      {props.children}
      <Link to="/" className="button floating-button floating-button--link">Ta mig till startsidan 🚀</Link>
    </div>
  );
};

export default ErrorPage;