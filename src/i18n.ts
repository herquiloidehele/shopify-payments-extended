import i18n from "i18next";
import i18Http from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(i18Http)
  .init({
    lng: "pt",
    fallbackLng: "pt",
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json?v=20200703`,
    },
  });
