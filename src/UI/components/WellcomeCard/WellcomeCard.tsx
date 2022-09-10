import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as WellcomeIcon } from "../../assets/icon/wellcome-icon.svg";
import WellcomeLeftImage from "../../assets/img/wellcome-left-image.png";
import WellcomeRightImage from "../../assets/img/wellcome-right-image.png";
import { WellcomeCardWrapper } from "./Style";

const WellcomeCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <WellcomeCardWrapper>
      <img alt="wellcome left" className="left-image" src={WellcomeLeftImage} />
      <img alt="wellcome right" className="right-image" src={WellcomeRightImage} />
      <WellcomeIcon />
      <h1>{t("pages.home.wellcomeCard.title")}</h1>
      <p>{t("pages.home.wellcomeCard.subtitle")}</p>
    </WellcomeCardWrapper>
  );
};

export default WellcomeCard;
