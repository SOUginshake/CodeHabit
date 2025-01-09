import { debug, commands, ExtensionContext, window, workspace } from "vscode";
import { join } from "path";
import { homedir } from "os";
import { RecentFilesProvider } from "./recent-files-provider";
import { RecordStatistics, Statistics } from "./statistics";
import { LogFile } from "./logfile";
import { UserClass } from "./user";
import { AileWebviewProvider } from "./aileWebviewProvider";

export function activate(context: ExtensionContext) {
  /**
   * ログファイル操作を行うクラスのインスタンスとログファイルの生成
   */
  const logFile = new LogFile();
  logFile.startupLogFile();

  /**
   * TreeViewで最近開いたファイルを表示する
   */
  const recentFilesProvider = new RecentFilesProvider();
  window.registerTreeDataProvider("recentFiles", recentFilesProvider);

  /**
   * TreeView内にあるコマンドの登録
   */
  commands.registerCommand("recentFiles.openFile", (filePath: string) => {
    workspace.openTextDocument(filePath).then((doc) => {
      window.showTextDocument(doc);
    });
  });

  /**
   * ペットの表示
   */
  const aileWebviewProvider = new AileWebviewProvider(context);
  window.registerWebviewViewProvider("aileSidebarView", aileWebviewProvider);

  /**
   * ペットの進化コマンド
   */
  commands.registerCommand("extension.evolveAile", () => {
    const userRank = Number(userClass.user.userRank);
    const aileHTMLRank = aileWebviewProvider.getAileHTMLRank();
    //ユーザーランク(Number)を引数に、evolveAileメソッドを呼び出す
    if (aileHTMLRank < userRank) {
      aileWebviewProvider.evolveAile();
      window.showInformationMessage("進化しました");
    }
  });

  /**
   * 拡張子毎にファイル数・編集行数の統計を取得する
   */
  commands.registerCommand("extension.getStatistics", () => {
    /**
     * 統計データを管理するクラスのインスタンスを生成する
     */
    const statistics = new Statistics();
    const recordStatistics = new RecordStatistics();

    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    try {
      const statisticsData = statistics.getStatistics(logFilePath);
      recordStatistics.wrightStatisticsFile(statisticsData);
      window.showInformationMessage("統計情報を取得しました");
    } catch (error) {
      console.error("getStatisticsCommand!!!\n" + error);
      window.showErrorMessage("統計情報の取得に失敗しました");
    }
  });

  /**
   * ユーザーのステータスを管理するクラスのインスタンスを生成する
   */
  const userClass = new UserClass(context);

  /**
   * ユーザーが実績をどれだけ達成したか確認するコマンド
   */
  commands.registerCommand("extension.checkAchievements", () => {
    const statistics = new Statistics();
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    const statisticsData = statistics.getStatistics(logFilePath);
    userClass.checkAchievements(statisticsData);
  });

  /**
   * アイテムを設置するコマンド
   */
  commands.registerCommand("extension.setItem", async () => {
    const items: string[] = [
      "water",
      "apple",
      "subako",
      "rasberry",
      "tullip",
      "grape",
      "ryuuboku",
      "kirikabu",
      "iwa",
      "oukan",
    ];

    // アイテム群の設定
    let unlockedItems: string[] = [];
    const itemNum = userClass.user.unlockedAchievements.length / 5;
    for (let i = 0; i < itemNum; i++) {
      unlockedItems.push(items[i]);
    }

    // アイテムを選択する
    const leftItem = await window.showQuickPick(unlockedItems, {
      placeHolder: "左側に設置するアイテムを選択してください",
    });
    const rightItem = await window.showQuickPick(unlockedItems, {
      placeHolder: "右側に設置するアイテムを選択してください",
    });
    aileWebviewProvider.setItem(leftItem ?? "none", rightItem ?? "none");
  });

  /**
   * 統計情報・実績達成状況を更新する
   */
  const interval = 5 * 60 * 1000;
  setInterval(() => {
    commands.executeCommand("extension.getStatistics");
    commands.executeCommand("extension.checkAchievements");
  }, interval);

  /**
   * ユーザーのステータスを表示する
   */
  commands.registerCommand("extension.showUserStatus", () => {
    const statistics = new Statistics();
    const logDirPath = join(homedir(), ".config", "codehabit", "logs");
    const logFilePath = join(logDirPath, "logfile.txt");
    const statisticsData = statistics.getStatistics(logFilePath);
    userClass.showUserStatus(statisticsData);
  });

  /**
   * ユーザーのステータスをリセットする
   */
  commands.registerCommand("extension.resetUserStatus", () => {
    userClass.resetUserStatus();
  });

  /**
   * ソースファイルを新規作成した日時と拡張子を取得する
   */
  workspace.onDidCreateFiles((event) => {
    window.showInformationMessage("新しいソースファイルを作成しました");
    const action = "Create";
    const file = event.files[0];
    const filePath = file.fsPath;
    logFile.wrightLogFile(action, filePath);
  });

  /**
   * ソースファイルを開いた日時と拡張子を取得する
   */
  workspace.onDidOpenTextDocument((event) => {
    window.showInformationMessage("ソースファイルを開きました");
    const action = "Open";
    const filePath = event.fileName;
    logFile.wrightLogFile(action, filePath);
    recentFilesProvider.refresh();
  });

  /**
   * 編集前のテキストを保持するMap
   */
  let documentTextMap: Map<string, string> = new Map();

  /**
   * ソースファイルに変更があった瞬間に、その時点のテキストを取得する
   */
  workspace.onDidChangeTextDocument((event) => {
    const text = event.document.getText();
    const filePath = event.document.fileName;
    if (!documentTextMap.has(filePath)) {
      documentTextMap.set(filePath, text);
    }
  });

  /**
   * ソースファイル保存時に編集前後のテキストを比較し、編集行数を取得する
   */
  workspace.onDidSaveTextDocument((event) => {
    window.showInformationMessage("ソースファイルを保存しました");
    const filePath = event.fileName;
    const previousText = documentTextMap.get(filePath);
    const currentText = event.getText();
    const action = "Save";
    logFile.wrightLogFile(action, filePath);
    if (previousText !== undefined) {
      logFile.changeLineCount(previousText, currentText, filePath);
      documentTextMap.delete(filePath);
    }
  });

  /**
   * デバッグ終了した日時を取得する
   */
  debug.onDidTerminateDebugSession(() => {
    window.showInformationMessage("デバッグを終了しました");
    const action = "Debug";
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor) {
      const filePath = activeTextEditor.document.fileName;
      logFile.wrightLogFile(action, filePath);
    } else {
      window.showInformationMessage("アクティブなエディタがありません。");
    }
  });

  /**
   * ウィンドウがフォーカスされた日時を取得する
   */
  // 拡張機能起動時に、focusInを記録する
  logFile.focusInTime();

  // FocusIn,Outのフラグ
  let focusFlag = true;

  window.onDidChangeWindowState((event) => {
    if (event.focused && !focusFlag) {
      window.showInformationMessage("ウィンドウがフォーカスされました");
      logFile.focusInTime();
      focusFlag = true;
    }
    if (!event.focused && focusFlag) {
      window.showInformationMessage("ウィンドウのフォーカスが外れました");
      logFile.focusOutTime();
      focusFlag = false;
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
