"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRanks = void 0;
exports.userRanks = [
    {
        rank: "0",
        description: "初期ランク",
        condition: (userExp) => {
            return userExp >= 0;
        },
    },
    {
        rank: "1",
        description: "総経験値が50を超えた",
        condition: (userExp) => {
            return userExp >= 50;
        },
    },
    {
        rank: "2",
        description: "総経験値が200を超えた",
        condition: (userExp) => {
            return userExp >= 200;
        },
    },
    {
        rank: "3",
        description: "総経験値が500を超えた",
        condition: (userExp) => {
            return userExp >= 500;
        },
    },
    {
        rank: "4",
        description: "総経験値が750を超えた",
        condition: (userExp) => {
            return userExp >= 750;
        },
    },
    {
        rank: "5",
        description: "総経験値が1200を超えた",
        condition: (userExp) => {
            return userExp >= 1200;
        },
    },
    {
        rank: "6",
        description: "総経験値が2000を超えた",
        condition: (userExp) => {
            return userExp >= 2000;
        },
    },
];
//# sourceMappingURL=user-rank.js.map