import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
    getDonerListFailure,
    getDonorListSuccess,
    approveDeclineReqFailure,
    approveDeclineReqSuccess,
    deleteDonorFailure,
    deleteDonorSuccess,
    addEditDonorFailure,
    addEditDonorSuccess,
    getPhoneCodeFailure,
    getPhoneCodeSuccess

} from "../donorManagement/donorManagement.action";
import {
    GET_DONOR_LIST_API,
    DELETE_DONOR_API,
    APPROVE_DECLINE_REQ_API,
    ADD_EDIT_DONOR_API,
    GET_COUNTRY_CODE_API,
} from "../../Utility/ApiList";
import { deleteAPI, get, post } from "../../Utility/httpInterceptor";



/**
 * Get list of donors
 * @param {*} objBody
 * @method getDonorList
 * @url /getDonorList
 * @returns API will return List of Donors
 */
export const getDonorList =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${GET_DONOR_LIST_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getDonorListSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(getDonerListFailure());
                }
            } catch (err) {
                dispatch(getDonerListFailure());
            } finally {
                dispatch(loading(false));
            }
        };

/**
 * Delete Doner
 * @param {*} objBody
 * @method deleteDonor
 * @url /deleteDonor
 * @returns API will delete Doner
 */
export const deleteDonor =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await deleteAPI(`${DELETE_DONOR_API}`, objBody, true);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(deleteDonorSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(deleteDonorFailure());
                }
            } catch (err) {
                dispatch(deleteDonorFailure());
            } finally {
                dispatch(loading(false));
            }
        };

/**
 * Approve/Decline Charity Request
 * @param {*} objBody
 * @method approveDeclineReq
 * @url /approveDeclineCharityRequest
 * @returns API will Approve Decline Request
 */
export const approveDeclineReq =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${APPROVE_DECLINE_REQ_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(approveDeclineReqSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(approveDeclineReqFailure());
                }
            } catch (err) {
                dispatch(approveDeclineReqFailure());
            } finally {
                dispatch(loading(false));
            }
        };

/**
 * Add/Edit Donor
 * @param {*} objBody
 * @method addEditDonor
 * @url /addEditDonor
 * @returns API will add edit donor
 */
export const addEditDonor =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${ADD_EDIT_DONOR_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(addEditDonorSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(addEditDonorFailure());
                }
            } catch (err) {
                dispatch(addEditDonorFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* get phone code 
* @param {*} objBody
* @method getCountryCode
* @url getPhoneCode
* @returns API will return all phone codes 
*/
export const getPhoneCode =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await get(`${GET_COUNTRY_CODE_API}`);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getPhoneCodeSuccess(response.data));
                } else {
                    // te(response.data.message);
                    dispatch(getPhoneCodeFailure());
                }
            } catch (err) {
                dispatch(getPhoneCodeFailure());
            } finally {
                dispatch(loading(false));
            }
        };
