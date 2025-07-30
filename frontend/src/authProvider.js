import { MsalAuthProvider, LoginType } from 'react-aad-msal'
import { Logger, LogLevel } from 'msal'

export const authProvider = new MsalAuthProvider(
  {
    auth: {
      authority:
        'https://login.microsoftonline.com/ccf4e4a8-f0a6-46f2-80ff-cbe92c1ed943',
      clientId: 'd63922d8-e013-4231-9e54-1d8638a05f1b',
      postLogoutRedirectUri: `https://${process.env.REACT_APP_HOST}:3000/`,
      redirectUri: `https://${process.env.REACT_APP_HOST}:3000/`,
      validateAuthority: true,
      // After being redirected to the "redirectUri" page, should user
      // be redirected back to the Url where their login originated from?
      navigateToLoginRequestUrl: true,
    },
    system: {
      logger: new Logger(
        (logLevel, message, containsPii) => {
          console.log('[MSAL]', message)
        },
        {
          level: LogLevel.Verbose,
          piiLoggingEnabled: false,
        }
      ),
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  },
  // Authentication Parameters
  {
    scopes: [
      'openid',
      'profile',
      'user.read',
      'api://d63922d8-e013-4231-9e54-1d8638a05f1b/read',
    ],
  },
  // Options
  {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + '/auth.html',
  }
)
