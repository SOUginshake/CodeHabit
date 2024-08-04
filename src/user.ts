import { homedir } from "os";
import { achievements } from "./achievement";
import { ViewColumn, window } from "vscode";

interface User {
  name: string;
  exp: number;
  unlockedAchievements: string[];
}

export class UserClass {
  userName = homedir();

  user: User = {
    name: this.userName,
    exp: 0,
    unlockedAchievements: [],
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
      achievementsList
    );
  }

  getWebviewContent(
    userName: string,
    userExp: number,
    achievementsList: string
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
        <h3>TotalExp : ${userExp}</h3>
        <h3>Unlocked Achievements</h3>
        <ul>${achievementsList}</ul>
    </body>
    </html>`;
  }
}
