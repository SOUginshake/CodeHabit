import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { homedir } from "os";
import { diffLines } from "diff";
import { window } from "vscode";

export class LogFile {
  /**
   * ログファイルが存在するか確認し、存在しない場合は新規作成する
   */
  startupLogFile() {
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");

    if (!existsSync(logDirPath)) {
      mkdirSync(logDirPath, { recursive: true });
    }

    const logFilePath = join(logDirPath, "logfile.txt");
    if (!existsSync(logFilePath)) {
      writeFileSync(logFilePath, "", "utf-8");
      window.showInformationMessage("ログファイルを新規作成しました");
    } else {
      window.showInformationMessage("ログファイルは既に存在しています");
    }
  }

  /**
   * ファイル操作をログファイルに書き込む
   * @param event
   */
  wrightLogFile(action: string, filePath: string) {
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    const filePathExtname = extname(filePath);
    if (filePathExtname !== "" && filePathExtname !== ".git") {
      try {
        const creationTime = new Date().toLocaleString();
        /**
         * ログメッセージの作成
         */
        let existsText = readFileSync(logFilePath, "utf-8");
        const logMessage =
          existsText +
          action +
          "," +
          filePath +
          ",1,Time," +
          creationTime +
          ",\n";
        /**
         * 書き込み
         */
        writeFileSync(logFilePath, logMessage);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * ファイルの編集行数を取得し、ログファイルに書き込む
   */
  changeLineCount(previousText: string, currentText: string, filePath: string) {
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    const changes = diffLines(previousText, currentText);
    let changeCount = 0;
    try {
      changes.forEach((change) => {
        if (change.added) {
          console.log("change value", change.value);
          const lines = change.value.split("\n").slice(0, -1).length;
          console.log("lines", lines);
          changeCount += lines;
        }
      });
      if (changeCount > 0) {
        /**
         * ログメッセージの作成
         */
        const existsText = readFileSync(logFilePath, "utf-8");
        const logMessage =
          existsText +
          "ChangeLineCount," +
          filePath +
          "," +
          changeCount +
          ",\n";
        /**
         * 書き込み
         */
        writeFileSync(logFilePath, logMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * VSCodeがフォーカスされた日時を取得し、ログファイルに書き込む
   */
  focusInTime() {
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    try {
      const focusInTime = new Date().toLocaleString();
      /**
       * ログメッセージの作成
       */
      const existsText = readFileSync(logFilePath, "utf-8");
      const logMessage = existsText + "FocusInTime," + focusInTime + ",\n";
      /**
       * 書き込み
       */
      writeFileSync(logFilePath, logMessage);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * フォーカスアウトも作る。
   */
  focusOutTime() {
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    try {
      const focusOutTime = new Date().toLocaleString();
      /**
       * ログメッセージの作成
       */
      const existsText = readFileSync(logFilePath, "utf-8");
      const logMessage = existsText + "FocusOutTime," + focusOutTime + ",\n";
      /**
       * 書き込み
       */
      writeFileSync(logFilePath, logMessage);
    } catch (error) {
      console.error(error);
    }
  }
}
