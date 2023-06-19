import React from "react";

// error and no result message
const NotCompleteMessage = ({ image, message }) => {
  return (
    <div className="mt-3 lg:mt-5 flex flex-col justify-center items-center">
      {/* illustration */}
      <img src={image} alt="favs" className="w-32 h-32 lg:w-56 lg:h-56" />

      {/* message */}
      <p className="text-white">{message}</p>
    </div>
  );
};

export default NotCompleteMessage;
