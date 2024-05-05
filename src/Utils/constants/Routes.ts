export const APP_ROUTES = {
  PUBLIC: {
    ROOT: "/",
    LOGIN: "/login",
  },
  PRIVATE: {
    DASHBOARD: "/home",
    HOME: "/home/dashboard",
    PAYMENTS: "/home/payments",
    MPESA: "/home/mpesa-config",
    SETTINGS: "/home/account-settings",
    USERS: "/home/users",
    STORES: "/home/stores",
    SUBSCRIPTIONS: "/home/subscriptions",
    BIM: "/home/bim-config",
    PONTO24: "/home/ponto-24-config",
  },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    VALIDATE_SESSION: "/auth/validate-session",
    USERS_LIST: "/auth/users-list",
  },
  USER: {
    CREATE: "/auth/register",
    DELETE: (userId: string) => `/auth/delete-user/${userId}`,
    EDIT: "/auth/edit-user",
  },
  PACKAGES: {
    LIST: "/packages",
  },
  SUBSCRIPTIONS: {
    LIST: "/subscriptions",
    CREATE: "/subscriptions",
    DELETE: (subscriptionId: string) => `/subscriptions/${subscriptionId}`,
    CURRENT: "/subscriptions/current",
  },
};
