import { RooteAction } from "../store";
import { DELETE_CHARITY_FAILURE, DELETE_CHARITY_SUCESS, GET_BLOG_DROP_DOWN_DATA_FAILURE, GET_BLOG_DROP_DOWN_DATA_SUCCESS, GET_CHARITY_LIST_FAILURE, GET_CHARITY_LIST_RESET, GET_CHARITY_LIST_SUCCESS, GET_PUBLISHER_DROP_DOWN_DATA_FAILURE, GET_PUBLISHER_DROP_DOWN_DATA_SUCCESS, GET_REQUESTED_BY_DROP_DOWN_DATA_FAILURE, GET_REQUESTED_BY_DROP_DOWN_DATA_SUCCESS, GET_TAG_DROP_DOWN_DATA_FAILURE, GET_TAG_DROP_DOWN_DATA_SUCCESS, UPDATE_CHARITY_DATA_FAILURE, UPDATE_CHARITY_DATA_SUCCESS, UPDATE_CHARITY_STATUS_FAILURE, UPDATE_CHARITY_STATUS_SUCCESS } from "./charityManagement.type";

export interface CharityManagementInitializeState {
  /** Indicates whether the charity Mangement was successful */
  charityMangementSuccess: boolean;
  /**Contains Charity-related data  */
  charityData: any;
  /**Contains Publisher DropDownData data  */
  publisherDropDownData: any;
  /**Contains Requested DropDownData data  */
  requestedByDropDownData: any;
  /**Contains tag DropDownData data  */
  tagDropDownData: any;
  /**Contains blog DropDownData data  */
  blogDropDownData: any;
  /**Contains Update Charity Status data  */
  updateCharityStatusData: any;
  /**Contains Update Charity  data  */
  updateCharityData: any;
  /**Contains Delete Charity data  */
  deleteCharityData: any;


  /** Indicates whether an asynchronous operation is in progress */
  loading: boolean;
}
/** Define the initial state */
const initialState: CharityManagementInitializeState = {
  charityMangementSuccess: false,
  charityData: [],
  publisherDropDownData: [],
  requestedByDropDownData: [],
  updateCharityStatusData: [],
  deleteCharityData: [],
  tagDropDownData: [],
  blogDropDownData: [],
  updateCharityData: [],

  loading: false,
};
/**
 * Reducer function responsible for managing login-related state.
 * @param state Current state of the login module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function CharityManagementReducer(
  state: CharityManagementInitializeState = initialState,
  action: RooteAction
): CharityManagementInitializeState {
  switch (action.type) {
    case GET_CHARITY_LIST_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        charityData: action.payload,
        loading: false,
      };
    case GET_CHARITY_LIST_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        charityData: null,
        loading: false,
      };
    case GET_PUBLISHER_DROP_DOWN_DATA_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        publisherDropDownData: action.payload,
        loading: false,
      };
    case GET_PUBLISHER_DROP_DOWN_DATA_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        publisherDropDownData: null,
        loading: false,
      };
    case GET_REQUESTED_BY_DROP_DOWN_DATA_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        requestedByDropDownData: action.payload,
        loading: false,
      };
    case GET_REQUESTED_BY_DROP_DOWN_DATA_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        requestedByDropDownData: null,
        loading: false,
      };
    case GET_TAG_DROP_DOWN_DATA_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        tagDropDownData: action.payload,
        loading: false,
      };
    case GET_TAG_DROP_DOWN_DATA_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        tagDropDownData: null,
        loading: false,
      };
    case GET_BLOG_DROP_DOWN_DATA_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        blogDropDownData: action.payload,
        loading: false,
      };
    case GET_BLOG_DROP_DOWN_DATA_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        blogDropDownData: null,
        loading: false,
      };
    case UPDATE_CHARITY_STATUS_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        updateCharityStatusData: action.payload,
        loading: false,
      };
    case UPDATE_CHARITY_STATUS_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        updateCharityStatusData: null,
        loading: false,
      };
    case UPDATE_CHARITY_DATA_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        updateCharityData: action.payload,
        loading: false,
      };
    case UPDATE_CHARITY_DATA_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        updateCharityData: null,
        loading: false,
      };
    case DELETE_CHARITY_SUCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        deleteCharityData: action.payload,
        loading: false,
      };
    case DELETE_CHARITY_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        deleteCharityData: null,
        loading: false,
      };
    case GET_CHARITY_LIST_RESET:
      return {
        ...state,
        charityMangementSuccess: false,
        charityData: null,
        loading: false,
      };

    default:
      return state;
  }
}
export default CharityManagementReducer;