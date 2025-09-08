export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  category: {
    create: `${BASE_URL}/api/v1/common/category/create-category`,
    getAll: `${BASE_URL}/api/v1/common/category`,
    getSingle: `${BASE_URL}/api/v1/common/category`,
    update: `${BASE_URL}/api/v1/common/category/update-category`,
    delete: `${BASE_URL}/api/v1/common/category/delete-category`,
  },
  user: {
    register: `${BASE_URL}/api/v1/common/user/register`,
    login: `${BASE_URL}/api/v1/common/user/login`,
    loggedIn: `${BASE_URL}/api/v1/common/user/loggedIn`,
  },
};

export default apis;
