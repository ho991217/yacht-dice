import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 4rem;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export default function Nav() {
   return (
      <Container>
         <ul>
            <li>
               <Link to="/">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="36"
                     viewBox="0 -960 960 960"
                     width="36"
                  >
                     <path
                        d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"
                        fill={theme.colors.primary}
                     />
                  </svg>
               </Link>
            </li>
         </ul>
      </Container>
   );
}
