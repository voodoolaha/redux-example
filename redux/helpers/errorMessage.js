// @flow

// $FlowFixMe
import { AxiosError } from "axios";


export const getErrorMessage = (error: AxiosError): string => {
  /**
   * The request was made and the server responded with a
   * status code that falls out of the range of 2xx
   */
  if (error.response && error.response.data) {
    if (typeof error.response.data === "string") {
      return error.response.data;
    }

    return error.response.data.error || error.message;
  }
  /**
   * The request was made but no response was received, `error.request`
   */
  if (error.request && error.request.statusText) {
    return error.request.statusText;
  }
  if (error.request) {
    return typeof error.request === "string" ? error.request : error.message;
  }
  /**
   * Something happened in setting up the request and triggered an Error
   */
  return error.message;
};
