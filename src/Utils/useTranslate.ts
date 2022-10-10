import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createGlobalState } from "react-use";

import { LANGUAGUES } from "../models";
import { IDropdownItem } from "../UI/components/Dropdown/Dropdown";

const languagesStore = createGlobalState<IDropdownItem[]>(LANGUAGUES);
const selectedLanguageStore = createGlobalState<IDropdownItem | undefined>(undefined);

const useTranslate = () => {
  const [languages] = languagesStore();
  const [selectedLanguage, setSelectedLanguage] = selectedLanguageStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const findLanguage = languages.find((language: IDropdownItem) => i18n.language.toUpperCase() === language.key.toUpperCase());

    setSelectedLanguage(findLanguage);
  }, []);

  const changeLanguage = useCallback((language: IDropdownItem) => {
    i18n.changeLanguage(language.key).then(() => {
      setSelectedLanguage(language);
    });
  }, []);

  return { languages, selectedLanguage, changeLanguage };
};

export { useTranslate };
