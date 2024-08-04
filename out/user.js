"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const os_1 = require("os");
const achievement_1 = require("./achievement");
const vscode_1 = require("vscode");
class UserClass {
    userName = (0, os_1.homedir)();
    user = {
        name: this.userName,
        exp: 0,
        unlockedAchievements: [],
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
    }
    showUserStatus() {
        const panel = vscode_1.window.createWebviewPanel("userStatus", "User Status", vscode_1.ViewColumn.One, {});
        const achievementsList = this.user.unlockedAchievements
            .map((achievement) => "<li>" + achievement + "</li>")
            .join("");
        panel.webview.html = this.getWebviewContent(this.user.name, this.user.exp, achievementsList);
    }
    getWebviewContent(userName, userExp, achievementsList) {
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
        <h3>TotalExp : ${userExp}</h3>
        <h3>Unlocked Achievements</h3>
        <ul>${achievementsList}</ul>
    </body>
    </html>`;
    }
}
exports.UserClass = UserClass;
//# sourceMappingURL=user.js.map