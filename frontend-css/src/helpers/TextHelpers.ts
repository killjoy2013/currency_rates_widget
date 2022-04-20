export const getCurrencyDisplayText = (value: number, abbr?: string) => {
  if (value == 0) {
    return "";
  } else if (abbr) {
    let formatter = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: abbr,
    });

    return formatter.format(value);
  } else {
    // return String(value);
    let formatter = Intl.NumberFormat("en-US");
    return formatter.format(value);
  }
};
