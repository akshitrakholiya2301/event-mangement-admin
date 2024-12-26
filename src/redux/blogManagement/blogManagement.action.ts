import { RooteAction } from "../store";
import {
  GET_BLOGS_LIST_FAILURE,
  GET_BLOGS_LIST_SUCCESS,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_STATUS_FAILURE,
  UPDATE_BLOG_STATUS_SUCCESS,
  APPROVE_REJECT_BLOG_SUCCESS,
  APPROVE_REJECT_BLOG_FAILURE,
  ADD_EDIT_BLOG_FAILURE,
  ADD_EDIT_BLOG_SUCCESS,
  RESET_BLOG_LIST,
} from "./blogManagement.type";


export const getBlogsListSuccess = (obj): RooteAction => {
  return { type: GET_BLOGS_LIST_SUCCESS, payload: obj };
};

export const getBlogsListFailure = (): RooteAction => {
  return { type: GET_BLOGS_LIST_FAILURE, payload: {} };
};

export const getBlogsListReset = (): RooteAction => {
  return { type: RESET_BLOG_LIST, payload: {} };
};
export const deleteBlogSuccess = (obj): RooteAction => {
  return { type: DELETE_BLOG_SUCCESS, payload: obj };
};

export const deleteBlogFailure = (): RooteAction => {
  return { type: DELETE_BLOG_FAILURE, payload: {} };
};


export const updateBlogStatusSuccess = (obj): RooteAction => {
  return { type: UPDATE_BLOG_STATUS_SUCCESS, payload: obj };
};

export const updateBlogStatusFailure = (): RooteAction => {
  return { type: UPDATE_BLOG_STATUS_FAILURE, payload: {} };
};



export const approveRejectBlogSuccess = (obj): RooteAction => {
  return { type: APPROVE_REJECT_BLOG_SUCCESS, payload: obj };
};

export const approveRejectBlogFailure = (): RooteAction => {
  return { type: APPROVE_REJECT_BLOG_FAILURE, payload: {} };
};


export const addEditBlogSuccess = (obj): RooteAction => {
  return { type: ADD_EDIT_BLOG_SUCCESS, payload: obj };
};

export const addEditBlogFailure = (): RooteAction => {
  return { type: ADD_EDIT_BLOG_FAILURE, payload: {} };
};