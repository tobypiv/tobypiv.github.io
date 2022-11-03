let raw = localStorage.getItem("campaign-trail");
if (!raw) window.location = "index.html";
let { data } = JSON.parse(raw);

document.querySelector(".partyContainer").innerHTML = `<p>playing as: the ${data.party} party</p><p>${data.description}</p>`;

const update = () => {
    let results = data?.polls;
    if (!results) return console.warn("No polling data found!");
    let svg = document.querySelector("svg");
    if (!svg) return;
    Array.from(svg.children).forEach((path) => {
        let state = path.id;
        let stateResults = results[state];
        if (!results[state]) return console.log(`${state} does not exist`);

        let ranked = Object.keys(stateResults).sort((a, b) => stateResults[b] - stateResults[a]);
        let difference = stateResults[ranked[0]] - stateResults[ranked[1]];
        let lightnessPercentage = difference * 7;
        path.style = `fill: ${constants.parties[ranked[0]].getColour(lightnessPercentage / 100)};`;
    });

    updateStateDataDisplay();
    updateAdviceDisplay();
    updateQuestionDisplay();
};

const selectAnswer = (index) => {
    let answer = currentQuestion.answers[index];
    let partyOutcome = answer.outcome[data.party];
    Object.keys(constants.states).forEach((state) => {
        state = constants.states[state];
        Object.keys(answer.outcome[data.party].default).forEach((party) => {
            let modifier = partyOutcome[state.name]?.[party] != undefined ? partyOutcome[state.name]?.[party] : partyOutcome.default[party];
            let randomness = Math.max(Math.random(), 0.1);

            let change = modifier * randomness;
            // let percentageSwing = modifier * randomness;
            // let change = percentageSwing / (data.polls[state.name][party] + 1);

            data.polls[state.name][party] += change;
            data.polls[state.name][party] = Math.min(Math.max(data.polls[state.name][party], 0), 100); // fit to 100
        });

        let sum = Object.keys(data.polls[state.name])
            .map((party) => data.polls[state.name][party])
            .reduce((r, value) => r + value); // reweight it so it adds to 100
        Object.keys(data.polls[state.name]).forEach((party) => (data.polls[state.name][party] = (data.polls[state.name][party] / sum) * 100));
    });
    currentAdvice = partyOutcome.advice;

    getNextQuestion();
    update();
};

const calculateWinner = () => {};

document.addEventListener("click", (event) => {
    if (!event.target.className?.baseVal) return;
    selectedState = event.target.id;
    update();
});

let previousQuestions = [];
const getNextQuestion = () => {
    if (!data?.questions) return console.warn("No question data found!");
    let filtered = data.questions.filter((q) => !previousQuestions.includes(q));
    if (!filtered.length) return console.log("OUT OF QUESTIONS");
    currentQuestion = filtered[Math.floor(Math.random() * filtered.length)];
    previousQuestions.push(currentQuestion);
};

let currentQuestion = null;
let questionDiv = document.getElementsByClassName("questionContainer")[0];
const updateQuestionDisplay = () => {
    if (!currentQuestion) return console.warn("NO CURRENT QUESTION");
    questionDiv.innerHTML = `<p class="question">${currentQuestion.text}</p>${currentQuestion.answers
        .map((a, i) => `<p class="answer" onclick="selectAnswer(${i})">${a.text}</p>`)
        .join("")}`;
};

let selectedState = null;
let stateDataContainer = document.getElementsByClassName("stateDataContainer")[0];
const updateStateDataDisplay = () => {
    if (!selectedState) return console.warn("NO SELECTED STATE");

    let polls = data.polls[selectedState];
    let displayName = constants.states[selectedState].displayName;
    stateDataContainer.innerHTML = `<p>State: <b>${displayName}</b></p>${Object.keys(polls)
        .map((p) => `<p>${p}: ${Math.round(polls[p] * 100) / 100}<p>`)
        .join("")}`;
};

let currentAdvice = null;
let adviceDataContainer = document.getElementsByClassName("adviceContainer")[0];
const updateAdviceDisplay = () => {
    if (!currentAdvice) return console.warn("NO CURRENT ADVICE");
    adviceDataContainer.innerHTML = `${currentAdvice}`;
};

getNextQuestion();
update();

function endGame() {
    console.log("EEE");
    let v = confirm("Are you sure you want to lose your progress?");
    console.log(v);
    if (v) {
        localStorage.setItem("campaign-trail", "");
        window.location = "/index.html";
    }
}
