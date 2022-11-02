let partySelect = document.querySelector("#party-select");
let electionSelect = document.querySelector("#election-select");

let parties = Object.keys(constants.parties)
    .sort((a, b) => 0.5 - Math.random())
    .map((p) => `<option value="${p}">${p}</p>`)
    .join("");
partySelect.innerHTML = parties;

let elections = constants.levels.map((p) => `<option value=${p}>${p}</p>`).join("");
electionSelect.innerHTML = elections;

const playGame = async () => {
    let raw = await fetch(`./levels/${electionSelect.value}.json`);
    data = await raw.json();

    data.party = partySelect.value;
    localStorage.setItem("campaign-trail", JSON.stringify({ data }));

    window.location = "game.html";
};
