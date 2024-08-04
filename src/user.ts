import { homedir } from "os";
import { achievements } from "./achievement";

interface User {
  name: string;
  exp: number;
  unlockedAchevement: string[];
}

export class UserClass {
  userName = homedir();

  user: User = {
    name: this.userName,
    exp: 0,
    unlockedAchevement: [],
  };

  checkAchievements(statistics: Map<string, Map<string, number>>) {
    for (const achievement of achievements) {
      if (
        !this.user.unlockedAchevement.includes(achievement.name) &&
        achievement.condition(statistics)
      ) {
        this.user.exp += achievement.exp;
        console.log("you got", achievement.exp);
        this.user.unlockedAchevement.push(achievement.name);
        console.log("you unlocked", achievement.name);
      }
    }
  }
}
