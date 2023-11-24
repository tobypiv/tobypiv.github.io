let constants = {
    states: {
        vic: { name: "vic", seats: 12, displayName: "Victoria" },
        nsw: { name: "nsw", seats: 12, displayName: "New South Wales" },
        act: { name: "act", seats: 2, displayName: "Australian Capital Territory" },
        wa: { name: "wa", seats: 12, displayName: "Western Australia" },
        tas: { name: "tas", seats: 12, displayName: "Tasmania" },
        sa: { name: "sa", seats: 12, displayName: "South Australia" },
        qld: { name: "qld", seats: 12, displayName: "Queensland" },
        nt: { name: "nt", seats: 2, displayName: "Northern Teritory" }
    },
    parties: {
        labor: {
            playable: true,
            name: "labor",
            getColour: (a) => `rgba(222, 43, 52, ${a})`,
            preferences: ["greens", "liberal", "national", "united australia"]
        },
        liberal: {
            playable: true,
            name: "liberal",
            getColour: (a) => `rgba(28, 79, 156, ${a})`,
            preferences: ["national", "labor", "greens", "united australia"]
        },
        greens: {
            playable: true,
            name: "greens",
            getColour: (a) => `rgba(0, 156, 61, ${a})`,
            preferences: ["labor", "liberal", "national", "united australia"]
        },
        national: {
            playable: false,
            name: "national",
            getColour: (a) => `rgba(0, 105, 70, ${a})`,
            preferences: ["liberal", "united australia", "labor", "greens"]
        },
        "united australia": {
            playable: true,
            name: "united australia",
            getColour: (a) => `rgba(254, 237, 1, ${a})`,
            preferences: ["liberal", "national", "labor", "greens"]
        },
        "one nation": {
            playable: false,
            name: "one nation",
            getColour: (a) => `rgba(243, 108, 33, ${a})`,
            preferences: ["liberal", "national", "labor", "greens"]
        },
        other: { playable: false, ame: "other", getColour: (a) => `rgba(218, 218, 218, ${a})`, preferences: null }
    },
    levels: ["2020", "2022"]
};
