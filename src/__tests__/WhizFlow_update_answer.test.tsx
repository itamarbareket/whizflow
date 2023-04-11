import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow with answer updating', () => {
  const answerUpdatingWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'What is your name?',
          inputType: 'text',
        },
      ],
      next: (answers) => ({
        nextStepId: 'step2',
        updatedAnswers: { ...answers, customData: 'Updated answer' },
      }),
    },
    {
      id: 'step2',
      questions: [
        {
          id: 'question2',
          prompt: (answers) => `Custom data: ${answers.customData}`,
          inputType: 'text',
        },
      ],
      next: (answers) => 'done',
    },
  ] as Step[];

  it('updates answers using next function', async () => {
    const { getByLabelText, getByText } = render(
      <WhizFlow workflow={answerUpdatingWorkflow}>
        {({ step, answers, setAnswers, handleNext }) => (
          <div>
            <label htmlFor={step.questions[0].id}>
              {typeof step.questions[0].prompt === 'function'
                ? step.questions[0].prompt(answers)
                : step.questions[0].prompt}
            </label>
            <input
              id={step.questions[0].id}
              type={step.questions[0].inputType}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [step.questions[0].id]: e.target.value,
                })
              }
            />
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    fireEvent.change(getByLabelText('What is your name?'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(getByText('Next'));

    expect(
      screen.getByLabelText('Custom data: Updated answer')
    ).toBeInTheDocument();
  });
});
