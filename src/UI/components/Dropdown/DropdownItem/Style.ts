import styled from "styled-components";

import { pixel2Rem } from "../../../../Utils/functions/Ui";

const DropdownItemComponent = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${pixel2Rem(10)} ${pixel2Rem(14)};
  cursor: pointer;
  &:last-child {
    border-bottom: ${pixel2Rem(0.5)} solid ${(props) => props.theme.colors.primary} !important;
  }

  .item__icon {
    flex-grow: 1;
    margin-right: ${pixel2Rem(14)};
  }

  .item__description {
    flex-grow: 100;
  }

  .item__selected-icon {
    flex-grow: 1;
    width: ${pixel2Rem(28)};
    height: ${pixel2Rem(28)};
  }
  margin-bottom: 0 !important;

  img.flag-icon {
    width: ${pixel2Rem(25)};
    height: ${pixel2Rem(25)};
    margin-right: ${pixel2Rem(10)};
  }
`;

export default DropdownItemComponent;
