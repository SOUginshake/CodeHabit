"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const diff_1 = require("diff");
const vscode_1 = require("vscode");
class LogFile {
    /**
     * ログファイルが存在するか確認し、存在しない場合は新規作成する
     */
    startupLogFile() {
        const logDirPath = (0, path_1.join)((0, os_1.homedir)(), ".config", "codehabit", "logs");
        if (!(0, fs_1.existsSync)(logDirPath)) {
            (0, fs_1.mkdirSync)(logDirPath, { recursive: true });
        }
        const logFilePath = (0, path_1.join)(logDirPath, "logfile.txt");
        if (!(0, fs_1.existsSync)(logFilePath)) {
            (0, fs_1.writeFileSync)(logFilePath, "", "utf-8");
            vscode_1.window.showInformationMessage("ログファイルを新規作成しました");
        }
        else {
            vscode_1.window.showInformationMessage("ログファイルは既に存在しています");
        }
    }
    /**
     * ファイル操作をログファイルに書き込む
     * @param event
     */
    wrightLogFile(action, filePath) {
        const logDirPath = (0, path_1.join)((0, os_1.homedir)(), ".config", "codehabit", "logs");
        const logFilePath = (0, path_1.join)(logDirPath, "logfile.txt");
        const filePathExtname = (0, path_1.extname)(filePath);
        if (filePathExtname !== "" && filePathExtname !== ".git") {
            try {
                const creationTime = new Date().toLocaleString();
                /**
                 * ログメッセージの作成
                 */
                let existsText = (0, fs_1.readFileSync)(logFilePath, "utf-8");
                const logMessage = existsText +
                    action +
                    "," +
                    filePath +
                    ",1,Time," +
                    creationTime +
                    ",\n";
                /**
                 * 書き込み
                 */
                (0, fs_1.writeFileSync)(logFilePath, logMessage);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    /**
     * ファイルの編集行数を取得し、ログファイルに書き込む
     * カウントがなんか違うの気になる！余裕あったら直す！7/2
     */
    changeLineCount(previousText, currentText, filePath) {
        const logDirPath = (0, path_1.join)((0, os_1.homedir)(), ".config", "codehabit", "logs");
        const logFilePath = (0, path_1.join)(logDirPath, "logfile.txt");
        const changes = (0, diff_1.diffLines)(previousText, currentText);
        let changeCount = 0;
        try {
            changes.forEach((change) => {
                if (change.added) {
                    //console.log("change value", change.value);
                    const lines = change.value.split("\n").slice(0, -1).length;
                    //console.log("lines", lines);
                    changeCount += lines;
                }
            });
            /**
             * ログメッセージの作成
             */
            const existsText = (0, fs_1.readFileSync)(logFilePath, "utf-8");
            const logMessage = existsText + "ChangeLineCount," + filePath + "," + changeCount + ",\n";
            //console.log("ChangeLineCount", changeCount);
            /**
             * 書き込み
             */
            (0, fs_1.writeFileSync)(logFilePath, logMessage);
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * VSCodeがフォーカスされた日時を取得し、ログファイルに書き込む
     */
    focusTime() {
        const logDirPath = (0, path_1.join)((0, os_1.homedir)(), ".config", "codehabit", "logs");
        const logFilePath = (0, path_1.join)(logDirPath, "logfile.txt");
        try {
            const focusTime = new Date().toLocaleString();
            /**
             * ログメッセージの作成
             */
            const existsText = (0, fs_1.readFileSync)(logFilePath, "utf-8");
            const logMessage = existsText + "FocusInTime," + focusTime + ",\n";
            /**
             * 書き込み
             */
            (0, fs_1.writeFileSync)(logFilePath, logMessage);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.LogFile = LogFile;
//# sourceMappingURL=logfile.js.map