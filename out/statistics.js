"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordStatistics = exports.Statistics = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
class Statistics {
    /**
     * インスタンス
     */
    statisticsMap;
    /**
     * コンストラクタ
     */
    constructor() {
        this.statisticsMap = new Map();
    }
    /**
     * 統計情報を返すメソッド
     * @returns Map<string, Map<string, number>>
     */
    getStatistics(logFilePath) {
        const allLogData = (0, fs_1.readFileSync)(logFilePath, "utf-8");
        const lineOfLogData = allLogData.split("\n");
        lineOfLogData.pop();
        /**
         * FocusTimeとその他のログデータに分割する
         */
        const focusTimeData = lineOfLogData.filter((logData) => logData.includes("FocusTime"));
        const filteredLogData = lineOfLogData.filter((logData) => !logData.includes("FocusTime"));
        try {
            this.registerStatistics(filteredLogData);
            this.registerFocusStatistics(focusTimeData);
        }
        catch (error) {
            console.error("statistics!!!\n" + error);
        }
        const returnMap = this.statisticsMap;
        return returnMap;
    }
    /**
     * ログデータを元に統計情報をMapに登録する
     */
    registerStatistics(filteredLogData) {
        for (const logEntries of filteredLogData) {
            const logEntriesList = logEntries.split(",");
            const action = logEntriesList[0];
            const unavoidableCount = logEntriesList[2];
            const addCount = parseInt(unavoidableCount, 10);
            if (this.statisticsMap.has(action)) {
                const countMap = this.statisticsMap.get(logEntriesList[0]);
                const ext = (0, path_1.extname)(logEntriesList[1]);
                if (countMap?.has(ext)) {
                    const existsCount = countMap.get(ext);
                    countMap.set(ext, existsCount ? existsCount + addCount : 1);
                    this.statisticsMap.set(action, countMap);
                }
                else {
                    countMap?.set(ext, addCount);
                    this.statisticsMap.set(action, countMap ? countMap : new Map());
                }
            }
            else {
                const countMap = new Map();
                const ext = (0, path_1.extname)(logEntriesList[1]);
                countMap.set(ext, addCount);
                this.statisticsMap.set(action, countMap);
            }
        }
    }
    /**
     * フォーカス時間を元に統計情報をMapに登録する
     */
    registerFocusStatistics(focusTimeData) {
        let totalDays = 0;
        let consecutiveDays = 0;
        let maxConsecutiveDays = 0;
        let previousDate = "";
        for (const focusEntries of focusTimeData) {
            const focusEntriesList = focusEntries.split(",");
            const currentDate = focusEntriesList[1];
            if (previousDate === "") {
                totalDays = 1;
                consecutiveDays = 1;
                previousDate = currentDate;
            }
            else {
                if (judgeConsecutive(previousDate, currentDate)) {
                    totalDays++;
                    consecutiveDays++;
                    if (maxConsecutiveDays < consecutiveDays) {
                        maxConsecutiveDays = consecutiveDays;
                    }
                    console.log(totalDays + ":" + maxConsecutiveDays);
                }
                else if (judgeDefferent(previousDate, currentDate)) {
                    totalDays++;
                    consecutiveDays = 1;
                    console.log(totalDays + ":" + maxConsecutiveDays);
                }
                previousDate = currentDate;
            }
        }
        function parseDate(dateStr) {
            const datePart = dateStr.split(" ")[0];
            const returnDate = new Date(datePart);
            return returnDate;
        }
        function judgeDefferent(previousDate, currentDate) {
            const pDate = previousDate.split(" ")[0];
            const cDate = currentDate.split(" ")[0];
            return pDate < cDate;
        }
        function judgeConsecutive(previousDate, currentDate) {
            const pDate = parseDate(previousDate);
            const cDate = parseDate(currentDate);
            const diffTime = cDate.getTime() - pDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            return diffDays === 1;
        }
        // 統計情報をMapに登録
        const countMap = new Map();
        countMap.set("totalDays", totalDays);
        countMap.set("consecutiveDays", maxConsecutiveDays);
        this.statisticsMap.set("FocusTime", countMap);
        // 初期化
        previousDate = "";
    }
}
exports.Statistics = Statistics;
/**
 * 統計情報をファイルに書き込むクラス
 */
class RecordStatistics {
    wrightStatisticsFile(statisticsMap) {
        const statisticsDirPath = (0, path_1.join)((0, os_1.homedir)(), ".config", "codehabit", "statistics");
        if (!(0, fs_1.existsSync)(statisticsDirPath)) {
            (0, fs_1.mkdirSync)(statisticsDirPath, { recursive: true });
        }
        const statisticsFilePath = (0, path_1.join)(statisticsDirPath, "statistics-data.txt");
        try {
            let statisticsMessage = "";
            for (const [action, countMap] of statisticsMap) {
                statisticsMessage += action + "\n";
                for (const [ext, count] of countMap) {
                    statisticsMessage += "-" + ext + ":" + count + "\n";
                }
            }
            (0, fs_1.writeFileSync)(statisticsFilePath, statisticsMessage);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.RecordStatistics = RecordStatistics;
//# sourceMappingURL=statistics.js.map