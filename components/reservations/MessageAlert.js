import React from 'react';

const MessageAlert = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';

  return (
    <div role="alert" className={`${bgColor} text-center p-4 rounded-lg my-4 text-sm ${textColor}`}>
      {message}
    </div>
  );
};

export default MessageAlert;
