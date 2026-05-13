import React from 'react';

const GameCanvas = ({ problemId, onSolved }) => {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#f3e5f5', 
      borderRadius: '15px', 
      textAlign: 'center',
      border: '3px dashed #7c4dff' 
    }}>
      <h2 style={{ color: '#4a148c' }}>Magic Challenge: {problemId}</h2>
      <p>Look at the presentation and solve the problem!</p>
      <button 
        onClick={onSolved}
        style={{
          padding: '10px 25px',
          fontSize: '18px',
          backgroundColor: '#7c4dff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        I solved it! Next →
      </button>
    </div>
  );
};

export default GameCanvas;