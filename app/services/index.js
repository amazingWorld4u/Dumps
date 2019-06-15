import "./config";
import axios from "axios";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

/**
 * Api call generic function.
 */
export default function Service(config) {
  return axios(config);
}

/**
 * Customizing axios success and error
 * data to easily handle them.
 */
axios.interceptors.response.use(
  response => {
    if (response.data.success == false) {
      return Promise.reject(handleApiError(response.data));
    } else {
      return response;
    }
  },
  error => {
    return Promise.reject(handleApiError(error.response.data));
  }
);

//Handling Api error messages.
const handleApiError = data => {
  if (data.message) {
    return data.message;
  } else {
    return "Oops! something went wrong.";
  }
};

export function facebookLogin(successCallBack, failCallBack) {
  LoginManager.logOut();
  LoginManager.logInWithReadPermissions(["public_profile", "email"])
    .then(permission => {
      if (!permission.isCancelled) {
        AccessToken.getCurrentAccessToken()
          .then(data => {
            successCallBack();
          })
          .catch(err => {
            failCallBack();
          });
      } else {
        failCallBack();
      }
    })
    .catch(error => {
      failCallBack();
    });
}

export async function googleLogin(successCallBack, failCallBack) {
  await GoogleSignin.configure();
  GoogleSignin.signIn()
    .then(data => {
      successCallBack();
    })
    .catch(error => {
      failCallBack();
    });
}
