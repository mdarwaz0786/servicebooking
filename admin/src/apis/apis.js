export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  category: {
    create: `${BASE_URL}/api/v1/admin/category/create-category`,
    get: `${BASE_URL}/api/v1/admin/category`,
    update: `${BASE_URL}/api/v1/admin/category/update-category`,
    delete: `${BASE_URL}/api/v1/admin/category/delete-category`,
  },
  subCategory: {
    create: `${BASE_URL}/api/v1/admin/sub-category/create-sub-category`,
    get: `${BASE_URL}/api/v1/admin/sub-category`,
    update: `${BASE_URL}/api/v1/admin/sub-category/update-sub-category`,
    delete: `${BASE_URL}/api/v1/admin/sub-category/delete-sub-category`,
  },
  subSubCategory: {
    create: `${BASE_URL}/api/v1/admin/sub-sub-category/create-sub-sub-category`,
    get: `${BASE_URL}/api/v1/admin/sub-sub-category`,
    update: `${BASE_URL}/api/v1/admin/sub-sub-category/update-sub-sub-category`,
    delete: `${BASE_URL}/api/v1/admin/sub-sub-category/delete-sub-sub-category`,
  },
  subSubSubCategory: {
    create: `${BASE_URL}/api/v1/admin/sub-sub-sub-category/create-sub-sub-sub-category`,
    get: `${BASE_URL}/api/v1/admin/sub-sub-sub-category`,
    update: `${BASE_URL}/api/v1/admin/sub-sub-sub-category/update-sub-sub-sub-category`,
    delete: `${BASE_URL}/api/v1/admin/sub-sub-sub-category/delete-sub-sub-sub-category`,
  },
  service: {
    create: `${BASE_URL}/api/v1/admin/service/create-service`,
    get: `${BASE_URL}/api/v1/admin/service`,
    update: `${BASE_URL}/api/v1/admin/service/update-service`,
    delete: `${BASE_URL}/api/v1/admin/service/delete-service`,
  },
  user: {
    register: `${BASE_URL}/api/v1/admin/user/register`,
    login: `${BASE_URL}/api/v1/admin/user/login`,
    loggedIn: `${BASE_URL}/api/v1/admin/user/loggedIn`,
  },
};

export default apis;
