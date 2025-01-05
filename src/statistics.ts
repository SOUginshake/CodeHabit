import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { homedir } from "os";

export class Statistics {
  /**
   * インスタンス
   */
  private statisticsMap: Map<string, Map<string, number>>;

  /**
   * コンストラクタ
   */
  constructor() {
    this.statisticsMap = new Map<string, Map<string, number>>();
  }

  /**
   * 統計情報を返すメソッド
   * @returns Map<string, Map<string, number>>
   */
  getStatistics(logFilePath: string) {
    const allLogData = readFileSync(logFilePath, "utf-8");
    const lineOfLogData = allLogData.split("\n");
    lineOfLogData.pop();
    /**
     * FocusIn(Out)Timeとその他のログデータに分割する
     */
    const focusInTimeData = lineOfLogData.filter((logData) =>
      logData.includes("FocusInTime")
    );
    const focusOutTimeData = lineOfLogData.filter((logData) =>
      logData.includes("FocusOutTime")
    );

    // FocusInTime,FocusOutTimeを除外
    let filteredLogData = lineOfLogData.filter(
      (logData) => !logData.includes("FocusInTime")
    );
    filteredLogData = filteredLogData.filter(
      (logData) => !logData.includes("FocusOutTime")
    );

    try {
      this.registerStatistics(filteredLogData);
      this.registerFocusStatistics(focusInTimeData, focusOutTimeData);
    } catch (error) {
      console.error("statistics!!!\n" + error);
    }

    const returnMap = this.statisticsMap;

    return returnMap;
  }

  /**
   * ログデータを元に統計情報をMapに登録する
   */
  registerStatistics(filteredLogData: string[]) {
    for (const logEntries of filteredLogData) {
      const logEntriesList = logEntries.split(",");
      const action = logEntriesList[0];
      const unavoidableCount = logEntriesList[2];
      const addCount = parseInt(unavoidableCount, 10);
      if (this.statisticsMap.has(action)) {
        const countMap = this.statisticsMap.get(logEntriesList[0]);
        const ext = extname(logEntriesList[1]);
        if (countMap?.has(ext)) {
          const existsCount = countMap.get(ext);
          countMap.set(ext, existsCount ? existsCount + addCount : 1);
          this.statisticsMap.set(action, countMap);
        } else {
          countMap?.set(ext, addCount);
          this.statisticsMap.set(action, countMap ? countMap : new Map());
        }
      } else {
        const countMap = new Map<string, number>();
        const ext = extname(logEntriesList[1]);
        countMap.set(ext, addCount);
        this.statisticsMap.set(action, countMap);
      }
    }
  }

  /**
   * フォーカス時間を元に統計情報をMapに登録する
   */
  registerFocusStatistics(
    focusInTimeData: string[],
    focusOutTimeData: string[]
  ) {
    let totalDays = 0;

    const focusDatesSet = new Set<Date>();

    for (const focusInLog of focusInTimeData) {
      const focusInDate = new Date(focusInLog.split(",")[1].split(" ")[0]);
      focusDatesSet.add(focusInDate);
    }
    // トータルの日付を取得
    totalDays = focusDatesSet.size;

    // 日付をソートし、連続日数を取得
    let consecutiveDays = 1;
    let maxConsecutiveDays = 1;

    const sortedFocusDates = Array.from(focusDatesSet)
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    for (let i = 1; i < sortedFocusDates.length; i++) {
      const previousDate = sortedFocusDates[i - 1];
      const currentDate = sortedFocusDates[i];
      const diffTime = currentDate.getTime() - previousDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      if (diffDays === 1) {
        consecutiveDays++;
      } else {
        maxConsecutiveDays = Math.max(maxConsecutiveDays, consecutiveDays);
        consecutiveDays = 1;
      }
    }

    maxConsecutiveDays = Math.max(maxConsecutiveDays, consecutiveDays);

    // In,Outの時差からフォーカス時間を取得
    let developTime = 0;
    const inDateList: Date[] = focusInTimeData.map(
      (dateString) => new Date(dateString.split(",")[1])
    );
    const outDateList: Date[] = focusOutTimeData.map(
      (dateString) => new Date(dateString.split(",")[1])
    );
    for (let i = 0; i < outDateList.length; i++) {
      const diffTime = outDateList[i].getTime() - inDateList[i].getTime();
      const diffHours = diffTime / (1000 * 3600);
      developTime += diffHours;
    }

    // 時間の小数点以下を切り捨てる
    developTime = Math.floor(developTime);

    // 開発歴の統計情報をMapに登録

    const totalDaysMap = new Map<string, number>();
    const consecutiveDaysMap = new Map<string, number>();
    const developTimeMap = new Map<string, number>();

    totalDaysMap.set("totalDays", totalDays);
    consecutiveDaysMap.set("consecutiveDays", maxConsecutiveDays);
    developTimeMap.set("developTime", developTime);

    this.statisticsMap.set("TotalDays", totalDaysMap);
    this.statisticsMap.set("ConsecutiveDays", consecutiveDaysMap);
    this.statisticsMap.set("DevelopTime", developTimeMap);
  }
}

/**
 * 統計情報をファイルに書き込むクラス
 */
export class RecordStatistics {
  wrightStatisticsFile(statisticsMap: Map<string, Map<string, number>>) {
    const statisticsDirPath = join(
      homedir(),
      ".config",
      "codehabit",
      "statistics"
    );

    if (!existsSync(statisticsDirPath)) {
      mkdirSync(statisticsDirPath, { recursive: true });
    }

    const statisticsFilePath = join(statisticsDirPath, "statistics-data.txt");
    try {
      let statisticsMessage = "";
      for (const [action, countMap] of statisticsMap) {
        statisticsMessage += action + "\n";
        for (const [ext, count] of countMap) {
          statisticsMessage += "-" + ext + ":" + count + "\n";
        }
      }
      writeFileSync(statisticsFilePath, statisticsMessage);
    } catch (error) {
      console.error(error);
    }
  }
}
