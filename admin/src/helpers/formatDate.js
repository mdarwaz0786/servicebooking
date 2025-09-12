export const formatDate = (dateStr, withTime = false) => {
  if (!dateStr) return "";

  const options = withTime
    ? {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
    : {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

  return new Date(dateStr).toLocaleString("en-IN", options);
};
