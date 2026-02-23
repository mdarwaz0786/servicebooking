const permissionMap = {
  // ================= ROLE =================
  "POST /api/v1/admin/role": { module: "role", action: "add" },
  "GET /api/v1/admin/role": { module: "role", action: "view" },
  "GET /api/v1/admin/role/:id": { module: "role", action: "view" },
  "PUT /api/v1/admin/role/:id": { module: "role", action: "update" },
  "PATCH /api/v1/admin/role/:id": { module: "role", action: "update" },
  "DELETE /api/v1/admin/role/:id": { module: "role", action: "delete" },

  // ================= PRODUCT =================
  "POST /api/v1/admin/category/create-category": { module: "product", action: "add" },
  "GET /api/v1/admin/category": { module: "product", action: "view" },
  "GET /api/v1/admin/category/:id": { module: "product", action: "view" },
  "PUT /api/v1/admin/category/update-category/:id": { module: "product", action: "update" },
  "PATCH /api/v1/admin/category/update-category/:id": { module: "product", action: "update" },
  "DELETE /api/v1/admin/category/delete-category/:id": { module: "product", action: "delete" },

  // ================= VARIANT =================
  "POST /api/v1/admin/sub-category/create-sub-category": { module: "variant", action: "add" },
  "GET /api/v1/admin/sub-category": { module: "variant", action: "view" },
  "GET /api/v1/admin/sub-category/:id": { module: "variant", action: "view" },
  "PUT /api/v1/admin/sub-category/update-sub-category/:id": { module: "variant", action: "update" },
  "PATCH /api/v1/admin/sub-category/update-sub-category/:id": { module: "variant", action: "update" },
  "DELETE /api/v1/admin/sub-category/delete-sub-category/:id": { module: "variant", action: "delete" },

  // ================= SERVICE PROCESS =================
  "POST /api/v1/admin/sub-sub-category/create-sub-sub-category": { module: "serviceProcess", action: "add" },
  "GET /api/v1/admin/sub-sub-category": { module: "serviceProcess", action: "view" },
  "GET /api/v1/admin/sub-sub-category/:id": { module: "serviceProcess", action: "view" },
  "PUT /api/v1/admin/sub-sub-category/update-sub-sub-category/:id": { module: "serviceProcess", action: "update" },
  "PATCH /api/v1/admin/sub-sub-category/update-sub-sub-category/:id": { module: "serviceProcess", action: "update" },
  "DELETE /api/v1/admin/sub-sub-category/delete-sub-sub-category/:id": { module: "serviceProcess", action: "delete" },

  // ================= NESTED SERVICE PROCESS =================
  "POST /api/v1/admin/sub-sub-sub-category/create-sub-sub-sub-category": { module: "nestedServiceProcess", action: "add" },
  "GET /api/v1/admin/sub-sub-sub-category": { module: "nestedServiceProcess", action: "view" },
  "GET /api/v1/admin/sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "view" },
  "PUT /api/v1/admin/sub-sub-sub-category/update-sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "update" },
  "PATCH /api/v1/admin/sub-sub-sub-category/update-sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "update" },
  "DELETE /api/v1/admin/sub-sub-sub-category/delete-sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "delete" },

  // ================= PRODUCT STORE =================
  "POST /api/v1/admin/product-store": { module: "productStore", action: "add" },
  "GET /api/v1/admin/product-store": { module: "productStore", action: "view" },
  "GET /api/v1/admin/product-store/:id": { module: "productStore", action: "view" },
  "PUT /api/v1/admin/product-store/:id": { module: "productStore", action: "update" },
  "PATCH /api/v1/admin/product-store/:id": { module: "productStore", action: "update" },
  "DELETE /api/v1/admin/product-store/:id": { module: "productStore", action: "delete" },

  // ================= TIME SLOT =================
  "POST /api/v1/admin/time-slot/create-time-slot": { module: "timeSlot", action: "add" },
  "GET /api/v1/admin/time-slot": { module: "timeSlot", action: "view" },
  "GET /api/v1/admin/time-slot/available/by-date": { module: "timeSlot", action: "view" },
  "GET /api/v1/admin/time-slot/:id": { module: "timeSlot", action: "view" },
  "PUT /api/v1/admin/time-slot/update-time-slot/:id": { module: "timeSlot", action: "update" },
  "PATCH /api/v1/admin/time-slot/update-time-slot/:id": { module: "timeSlot", action: "update" },
  "DELETE /api/v1/admin/time-slot/delete-time-slot/:id": { module: "timeSlot", action: "delete" },

  // ================= BRAND =================
  "POST /api/v1/admin/brand": { module: "brand", action: "add" },
  "GET /api/v1/admin/brand": { module: "brand", action: "view" },
  "GET /api/v1/admin/brand/:id": { module: "brand", action: "view" },
  "PUT /api/v1/admin/brand/:id": { module: "brand", action: "update" },
  "PATCH /api/v1/admin/brand/:id": { module: "brand", action: "update" },
  "DELETE /api/v1/admin/brand/:id": { module: "brand", action: "delete" },

  // ================= CITY =================
  "POST /api/v1/admin/city": { module: "city", action: "add" },
  "GET /api/v1/admin/city": { module: "city", action: "view" },
  "GET /api/v1/admin/city/:id": { module: "city", action: "view" },
  "PUT /api/v1/admin/city/:id": { module: "city", action: "update" },
  "PATCH /api/v1/admin/city/:id": { module: "city", action: "update" },
  "DELETE /api/v1/admin/city/:id": { module: "city", action: "delete" },

  // ================= ZONE =================
  "POST /api/v1/admin/zone": { module: "zone", action: "add" },
  "GET /api/v1/admin/zone": { module: "zone", action: "view" },
  "GET /api/v1/admin/zone/:id": { module: "zone", action: "view" },
  "PUT /api/v1/admin/zone/:id": { module: "zone", action: "update" },
  "PATCH /api/v1/admin/zone/:id": { module: "zone", action: "update" },
  "DELETE /api/v1/admin/zone/:id": { module: "zone", action: "delete" },

  // ================= PINCODE =================
  "POST /api/v1/admin/pincode": { module: "pincode", action: "add" },
  "GET /api/v1/admin/pincode": { module: "pincode", action: "view" },
  "GET /api/v1/admin/pincode/:id": { module: "pincode", action: "view" },
  "PUT /api/v1/admin/pincode/:id": { module: "pincode", action: "update" },
  "PATCH /api/v1/admin/pincode/:id": { module: "pincode", action: "update" },
  "DELETE /api/v1/admin/pincode/:id": { module: "pincode", action: "delete" },

  // ================= USER MANAGEMENT =================
  "POST /api/v1/admin/user/register": { module: "user", action: "add" },
  "GET /api/v1/admin/user": { module: "user", action: "view" },
  "GET /api/v1/admin/user/:id": { module: "user", action: "view" },
  "PUT /api/v1/admin/user/:id": { module: "user", action: "update" },
  "PATCH /api/v1/admin/user/:id": { module: "user", action: "update" },
  "DELETE /api/v1/admin/user/:id": { module: "user", action: "delete" },

  // ================= BLOG =================
  "POST /api/v1/admin/blog": { module: "blog", action: "add" },
  "GET /api/v1/admin/blog": { module: "blog", action: "view" },
  "GET /api/v1/admin/blog/:id": { module: "blog", action: "view" },
  "PUT /api/v1/admin/blog/:id": { module: "blog", action: "update" },
  "PATCH /api/v1/admin/blog/:id": { module: "blog", action: "update" },
  "DELETE /api/v1/admin/blog/:id": { module: "blog", action: "delete" },

  // ================= BLOG CATEGORY =================
  "POST /api/v1/admin/blog-category": { module: "blogCategory", action: "add" },
  "GET /api/v1/admin/blog-category": { module: "blogCategory", action: "view" },
  "GET /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "view" },
  "PUT /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "update" },
  "PATCH /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "update" },
  "DELETE /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "delete" },

  // ================= TERMS AND CONDITIONS =================
  "POST /api/v1/admin/terms-conditions": { module: "termsAndCondition", action: "add" },
  "GET /api/v1/admin/terms-conditions": { module: "termsAndCondition", action: "view" },
  "GET /api/v1/admin/terms-conditions/:id": { module: "termsAndCondition", action: "view" },
  "PUT /api/v1/admin/terms-conditions/:id": { module: "termsAndCondition", action: "update" },
  "PATCH /api/v1/admin/terms-conditions/:id": { module: "termsAndCondition", action: "update" },
  "DELETE /api/v1/admin/terms-conditions/:id": { module: "termsAndCondition", action: "delete" },

  // ================= PRIVACY AND POLICY =================
  "POST /api/v1/admin/privacy-policy": { module: "privacyPolicy", action: "add" },
  "GET /api/v1/admin/privacy-policy": { module: "privacyPolicy", action: "view" },
  "GET /api/v1/admin/privacy-policy/:id": { module: "privacyPolicy", action: "view" },
  "PUT /api/v1/admin/privacy-policy/:id": { module: "privacyPolicy", action: "update" },
  "PATCH /api/v1/admin/privacy-policy/:id": { module: "privacyPolicy", action: "update" },
  "DELETE /api/v1/admin/privacy-policy/:id": { module: "privacyPolicy", action: "delete" },

  // ================= REFUND POLICY =================
  "POST /api/v1/admin/refund-policy": { module: "refundPolicy", action: "add" },
  "GET /api/v1/admin/refund-policy": { module: "refundPolicy", action: "view" },
  "GET /api/v1/admin/refund-policy/:id": { module: "refundPolicy", action: "view" },
  "PUT /api/v1/admin/refund-policy/:id": { module: "refundPolicy", action: "update" },
  "PATCH /api/v1/admin/refund-policy/:id": { module: "refundPolicy", action: "update" },
  "DELETE /api/v1/admin/refund-policy/:id": { module: "refundPolicy", action: "delete" },

  // ================= DISCLAIMER =================
  "POST /api/v1/admin/disclaimer": { module: "disclaimer", action: "add" },
  "GET /api/v1/admin/disclaimer/": { module: "disclaimer", action: "view" },
  "GET /api/v1/admin/disclaimer/:id": { module: "disclaimer", action: "view" },
  "PUT /api/v1/admin/disclaimer/:id": { module: "disclaimer", action: "update" },
  "PATCH /api/v1/admin/disclaimer/:id": { module: "disclaimer", action: "update" },
  "DELETE /api/v1/admin/disclaimer/:id": { module: "disclaimer", action: "delete" },

  /* ================= PROVIDER APP SUPPORT ================= */
  "POST /api/v1/admin/provider-app-support": { module: "providerAppSupport", action: "add" },
  "GET /api/v1/admin/provider-app-support/": { module: "providerAppSupport", action: "view" },
  "GET /api/v1/admin/provider-app-support/:id": { module: "providerAppSupport", action: "view" },
  "PUT /api/v1/admin/provider-app-support/:id": { module: "providerAppSupport", action: "update" },
  "PATCH /api/v1/admin/provider-app-support/:id": { module: "providerAppSupport", action: "update" },
  "DELETE /api/v1/admin/provider-app-support/:id": { module: "providerAppSupport", action: "delete" },

  /* ================= APP SUPPORT ================= */
  "POST /api/v1/admin/app": { module: "mobileAppInfo", action: "add" },
  "GET /api/v1/admin/app": { module: "mobileAppInfo", action: "view" },
  "GET /api/v1/admin/app/:id": { module: "mobileAppInfo", action: "view" },
  "PUT /api/v1/admin/app/:id": { module: "mobileAppInfo", action: "update" },
  "PATCH /api/v1/admin/app/:id": { module: "mobileAppInfo", action: "update" },
  "DELETE /api/v1/admin/app/:id": { module: "mobileAppInfo", action: "delete" },

  /* ================= SERVICE INCLUDED ================= */
  "POST /api/v1/admin/service-included": { module: "serviceIncluded", action: "add" },
  "GET /api/v1/admin/service-included": { module: "serviceIncluded", action: "view" },
  "GET /api/v1/admin/service-included/:id": { module: "serviceIncluded", action: "view" },
  "PUT /api/v1/admin/service-included/:id": { module: "serviceIncluded", action: "update" },
  "PATCH /api/v1/admin/service-included/:id": { module: "serviceIncluded", action: "update" },
  "DELETE /api/v1/admin/service-included/:id": { module: "serviceIncluded", action: "delete" },

  /* ================= REQUIREMENT FROM CUSTOMER ================= */
  "POST /api/v1/admin/requirement-from-customer": { module: "requirementFromCustomer", action: "add" },
  "GET /api/v1/admin/requirement-from-customer": { module: "requirementFromCustomer", action: "view" },
  "GET /api/v1/admin/requirement-from-customer/:id": { module: "requirementFromCustomer", action: "view" },
  "PUT /api/v1/admin/requirement-from-customer/:id": { module: "requirementFromCustomer", action: "update" },
  "PATCH /api/v1/admin/requirement-from-customer/:id": { module: "requirementFromCustomer", action: "update" },
  "DELETE /api/v1/admin/requirement-from-customer/:id": { module: "requirementFromCustomer", action: "delete" },

  /* ================= WHY CHOOSE US ================= */
  "POST /api/v1/admin/why-choose-us": { module: "whyChooseUs", action: "add" },
  "GET /api/v1/admin/why-choose-us": { module: "whyChooseUs", action: "view" },
  "GET /api/v1/admin/why-choose-us/:id": { module: "whyChooseUs", action: "view" },
  "PUT /api/v1/admin/why-choose-us/:id": { module: "whyChooseUs", action: "update" },
  "PATCH /api/v1/admin/why-choose-us/:id": { module: "whyChooseUs", action: "update" },
  "DELETE /api/v1/admin/why-choose-us/:id": { module: "whyChooseUs", action: "delete" },

  /* ================= EXPERT TECHNICIAN ================= */
  "POST /api/v1/admin/expert-technician": { module: "expertTechnician", action: "add" },
  "GET /api/v1/admin/expert-technician": { module: "expertTechnician", action: "view" },
  "GET /api/v1/admin/expert-technician/:id": { module: "expertTechnician", action: "view" },
  "PUT /api/v1/admin/expert-technician/:id": { module: "expertTechnician", action: "update" },
  "PATCH /api/v1/admin/expert-technician/:id": { module: "expertTechnician", action: "update" },
  "DELETE /api/v1/admin/expert-technician/:id": { module: "expertTechnician", action: "delete" },

  /* ================= BRAND LOGO ================= */
  "POST /api/v1/admin/brand-logo": { module: "brandLogo", action: "add" },
  "GET /api/v1/admin/brand-logo": { module: "brandLogo", action: "view" },
  "GET /api/v1/admin/brand-logo/:id": { module: "brandLogo", action: "view" },
  "PUT /api/v1/admin/brand-logo/:id": { module: "brandLogo", action: "update" },
  "PATCH /api/v1/admin/brand-logo/:id": { module: "brandLogo", action: "update" },
  "DELETE /api/v1/admin/brand-logo/:id": { module: "brandLogo", action: "delete" },

  /* ================= GI-PROMISE ================= */
  "POST /api/v1/admin/gi-promise": { module: "giPromise", action: "add" },
  "GET /api/v1/admin/gi-promise": { module: "giPromise", action: "view" },
  "GET /api/v1/admin/gi-promise/:id": { module: "giPromise", action: "view" },
  "PUT /api/v1/admin/gi-promise/:id": { module: "giPromise", action: "update" },
  "PATCH /api/v1/admin/gi-promise/:id": { module: "giPromise", action: "update" },
  "DELETE /api/v1/admin/gi-promise/:id": { module: "giPromise", action: "delete" },

  /* ================= SERVICE FAQ ================= */
  "POST /api/v1/admin/service-faq": { module: "faq", action: "add" },
  "GET /api/v1/admin/service-faq": { module: "faq", action: "view" },
  "GET /api/v1/admin/service-faq/:id": { module: "faq", action: "view" },
  "PUT /api/v1/admin/service-faq/:id": { module: "faq", action: "update" },
  "PATCH /api/v1/admin/service-faq/:id": { module: "faq", action: "update" },
  "DELETE /api/v1/admin/service-faq/:id": { module: "faq", action: "delete" },

  /* ================= RATE CARD ================= */
  "POST /api/v1/admin/rate-card": { module: "rateCard", action: "add" },
  "GET /api/v1/admin/rate-card": { module: "rateCard", action: "view" },
  "GET /api/v1/admin/rate-card/:id": { module: "rateCard", action: "view" },
  "PUT /api/v1/admin/rate-card/:id": { module: "rateCard", action: "update" },
  "PATCH /api/v1/admin/rate-card/:id": { module: "rateCard", action: "update" },
  "DELETE /api/v1/admin/rate-card/:id": { module: "rateCard", action: "delete" },

  /* ================= EARNING ================= */
  "POST /api/v1/admin/earning": { module: "earning", action: "add" },
  "GET /api/v1/admin/earning": { module: "earning", action: "view" },
  "GET /api/v1/admin/earning/:id": { module: "earning", action: "view" },
  "PUT /api/v1/admin/earning/:id": { module: "earning", action: "update" },
  "PATCH /api/v1/admin/earning/:id": { module: "earning", action: "update" },
  "DELETE /api/v1/admin/earning/:id": { module: "earning", action: "delete" },

  /* ================= PROVIDER EARNING ================= */
  "POST /api/v1/admin/provider-earning": { module: "providerEarning", action: "add" },
  "GET /api/v1/admin/provider-earning": { module: "providerEarning", action: "view" },
  "GET /api/v1/admin/provider-earning/:id": { module: "providerEarning", action: "view" },
  "PUT /api/v1/admin/provider-earning/:id": { module: "providerEarning", action: "update" },
  "PATCH /api/v1/admin/provider-earning/:id": { module: "providerEarning", action: "update" },
  "DELETE /api/v1/admin/provider-earning/:id": { module: "providerEarning", action: "delete" },

  /* ================= PROVIDER PROFILE ================= */
  "POST /api/v1/admin/serviceman-profile": { module: "providerProfile", action: "add" },
  "GET /api/v1/admin/serviceman-profile": { module: "providerProfile", action: "view" },
  "GET /api/v1/admin/serviceman-profile/:id": { module: "providerProfile", action: "view" },
  "PUT /api/v1/admin/serviceman-profile/:id": { module: "providerProfile", action: "update" },
  "PATCH /api/v1/admin/serviceman-profile/:id": { module: "providerProfile", action: "update" },
  "DELETE /api/v1/admin/serviceman-profile/:id": { module: "providerProfile", action: "delete" },

  /* ================= PROVIDER KYC ================= */
  "POST /api/v1/admin/kyc": { module: "providerKyc", action: "add" },
  "GET /api/v1/admin/kyc/": { module: "providerKyc", action: "view" },
  "GET /api/v1/admin/kyc/:id": { module: "providerKyc", action: "view" },
  "PUT /api/v1/admin/kyc/:id": { module: "providerKyc", action: "update" },
  "PATCH /api/v1/admin/kyc/:id": { module: "providerKyc", action: "update" },
  "DELETE /api/v1/admin/kyc/:id": { module: "providerKyc", action: "delete" },

  /* ================= PROVIDER TRAINING ================= */
  "POST /api/v1/admin/training": { module: "providerTraining", action: "add" },
  "GET /api/v1/admin/training": { module: "providerTraining", action: "view" },
  "GET /api/v1/admin/training/:id": { module: "providerTraining", action: "view" },
  "PUT /api/v1/admin/training/:id": { module: "providerTraining", action: "update" },
  "PATCH /api/v1/admin/training/:id": { module: "providerTraining", action: "update" },
  "DELETE /api/v1/admin/training/:id": { module: "providerTraining", action: "delete" },

  /* ================= PROVIDER TRAINING SCHEDULE SUBMIT ================= */
  "POST /api/v1/admin/training-schedule-submit": { module: "providerTrainingScheduleSubmit", action: "add" },
  "GET /api/v1/admin/training-schedule-submit": { module: "providerTrainingScheduleSubmit", action: "view" },
  "GET /api/v1/admin/training-schedule-submit/:id": { module: "providerTrainingScheduleSubmit", action: "view" },
  "PUT /api/v1/admin/training-schedule-submit/:id": { module: "providerTrainingScheduleSubmit", action: "update" },
  "PATCH /api/v1/admin/training-schedule-submit/:id": { module: "providerTrainingScheduleSubmit", action: "update" },
  "DELETE /api/v1/admin/training-schedule-submit/:id": { module: "providerTrainingScheduleSubmit", action: "delete" },

  // ================= CUSTOMER =================
  "POST /api/v1/admin/customer": { module: "customer", action: "add" },
  "GET /api/v1/admin/customer": { module: "customer", action: "view" },
  "GET /api/v1/admin/customer/:id": { module: "customer", action: "view" },
  "PUT /api/v1/admin/customer/:id": { module: "customer", action: "update" },
  "PATCH /api/v1/admin/customer/:id": { module: "customer", action: "update" },
  "DELETE /api/v1/admin/customer/:id": { module: "customer", action: "delete" },

  // ================= PROVIDER =================
  "POST /api/v1/admin/provider": { module: "provider", action: "add" },
  "GET /api/v1/admin/provider": { module: "provider", action: "view" },
  "GET /api/v1/admin/provider/:id": { module: "provider", action: "view" },
  "PUT /api/v1/admin/provider/:id": { module: "provider", action: "update" },
  "PATCH /api/v1/admin/provider/:id": { module: "provider", action: "update" },
  "DELETE /api/v1/admin/provider/:id": { module: "provider", action: "delete" },

  // ================= PROVIDER WALLET =================
  "POST /api/v1/admin/wallet": { module: "providerWallet", action: "add" },
  "GET /api/v1/admin/wallet": { module: "providerWallet", action: "view" },
  "GET /api/v1/admin/wallet/:id": { module: "providerWallet", action: "view" },
  "PUT /api/v1/admin/wallet/:id": { module: "providerWallet", action: "update" },
  "PATCH /api/v1/admin/wallet/:id": { module: "providerWallet", action: "update" },
  "DELETE /api/v1/admin/wallet/:id": { module: "providerWallet", action: "delete" },

  // ================= PROVIDER CASH COLLECTED =================
  "POST /api/v1/admin/cash-collected": { module: "providerCashcollected", action: "add" },
  "GET /api/v1/admin/cash-collected": { module: "providerCashcollected", action: "view" },
  "GET /api/v1/admin/cash-collected/:id": { module: "providerCashcollected", action: "view" },
  "PUT /api/v1/admin/cash-collected/:id": { module: "providerCashcollected", action: "update" },
  "PATCH /api/v1/admin/cash-collected/:id": { module: "providerCashcollected", action: "update" },
  "DELETE /api/v1/admin/cash-collected/:id": { module: "providerCashcollected", action: "delete" },

  // ================= PROVIDER CASH SUBMIT =================
  "POST /api/v1/admin/cash-collected-submit": { module: "providerCashSubmit", action: "add" },
  "GET /api/v1/admin/cash-collected-submit": { module: "providerCashSubmit", action: "view" },
  "GET /api/v1/admin/cash-collected-submit/:id": { module: "providerCashSubmit", action: "view" },
  "PUT /api/v1/admin/cash-collected-submit/:id": { module: "providerCashSubmit", action: "update" },
  "PATCH /api/v1/admin/cash-collected-submit/:id": { module: "providerCashSubmit", action: "update" },
  "DELETE /api/v1/admin/cash-collected-submit/:id": { module: "providerCashSubmit", action: "delete" },

  // ================= PROVIDER INSURANCE =================
  "POST /api/v1/admin/insurance": { module: "providerInsurance", action: "add" },
  "GET /api/v1/admin/insurance": { module: "providerInsurance", action: "view" },
  "GET /api/v1/admin/insurance/:id": { module: "providerInsurance", action: "view" },
  "PUT /api/v1/admin/insurance/:id": { module: "providerInsurance", action: "update" },
  "PATCH /api/v1/admin/insurance/:id": { module: "providerInsurance", action: "update" },
  "DELETE /api/v1/admin/insurance/:id": { module: "providerInsurance", action: "delete" },

  // ================= PROVIDER CERTIFICATE =================
  "POST /api/v1/admin/provider-certificate": { module: "providerCertificate", action: "add" },
  "GET /api/v1/admin/provider-certificate": { module: "providerCertificate", action: "view" },
  "GET /api/v1/admin/provider-certificate/:id": { module: "providerCertificate", action: "view" },
  "PUT /api/v1/admin/provider-certificate/:id": { module: "providerCertificate", action: "update" },
  "PATCH /api/v1/admin/provider-certificate/:id": { module: "providerCertificate", action: "update" },
  "DELETE /api/v1/admin/provider-certificate/:id": { module: "providerCertificate", action: "delete" },

  // ================= PROVIDER NOTIFICATION =================
  "POST /api/v1/admin/notification": { module: "providerNotification", action: "add" },
  "GET /api/v1/admin/notification": { module: "providerNotification", action: "view" },
  "GET /api/v1/admin/notification/:id": { module: "providerNotification", action: "view" },
  "PUT /api/v1/admin/notification/:id": { module: "providerNotification", action: "update" },
  "PATCH /api/v1/admin/notification/:id": { module: "providerNotification", action: "update" },
  "DELETE /api/v1/admin/notification/:id": { module: "providerNotification", action: "delete" },

  // ================= ACTIVE BOOKING =================
  "POST /api/v1/admin/booking": { module: "activeBooking", action: "add" },
  "GET /api/v1/admin/booking": { module: "activeBooking", action: "view" },
  "GET /api/v1/admin/booking/:id": { module: "activeBooking", action: "view" },
  "PUT /api/v1/admin/booking/:id": { module: "activeBooking", action: "update" },
  "PATCH /api/v1/admin/booking/:id": { module: "activeBooking", action: "update" },
  "DELETE /api/v1/admin/booking/:id": { module: "activeBooking", action: "delete" },

  // ================= CANCEL BOOKING =================
  "POST /api/v1/admin/booking": { module: "cancelBooking", action: "add" },
  "GET /api/v1/admin/booking": { module: "cancelBooking", action: "view" },
  "GET /api/v1/admin/booking/:id": { module: "cancelBooking", action: "view" },
  "PUT /api/v1/admin/booking/:id": { module: "cancelBooking", action: "update" },
  "PATCH /api/v1/admin/booking/:id": { module: "cancelBooking", action: "update" },
  "DELETE /api/v1/admin/booking/:id": { module: "cancelBooking", action: "delete" },

  // ================= COMPLETE BOOKING =================
  "POST /api/v1/admin/booking": { module: "completeBooking", action: "add" },
  "GET /api/v1/admin/booking": { module: "completeBooking", action: "view" },
  "GET /api/v1/admin/booking/:id": { module: "completeBooking", action: "view" },
  "PUT /api/v1/admin/booking/:id": { module: "completeBooking", action: "update" },
  "PATCH /api/v1/admin/booking/:id": { module: "completeBooking", action: "update" },
  "DELETE /api/v1/admin/booking/:id": { module: "completeBooking", action: "delete" },

  // ================= CUSTOMER PAYMENT =================
  "POST /api/v1/admin/transaction": { module: "customerPayment", action: "add" },
  "GET /api/v1/admin/transaction": { module: "customerPayment", action: "view" },
  "GET /api/v1/admin/transaction/:id": { module: "customerPayment", action: "view" },
  "PUT /api/v1/admin/transaction/:id": { module: "customerPayment", action: "update" },
  "PATCH /api/v1/admin/transaction/:id": { module: "customerPayment", action: "update" },
  "DELETE /api/v1/admin/transaction/:id": { module: "customerPayment", action: "delete" },

  // ================= PROVIDER PAYMENT =================
  "POST /api/v1/admin/transaction": { module: "providerPayment", action: "add" },
  "GET /api/v1/admin/transaction": { module: "providerPayment", action: "view" },
  "GET /api/v1/admin/transaction/:id": { module: "providerPayment", action: "view" },
  "PUT /api/v1/admin/transaction/:id": { module: "providerPayment", action: "update" },
  "PATCH /api/v1/admin/transaction/:id": { module: "providerPayment", action: "update" },
  "DELETE /api/v1/admin/transaction/:id": { module: "providerPayment", action: "delete" },

  // ================= INVOICE =================
  "POST /api/v1/admin/invoice": { module: "invoice", action: "add" },
  "GET /api/v1/admin/invoice": { module: "invoice", action: "view" },
  "GET /api/v1/admin/invoice/:id": { module: "invoice", action: "view" },
  "PUT /api/v1/admin/invoice/:id": { module: "invoice", action: "update" },
  "PATCH /api/v1/admin/invoice/:id": { module: "invoice", action: "update" },
  "DELETE /api/v1/admin/invoice/:id": { module: "invoice", action: "delete" },

  // ================= WIDE BANNER =================
  "POST /api/v1/admin/home-page-banner": { module: "wideBanner", action: "add" },
  "GET /api/v1/admin/home-page-banner": { module: "wideBanner", action: "view" },
  "GET /api/v1/admin/home-page-banner/:id": { module: "wideBanner", action: "view" },
  "PUT /api/v1/admin/home-page-banner/:id": { module: "wideBanner", action: "update" },
  "PATCH /api/v1/admin/home-page-banner/:id": { module: "wideBanner", action: "update" },
  "DELETE /api/v1/admin/home-page-banner/:id": { module: "wideBanner", action: "delete" },

  // ================= PRODUCT SERVICE =================
  "POST /api/v1/admin/home-page-service": { module: "productService", action: "add" },
  "GET /api/v1/admin/home-page-service": { module: "productService", action: "view" },
  "GET /api/v1/admin/home-page-service/:id": { module: "productService", action: "view" },
  "PUT /api/v1/admin/home-page-service/:id": { module: "productService", action: "update" },
  "PATCH /api/v1/admin/home-page-service/:id": { module: "productService", action: "update" },
  "DELETE /api/v1/admin/home-page-service/:id": { module: "productService", action: "delete" },

  // ================= FRONT BANNER =================
  "POST /api/v1/admin/home-page-slider": { module: "frontBanner", action: "add" },
  "GET /api/v1/admin/home-page-slider": { module: "frontBanner", action: "view" },
  "GET /api/v1/admin/home-page-slider/:id": { module: "frontBanner", action: "view" },
  "PUT /api/v1/admin/home-page-slider/:id": { module: "frontBanner", action: "update" },
  "PATCH /api/v1/admin/home-page-slider/:id": { module: "frontBanner", action: "update" },
  "DELETE /api/v1/admin/home-page-slider/:id": { module: "frontBanner", action: "delete" },

  // ================= GI IMPACT =================
  "POST /api/v1/admin/impact": { module: "giImpact", action: "add" },
  "GET /api/v1/admin/impact": { module: "giImpact", action: "view" },
  "GET /api/v1/admin/impact/:id": { module: "giImpact", action: "view" },
  "PUT /api/v1/admin/impact/:id": { module: "giImpact", action: "update" },
  "PATCH /api/v1/admin/impact/:id": { module: "giImpact", action: "update" },
  "DELETE /api/v1/admin/impact/:id": { module: "giImpact", action: "delete" },

  // ================= CONTACT ENQUIRY =================
  "POST /api/v1/admin/contact-enquiry": { module: "contactEnquiry", action: "add" },
  "GET /api/v1/admin/contact-enquiry": { module: "contactEnquiry", action: "view" },
  "GET /api/v1/admin/contact-enquiry/:id": { module: "contactEnquiry", action: "view" },
  "PUT /api/v1/admin/contact-enquiry/:id": { module: "contactEnquiry", action: "update" },
  "PATCH /api/v1/admin/contact-enquiry/:id": { module: "contactEnquiry", action: "update" },
  "DELETE /api/v1/admin/contact-enquiry/:id": { module: "contactEnquiry", action: "delete" },

  // ================= JOB =================
  "POST /api/v1/admin/job-posting": { module: "job", action: "add" },
  "GET /api/v1/admin/job-posting": { module: "job", action: "view" },
  "GET /api/v1/admin/job-posting/:id": { module: "job", action: "view" },
  "PUT /api/v1/admin/job-posting/:id": { module: "job", action: "update" },
  "PATCH /api/v1/admin/job-posting/:id": { module: "job", action: "update" },
  "DELETE /api/v1/admin/job-posting/:id": { module: "job", action: "delete" },

  // ================= RESUME =================
  "POST /api/v1/admin/job-application": { module: "resume", action: "add" },
  "GET /api/v1/admin/job-application": { module: "resume", action: "view" },
  "GET /api/v1/admin/job-application/:id": { module: "resume", action: "view" },
  "PUT /api/v1/admin/job-application/:id": { module: "resume", action: "update" },
  "PATCH /api/v1/admin/job-application/:id": { module: "resume", action: "update" },
  "DELETE /api/v1/admin/job-application/:id": { module: "resume", action: "delete" },

  // ================= CUSTOMER SUPPORT =================
  "POST /api/v1/admin/support-ticket": { module: "customerSupport", action: "add" },
  "GET /api/v1/admin/support-ticket": { module: "customerSupport", action: "view" },
  "GET /api/v1/admin/support-ticket/:id": { module: "customerSupport", action: "view" },
  "PUT /api/v1/admin/support-ticket/:id": { module: "customerSupport", action: "update" },
  "PATCH /api/v1/admin/support-ticket/:id": { module: "customerSupport", action: "update" },
  "DELETE /api/v1/admin/support-ticket/:id": { module: "customerSupport", action: "delete" },

  // ================= PROVIDER SUPPORT =================
  "POST /api/v1/admin/support-ticket": { module: "providerSupport", action: "add" },
  "GET /api/v1/admin/support-ticket": { module: "providerSupport", action: "view" },
  "GET /api/v1/admin/support-ticket/:id": { module: "providerSupport", action: "view" },
  "PUT /api/v1/admin/support-ticket/:id": { module: "providerSupport", action: "update" },
  "PATCH /api/v1/admin/support-ticket/:id": { module: "providerSupport", action: "update" },
  "DELETE /api/v1/admin/support-ticket/:id": { module: "providerSupport", action: "delete" },

  // ================= META TAG =================
  "POST /api/v1/admin/meta-tag": { module: "metaTag", action: "add" },
  "GET /api/v1/admin/meta-tag": { module: "metaTag", action: "view" },
  "GET /api/v1/admin/meta-tag/:id": { module: "metaTag", action: "view" },
  "PUT /api/v1/admin/meta-tag/:id": { module: "metaTag", action: "update" },
  "PATCH /api/v1/admin/meta-tag/:id": { module: "metaTag", action: "update" },
  "DELETE /api/v1/admin/meta-tag/:id": { module: "metaTag", action: "delete" },
};

export default permissionMap;





