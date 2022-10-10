import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as ChevronDownIcon } from "../../assets/icon/ic_chevron_down.svg";
import { ReactComponent as ChevronUpIcon } from "../../assets/icon/ic_chevron_up.svg";
import DropdownItem from "./DropdownItem/DropdownItem";
import DropdownComponent, { ItemToggler } from "./Style";

export interface IDropdownItem {
  id: number;
  key: string;
  description: string;
  icon: string;
}
interface IProps {
  items: IDropdownItem[];
  onSelect: (item: IDropdownItem) => void;
  isInput: boolean;
  defaultItem: IDropdownItem;
  disabled: boolean;
}

const Dropdown: FC<IProps> = function ({ items, onSelect, isInput, defaultItem, disabled }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectItemHandler = (selectedItem: any) => {
    onSelect(selectedItem);
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <ItemToggler isInput={isInput} labelColor={disabled ? "white" : "grey"} onClick={toggleDropdown} className="item-toggler" role="button" tabIndex={0}>
        <img className="icon-flag" alt="icon-flag" src={defaultItem.icon} />
        <span className="item__description">{t(`${defaultItem.key}`)}</span>
        {!disabled && <>{isInput && isOpen ? <ChevronUpIcon className="item-toggler__chevron" /> : <ChevronDownIcon className="item-toggler__chevron" />}</>}
      </ItemToggler>
      {isOpen && (
        <DropdownComponent isInput={isInput}>
          {items.map((item) => (
            <span key={item.key} role="button" tabIndex={0} onClick={() => selectItemHandler(item)}>
              <DropdownItem item={item} selectedOption={defaultItem} />
            </span>
          ))}
        </DropdownComponent>
      )}
    </>
  );
};

export default Dropdown;
