import { DELETE_CHARITY_DATA_API, GET_BLOG_DROP_DOWN_DATA_API, GET_CHARITY_LIST_API, GET_PUBLISHER_DROP_DOWN_DATA_API, GET_REQUESTED_BY_DROP_DOWN_DATA_API, GET_TAG_DROP_DOWN_DATA_API, UPDATE_CHARITY_DATA_API, UPDATE_CHARITY_STATUS_API } from "../../../Utility/ApiList";
import { te, ts } from "../../../Utility/Toaster";
import { deleteAPI, get, post } from "../../../Utility/httpInterceptor";
import { loading } from "../../Loader/loader.action";
import { deleteCharityFailure, deleteCharitySuccess, getBlogDropDownDataFailure, getBlogDropDownDataSuccess, getCharityListFailure, getCharityListSuccess, getPublisherDropDownDataFailure, getPublisherDropDownDataSuccess, getReuestedByDropDownDataFailure, getReuestedByDropDownDataSuccess, getTagDropDownDataFailure, getTagDropDownDataSuccess, updateCharityDataFailure, updateCharityDataSuccess, updateCharityStatusFailure, updateCharityStatusSuccess } from "../../charityManagement/charityManagement.action";
import { AppDispatch } from "../../store";

/**
 * Get Charity List Data 
 * @param {*} objBody
 * @method getCharityListDataApi
 * @url /charityLisitngAdminSide
 * @returns API will return Charity List Data
 */
export const getCharityListDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await post(GET_CHARITY_LIST_API, objBody);
        if (!response.data.error) {
          //   ts(response.data.message);
          return dispatch(getCharityListSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(getCharityListFailure());
        }
      } catch (err) {
        dispatch(getCharityListFailure());
      } finally {
        dispatch(loading(false));
      }
    };

/**
 * Get Publisher Drop Down  Data 
 * @param {*} objBody
 * @method getPubliserDropDownDataApi
 * @url /getPublisherDetail
 * @returns API will return Drop Down  Data
 */
export const getPubliserDropDownDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await get(GET_PUBLISHER_DROP_DOWN_DATA_API);
        if (!response.data.error) {
          //   ts(response.data.message);
          return dispatch(getPublisherDropDownDataSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(getPublisherDropDownDataFailure());
        }
      } catch (err) {
        dispatch(getPublisherDropDownDataFailure());
      } finally {
        dispatch(loading(false));
      }
    };

/**
 * Get Publisher Drop Down  Data 
 * @param {*} objBody
 * @method getRequetsedByDropDownDataApi
 * @url /getRequestedByDetail
 * @returns API will return Drop Down  Data
 */
export const getRequetsedByDropDownDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await get(GET_REQUESTED_BY_DROP_DOWN_DATA_API);
        if (!response.data.error) {
          //   ts(response.data.message);
          return dispatch(getReuestedByDropDownDataSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(getReuestedByDropDownDataFailure());
        }
      } catch (err) {
        dispatch(getReuestedByDropDownDataFailure());
      } finally {
        dispatch(loading(false));
      }
    };
/**
 * Get tag Drop Down  Data 
 * @param {*} objBody
 * @method getTagDropDownDataApi
 * @url /getTags
 * @returns API will return Drop Down  Data
 */
export const getTagDropDownDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await post(GET_TAG_DROP_DOWN_DATA_API, objBody);
        if (!response.data.error) {
          //   ts(response.data.message);
          return dispatch(getTagDropDownDataSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(getTagDropDownDataFailure());
        }
      } catch (err) {
        dispatch(getTagDropDownDataFailure());
      } finally {
        dispatch(loading(false));
      }
    };
/**
 * Get Publisher Drop Down  Data 
 * @param {*} objBody
 * @method getRequetsedByDropDownDataApi
 * @url /getRequestedByDetail
 * @returns API will return Drop Down  Data
 */
export const getBlogDropDownDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await get(GET_BLOG_DROP_DOWN_DATA_API);
        if (!response.data.error) {
          //   ts(response.data.message);
          return dispatch(getBlogDropDownDataSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(getBlogDropDownDataFailure());
        }
      } catch (err) {
        dispatch(getBlogDropDownDataFailure());
      } finally {
        dispatch(loading(false));
      }
    };

/**
* Update Charity Status  Data 
* @param {*} objBody
* @method updateCharityStatusApi
* @url /approveDeclineCharity
* @returns API will return Drop Down  Data
*/
export const updateCharityStatusApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await post(UPDATE_CHARITY_STATUS_API, objBody);
        if (!response.data.error) {
          ts(response.data.message);
          return dispatch(updateCharityStatusSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(updateCharityStatusFailure());
        }
      } catch (err) {
        dispatch(updateCharityStatusFailure());
      } finally {
        dispatch(loading(false));
      }
    };
/**
* Update Charity  Data 
* @param {*} objBody
* @method updateCharityDataApi
* @url /addEditCharity
* @returns API will return Drop Down  Data
*/
export const updateCharityDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await post(UPDATE_CHARITY_DATA_API, objBody);
        if (!response.data.error) {
          ts(response.data.message);
          return dispatch(updateCharityDataSuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(updateCharityDataFailure());
        }
      } catch (err) {
        dispatch(updateCharityDataFailure());
      } finally {
        dispatch(loading(false));
      }
    };

/**
* Delete Charity Status  Data 
* @param {*} objBody
* @method deleteCharityDataApi
* @url /deleteCharity
* @returns API will return Success
*/
export const deleteCharityDataApi =
  (objBody: any = null) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        const response: any = await deleteAPI(DELETE_CHARITY_DATA_API, objBody);
        if (!response.data.error) {
          ts(response.data.message);
          return dispatch(deleteCharitySuccess(response.data.data));
        } else {
          te(response.data.message);
          dispatch(deleteCharityFailure());
        }
      } catch (err) {
        dispatch(deleteCharityFailure());
      } finally {
        dispatch(loading(false));
      }
    };

