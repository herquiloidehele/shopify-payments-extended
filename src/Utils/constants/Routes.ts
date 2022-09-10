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
    BIM: "/home/bim-config",
    PONTO24: "/home/ponto-24-config",
  },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    VALIDATE_SESSION: "/auth/validate-session",
  },
};
