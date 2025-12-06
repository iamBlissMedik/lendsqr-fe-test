export const formatUserDate = (dateStr: string) => {
  if (!dateStr) return "";

  // Fix non-ISO dates like: "2017-02-02T07:30:45 -01:00"
  const safeStr = dateStr.replace(" ", "");

  const date = new Date(safeStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
