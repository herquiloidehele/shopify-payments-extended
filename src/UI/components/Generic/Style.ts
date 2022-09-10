import styled from "styled-components";

interface IMoneyStyeldProps {
  mode: "SUCCESS" | "DANGER";
}

export const MoneyStye = styled.span<IMoneyStyeldProps>`
  color: ${({ theme, mode }) => (mode === "SUCCESS" ? theme.colors.primary : theme.colors.danger)};
  font-weight: bold;
`;
