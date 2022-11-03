let raw = localStorage.getItem("campaign-trail");
if (!raw) window.location = "index.html";
let { data } = JSON.parse(raw);

const calculateResults = () => {
    let results = {};
    Object.keys(data.polls).forEach((stateName) => {
        let seats = {};
        let eliminated = [];

        // let statePoll = Object.assign({}, data.polls[stateName]);
        let statePoll = data.polls[stateName];
        let numberOfSeats = constants.states[stateName].seats;
        let quota = 100 / numberOfSeats;

        const fancyRound = (n) => n; //Math.ceil(n * 100) / 100;

        let iter = 0;
        const iteration = () => {
            Object.keys(statePoll).forEach((party) => {
                if (party === undefined || party === "undefined") console.error("there is a party called undefined! Fix this!");
                else if (!seats[party]) seats[party] = 0;
                if (fancyRound(statePoll[party]) >= fancyRound(quota)) {
                    let addedSeats = Math.floor(fancyRound(statePoll[party]) / fancyRound(quota));
                    seats[party] += addedSeats;
                    statePoll[party] -= quota * addedSeats;
                }
            });
            // did anyone win outright?
            if (quotaReached(seats, numberOfSeats)) return true;

            let lowest = Object.keys(statePoll)
                .filter((p) => !eliminated.includes(p))
                .sort((a, b) => statePoll[a] - statePoll[b])[0];
            if (lowest == undefined || lowest == "undefined") {
                console.error("there is a party called undefined! Fix this!");
                return null;
            }
            eliminated.push(lowest);

            let preference = constants.parties[lowest].preferences.filter((party) => !eliminated.includes(party))[0];
            if (!preference) return console.error("NO PREFERNCE FOUND!!");
            statePoll[preference] += statePoll[lowest];
        };

        while (iter < 50) {
            iteration();
            if (quotaReached(seats, numberOfSeats)) break;
            iter++;
        }

        results[stateName] = seats;
    });

    let r = document.getElementById("results");
    r.innerHTML = Object.keys(results)
        .map((stateName) => `<p>${JSON.stringify(results[stateName])} ${stateName} ${quotaReached(results[stateName], constants.states[stateName].seats)}</p>`)
        .join("");
    //loop through each state
    //can anyone meet the quota?
    //if not, eliminate the lowest
};

const quotaReached = (seats, numberOfSeats) => {
    if (Object.keys(seats)?.length <= 0) return false;

    let result = Object.keys(seats)
        .map((party) => seats[party])
        .reduce((r, v) => r + v);

    return result >= numberOfSeats;
};

calculateResults();
