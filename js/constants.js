let constants = {
    states: {
        vic: { name: "vic", seats: 12, displayName: "Victoria" },
        nsw: { name: "nsw", seats: 12, displayName: "New South Wales" },
        act: { name: "act", seats: 2, displayName: "Australian Capital Territory" },
        wa: { name: "wa", seats: 12, displayName: "Western Australia" },
        tas: { name: "tas", seats: 12, displayName: "Tasmania" },
        sa: { name: "sa", seats: 12, displayName: "South Australia" },
        qld: { name: "qld", seats: 12, displayName: "Queensland" },
        nt: { name: "nt", seats: 2, displayName: "Northern Teritory" },
    },
    parties: {
        labor: { name: "labor", getColour: (a) => `rgba(222, 43, 52, ${a})` },
        liberal: { name: "liberal", getColour: (a) => `rgba(28, 79, 156, ${a})` },
        greens: { name: "greens", getColour: (a) => `rgba(0, 156, 61, ${a})` },
        national: { name: "national", getColour: (a) => `rgba(0, 105, 70, ${a})` },
        "united australia": { name: "united australia", getColour: (a) => `rgba(254, 237, 1, ${a})` },
    },
    levels: ["2022"],
};
