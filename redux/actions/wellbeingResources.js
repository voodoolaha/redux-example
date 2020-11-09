// @flow

import { type TFormData } from "../../pages/WellbeingContent/components/ResourcePopup/types";
import { type TWellbeingResource } from "../../interface/wellbeingResource";
import {
  FETCH_RESOURCE_LIST_ASYNC,
  CREATE_RESOURCE_ASYNC,
  EDIT_RESOURCE_ASYNC,
  OPEN_RESOURCE_POPUP,
  CLOSE_RESOURCE_POPUP,
  DELETE_RESOURCE_ASYNC,
  type TFetchResourceListAction,
  type TCreateResourceAction,
  type TEditResourceAction,
  type TDeleteResourceAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/wellbeingResources";


export const fetchResourceListAsync = (): TFetchResourceListAction => ({
  type: FETCH_RESOURCE_LIST_ASYNC,
});

export const createResourceAsync = (resource: TFormData): TCreateResourceAction => ({
  type: CREATE_RESOURCE_ASYNC,
  payload: { resource },
});

export const editResourceAsync = (resource: TFormData): TEditResourceAction => ({
  type: EDIT_RESOURCE_ASYNC,
  payload: { resource },
});

export const deleteResourceAsync = (id: number): TDeleteResourceAction => ({
  type: DELETE_RESOURCE_ASYNC,
  payload: { id },
});

export const openPopup = (resource?: TWellbeingResource): TOpenPopupAction => ({
  type: OPEN_RESOURCE_POPUP,
  payload: { resource: resource || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_RESOURCE_POPUP,
});
