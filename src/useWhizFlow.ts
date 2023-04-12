// src/useWhizFlow.ts
import { useState } from 'react';
import { Step, Answers } from './types';

export const useWhizFlow = (
  workflow: Step[],
  onComplete: (answers: Answers) => void
) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});

  const step = workflow[currentStep];

  const handleNext = (submitterAnswers?: Answers) => {
    const currAnswers = submitterAnswers ?? answers;
    const result = step.next(currAnswers);

    const nextStepId = typeof result === 'string' ? result : result.nextStepId;
    const updatedAnswers =
      typeof result !== 'string' && result.updatedAnswers
        ? result.updatedAnswers
        : currAnswers;

    if (nextStepId === 'done') {
      onComplete(updatedAnswers);
    } else {
      setAnswers(updatedAnswers);
      const nextStepIndex = workflow.findIndex(
        (step) => step.id === nextStepId
      );

      if (nextStepIndex === -1) {
        console.error(`Error: Non-existent step "${nextStepId}"`);
        return;
      }

      setCurrentStep(nextStepIndex);
    }
  };

  return {
    step,
    answers,
    setAnswers,
    handleNext,
  };
};
