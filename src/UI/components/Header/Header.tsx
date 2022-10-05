import { Notifications, Menu as MenuIcon, Logout, ManageAccountsOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Badge, Button, CircularProgress, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AuthService from "../../../Api/Services/AuthService";
import { APP_ROUTES } from "../../../Utils/constants/Routes";
import { HeaderWrapper, AvatarNotificationWrapper, InputSearch } from "../../pages/Home/Style";

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

  return (
    <HeaderWrapper>
      <Button onClick={onClickMenu}>
        <MenuIcon className="menu-icon" />
      </Button>
      <InputSearch autoComplete="off" className="email-input" id="search" type="search" placeholder={t("pages.home.header.search")} />
      <AvatarNotificationWrapper>
        <Button>
          <Badge badgeContent={5} color="primary" overlap="circular" className="badge-icon">
            <Notifications className="notification-icon" color="action" />
          </Badge>
        </Button>
        <div>
          <Button onClick={handleClick}>
            <Avatar className="avatar-icon" alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
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
