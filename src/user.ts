import { homedir } from "os";
import { achievements } from "./achievement";
import { window } from "vscode";

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
        console.log("you got", achievement.exp);
        this.user.unlockedAchievements.push(achievement.name);
        console.log("you unlocked", achievement.name);
        window.showInformationMessage(
          "unlocked : " + achievement.name + " exp : " + achievement.exp
        );
      }
    }
  }
}
