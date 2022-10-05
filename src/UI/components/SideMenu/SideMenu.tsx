import React, { useCallback, useEffect } from "react";

import { ReactComponent as FullLogo } from "../../assets/img/logo-large.svg";
import { ReactComponent as ShortLogo } from "../../assets/img/logo-mini.svg";
import { MenuItemsContainer, SideMenuWrapper, MenuItem } from "./Style";

export interface IMenuItem {
  key: string;
  title: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

interface ISideMenuProps {
  menuItems: IMenuItem[];
  defaultMenuItem: string;
  toggleMenu?: boolean;
}

const SideMenu: React.FC<ISideMenuProps> = ({ menuItems, defaultMenuItem, toggleMenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(defaultMenuItem);

  const handleClickMenuItem = useCallback(
    (menuItem: IMenuItem) => {
      setSelectedMenuItem(menuItem.key);
      if (menuItem.onClick) {
        menuItem.onClick();
        setIsOpen(false);
      }
    },
    [selectedMenuItem]
  );

  useEffect(() => {
    setIsOpen(!toggleMenu);
  }, [toggleMenu]);

  return (
    <SideMenuWrapper isOpen={isOpen} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {isOpen ? <FullLogo className="full-logo" /> : <ShortLogo className="short-logo" />}
      <MenuItemsContainer>
        {menuItems.map((menuItem) => (
          <MenuItem
            isOpen={isOpen}
            key={menuItem.key}
            selected={menuItem.key === selectedMenuItem}
            onClick={() => {
              handleClickMenuItem(menuItem);
            }}
          >
            {menuItem.icon}
            <p>{menuItem.title}</p>
          </MenuItem>
        ))}
      </MenuItemsContainer>
    </SideMenuWrapper>
  );
};

SideMenu.defaultProps = {
  toggleMenu: false,
};

export default SideMenu;
