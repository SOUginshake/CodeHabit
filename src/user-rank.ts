interface UserRank {
  rank: string;
  description: string;
  condition: (userExp: number) => boolean;
}

export const userRanks: UserRank[] = [
  {
    rank: "Beginner",
    description: "総経験値が100を超えた",
    condition: (userExp) => {
      return userExp > 100;
    },
  },
];
