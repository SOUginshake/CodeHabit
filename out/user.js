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
        unlockedAchevement: [],
    };
    checkAchievements(statistics) {
        for (const achievement of achievement_1.achievements) {
            if (!this.user.unlockedAchevement.includes(achievement.name) &&
                achievement.condition(statistics)) {
                this.user.exp += achievement.exp;
                console.log("you got", achievement.exp);
                this.user.unlockedAchevement.push(achievement.name);
                console.log("you unlocked", achievement.name);
                vscode_1.window.showInformationMessage("unlocked : " + achievement.name + ", exp : " + achievement.exp);
            }
        }
    }
}
exports.UserClass = UserClass;
//# sourceMappingURL=user.js.map