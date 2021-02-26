import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { VERCEL_GITHUB_COMMIT_REF } = publicRuntimeConfig;
export const SHOW_BREADCRUMBS = false;

export const placeholder = process.env.PLACEHOLDER ?? null;

export const UNIQUE_IDENTIFIERS_IN_MODIFIER_OPTIONS = [
  "materialName",
  "unityLightGameObjectName",
];

export const STORAGE_ORG_FOLDER = "ORGANIZATIONS";
export const STORAGE_USER_FOLDER = "USERS";

// V1.01 = new way of handling sizes and dimensions of snapshot
// export const SNAPSHOT_VERSION = "aces";
export const SNAPSHOT_VERSION = "1.1";

export const HELP_PAGE_URL =
  "https://zerolens.com/university-post/first-steps?utm_source=app&utm_medium=help_button&utm_campaign=help";

export const NO_IMAGE_STORAGE_REF = "GLOBALS/noImage.jpg";

export const MAX_UPLOAD_FILE_SIZE_PRODUCTS_W_O_COMPRESSION = 5242880;

export const UPDATE_TASK_INTERVALL_IN_SECONDS = 5;
export const MAX_COMPRESSED_FILE_SIZE_IN_MB = 18;

export const PAGE_LINKS = {
  NOTIFICATIONS: "/account/notifications",
  INVITE_TEAM_MEMBER: "/account/members",
};

export const DEFAULT_PHOTO_PREVIEW =
  "https://firebasestorage.googleapis.com/v0/b/zerolens-dev.appspot.com/o/GLOBALS%2Fno_preview_available_gray.jpg?alt=media&token=4e4c11df-4b13-4feb-989a-fed015c85344";

export const ZEROLENS_OID = "vEpjGTXXWp54zck9w2lE";

export const DEFAULT_MATERIAL_PREVIEW_BALL_REF =
  "materials%2FssEZXHvfM5VpRl4fDmWj%2Fpaper%20structured%20fine%20matt.png";
export const NUMBER_OF_DOCS_TO_FETCH_EACH_TIME = 10;

export const MaterialUVChannels: Array<{ value: string; label: string }> = [
  { value: "-1", label: "zerolens" },
  { value: "0", label: "Object Default" },
  { value: "1", label: "Object Secondary" },
];

export const defaultWhitePreviewIndex = "#f5f5f5";

