import { RooteAction } from "../store";
import {
    GET_DONORS_LIST_FAILURE,
    GET_DONORS_LIST_SUCCESS,
    APPROVE_DECLINE_CHARITY_REQUEST_FAILURE,
    APPROVE_DECLINE_CHARITY_REQUEST_SUCCESS,
    DELETE_DONOR_FAILURE,
    DELETE_DONOR_SUCCESS,
    ADD_EDIT_DONOR_FAILURE,
    ADD_EDIT_DONOR_SUCCESS,
    GET_PHONE_CODE_FAILURE,
    GET_PHONE_CODE_SUCCESS
} from "./donorManagement.type";

export const getDonorListSuccess = (obj): RooteAction => {
    return { type: GET_DONORS_LIST_SUCCESS, payload: obj };
};

export const getDonerListFailure = (): RooteAction => {
    return { type: GET_DONORS_LIST_FAILURE, payload: {} };
};

export const deleteDonorSuccess = (obj): RooteAction => {
    return { type: DELETE_DONOR_SUCCESS, payload: obj };
};

export const deleteDonorFailure = (): RooteAction => {
    return { type: DELETE_DONOR_FAILURE, payload: {} };
};


export const approveDeclineReqSuccess = (obj): RooteAction => {
    return { type: APPROVE_DECLINE_CHARITY_REQUEST_SUCCESS, payload: obj };
};

export const approveDeclineReqFailure = (): RooteAction => {
    return { type: APPROVE_DECLINE_CHARITY_REQUEST_FAILURE, payload: {} };
};

export const addEditDonorSuccess = (obj): RooteAction => {
    return { type: ADD_EDIT_DONOR_SUCCESS, payload: obj };
};

export const addEditDonorFailure = (): RooteAction => {
    return { type: ADD_EDIT_DONOR_FAILURE, payload: {} };
};

export const getPhoneCodeSuccess = (obj): RooteAction => {
    return { type: GET_PHONE_CODE_SUCCESS, payload: obj };
};

export const getPhoneCodeFailure = (): RooteAction => {
    return { type: GET_PHONE_CODE_FAILURE, payload: {} };
};