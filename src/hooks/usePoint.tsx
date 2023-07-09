import { useState } from "react";
import { Dice, Score } from "./useDice";

interface Point {
   value: number;
   used: boolean;
}

export interface IPoint {
   upper: {
      aces: Point;
      dual: Point;
      triple: Point;
      quad: Point;
      penta: Point;
      hexa: Point;
   };
   lower: {
      choice: Point;
      poker: Point;
      fullhouse: Point;
      s_straight: Point;
      l_straight: Point;
      yacht: Point;
   };
   bonus: number;
   total: number;
}

export const usePoint = () => {
   const [point, setPoint] = useState<IPoint>({
      upper: {
         aces: { value: 0, used: false },
         dual: { value: 0, used: false },
         triple: { value: 0, used: false },
         quad: { value: 0, used: false },
         penta: { value: 0, used: false },
         hexa: { value: 0, used: false },
      },
      lower: {
         choice: { value: 0, used: false },
         poker: { value: 0, used: false },
         fullhouse: { value: 0, used: false },
         s_straight: { value: 0, used: false },
         l_straight: { value: 0, used: false },
         yacht: { value: 0, used: false },
      },
      bonus: 0,
      total: 0,
   });

   /**
    *
    * @param score Score
    * @description
    * 1. point를 복사한다.
    * 2. upper와 lower를 복사한다.
    * 3. upper의 각각의 점수를 업데이트한다.
    * 4. lower의 각각의 점수를 업데이트한다.
    * 5. total을 업데이트한다.
    * 6. point를 업데이트한다.
    */
   const updatePoint = (score: Score) => {
      const newPoint = { ...point };
      const upper = { ...point.upper };
      const lower = { ...point.lower };

      if (!upper.aces.used) upper.aces.value = score.aces;
      if (!upper.dual.used) upper.dual.value = score.dual;
      if (!upper.triple.used) upper.triple.value = score.triple;
      if (!upper.quad.used) upper.quad.value = score.quad;
      if (!upper.penta.used) upper.penta.value = score.penta;
      if (!upper.hexa.used) upper.hexa.value = score.hexa;

      if (!lower.choice.used) lower.choice.value = score.choice;
      if (!lower.poker.used) lower.poker.value = score.poker;
      if (!lower.fullhouse.used) lower.fullhouse.value = score.fullhouse;
      if (!lower.s_straight.used) lower.s_straight.value = score.s_straight;
      if (!lower.l_straight.used) lower.l_straight.value = score.l_straight;
      if (!lower.yacht.used) lower.yacht.value = score.yacht;

      newPoint.upper = upper;
      newPoint.lower = lower;
      const bonus =
         upper.aces.value +
            upper.dual.value +
            upper.triple.value +
            upper.quad.value +
            upper.penta.value +
            upper.hexa.value >=
         63
            ? 35
            : 0;

      newPoint.bonus = bonus;
      newPoint.total =
         upper.aces.value +
         upper.dual.value +
         upper.triple.value +
         upper.quad.value +
         upper.penta.value +
         upper.hexa.value +
         bonus +
         lower.choice.value +
         lower.poker.value +
         lower.fullhouse.value +
         lower.s_straight.value +
         lower.l_straight.value +
         lower.yacht.value;

      setPoint(newPoint);
   };

   /**
    * @returns Score
    * @description
    * 점수를 계산한다.
    */
   const score = (dice: Dice[]) => {
      const total = dice.reduce((acc, cur) => acc + cur.eyes, 0);
      const m = new Map();
      dice.forEach((d) => {
         if (m.has(d.eyes)) m.set(d.eyes, m.get(d.eyes) + 1);
         else m.set(d.eyes, 1);
      });

      const aces = dice.filter((d) => d.eyes === 1).length * 1;
      const dual = dice.filter((d) => d.eyes === 2).length * 2;
      const triple = dice.filter((d) => d.eyes === 3).length * 3;
      const quad = dice.filter((d) => d.eyes === 4).length * 4;
      const penta = dice.filter((d) => d.eyes === 5).length * 5;
      const hexa = dice.filter((d) => d.eyes === 6).length * 6;
      const choice = total;
      const poker = (() => {
         for (let v of m.values()) {
            if (v === 4) return total;
         }
         return 0;
      })();

      const fullhouse = (() => {
         for (let v of m.values()) {
            if (v === 3) {
               for (let v of m.values()) {
                  if (v === 2) return 25;
               }
            }
         }
         return 0;
      })();

      const s_straight = (() => {
         const s = new Set(dice.map((d) => d.eyes));
         if (s.size === 4) {
            if (s.has(1) && s.has(2) && s.has(3) && s.has(4)) return 15;
            if (s.has(2) && s.has(3) && s.has(4) && s.has(5)) return 15;
            if (s.has(3) && s.has(4) && s.has(5) && s.has(6)) return 15;
         }
         return 0;
      })();

      const l_straight = (() => {
         const s = dice.map((d) => d.eyes);
         s.sort();
         for (let i = 0; i < s.length - 1; i++) {
            if (s[i] + 1 !== s[i + 1]) return 0;
         }
         return 30;
      })();

      const yacht = dice.every((d) => d.eyes === dice[0].eyes && d.eyes !== 0)
         ? 50
         : 0;

      updatePoint({
         aces,
         dual,
         triple,
         quad,
         penta,
         hexa,
         choice,
         poker,
         fullhouse,
         s_straight,
         l_straight,
         yacht,
      });
   };

   const getPoint = () => {
      const upper = Object.values(point.upper)
         .filter((v) => v.used)
         .reduce((acc, cur) => acc + cur.value, 0);

      const lower = Object.values(point.lower)
         .filter((v) => v.used)
         .reduce((acc, cur) => acc + cur.value, 0);
      return {
         upper,
         total: upper + lower + point.bonus,
         bonus: point.bonus,
      };
   };

   const isAllUsed = (() => {
      const upper = Object.values(point.upper).every((v) => v.used);
      const lower = Object.values(point.lower).every((v) => v.used);
      return upper && lower;
   })();

   const use = (type: string) => {
      const newPoint = { ...point };
      const upper = { ...point.upper };
      const lower = { ...point.lower };

      switch (type) {
         case "aces":
            upper.aces.used = true;
            break;
         case "dual":
            upper.dual.used = true;
            break;
         case "triple":
            upper.triple.used = true;
            break;
         case "quad":
            upper.quad.used = true;
            break;
         case "penta":
            upper.penta.used = true;
            break;
         case "hexa":
            upper.hexa.used = true;
            break;
         case "choice":
            lower.choice.used = true;
            break;
         case "poker":
            lower.poker.used = true;
            break;
         case "fullhouse":
            lower.fullhouse.used = true;
            break;
         case "s_straight":
            lower.s_straight.used = true;
            break;
         case "l_straight":
            lower.l_straight.used = true;
            break;
         case "yacht":
            lower.yacht.used = true;
            break;
         default:
            break;
      }

      newPoint.upper = upper;
      newPoint.lower = lower;
      nextRound();
   };

   const nextRound = () => {
      if (isAllUsed) {
         // 게임 종료 로직
         return;
      }

      const newPoint = { ...point };
      const upper = { ...point.upper } as unknown as any;
      const lower = { ...point.lower } as unknown as any;

      for (let key in upper) {
         if (!upper[key].used) upper[key].value = 0;
      }

      for (let key in lower) {
         if (!lower[key].used) lower[key].value = 0;
      }

      newPoint.upper = upper;
      newPoint.lower = lower;
      setPoint(newPoint);
   };

   return { point, isAllUsed, score, nextRound, getPoint, use };
};
