import React from 'react';
import './AdminDashboard.css';


function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      {/* Add admin-specific content here */}
      <p>Welcome to the Admin area. This is where you can manage users, view site statistics, etc.</p>
      {/* Example: Link to other admin sections */}
      {/* <Link to="/admin/users">Manage Users</Link> */}
    </div>
  );
}

export default AdminDashboard;