interface Achievement {
  name: string;
  description: string;
  exp: number;
  required: number;
  progress: (statistics: Map<string, Map<string, number>>) => number;
  condition: (statistics: Map<string, Map<string, number>>) => boolean;
}

export const achievements: Achievement[] = [
  /**
   * 作成したソースファイルの総数
   */
  {
    name: "First Create",
    description: "初めて新規ソースファイルを作成した",
    exp: 10,
    required: 1,
    progress: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate;
    },
    condition: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate > 0;
    },
  },
  {
    name: "Create over 10",
    description: "ソースファイルを10個以上作成した",
    exp: 25,
    required: 10,
    progress: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate;
    },
    condition: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate >= 10;
    },
  },
  {
    name: "Create over 25",
    description: "ソースファイルを25個以上作成した",
    exp: 50,
    required: 25,
    progress: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate;
    },
    condition: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate >= 25;
    },
  },
  {
    name: "Create over 50",
    description: "ソースファイルを50個以上作成した",
    exp: 100,
    required: 50,
    progress: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate;
    },
    condition: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate >= 50;
    },
  },
  {
    name: "Create over 100",
    description: "ソースファイルを100個以上作成した",
    exp: 150,
    required: 100,
    progress: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate;
    },
    condition: (statistics) => {
      let totalCreate = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        totalCreate += value;
      });
      return totalCreate >= 100;
    },
  },

  /**
   * ソースファイルを開いた回数
   */
  {
    name: "First Open",
    description: "初めてソースファイルを開いた",
    exp: 10,
    required: 1,
    progress: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen;
    },
    condition: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen > 0;
    },
  },
  {
    name: "Open over 100",
    description: "ソースファイルを100回以上開いた",
    exp: 25,
    required: 100,
    progress: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen;
    },
    condition: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen > 100;
    },
  },
  {
    name: "Open over 250",
    description: "ソースファイルを250回以上開いた",
    exp: 50,
    required: 250,
    progress: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen;
    },
    condition: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen > 250;
    },
  },
  {
    name: "Open over 500",
    description: "ソースファイルを500回以上開いた",
    exp: 100,
    required: 500,
    progress: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen;
    },
    condition: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen > 500;
    },
  },
  {
    name: "Open over 1000",
    description: "ソースファイルを1000回以上開いた",
    exp: 150,
    required: 1000,
    progress: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen;
    },
    condition: (statistics) => {
      let totalOpen = 0;
      const openMap = statistics.get("Open");
      openMap?.forEach((value) => {
        totalOpen += value;
      });
      return totalOpen > 1000;
    },
  },

  /**
   * デバッグを行った回数
   */
  {
    name: "First Debug",
    description: "初めてソースファイルをデバッグした",
    exp: 15,
    required: 1,
    progress: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug;
    },
    condition: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug > 0;
    },
  },
  {
    name: "Debug over 50",
    description: "ソースファイルを50回以上デバッグした",
    exp: 30,
    required: 50,
    progress: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug;
    },
    condition: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug >= 50;
    },
  },
  {
    name: "Debug over 100",
    description: "ソースファイルを100回以上デバッグした",
    exp: 60,
    required: 100,
    progress: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug;
    },
    condition: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug >= 100;
    },
  },
  {
    name: "Debug over 250",
    description: "ソースファイルを250回以上デバッグした",
    exp: 120,
    required: 250,
    progress: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug;
    },
    condition: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug >= 250;
    },
  },
  {
    name: "Debug over 500",
    description: "ソースファイルを500回以上デバッグした",
    exp: 150,
    required: 500,
    progress: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug;
    },
    condition: (statistics) => {
      let totalDebug = 0;
      const debugMap = statistics.get("Debug");
      debugMap?.forEach((value) => {
        totalDebug += value;
      });
      return totalDebug >= 500;
    },
  },

  /**
   * ソースファイルを編集した行数
   */
  {
    name: "Edit over 100",
    description: "ソースファイルを100行編集した",
    exp: 10,
    required: 100,
    progress: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit;
    },
    condition: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit >= 100;
    },
  },
  {
    name: "Edit over 500",
    description: "ソースファイルを500行編集した",
    exp: 50,
    required: 500,
    progress: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit;
    },
    condition: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit >= 500;
    },
  },
  {
    name: "Edit over 1000",
    description: "ソースファイルを1000行編集した",
    exp: 100,
    required: 1000,
    progress: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit;
    },
    condition: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit >= 1000;
    },
  },
  {
    name: "Edit over 5000",
    description: "ソースファイルを5000行編集した",
    exp: 200,
    required: 5000,
    progress: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit;
    },
    condition: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit >= 5000;
    },
  },
  {
    name: "Edit over 10000",
    description: "ソースファイルを10000行編集した",
    exp: 300,
    required: 10000,
    progress: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit;
    },
    condition: (statistics) => {
      let totalEdit = 0;
      const editMap = statistics.get("ChangeLineCount");
      editMap?.forEach((value) => {
        totalEdit += value;
      });
      return totalEdit >= 10000;
    },
  },

  /**
   * 作成したファイルの種類数
   */
  {
    name: "3 types of extensions Created",
    description: "3種類以上の拡張子のソースファイルを作成した",
    exp: 100,
    required: 3,
    progress: (statistics) => {
      let extensionTypesNum = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        if (value > 0) {
          extensionTypesNum++;
        }
      });
      return extensionTypesNum;
    },
    condition: (statistics) => {
      let extensionTypesNum = 0;
      const createMap = statistics.get("Create");
      createMap?.forEach((value) => {
        if (value > 0) {
          extensionTypesNum++;
        }
      });
      return extensionTypesNum >= 3;
    },
  },

  /**
   * 開いたファイルの種類数
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

  /**
   * 総開発時間
   */
];
