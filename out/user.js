"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const os_1 = require("os");
const achievement_1 = require("./achievement");
const user_rank_1 = require("./user-rank");
const vscode_1 = require("vscode");
class UserClass {
    userName = (0, os_1.homedir)();
    user = {
        name: this.userName,
        exp: 0,
        unlockedAchievements: [],
        userRank: "baby",
    };
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
            if (userRank.condition(this.user.exp)) {
                this.user.userRank = userRank.rank;
                vscode_1.window.showInformationMessage("Rank up to " + userRank.rank);
            }
        }
    }
    showUserStatus() {
        const panel = vscode_1.window.createWebviewPanel("userStatus", "User Status", vscode_1.ViewColumn.One, {});
        const achievementsList = this.user.unlockedAchievements
            .map((achievement) => "<li>" + achievement + "</li>")
            .join("");
        panel.webview.html = this.getWebviewContent(this.user.name, this.user.exp, achievementsList, this.user.userRank);
    }
    getWebviewContent(userName, userExp, achievementsList, userRank) {
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
        <h3>Unlocked Achievements</h3>
        <ul>${achievementsList}</ul>
    </body>
    </html>`;
    }
}
exports.UserClass = UserClass;
//# sourceMappingURL=user.js.map