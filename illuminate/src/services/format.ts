export const capitalize = (text: string = '') =>
  text.length === 0 ? text :
    `${text[0].toUpperCase()}${text.slice(1)}`;
