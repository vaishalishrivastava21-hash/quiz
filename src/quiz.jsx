import React, { useState, useEffect } from 'react';

const Task = () => {
  const [mood, setMood] = useState('');

  useEffect(() => {
    const storedMood = localStorage.getItem('mood');
    if (storedMood) {
      setMood(storedMood);
    }
  }, []);

  return (
    <div>
      <h2>Your Mood</h2>
      <p>{mood ? mood : 'No mood found in localStorage.'}</p>
    </div>
  );
};

export default Task;
