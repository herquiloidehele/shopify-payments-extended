import React from "react";
import { Outlet } from "react-router-dom";

import { APP_ROUTES } from "../../../Utils/constants/Routes";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { MenuItems } from "./MenuItems";
import { DashboardPageWrapper, PageContainerWrapper, PageContent } from "./Style";

const Dashboard: React.FC = () => {
  const [toggleMenu, setToggleMenu] = React.useState(true);

  return (
    <DashboardPageWrapper>
      <SideMenu menuItems={MenuItems()} defaultMenuItem={APP_ROUTES.PRIVATE.DASHBOARD} toggleMenu={toggleMenu} />
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
