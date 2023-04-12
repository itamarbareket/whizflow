/// <reference types="react" />
import { Step, Answers } from './types';
export declare const useWhizFlow: (workflow: Step[], onComplete: (answers: Answers) => void) => {
    step: Step;
    answers: Answers;
    setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>>;
    handleNext: (submitterAnswers?: Answers) => void;
};
//# sourceMappingURL=useWhizFlow.d.ts.map