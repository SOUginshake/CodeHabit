import { homedir } from "os";
import { achievements } from "./achievement";
import { userRanks } from "./user-rank";
import { ViewColumn, window } from "vscode";

interface User {
  name: string;
  exp: number;
  unlockedAchievements: string[];
  userRank: string;
}

export class UserClass {
  userName = homedir();

  user: User = {
    name: this.userName,
    exp: 0,
    unlockedAchievements: [],
    userRank: "baby",
  };

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
    }
    for (const userRank of userRanks) {
      if (userRank.condition(this.user.exp)) {
        this.user.userRank = userRank.rank;
        window.showInformationMessage("Rank up to " + userRank.rank);
      }
    }
  }

  showUserStatus() {
    const panel = window.createWebviewPanel(
      "userStatus",
      "User Status",
      ViewColumn.One,
      {}
    );

    const achievementsList = this.user.unlockedAchievements
      .map((achievement) => "<li>" + achievement + "</li>")
      .join("");

    panel.webview.html = this.getWebviewContent(
      this.user.name,
      this.user.exp,
      achievementsList,
      this.user.userRank
    );
  }

  getWebviewContent(
    userName: string,
    userExp: number,
    achievementsList: string,
    userRank: string
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
        <h3>Unlocked Achievements</h3>
        <ul>${achievementsList}</ul>
    </body>
    </html>`;
  }
}
