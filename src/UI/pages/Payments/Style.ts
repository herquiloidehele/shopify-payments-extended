import styled from "styled-components";

export const SummaryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
`;

export const SummaryItem = styled.div<{ backgroundColor: string; textColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  flex-direction: column;
  padding: 15px;
  flex-grow: 1;
`;

export const ValueSummaryIndicator = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
export const LabelSummaryIndicator = styled.span`
  font-size: 14px;
`;