export const publicConfig = {
  prod: {
    IMGIX_URL: "https://zerolens-prod.imgix.net",
    stripe: {
      PUBLISHABLE_KEY: "pk_live_omqshk433kpTpF5yUYjSGOyW00RTINPAAn",
      STARTER_PLAN: "prod_IiSSm8l1u7yGV8",
      GROWTH_PLAN: "prod_IiSSJooLXgDHmn",
      ENTERPRISE_PLAN: "prod_IiSSY8GW41Lx5f",
    },
    firebase: {
      apiKey: "AIzaSyCeVUCX_TdwRy-ujBApaDBuae4Fkfh5rxI",
      authDomain: "zerolens-prod.firebaseapp.com",
      projectId: "zerolens-prod",
      storageBucket: "zerolens-prod.appspot.com",
      messagingSenderId: "115385468899",
      appId: "1:115385468899:web:1caffddb542657e520c2d6",
      measurementId: "G-E9RB9RQW2N",
    },
    segment: {
      API_KEY: "X3FGu8TDDeG7rOgY2fO89ZDbxCtPmL7v",
    },
    unity: { FIREBASE_PATH: "unity-build-production" },
    algolia: {
      NEXT_PUBLIC_ALGOLIA_FEED: "PROD_zerolens_feed_nextjs",
      NEXT_PUBLIC_ALGOLIA_OBJECTS: "PROD_zerolens_objects_nextjs",
      NEXT_PUBLIC_ALGOLIA_MATERIALS:
        "PROD_prod_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS:
        "PROD_prod_zerolens_onboarding_materials",
      NEXT_PUBLIC_ALGOLIA_FEED_DEV: "PROD_zerolens_feed_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_OBJECTS_DEV: "PROD_zerolens_objects_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_MATERIALS_DEV:
        "PROD_dev_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS_DEV:
        "PROD_dev_zerolens_onboarding_materials",
    },
  },
  preview: {
    IMGIX_URL: "https://zerolens-prod.imgix.net",
    stripe: {
      PUBLISHABLE_KEY: "pk_live_omqshk433kpTpF5yUYjSGOyW00RTINPAAn",
      STARTER_PLAN: "prod_IiSSm8l1u7yGV8",
      GROWTH_PLAN: "prod_IiSSJooLXgDHmn",
      ENTERPRISE_PLAN: "prod_IiSSY8GW41Lx5f",
    },
    firebase: {
      apiKey: "AIzaSyCeVUCX_TdwRy-ujBApaDBuae4Fkfh5rxI",
      authDomain: "zerolens-prod.firebaseapp.com",
      projectId: "zerolens-prod",
      storageBucket: "zerolens-prod.appspot.com",
      messagingSenderId: "115385468899",
      appId: "1:115385468899:web:1caffddb542657e520c2d6",
      measurementId: "G-E9RB9RQW2N",
    },
    segment: {
      API_KEY: "v1EjlI6PxCFUS2ntBDyJwy4gVE0owTkH",
    },
    unity: { FIREBASE_PATH: "unity-build-development" },
    algolia: {
      NEXT_PUBLIC_ALGOLIA_FEED: "PROD_zerolens_feed_nextjs",
      NEXT_PUBLIC_ALGOLIA_OBJECTS: "PROD_zerolens_objects_nextjs",
      NEXT_PUBLIC_ALGOLIA_MATERIALS:
        "PROD_prod_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS:
        "PROD_prod_zerolens_onboarding_materials",
      NEXT_PUBLIC_ALGOLIA_FEED_DEV: "PROD_zerolens_feed_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_OBJECTS_DEV: "PROD_zerolens_objects_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_MATERIALS_DEV:
        "PROD_dev_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS_DEV:
        "PROD_dev_zerolens_onboarding_materials",
    },
  },
  dev: {
    IMGIX_URL: "https://zerolens-dev.imgix.net",
    stripe: {
      // TODO: This is better than getting name etc. by retrieving plan id, also refactor PlanChooser to use context (plan)
      // plans: {
      //   STARTER: {
      //     name: "Starter",
      //     id: "prod_HmdsvxauTiqXAC",
      //     baseFee: 149,
      //   },
      //   GROWTH: {
      //     name: "Growth",
      //     id: "prod_HmdtZi7sCSk6FR",
      //     baseFee: 249,
      //   },
      //   ENTERPRISE: {
      //     name: "Enterprise",
      //     id: "prod_Hme0Rmbf5EczGq",
      //     baseFee: 599,
      //   },
      // },
      PUBLISHABLE_KEY: "pk_test_DSbYzKVo6ozcSWnbOhT3BbCC00TfFigW5H",
      STARTER_PLAN: "prod_HmdsvxauTiqXAC",
      GROWTH_PLAN: "prod_HmdtZi7sCSk6FR",
      ENTERPRISE_PLAN: "prod_Hme0Rmbf5EczGq",
    },
    firebase: {
      apiKey: "AIzaSyB8wIgidyADisXEn4eYLRPvF4TKWu08FdI",
      authDomain: "zerolens-dev.firebaseapp.com",
      databaseURL: "https://zerolens-dev.firebaseio.com",
      projectId: "zerolens-dev",
      storageBucket: "zerolens-dev.appspot.com",
      messagingSenderId: "681699389211",
      appId: "1:681699389211:web:ccd419c43ee6124b37edbe",
      measurementId: "G-818V3H8MB0",
    },
    segment: {
      API_KEY: "v1EjlI6PxCFUS2ntBDyJwy4gVE0owTkH",
    },
    unity: { FIREBASE_PATH: "unity-build-development" },
    algolia: {
      NEXT_PUBLIC_ALGOLIA_FEED: "zerolens_feed_nextjs",
      NEXT_PUBLIC_ALGOLIA_OBJECTS: "zerolens_objects_nextjs",
      NEXT_PUBLIC_ALGOLIA_MATERIALS: "prod_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS:
        "prod_zerolens_onboarding_materials",
      NEXT_PUBLIC_ALGOLIA_FEED_DEV: "zerolens_feed_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_OBJECTS_DEV: "zerolens_objects_nextjs_dev",
      NEXT_PUBLIC_ALGOLIA_MATERIALS_DEV: "dev_zerolens_materials_texture_based",
      NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS_DEV:
        "dev_zerolens_onboarding_materials",
    },
  },
};

