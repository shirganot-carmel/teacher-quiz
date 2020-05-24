const {
    START_OF_REPROMPT,
    ANSWER_OR_SKIP_QUEST,
    ANSWER_OR_SKIP_LAST_Q_QUEST,
    SKIP_THIS_Q,
    SKIPPED_Q,
    ORDER_Q
} = require('./constStr').quest;

const store = require('./store').getInstance();

const { EndOfOrderedQHandler, EndOfChallengeHandler } = require('./intentHandlers/ChallengeIntentHandlars/Handlers');


let lastQ;

function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}

function createQReprompt(qText, ifLast = false) {
    return `${START_OF_REPROMPT} ${qText}.${ifLast ? ANSWER_OR_SKIP_LAST_Q_QUEST : ANSWER_OR_SKIP_QUEST}`
}

function createQResponse(at, isSkippingQ = false) {
    const [qIndex, _at] = getCurrentQuestIndex(at);

    const { qText } = store.currChall.questions[qIndex];
    const ifLast = at.counter === at.currLastQ
        || (at.counter === at.currLastQ && !Object.values(at.answeredQ).includes(false));

    const reprompt = createQReprompt(qText, ifLast)
    const speechOutput = `${isSkippingQ ? SKIP_THIS_Q : ''} ${at.skipMode ? SKIPPED_Q : ORDER_Q} ${qIndex}. ${reprompt}`;

    return [
        speechOutput,
        reprompt,
        _at
    ]
}

///////////////////
//inner functions//
///////////////////
function getCurrentQuestIndex(at) {
    let qIndex, prevCounter = at.counter;

    if (at.skipMode) {
        const skippedQArr = Object.entries(at.answeredQ)
            .filter(qE => !qE[1])
            .map(q => parseInt(q[0]));

        qIndex = skippedQArr.find(q => q > at.counter) || at.counter;
        at.counter = qIndex;
        if (!at.currLastQ) at.currLastQ = skippedQArr[skippedQArr.length - 1];
    }
    else {
        if (at.numOfQ !== 1 && at.counter < at.numOfQ) at.counter++;
        qIndex = at.counter;
    }

    lastQ = prevCounter === at.currLastQ;

    return [
        qIndex,
        at,
        prevCounter === at.currLastQ
    ];
}


function returnEndSessionHandler(at, handlerInput, sSo = '') {
    if (!lastQ && !at.answeredQ[at.counter] || (at.skipMode && at.counter !== at.currLastQ)) return;

    const isSkippedQ = Object.values(at.answeredQ).includes(false);
    const isLast = at.counter === at.currLastQ;

    //end of ordered q
    if (isLast && isSkippedQ)
        return EndOfOrderedQHandler.handle(handlerInput, sSo);

    //end of challenge
    else if (isLast && !isSkippedQ)
        return EndOfChallengeHandler.handle(handlerInput, sSo);

    else return;
}

module.exports = {
    createStrList,
    createQReprompt,
    createQResponse,
    getCurrentQuestIndex,
    returnEndSessionHandler,
    lastQ
}