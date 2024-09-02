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
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
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
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
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
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
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
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit > 0;
        },
    },
    /**
     * デバッグを行った回数
     */
    {
        name: "First Debug",
        description: "初めてソースファイルをデバッグした",
        exp: 100,
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug > 0;
        },
    },
    /**
     * 作成したファイルの種類数
     */
    {
        name: "3 types of extensions Created",
        description: "3種類以上の拡張子のソースファイルを作成した",
        exp: 100,
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 3;
        },
    },
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