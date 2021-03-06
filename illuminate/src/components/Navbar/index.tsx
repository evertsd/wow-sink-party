import * as React from 'react';
import './styles.css';

export const Navbar: React.FC = ({ children }) => (
  <>
    <div className="navbar">
      <div className="navbar-brand">Epitome</div>
      {children}
    </div>
    <div className="navbar-padding" />
  </>
);
