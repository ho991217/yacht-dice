export type rankings = {
   [key: string]: number;
};

export enum rankingTypes {
   "aces" = "에이스",
   "duals" = "듀얼",
   "triples" = "트리플",
   "quads" = "쿼드",
   "penta" = "펜타",
   "hexa" = "헥사",
   "choice" = "초이스",
   "poker" = "포커",
   "fullhouse" = "풀하우스",
   "s_straight" = "스몰 스트레이트",
   "l_straight" = "라지 스트레이트",
   "yacht" = "요트",
}
