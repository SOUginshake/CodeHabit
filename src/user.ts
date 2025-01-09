import { homedir } from "os";
import { achievements } from "./achievement";
import { userRanks } from "./user-rank";
import { ViewColumn, window, ExtensionContext } from "vscode";

interface User {
  name: string;
  exp: number;
  unlockedAchievements: string[];
  userRank: string;
}

export class UserClass {
  userName = homedir();

  context: ExtensionContext;

  user: User = {
    name: this.userName,
    exp: 0,
    unlockedAchievements: [],
    userRank: "0",
  };

  constructor(context: ExtensionContext) {
    this.context = context;
    this.loadUserStatus();
  }

  saveUserStatus() {
    this.context.globalState.update("UserStatus", this.user);
  }

  loadUserStatus() {
    const savedStatus = this.context.globalState.get<User>("UserStatus");
    if (savedStatus) {
      this.user = savedStatus;
    }
  }

  //ほぼデバッグ用
  resetUserStatus() {
    this.user = {
      name: this.userName,
      exp: 0,
      unlockedAchievements: [],
      userRank: "0",
    };
    this.saveUserStatus();
  }

  checkAchievements(statistics: Map<string, Map<string, number>>) {
    for (const achievement of achievements) {
      if (
        !this.user.unlockedAchievements.includes(achievement.name) &&
        achievement.condition(statistics)
      ) {
        this.user.exp += achievement.exp;
        this.user.unlockedAchievements.push(achievement.name);
        window.showInformationMessage(
          "unlocked : " + achievement.name + " exp : " + achievement.exp
        );
      }
      if (this.user.unlockedAchievements.length % 5 === 0) {
        window.showInformationMessage("置物が解放されました!(PIボタン)");
      }
    }
    // ランクアップ処理
    const userRankNum = Number(this.user.userRank);
    for (const userRank of userRanks) {
      const checkRankNum = Number(userRank.rank);
      if (userRankNum < checkRankNum && userRank.condition(this.user.exp)) {
        this.user.userRank = userRank.rank;
        window.showInformationMessage(
          "Rank up to " + userRank.rank + "!\nAileが進化可能です!(EAボタン)"
        );
      }
      if (userRankNum === checkRankNum) {
        window.showInformationMessage("YourRank : " + userRank.rank);
      }
    }
    this.saveUserStatus();
  }

  getNextRankExp(userExp: number) {
    const rankExpList = Array(50, 200, 500, 750, 1200, 2000);
    if (userExp >= 2000) {
      return 2000;
    }
    for (const nextRankExp of rankExpList) {
      if (userExp < nextRankExp) {
        return nextRankExp;
      }
    }
  }

  showUserStatus(statistics: Map<string, Map<string, number>>) {
    const panel = window.createWebviewPanel(
      "userStatus",
      "User Status",
      ViewColumn.One,
      {}
    );

    /**
     * 未解放実績のMapを作成
     */
    let lockedAchievementsMap = new Map<string, [number, number]>();
    for (const achievement of achievements) {
      if (
        !this.user.unlockedAchievements.includes(achievement.name) &&
        !achievement.condition(statistics)
      ) {
        lockedAchievementsMap.set(achievement.name, [
          achievement.progress(statistics),
          achievement.required,
        ]);
      }
    }

    /**
     * 未解放実績のプログレスバーを表示するHTMLを作成
     */
    const lockedAchievementsList = Array.from(lockedAchievementsMap.entries())
      .map(
        ([achievementName, [progress, required]]) => `
    <p>${achievementName}</p>
    <div style="display: flex; align-items: center;">
      <span id="currentValue">${progress}</span>
      <progress id="progressBar" value=${progress} max=${required}></progress>
      <span id="maxValue">${required}</span>
    </div>
    `
      )
      .join("");

    const unlockedAchievementsList = this.user.unlockedAchievements
      .map((achievement) => "<li>" + achievement + "</li>")
      .join("");

    panel.webview.html = this.getWebviewContent(
      this.user.name,
      this.user.exp,
      this.user.userRank,
      this.getNextRankExp(this.user.exp),
      lockedAchievementsList,
      unlockedAchievementsList
    );
  }

  getWebviewContent(
    userName: string,
    userExp: number,
    userRank: string,
    nextRankExp: number | undefined,
    lockedAchievementsList: string,
    unlockedAchievementsList: string
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Status</title>
    </head>
    <body>
        <h2>${userName}</h2>
        <h3>Rank : ${userRank}</h3>
        <h3>TotalExp : ${userExp}</h3>
        <p>次のランクまで...</p>
        <div style="display: flex; align-items: center;">
          <span id="currentValue">${userExp}</span>
          <progress id="progressBar" value=${userExp} max=${nextRankExp}></progress>
          <span id="maxValue">${nextRankExp}</span>
        </div>
        <h3>未解放実績</h3>
        ${lockedAchievementsList}
        <h3>解放済み実績</h3>
        <ul>${unlockedAchievementsList}</ul>
    </body>
    </html>`;
  }
}
