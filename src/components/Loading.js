import React from 'react';

function Loading({isLoading}) {
  return (
    <div className={`spinner ${isLoading && 'spinner_visible'}`}>
      <i></i>
    </div>
  );
}

export default Loading;
