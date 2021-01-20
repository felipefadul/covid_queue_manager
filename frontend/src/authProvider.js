// authProvider.js
import { MsalAuthProvider, LoginType } from "react-aad-msal";
// Msal Configurations
export const authProvider = new MsalAuthProvider(
  {
    auth: {
      authority:
        "https://login.microsoftonline.com/ccf4e4a8-f0a6-46f2-80ff-cbe92c1ed943",
      clientId: "d63922d8-e013-4231-9e54-1d8638a05f1b",
      postLogoutRedirectUri: window.location.origin,
      redirectUri: "https://localhost:3000/",
      validateAuthority: true,
      // After being redirected to the "redirectUri" page, should user
      // be redirected back to the Url where their login originated from?
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  },
  // Authentication Parameters
  {
    scopes: ["openid"]
  },
  // Options
  {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + "/auth.html"
  }
);
