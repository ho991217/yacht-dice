import React, { useEffect } from "react";
import { theme } from "./styles/theme";
import { ThemeProvider, styled } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { Router } from "./pages/Router";

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: var(--vh);
   max-width: 445px;
   margin: 0 auto;
`;

function App() {
   const setVh = () => {
      document.documentElement.style.setProperty(
         "--vh",
         `${window.innerHeight}px`
      );
   };

   useEffect(() => {
      window.addEventListener("resize", setVh);
      return () => {
         window.removeEventListener("resize", setVh);
      };
   }, []);

   setVh();
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />
         <Container>
            <Router />
         </Container>
      </ThemeProvider>
   );
}

export default App;
