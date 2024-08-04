interface Achievement {
  name: string;
  description: string;
  exp: number;
  condition: (statistics: Map<string, Map<string, number>>) => boolean;
}

export const achievements: Achievement[] = [
  /**
   * 作成したソースファイルの総数
   */
  {
    name: "First Create",
    description: "初めて新規ソースファイルを作成した",
    exp: 100,
    condition: (statistics) => {
      let totalCreate = 0;
      const CreateMap = statistics.get("Create");
      CreateMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate > 0;
    },
  },
  /**
   * ソースファイルを編集した行数
   */

  /**
   * デバッグを行った回数
   */

  /**
   * 作成したファイルの種類数
   */

  /**
   * デバッグしたソースファイルの種類数
   */

  /**
   * 総開発日数
   */

  /**
   * 連続開発日数
   */
];
