export default class AccessToken {
  private static instance: AccessToken;
  private static token: string;
  private static refreshToken: string;

  private constructor() {
    AccessToken.instance = new AccessToken();
  }

  public static getInstance(): AccessToken {
    if (!AccessToken.instance) {
      AccessToken.instance = new AccessToken();
    }

    return AccessToken.instance;
  }

  public static getToken() {
    return AccessToken.token;
  }

  public static setToken(token: string, refreshToken: string) {
    AccessToken.token = token;
    AccessToken.refreshToken = refreshToken;
  }

  public static getRefreshToken() {
    return AccessToken.refreshToken;
  }

  public static clearToken() {
    AccessToken.token = "";
    AccessToken.refreshToken = "";
  }
}
