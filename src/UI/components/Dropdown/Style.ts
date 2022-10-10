import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

interface IProps {
  isInput?: boolean;
  labelColor?: string;
}

const DropdownComponent = styled.ul<IProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: ${pixel2Rem(93)};
  top: ${pixel2Rem(65)};
  width: ${pixel2Rem(100)};
  max-height: ${pixel2Rem(270)};
  overflow-y: auto;
  padding-left: 0;
  z-index: ${({ isInput }) => (isInput ? "50" : "200")};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${pixel2Rem(6)};
  box-shadow: rgb(0 0 0 / 26%) 0 ${pixel2Rem(2)} ${pixel2Rem(8)};
`;

export const ItemToggler = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ isInput }) => (isInput ? "fill-available" : "unset")};
  outline: none;
  .item__description {
    margin-right: ${pixel2Rem(10)};
    color: ${({ labelColor }) => labelColor};
    font-size: ${pixel2Rem(16)};
    letter-spacing: 0;
  }

  img.icon-flag {
    width: ${pixel2Rem(23)};
    height: ${pixel2Rem(23)};
    margin-right: ${pixel2Rem(8)};
  }
`;

export default DropdownComponent;
