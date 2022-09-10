import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

interface ISideMenuStyle {
  isOpen: boolean;
}

export const SideMenuWrapper = styled.div<ISideMenuStyle>`
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ isOpen }) => (isOpen ? pixel2Rem(440) : pixel2Rem(90))};
  min-height: 100vh;
  padding: ${pixel2Rem(30)} 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  .short-logo {
    width: ${pixel2Rem(40)};
    height: ${pixel2Rem(40)};
  }

  .full-logo {
    width: ${pixel2Rem(270)};
    height: auto;
  }
`;

export const MenuItemsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${pixel2Rem(40)};
`;

interface IMenuItemProps {
  selected?: boolean;
  isOpen: boolean;
}

export const MenuItem = styled.div<IMenuItemProps>`
  padding: ${pixel2Rem(20)} ${pixel2Rem(30)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: ${pixel2Rem(18)};
  background-color: ${({ selected }) => (selected ? "rgba(46,46,46, 0.3)" : "transparent")};
  border-radius: ${({ theme }) => `${theme.border_radius}px`};
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? "rgba(46,46,46, 0.3)" : "rgba(46, 46, 46, 0.1)")};
  }

  svg {
    width: ${pixel2Rem(28)};
    height: ${pixel2Rem(28)};
    color: white;
  }

  p {
    font-size: ${pixel2Rem(20)};
    color: white;
    white-space: nowrap;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    transition: all 3s ease;
  }

  transition: all 0.5s ease-in-out;
`;
