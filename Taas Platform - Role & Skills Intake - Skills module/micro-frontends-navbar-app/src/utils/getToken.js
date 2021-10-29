import store from "../store";
import { getFreshToken, isTokenExpired } from "tc-auth-lib";
const logger = console;

export const getToken = () => {
  return new Promise((resolve, reject) => {
    const userState = store.getState().loadUser;
    const token = userState && userState.user ? userState.user.token : null;
    if (token && !isTokenExpired(token)) {
      return resolve(token);
    } else {
      return getFreshToken()
        .then((token) => {
          resolve(token);
        })
        .catch((err) => {
          logger.log(err);
          reject(err);
        });
    }
  });
};
