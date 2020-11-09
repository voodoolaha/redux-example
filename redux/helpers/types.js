// @flow
import { type TAlertType } from "../reducers/alert";


export type TShowAlertProps = {
  content: string;
  type: TAlertType;
  duration?: number;
}
