import { useState } from "react";

export interface Score {
   aces: number;
   dual: number;
   triple: number;
   quad: number;
   penta: number;
   hexa: number;
   choice: number;
   poker: number;
   fullhouse: number;
   s_straight: number;
   l_straight: number;
   yacht: number;
}

export interface Dice {
   id: number;
   eyes: number;
   fix: boolean;
}

export const useDice = () => {
   const [dice, setDice] = useState<Dice[]>([
      { id: 0, eyes: 0, fix: false },
      { id: 1, eyes: 0, fix: false },
      { id: 2, eyes: 0, fix: false },
      { id: 3, eyes: 0, fix: false },
      { id: 4, eyes: 0, fix: false },
   ]);
   const [turn, setTurn] = useState(0);

   const animateDice = (dice: Dice) => {
      setTimeout(() => {
         dice.eyes = Math.floor(Math.random() * 6) + 1;
      }, 100);

      setTimeout(() => {
         dice.eyes = Math.floor(Math.random() * 6) + 1;
      }, 200);

      setTimeout(() => {
         dice.eyes = Math.floor(Math.random() * 6) + 1;
      }, 300);
   };

   /**
    * @description
    * 1. dice의 fix가 false인 것만 뽑아서
    * 2. eyes를 랜덤으로 업데이트한다.
    * 3. dice를 업데이트한다.
    */
   const roll = () => {
      if (turn === 3) {
         return;
      }

      const newDice = dice.map((d) => {
         if (d.fix) return d;
         return { ...d, eyes: Math.floor(Math.random() * 6) + 1 };
      });
      setDice(newDice);
      setTurn(turn + 1);
   };

   /**
    *
    * @param id 1~6
    * @description
    * 1. dice의 id와 매개변수로 받은 id가 같으면
    * 2. dice의 fix를 반전시킨다.
    * 3. dice를 업데이트한다.
    */
   const toggleFix = (id: number) => {
      const newDice = dice.map((d) => {
         if (d.id === id && d.eyes !== 0) return { ...d, fix: !d.fix };
         return d;
      });
      setDice(newDice);
   };

   const initDice = () => {
      const newDice = [
         { id: 0, eyes: 0, fix: false },
         { id: 1, eyes: 0, fix: false },
         { id: 2, eyes: 0, fix: false },
         { id: 3, eyes: 0, fix: false },
         { id: 4, eyes: 0, fix: false },
      ];

      setDice(newDice);
      setTurn(0);
   };

   return { roll, toggleFix, initDice, dice, turn };
};
