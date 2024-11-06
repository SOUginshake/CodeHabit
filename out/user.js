"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const os_1 = require("os");
const achievement_1 = require("./achievement");
const user_rank_1 = require("./user-rank");
const vscode_1 = require("vscode");
class UserClass {
    userName = (0, os_1.homedir)();
    context;
    user = {
        name: this.userName,
        exp: 0,
        unlockedAchievements: [],
        userRank: "0",
    };
    constructor(context) {
        this.context = context;
        this.loadUserStatus();
    }
    saveUserStatus() {
        this.context.globalState.update("UserStatus", this.user);
    }
    loadUserStatus() {
        const savedStatus = this.context.globalState.get("UserStatus");
        if (savedStatus) {
            this.user = savedStatus;
        }
    }
    resetUserStatus() {
        this.user = {
            name: this.userName,
            exp: 0,
            unlockedAchievements: [],
            userRank: "0",
        };
        this.saveUserStatus();
    }
    checkAchievements(statistics) {
        for (const achievement of achievement_1.achievements) {
            if (!this.user.unlockedAchievements.includes(achievement.name) &&
                achievement.condition(statistics)) {
                this.user.exp += achievement.exp;
                this.user.unlockedAchievements.push(achievement.name);
                vscode_1.window.showInformationMessage("unlocked : " + achievement.name + " exp : " + achievement.exp);
            }
        }
        for (const userRank of user_rank_1.userRanks) {
            if (!(this.user.userRank === userRank.rank) &&
                userRank.condition(this.user.exp)) {
                this.user.userRank = userRank.rank;
                vscode_1.window.showInformationMessage("Rank up to " + userRank.rank);
            }
        }
        this.saveUserStatus();
    }
    getNextRankExp(userExp) {
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
    showUserStatus(statistics) {
        const panel = vscode_1.window.createWebviewPanel("userStatus", "User Status", vscode_1.ViewColumn.One, {});
        /**
         * 未解放実績のMapを作成
         */
        let lockedAchievementsMap = new Map();
        for (const achievement of achievement_1.achievements) {
            if (!this.user.unlockedAchievements.includes(achievement.name) &&
                !achievement.condition(statistics)) {
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
            .map(([achievementName, [progress, required]]) => `
    <p>${achievementName}</p>
    <div style="display: flex; align-items: center;">
      <span id="currentValue">${progress}</span>
      <progress id="progressBar" value=${progress} max=${required}></progress>
      <span id="maxValue">${required}</span>
    </div>
    `)
            .join("");
        const unlockedAchievementsList = this.user.unlockedAchievements
            .map((achievement) => "<li>" + achievement + "</li>")
            .join("");
        panel.webview.html = this.getWebviewContent(this.user.name, this.user.exp, this.user.userRank, this.getNextRankExp(this.user.exp), lockedAchievementsList, unlockedAchievementsList);
    }
    getWebviewContent(userName, userExp, userRank, nextRankExp, lockedAchievementsList, unlockedAchievementsList) {
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
exports.UserClass = UserClass;
//# sourceMappingURL=user.js.map