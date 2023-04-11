import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow with answer passing', () => {
  const answerPassingWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'What is your name?',
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
          prompt: (answers) =>
            `Hello, ${answers.question1}! What is your favorite color?`,
          inputType: 'text',
        },
      ],
      next: (answers) => 'done',
    },
  ] as Step[];

  it('passes answers between steps', async () => {
    const { getByLabelText, getByText } = render(
      <WhizFlow workflow={answerPassingWorkflow}>
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
      getByLabelText('Hello, Alice! What is your favorite color?')
    ).toBeInTheDocument();
  });
});
