const date = "2026-01-13T09:50:06.309+00:00";

const dateToIST = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

console.log(dateToIST(date));
