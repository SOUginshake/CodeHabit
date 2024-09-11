"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRanks = void 0;
exports.userRanks = [
    {
        rank: "Beginner",
        description: "総経験値が100を超えた",
        condition: (userExp) => {
            return userExp > 100;
        },
    },
];
//# sourceMappingURL=user-rank.js.map