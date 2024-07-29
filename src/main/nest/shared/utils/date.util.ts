export const startOfTheDay = (date: string | Date): Date => {
  const dayStart = new Date(date).setHours(0, 0, 0, 0);
  return new Date(dayStart);
};
export const endOfTheDay = (date: string | Date): Date => {
  const dayEnd = new Date(date).setHours(23, 59, 59, 999);
  return new Date(dayEnd);
};
