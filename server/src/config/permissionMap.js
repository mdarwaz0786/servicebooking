const permissionMap = {
  "GET /api/v1/admin/role": { module: "role", action: "view" },
  "POST /api/v1/admin/role": { module: "role", action: "add" },
  "PUT /api/v1/admin/role/:id": { module: "role", action: "update" },
  "PATCH /api/v1/admin/role/:id": { module: "role", action: "update" },
  "DELETE /api/v1/admin/role/:id": { module: "role", action: "delete" },

  "GET /api/v1/admin/sub-admin": { module: "user", action: "view" },
  "POST /api/v1/admin/sub-admin": { module: "user", action: "add" },
  "PUT /api/v1/admin/sub-admin/:id": { module: "user", action: "update" },
  "PATCH /api/v1/admin/sub-admin/:id": { module: "user", action: "update" },
  "DELETE /api/v1/admin/sub-admin/:id": { module: "user", action: "delete" },

  "GET /api/v1/admin/category": { module: "product", action: "view" },
  "POST /api/v1/admin/category": { module: "product", action: "add" },
  "PUT /api/v1/admin/category/:id": { module: "product", action: "update" },
  "PATCH /api/v1/admin/category/:id": { module: "product", action: "update" },
  "DELETE /api/v1/admin/category/:id": { module: "product", action: "delete" },

  "GET /api/v1/admin/sub-category": { module: "variant", action: "view" },
  "POST /api/v1/admin/sub-category": { module: "variant", action: "add" },
  "PUT /api/v1/admin/sub-category/:id": { module: "variant", action: "update" },
  "PATCH /api/v1/admin/sub-category/:id": { module: "variant", action: "update" },
  "DELETE /api/v1/admin/sub-category/:id": { module: "variant", action: "delete" },

  "GET /api/v1/admin/sub-sub-category": { module: "serviceProcess", action: "view" },
  "POST /api/v1/admin/sub-sub-category": { module: "serviceProcess", action: "add" },
  "PUT /api/v1/admin/sub-sub-category/:id": { module: "serviceProcess", action: "update" },
  "PATCH /api/v1/admin/sub-sub-category/:id": { module: "serviceProcess", action: "update" },
  "DELETE /api/v1/admin/sub-sub-category/:id": { module: "serviceProcess", action: "delete" },

  "GET /api/v1/admin/sub-sub-sub-category": { module: "nestedServiceProcess", action: "view" },
  "POST /api/v1/admin/sub-sub-sub-category": { module: "nestedServiceProcess", action: "add" },
  "PUT /api/v1/admin/sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "update" },
  "PATCH /api/v1/admin/sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "update" },
  "DELETE /api/v1/admin/sub-sub-sub-category/:id": { module: "nestedServiceProcess", action: "delete" },

  "GET /api/v1/admin/service": { module: "service", action: "view" },
  "POST /api/v1/admin/service": { module: "service", action: "add" },
  "PUT /api/v1/admin/service/:id": { module: "service", action: "update" },
  "PATCH /api/v1/admin/service/:id": { module: "service", action: "update" },
  "DELETE /api/v1/admin/service/:id": { module: "service", action: "delete" },

  "GET /api/v1/admin/product-store": { module: "productStore", action: "view" },
  "POST /api/v1/admin/product-store": { module: "productStore", action: "add" },
  "PUT /api/v1/admin/product-store/:id": { module: "productStore", action: "update" },
  "PATCH /api/v1/admin/product-store/:id": { module: "productStore", action: "update" },
  "DELETE /api/v1/admin/product-store/:id": { module: "productStore", action: "delete" },

  "GET /api/v1/admin/city": { module: "city", action: "view" },
  "POST /api/v1/admin/city": { module: "city", action: "add" },
  "PUT /api/v1/admin/city/:id": { module: "city", action: "update" },
  "PATCH /api/v1/admin/city/:id": { module: "city", action: "update" },
  "DELETE /api/v1/admin/city/:id": { module: "city", action: "delete" },

  "GET /api/v1/admin/zone": { module: "zone", action: "view" },
  "POST /api/v1/admin/zone": { module: "zone", action: "add" },
  "PUT /api/v1/admin/zone/:id": { module: "zone", action: "update" },
  "PATCH /api/v1/admin/zone/:id": { module: "zone", action: "update" },
  "DELETE /api/v1/admin/zone/:id": { module: "zone", action: "delete" },

  "GET /api/v1/admin/pincode": { module: "pincode", action: "view" },
  "POST /api/v1/admin/pincode": { module: "pincode", action: "add" },
  "PUT /api/v1/admin/pincode/:id": { module: "pincode", action: "update" },
  "PATCH /api/v1/admin/pincode/:id": { module: "pincode", action: "update" },
  "DELETE /api/v1/admin/pincode/:id": { module: "pincode", action: "delete" },

  "GET /api/v1/admin/time-slot": { module: "timeSlot", action: "view" },
  "POST /api/v1/admin/time-slot": { module: "timeSlot", action: "add" },
  "PUT /api/v1/admin/time-slot/:id": { module: "timeSlot", action: "update" },
  "PATCH /api/v1/admin/time-slot/:id": { module: "timeSlot", action: "update" },
  "DELETE /api/v1/admin/time-slot/:id": { module: "timeSlot", action: "delete" },

  "GET /api/v1/admin/user": { module: "user", action: "view" },
  "PUT /api/v1/admin/user/:id": { module: "user", action: "update" },
  "PATCH /api/v1/admin/user/:id": { module: "user", action: "update" },
  "DELETE /api/v1/admin/user/:id": { module: "user", action: "delete" },

  "GET /api/v1/admin/blog-category": { module: "blogCategory", action: "view" },
  "POST /api/v1/admin/blog-category": { module: "blogCategory", action: "add" },
  "PUT /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "update" },
  "PATCH /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "update" },
  "DELETE /api/v1/admin/blog-category/:id": { module: "blogCategory", action: "delete" },

  "GET /api/v1/admin/blog": { module: "blog", action: "view" },
  "POST /api/v1/admin/blog": { module: "blog", action: "add" },
  "PUT /api/v1/admin/blog/:id": { module: "blog", action: "update" },
  "PATCH /api/v1/admin/blog/:id": { module: "blog", action: "update" },
  "DELETE /api/v1/admin/blog/:id": { module: "blog", action: "delete" },

  "GET /api/v1/admin/invoice": { module: "invoice", action: "view" }
};

export default permissionMap;
