'use strict';

var react = require('react');

// src/useWhizFlow.ts
var useWhizFlow = function (workflow, onComplete) {
    var _a = react.useState(0), currentStep = _a[0], setCurrentStep = _a[1];
    var _b = react.useState({}), answers = _b[0], setAnswers = _b[1];
    var step = workflow[currentStep];
    var handleNext = function () {
        var result = step.next(answers);
        var nextStepId = typeof result === 'string' ? result : result.nextStepId;
        var updatedAnswers = typeof result !== 'string' && result.updatedAnswers
            ? result.updatedAnswers
            : answers;
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

var WhizFlow = function (_a) {
    var workflow = _a.workflow, questionTypes = _a.questionTypes, children = _a.children, onComplete = _a.onComplete;
    var defaultOnComplete = function () { };
    var _b = useWhizFlow(workflow, onComplete !== null && onComplete !== void 0 ? onComplete : defaultOnComplete), step = _b.step, answers = _b.answers, setAnswers = _b.setAnswers, handleNext = _b.handleNext;
    var renderQuestion = function (questionId) {
        var question = step.questions.find(function (q) { return q.id === questionId; });
        if (!question) {
            console.error("Question with ID \"".concat(questionId, "\" not found."));
            return null;
        }
        if (!questionTypes) {
            console.error("No question types defined.");
            return null;
        }
        var renderFunc = questionTypes[question.inputType];
        if (!renderFunc) {
            console.error("Question type \"".concat(question.inputType, "\" not found in the provided questionTypes."));
            return null;
        }
        return renderFunc(question, answers, setAnswers);
    };
    return children({ step: step, answers: answers, setAnswers: setAnswers, handleNext: handleNext, renderQuestion: renderQuestion });
};

module.exports = WhizFlow;
//# sourceMappingURL=index.js.map
