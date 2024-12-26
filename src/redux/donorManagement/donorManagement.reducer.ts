import { RooteAction } from "../store";
import {
    GET_DONORS_LIST_SUCCESS,
    GET_DONORS_LIST_FAILURE,
    APPROVE_DECLINE_CHARITY_REQUEST_FAILURE,
    APPROVE_DECLINE_CHARITY_REQUEST_SUCCESS,
    DELETE_DONOR_FAILURE,
    DELETE_DONOR_SUCCESS,
    ADD_EDIT_DONOR_FAILURE,
    ADD_EDIT_DONOR_SUCCESS,
    GET_PHONE_CODE_FAILURE,
    GET_PHONE_CODE_SUCCESS
} from "./donorManagement.type";

export interface DonorsManagementInitializeState {
    getDonorsData: any;
    deleteDonor: any;
    approveDeclineReq: any;
    phoneCodeData: any;
    addEditData: any;
    loading: boolean;
}

const initialState: DonorsManagementInitializeState = {
    getDonorsData: null,
    deleteDonor: null,
    approveDeclineReq: null,
    phoneCodeData: null,
    addEditData: null,
    loading: false,
};

function DonorManagementReducer(
    state: DonorsManagementInitializeState = initialState,
    action: RooteAction
): DonorsManagementInitializeState {
    switch (action.type) {
        case GET_DONORS_LIST_SUCCESS:
            return {
                ...state,
                getDonorsData: action.payload,
                loading: false,
            };
        case GET_DONORS_LIST_FAILURE:
            return {
                ...state,
                getDonorsData: null,
                loading: false,
            };

        case APPROVE_DECLINE_CHARITY_REQUEST_SUCCESS:
            return {
                ...state,
                approveDeclineReq: action.payload,
                loading: false,
            };
        case APPROVE_DECLINE_CHARITY_REQUEST_FAILURE:
            return {
                ...state,
                approveDeclineReq: null,
                loading: false,
            };

        case DELETE_DONOR_SUCCESS:
            return {
                ...state,
                deleteDonor: action.payload,
                loading: false,
            };
        case DELETE_DONOR_FAILURE:
            return {
                ...state,
                deleteDonor: null,
                loading: false,
            };

        case GET_PHONE_CODE_SUCCESS:
            return {
                ...state,
                phoneCodeData: action.payload,
                loading: false,
            };
        case GET_PHONE_CODE_FAILURE:
            return {
                ...state,
                phoneCodeData: null,
                loading: false,
            };

        case ADD_EDIT_DONOR_SUCCESS:
            return {
                ...state,
                addEditData: action.payload,
                loading: false,
            };
        case ADD_EDIT_DONOR_FAILURE:
            return {
                ...state,
                addEditData: null,
                loading: false,
            };

        default:
            return state;
    }
}
export default DonorManagementReducer;
