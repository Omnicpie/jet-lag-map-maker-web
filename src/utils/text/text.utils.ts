/**
 *
 * @param t the text to humanize
 * @returns a string with replaced `_` with a space and the first letter of each word capitalized
 */
export const humanize = (t: string) => {
  return t
    .split("_")
    .map((s) => `${s[0].toLocaleUpperCase()}${s.slice(1)}`)
    .join(" ");
};
