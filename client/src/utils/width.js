export function width(setBtnVisible, setVisible) {
  let w = window.innerWidth;
  if (w >= 560) {
    setVisible(true);
    setBtnVisible(false)
  } else {
    setVisible(false);
    setBtnVisible(true);
  }
}

export const summ = function (devices) {
  let sum = 0;
  for (let i = 0; i < devices.length; i++) {
    sum = sum + devices[i].device.price;
  }
  return sum;
}