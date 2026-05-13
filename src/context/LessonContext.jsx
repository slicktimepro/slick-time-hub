import React, { createContext, useState, useContext } from 'react';

const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [lessonData, setLessonData] = useState(null);

  const nextStage = () => setCurrentStageIndex((prev) => prev + 1);
  const resetLesson = () => setCurrentStageIndex(0);
  
  return (
    <LessonContext.Provider value={{ lessonData, setLessonData, currentStageIndex, nextStage, resetLesson }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLesson = () => useContext(LessonContext);