function getFinancialYear(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 4) {
    return `${String(year).slice(2)}-${String(year + 1).slice(2)}`;
  } else {
    return `${String(year - 1).slice(2)}-${String(year).slice(2)}`;
  };
};

export default getFinancialYear;
