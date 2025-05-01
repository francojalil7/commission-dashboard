export const CRM_NAMES = {
  A: "CRM_A",
  B: "CRM_B",
} as const;

export type CrmName = (typeof CRM_NAMES)[keyof typeof CRM_NAMES];
