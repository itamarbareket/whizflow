/// <reference types="react" />
export type Answers = Record<string, string>;
export interface Option {
    id: string;
    value: string;
    label: string;
}
export interface Question {
    id: string;
    prompt: string | ((answers: Answers) => string);
    options?: Option[];
    inputType: string;
    context?: any;
}
export interface Step {
    id: string;
    questions: Question[];
    next: (answers: Answers) => string | {
        nextStepId: string;
        updatedAnswers?: Answers;
    };
}
export type QuestionRenderFunction = (question: Question, answers: Record<string, any>, setAnswers: (updatedAnswers: Record<string, any>) => void) => React.ReactNode;
export type QuestionTypes = {
    [key: string]: QuestionRenderFunction;
};
export interface WhizFlowProps {
    workflow: Step[];
    questionTypes?: QuestionTypes;
    onComplete?: (answers: Answers) => void;
    children: (props: {
        step: Step;
        answers: Answers;
        setAnswers: (value: Answers) => void;
        handleNext: (submitterAnswers?: Answers) => void;
        renderQuestion: (questionId: string) => React.ReactNode;
    }) => JSX.Element;
}
//# sourceMappingURL=types.d.ts.map