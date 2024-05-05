import { AccountCircleOutlined, Logout, ManageAccountsOutlined, Menu as MenuIcon } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, ListItemIcon, Menu, MenuItem } from "@mui/material";
import i18n from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AuthService from "../../../Api/Services/AuthService";
import { LANGUAGUES } from "../../../models";
import { APP_ROUTES } from "../../../Utils/constants/Routes";
import AvatarFallback from "../../assets/img/avatar-fallback.png";
import { AvatarNotificationWrapper, HeaderWrapper, InputSearch } from "../../pages/Home/Style";
import Dropdown, { IDropdownItem } from "../Dropdown/Dropdown";

interface IHeaderProps {
  onClickMenu: () => void;
}
const Header: React.FC<IHeaderProps> = ({ onClickMenu }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoading(true);
    AuthService.logout()
      .then(() => {
        navigate(APP_ROUTES.PUBLIC.LOGIN);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGUES.find((language) => String(language.key).toLowerCase() === i18n.language) || LANGUAGUES[0]);

  const changeLanguage = (language: IDropdownItem) => {
    i18n.changeLanguage(String(language.key).toLowerCase());
    setSelectedLanguage(language);
  };

  return (
    <HeaderWrapper>
      <Button onClick={onClickMenu}>
        <MenuIcon className="menu-icon" />
      </Button>
      <InputSearch autoComplete="off" className="email-input" id="search" type="search" placeholder={t("pages.home.header.search")} />
      <AvatarNotificationWrapper>
        <Dropdown defaultItem={selectedLanguage} items={LANGUAGUES} onSelect={changeLanguage} disabled={false} isInput />
        <div>
          <Button onClick={handleClick}>
            <Avatar className="avatar-icon" alt="Remy Sharp" src={AvatarFallback} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              {t("pages.home.header.profile")}
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ManageAccountsOutlined fontSize="small" />
              </ListItemIcon>
              {t("pages.home.header.settings")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t("pages.home.header.logout")}
                </>
              )}
            </MenuItem>
          </Menu>
        </div>
      </AvatarNotificationWrapper>
    </HeaderWrapper>
  );
};

export default Header;
