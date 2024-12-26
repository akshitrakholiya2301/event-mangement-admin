import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import { connect } from 'react-redux';
import { getDonorList, approveDeclineReq, deleteDonor, addEditDonor, getPhoneCode } from '../../../redux/Service/donorManagement';
import { DonorData, ENUMFORDONORTYPE, ENUMFORROUTES, TableHeader } from '../../../interfaces/interface';
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, checkFileSize, renderError } from '../../../Utility/Helper';
import { ENUMFORDONORSTAB } from '../../../interfaces/interface';
import Pagination from '../../../common/Pagination';
import { ENUMFORDROPDOWNDONOR } from '../../../interfaces/interface';
import Select from 'react-select';
import { ENUMFORDONORTABLEHEADER, ENUMFORKEYDONORTABLEHEADER, ENUMFORSORTORDER, ENUMFORREQUESTTYPE } from '../../../interfaces/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import approve from '../../../assets/images/aprove.svg'
import decline from '../../../assets/images/decline.svg'
import { MAX_100, MAX_15, MAX_30, MAX_5, ONLY_NUMBERS } from '../../../Utility/Validation_Helper';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import * as yup from 'yup';
import AllDonorsList from './AllDonorsList';
import Cancelled from './Cancelled';
import RequestedForCharityList from './RequestedForCharityList';


