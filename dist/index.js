'use strict';

var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var useWhizFlow = function (workflow, onComplete) {
    var _a = react.useState(0), currentStep = _a[0], setCurrentStep = _a[1];
    var _b = react.useState({}), answers = _b[0], setAnswers = _b[1];
    var _c = react.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react.useState([]), trail = _d[0], setTrail = _d[1];
    var step = workflow[currentStep];
    var handlePrev = function () { return __awaiter(void 0, void 0, void 0, function () {
        var prevStep;
        return __generator(this, function (_a) {
            prevStep = trail.pop();
            if (prevStep !== undefined && prevStep >= 0) {
                setTrail(__spreadArray([], trail, true));
                setCurrentStep(prevStep);
            }
            return [2 /*return*/];
        });
    }); };
    var setStep = function (stepId, newTrail, updatedAnswers) { return __awaiter(void 0, void 0, void 0, function () {
        var currAnswers, currTrail, nextStepIndex;
        return __generator(this, function (_a) {
            currAnswers = updatedAnswers !== null && updatedAnswers !== void 0 ? updatedAnswers : answers;
            currTrail = newTrail !== null && newTrail !== void 0 ? newTrail : trail;
            setAnswers(currAnswers);
            nextStepIndex = workflow.findIndex(function (step) { return step.id === stepId; });
            if (nextStepIndex === -1) {
                console.error("Error: Non-existent step \"".concat(stepId, "\""));
                return [2 /*return*/];
            }
            setTrail(currTrail);
            setCurrentStep(nextStepIndex);
            return [2 /*return*/];
        });
    }); };
    var handleNext = function (submitterAnswers) { return __awaiter(void 0, void 0, void 0, function () {
        var currAnswers, result, nextStepId, updatedAnswers, awaitedResult, ex_1, nextStepIndex;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    currAnswers = submitterAnswers !== null && submitterAnswers !== void 0 ? submitterAnswers : answers;
                    result = step.next(currAnswers);
                    nextStepId = '';
                    updatedAnswers = currAnswers;
                    if (!(typeof result === 'string')) return [3 /*break*/, 1];
                    nextStepId = result;
                    updatedAnswers = currAnswers;
                    return [3 /*break*/, 7];
                case 1:
                    if (!(typeof (result === null || result === void 0 ? void 0 : result.then) === 'function')) return [3 /*break*/, 6];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    setLoading(true);
                    return [4 /*yield*/, result];
                case 3:
                    awaitedResult = _c.sent();
                    setLoading(false);
                    if (typeof awaitedResult === 'string') {
                        nextStepId = awaitedResult;
                    }
                    else {
                        nextStepId = awaitedResult.nextStepId;
                        updatedAnswers = (_a = awaitedResult.updatedAnswers) !== null && _a !== void 0 ? _a : currAnswers;
                    }
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _c.sent();
                    console.error("Error: Next step eval failed \"".concat(ex_1, "\""));
                    return [2 /*return*/];
                case 5: return [3 /*break*/, 7];
                case 6:
                    if (result === null || result === void 0 ? void 0 : result.nextStepId) {
                        nextStepId = result.nextStepId;
                        updatedAnswers = (_b = result.updatedAnswers) !== null && _b !== void 0 ? _b : currAnswers;
                    }
                    _c.label = 7;
                case 7:
                    if (nextStepId === 'done') {
                        onComplete(updatedAnswers);
                    }
                    else {
                        setAnswers(updatedAnswers);
                        nextStepIndex = workflow.findIndex(function (step) { return step.id === nextStepId; });
                        if (nextStepIndex === -1) {
                            console.error("Error: Non-existent step \"".concat(nextStepId, "\""));
                            return [2 /*return*/];
                        }
                        setTrail(__spreadArray(__spreadArray([], trail, true), [currentStep], false));
                        setCurrentStep(nextStepIndex);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        step: step,
        trail: trail,
        answers: answers,
        loading: loading,
        setAnswers: setAnswers,
        handleNext: handleNext,
        handlePrev: handlePrev,
        setStep: setStep
    };
};

var WhizFlow = function (_a) {
    var workflow = _a.workflow, questionTypes = _a.questionTypes, children = _a.children, onComplete = _a.onComplete;
    var defaultOnComplete = function () { };
    var _b = useWhizFlow(workflow, onComplete !== null && onComplete !== void 0 ? onComplete : defaultOnComplete), step = _b.step, trail = _b.trail, answers = _b.answers, setAnswers = _b.setAnswers, handleNext = _b.handleNext, handlePrev = _b.handlePrev, setStep = _b.setStep, loading = _b.loading;
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
        trail: trail,
        setAnswers: setAnswers,
        handleNext: handleNext,
        renderQuestion: renderQuestion,
        handlePrev: handlePrev,
        setStep: setStep,
    });
};

module.exports = WhizFlow;
//# sourceMappingURL=index.js.map
