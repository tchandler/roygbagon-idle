export const getRGB = color => [color >> 16, (color >> 8) & 0xff, color & 0xff];

export const calculateColorHex = (red, green, blue) => {
  const total = red + green + blue;
  const redHex = "0" + Math.floor((red / total) * 255).toString(16);
  const greenHex = "0" + Math.floor((green / total) * 255).toString(16);
  const blueHex = "0" + Math.floor((blue / total) * 255).toString(16);
  return `${redHex.substr(-2)}${greenHex.substr(-2)}${blueHex.substr(-2)}`;
};

export const calculateColorDistance = ([x1, y1, z1], [x2, y2, z2]) =>
  (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)) ^
  (1 / 2);

export const calculateColorWeight = ({ red, green, blue }) =>
  red + green + blue;
