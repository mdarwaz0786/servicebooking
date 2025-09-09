export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  category: {
    create: `${BASE_URL}/api/v1/admin/category/create-category`,
    getAll: `${BASE_URL}/api/v1/admin/category`,
    getSingle: `${BASE_URL}/api/v1/admin/category`,
    update: `${BASE_URL}/api/v1/admin/category/update-category`,
    delete: `${BASE_URL}/api/v1/admin/category/delete-category`,
  },
  user: {
    register: `${BASE_URL}/api/v1/admin/user/register`,
    login: `${BASE_URL}/api/v1/admin/user/login`,
    loggedIn: `${BASE_URL}/api/v1/admin/user/loggedIn`,
  },
};

export default apis;
