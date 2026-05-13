import React from 'react';

const VideoPlayer = ({ src, onEnded }) => {
  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '20px auto' }}>
      <video 
        src={src} 
        controls 
        onEnded={onEnded} 
        style={{ width: '100%', borderRadius: '15px', border: '4px solid #7c4dff' }}
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;