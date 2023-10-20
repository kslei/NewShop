import { updateLocale } from "../http/languageAPI";

export function width(setBtnVisible, setVisible) {
  let w = window.innerWidth;
  if (w > 576) {
    setVisible(true);
    setBtnVisible(false)
  } else {
    setVisible(false);
    setBtnVisible(true);
  }
}

export const addLocale = (key, valueEn, valueRu, valueUk) => {
  updateLocale("en", key, valueEn)
  updateLocale("ru", key, valueRu)
  updateLocale("uk", key, valueUk)
}