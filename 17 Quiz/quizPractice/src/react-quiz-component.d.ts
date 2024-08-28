declare module 'react-quiz-component' {
  import React from 'react';

  interface QuizProps {
    quiz: any;
    shuffle?: boolean;
    showInstantFeedback?: boolean;
    continueTillCorrect?: boolean;
    timer?: number;
    allowPauseTimer?: boolean;
    showDefaultResult?: boolean;
    customResultPage?: (obj: any) => React.ReactNode;
    onComplete?: (obj: any) => void;
    onQuestionSubmit?: (obj: any) => void;
  }

  const Quiz: React.FC<QuizProps>;

  export default Quiz;
}