const DonorManagement = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const donorProfileImg = useRef(null) as any;
    const [donorData, setDonorData] = useState<Array<DonorData>>([]);
    const [donorTab, setDonorTab] = useState<string>(ENUMFORDONORSTAB.ALL);
    const [pageNumber, setPageNumber] = React.useState<any>(1);
    const [noOfRecords, setNoOfRecords] = React.useState<any>(10);
    const [search, setSearch] = useState<string>("");
    const [selectedData, setSelectedData] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<any>();
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [sortOrder, setSortOrder] = useState<string>(ENUMFORSORTORDER.DESC);
    const [reqBody, setReqBody] = useState<any>(null);
    const [profileUrl, setProfileUrl] = useState<any>();
    const [profileImg, setProfileImg] = useState<any>();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<any>("");
    const [phoneCodedata, setphoneCodeData] = useState<any>([]);
    const [isEdit, setIsEdit] = useState<any>(false);
    const [savedData, setSavedData] = useState<DonorData>({});
    const [reqType, setReqType] = useState<string>("");
    const [approveDeclineReqId, setApproveDeclineReqId] = useState<any>();
    const [deleteDonorId, setDeleteDonorId] = useState<any>();
    const [amtStart, setAmtStart] = useState<any>();
    const [amtEnd, setAmtEnd] = useState<any>();

    const initColumName: Array<TableHeader> = [
        {
            displayName: ENUMFORDONORTABLEHEADER.NAME,
            keyName: ENUMFORKEYDONORTABLEHEADER.NAME,
            classname: "tbl-sorting",
            isDisplay: true,

        },
        {
            displayName: ENUMFORDONORTABLEHEADER.DONORID,
            keyName: ENUMFORKEYDONORTABLEHEADER.DONORID,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUMFORDONORTABLEHEADER.NOTES,
            keyName: ENUMFORKEYDONORTABLEHEADER.NOTES,
            classname: "tbl-sorting",
            isDisplay: donorTab === ENUMFORDONORSTAB.REQUESTED,
        },
        {
            displayName: ENUMFORDONORTABLEHEADER.TYPE,
            keyName: ENUMFORKEYDONORTABLEHEADER.TYPE,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUMFORDONORTABLEHEADER.DONATION_AMT,
            keyName: ENUMFORKEYDONORTABLEHEADER.DONATION_AMT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUMFORDONORTABLEHEADER.ACTION,
            keyName: "",
            classname: "tbl-action",
            isDisplay: true,
        },


    ]
    const [columName, setColumName] = useState<Array<TableHeader>>(initColumName);

    const [show, setShow] = useState(false);
    const handleClose = () => { donorDetailsFormData.resetForm(); setErrorMsg(""); setShow(false); setIsEdit(false); setProfileUrl(null); setSavedData({}) };
    const handleShow = () => { !donorDetailsFormData.values.donor_type && donorDetailsFormData.setFieldValue("donor_type", ENUMFORDONORTYPE.INDIVIDUAL); setShow(true); }

    const [approveDeclineshow, setApproveDeclineShow] = useState(false);
    const handleApproveDeclineClose = () => { setApproveDeclineShow(false); setReqType(""); setApproveDeclineReqId(null) };
    const handleApproveDeclineShow = (id) => { setApproveDeclineShow(true); setApproveDeclineReqId(id) }

    const [deleteDonorShow, setDeleteDonorShow] = useState(false);
    const handleDeleteDonorClose = () => { setDeleteDonorShow(false); setDeleteDonorId(null) };
    const handleDeleteShow = () => { setDeleteDonorShow(true); }



    //Get DonorData function
    const handleGetOwnerData = async () => {
        let payload = {
            status: donorTab == ENUMFORDONORSTAB.ALL ? null : donorTab,
            page: (pageNumber <= 0) ? 1 : pageNumber,
            limit: noOfRecords,
            search: search,
            type: selectedType,
            sortBy: sortBy,
            orderBy: sortOrder,
            start_amount: amtStart,
            end_amount: amtEnd
        }

        let response = await props?.getDonorList(payload);

        if (response && !isNullUndefinedOrBlank(response.payload)) {
            if (response.payload.data.length <= 0) {
                if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1)
                } else {
                    // console.log("Hello");
                    setDonorData(response.payload.data)
                }
            } else {
                setDonorData(response.payload.data.content)
            }

        }
    }

    //onSearch Get Data function
    const handleSearchData = async (e) => {
        let value = e.target.value
        const regex = /^[^'"$%@]*$/;
        if (regex.test(value)) {
            setSearch(value);
        }
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     handleGetOwnerData();
        // }
    }

    //handle sorting
    const columnSorting = (key: any, order: any) => {
        if (!isNullUndefinedOrBlank(key)) {
            let sortOrder = order;
            if (sortBy === key && !isNullUndefinedOrBlank(order)) {
                sortOrder = order === ENUMFORSORTORDER.DESC ? ENUMFORSORTORDER.ASC : ENUMFORSORTORDER.DESC;
            }
            else {
                sortOrder = ENUMFORSORTORDER.ASC;
            }
            setSortBy(key);
            setSortOrder(sortOrder);
        }
    }

    //deleteDonor
    const deleteDonor = async (id) => {
        if (!isNullUndefinedOrBlank(id)) {

            let payload = {
                id: [id]
            }
            let response = await props?.deleteDonor(payload);
            if (response && !isNullUndefinedOrBlank(response.payload)) {
                // console.log(response, "--response");
                handleGetOwnerData();
                handleDeleteDonorClose()

            }
        }
    }

    //approveDeclineReq
    const approveDeclineReq = async ({ id, isApproved }) => {
        if (!isNullUndefinedOrBlank(id) && isApproved !== undefined) {
            let payload = {
                id: id,
                isApproved: isApproved
            }
            let response = await props?.approveDeclineReq(payload);
            if (response && !isNullUndefinedOrBlank(response.payload)) {
                handleGetOwnerData();
                handleApproveDeclineClose();
                // console.log(response, "--response");

            }
        }
    }

    //redirect to Details Page
    const navigateToDetailsPage = async (item, index) => {
        setSelectedData(item.id);
        let data = {
            details: item,
            reqBody: { limit: noOfRecords, page: pageNumber, sortBy: sortBy, orderBy: sortOrder, status: donorTab, selectedData: item.id }
        }
        navigate(ENUMFORROUTES.DONOR_DETAILS, { state: data })
    }

    //updateRequestBody
    const updateReqBodyState = (obj) => {
        const reqBody = { ...obj }
        console.log(obj);
        Object.keys(reqBody).map((key) => {
            // console.log(key, "obj");
            switch (key) {
                case "limit":
                    setNoOfRecords(reqBody[key]);
                    break;
                case "page":
                    setPageNumber(reqBody[key]);
                    break;
                case "sortBy":
                    setSortBy(reqBody[key]);
                    break;
                case "orderBy":
                    setSortOrder(reqBody[key]);
                    break;
                case "status":
                    setDonorTab(reqBody[key]);
                    break;
                case "selectedData":
                    setSelectedData(reqBody[key]);
                    break;
                default:
                    break;

            }
        })

    }

    //Upload Image
    const handleUploadProfileImg = (event) => {
        // event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        // }

        // console.log(profileUrl);
        if (!isNullUndefinedOrBlank(file)) {

            // const fileSIzeInMb=+convertDecimalTwoPoint(file.size/ (1024 ** 2));
            if (!checkFileSize(file.size, MAX_5)) {
                setShowError(true);
                setErrorMsg("File size can not be exceeded than 5 mb.");
                return;
            }
            const url = URL.createObjectURL(file);
            const splitValue = file?.name.split(".");
            const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
            const CheckExteValues = ["png", "jpeg", "jpg"];
            if (CheckExteValues.includes(ExteValue)) {
                setProfileUrl(url);
                setProfileImg(file);
                setShowError(false);
                setErrorMsg("");
            }
            else {
                donorProfileImg.current.value = null;
                setShowError(true);
                setErrorMsg("Uploaded Image type is not Valid");
                setProfileUrl(null);
                setProfileImg(null);
                // te("Upload only Image");
            }
        }
        else {
            setShowError(false);
            setErrorMsg("");
        }

    };

    //Add Donor Form Initvalue
    const initDonorDetails: DonorData = {
        first_name: "",
        last_name: "",
        donor_type: ENUMFORDONORTYPE.INDIVIDUAL,
        organisation_name: "",
        email: "",
        phone_code: "",
        mobile_no: "",
        isAuthorizedForCharity: true,
    }

    const onSubmit = (values) => {

    };

    const validationSchema = yup.object({
        first_name: yup.string().trim().required("First Name is Required !!"),
        last_name: yup.string().trim().required("Last Name is Required!!"),
        donor_type: yup.string().required("Please Select Donor Type!!"),
        email: yup.string().trim().email("Please Enter a valid Email!!. ").required("Email is Required!!"),
        phone_code: yup.string().required("Please Select Phone code!!"),
        organisation_name: yup.string().trim()
            .when("donor_type", {
                is: (donor_type: string) => donor_type === ENUMFORDONORTYPE.ORGANISATION,
                then: schema => schema.required("Organisation name is Required!!"),
                otherwise: schema => schema.notRequired(),
            }),
        isAuthorizedForCharity: yup.boolean(),
        mobile_no: yup
            .string()
            .trim()
            .min(7, "Please Enter a valid Mobile No.!!")
            // .matches(PATTERN_FOR_PHONE_NO, "Please Enter a valid Mobile No. ")
            .required("Mobile No is Required!!"),
        // user_occupation: yup.string().required("Please any one select"),
    });

    const donorDetailsFormData = useFormik({
        initialValues: savedData || initDonorDetails,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    });

    const handlePersonalDetailsSubmit = async () => {
        donorDetailsFormData.handleSubmit();
        const donorDetailsErrors = await donorDetailsFormData.validateForm();
        // console.log(donorDetailsErrors);
        if (Object.keys(donorDetailsErrors).length > 0) {
            donorDetailsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(donorDetailsErrors, true));

            return;
        }
        const reqBody = new FormData();
        let requestValue = { ...donorDetailsFormData.values };


        // if (isNullUndefinedOrBlank(profileUrl) && !isNullUndefinedOrBlank(props.personalDetailsData.data.url)) {
        //     requestValue = { ...requestValue, url: profileUrl }
        // }
        reqBody.append("donorDetail", JSON.stringify(requestValue));
        if (!isNullUndefinedOrBlank(profileImg)) {
            reqBody.append("profile_pic", profileImg);
        }
        const response = await props.addEditDonor(reqBody);

        if (!isEmptyObjectOrNullUndefiend(response)) {
            handleGetOwnerData();
            donorDetailsFormData.resetForm();
            handleClose();
            // getPersonalDetails();
        }
        //   console.log(businessDetailsFormData.errors);
    }

    const getPhoneCodes = async () => {
        let response = await props.getPhoneCode();
        if (!isNullUndefinedOrBlank(response)) {
            setphoneCodeData(response.payload.data)
        }
    }

    const handleEdit = (item) => {
        setIsEdit(true);
        // console.log(item);
        if (item.url) {
            setProfileUrl(item.url)
        }
        handleShow();
        setSavedData(item);
    }

    //setDataONBack Button of Details Page
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(state?.reqBody)) {
            setReqBody(state?.reqBody);
            updateReqBodyState(state?.reqBody)
            setSelectedData(state?.reqBody.selectedData);
        }
    }, [state])


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleGetOwnerData()
        }, 300);
        return () => clearTimeout(delayDebounceFn);

    }, [donorTab, pageNumber, noOfRecords, selectedType, sortBy, sortOrder, search, amtEnd, amtStart])

    useEffect(() => {
        getPhoneCodes()
    }, [])



    useEffect(() => {
        setColumName(initColumName)
        setSearch("");
        setSelectedType(null);
        setDonorData([]);
        setAmtStart("");
        setAmtEnd("")
    }, [donorTab]);

    /* --------------------handleTab--------------------- */

    const handleTab = (val) => {
        if (val !== donorTab) {
            setNoOfRecords(10); setPageNumber(1); setSelectedData(null);
            setDonorTab(val)
        }
    }

    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Donor Management</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' onClick={handleShow}> <i className='th-outline-add-circle'></i> Add New</Button>
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleGetOwnerData() }}> <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${donorTab === ENUMFORDONORSTAB.ALL ? 'active' : ''}`}
                                    id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"
                                    onClick={() => { handleTab(ENUMFORDONORSTAB.ALL); }}> <i className='th-outline-profile-2user'></i>All Donors {!isNullUndefinedOrBlank(props?.donorData?.data?.counters) ? `(${props?.donorData?.data?.counters?.allDonorCounter})` : `(0)`}</button>

                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${donorTab === ENUMFORDONORSTAB.REQUESTED ? 'active' : ''}`}
                                    id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"
                                    onClick={() => { handleTab(ENUMFORDONORSTAB.REQUESTED); }}><i className='th-outline-gift'></i>Requested For Charity {!isNullUndefinedOrBlank(props?.donorData?.data?.counters) ? `(${props?.donorData?.data?.counters?.requestedDonorCounter})` : `(0)`}</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${donorTab === ENUMFORDONORSTAB.CANCELLED ? 'active' : ''}`}
                                    id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"
                                    onClick={() => { handleTab(ENUMFORDONORSTAB.CANCELLED); }}><i className='th-outline-close-circle'></i>Cancelled {!isNullUndefinedOrBlank(props?.donorData?.data?.counters) ? `(${props?.donorData?.data?.counters?.canceledDonorCounter})` : `(0)`}</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="page-filter-wrapper">
                                <div className="page-filter">
                                    <div className="page-filter-left">
                                        <Form.Group className="form-group filter-group">
                                            <div className="form-control-icon icon-start">
                                                <i className='th-outline-search-normal-1'></i>
                                                <Form.Control type="search" placeholder="Search by name"
                                                    value={search} onChange={(e) => { handleSearchData(e) }} onKeyDown={(e) => { handleSearchData(e) }}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="filter-group filter-select">
                                            {/* <Form.Select aria-label="Type">
                                                    <option>Type</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select> */}

                                            <Select
                                                className="react-select-container"
                                                options={ENUMFORDROPDOWNDONOR}
                                                onChange={(selectedOption) => {
                                                    setSelectedType(selectedOption?.value);
                                                }}
                                                placeholder={<div>Type</div>}
                                                isClearable={true}
                                                value={(ENUMFORDROPDOWNDONOR?.filter(({ value }) => {
                                                    return (
                                                        value === selectedType
                                                    );
                                                }))}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group filter-group">
                                            <div className="form-control-icon icon-start">
                                                <i className='th-outline-dollar-circle'></i>
                                                <Form.Control type="number" placeholder="AMT Start" onChange={(e) => { setAmtStart(e.target.value) }} />
                                            </div>
                                        </Form.Group>
                                        <span>-</span>
                                        <Form.Group className="form-group filter-group">
                                            <div className="form-control-icon icon-start">
                                                <i className='th-outline-dollar-circle'></i>
                                                <Form.Control type="number" placeholder="AMT End" onChange={(e) => { setAmtEnd(e.target.value) }} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="page-filter-right">

                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <AllDonorsList
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    data={donorData}
                                    navigateToDetailPage={navigateToDetailsPage}
                                    selectedData={selectedData}
                                    handleSelectedData={setSelectedData}
                                    handleOpenEditModal={handleEdit} />
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <RequestedForCharityList
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    data={donorData}
                                    navigateToDetailPage={navigateToDetailsPage}
                                    selectedData={selectedData}
                                    handleSelectedData={setSelectedData}
                                    handleOpenApproveDeclineModal={handleApproveDeclineShow}
                                    handleReqType={setReqType} />
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <Cancelled
                                    columName={columName}
                                    columnSorting={columnSorting}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    data={donorData}
                                    navigateToDetailPage={navigateToDetailsPage}
                                    selectedData={selectedData}
                                    handleSelectedData={setSelectedData}
                                    handleOpenDeleteModal={handleDeleteShow}
                                    handleSetDeleteId={setDeleteDonorId} />
                            </div>
                        </div>
                        <div className='paginationbox pagination-fixed'>
                            {!isEmptyObjectOrNullUndefiend(donorData) && (

                                <Pagination
                                    className=""
                                    currentPage={
                                        props.donorData &&
                                        pageNumber
                                    }
                                    totalCount={
                                        props.donorData && props.donorData.data.totalRecords
                                    }
                                    pageSize={
                                        props.donorData &&
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
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>{isEdit ? "Edit" : "Add New"} User</Modal.Title>
                    <Button variant="close" onClick={handleClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new-user">
                        <div className="profile-container justify-content-center">
                            {/* <div className="profile-image">
                                <img src={defaultAvatar2} alt="HUB - Goal" />
                            </div> */}
                            {
                                !isNullUndefinedOrBlank(profileUrl) ?
                                    <div className="profile-image">
                                        <img src={profileUrl} alt="Pure Charity" />
                                    </div>
                                    :
                                    <div className="profile-image">
                                        <img src={defaultAvatar} alt="Pure Charity" />
                                    </div>
                            }


                            <div className="profile-content">
                                <button className="btn-fileupload">
                                    <i className='th th-outline-edit-2'></i>
                                    <input type="file" accept="image/x-png,image/jpeg,image/jpg" ref={donorProfileImg} onChange={(event) => { handleUploadProfileImg(event); }} />
                                </button>
                            </div>
                            {showError ? renderError(errorMsg) : ""}
                        </div>
                        <Form.Group className="form-group" >
                            <div className='radio-group'>
                                <Form.Check type="radio" name="donor_type" aria-label="radio 1" id="radio1" label="Individual" value={donorDetailsFormData.values.donor_type} checked={donorDetailsFormData.values.donor_type === ENUMFORDONORTYPE.INDIVIDUAL} onChange={() => { donorDetailsFormData.setFieldValue("donor_type", ENUMFORDONORTYPE.INDIVIDUAL) }} />
                                <Form.Check type="radio" name="donor_type" aria-label="radio 2" id="radio2" label="Organisation" value={donorDetailsFormData.values.donor_type} checked={donorDetailsFormData.values.donor_type === ENUMFORDONORTYPE.ORGANISATION} onChange={() => { donorDetailsFormData.setFieldValue("donor_type", ENUMFORDONORTYPE.ORGANISATION) }} />
                            </div>
                            {donorDetailsFormData.touched.donor_type &&
                                donorDetailsFormData.errors.donor_type
                                ? renderError(donorDetailsFormData.errors.donor_type)
                                : null}
                        </Form.Group>
                        {donorDetailsFormData.values.donor_type === ENUMFORDONORTYPE.ORGANISATION &&
                            <Form.Group className="form-group" >
                                <Form.Label>Organisation Name*</Form.Label>
                                <div className="form-control-icon icon-start">
                                    <i className='th-outline-buildings'></i>
                                    <Form.Control type="text"
                                        placeholder="Enter organisation name"
                                        maxLength={MAX_30}
                                        {...donorDetailsFormData.getFieldProps("organisation_name")}
                                    />
                                </div>
                                {donorDetailsFormData.touched.organisation_name &&
                                    donorDetailsFormData.errors.organisation_name
                                    ? renderError(donorDetailsFormData.errors.organisation_name)
                                    : null}
                            </Form.Group>
                        }

                        <Row>
                            <Col md={6}>
                                <Form.Group className="form-group" >
                                    <Form.Label>First Name*</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-user'></i>
                                        <Form.Control type="text"
                                            placeholder="Enter first name"
                                            maxLength={MAX_30}
                                            {...donorDetailsFormData.getFieldProps("first_name")}
                                        />

                                    </div>
                                    {donorDetailsFormData.touched.first_name &&
                                        donorDetailsFormData.errors.first_name
                                        ? renderError(donorDetailsFormData.errors.first_name)
                                        : null}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="form-group" >
                                    <Form.Label>Last Name*</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-user'></i>
                                        <Form.Control type="text"
                                            placeholder="Enter last name"
                                            maxLength={MAX_30}
                                            {...donorDetailsFormData.getFieldProps("last_name")}
                                        />
                                    </div>
                                    {donorDetailsFormData.touched.last_name &&
                                        donorDetailsFormData.errors.last_name
                                        ? renderError(donorDetailsFormData.errors.last_name)
                                        : null}
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="form-group" >
                                    <Form.Label>Email*</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-sms'></i>
                                        <Form.Control type="text"
                                            placeholder="Enter Email name"
                                            maxLength={MAX_100}
                                            {...donorDetailsFormData.getFieldProps("email")}
                                        />
                                    </div>
                                    {donorDetailsFormData.touched.email &&
                                        donorDetailsFormData.errors.email
                                        ? renderError(donorDetailsFormData.errors.email)
                                        : null}
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="form-group phone-number-group" >
                                    <Form.Label>Phone</Form.Label>

                                    <InputGroup className="">
                                        <div className="select-wrapper">
                                            <Select
                                                className="react-select-container"
                                                options={phoneCodedata}
                                                onChange={(selectedOption) => {
                                                    donorDetailsFormData.setFieldValue("phone_code", selectedOption?.value);
                                                }}
                                                placeholder={<div>Code</div>}
                                                isClearable={true}
                                                value={(phoneCodedata?.filter(({ value }) => {
                                                    return (
                                                        value === donorDetailsFormData.values.phone_code
                                                    );
                                                }))}
                                            />
                                            {donorDetailsFormData.touched.phone_code &&
                                                donorDetailsFormData.errors.phone_code
                                                ? renderError(donorDetailsFormData.errors.phone_code)
                                                : null}
                                        </div>

                                        <div className="form-control-wrapper">
                                            <div className="form-control-icon icon-start">
                                                <i className='th-outline-call-calling'></i>
                                                <Form.Control type="number"
                                                    placeholder="Enter Mobile Number"
                                                    maxLength={MAX_15}
                                                    {...donorDetailsFormData.getFieldProps("mobile_no")}
                                                />
                                            </div>
                                            {donorDetailsFormData.touched.mobile_no &&
                                                donorDetailsFormData.errors.mobile_no
                                                ? renderError(donorDetailsFormData.errors.mobile_no)
                                                : null}
                                        </div>
                                    </InputGroup>
                                </Form.Group>

                            </Col>

                        </Row>
                        <Form.Group className="" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox"
                                label="Authorized for add charity"
                                checked={donorDetailsFormData.values.isAuthorizedForCharity}
                                {...donorDetailsFormData.getFieldProps("isAuthorizedForCharity")}
                            />
                        </Form.Group>
                    </div>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" className='btn-icon-start' onClick={() => { handlePersonalDetailsSubmit() }}><i className='th th-outline-tick-circle'></i>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={approveDeclineshow} onHide={handleApproveDeclineClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title> {`${reqType}`} Charity</Modal.Title>
                    <Button variant="close" onClick={handleApproveDeclineClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>

                    <div className="approve-decilne-modal">
                        <div className="approve-decilne-image">
                            <img src={decline} alt="" />
                        </div>
                        <div className='approve-decilne-text'>
                            <h6>Are you Sure?</h6>
                            Are you sure you want to  {`${reqType}`} Charity Request  from this Donor?.
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={() => { handleApproveDeclineClose() }}>Cancel</Button>
                    <Button variant="secondary" className='btn-icon-start' onClick={() => { approveDeclineReq({ id: approveDeclineReqId, isApproved: reqType == ENUMFORREQUESTTYPE.ACCEPT ? true : false }) }}><i className='th th-outline-tick-circle'></i>{reqType}</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteDonorShow} onHide={handleDeleteDonorClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                    <Button variant="close" onClick={handleDeleteDonorClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        Are you sure you want to Delete this Donor?.
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleDeleteDonorClose}>Cancel</Button>
                    <Button variant="primary" className='btn-icon-start' onClick={() => { deleteDonor(deleteDonorId) }}><i className='th th-outline-tick-circle'></i>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


const mapStateToProps = (state) => ({
    donorData: state.DonorManagementReducer.getDonorsData,
})

const mapDispatchToProps = {
    getDonorList,
    deleteDonor,
    approveDeclineReq,
    addEditDonor,
    getPhoneCode
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorManagement)