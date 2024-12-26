import React, { useEffect, useRef, useState } from 'react'
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from 'react-bootstrap';
import blogImage from '../../../assets/images/blog.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CharityResponse, CreateCharityData, DropdownListFormat, ENUMFORROUTES } from '../../../interfaces/interface';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import * as yup from 'yup';
import { CHARITY_COLOR_REQUIRED, CHARITY_NAME_REQUIRED, CHARITY_STATUS_REQUIRED, FILE_FORMATE_VALIDATION, FILE_SIZE_VALIDATION, GOAL_AMOUNT_REQUIRED, MONTHLY_AMOUNT_REQUIRED, ONLY_NUMBER_VALIDATION, PLEASE_PROVIDE_VALID_LINK } from '../../../Utility/Validation_Message';
import { MAX_10, MAX_100, MAX_50, ONLY_NUMBERS, WEBSITE_PATTERN } from '../../../Utility/Validation_Helper';
import { FILE_SIZE, SUPPORTED_FORMATS, copyText, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import Select, { GroupBase } from "react-select";
import { dropdownDataForCharityStatus } from '../../../Utility/staticDropDown';
import { getBlogDropDownDataApi, getTagDropDownDataApi, updateCharityDataApi } from '../../../redux/Service/CharityMangement/charityMangement';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { te } from '../../../Utility/Toaster';
import InputColor from 'react-input-color';
import { link } from 'fs';
const CreateCharity = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const location = useLocation();
    /* ----------------------------- Form Validation ---------------------------- */
    const charityCoverImage = useRef() as any;
    const charityIconImage = useRef() as any;

    const initCharityData: CreateCharityData = {
        charity_name: "",
        charity_color: "",
        charity_status: "",
        goal_amount: "",
        description: "",
        cover_pic: null,
        charity_link: "",
        cover_pic_name: "",
        icon_pic: "",
        icon_pic_name: "",
        tags: [],
        blog_link: [],
        monthly_amount: "",
        new_charity_questions_acnc: false,
        new_charity_questions_act: false,
        new_charity_questions_dgr: false,
    }
    const [savedCharityFormData, setSavedCharityFormData] = useState<CreateCharityData>(initCharityData);
    const onSubmitForCharityData = (values) => {
    }

    const validationSchema = yup.object({
        charity_name: yup.string().trim().required(CHARITY_NAME_REQUIRED),
        charity_status: yup.string().required(CHARITY_STATUS_REQUIRED),
        charity_link: yup.string().trim().matches(WEBSITE_PATTERN, PLEASE_PROVIDE_VALID_LINK),
        // charity_color: yup.string().required(CHARITY_COLOR_REQUIRED),
        goal_amount: yup.string().matches(ONLY_NUMBERS, ONLY_NUMBER_VALIDATION).required(GOAL_AMOUNT_REQUIRED),
        monthly_amount: yup.string().matches(ONLY_NUMBERS, ONLY_NUMBER_VALIDATION).required(MONTHLY_AMOUNT_REQUIRED),
        cover_pic: yup.mixed()
            .nullable()
            .notRequired()
            .when(([cover_pic]) => {
                return typeof cover_pic == "object" ?
                    yup.mixed().nullable()
                        .notRequired().test("FILE_SIZE", FILE_SIZE_VALIDATION,
                            (value: any) =>
                                !value || (value && value[0]?.size <= FILE_SIZE)
                        )
                        .test("FILE_FORMAT", FILE_FORMATE_VALIDATION,
                            (value: any) => !value || (value && SUPPORTED_FORMATS.includes(value[0].type))
                        )
                    : yup.mixed()
                        .nullable()
                        .notRequired()
            }),
        icon_pic: yup.mixed()
            .nullable()
            .notRequired()
            .when(([icon_pic]) => {
                return typeof icon_pic == "object" ?
                    yup.mixed().nullable()
                        .notRequired().test("FILE_SIZE", FILE_SIZE_VALIDATION,
                            (value: any) =>
                                !value || (value && value[0]?.size <= FILE_SIZE)
                        )
                        .test("FILE_FORMAT", FILE_FORMATE_VALIDATION,
                            (value: any) => !value || (value && SUPPORTED_FORMATS.includes(value[0].type))
                        )
                    : yup.mixed()
                        .nullable()
                        .notRequired()
            })


    })


    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(state)) {

            const newData = { ...state }
            const coverImages = newData.images?.filter((val) => val.doc_type === "cover_pic")[0]
            const iconImages = newData.images?.filter((val) => val.doc_type === "icon_pic")[0]

            const updateData = {
                ...newData,
                cover_pic_name: !isNullUndefinedOrBlank(coverImages?.original_name) ? coverImages?.original_name : null,
                cover_pic: !isNullUndefinedOrBlank(coverImages?.url) ? coverImages?.url : "",
                icon_pic_name: !isNullUndefinedOrBlank(iconImages?.original_name) ? iconImages?.original_name : null,
                icon_pic: !isNullUndefinedOrBlank(iconImages?.url) ? iconImages?.url : ""
            }
            setSavedCharityFormData(updateData);
            console.log(updateData, "in")
        }

        return () => {

        }
    }, [state])

    const charityFormData = useFormik({
        initialValues: savedCharityFormData || initCharityData,
        onSubmit: onSubmitForCharityData,
        validationSchema,
        enableReinitialize: true,
    })

    const handleCharityDataSubmit = async () => {
        charityFormData.handleSubmit();

        const charityFormDataErrors = await charityFormData.validateForm();
        if (Object.keys(charityFormDataErrors).length > 0) {
            charityFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(charityFormDataErrors, true))
            if (!(charityFormData.values?.new_charity_questions_acnc && charityFormData.values?.new_charity_questions_act && charityFormData.values?.new_charity_questions_dgr)) {

                te("Please Fill all the details");
                return;

            }

            return;
        }
        const reqBody = new FormData();
        let charityDetail = { ...charityFormData.values }
        delete charityDetail.cover_pic;
        delete charityDetail.cover_pic_name;


        if (!isEmptyObjectOrNullUndefiend(charityFormData.values.cover_pic) && typeof charityFormData.values.cover_pic === "object") {

            reqBody.append("cover_pic", charityFormData.values.cover_pic[0]);
        }
        else {
            charityDetail["cover_url"] = charityFormData.values.cover_pic;
        }
        if (!isEmptyObjectOrNullUndefiend(charityFormData.values.icon_pic) && typeof charityFormData.values.icon_pic === "object") {

            reqBody.append("icon_pic", charityFormData.values.icon_pic[0]);
        }
        else {

            charityDetail["icon_url"] = charityFormData.values.icon_pic;
        }
        reqBody.append("charityDetail", JSON.stringify(charityDetail));
        const response = await props.updateCharityDataApi(reqBody);

        if (response) {
            navigate(ENUMFORROUTES.CHARITY_MANAGEMENT);

        }
    }
    // useEffect(() => {
    //     if (isNullUndefinedOrBlank(charityFormData.errors?.cover_pic)
    //         && !isEmptyObjectOrNullUndefiend(charityFormData?.values?.cover_pic)
    //         && isNullUndefinedOrBlank(charityFormData?.values?.cover_pic_name)) {
    //         charityFormData.setFieldValue("cover_pic_name", charityFormData.values.cover_pic[0]?.name)
    //     }
    //     return () => {

    //     }
    // }, [charityFormData.errors])
    // useEffect(() => {
    //     if (isNullUndefinedOrBlank(charityFormData.errors?.icon_pic)
    //         && !isEmptyObjectOrNullUndefiend(charityFormData?.values?.icon_pic)
    //         && isNullUndefinedOrBlank(charityFormData?.values?.icon_pic_name)) {
    //         charityFormData.setFieldValue("icon_pic_name", charityFormData.values.icon_pic[0]?.name)
    //     }
    //     return () => {

    //     }
    // }, [charityFormData.errors])

    useEffect(() => {
        if (isNullUndefinedOrBlank(charityFormData.errors?.cover_pic)


        ) {

            if (!isEmptyObjectOrNullUndefiend(charityFormData?.values?.cover_pic) && typeof charityFormData?.values?.cover_pic === "object") {

                charityFormData.setFieldValue("cover_pic_name", charityFormData.values.cover_pic[0]?.name)
            }

        }

        return () => {

        }
    }, [charityFormData?.values?.cover_pic])
    useEffect(() => {
        if (isNullUndefinedOrBlank(charityFormData.errors?.icon_pic)
        ) {

            if (!isEmptyObjectOrNullUndefiend(charityFormData?.values?.icon_pic) && typeof charityFormData?.values?.icon_pic === "object") {

                charityFormData.setFieldValue("icon_pic_name", charityFormData.values.icon_pic[0]?.name)
            }

        }

        console.log(charityFormData?.values?.icon_pic)
        return () => {

        }
    }, [charityFormData?.values?.icon_pic])
    /* ----------------------------- Form Validation ---------------------------- */

    /* ------------------------------ DropDown Data ----------------------------- */

    const [charityStatusForDropdownData, setCharityStatusForDropdownData] = useState<Array<DropdownListFormat>>(dropdownDataForCharityStatus);
    const [tagForDropdownData, setTagForDropdownData] = useState<Array<DropdownListFormat>>([]);
    const [blogsForDropdownData, setBlogsForDropdownData] = useState<Array<DropdownListFormat>>([]);

    const getTagDropDownData = async () => {
        const reqBody = {
            type: "charity"
        }
        const response = await props.getTagDropDownDataApi(reqBody);
        if (response) {

            setTagForDropdownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);

        }

    }
    const getBlogDropDownData = async () => {
        const response = await props.getBlogDropDownDataApi();
        if (response) {

            setBlogsForDropdownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);

        }

    }
    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {

            getTagDropDownData();
            getBlogDropDownData();

        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [])



    /* ------------------------------ DropDown Data ----------------------------- */
    // console.log(charityFormData.values, charityFormData.errors);
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-breadcrumb pb-0">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/charity-management">
                                        <i className="th-outline-gift">
                                        </i>All Charity
                                    </NavLink>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">{isNullUndefinedOrBlank(charityFormData?.values?.id) ? "Add New" : "Update"}  Charity</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="page-title border-bottom">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Donor Management</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' onClick={() => { handleCharityDataSubmit(); }}> <i className={` ${isNullUndefinedOrBlank(charityFormData?.values?.id) ? "th-outline-add-circle" : "th-outline-edit-circle"}`}></i>
                                {isNullUndefinedOrBlank(charityFormData?.values?.id) ? "Create" : "Update"} Charity</Button>
                            <Button variant="icon-sm" className='btn-icon-white-outline-sm' onClick={() => { navigate(ENUMFORROUTES.CHARITY_MANAGEMENT); }}> <i className='th-close'></i></Button>
                        </div>
                    </div>
                    <div className="create-charity-from">
                        <Row>
                            <Col md={8} >
                                <Form.Group className="form-group " >
                                    <Form.Label>Charity Name <span className='required'>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Charity Name*"
                                        maxLength={MAX_50}
                                        {...charityFormData.getFieldProps("charity_name")} />
                                    {charityFormData.touched.charity_name &&
                                        charityFormData.errors.charity_name
                                        ? renderError(charityFormData.errors?.charity_name)
                                        : null}
                                </Form.Group>

                                <Form.Group className="form-group" >
                                    {/* <Form.Label>Description</Form.Label> */}
                                    <CKEditor
                                        editor={Editor as any}
                                        // data={}
                                        data={charityFormData.values.description}
                                        onReady={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log("Editor is ready to use!", editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            charityFormData.setFieldValue("description", data);
                                            // console.log("On CHange", { event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            const data = editor.getData();
                                            // console.log("Blur.", editor,data);
                                        }}
                                        onFocus={(event, editor) => {
                                            // console.log("Focus.", editor);
                                        }}


                                    />
                                    {/* <Form.Control as="textarea" rows={5} placeholder='Add detail description of charity event' /> */}
                                </Form.Group>

                                <Form.Group controlId="formFile" className="form-group file-darg-drop">
                                    <Form.Label>Upload Cover Image</Form.Label>
                                    <div className="file-input-darg-drop">
                                        <div className="file-input-icon-text">
                                            <div className="file-input-icon">
                                                <i className="bi bi-upload"></i>
                                            </div>
                                            <p>Drag and Drop file here or <span>Choose file</span></p>
                                        </div>
                                        <input type="file"
                                            accept="image/png, image/jpeg,image/jpg"
                                            onChange={(e) => { !isEmptyObjectOrNullUndefiend(e.target?.files) && charityFormData.setFieldValue("cover_pic", e.target?.files as any) }}
                                            ref={charityCoverImage}
                                        />
                                    </div>
                                    {
                                        isNullUndefinedOrBlank(charityFormData.errors?.cover_pic) && !isNullUndefinedOrBlank(charityFormData?.values?.cover_pic_name) &&


                                        <div className="from-input-file-name">
                                            <p>
                                                {
                                                    charityFormData?.values?.cover_pic_name
                                                }

                                                <i onClick={() => {
                                                    charityFormData.setFieldValue("cover_pic", null);
                                                    charityFormData.setFieldValue("cover_pic_name", null);
                                                    charityCoverImage.current.value = null
                                                }} className='th-close'></i>
                                            </p>
                                        </div>
                                    }

                                    {
                                        charityFormData.errors.cover_pic
                                            ? renderError(charityFormData.errors?.cover_pic)
                                            : null}
                                </Form.Group>





                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group" >
                                            <Form.Label>Goal Amount <span className='required'>*</span></Form.Label>
                                            <Form.Control type="text" maxLength={MAX_10} placeholder="Goal Amount *"  {...charityFormData.getFieldProps("goal_amount")} />
                                            {charityFormData.touched.goal_amount &&
                                                charityFormData.errors.goal_amount
                                                ? renderError(charityFormData.errors?.goal_amount)
                                                : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group" >
                                            <Form.Label>Monthly Amount <span className='required'>*</span></Form.Label>
                                            <Form.Control type="text" maxLength={MAX_10} placeholder="Monthly Amount *"  {...charityFormData.getFieldProps("monthly_amount")} />
                                            {charityFormData.touched.monthly_amount &&
                                                charityFormData.errors.monthly_amount
                                                ? renderError(charityFormData.errors?.monthly_amount)
                                                : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="form-group" >
                                    <Form.Label>Charity Link</Form.Label>
                                    <div className="form-control-icon icon-end">
                                        <Form.Control type="text" maxLength={MAX_100} placeholder="Enter Your Charity Link" {...charityFormData.getFieldProps("charity_link")} />
                                        <i className='th-outline-copy' onClick={() => { copyText(charityFormData.values.charity_link) }}></i>
                                    </div>
                                    {charityFormData.touched.charity_link &&
                                        charityFormData.errors.charity_link
                                        ? renderError(charityFormData.errors?.charity_link)
                                        : null}
                                </Form.Group>
                                {
                                    isNullUndefinedOrBlank(charityFormData.values.id) &&
                                    <>

                                        <Form.Group className="form-group" >
                                            <Form.Label className='mb-3'>Select Reason For Cancel Subscription</Form.Label>
                                            {/* <div className="checkbox checkbox-primary checkbox-small">
                                        <input type="checkbox" className="filled-in" id="isRequested"
                                        
                                        checked={charityFormData.values.new_charity_questions_acnc}
                                        onChange={()=>{charityFormData.setFieldValue("new_charity_questions_acnc",!charityFormData.values.new_charity_questions_acnc)}} />
                                        <label htmlFor='isRequested'>Is External API required ?</label>
                                    </div> */}
                                            <Form.Check type="checkbox"
                                                id="new_charity_questions_acnc"
                                                checked={charityFormData.values.new_charity_questions_acnc}
                                                onChange={() => { charityFormData.setFieldValue("new_charity_questions_acnc", !charityFormData.values.new_charity_questions_acnc) }}
                                                label="Registered as a charity with the Australian Charities and Not-for-profits Commission (ACNC)" />
                                        </Form.Group>

                                        <Form.Group className="form-group">
                                            <Form.Check type="checkbox"
                                                id="new_charity_questions_dgr"
                                                checked={charityFormData.values.new_charity_questions_dgr}
                                                onChange={() => { charityFormData.setFieldValue("new_charity_questions_dgr", !charityFormData.values.new_charity_questions_dgr) }}
                                                label="Endorsed Deductible Gift Recipient (DGR) status by the ATO" />
                                        </Form.Group>

                                        <Form.Group className="form-group">

                                            <Form.Check type="checkbox"
                                                id="new_charity_questions_act"
                                                checked={charityFormData.values.new_charity_questions_act}
                                                onChange={() => { charityFormData.setFieldValue("new_charity_questions_act", !charityFormData.values.new_charity_questions_act) }}
                                                label="Covered by Item 1 (Not Item 2) of the table in section 30-15 of the Income Tax Assessment Act 1997 Link" />
                                        </Form.Group>
                                    </>
                                }
                                <Form.Group className="form-group" >
                                    <Form.Label>Link Blogs</Form.Label>
                                    <div className="form-control-icon icon-end">
                                        {/* <Form.Control type="text" placeholder="Search by blog heading / tag" /> */}
                                        <Select
                                            options={blogsForDropdownData}
                                            onChange={(selectedOption) => {

                                                charityFormData.setFieldValue(
                                                    "blog_link",
                                                    selectedOption ? selectedOption?.map((item) => { return item.value }) : []
                                                );
                                            }}
                                            placeholder={<div>Search by blog heading  </div>}
                                            isClearable={true}
                                            isMulti
                                            value={blogsForDropdownData.filter((item) => {
                                                return (
                                                    charityFormData.values?.blog_link?.includes(item?.value)
                                                );
                                            })}

                                            className="react-select-container"
                                        />
                                        {/* <i className='th-outline-search-normal-1'></i> */}
                                    </div>
                                </Form.Group>

                                <Row className='create-blog-row'>
                                    {
                                        !isEmptyObjectOrNullUndefiend(charityFormData.values?.blog_link) && !isEmptyObjectOrNullUndefiend(blogsForDropdownData) ?
                                            <>

                                                {
                                                    blogsForDropdownData.filter((val) => charityFormData.values?.blog_link.includes(val.value))?.map((item, index) => {

                                                        return (

                                                            <Col md={4} key={index}>
                                                                <div className="blogs-card">
                                                                    <div className="blogs-image">
                                                                        <img src={blogImage} alt="blogImage" />
                                                                    </div>
                                                                    <div className="blogs-text">
                                                                        <h6>{!isNullUndefinedOrBlank(item?.other?.heading) ? item?.other?.heading : "-"}</h6>
                                                                        <p>{!isNullUndefinedOrBlank(item?.other?.heading) ? item?.other?.heading : "-"}</p>
                                                                    </div>
                                                                    <div className="blog-delete" onClick={() => {
                                                                        const newData = [...charityFormData.values?.blog_link];
                                                                        const updatedData = newData?.filter((val) => val !== item.value)
                                                                        charityFormData.setFieldValue("blog_link", updatedData);
                                                                    }}>
                                                                        <i className='th-outline-close-circle'></i>
                                                                    </div>
                                                                </div>
                                                            </Col>


                                                        )
                                                    })
                                                }

                                            </>
                                            :
                                            <></>
                                    }
                                    {/* <Col md={4}>
                                        <div className="blogs-card">
                                            <div className="blogs-image">
                                                <img src={blogImage} alt="blogImage" />
                                            </div>
                                            <div className="blogs-text">
                                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                            </div>
                                            <div className="blog-delete">
                                                <i className='th-outline-close-circle'></i>
                                            </div>
                                        </div>
                                    </Col> */}
                                    {/* <Col md={4}>
                                        <div className="blogs-card">
                                            <div className="blogs-image">
                                                <img src={blogImage} alt="blogImage" />
                                            </div>
                                            <div className="blogs-text">
                                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                            </div>
                                            <div className="blog-delete">
                                                <i className='th-outline-close-circle'></i>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="blogs-card">
                                            <div className="blogs-image">
                                                <img src={blogImage} alt="blogImage" />
                                            </div>
                                            <div className="blogs-text">
                                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                            </div>
                                            <div className="blog-delete">
                                                <i className='th-outline-close-circle'></i>
                                            </div>
                                        </div>
                                    </Col> */}
                                </Row>

                            </Col>
                            <Col md={4}>
                                <div className="create-charity-card-wrapper">
                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>STATUS</h6>
                                            </div>
                                            <Form.Group className="form-group mb-0" >
                                                <Form.Label>Charity Status <span className='required'>*</span></Form.Label>

                                                <Select
                                                    options={charityStatusForDropdownData}

                                                    onChange={(selectedOption) => {
                                                        charityFormData.setFieldValue("charity_status", selectedOption?.value)
                                                    }}
                                                    placeholder={<div>Charity Status*</div>}
                                                    isClearable={true}
                                                    value={charityStatusForDropdownData?.filter(({ value }) => {
                                                        return (
                                                            value ===
                                                            charityFormData.values.charity_status
                                                        );
                                                    })}


                                                    className="react-select-container"
                                                />
                                                {charityFormData.touched.charity_status &&
                                                    charityFormData.errors.charity_status
                                                    ? renderError(charityFormData.errors?.charity_status)
                                                    : null}

                                                <Form.Text className="text-muted">
                                                    <i className='th-outline-info-circle'></i> Mange charity status here
                                                </Form.Text>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>TAGS</h6>
                                            </div>
                                            <Form.Group className="form-group " >
                                                <Form.Label>Charity Tags</Form.Label>
                                                {/* <Form.Select aria-label="Default select example">
                                                    <option>Cancer</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select> */}
                                                <Select
                                                    options={tagForDropdownData}
                                                    onChange={(selectedOption) => {

                                                        charityFormData.setFieldValue(
                                                            "tags",
                                                            selectedOption ? selectedOption?.map((item) => { return item.value }) : []
                                                        );
                                                    }}
                                                    placeholder={<div>Select Tags </div>}
                                                    isClearable={true}
                                                    isMulti
                                                    value={tagForDropdownData.filter((item) => {
                                                        return (
                                                            charityFormData.values?.tags?.includes(item?.value)
                                                        );
                                                    })}

                                                    className="react-select-container"
                                                />
                                            </Form.Group>
                                            {
                                                !isEmptyObjectOrNullUndefiend(charityFormData.values?.tags) && !isEmptyObjectOrNullUndefiend(tagForDropdownData) ?
                                                    <>
                                                        <div className="tags-wrapper">
                                                            {
                                                                tagForDropdownData.filter((val) => charityFormData.values?.tags.includes(val.value))?.map((item) => {

                                                                    return (
                                                                        <div className="tags">{!isNullUndefinedOrBlank(item?.label) ? item?.label : "-"}</div>

                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {/* <div className="tags-wrapper">
                                                <div className="tags">Cancer</div>
                                                <div className="tags">Help</div>
                                                <div className="tags">Charity</div>
                                            </div> */}
                                        </Card.Body>
                                    </Card>
                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>Choose Icon</h6>
                                            </div>
                                            <Form.Group controlId="formFile" className="form-group file-darg-drop">
                                                <div className="file-input-darg-drop">
                                                    <div className="file-input-icon-text">
                                                        <div className="file-input-icon">
                                                            <i className="bi bi-upload"></i>
                                                        </div>
                                                        <p>Drag and Drop file here or <span>Choose file</span></p>
                                                    </div>
                                                    {/* <div className="form-control"> */}
                                                    <input className=' ' type="file"
                                                        accept="image/png, image/jpeg,image/jpg"

                                                        // value={charityFormData?.values?.icon_pic}
                                                        onChange={(e) => { !isEmptyObjectOrNullUndefiend(e.target?.files) && charityFormData.setFieldValue("icon_pic", e.target?.files as any) }}
                                                        ref={charityIconImage}
                                                    />
                                                    {/* </div> */}
                                                </div>

                                            </Form.Group>
                                            {
                                                isNullUndefinedOrBlank(charityFormData.errors?.icon_pic) && !isNullUndefinedOrBlank(charityFormData?.values?.icon_pic_name) &&
                                                <div className="from-input-file-name">
                                                    <p>
                                                        {
                                                            charityFormData?.values?.icon_pic_name
                                                        }

                                                        <i onClick={() => {
                                                            charityFormData.setFieldValue("icon_pic", null);
                                                            charityFormData.setFieldValue("icon_pic_name", null)
                                                            charityIconImage.current.value = null
                                                        }} className='th-close'></i>
                                                    </p>
                                                </div>

                                            }
                                            {
                                                charityFormData.errors.icon_pic
                                                    ? renderError(charityFormData.errors?.icon_pic)
                                                    : null}
                                            {/* <Form.Group className="form-group from-input-file" >
                                                <Form.Label>Choose Icon</Form.Label>
                                                <div className="form-control">
                                                    <input className=' ' type="file"
                                                        accept="image/png, image/jpeg,image/jpg"

                                                        // value={charityFormData?.values?.icon_pic}
                                                        onChange={(e) => { !isEmptyObjectOrNullUndefiend(e.target?.files) && charityFormData.setFieldValue("icon_pic", e.target?.files as any) }}
                                                        ref={charityIconImage}
                                                    />
                                                </div>
                                            </Form.Group> */}
                                            {/* {
                                                isNullUndefinedOrBlank(charityFormData.errors?.icon_pic) && !isNullUndefinedOrBlank(charityFormData?.values?.icon_pic_name) &&
                                                <div className="from-input-file-name">
                                                    <p>
                                                        {
                                                            charityFormData?.values?.icon_pic_name
                                                        }

                                                        <i onClick={() => {
                                                            charityFormData.setFieldValue("icon_pic", null);
                                                            charityFormData.setFieldValue("icon_pic_name", null)
                                                            charityIconImage.current.value = null
                                                        }} className='th-close'></i>
                                                    </p>
                                                </div>

                                            } */}

                                            <Form.Group className="form-group " >
                                                <Form.Label>Colour</Form.Label>
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-bold-mouse-square' style={{ color: charityFormData?.values?.charity_color }}></i>                                                    {/* <Form.Select aria-label="Default select example">
                                                        <option>#7209B7</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select> */}
                                                    <div className="form-color-picker">

                                                        <InputColor
                                                            initialValue={charityFormData.values.charity_color}
                                                            onChange={(color) => {
                                                                charityFormData.setFieldValue("charity_color", color.hex);
                                                            }}
                                                        />
                                                    </div>
                                                    {
                                                        !isNullUndefinedOrBlank(charityFormData?.values?.charity_color) &&
                                                        <p className='color-picker-code'>{charityFormData?.values?.charity_color}</p>
                                                    }
                                                    {/* {commentFormData.touched.colorCode &&
                                                        commentFormData.errors.colorCode
                                                        ? renderError(commentFormData.errors.colorCode)
                                                        : null} */}
                                                </div>
                                            </Form.Group>

                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state: RootState) => {
    return {

        charityData: state.CharityManagementReducer.charityData
    };


};

const mapDispatchToProps = {
    getTagDropDownDataApi,
    getBlogDropDownDataApi,
    updateCharityDataApi

};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCharity);

// export default CreateCharity