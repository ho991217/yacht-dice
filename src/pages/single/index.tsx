import { styled } from "styled-components";
import { Button } from "../../components/global/Button";
import Dice from "../../components/global/Dice";
import { useDice } from "../../hooks/useDice";
import { usePoint } from "../../hooks/usePoint";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";

import DiceIconV1 from "../../assets/images/value-1.svg";
import DiceIconV2 from "../../assets/images/value-2.svg";
import DiceIconV3 from "../../assets/images/value-3.svg";
import DiceIconV4 from "../../assets/images/value-4.svg";
import DiceIconV5 from "../../assets/images/value-5.svg";
import DiceIconV6 from "../../assets/images/value-6.svg";

import Choice from "../../assets/images/choice.svg";
import Poker from "../../assets/images/poker.svg";
import Fullhouse from "../../assets/images/fullhouse.svg";
import S_Straight from "../../assets/images/s_straight.svg";
import L_Straight from "../../assets/images/l_straight.svg";
import Yacht from "../../assets/images/yacht.svg";

const diceIcons = [
   DiceIconV1,
   DiceIconV2,
   DiceIconV3,
   DiceIconV4,
   DiceIconV5,
   DiceIconV6,
];

const rankingIcons = [Choice, Poker, Fullhouse, S_Straight, L_Straight, Yacht];

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
   padding: 20px 8px;
`;

const DiceWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   margin-bottom: 1rem;
`;

const Table = styled.table`
   width: 100%;
   border-collapse: collapse;
   margin-bottom: 1rem;
   border: 1px solid #000;
`;

const Row = styled.tr<{ used?: string }>`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   border-bottom: 1px solid #000;
   height: 35px;
   background: ${({ used }) => (used === "true" ? theme.colors.gray : "white")};
`;

const Label = styled.td`
   width: 200px;
   padding-left: 8px;
   border-right: 1px solid #000;
   display: flex;
   align-items: center;
   gap: 8px;
`;

const Value = styled.td`
   width: 100%;
   text-align: center;
`;

const Used = styled.td`
   width: 100%;
   text-align: center;
`;

const Total = styled.tfoot`
   height: 45px;
`;

const Modal = styled.dialog`
   background: white;
   border-radius: 8px;
`;

export default function Single() {
   const { dice, roll, toggleFix, turn, initDice } = useDice();
   const { point, isAllUsed, score, getPoint, use } = usePoint();
   const [pointSum, setPointSum] = useState({ upper: 0, total: 0, bonus: 0 });

   useEffect(() => {
      score(dice);
      setPointSum(getPoint());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dice]);

   const handleUse = (key: string) => {
      if (turn === 0) return;
      use(key);
      initDice();
   };

   const parseRankings = (rankings: string) => {
      switch (rankings) {
         case "aces":
            return "에이스";
         case "dual":
            return "듀얼";
         case "triple":
            return "트리플";
         case "quad":
            return "쿼드";
         case "penta":
            return "펜타";
         case "hexa":
            return "헥사";
         case "choice":
            return "초이스";
         case "poker":
            return "포커";
         case "fullhouse":
            return "풀하우스";
         case "s_straight":
            return "S-스트레이트";
         case "l_straight":
            return "L-스트레이트";
         case "yacht":
            return "야추";
         default:
            return "";
      }
   };

   return (
      <>
         <Modal open={isAllUsed}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
               }}
            >
               <h1>게임 종료</h1>
               <div>총 점수: {pointSum.total}</div>
               <Button>
                  <a href="/single">다시하기</a>
               </Button>
            </div>
         </Modal>
         <Container>
            <Table>
               <tbody>
                  {Object.entries(point.upper).map(
                     ([key, { used, value }], idx) => (
                        <Row
                           used={used.toString()}
                           key={key}
                           onClick={() => {
                              if (used) return;
                              handleUse(key);
                           }}
                        >
                           <Label>
                              {<img src={diceIcons[idx]} alt={`dice${idx}`} />}
                              {parseRankings(key)}
                           </Label>
                           {used ? (
                              <Used>{value}</Used>
                           ) : (
                              <Value>{value}</Value>
                           )}
                        </Row>
                     )
                  )}
               </tbody>
               <Total>
                  <Row
                     style={{
                        height: 45,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.white,
                     }}
                  >
                     <Label
                        style={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center",
                           padding: "4px 0 0 0",
                           height: "100%",
                           gap: "4px",
                        }}
                     >
                        <span
                           style={{
                              fontSize: "0.7rem",
                           }}
                        >
                           상단 점수 합 63점 이상
                        </span>
                        <span
                           style={{
                              fontSize: "0.9rem",
                           }}
                        >
                           상단 보너스 +35점
                        </span>
                     </Label>
                     <Value>
                        {pointSum.upper}
                        {pointSum.bonus === 35 && `+ ${pointSum.bonus}`}
                     </Value>
                  </Row>
               </Total>
            </Table>
            <Table>
               <tbody>
                  {Object.entries(point.lower).map(
                     ([key, { used, value }], idx) => (
                        <Row
                           used={used.toString()}
                           key={key}
                           onClick={() => {
                              if (used) return;
                              handleUse(key);
                           }}
                        >
                           <Label>
                              <img src={rankingIcons[idx]} alt="dice" />
                              {parseRankings(key)}
                           </Label>
                           {used ? (
                              <Used>{value}</Used>
                           ) : (
                              <Value>{value}</Value>
                           )}
                        </Row>
                     )
                  )}
               </tbody>
               <Total>
                  <Row
                     style={{
                        height: 45,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.white,
                     }}
                  >
                     <Label
                        style={{
                           padding: 0,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        총점
                     </Label>
                     <Value>{pointSum.total}</Value>
                  </Row>
               </Total>
            </Table>

            <DiceWrapper>
               {dice.map((d) => (
                  <Dice
                     key={d.id}
                     eyes={d.eyes}
                     color={theme.colors.primary}
                     onClick={() => {
                        toggleFix(d.id);
                     }}
                     fixed={d.fix}
                  />
               ))}
            </DiceWrapper>
            <Button onClick={roll} disabled={turn === 3 || isAllUsed}>
               주사위 굴리기
            </Button>
         </Container>
      </>
   );
}
