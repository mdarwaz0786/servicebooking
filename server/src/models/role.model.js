import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  add: {
    type: Boolean,
    default: false,
  },
  view: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, "Role name is required."],
    unique: [true, "Role name must be unique."],
  },
  departmentName: {
    type: String,
    required: [true, "Department is required."],
  },
  permissions: {
    role: {
      type: PermissionSchema,
      default: () => ({}),
    },
    product: {
      type: PermissionSchema,
      default: () => ({}),
    },
    variant: {
      type: PermissionSchema,
      default: () => ({}),
    },
    serviceProcess: {
      type: PermissionSchema,
      default: () => ({}),
    },
    nestedServiceProcess: {
      type: PermissionSchema,
      default: () => ({}),
    },
    productStore: {
      type: PermissionSchema,
      default: () => ({}),
    },
    timeSlot: {
      type: PermissionSchema,
      default: () => ({}),
    },
    brand: {
      type: PermissionSchema,
      default: () => ({}),
    },
    city: {
      type: PermissionSchema,
      default: () => ({}),
    },
    zone: {
      type: PermissionSchema,
      default: () => ({}),
    },
    pincode: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerAppSupport: {
      type: PermissionSchema,
      default: () => ({}),
    },
    mobileAppInfo: {
      type: PermissionSchema,
      default: () => ({}),
    },
    serviceIncluded: {
      type: PermissionSchema,
      default: () => ({}),
    },
    requirementFromCustomer: {
      type: PermissionSchema,
      default: () => ({}),
    },
    whyChooseUs: {
      type: PermissionSchema,
      default: () => ({}),
    },
    expertTechnician: {
      type: PermissionSchema,
      default: () => ({}),
    },
    brandLogo: {
      type: PermissionSchema,
      default: () => ({}),
    },
    giPromise: {
      type: PermissionSchema,
      default: () => ({}),
    },
    faq: {
      type: PermissionSchema,
      default: () => ({}),
    },
    rateCard: {
      type: PermissionSchema,
      default: () => ({}),
    },
    user: {
      type: PermissionSchema,
      default: () => ({}),
    },
    customer: {
      type: PermissionSchema,
      default: () => ({}),
    },
    provider: {
      type: PermissionSchema,
      default: () => ({}),
    },
    earning: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerEarning: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerProfile: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerKyc: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerTraining: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerTrainingScheduleSubmit: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerWallet: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerCashcollected: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerInsurance: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerCertificate: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerNotification: {
      type: PermissionSchema,
      default: () => ({}),
    },
    activeBooking: {
      type: PermissionSchema,
      default: () => ({}),
    },
    cancelBooking: {
      type: PermissionSchema,
      default: () => ({}),
    },
    completeBooking: {
      type: PermissionSchema,
      default: () => ({}),
    },
    customerPayment: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerPayment: {
      type: PermissionSchema,
      default: () => ({}),
    },
    invoice: {
      type: PermissionSchema,
      default: () => ({}),
    },
    wideBanner: {
      type: PermissionSchema,
      default: () => ({}),
    },
    productService: {
      type: PermissionSchema,
      default: () => ({}),
    },
    frontBanner: {
      type: PermissionSchema,
      default: () => ({}),
    },
    blogCategory: {
      type: PermissionSchema,
      default: () => ({}),
    },
    blog: {
      type: PermissionSchema,
      default: () => ({}),
    },
    termsAndCondition: {
      type: PermissionSchema,
      default: () => ({}),
    },
    privacyPolicy: {
      type: PermissionSchema,
      default: () => ({}),
    },
    refundPolicy: {
      type: PermissionSchema,
      default: () => ({}),
    },
    disclaimer: {
      type: PermissionSchema,
      default: () => ({}),
    },
    giImpact: {
      type: PermissionSchema,
      default: () => ({}),
    },
    contactEnquiry: {
      type: PermissionSchema,
      default: () => ({}),
    },
    job: {
      type: PermissionSchema,
      default: () => ({}),
    },
    resume: {
      type: PermissionSchema,
      default: () => ({}),
    },
    customerSupport: {
      type: PermissionSchema,
      default: () => ({}),
    },
    providerSupport: {
      type: PermissionSchema,
      default: () => ({}),
    },
    metaTag: {
      type: PermissionSchema,
      default: () => ({}),
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);

export default Role;