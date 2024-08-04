"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievements = void 0;
exports.achievements = [
    /**
     * 作成したソースファイルの総数
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
    {
        name: "Create over 10",
        description: "ソースファイルを10個以上作成した",
        exp: 200,
        condition: (statistics) => {
            let totalCreate = 0;
            const CreateMap = statistics.get("Create");
            CreateMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate >= 10;
        },
    },
    {
        name: "Create over 100",
        description: "ソースファイルを100個以上作成した",
        exp: 500,
        condition: (statistics) => {
            let totalCreate = 0;
            const CreateMap = statistics.get("Create");
            CreateMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate >= 100;
        },
    },
    /**
     * ソースファイルを編集した行数
     */
    {
        name: "First Edit",
        description: "初めてソースファイルを編集した",
        exp: 100,
        condition: (statistics) => {
            let totalEdit = 0;
            const EditMap = statistics.get("ChangeLineCount");
            EditMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit > 0;
        },
    },
    /**
     * デバッグを行った回数
     */
    /**
     * 作成したファイルの種類数
     */
    /**
     * デバッグしたソースファイルの種類数
     */
    /**
     * 総開発日数
     */
    /**
     * 連続開発日数
     */
];
//# sourceMappingURL=achievement.js.map