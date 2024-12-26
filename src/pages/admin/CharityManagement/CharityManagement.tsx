import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import AllCharity from './AllCharity';
import RequestedCharity from './RequestedCharity';
import CancelledCharity from './CancelledCharity';
import { ENUM_FOR_CHARITY_MANAGEMENT_TAB, ENUM_FOR_LISTING_VIEW, ENUM_FOR_SORT_ORDER, ENUM_FOR_TABLE_HEADERS, ENUM_FOR_TABLE_REQUEST_HEADERS } from '../../../interfaces/enum';
import { useNavigate } from 'react-router-dom';
import { CharityReqBody, CharityResponse, DropdownListFormat, ENUMFORROUTES, TableHeader } from '../../../interfaces/interface';
import { customJsonInclude, getDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteCharityDataApi, getCharityListDataApi, getPubliserDropDownDataApi, getRequetsedByDropDownDataApi, updateCharityStatusApi } from '../../../redux/Service/CharityMangement/charityMangement';
import Pagination from '../../../common/Pagination';
import axios from 'axios';
import { post } from '../../../Utility/httpInterceptor';

const CharityManagement = (props) => {

    /* ------------------------------ Selection Tab ----------------------------- */
    const [selectedTab, setSelectedTab] = useState<any>(ENUM_FOR_CHARITY_MANAGEMENT_TAB.ALL_CHARITY);

    const handleOnChangeTab = (val) => {

        if (selectedTab !== val) {
            setCharityListData([]);
            setSelectedTab(val);

        }
    }
    useEffect(() => {
        setSearchString("");
        setSearchStartDate(null);
        setSearchEndDate(null);
        setSearchByPublisher(null);
        setSearchRequestBy(null);

        setColumName(initColumName)
        if (selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW) {
            setNoOfRecords(25);
            setPageNumber(1);
            setColumName(initColumName);
            columnSorting(ENUM_FOR_TABLE_REQUEST_HEADERS.NAME_FOR_MANGEMENT, null);
        }

        return () => {

        }
    }, [selectedTab])

    /* ------------------------------ Selection Tab ----------------------------- */
    /* ------------------------- List View And Grid View ------------------------ */
    const [selectView, setSelectView] = useState<any>(ENUM_FOR_LISTING_VIEW.GRID_VIEW);

    const handleChangeView = (val) => {
        if (selectView !== val) {
            setSelectView(val);
        }
    }


    useEffect(() => {
        if (selectView === ENUM_FOR_LISTING_VIEW.GRID_VIEW) {
            setNoOfRecords(null);
            setPageNumber(null);
            setSortOrder("");
            setSortBy("");
        }
        else {
            setNoOfRecords(25);
            setPageNumber(1);
            setColumName(initColumName);
            columnSorting(ENUM_FOR_TABLE_REQUEST_HEADERS.NAME_FOR_MANGEMENT, null);
        }

        return () => {

        }
    }, [selectView])


    /* ------------------------- List View And Grid View ------------------------ */

    /* --------------------------- Comman Development --------------------------- */




    //Common Dev Start
    const navigate = useNavigate();
    const navigateToRelatedScreen = (route: any, val?: any) => {
        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }

    }


    const [pageNumber, setPageNumber] = React.useState<any>(1);
    const [noOfRecords, setNoOfRecords] = React.useState<any>(25);
    const [searchString, setSearchString] = useState<any>("");
    const [searchStartDate, setSearchStartDate] = useState<any>(null);
    const [searchEndDate, setSearchEndDate] = useState<any>(null);
    const [searchByPublisher, setSearchByPublisher] = useState<any>(null);
    const [searchRequestBy, setSearchRequestBy] = useState<any>(null);


    //Headers Sorting Start

    const initColumName: Array<TableHeader> = [

        {
            displayName: ENUM_FOR_TABLE_HEADERS.ID_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.ID_FOR_MANGEMENT,
            classname: " tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.NAME_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.NAME_FOR_MANGEMENT,
            classname: " tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.DESCRIPTION_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.DESCRIPTION_FOR_MANGEMENT,
            classname: " tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.AUTHOR_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.AUTHOR_FOR_MANGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.DATE_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.DATE_FOR_MANGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.TARGET_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS.TARGET_FOR_MANGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS.COLLECTED_FOR_MANGEMENT,
            keyName: "",
            classname: "text-center",
            isDisplay: true,
        },

    ]

    const [columName, setColumName] = useState<Array<TableHeader>>(initColumName);
    const [sortBy, setSortBy] = useState<string>(ENUM_FOR_TABLE_REQUEST_HEADERS.ID_FOR_MANGEMENT);
    const [sortOrder, setSortOrder] = useState<string>(ENUM_FOR_SORT_ORDER.ASC);


    const columnSorting = (key: any, order: any) => {

        // console.log("caling",key,order);
        if (!isNullUndefinedOrBlank(key)) {

            let sortOrder = order;


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
        if (selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW) {
            setColumName(initColumName);
            columnSorting(ENUM_FOR_TABLE_REQUEST_HEADERS.ID_FOR_MANGEMENT, null);
        }

        const delayDebounceFn = setTimeout(() => {


            handleGetRequestedByDropDownData();
            handleGetPublisherDropDownData();
        }, 300);

        return () => clearTimeout(delayDebounceFn);

    }, [])

    //Headers Sorting End
    /* --------------------------- Comman Development --------------------------- */
    /* ---------------------------- Listing Function ---------------------------- */
    const [charityListData, setCharityListData] = useState<Array<CharityResponse>>([]);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {


            getCharityList();
        }, 300);

        return () => clearTimeout(delayDebounceFn);


    }, [pageNumber,
        noOfRecords,
        sortBy,
        sortOrder,
        searchString,
        selectedTab,
        searchStartDate,
        searchEndDate,
        searchByPublisher,
        searchRequestBy])

    const getCharityList = async () => {
        let payload: CharityReqBody = {} as CharityReqBody;


        payload.page = pageNumber;
        payload.limit = noOfRecords;
        payload.sortBy = sortBy;
        payload.orderBy = sortOrder;
        payload.search = searchString;
        payload.charity_request = selectedTab;
        payload.published_by = searchByPublisher;
        payload.request_by = searchRequestBy;
        payload.start_date = !isNullUndefinedOrBlank(searchStartDate) ? getDate(searchStartDate, "yyyy-MM-DD") : null;
        payload.end_date = !isNullUndefinedOrBlank(searchEndDate) ? getDate(searchEndDate, "yyyy-MM-DD") : null;

        customJsonInclude(payload);

        // const response = await props.getCharityListDataApi(payload);

        // if (response) {

        //     console.log(response?.payload?.content);
        // }
        setCharityListData([]);


    }
    /* ---------------------------- Listing Function ---------------------------- */

    /* ----------------------------- Drop Down Data ----------------------------- */
    const [publisherDropDownData, setPublisherDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [requestedByDropDownData, setRequestedByDropDownData] = useState<Array<DropdownListFormat>>([]);

    const handleGetPublisherDropDownData = async () => {
        // const response = await props.getPubliserDropDownDataApi();

        // if (response) {
        //     setPublisherDropDownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);
        // }

    }
    const handleGetRequestedByDropDownData = async () => {
        // const response = await props.getRequetsedByDropDownDataApi();

        // if (response) {
        //     setRequestedByDropDownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);
        // }

    }

    /* ----------------------------- Drop Down Data ----------------------------- */

    /* --------------------- Update Approve Decline Status --------------------- */
    const [charityDetails, setCharityDetails] = useState<CharityResponse>({} as CharityResponse);
    const [updateCharityStatus, setUpdateCharityStatus] = useState<boolean>(false);
    const openApproveDeclineModal = (item, status?: boolean) => {
        if (!isEmptyObjectOrNullUndefiend(item)) {
            setCharityDetails(item);
            setUpdateCharityStatus(status as boolean);
        }

    }

    const handleUpdateStatus = async () => {
        const reqBody = {
            isApproved: updateCharityStatus,
            id: charityDetails.id
        }
        const response = await props.updateCharityStatusApi(reqBody);
        if (response) {
            getCharityList();
        }

    }
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(charityDetails)) {

            handleUpdateStatus();
        }

        return () => {

        }
    }, [charityDetails])

    /* --------------------- Update Approve Decline Status --------------------- */
    /* -------------------------- Delete Charity Status ------------------------- */

    const openDeleteModal = (item) => {
        if (!isEmptyObjectOrNullUndefiend(item)) {
            setCharityDetails(item);
            handleDeleteCharity(item.id);

        }

    }
    const handleDeleteCharity = async (paramId) => {
        if (isNullUndefinedOrBlank(paramId)) {
            return;
        }

        let newCharityId: any = [];
        if (paramId instanceof Array) {
            newCharityId = paramId;
        }
        else {
            newCharityId = [paramId];
        }
        const reqBody = {
            id: newCharityId,
        }
        // console.log(reqBody);
        const response = await props.deleteCharityDataApi(reqBody);

        if (response) {
            getCharityList();
        }

    }

    /* -------------------------- Delete Charity Status ------------------------- */

    /* --------------------------- Update Charity Data -------------------------- */

    const handleUpdateCharityData = (item) => {
        if (!isEmptyObjectOrNullUndefiend(item)) {
            navigateToRelatedScreen(ENUMFORROUTES.CREATE_CHARITY, item);
        }

    }
    /* --------------------------- Update Charity Data -------------------------- */

    const handleGetPage = async () => {
        setSearchStartDate(null);
        setSearchEndDate(null);
        setSearchByPublisher(null);
        setSearchRequestBy(null);
        getCharityList();
    }
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Charity Management</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' onClick={() => { navigate(ENUMFORROUTES.CREATE_CHARITY) }} > <i className='th-outline-add-circle'></i> Add New Charity</Button>
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleGetPage(); }} > <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.ALL_CHARITY ? "active" : ""}`}
                                    id="pills-all-tab" type="button" role="tab"
                                    onClick={() => { handleOnChangeTab(ENUM_FOR_CHARITY_MANAGEMENT_TAB.ALL_CHARITY) }}

                                > <i className='th-outline-document-text'></i>All Charity</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.REQUESTED_CHARITY ? "active" : ""}`}
                                    id="pills-requested-tab" type="button" role="tab"
                                    onClick={() => { handleOnChangeTab(ENUM_FOR_CHARITY_MANAGEMENT_TAB.REQUESTED_CHARITY) }} ><i className='th-outline-folder-2'></i>Requested</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.CANCELLED_CHARITY ? "active" : ""}`}
                                    id="pills-cancelled-tab"
                                    type="button" role="tab" onClick={() => { handleOnChangeTab(ENUM_FOR_CHARITY_MANAGEMENT_TAB.CANCELLED_CHARITY) }} ><i className='th-outline-close-circle'></i>Cancelled</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className={`tab-pane fade  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.ALL_CHARITY ? " show active" : ""}`}

                                id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                <AllCharity
                                    selectView={selectView}
                                    handleChangeView={handleChangeView}
                                    charityListData={charityListData}
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortOrder={sortOrder}
                                    sortBy={sortBy}
                                    setPageNumber={setPageNumber}
                                    setSearchString={setSearchString}
                                    searchString={searchString}
                                    setSearchEndDate={setSearchEndDate}
                                    setSearchStartDate={setSearchStartDate}
                                    searchStartDate={searchStartDate}
                                    searchEndDate={searchEndDate}
                                    searchByPublisher={searchByPublisher}
                                    setSearchByPublisher={setSearchByPublisher}
                                    publisherDropDownData={publisherDropDownData}
                                    openApproveDeclineModal={openApproveDeclineModal}
                                    openDeleteModal={openDeleteModal}
                                    handleUpdateCharityData={handleUpdateCharityData}


                                />
                            </div>
                            <div className={`tab-pane fade  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.REQUESTED_CHARITY ? " show active" : ""}`} id="pills-requested" role="tabpanel" aria-labelledby="pills-requested-tab">
                                <RequestedCharity
                                    selectView={selectView}
                                    handleChangeView={handleChangeView}
                                    charityListData={charityListData}
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortOrder={sortOrder}
                                    sortBy={sortBy}
                                    setSearchString={setSearchString}
                                    searchString={searchString}
                                    setPageNumber={setPageNumber}
                                    setSearchEndDate={setSearchEndDate}
                                    setSearchStartDate={setSearchStartDate}
                                    searchStartDate={searchStartDate}
                                    searchEndDate={searchEndDate}
                                    requestedByDropDownData={requestedByDropDownData}
                                    searchRequestBy={searchRequestBy}
                                    openApproveDeclineModal={openApproveDeclineModal}
                                    setSearchRequestBy={setSearchRequestBy}
                                    handleUpdateCharityData={handleUpdateCharityData}
                                />
                            </div>
                            <div className={`tab-pane fade  ${selectedTab === ENUM_FOR_CHARITY_MANAGEMENT_TAB.CANCELLED_CHARITY ? " show active" : ""}`} id="pills-cancelled" role="tabpanel" aria-labelledby="pills-cancelled-tab">
                                <CancelledCharity
                                    selectView={selectView}
                                    handleChangeView={handleChangeView}
                                    charityListData={charityListData}
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortOrder={sortOrder}
                                    sortBy={sortBy}
                                    setPageNumber={setPageNumber}
                                    setSearchString={setSearchString}
                                    searchString={searchString}
                                    setSearchEndDate={setSearchEndDate}
                                    setSearchStartDate={setSearchStartDate}
                                    searchStartDate={searchStartDate}
                                    searchEndDate={searchEndDate}
                                    requestedByDropDownData={requestedByDropDownData}
                                    searchRequestBy={searchRequestBy}
                                    setSearchRequestBy={setSearchRequestBy}
                                    openDeleteModal={openDeleteModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {(!isEmptyObjectOrNullUndefiend(charityListData) && selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW && (

                <div className='paginationbox pagination-fixed'>
                    <Pagination
                        className="pagination-bar"
                        currentPage={props.charityData &&
                            pageNumber
                        }
                        totalCount={
                            props.charityData && props.charityData.totalRecords
                        }
                        pageSize={
                            props.charityData &&
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
            )}

        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {

        charityData: state.CharityManagementReducer.charityData
    };


};

const mapDispatchToProps = {
    getCharityListDataApi,
    getRequetsedByDropDownDataApi,
    getPubliserDropDownDataApi,
    updateCharityStatusApi,
    deleteCharityDataApi

};
export default connect(mapStateToProps, mapDispatchToProps)(CharityManagement);
// export default CharityManagement