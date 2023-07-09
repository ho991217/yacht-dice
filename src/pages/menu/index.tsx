import { styled } from "styled-components";
import { Button } from "../../components/global/Button";
import { Link } from "react-router-dom";

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

export default function Menu() {
   return (
      <Container>
         <h1>Menu</h1>
         <Button>
            <Link to="/single">싱글 플레이</Link>
         </Button>
      </Container>
   );
}
