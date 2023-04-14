import { useWhizFlow } from './useWhizFlow';
export var WhizFlow = function (_a) {
    var workflow = _a.workflow, questionTypes = _a.questionTypes, children = _a.children, onComplete = _a.onComplete;
    var defaultOnComplete = function () { };
    var _b = useWhizFlow(workflow, onComplete !== null && onComplete !== void 0 ? onComplete : defaultOnComplete), step = _b.step, answers = _b.answers, setAnswers = _b.setAnswers, handleNext = _b.handleNext, handlePrev = _b.handlePrev, loading = _b.loading;
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
    return children({
        step: step,
        answers: answers,
        loading: loading,
        setAnswers: setAnswers,
        handleNext: handleNext,
        renderQuestion: renderQuestion,
        handlePrev: handlePrev,
    });
};
//# sourceMappingURL=WhizFlow.js.map