import React, { ReactElement } from "react";

import { CustomCard } from "./Style";

interface ICustomCardComponentProps {
  children: React.ReactNode;
  title?: ReactElement | string;
}

const CustomCardComponent: React.FC<ICustomCardComponentProps> = ({ title, children }) => {
  return (
    <CustomCard>
      {title ? <div className="card-heading">{title}</div> : null}
      <div className="content">{children}</div>
    </CustomCard>
  );
};

CustomCardComponent.defaultProps = {
  title: undefined,
};

export default CustomCardComponent;
