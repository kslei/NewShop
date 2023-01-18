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