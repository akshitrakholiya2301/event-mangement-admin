import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
    getBlogsListFailure,
    getBlogsListSuccess,
    deleteBlogFailure,
    deleteBlogSuccess,
    updateBlogStatusFailure,
    updateBlogStatusSuccess,
    approveRejectBlogFailure,
    approveRejectBlogSuccess,
    addEditBlogFailure,
    addEditBlogSuccess
} from "../blogManagement/blogManagement.action";
import {
    BLOG_LISTING_API,
    DELETE_BLOGS_API,
    UPDATE_BLOGS_STATUS_API,
    APPROVE_REJECT_API,
    ADD_EDIT_BLOG_API
} from "../../Utility/ApiList";
import { deleteAPI, post } from "../../Utility/httpInterceptor";


/**
 * api will get blog listing 
 * @param {*} objBody
 * @method getBlogListAPI
 * @url /blogListingAdminSide
 * @returns API will api will get blog listing 
 */
export const getBlogListAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${BLOG_LISTING_API}`, objBody, true);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getBlogsListSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(getBlogsListFailure());
                }
            } catch (err) {
                dispatch(getBlogsListFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const deleteBlogAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await deleteAPI(`${DELETE_BLOGS_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(deleteBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(deleteBlogFailure());
                }
            } catch (err) {
                dispatch(deleteBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will update blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /updateBlogStatus
* @returns API will api will get blog listing 
*/
export const updateBlogStatusAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${UPDATE_BLOGS_STATUS_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(updateBlogStatusSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(updateBlogStatusFailure());
                }
            } catch (err) {
                dispatch(updateBlogStatusFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const approveRejectAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${APPROVE_REJECT_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(approveRejectBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(approveRejectBlogFailure());
                }
            } catch (err) {
                dispatch(approveRejectBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const addEditBlogAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${ADD_EDIT_BLOG_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(addEditBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(addEditBlogFailure());
                }
            } catch (err) {
                dispatch(addEditBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };