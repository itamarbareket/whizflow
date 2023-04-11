// src/__tests__/WhizFlow.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow', () => {
  const workflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'Question 1:',
          inputType: 'text',
        },
      ],
      next: (answers) => 'step2',
    },
    {
      id: 'step2',
      questions: [
        {
          id: 'question2',
          prompt: 'Question 2:',
          inputType: 'text',
        },
      ],
      next: (answers) => 'done',
    },
  ] as Step[];

  it('renders the first step', () => {
    const { getByLabelText } = render(
      <WhizFlow workflow={workflow}>
        {({ step, answers, setAnswers, handleNext }) => (
          <div>
            <label htmlFor={step.questions[0].id}>
              {typeof step.questions[0].prompt === 'string'
                ? step.questions[0].prompt
                : step.questions[0].prompt(answers)}
            </label>
            <input
              id={step.questions[0].id}
              type={step.questions[0].inputType}
            />
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(getByLabelText('Question 1:')).toBeInTheDocument();
  });

  it('transitions to the next step', () => {
    const { getByLabelText, getByText } = render(
      <WhizFlow workflow={workflow}>
        {({ step, answers, setAnswers, handleNext }) => (
          <div>
            {step.questions.map((question) => (
              <React.Fragment key={question.id}>
                <label htmlFor={question.id}>
                  {typeof question.prompt === 'string'
                    ? question.prompt
                    : question.prompt(answers)}
                </label>
                <input id={question.id} type={question.inputType} />
              </React.Fragment>
            ))}
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    fireEvent.click(getByText('Next'));
    expect(getByLabelText('Question 2:')).toBeInTheDocument();
  });
});
