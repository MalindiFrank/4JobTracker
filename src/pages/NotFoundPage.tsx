import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;