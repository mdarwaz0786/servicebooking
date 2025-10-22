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
  timeSlot: {
    create: `${BASE_URL}/api/v1/admin/time-slot/create-time-slot`,
    get: `${BASE_URL}/api/v1/admin/time-slot`,
    update: `${BASE_URL}/api/v1/admin/time-slot/update-time-slot`,
    delete: `${BASE_URL}/api/v1/admin/time-slot/delete-time-slot`,
  },
  booking: {
    get: `${BASE_URL}/api/v1/admin/booking`,
    delete: `${BASE_URL}/api/v1/admin/booking/delete-booking`,
  },
  transaction: {
    get: `${BASE_URL}/api/v1/admin/transaction`,
    delete: `${BASE_URL}/api/v1/admin/transaction`,
  },
  servicemanProfile: {
    get: `${BASE_URL}/api/v1/admin/serviceman-profile`,
    update: `${BASE_URL}/api/v1/admin/serviceman-profile`,
  },
  servicemanBooking: {
    create: `${BASE_URL}/api/v1/admin/serviceman-booking`,
  },
  kyc: {
    get: `${BASE_URL}/api/v1/admin/kyc`,
    update: `${BASE_URL}/api/v1/admin/kyc`,
    delete: `${BASE_URL}/api/v1/admin/kyc`,
  },
  trainingSchedule: {
    create: `${BASE_URL}/api/v1/admin/training-schedule`,
    get: `${BASE_URL}/api/v1/admin/training-schedule`,
    update: `${BASE_URL}/api/v1/admin/training-schedule`,
    delete: `${BASE_URL}/api/v1/admin/training-schedule`,
  },
  earning: {
    create: `${BASE_URL}/api/v1/admin/earning`,
    get: `${BASE_URL}/api/v1/admin/earning`,
    update: `${BASE_URL}/api/v1/admin/earning`,
    delete: `${BASE_URL}/api/v1/admin/earning`,
  },
  banner: {
    create: `${BASE_URL}/api/v1/admin/home-page-banner`,
    get: `${BASE_URL}/api/v1/admin/home-page-banner`,
    update: `${BASE_URL}/api/v1/admin/home-page-banner`,
    delete: `${BASE_URL}/api/v1/admin/home-page-banner`,
  },
  slider: {
    create: `${BASE_URL}/api/v1/admin/home-page-slider`,
    get: `${BASE_URL}/api/v1/admin/home-page-slider`,
    update: `${BASE_URL}/api/v1/admin/home-page-slider`,
    delete: `${BASE_URL}/api/v1/admin/home-page-slider`,
  },
  homeService: {
    create: `${BASE_URL}/api/v1/admin/home-page-service`,
    get: `${BASE_URL}/api/v1/admin/home-page-service`,
    update: `${BASE_URL}/api/v1/admin/home-page-service`,
    delete: `${BASE_URL}/api/v1/admin/home-page-service`,
  },
  serviceIncluded: {
    create: `${BASE_URL}/api/v1/admin/service-included`,
    get: `${BASE_URL}/api/v1/admin/service-included`,
    update: `${BASE_URL}/api/v1/admin/service-included`,
    delete: `${BASE_URL}/api/v1/admin/service-included`,
  },
  requirementFromCustomer: {
    create: `${BASE_URL}/api/v1/admin/requirement-from-customer`,
    get: `${BASE_URL}/api/v1/admin/requirement-from-customer`,
    update: `${BASE_URL}/api/v1/admin/requirement-from-customer`,
    delete: `${BASE_URL}/api/v1/admin/requirement-from-customer`,
  },
  whyChooseUs: {
    create: `${BASE_URL}/api/v1/admin/why-choose-us`,
    get: `${BASE_URL}/api/v1/admin/why-choose-us`,
    update: `${BASE_URL}/api/v1/admin/why-choose-us`,
    delete: `${BASE_URL}/api/v1/admin/why-choose-us`,
  },
  expertTechnician: {
    create: `${BASE_URL}/api/v1/admin/expert-technician`,
    get: `${BASE_URL}/api/v1/admin/expert-technician`,
    update: `${BASE_URL}/api/v1/admin/expert-technician`,
    delete: `${BASE_URL}/api/v1/admin/expert-technician`,
  },
  brandLogo: {
    create: `${BASE_URL}/api/v1/admin/brand-logo`,
    get: `${BASE_URL}/api/v1/admin/brand-logo`,
    update: `${BASE_URL}/api/v1/admin/brand-logo`,
    delete: `${BASE_URL}/api/v1/admin/brand-logo`,
  },
  giPromise: {
    create: `${BASE_URL}/api/v1/admin/gi-promise`,
    get: `${BASE_URL}/api/v1/admin/gi-promise`,
    update: `${BASE_URL}/api/v1/admin/gi-promise`,
    delete: `${BASE_URL}/api/v1/admin/gi-promise`,
  },
  serviceFaq: {
    create: `${BASE_URL}/api/v1/admin/service-faq`,
    get: `${BASE_URL}/api/v1/admin/service-faq`,
    update: `${BASE_URL}/api/v1/admin/service-faq`,
    delete: `${BASE_URL}/api/v1/admin/service-faq`,
  },
  blog: {
    create: `${BASE_URL}/api/v1/admin/blog`,
    get: `${BASE_URL}/api/v1/admin/blog`,
    update: `${BASE_URL}/api/v1/admin/blog`,
    delete: `${BASE_URL}/api/v1/admin/blog`,
  },
  blogCategory: {
    create: `${BASE_URL}/api/v1/admin/blog-category`,
    get: `${BASE_URL}/api/v1/admin/blog-category`,
    update: `${BASE_URL}/api/v1/admin/blog-category`,
    delete: `${BASE_URL}/api/v1/admin/blog-category`,
  },
  termsConditions: {
    create: `${BASE_URL}/api/v1/admin/terms-conditions`,
    get: `${BASE_URL}/api/v1/admin/terms-conditions`,
    update: `${BASE_URL}/api/v1/admin/terms-conditions`,
    delete: `${BASE_URL}/api/v1/admin/terms-conditions`,
  },
  privacyPolicy: {
    create: `${BASE_URL}/api/v1/admin/privacy-policy`,
    get: `${BASE_URL}/api/v1/admin/privacy-policy`,
    update: `${BASE_URL}/api/v1/admin/privacy-policy`,
    delete: `${BASE_URL}/api/v1/admin/privacy-policy`,
  },
  refundPolicy: {
    create: `${BASE_URL}/api/v1/admin/refund-policy`,
    get: `${BASE_URL}/api/v1/admin/refund-policy`,
    update: `${BASE_URL}/api/v1/admin/refund-policy`,
    delete: `${BASE_URL}/api/v1/admin/refund-policy`,
  },
  impact: {
    create: `${BASE_URL}/api/v1/admin/impact`,
    get: `${BASE_URL}/api/v1/admin/impact`,
    update: `${BASE_URL}/api/v1/admin/impact`,
    delete: `${BASE_URL}/api/v1/admin/impact`,
  },
  contactEnquiry: {
    get: `${BASE_URL}/api/v1/admin/contact-enquiry`,
    delete: `${BASE_URL}/api/v1/admin/contact-enquiry`,
  },
  jobPosting: {
    create: `${BASE_URL}/api/v1/admin/job-posting`,
    get: `${BASE_URL}/api/v1/admin/job-posting`,
    update: `${BASE_URL}/api/v1/admin/job-posting`,
    delete: `${BASE_URL}/api/v1/admin/job-posting`,
  },
  user: {
    get: `${BASE_URL}/api/v1/admin/user`,
    register: `${BASE_URL}/api/v1/admin/user/register`,
  },
  auth: {
    login: `${BASE_URL}/api/v1/admin/auth/login`,
    loggedIn: `${BASE_URL}/api/v1/admin/auth/loggedIn`,
  },
};

export default apis;
