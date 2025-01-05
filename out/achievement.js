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
        exp: 10,
        required: 1,
        progress: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate;
        },
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
        exp: 25,
        required: 10,
        progress: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate;
        },
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
        name: "Create over 25",
        description: "ソースファイルを25個以上作成した",
        exp: 50,
        required: 25,
        progress: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate;
        },
        condition: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate >= 25;
        },
    },
    {
        name: "Create over 50",
        description: "ソースファイルを50個以上作成した",
        exp: 100,
        required: 50,
        progress: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate;
        },
        condition: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate >= 50;
        },
    },
    {
        name: "Create over 100",
        description: "ソースファイルを100個以上作成した",
        exp: 150,
        required: 100,
        progress: (statistics) => {
            let totalCreate = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                totalCreate += value;
            });
            return totalCreate;
        },
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
     * ソースファイルを開いた回数
     */
    {
        name: "First Open",
        description: "初めてソースファイルを開いた",
        exp: 10,
        required: 1,
        progress: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen;
        },
        condition: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen > 0;
        },
    },
    {
        name: "Open over 100",
        description: "ソースファイルを100回以上開いた",
        exp: 25,
        required: 100,
        progress: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen;
        },
        condition: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen > 100;
        },
    },
    {
        name: "Open over 250",
        description: "ソースファイルを250回以上開いた",
        exp: 50,
        required: 250,
        progress: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen;
        },
        condition: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen > 250;
        },
    },
    {
        name: "Open over 500",
        description: "ソースファイルを500回以上開いた",
        exp: 100,
        required: 500,
        progress: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen;
        },
        condition: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen > 500;
        },
    },
    {
        name: "Open over 1000",
        description: "ソースファイルを1000回以上開いた",
        exp: 150,
        required: 1000,
        progress: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen;
        },
        condition: (statistics) => {
            let totalOpen = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                totalOpen += value;
            });
            return totalOpen > 1000;
        },
    },
    /**
     * デバッグを行った回数
     */
    {
        name: "First Debug",
        description: "初めてソースファイルをデバッグした",
        exp: 15,
        required: 1,
        progress: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug;
        },
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug > 0;
        },
    },
    {
        name: "Debug over 50",
        description: "ソースファイルを50回以上デバッグした",
        exp: 30,
        required: 50,
        progress: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug;
        },
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug >= 50;
        },
    },
    {
        name: "Debug over 100",
        description: "ソースファイルを100回以上デバッグした",
        exp: 60,
        required: 100,
        progress: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug;
        },
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug >= 100;
        },
    },
    {
        name: "Debug over 250",
        description: "ソースファイルを250回以上デバッグした",
        exp: 120,
        required: 250,
        progress: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug;
        },
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug >= 250;
        },
    },
    {
        name: "Debug over 500",
        description: "ソースファイルを500回以上デバッグした",
        exp: 150,
        required: 500,
        progress: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug;
        },
        condition: (statistics) => {
            let totalDebug = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                totalDebug += value;
            });
            return totalDebug >= 500;
        },
    },
    /**
     * ソースファイルを編集した行数
     */
    {
        name: "Edit over 100",
        description: "ソースファイルを100行編集した",
        exp: 10,
        required: 100,
        progress: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit;
        },
        condition: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit >= 100;
        },
    },
    {
        name: "Edit over 500",
        description: "ソースファイルを500行編集した",
        exp: 50,
        required: 500,
        progress: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit;
        },
        condition: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit >= 500;
        },
    },
    {
        name: "Edit over 1000",
        description: "ソースファイルを1000行編集した",
        exp: 100,
        required: 1000,
        progress: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit;
        },
        condition: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit >= 1000;
        },
    },
    {
        name: "Edit over 5000",
        description: "ソースファイルを5000行編集した",
        exp: 200,
        required: 5000,
        progress: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit;
        },
        condition: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit >= 5000;
        },
    },
    {
        name: "Edit over 10000",
        description: "ソースファイルを10000行編集した",
        exp: 300,
        required: 10000,
        progress: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit;
        },
        condition: (statistics) => {
            let totalEdit = 0;
            const editMap = statistics.get("ChangeLineCount");
            editMap?.forEach((value) => {
                totalEdit += value;
            });
            return totalEdit >= 10000;
        },
    },
    /**
     * 作成したファイルの種類数
     */
    {
        name: "2 types of extensions Created",
        description: "2種類以上の拡張子のソースファイルを作成した",
        exp: 20,
        required: 2,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 2;
        },
    },
    {
        name: "5 types of extensions Created",
        description: "5種類以上の拡張子のソースファイルを作成した",
        exp: 50,
        required: 5,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 5;
        },
    },
    {
        name: "10 types of extensions Created",
        description: "10種類以上の拡張子のソースファイルを作成した",
        exp: 75,
        required: 10,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 10;
        },
    },
    {
        name: "25 types of extensions Created",
        description: "25種類以上の拡張子のソースファイルを作成した",
        exp: 100,
        required: 25,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 25;
        },
    },
    {
        name: "50 types of extensions Created",
        description: "50種類以上の拡張子のソースファイルを作成した",
        exp: 150,
        required: 50,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const createMap = statistics.get("Create");
            createMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 50;
        },
    },
    /**
     * 開いたファイルの種類数
     */
    {
        name: "2 types of extensions Opened",
        description: "2種類以上の拡張子のソースファイルを開いた",
        exp: 20,
        required: 2,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 2;
        },
    },
    {
        name: "5 types of extensions Opened",
        description: "5種類以上の拡張子のソースファイルを開いた",
        exp: 50,
        required: 5,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 5;
        },
    },
    {
        name: "10 types of extensions Opened",
        description: "10種類以上の拡張子のソースファイルを開いた",
        exp: 75,
        required: 10,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 10;
        },
    },
    {
        name: "25 types of extensions Opened",
        description: "25種類以上の拡張子のソースファイルを開いた",
        exp: 100,
        required: 25,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 25;
        },
    },
    {
        name: "50 types of extensions Opened",
        description: "50種類以上の拡張子のソースファイルを開いた",
        exp: 150,
        required: 50,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const openMap = statistics.get("Open");
            openMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 50;
        },
    },
    /**
     * デバッグしたソースファイルの種類数
     */
    {
        name: "2 types of extensions Debuged",
        description: "2種類以上の拡張子のソースファイルをデバッグした",
        exp: 30,
        required: 2,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Debug");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 2;
        },
    },
    {
        name: "5 types of extensions Debuged",
        description: "5種類以上の拡張子のソースファイルをデバッグした",
        exp: 60,
        required: 5,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 5;
        },
    },
    {
        name: "10 types of extensions Debuged",
        description: "10種類以上の拡張子のソースファイルをデバッグした",
        exp: 120,
        required: 10,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 10;
        },
    },
    {
        name: "25 types of extensions Debuged",
        description: "25種類以上の拡張子のソースファイルをデバッグした",
        exp: 150,
        required: 25,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 25;
        },
    },
    {
        name: "50 types of extensions Debuged",
        description: "50種類以上の拡張子のソースファイルをデバッグした",
        exp: 200,
        required: 50,
        progress: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum;
        },
        condition: (statistics) => {
            let extensionTypesNum = 0;
            const debugMap = statistics.get("Open");
            debugMap?.forEach((value) => {
                if (value > 0) {
                    extensionTypesNum++;
                }
            });
            return extensionTypesNum >= 50;
        },
    },
    /**
     * 総開発日数
     */
    {
        name: "Total Develop Days over 1",
        description: "総開発日数が1日以上",
        exp: 10,
        required: 1,
        progress: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays;
        },
        condition: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays >= 1;
        },
    },
    {
        name: "Total Develop Days over 30",
        description: "総開発日数が30日以上",
        exp: 25,
        required: 30,
        progress: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays;
        },
        condition: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays >= 30;
        },
    },
    {
        name: "Total Develop Days over 100",
        description: "総開発日数が100日以上",
        exp: 50,
        required: 100,
        progress: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays;
        },
        condition: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays >= 100;
        },
    },
    {
        name: "Total Develop Days over 200",
        description: "総開発日数が200日以上",
        exp: 100,
        required: 200,
        progress: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays;
        },
        condition: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays >= 200;
        },
    },
    {
        name: "Total Develop Days over 500",
        description: "総開発日数が500日以上",
        exp: 150,
        required: 500,
        progress: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays;
        },
        condition: (statistics) => {
            let totalDays = 0;
            const totalDaysMap = statistics.get("TotalDays");
            totalDaysMap?.forEach((value) => {
                totalDays += value;
            });
            return totalDays >= 500;
        },
    },
    /**
     * 連続開発日数
     */
    {
        name: "Consecutive Develop Days over 2",
        description: "連続開発日数が2日以上",
        exp: 20,
        required: 2,
        progress: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays;
        },
        condition: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays >= 2;
        },
    },
    {
        name: "Consecutive Develop Days over 7",
        description: "連続開発日数が7日以上",
        exp: 40,
        required: 7,
        progress: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays;
        },
        condition: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays >= 7;
        },
    },
    {
        name: "Consecutive Develop Days over 30",
        description: "連続開発日数が30日以上",
        exp: 80,
        required: 30,
        progress: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays;
        },
        condition: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays >= 30;
        },
    },
    {
        name: "Consecutive Develop Days over 60",
        description: "連続開発日数が60日以上",
        exp: 120,
        required: 60,
        progress: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays;
        },
        condition: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays >= 60;
        },
    },
    {
        name: "Consecutive Develop Days over 100",
        description: "連続開発日数が100日以上",
        exp: 200,
        required: 100,
        progress: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays;
        },
        condition: (statistics) => {
            let consecutiveDays = 0;
            const consecutiveDaysMap = statistics.get("ConsecutiveDays");
            consecutiveDaysMap?.forEach((value) => {
                consecutiveDays += value;
            });
            return consecutiveDays >= 100;
        },
    },
    /**
     * 総開発時間
     */
    {
        name: "Total Develop Time over 1",
        description: "総開発時間が1時間以上",
        exp: 10,
        required: 1,
        progress: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime;
        },
        condition: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime >= 1;
        },
    },
    {
        name: "Total Develop Time over 50",
        description: "総開発時間が50時間以上",
        exp: 25,
        required: 50,
        progress: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime;
        },
        condition: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime >= 50;
        },
    },
    {
        name: "Total Develop Time over 250",
        description: "総開発時間が250時間以上",
        exp: 50,
        required: 250,
        progress: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime;
        },
        condition: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime >= 250;
        },
    },
    {
        name: "Total Develop Time over 500",
        description: "総開発時間が500時間以上",
        exp: 100,
        required: 500,
        progress: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime;
        },
        condition: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime >= 500;
        },
    },
    {
        name: "Total Develop Time over 1000",
        description: "総開発時間が1000時間以上",
        exp: 150,
        required: 1000,
        progress: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime;
        },
        condition: (statistics) => {
            let developTime = 0;
            const developTimeMap = statistics.get("DevelopTime");
            developTimeMap?.forEach((value) => {
                developTime += value;
            });
            return developTime >= 1000;
        },
    },
];
//# sourceMappingURL=achievement.js.map