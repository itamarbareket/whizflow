import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow with broken flow', () => {
  const brokenWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'Question 1:',
          inputType: 'text',
        },
      ],
      next: (answers) => 'nonExistentStep',
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

  it('throws an error when next function redirects to a non-existent step', async () => {
    const { getByText } = render(
      <WhizFlow workflow={brokenWorkflow}>
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
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fireEvent.click(getByText('Next'));
    await waitFor(() => expect(errorSpy).toHaveBeenCalled());
    errorSpy.mockRestore();
  });
});
