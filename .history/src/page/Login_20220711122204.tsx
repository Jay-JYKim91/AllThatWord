import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <p className="font-heading_font">Login</p>
      <ul>
        <li>
          <button type="button">Google</button>
        </li>
        <li>
          <button type="button">Github</button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
