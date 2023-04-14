# WhizFlow
![npm bundle size](https://img.shields.io/bundlephobia/minzip/whizflow)
![npm](https://img.shields.io/npm/dm/whizflow)
![npm](https://img.shields.io/npm/v/whizflow)
![node-current](https://img.shields.io/node/v/whizflow)

WhizFlow is a lightweight, headless and extensible React library for building dynamic multi-step forms or troubleshooting workflows.

## Features

- Headless: Gives you full control over the UI and styling.
- Extensible: Allows custom question types and render implementations.
- Flexible: Easily build complex workflows with conditional branching.
- Agnostic: Use [Formik](https://formik.org/) or any other form/validation library that you want to handle the input.

## Demo

- [Simple Demo](https://codesandbox.io/s/headless-glitter-9nuvrw?file=/src/App.tsx)
- [Formik Demo](https://codesandbox.io/s/priceless-browser-74j8dh?file=/src/workflow.ts)

## Installation

```bash
npm install whizflow
```

or

```bash
yarn add whizflow
```

## Usage

1. Import WhizFlow and required types:

```jsx
import WhizFlow from 'whizflow';
import { Step } from 'whizflow/dist/types';
```

2. Define your workflow:

```jsx
const workflow: Step[] = [
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
        prompt: 'What is your favorite color?',
        inputType: 'text',
      },
    ],
    next: (answers) => 'done',
  },
];
```

3. Define your custom question types (optional):

```jsx
const questionTypes = {
  text: (question, answers, setAnswers) => (
    <div key={question.id}>
      <label htmlFor={question.id}>{question.prompt}</label>
      <input
        id={question.id}
        type="text"
        value={answers[question.id] || ''}
        onChange={(e) =>
          setAnswers({ ...answers, [question.id]: e.target.value })
        }
      />
    </div>
  ),
  // Add more question types and their render functions here
};
```

4. Use the WhizFlow component in your application:

```jsx
const YourComponent = () => {
  return (
    <WhizFlow workflow={workflow} questionTypes={questionTypes}>
      {({ step, answers, setAnswers, handleNext, renderQuestion }) => (
        <div>
          {step.questions.map((question) => renderQuestion(question.id))}
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </WhizFlow>
  );
};

export default YourComponent;
```

## Types

### WhizFlow

`WhizFlow` is the main component for managing the workflow. It accepts the following props:

#### Props

- `workflow` (required): An array of `Step` objects defining the workflow.
- `onComplete` (optional): A callback function to be called when the workflow reaches the `done` step.
- `questionTypes` (optional): An object with keys representing the question type and values as the corresponding render functions.

#### Render Props

- `step`: The current step object.
- `answers`: An object containing the answers for each question in the workflow.
- `loading`: A boolean to mark when `handleNext` is waiting to resolve.
- `setAnswers`: A function to update the `answers` object.
- `handleNext`: A function to handle navigation to the next step in the workflow.
- `handlePrev`: A function to handle navigation to the previous step.
- `renderQuestion`: A function to render the correct question type based on the provided dictionary.

### Step

A `Step` object defines a single step in the workflow and includes the following properties:

- `id`: A unique identifier for the step.
- `questions`: An array of `Question` objects.
- `next`: A function that determines the next step in the workflow based on the current answers. It should return the next step's ID or `done` if the workflow is complete.

### Question

A `Question` object defines a single question within a step and includes the following properties:

- `id`: A unique identifier for the question.
- `prompt`: The question's text.
- `inputType`: The question's input type, which corresponds to the key in the `questionTypes` prop passed to the `WhizFlow` component.

### QuestionTypes

An object with keys representing the question type and values as render functions. The render functions should take the question, answers, and a `setAnswers` function as arguments and return a React element. You can define custom question types and their implementations in the `questionTypes` object.

```tsx
const questionTypes = {
  text: (question, answers, setAnswers) => (
    <div key={question.id}>
      <label htmlFor={question.id}>{question.prompt}</label>
      <input
        id={question.id}
        type="text"
        value={answers[question.id] || ''}
        onChange={(e) =>
          setAnswers({ ...answers, [question.id]: e.target.value })
        }
      />
    </div>
  ),
  // Add more question types and their render functions here
};
```

## API

| Component / Type | Property / Function | Type / Signature | Description |
| -- | -- | --------- | -------------- |
| **WhizFlow** | | | Main component for managing the workflow. |
| | `workflow` | `Step[]` | An array of `Step` objects defining the workflow. (Required) |
| | `onComplete` | `(answers: Answers) => void` |A callback function to be called when the workflow reaches the `done` step. (Optional) |
| | `questionTypes` | `{ [key: string]: QuestionRenderFunction }` | An object with keys representing the question type and values as the corresponding render functions. (Optional) |
| | `step` | `Step` | The current step object. (Render prop) |
| | `loading` | `boolean` | Whether `handleNext` is running asyncly. (Render prop) |
| | `answers` | `Record<string, any>` | An object containing the answers for each question in the workflow. (Render prop) |
| | `setAnswers` | `(updatedAnswers: Record<string, any>) => void` | A function to update the `answers` object. (Render prop) |
| | `handleNext` | `(submitterAnswers?: Record<string, any>) => void` | A function to handle navigation to the next step in the workflow, allows the submitter to update the answers. (Render prop) |
| | `handlePrev` | `() => void` | A function to handle navigation to the previous step in the workflow. (Render prop) |
| | `renderQuestion` | `(questionId: string) => React.ReactNode` | A function to render the correct question type based on the provided dictionary. (Render prop) |
| **Step** | | | An object defining a single step in the workflow. |
| | `id` | `string` | A unique identifier for the step. |
| | `questions` | `Question[]` | An array of `Question` objects. |
| | `next` | `string \| { nextStepId: string; updatedAnswers?: Answers } ֿֿֿ\| Promise<string> \| Promise<{ nextStepId: string; updatedAnswers?: Answers }>` | A function that determines the next step in the workflow based on the current answers. It should return the next step's ID or 'done' if the workflow is complete. |
| | `context?` | `any` | An optional context object for the question to pass (to be used later when rendering). |
| **Question** | | | An object defining a single question within a step. |
| | `id` | `string` | A unique identifier for the question. |
| | `prompt` | `string` | The question's text. |
| | `options` | `Option[]` | An optional option array for multi-select type of questions |
| | `inputType` | `string` | The question's input type, which corresponds to the key in the `questionTypes` prop passed to the `WhizFlow` component. |
| | `context?` | `any` | An optional context object for the question to pass (to be used later when rendering). |
| **Option** | | | Answer option for multi-select type of questions. |
| | `id` | `string` | A unique identifier for the option. |
| | `label` | `string` | The option's text. |
| | `value` | `string` | Value for the option |
| **QuestionTypes** | - | `{ [key: string]: QuestionRenderFunction }` | An object with keys representing the question type and values as the corresponding render functions. (Optional) |
| **QuestionRenderFunction** | - | `(question: Question, answers: Record<string, any>, setAnswers: (updatedAnswers: Record<string, any>) => void) => React.ReactNode` | The render functions should take the question, answers, and a `setAnswers` function as arguments and return a React element. You can define custom question types and their implementations in the `questionTypes` object. |

## License

MIT © [Itamar Bareket](https://github.com/itamarbareket), MobiMatter LTD
