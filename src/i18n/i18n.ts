import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LANDING_EN from "./en/landing.json";
import LANDING_VI from "./vi/landing.json";

export const resources = {
  en: {
    landing: LANDING_EN,
  },
  vi: {
    landing: LANDING_VI,
  },
};

export const defaultNS = "landing";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: ["landing"],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
