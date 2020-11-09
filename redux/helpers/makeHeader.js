// @flow

const tryGetToken = ():string => localStorage.getItem("token") || "";

export const makeHeader = (token: string = "") => ({
  headers: {
    Authorization: `bearer ${token || tryGetToken()}`,
  },
});