export const sendToRapidCompactIfLargerThanInMb = 3;
export function getPublicConfig() {
  return publicConfig[
    process.env.NEXT_PUBLIC_CONFIG_MODE as "prod" | "dev" | "preview"
  ];
}

// This function is not how it should be, instead use a plan data object and retrieve it by id
export function planIdToPlanData(planId: string) {
  const config = getPublicConfig();

  let planData = {
    name: "",
    baseFee: 0,
  };

  switch (planId) {
    case config.stripe.STARTER_PLAN:
      planData = {
        name: "Starter",
        baseFee: 149,
      };
      break;
    case config.stripe.GROWTH_PLAN:
      planData = {
        name: "Growth",
        baseFee: 249,
      };
      break;
    case config.stripe.ENTERPRISE_PLAN:
      planData = {
        name: "Enterprise",
        baseFee: 599,
      };
      break;

    default:
      break;
  }

  return planData;
}

export const NEXT_PUBLIC_IMGIX_URL = getPublicConfig().IMGIX_URL;
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = getPublicConfig().stripe
  .PUBLISHABLE_KEY;
export const NEXT_PUBLIC_STRIPE_ENTERPRISE_ID = getPublicConfig().stripe
  .ENTERPRISE_PLAN;
export const NEXT_PUBLIC_STRIPE_STARTER_ID = getPublicConfig().stripe
  .STARTER_PLAN;
export const NEXT_PUBLIC_STRIPE_GROWTH_ID = getPublicConfig().stripe
  .GROWTH_PLAN;
export const NEXT_PUBLIC_SEGEMENT_API_KEY = getPublicConfig().segment.API_KEY;

export const { NEXT_PUBLIC_ALGOLIA_FEED } = getPublicConfig().algolia;
export const { NEXT_PUBLIC_ALGOLIA_OBJECTS } = getPublicConfig().algolia;
export const { NEXT_PUBLIC_ALGOLIA_MATERIALS } = getPublicConfig().algolia;
export const {
  NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS,
} = getPublicConfig().algolia;
export const { NEXT_PUBLIC_ALGOLIA_FEED_DEV } = getPublicConfig().algolia;
export const { NEXT_PUBLIC_ALGOLIA_OBJECTS_DEV } = getPublicConfig().algolia;
export const { NEXT_PUBLIC_ALGOLIA_MATERIALS_DEV } = getPublicConfig().algolia;
export const {
  NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS_DEV,
} = getPublicConfig().algolia;

export const NEXT_PUBLIC_GITHUB_BRANCH_FOR_DEV = "quality_check";
export const GITHUB_REF = VERCEL_GITHUB_COMMIT_REF;

export const IS_QA_ENVIRONMENT =
  GITHUB_REF === NEXT_PUBLIC_GITHUB_BRANCH_FOR_DEV; // change
// export const IS_QA_ENVIRONMENT = true;

export const ALGOLIA_FEED = IS_QA_ENVIRONMENT
  ? NEXT_PUBLIC_ALGOLIA_FEED_DEV
  : NEXT_PUBLIC_ALGOLIA_FEED;

export const ALGOLIA_OBJECTS = IS_QA_ENVIRONMENT
  ? NEXT_PUBLIC_ALGOLIA_OBJECTS_DEV
  : NEXT_PUBLIC_ALGOLIA_OBJECTS;

export const ALGOLIA_MATERIALS = IS_QA_ENVIRONMENT
  ? NEXT_PUBLIC_ALGOLIA_MATERIALS_DEV
  : NEXT_PUBLIC_ALGOLIA_MATERIALS;

export const ALGOLIA_ONBOARDING_MATERIALS = IS_QA_ENVIRONMENT
  ? NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS_DEV
  : NEXT_PUBLIC_ALGOLIA_ONBOARDING_MATERIALS;
