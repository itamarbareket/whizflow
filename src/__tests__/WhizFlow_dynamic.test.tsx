import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WhizFlow } from '../WhizFlow';
import { Step } from '../types';

describe('WhizFlow with dynamic prompt', () => {
  const dynamicPromptWorkflow = [
    {
      id: 'step1',
      questions: [
        {
          id: 'question1',
          prompt: (answers) =>
            `Hello, ${answers.name}! What is your favorite color?`,
          inputType: 'text',
        },
      ],
      next: (answers) => 'done',
    },
  ] as Step[];

  it('renders a step with a dynamic prompt', () => {
    const { getByLabelText } = render(
      <WhizFlow workflow={dynamicPromptWorkflow}>
        {({ step, answers, setAnswers, handleNext }) => (
          <div>
            <label htmlFor={step.questions[0].id}>
              {typeof step.questions[0].prompt === 'function'
                ? step.questions[0].prompt({ name: 'Alice' })
                : step.questions[0].prompt}
            </label>
            <input
              id={step.questions[0].id}
              type={step.questions[0].inputType}
            />
            <button onClick={() => handleNext()}>Next</button>
          </div>
        )}
      </WhizFlow>
    );

    expect(
      getByLabelText('Hello, Alice! What is your favorite color?')
    ).toBeInTheDocument();
  });
});
