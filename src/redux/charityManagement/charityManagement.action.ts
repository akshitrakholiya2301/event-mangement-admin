import { RooteAction } from "../store";
import { DELETE_CHARITY_FAILURE, DELETE_CHARITY_SUCESS, GET_BLOG_DROP_DOWN_DATA_FAILURE, GET_BLOG_DROP_DOWN_DATA_SUCCESS, GET_CHARITY_LIST_FAILURE, GET_CHARITY_LIST_RESET, GET_CHARITY_LIST_SUCCESS, GET_PUBLISHER_DROP_DOWN_DATA_FAILURE, GET_PUBLISHER_DROP_DOWN_DATA_SUCCESS, GET_REQUESTED_BY_DROP_DOWN_DATA_FAILURE, GET_REQUESTED_BY_DROP_DOWN_DATA_SUCCESS, GET_TAG_DROP_DOWN_DATA_FAILURE, GET_TAG_DROP_DOWN_DATA_SUCCESS, UPDATE_CHARITY_DATA_FAILURE, UPDATE_CHARITY_DATA_SUCCESS, UPDATE_CHARITY_STATUS_FAILURE, UPDATE_CHARITY_STATUS_SUCCESS } from "./charityManagement.type";

/**
 * Action creator function to dispatch action when Charity List  is successful.
 * @param obj Object containing Charity List  data.
 * @returns Action object with type and payload.
 */
export const getCharityListSuccess = (obj): RooteAction => {
  return { type: GET_CHARITY_LIST_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Charity List fails.
 * @returns Action object with type and an empty payload.
 */
export const getCharityListFailure = (): RooteAction => {
  return { type: GET_CHARITY_LIST_FAILURE, payload: {} };
};
export const getCharityListReset = (): RooteAction => {
  return { type: GET_CHARITY_LIST_RESET, payload: {} };
};

/**
 * Action creator function to dispatch action when Publisher DropDown Data  is successful.
 * @param obj Object containing Publisher DropDown Data.
 * @returns Action object with type and payload.
 */
export const getPublisherDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_PUBLISHER_DROP_DOWN_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Publisher DropDown Data fails.
 * @returns Action object with type and an empty payload.
 */
export const getPublisherDropDownDataFailure = (): RooteAction => {
  return { type: GET_PUBLISHER_DROP_DOWN_DATA_FAILURE, payload: {} };
}
/**
 * Action creator function to dispatch action when ReuestedBy DropDown Data  is successful.
 * @param obj Object containing Publisher DropDown Data.
 * @returns Action object with type and payload.
 */
export const getReuestedByDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_REQUESTED_BY_DROP_DOWN_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when ReuestedBy DropDown Data fails.
 * @returns Action object with type and an empty payload.
 */
export const getReuestedByDropDownDataFailure = (): RooteAction => {
  return { type: GET_REQUESTED_BY_DROP_DOWN_DATA_FAILURE, payload: {} };
}
/**
 * Action creator function to dispatch action when Blog DropDown Data  is successful.
 * @param obj Object containing Publisher DropDown Data.
 * @returns Action object with type and payload.
 */
export const getBlogDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_BLOG_DROP_DOWN_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Blog DropDown Data fails.
 * @returns Action object with type and an empty payload.
 */
export const getBlogDropDownDataFailure = (): RooteAction => {
  return { type: GET_BLOG_DROP_DOWN_DATA_FAILURE, payload: {} };}
/**
 * Action creator function to dispatch action when Tag DropDown Data  is successful.
 * @param obj Object containing Publisher DropDown Data.
 * @returns Action object with type and payload.
 */
export const getTagDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_TAG_DROP_DOWN_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Tag DropDown Data fails.
 * @returns Action object with type and an empty payload.
 */
export const getTagDropDownDataFailure = (): RooteAction => {
  return { type: GET_TAG_DROP_DOWN_DATA_FAILURE, payload: {} };}
/**
 * Action creator function to dispatch action when Charity Status  Data  is successful.
 * @param obj Object containing Charity Status  Data.
 * @returns Action object with type and payload.
 */
export const updateCharityStatusSuccess = (obj): RooteAction => {
  return { type: UPDATE_CHARITY_STATUS_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Charity Status  fails.
 * @returns Action object with type and an empty payload.
 */
export const updateCharityStatusFailure = (): RooteAction => {
  return { type: UPDATE_CHARITY_STATUS_FAILURE, payload: {} };
}
/**
 * Action creator function to dispatch action when Charity   Data  is successful.
 * @param obj Object containing Charity   Data.
 * @returns Action object with type and payload.
 */
export const updateCharityDataSuccess = (obj): RooteAction => {
  return { type: UPDATE_CHARITY_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Charity Data  fails.
 * @returns Action object with type and an empty payload.
 */
export const updateCharityDataFailure = (): RooteAction => {
  return { type: UPDATE_CHARITY_DATA_FAILURE, payload: {} };}
/**
 * Action creator function to dispatch action when Delete Charity  Data  is successful.
 * @param obj Object containing Delete Charity  Data.
 * @returns Action object with type and payload.
 */
export const deleteCharitySuccess = (obj): RooteAction => {
  return { type: DELETE_CHARITY_SUCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Delete Charity  fails.
 * @returns Action object with type and an empty payload.
 */
export const deleteCharityFailure = (): RooteAction => {
  return { type: DELETE_CHARITY_FAILURE, payload: {} };
}