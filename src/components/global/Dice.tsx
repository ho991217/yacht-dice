import { styled } from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";

const Container = styled.div<{ eyes: number }>`
   width: 3.125rem;
   height: 3.125rem;
   @keyframes shake {
      0% {
         transform: rotate(0deg);
      }
      25% {
         transform: rotate(10deg);
      }
      50% {
         transform: rotate(0deg);
      }
      75% {
         transform: rotate(-10deg);
      }
      100% {
         transform: rotate(0deg);
      }
   }
   ${({ eyes }) => eyes > 0 && "animation: shake 0.5s ease-in-out;"}
`;

interface DiceProps extends React.HTMLAttributes<HTMLDivElement> {
   eyes: number;
   fixed: boolean;
}

export default function Dice({ eyes, fixed, ...props }: DiceProps) {
   const [idx, setIdx] = useState(0);

   const EYES = [
      null,
      <circle
         cx="25"
         cy="25"
         r="7.5"
         fill={fixed ? theme.colors.gray : theme.colors.primary}
      />,
      <>
         <circle
            cx="16"
            cy="16"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="34"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
      </>,
      <>
         <circle
            cx="16"
            cy="16"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="34"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="25"
            cy="25"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
      </>,
      <>
         <circle
            cx="16"
            cy="16"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="34"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="16"
            cy="34"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="16"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
      </>,
      <>
         <circle
            cx="15"
            cy="15"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="35"
            cy="35"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="15"
            cy="35"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="35"
            cy="15"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="25"
            cy="25"
            r="5"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
      </>,
      <>
         <circle
            cx="16"
            cy="15"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="35"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="16"
            cy="35"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="15"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="16"
            cy="25"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
         <circle
            cx="34"
            cy="25"
            r="4"
            fill={fixed ? theme.colors.gray : theme.colors.primary}
         />
      </>,
   ];

   useEffect(() => {
      if (eyes > 0) {
         const key = setInterval(() => {
            setIdx((idx) => ((idx + 1) % 6) + 1);
         }, 100);
         setTimeout(() => {
            clearInterval(key);
         }, 500);
         setIdx(eyes);
         return () => clearInterval(key);
      }
   }, [eyes]);

   return (
      <Container eyes={eyes} {...props}>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
         >
            <rect
               x="1.5"
               y="1.5"
               width="47"
               height="47"
               rx="3.5"
               fill={
                  eyes === 0
                     ? fixed
                        ? theme.colors.gray
                        : theme.colors.primary
                     : "white"
               }
               stroke={fixed ? theme.colors.gray : theme.colors.primary}
               strokeWidth="3"
            />
            {EYES[idx]}
         </svg>
      </Container>
   );
}
