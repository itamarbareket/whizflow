// src/useWhizFlow.ts
import { useState } from 'react';
export var useWhizFlow = function (workflow, onComplete) {
    var _a = useState(0), currentStep = _a[0], setCurrentStep = _a[1];
    var _b = useState({}), answers = _b[0], setAnswers = _b[1];
    var step = workflow[currentStep];
    var handleNext = function (submitterAnswers) {
        var currAnswers = submitterAnswers !== null && submitterAnswers !== void 0 ? submitterAnswers : answers;
        var result = step.next(currAnswers);
        var nextStepId = typeof result === 'string' ? result : result.nextStepId;
        var updatedAnswers = typeof result !== 'string' && result.updatedAnswers
            ? result.updatedAnswers
            : currAnswers;
        if (nextStepId === 'done') {
            onComplete(updatedAnswers);
        }
        else {
            setAnswers(updatedAnswers);
            var nextStepIndex = workflow.findIndex(function (step) { return step.id === nextStepId; });
            if (nextStepIndex === -1) {
                console.error("Error: Non-existent step \"".concat(nextStepId, "\""));
                return;
            }
            setCurrentStep(nextStepIndex);
        }
    };
    return {
        step: step,
        answers: answers,
        setAnswers: setAnswers,
        handleNext: handleNext,
    };
};
//# sourceMappingURL=useWhizFlow.js.map