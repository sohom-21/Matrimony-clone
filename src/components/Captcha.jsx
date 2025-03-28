import React, { useState, useEffect } from 'react';

const Captcha = ({ onVerificationChange }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInput('');
    onVerificationChange('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    onVerificationChange(value === captchaText ? value : '');
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-100 p-3 rounded text-lg font-mono tracking-wider select-none">
          {captchaText}
        </div>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          ↻
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter the code above"
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default Captcha;