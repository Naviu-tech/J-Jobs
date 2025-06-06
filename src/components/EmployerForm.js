import React from 'react';
import siteConfig from '../config/site.js';

function EmployerForm({ jobId }) {
  return (
    <form action={siteConfig.forms.employer} method="post">
      {/* ... other form fields ... */}
      <button
        type="submit"
        style={{
          background: siteConfig.colors.main, // Uses primary brand color from site.js
          color: '#fff', // Adjust text color as needed
        }}
      >
        Submit Application
      </button>
    </form>
  );
}

export default EmployerForm;