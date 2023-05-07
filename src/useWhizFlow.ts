// src/useWhizFlow.ts
import { useState } from 'react';
import { Step, Answers } from './types';

export const useWhizFlow = (
  workflow: Step[],
  onComplete: (answers: Answers) => void
) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [trail, setTrail] = useState<number[]>([]);

  const step = workflow[currentStep];

  const handlePrev = async () => {
    const prevStep = trail.pop();
    if (prevStep !== undefined && prevStep >= 0) {
      setTrail([...trail]);
      setCurrentStep(prevStep);
    }
  };

  const setStep = async (
    stepId: string,
    newTrail?: number[],
    updatedAnswers?: Answers
  ) => {
    const currAnswers = updatedAnswers ?? answers;
    const currTrail = newTrail ?? trail;
    setAnswers(currAnswers);
    const nextStepIndex = workflow.findIndex((step) => step.id === stepId);

    if (nextStepIndex === -1) {
      console.error(`Error: Non-existent step "${stepId}"`);
      return;
    }

    setTrail(currTrail);
    setCurrentStep(nextStepIndex);
  };

  const handleNext = async (submitterAnswers?: Answers) => {
    const currAnswers = submitterAnswers ?? answers;
    const result = step.next(currAnswers);

    let nextStepId = '';
    let updatedAnswers = currAnswers;
    if (typeof result === 'string') {
      nextStepId = result;
      updatedAnswers = currAnswers;
    } else if (typeof (result as Promise<any>)?.then === 'function') {
      try {
        setLoading(true);
        const awaitedResult = await result;
        setLoading(false);
        if (typeof awaitedResult === 'string') {
          nextStepId = awaitedResult;
        } else {
          nextStepId = awaitedResult.nextStepId;
          updatedAnswers = awaitedResult.updatedAnswers ?? currAnswers;
        }
      } catch (ex) {
        console.error(`Error: Next step eval failed "${ex}"`);
        return;
      }
    } else if ((result as any)?.nextStepId) {
      nextStepId = (result as any).nextStepId;
      updatedAnswers = (result as any).updatedAnswers ?? currAnswers;
    }

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

      setTrail([...trail, currentStep]);
      setCurrentStep(nextStepIndex);
    }
  };

  return {
    step,
    trail,
    answers,
    loading,
    setAnswers,
    handleNext,
    handlePrev,
    setStep,
  };
};
