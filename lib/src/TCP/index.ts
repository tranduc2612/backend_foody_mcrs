export const TCP_MESSAGES = {
  AUTH_SERVICE: {
    LOGIN_USER: "login-user",
    REGISTER_USER: "register-user",
    REFRESH_TOKEN: 'refresh-token'
  },
  USER_SERVICE: {
    GET_LIST_USER_BY_LIST_ID: "get-list-user-by-list-id",
    GET_LIST_USER: "get-list-user",
    CREATE_USER: "create-user",
    GET_USER: "get-user",
  },
  RECIPES_SERVICE: {
    GET_LIST_RECIPES: "get-list-recipes",
    GET_RECIPES: "get-recipes",
    CREATE_RECIPES: "create-recipes",
    UPDATE_RECIPES: "update-recipes",
    DELETE_RECIPES: "delete-recipes"
  }
};

export const TCP_SERVICES_KEYS = {
  AUTH_SERVICE_KEY: "AUTH_SERVICE_KEY",
  USER_SERVICE_KEY: "USER_SERVICE_KEY",
  RECIPES_SERVICE_KEY: "RECIPES_SERVICE_KEY",
};
