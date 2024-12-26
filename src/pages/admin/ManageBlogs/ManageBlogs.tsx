import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import AllBlogs from './AllBlogs'
import RequestedBlogs from './RequestedBlogs'
import CancelledBlogs from './CancelledBlogs'
import { useLocation, useNavigate } from "react-router-dom";
import { BlogsReqBody, BlogsResponse, ENUMFORBLOGTABS, ENUMFORROUTES, TableHeader } from '../../../interfaces/interface'
import { approveRejectAPI, deleteBlogAPI, getBlogListAPI, updateBlogStatusAPI } from '../../../redux/Service/blogManagement'
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import { ENUM_FOR_BLOGS_KEY_TABLE_HEADERS, ENUM_FOR_BLOGS_TABLE_HEADERS, ENUM_FOR_SORT_ORDER, ENUM_FOR_TABLE_HEADERS, ENUM_FOR_TABLE_REQUEST_HEADERS } from '../../../interfaces/enum'
import Pagination from '../../../common/Pagination'
import DatePicker from 'react-datepicker';
import delete_icon from '../../../assets/images/delete.svg';

const ManageBlogs = (props) => {
    /* ---------------------------TAb management-------------------------------- */
    const [blogTab, setBlogTab] = useState<string>(ENUMFORBLOGTABS.ALL_BLOGS)

    const handleOnChangeTab = (val) => {
        if (blogTab !== val) {
            setBlogData([]);
            setBlogTab(val);

        }
    }

    const handleRefresh = () => {
        setSearchData("");
        setStartDate(null);
        setEndDate(null);
        handleGetBlogs();
    }

    useEffect(() => {
        setSearchData("");
        setStartDate(null);
        setEndDate(null)
    }, [blogTab])

    /* ---------------------------navigate Crete Blog-------------------------------- */
    const navigate = useNavigate();
    const createBlog = () => {
        navigate(ENUMFORROUTES.CREATE_BLOG);
    };
    /* --------------------------manage screens back to edit screen------------------------- */
    const { state } = useLocation();
    useEffect(() => {
        if (!isNullUndefinedOrBlank(state) && !isNullUndefinedOrBlank(state?.propsData)) {
            setBlogTab(state.propsData.blogTab);
            setPageNumber(state.propsData.pageNumber);
            setNoOfRecords(state.propsData.noOfRecords);
            setSortOrder(state.propsData.sortOrder);
            setSortBy(state.propsData.sortBy);
            setColumName(initColumName)
        }
    }, [state])

    /* ---------------------------blog Listing-------------------------------- */
    const [blogData, setBlogData] = useState<Array<BlogsResponse>>([])
    const [pageNumber, setPageNumber] = React.useState<any>(1);
    const [noOfRecords, setNoOfRecords] = React.useState<any>(10);
    const [searchData, setSearchData] = useState<any>("");
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

    const handleGetBlogs = async () => {
        let payload: BlogsReqBody = {} as BlogsReqBody;
        payload.page = pageNumber
        payload.limit = noOfRecords
        payload.sortBy = sortBy
        payload.orderBy = sortOrder
        payload.search = searchData
        payload.start_date = startDate && startDate
        payload.end_date = endDate && startDate
        payload.status = blogTab
        let response = await props.getBlogListAPI(payload);
        // console.log(response);
        if (response) {
            if (isEmptyObjectOrNullUndefiend(response?.payload?.data?.content)) {
                if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1)
                } else {
                    setBlogData([])
                }
            }
            setBlogData(!isEmptyObjectOrNullUndefiend(response?.payload?.data?.content) ? response?.payload?.data?.content : [])
        }

    }

    const initColumName: Array<TableHeader> = [

        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.TITLE,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.TITLE,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.AUTHOR,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.AUTHOR,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.DATE,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.DATE,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.TAGS,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.TAGS,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.LIKES,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.LIKES,
            classname: "tbl-sorting",
            isDisplay: (blogTab == ENUMFORBLOGTABS.ALL_BLOGS) ? true : false,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.ACTIONS,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.ACTIONS,
            classname: "text-center tbl-action",
            isDisplay: true,
        }

    ]

    const [columName, setColumName] = useState<Array<TableHeader>>(initColumName);
    const [sortBy, setSortBy] = useState<string>(ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.DATE);
    const [sortOrder, setSortOrder] = useState<string>(ENUM_FOR_SORT_ORDER.DESC);


    const columnSorting = (key: any, order: any) => {
        // console.log("caling",key,order);
        if (!isNullUndefinedOrBlank(key)) {
            let sortOrder = order
            if (sortBy === key && !isNullUndefinedOrBlank(order)) {
                sortOrder = order === ENUM_FOR_SORT_ORDER.DESC ? ENUM_FOR_SORT_ORDER.ASC : ENUM_FOR_SORT_ORDER.DESC;
            }
            else {
                sortOrder = ENUM_FOR_SORT_ORDER.ASC;
            }
            setSortBy(key);
            setSortOrder(sortOrder);
        }

    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleGetBlogs();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [pageNumber, noOfRecords, sortBy, sortOrder, startDate, endDate, searchData, blogTab])

    const handleSearchData = async (e) => {
        let value = e.target.value
        const regex = /^[^'"$%@]*$/;
        if (regex.test(value)) {
            setSearchData(value);
        }
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     handleGetOwnerData();
        // }
    }
    /* ------------------------Publish modals--------------------------- */
    const [publishShow, setPublishShow] = useState(false);
    const [blogId, setBlogId] = useState<any>(null);


    const handlePublishClose = () => { setBlogId(null); setPublishShow(false); };
    const handlePublishShow = (item) => { setBlogId(item); setPublishShow(true); };

    const handlepublish = async () => {
        if (!isNullUndefinedOrBlank(blogId)) {
            let response = await props?.updateBlogStatusAPI({ id: blogId, status: "Published" })
            if (!isNullUndefinedOrBlank(response)) {
                handlePublishClose();
                setBlogId(null);
                handleGetBlogs();

            }
        }
    }

    /* ------------------------UnPublish modals--------------------------- */
    const [unpublishShow, setUnpublishShow] = useState(false);
    const [unPublishblogId, setUnpublishBlogId] = useState<any>(null);


    const handleUnPublishClose = () => { setUnpublishBlogId(null); setUnpublishShow(false); };
    const handleUnPublishShow = (item) => { setUnpublishBlogId(item); setUnpublishShow(true); };

    const handleUnpublish = async () => {
        if (!isNullUndefinedOrBlank(unPublishblogId)) {
            let response = await props?.updateBlogStatusAPI({ id: unPublishblogId, status: "Unpublished" })
            if (!isNullUndefinedOrBlank(response)) {

                handleUnPublishClose();
                setUnpublishBlogId(null);
                handleGetBlogs();

            }
        }
    }
    /* ------------------------delete modals--------------------------- */
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteBlogId, setDeleteBlogId] = useState<any>(null);


    const handleDeleteClose = () => { setDeleteBlogId(null); setDeleteShow(false); };
    const handleDeleteShow = (item) => { setDeleteBlogId(item); setDeleteShow(true); };



    const handleDelete = async () => {
        if (!isNullUndefinedOrBlank(deleteBlogId)) {
            let response = await props?.deleteBlogAPI({ id: deleteBlogId })
            if (!isNullUndefinedOrBlank(response)) {
                handleDeleteClose();
                setDeleteBlogId(null);
                handleGetBlogs();
            }

        }
    }
    /* ------------------------Approve  modals--------------------------- */
    const [approveShow, setApproveShow] = useState(false);
    const [approveId, setApproveId] = useState<any>(null);


    const handleApproveClose = () => { setApproveId(null); setApproveShow(false); };
    const handleApproveShow = (item) => { setApproveId(item); setApproveShow(true); };



    const handleApprove = async () => {
        if (!isNullUndefinedOrBlank(approveId)) {
            let response = await props?.approveRejectAPI({ id: approveId, isApproved: true })
            if (!isNullUndefinedOrBlank(response)) {
                handleApproveClose();
                setApproveId(null);
                handleGetBlogs();
            }

        }
    }

    /* ------------------------ Reject modals--------------------------- */
    const [rejectShow, setRejectShow] = useState(false);
    const [DelineId, setDelineId] = useState<any>(null);


    const handleRejectClose = () => { setDelineId(null); setRejectShow(false); };
    const handleRejectShow = (item) => { setDelineId(item); setRejectShow(true); };



    const handleReject = async () => {
        if (!isNullUndefinedOrBlank(DelineId)) {
            let response = await props?.approveRejectAPI({ id: DelineId, isApproved: false })
            if (!isNullUndefinedOrBlank(response)) {
                handleRejectClose();
                setDelineId(null);
                handleGetBlogs();
            }

        }
    }

    //Common Dev Start
    const navigateToRelatedScreen = (route: any, val?: any, type?: string) => {
        if (val) {

            let data = {
                blogTab,
                sortBy,
                sortOrder,
                pageNumber,
                noOfRecords
            }
            console.log(data)
            let dataObj = { ...val, type, propsData: data }
            navigate(route, { state: dataObj })
        }
        else {
            navigate(route)
        }

    }

    // const handleBack = (item) => {
    //     // navigate(ENUMFORROUTES.MANAGE_BLOGS);
    //     if (!isNullUndefinedOrBlank(item)) {
    //         if (isNullUndefinedOrBlank(item)) {
    //             navigateToRelatedScreen(ENUMFORROUTES.MANAGE_BLOGS, item);
    //         } else {
    //             navigateToRelatedScreen(ENUMFORROUTES.MANAGE_BLOGS);
    //         }
    //     }
    // }

    useEffect(() => {
        setColumName(initColumName)
    }, [blogTab])

    return (

        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Manage Blogs</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' onClick={createBlog}> <i className='th-outline-add-circle'></i> Add New</Button>
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleRefresh() }} > <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${blogTab === ENUMFORBLOGTABS.ALL_BLOGS ? "active" : ""}`} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true" onClick={() => { handleOnChangeTab(ENUMFORBLOGTABS.ALL_BLOGS) }}> <i className='th-outline-document-text'></i>All Blogs</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${blogTab === ENUMFORBLOGTABS.REQUESTED ? "active" : ""}`} data-bs-toggle="pill" data-bs-target="#pills-requested" type="button" role="tab" aria-controls="pills-requested" aria-selected="false" onClick={() => { handleOnChangeTab(ENUMFORBLOGTABS.REQUESTED) }}><i className='th-outline-folder-2'></i>Requested</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${blogTab === ENUMFORBLOGTABS.CANCELLED ? "active" : ""}`} id="pills-cancelled-tab" data-bs-toggle="pill" data-bs-target="#pills-cancelled" type="button" role="tab" aria-controls="pills-cancelled" aria-selected="false" onClick={() => { handleOnChangeTab(ENUMFORBLOGTABS.CANCELLED) }}><i className='th-outline-close-circle'></i>Rejected</button>
                            </li>

                        </ul>
                        <div className="page-filter-wrapper">
                            <div className="page-filter">
                                <div className="page-filter-left">

                                    <Form.Group className="form-group filter-group">
                                        <div className="form-control-icon icon-start">
                                            <i className='th-outline-search-normal-1'></i>
                                            <Form.Control type="search" placeholder="Search by name"
                                                onChange={(e) => { handleSearchData(e) }}
                                                onKeyDown={(e) => { handleSearchData(e) }}
                                                value={searchData}
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="form-group filter-group">
                                        <div className="form-control-icon icon-start">
                                            <i className='th-outline-calendar-1'></i>
                                            {/* <Form.Control type="text" placeholder="Date Range" />
                                */}

                                            <DatePicker
                                                // selected={searchByStartDate}
                                                selectsRange={true}
                                                onChange={(dates) => {
                                                    const [start, end] = dates;
                                                    setStartDate(!isNullUndefinedOrBlank(start) ? start : null);
                                                    setEndDate(!isNullUndefinedOrBlank(end) ? end : null);
                                                }}
                                                startDate={startDate}
                                                endDate={endDate}
                                                // minDate={new Date()}
                                                isClearable
                                                dateFormat="dd-MM-yyyy"
                                                className="form-control"
                                                popperProps={{ strategy: "fixed" }}
                                                placeholderText="Select a Date"

                                                // inline
                                                showIcon
                                            />
                                        </div>
                                    </Form.Group>


                                </div>
                                <div className="page-filter-right">

                                </div>
                            </div>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className={`tab-pane fade ${ENUMFORBLOGTABS.ALL_BLOGS === blogTab ? "show active" : ""}`} id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                <AllBlogs selectedTab={blogTab} blogData={blogData} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy} handlePublish={handlePublishShow} handleUnPublish={handleUnPublishShow} handleDeleteBlog={handleDeleteShow} handleEdit={navigateToRelatedScreen} />
                            </div>
                            <div className={`tab-pane fade ${ENUMFORBLOGTABS.REQUESTED === blogTab ? "show active" : ""}`} id="pills-requested" role="tabpanel" aria-labelledby="pills-requested-tab">
                                <RequestedBlogs selectedTab={blogTab} blogData={blogData} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy} handleApprove={handleApproveShow} handleReject={handleRejectShow} handleEdit={navigateToRelatedScreen} />
                            </div>
                            <div className={`tab-pane fade ${ENUMFORBLOGTABS.CANCELLED === blogTab ? "show active" : ""}`} id="pills-cancelled" role="tabpanel" aria-labelledby="pills-cancelled-tab">
                                <CancelledBlogs selectedTab={blogTab} blogData={blogData} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy} handleDeleteBlog={handleDeleteShow} handleEdit={navigateToRelatedScreen} />
                            </div>
                        </div>
                    </div>

                    {(!isEmptyObjectOrNullUndefiend(blogData)) && (

                        <div className='paginationbox pagination-fixed'>
                            <Pagination
                                className="pagination-bar"
                                currentPage={props.blogsData &&
                                    pageNumber
                                }
                                totalCount={
                                    props.blogsData && props.blogsData.data.totalRecords
                                }
                                pageSize={
                                    props.blogsData &&
                                    noOfRecords
                                }
                                onPageChange={(page: React.SetStateAction<number>) =>
                                    setPageNumber(page)
                                }
                                onPageSizeChange={(page: React.SetStateAction<number>) => {
                                    setPageNumber(1);
                                    setNoOfRecords(page);
                                }}
                            />
                        </div>)
                    }
                </div>
            </div>
            <Modal show={publishShow} onHide={handlePublishClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Publish Blog</Modal.Title>
                    <Button variant="close" onClick={handlePublishClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Publish this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handlePublishClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handlepublish() }}>Yes,Publish</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={unpublishShow} onHide={handleUnPublishClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Unpublish Blog</Modal.Title>
                    <Button variant="close" onClick={handleUnPublishClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Unpublish this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleUnPublishClose}>No, Change my mind</Button>

                    <Button variant="secondary" onClick={() => { handleUnpublish() }}>Yes,UnPublish</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteShow} onHide={handleDeleteClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleDeleteClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Delete this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleDeleteClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleDelete() }}>Yes,Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={approveShow} onHide={handleApproveClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleApproveClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Approve this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleApproveClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleApprove() }}>Yes,Approve</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={rejectShow} onHide={handleRejectClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleRejectClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Reject this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleRejectClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleReject() }}>Yes,Reject</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({
    blogsData: state.BlogsManagementReducer.blogsData
})

const mapDispatchToProps = {
    getBlogListAPI,
    deleteBlogAPI,
    updateBlogStatusAPI,
    approveRejectAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBlogs)