/*
Helper to set all time parameters to 0
*/
export const removeTimePart = (param: Date) => {
  return new Date(
    param.getFullYear(),
    param.getMonth(),
    param.getDate(),
    0,
    0,
    0,
    0
  );
};
