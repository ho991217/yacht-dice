import styled from "styled-components";

const Container = styled.button<{ disabled: boolean }>`
   background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray : theme.colors.primary};
   color: ${({ theme }) => theme.colors.white};
   font-size: 0.875rem;
   border-radius: 999px;
   padding: 0.5rem 2.25rem;
`;

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
   children?: React.ReactNode;
   onClick?: () => void;
   disabled?: boolean;
}

export function Button({ children, onClick, disabled, ...props }: ButtonProps) {
   return (
      <Container onClick={onClick} disabled={disabled ?? false} {...props}>
         {children}
      </Container>
   );
}
