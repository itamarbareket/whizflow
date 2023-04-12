// src/__tests__/WhizFlow.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { QuestionTypes, Step } from '../types';

// ... other tests

describe('WhizFlow with custom question types', () => {
  const customQuestionWorkflow: Step[] = [
    {
      id: 'step1',
      questions: [
        {
          id: 'customQuestion1',
          prompt: 'What is your favorite fruit?',
          inputType: 'custom',
        },
      ],
      next: (answers) => 'done',
    },
  ];

  const nonExsistentType: Step[] = [
    {
      id: 'step1',
      questions: [
        {
          id: 'customQuestion1',
          prompt: 'What is your favorite fruit?',
          inputType: 'non-existent',
        },
      ],
      next: (answers) => 'done',
    },
  ];

  const customQuestionTypes = {
    custom: (question, answers, setAnswers) => (
      <div key={question.id}>
        <label htmlFor={question.id}>
          {typeof question.prompt === 'string'
            ? question.prompt
            : question.prompt(answers)}
        </label>
        <select
          id={question.id}
          onChange={(e) =>
            setAnswers({ ...answers, [question.id]: e.target.value })
          }
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </select>
      </div>
    ),
  } as QuestionTypes;

  it('renders custom question type', () => {
    const { getByLabelText } = render(
      <WhizFlow
        workflow={customQuestionWorkflow}
        questionTypes={customQuestionTypes}
      >
        {({ step, answers, setAnswers, handleNext, renderQuestion }) => (
          <div>
            {step.questions.map((question) => renderQuestion(question.id))}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(getByLabelText('What is your favorite fruit?')).toBeInTheDocument();
  });

  it('fails on non existent question id', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <WhizFlow
        workflow={customQuestionWorkflow}
        questionTypes={customQuestionTypes}
      >
        {({ step, answers, setAnswers, handleNext, renderQuestion }) => (
          <div>
            {step.questions.map((question) => renderQuestion('non-existent'))}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    await waitFor(() => expect(errorSpy).toHaveBeenCalled());
    errorSpy.mockRestore();
  });

  it('fails on non existent question type', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <WhizFlow workflow={nonExsistentType} questionTypes={customQuestionTypes}>
        {({ step, answers, setAnswers, handleNext, renderQuestion }) => (
          <div>
            {step.questions.map((question) => renderQuestion(question.id))}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    await waitFor(() => expect(errorSpy).toHaveBeenCalled());
    errorSpy.mockRestore();
  });

  it('fails when trying to render something but no types were defined', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <WhizFlow workflow={nonExsistentType}>
        {({ step, answers, setAnswers, handleNext, renderQuestion }) => (
          <div>
            {step.questions.map((question) => renderQuestion(question.id))}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    await waitFor(() => expect(errorSpy).toHaveBeenCalled());
    errorSpy.mockRestore();
  });
});
