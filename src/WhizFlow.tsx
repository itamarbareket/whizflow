import React from 'react';
import { WhizFlowProps } from './types';
import { useWhizFlow } from './useWhizFlow';

export const WhizFlow: React.FC<WhizFlowProps> = ({
  workflow,
  questionTypes,
  children,
  onComplete,
}) => {
  const defaultOnComplete = () => {};
  const {
    step,
    trail,
    answers,
    setAnswers,
    handleNext,
    handlePrev,
    setStep,
    loading,
  } = useWhizFlow(workflow, onComplete ?? defaultOnComplete);

  const renderQuestion = (questionId: string) => {
    const question = step.questions.find((q) => q.id === questionId);

    if (!question) {
      console.error(`Question with ID "${questionId}" not found.`);
      return null;
    }

    if (!questionTypes) {
      console.error(`No question types defined.`);
      return null;
    }

    const renderFunc = questionTypes[question.inputType];

    if (!renderFunc) {
      console.error(
        `Question type "${question.inputType}" not found in the provided questionTypes.`
      );
      return null;
    }

    return renderFunc(question, answers, setAnswers);
  };

  return children({
    step,
    answers,
    loading,
    trail,
    setAnswers,
    handleNext,
    renderQuestion,
    handlePrev,
    setStep,
  });
};
