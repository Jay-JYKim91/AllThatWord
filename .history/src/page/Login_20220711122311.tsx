import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="px-6 md:px-9 lg:px-12 py-12 md:py-18 lg:py-24 text-center">
      <p className="font-heading_font text-4xl">LOGIN</p>
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
