import React from 'react';
import { useLesson } from '../../context/LessonContext';
import VideoPlayer from './assets/VideoPlayer';
import GameCanvas from './assets/GameCanvas';

const StageView = () => {
  const { lessonData, currentStageIndex, nextStage } = useLesson();

  // If no data is loaded yet
  if (!lessonData) return <div>Ready to start the magic?</div>;

  const currentStage = lessonData.stages[currentStageIndex];

  // If the student has finished all stages
  if (!currentStage) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>✨ Lesson Complete! ✨</h2>
        <p>You've mastered this part of Computational Magic.</p>
      </div>
    );
  }

  // Choose which component to show
  return (
    <div>
      {currentStage.type === 'video' ? (
        <VideoPlayer src={currentStage.src} onEnded={nextStage} />
      ) : (
        <GameCanvas problemId={currentStage.problemId} onSolved={nextStage} />
      )}
    </div>
  );
};

export default StageView;