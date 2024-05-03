import React from "react";
import { Outlet } from "react-router-dom";

import AuthService from "../../../Api/Services/AuthService";
import { APP_ROUTES } from "../../../Utils/constants/Routes";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { DashboardPageWrapper, PageContainerWrapper, PageContent } from "./Style";
import { useMenuItems } from "./useMenuItems";

const Dashboard: React.FC = () => {
  const [toggleMenu, setToggleMenu] = React.useState(true);
  const { getMenuItemsByRole } = useMenuItems();
  const hidMenus = AuthService.getAuthUser?.hasOwnPaymentSettings ? [] : [APP_ROUTES.PRIVATE.MPESA];

  const menuItems = getMenuItemsByRole(AuthService.getAuthUser?.role, hidMenus);

  return (
    <DashboardPageWrapper>
      <SideMenu menuItems={menuItems} defaultMenuItem={APP_ROUTES.PRIVATE.DASHBOARD} toggleMenu={toggleMenu} />
      <PageContainerWrapper>
        <Header onClickMenu={() => setToggleMenu(!toggleMenu)} />
        <PageContent>
          <Outlet />
        </PageContent>
      </PageContainerWrapper>
    </DashboardPageWrapper>
  );
};

export default Dashboard;
