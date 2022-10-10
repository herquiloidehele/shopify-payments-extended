import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as CheckIcon } from "../../../assets/icon/ic_check.svg";
import { IDropdownItem } from "../Dropdown";
import DropdownItemComponent from "./Style";

interface IProps {
  item: IDropdownItem;
  selectedOption: IDropdownItem;
}

const DropdownItem: FC<IProps> = function ({ item, selectedOption }) {
  const { t } = useTranslation();
  return (
    <DropdownItemComponent>
      {item.icon && <img className="flag-icon" src={item.icon} alt="lang flag" />}
      <div className="item__description">{item.description || t(item.key)}</div>
      {item === selectedOption && <CheckIcon className="item__selected-icon" />}
    </DropdownItemComponent>
  );
};

export default DropdownItem;
