import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const delayFail = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(reject, ms));

describe('WhizFlow with async next eval', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      next: async (answers) => {
        await delay(1000);
        return 'step2';
      },
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

  it('should load between steps', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <WhizFlow workflow={answerPassingWorkflow}>
        {({ step, answers, setAnswers, handleNext, loading }) => (
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
            {loading && <p>Loading...</p>}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(queryByText('Loading...')).toBe(null);
    fireEvent.change(getByLabelText('What is your name?'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(getByText('Next'));

    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(queryByText('Loading...')).toBe(null), {
      timeout: 5000,
    });

    expect(
      getByLabelText('Hello, Alice! What is your favorite color?')
    ).toBeInTheDocument();
  });

  const answerChangingWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'What is your name?',
          inputType: 'text',
        },
      ],
      next: async (answers) => {
        await delay(1000);
        return {
          nextStepId: 'step2',
          updatedAnswers: { ...answers, question1: 'Bob' },
        };
      },
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

  it('should load between steps', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <WhizFlow workflow={answerChangingWorkflow}>
        {({ step, answers, setAnswers, handleNext, loading }) => (
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
            {loading && <p>Loading...</p>}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(queryByText('Loading...')).toBe(null);
    fireEvent.change(getByLabelText('What is your name?'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(getByText('Next'));

    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(queryByText('Loading...')).toBe(null), {
      timeout: 5000,
    });

    expect(
      getByLabelText('Hello, Bob! What is your favorite color?')
    ).toBeInTheDocument();
  });

  const errorEmittingWorflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'What is your name?',
          inputType: 'text',
        },
      ],
      next: async (answers) => {
        await delayFail(1000);
        return {
          nextStepId: 'step2',
          updatedAnswers: { ...answers, question1: 'Bob' },
        };
      },
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

  it('should load between steps', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <WhizFlow workflow={errorEmittingWorflow}>
        {({ step, answers, setAnswers, handleNext, loading }) => (
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
            {loading && <p>Loading...</p>}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(queryByText('Loading...')).toBe(null);
    fireEvent.change(getByLabelText('What is your name?'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(getByText('Next'));

    expect(getByText('Loading...')).toBeInTheDocument();
    fireEvent.click(getByText('Next'));
    await waitFor(() => expect(errorSpy).toHaveBeenCalled(), { timeout: 5000 });
    errorSpy.mockRestore();
  });
});
