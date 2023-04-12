import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow with multiple questions per step', () => {
  const multiQuestionWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: 'Question 1:',
          inputType: 'text',
        },
        {
          id: 'question2',
          prompt: 'Question 2:',
          inputType: 'text',
        },
      ],
      next: (answers) => 'done',
    },
  ] as Step[];

  it('renders multiple questions in one step', () => {
    const { getByLabelText } = render(
      <WhizFlow workflow={multiQuestionWorkflow}>
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

    expect(getByLabelText('Question 1:')).toBeInTheDocument();
    expect(getByLabelText('Question 2:')).toBeInTheDocument();
  });
});
