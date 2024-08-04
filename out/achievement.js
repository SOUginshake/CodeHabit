"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievements = void 0;
exports.achievements = [
    /**
     * 新規作成したソースファイルの総数
     */
    {
        name: "First Create",
        description: "初めて新規ソースファイルを作成した",
        exp: 100,
        condition: (statistics) => {
            let totalCreate = 0;
            const CreateMap = statistics.get("Create");
            CreateMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate > 0;
        },
    },
];
//# sourceMappingURL=achievement.js.map