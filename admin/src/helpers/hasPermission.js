export const hasPermission = (user, module, action) => {
  if (!user) return false;

  if (user?.role == "admin") return true;

  return Boolean(user?.permissions?.permissions?.[module]?.[action]);
};
