import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from 'react-bootstrap';
import heading from '../../../assets/images/heading.svg';
import delete_icon from '../../../assets/images/delete.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BlogUploadedImages, BlogsResponse, DropDownResponse, DropdownListFormat, ENUMFORROUTES } from '../../../interfaces/interface';
import { checkFileSize, copyText, customJsonInclude, formatedDate, getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { MAX_5, MAX_50, MAX_500, WEBSITE_PATTERN } from '../../../Utility/Validation_Helper';
import * as yup from 'yup';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { addEditBlogAPI } from '../../../redux/Service/blogManagement';
import { ENUM_FOR_BLOG_CREATE_PRIVIEW, ENUM_FOR_BLOG_STATUS, ENUM_FOR_STUTUS, ENUM_FOR_TAGS } from '../../../interfaces/enum';
import Select from "react-select";
import SingleBlog from './singleBlog';
import blogCover from '../../../assets/images/blog-colver.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { getTagDropDownDataApi } from '../../../redux/Service/CharityMangement/charityMangement';
import { PLEASE_PROVIDE_VALID_LINK } from '../../../Utility/Validation_Message';

const CreateBlog = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [show, setDeleteShow] = useState(false);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    /* ------------------------------create blog---------------------------- */
    const [uploadedImages, setUploadedImages] = useState<Array<BlogUploadedImages>>([]);
    const [uploadedCoverImages, setUploadedCoverImages] = useState<BlogUploadedImages | null>({});
    const [blogData, setBlogData] = useState<BlogsResponse>({} as BlogsResponse);
    const blogCoverImages = useRef(null) as any;
    const blogImages = useRef(null) as any;
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<any>("");
    const [errorMsgCoverImage, setErrorMsgCoverImage] = useState<any>("");

    // const handleGetUserProfileData = async () => {
    //     let response = await props.getUserProfile();
    //     // if (!isNullUndefinedOrBlank(response)) {
    //     //     setUserData(response.payload)
    //     // }
    // }


    const handleUploadCoverImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (!isNullUndefinedOrBlank(file)) {

            // const fileSIzeInMb = +convertDecimalTwoPoint(file.size / (1024 ** 2));
            if (!checkFileSize(file.size, MAX_5)) {
                setShowError(true);
                setErrorMsgCoverImage("File size can not be exceeded than 5 mb.");
                blogCoverImages.current.value = null;
                setUploadedCoverImages(null);
                return;
            }
            const url = URL.createObjectURL(file);

            const splitValue = file?.name.split(".");
            const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
            const CheckExteValues = ["png", "jpeg", "jpg"];

            if (CheckExteValues.includes(ExteValue)) {
                setUploadedCoverImages({ file: file, url: url, name: file.name })
                setShowError(false);
                setErrorMsgCoverImage("");
            }
            else {
                blogCoverImages.current.value = null;
                setShowError(true);
                setErrorMsgCoverImage("Uploaded Image type is not Valid");
                setUploadedCoverImages(null);
            }
        }
        else {
            setShowError(false);
            setErrorMsgCoverImage("");
        }
    };

    const handleremoveCoverImg = () => {
        blogCoverImages.current.value = null;
        setShowError(false);
        setErrorMsgCoverImage("");
        setUploadedCoverImages(null);


    }
    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        let flag: boolean = false;
        chosenFiles.map((key, index) => {
            const ext = key.name.split(".");
            let element = ext.pop();
            if (element.toLowerCase() === 'jpg' || element.toLowerCase() === 'jpeg' || element.toLowerCase() === 'png' || element.toLowerCase() === 'webp') {
                setErrorMsg('');
                setShowError(false)
                flag = false;
                return flag;
            }
            else {
                setShowError(true)
                setErrorMsg("Please Select Valid Image!");
                flag = true;
                return flag;
            }
        });
        if (!flag) {
            handleUploadFiles(chosenFiles);
        }


    };
    const handleUploadFiles = files => {
        const uploaded: any[] = [...uploadedImages];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f: BlogUploadedImages) => f?.file?.name === file.name) === -1) {
                if (uploaded.length >= 10) {
                    setErrorMsg("Maximum 10 Images are allowed!");
                    setShowError(false)
                }
                else {
                    let fileobj: BlogUploadedImages = {} as BlogUploadedImages;
                    fileobj.file = file;
                    fileobj.url = URL.createObjectURL(file);
                    uploaded.push(fileobj);
                    // inputProfileImg.current.value = null;
                }

            }
        })
        setUploadedImages(uploaded);
    };

    const onRemoveFileFromArray = (index) => {
        const uploaded: any[] = [...uploadedImages];
        uploaded.splice(index, 1);
        // console.log('uploaded',uploaded);

        setUploadedImages(uploaded);
        // console.log(inputProfileImg);


        setErrorMsg("");
        setShowError(false);
        blogImages.current.value = null
    }


    const initValues: BlogsResponse = {
        id: "",
        heading: "",
        description: "",
        link: "",
        tags: [],
        status: "",
        urls: [],
    }
    const onSubmit = (values) => {
    };

    const validationSchema = yup.object({
        heading: yup.string().trim().required("Heading is Required"),
        description: yup.string().trim().required("Heading is Required"),
        link: yup.string().trim().nullable().matches(WEBSITE_PATTERN, PLEASE_PROVIDE_VALID_LINK),
        tags: yup.array().nullable(),
        status: yup.string().nullable(),
        urls: yup.array(),
    });

    const addEditBlogFormData = useFormik({
        initialValues: blogData ? blogData : initValues,
        onSubmit,
        validationSchema,

    });

    const handleAddEditBlogSubmit = async () => {
        addEditBlogFormData.handleSubmit();
        const addEditBlogErrors = await addEditBlogFormData.validateForm();
        // console.log(addEditBlogErrors);
        if (Object.keys(addEditBlogErrors).length > 0 || showError) {
            addEditBlogFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(addEditBlogErrors, true));

            return;
        }
        const reqBody = new FormData();
        delete addEditBlogFormData.values.images
        delete addEditBlogFormData.values.propsData


        let urls: any = []

        if (!isEmptyObjectOrNullUndefiend(uploadedImages)) {
            uploadedImages.map((item, index) => {

                if (item.file) {
                    reqBody.append(`blog_pic`, item.file, item.file.name);
                } else {
                    urls.push(item.url)
                }
            });
        }
        if (!isNullUndefinedOrBlank(uploadedCoverImages)) {
            if (uploadedCoverImages?.file) {

                reqBody.append(`cover_image`, uploadedCoverImages?.file);
            } else {
                urls.push(uploadedCoverImages?.file)
            }
        }
        let requestValue = { ...addEditBlogFormData.values, urls: urls, status: ENUM_FOR_BLOG_STATUS.Published };
        if (!isNullUndefinedOrBlank(addEditBlogFormData.values.id)) {
            // console.log("hello")
            requestValue = { ...requestValue, status: addEditBlogFormData.values.status }
        }
        customJsonInclude(requestValue);
        reqBody.append("blogsDetail", JSON.stringify(requestValue));

        const response = await props.addEditBlogAPI(reqBody);

        if (!isEmptyObjectOrNullUndefiend(response)) {
            navigateToRelatedScreen(ENUMFORROUTES.MANAGE_BLOGS, state && state.propsData)
        }
    }

    const handleSelectedTag = (selected) => {
        let tags: any = [];
        if ((!isNullUndefinedOrBlank(selected))) {
            selected.map((key, index) => {
                tags.push(key.label)
            })
        }
        addEditBlogFormData.setFieldValue("tags", tags)
    }

    useEffect(() => {
        // console.log(state);
        if (!isNullUndefinedOrBlank(state)) {
            addEditBlogFormData.setValues({ ...state });
            setBlogData(state);
            // console.log(addEditBlogFormData.values.tags);
            // addEditBlogFormData.values.tags = JSON.parse(addEditBlogFormData.values.tags)
            if (!isEmptyObjectOrNullUndefiend(state.images)) {
                const images = state.images;
                let updatedImages: any = [];
                // let array: any = []
                images.map((item, index) => {
                    let fileobj: BlogUploadedImages = {} as BlogUploadedImages;
                    if (item.doc_type == "blog_pic") {
                        fileobj.file = null;
                        fileobj.url = item.url;
                        updatedImages.push(fileobj)
                        // array.push({ url: item.url, doc_type: "blog_pic" })
                    } else {
                        fileobj.file = null;
                        fileobj.url = item.url;
                        fileobj.name = item.original_name
                        setUploadedCoverImages(fileobj)
                        // array.push({ url: item.url, doc_type: "cover_image" })
                    }
                });
                setUploadedImages(updatedImages);
                // addEditBlogFormData.setFieldValue("urls", array)
            }
        }
    }, [])
    /* -----------------------------------get dropdown for tags----------------------------------- */

    const [tagForDropdownData, setTagForDropdownData] = useState<Array<DropdownListFormat>>([]);
    const getTagDropDownData = async () => {
        const response = await props.getTagDropDownDataApi({ type: "Blog" });
        if (response) {
            setTagForDropdownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);
        }

    }
    useEffect(() => {
        getTagDropDownData();
    }, [])

    /* -----------------------------------------------handle Back--------------------------------------------- */

    const handleBackToManageScreen = (route: any, data: any) => {
        if (data) {
            navigate(route, { state: data })
        }
        else {
            navigate(route)
        }
    }

    /* -------------------------------------------------handle Preview------------------------------------------ */
    const [handlePage, sethandlePage] = useState<string>(ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG)

    const blogPreview = async () => {
        addEditBlogFormData.handleSubmit();
        const addEditBlogErrors = await addEditBlogFormData.validateForm();
        // console.log(addEditBlogErrors);
        if (Object.keys(addEditBlogErrors).length > 0) {
            addEditBlogFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(addEditBlogErrors, true));
            return;
        } else {
            sethandlePage(ENUM_FOR_BLOG_CREATE_PRIVIEW.PREVIEW_BLOG)
            // let addImages: any = [];
            // if (uploadedCoverImages?.url) {
            //     console.log(uploadedCoverImages);
            //     addImages.push({ ...uploadedCoverImages, doc_type: "cover_image" })
            // }
            // if (!isEmptyObjectOrNullUndefiend(uploadedImages)) {
            //     uploadedImages.map((key, index) => {
            //         console.log();
            //         addImages.push({ ...key, doc_type: "blog_pic" })
            //     })
            // }
            // console.log(addImages);
            // let data = {
            //     ...addEditBlogFormData.values,
            //     tags: JSON.stringify(addEditBlogFormData.values.tags),
            //     type: state && state.type && state.type,
            //     author_name: addEditBlogFormData.values.author_name ? addEditBlogFormData.values.author_name : getName(),
            //     createdAt: addEditBlogFormData.values.createdAt ? addEditBlogFormData.values.createdAt : formatedDate(new Date(), "DD MMMM, YYYY"),
            //     likes: addEditBlogFormData.values.likes ? addEditBlogFormData.values.likes : 0,
            //     images: addEditBlogFormData.values.images ? addEditBlogFormData.values.images : addImages
            // }
            // console.log(data, "---data");
            // navigate(ENUMFORROUTES.SINGLE_BLOG, { state: data });

        }
    };


    const navigateToRelatedScreen = (route: any, val?: any, type?: string) => {
        if (val) {
            let dataObj = { ...val, type }
            console.log(dataObj)
            navigate(route, { state: dataObj })
        }
        else {
            navigate(route)
        }

    }


    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-breadcrumb pb-0">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" onClick={() => { handleBackToManageScreen(ENUMFORROUTES.MANAGE_BLOGS, state?.propsData && state?.propsData); }}>
                                    <NavLink to="" >
                                        <i className="th-outline-gift">
                                        </i>All Blogs
                                    </NavLink>
                                </li>
                                <li className={`breadcrumb-item ${handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG ? "active" : ""}`} aria-current="page" onClick={() => { sethandlePage(ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG) }}>{(isNullUndefinedOrBlank(state)) && (isNullUndefinedOrBlank(state?.type)) ? "Create New " : "Edit"} Blog</li>
                                {
                                    (handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.PREVIEW_BLOG) && (
                                        <li className={`breadcrumb-item ${handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.PREVIEW_BLOG ? "active" : ""}`} aria-current="page">Preview Blog</li>
                                    )
                                }

                            </ol>
                        </nav>
                    </div>
                    {
                        (handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG) && (
                            <>
                                <div className="page-title border-bottom">
                                    <div className="page-title-left">
                                        <div className="page-title-text">
                                            <h2>{(isNullUndefinedOrBlank(state)) && (isNullUndefinedOrBlank(state?.type)) ? "Create" : "Edit"} Blog </h2>
                                        </div>
                                    </div>
                                    <div className="page-title-right">
                                        <Button variant="white" size='sm' className='btn-icon-start' onClick={blogPreview}> <i className='th-outline-eye'></i> Preview</Button>
                                        <Button variant="secondary" size='sm' className='btn-icon-start' onClick={() => { handleAddEditBlogSubmit() }}> <i className='th-outline-tick-circle' ></i> Save</Button>
                                        {/* <Button variant="primary" size='sm' className='btn-icon-start'> <i className='th-outline-tick-circle'></i> Publish</Button> */}
                                        <Button variant="icon-sm" className='btn-icon-white-outline-sm' onClick={() => { handleBackToManageScreen(ENUMFORROUTES.MANAGE_BLOGS, state?.propsData && state?.propsData); }}> <i className='th-close'></i></Button>
                                    </div>
                                </div>

                                <div className="create-charity-from">
                                    <Row>
                                        <Col md={8} >
                                            <Form.Group className="form-group" >
                                                <Form.Label>Blog Heading</Form.Label>
                                                <Form.Control type="text" placeholder="Fight for nature protect |"   {...addEditBlogFormData.getFieldProps("heading")} maxLength={MAX_50} />
                                                {addEditBlogFormData.touched.heading &&
                                                    addEditBlogFormData.errors.heading
                                                    ? renderError(addEditBlogFormData.errors.heading)
                                                    : null}
                                            </Form.Group>

                                            <Form.Group className="form-group" >
                                                <Form.Label>Description</Form.Label>
                                                <CKEditor
                                                    editor={Editor as any}
                                                    // data={}
                                                    data={addEditBlogFormData.values.description}
                                                    onReady={(editor) => {
                                                        // You can store the "editor" and use when it is needed.
                                                        // console.log("Editor is ready to use!", editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        addEditBlogFormData.setFieldValue("description", data);
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
                                                {/* <Form.Control as="textarea" rows={5} placeholder='Add detail description of Blog'{...addEditBlogFormData.getFieldProps("description")} maxLength={MAX_500} /> */}
                                                {addEditBlogFormData.touched.description &&
                                                    addEditBlogFormData.errors.description
                                                    ? renderError(addEditBlogFormData.errors.description)
                                                    : null}
                                            </Form.Group>

                                            <Form.Group controlId="formFile" className="form-group file-darg-drop">
                                                <div className="form-label-action">
                                                    <Form.Label>Add Image</Form.Label>
                                                    <button className="text-danger" onClick={handleDeleteShow}><i className='th-outline-trash'></i></button>
                                                </div>

                                                <div className="file-input-darg-drop">
                                                    <div className="file-input-icon-text">
                                                        <div className="file-input-icon">
                                                            <i className="bi bi-upload"></i>
                                                        </div>
                                                        <p>Drag and Drop file here or <span>Choose file</span></p>
                                                    </div>
                                                    <input type="file" multiple onChange={(e) => { handleFileEvent(e) }} ref={blogImages} />
                                                </div>

                                                <div className='file-darg-drop-image-wrapper'>
                                                    {(!isEmptyObjectOrNullUndefiend(uploadedImages)) && (
                                                        uploadedImages.map((key, index) => (
                                                            <div className='file-darg-drop-image' key={index}>
                                                                <img src={key.url} alt="" />
                                                                <button onClick={() => { onRemoveFileFromArray(index) }}> <i className='th-close'></i> </button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                                {errorMsg !== "" ? renderError(errorMsg) : <></>}
                                            </Form.Group>
                                            {/* <Form.Group className="form-group" >
                                    <div className="form-label-action">
                                        <Form.Label>Add Heading</Form.Label>
                                        <button className="text-danger" onClick={handleDeleteShow}><i className='th-outline-trash'></i></button>
                                    </div>
                                    <Form.Control as="textarea" rows={5} placeholder='Add detail description of charity event' />
                                </Form.Group> */}

                                            <div className="add-blog-section">
                                                <Button variant='light-primary' className='btn-icon-start'><img src={heading} alt="heading" /> Heading</Button>
                                                <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-document'></i> Description</Button>
                                                <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-image'></i> Image</Button>
                                                <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-video-play'></i> Video</Button>
                                            </div>

                                        </Col>
                                        <Col md={4}>
                                            <div className="create-charity-card-wrapper">
                                                {/* <Card className='paln-card'>
                                                    <Card.Body >
                                                        <div className="paln-card-title">
                                                            <h6>STATUS</h6>
                                                        </div>
                                                        <Form.Group className="form-group mb-0" >
                                                            <Form.Label>Blog Status</Form.Label>

                                                            <Select
                                                                options={ENUM_FOR_STUTUS}
                                                                onChange={(selectedOption) => {
                                                                    addEditBlogFormData.setFieldValue("status", selectedOption?.value)
                                                                }}
                                                                placeholder={<div>Select status </div>}
                                                                isClearable={true}
                                                                value={ENUM_FOR_STUTUS?.filter(({ value }) => {
                                                                    return (
                                                                        value === addEditBlogFormData.values.status
                                                                    );
                                                                })}
                                                                className="react-select-container"
                                                            />
                                                            <Form.Text className="text-muted">
                                                                <i className='th-outline-info-circle'></i> Mange blog status here
                                                            </Form.Text>
                                                            {addEditBlogFormData.touched.status &&
                                                                addEditBlogFormData.errors.status
                                                                ? renderError(addEditBlogFormData.errors.status)
                                                                : null}
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Card> */}
                                                <Card className='paln-card'>
                                                    <Card.Body >
                                                        <div className="paln-card-title">
                                                            <h6>BLOG LINK</h6>
                                                        </div>
                                                        <Form.Group className="form-group" >
                                                            <Form.Label>Blog Link</Form.Label>
                                                            <div className="form-control-icon icon-end">
                                                                <Form.Control type="text" placeholder="https://purecharity.au/blogs/charity"  {...addEditBlogFormData.getFieldProps("link")} />
                                                                <i className='th-outline-copy' onClick={() => { copyText(addEditBlogFormData.values.link) }}></i>
                                                            </div>
                                                            {addEditBlogFormData.touched.link &&
                                                                addEditBlogFormData.errors.link
                                                                ? renderError(addEditBlogFormData.errors.link)
                                                                : null}
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Card>

                                                <Card className='paln-card'>
                                                    <Card.Body >
                                                        <div className="paln-card-title">
                                                            <h6>TAGS</h6>
                                                        </div>
                                                        <Form.Group className="form-group " >
                                                            <Form.Label>Blog Tags</Form.Label>
                                                            <Select
                                                                options={tagForDropdownData}
                                                                onChange={(selectedOption) => {
                                                                    handleSelectedTag(selectedOption)
                                                                }}
                                                                placeholder={<div>Select Tag </div>}
                                                                isClearable
                                                                value={tagForDropdownData.filter((item) => {
                                                                    return (
                                                                        addEditBlogFormData.values?.tags?.includes(item?.label)
                                                                    );
                                                                })}
                                                                isMulti
                                                                className="react-select-container"
                                                            />
                                                        </Form.Group>
                                                        <div className="tags-wrapper">
                                                            {/* {(!isEmptyObjectOrNullUndefiend(ENUM_FOR_TAGS)) && ENUM_FOR_TAGS.map((keyArray, index) => (
                                                    (!isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.tags)) && addEditBlogFormData.values?.tags?.map((key, index) => (
                                                        (key === keyArray.value) && (
                                                            <div className="tags" key={index}>{keyArray.label}</div>
                                                        )
                                                    ))

                                                ))} */}
                                                            {
                                                                !isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.tags) && !isEmptyObjectOrNullUndefiend(tagForDropdownData) ?
                                                                    <>
                                                                        <div className="tags-wrapper">
                                                                            {
                                                                                tagForDropdownData.filter((val) => addEditBlogFormData.values?.tags.includes(val.label))?.map((item) => {
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

                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                                <Card className='paln-card'>
                                                    <Card.Body >
                                                        <div className="paln-card-title">
                                                            <h6>ADD COVER IMAGE</h6>
                                                        </div>

                                                        <Form.Group className="form-group file-darg-drop">
                                                            {/* <Form.Label>Add Image</Form.Label> */}

                                                            <div className="file-input-darg-drop">
                                                                <div className="file-input-icon-text">
                                                                    <div className="file-input-icon">
                                                                        <i className="bi bi-upload"></i>
                                                                    </div>
                                                                    <p>Drag and Drop file here or <span>Choose file</span></p>
                                                                </div>
                                                                <input type="file" onChange={(e) => { handleUploadCoverImg(e) }} ref={blogCoverImages} />
                                                            </div>


                                                            <div className='from-input-file-name'>
                                                                {(!isNullUndefinedOrBlank(uploadedCoverImages?.name)) && (
                                                                    <>
                                                                        {/* <img src={uploadedCoverImages ? uploadedCoverImages?.url : ""} alt="Pure Charity" /> */}
                                                                        <p>{uploadedCoverImages?.name}

                                                                            <i onClick={() => { handleremoveCoverImg() }} className='th-close'></i>
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </div>

                                                            {/* <div className="from-input-file-name">
                                                                <p>
                                                                    {
                                                                        uploadedCoverImages?.values?.cover_image_name
                                                                    }

                                                                    <i onClick={() => { handleremoveCoverImg() }} className='th-close'></i>
                                                                </p>
                                                            </div> */}
                                                            {errorMsgCoverImage != "" ? renderError(errorMsgCoverImage) : <></>}
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </>

                        )
                    }
                    {
                        (handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.PREVIEW_BLOG) && (
                            <>
                                {/* <div className="page-content"> */}
                                {/* <div className="page-content-wrapper"> */}
                                {/* <div className="page-breadcrumb pb-0">
                              <nav>
                                <ol className="breadcrumb">
                                  <li className="breadcrumb-item">
                                    <NavLink to="/manage-blogs">
                                      <i className="th-outline-gift">
                                      </i>All Blogs
                                    </NavLink>
                                  </li>
                                  <li className="breadcrumb-item" onClick={() => { handleBackOnCreate() }}>
                                    <NavLink to="/create-blogs">
                                      <i className="th-outline-gift">
                                      </i>{isNullUndefinedOrBlank(state?.type) ? " Add New " : "Edit "}Blog
                                    </NavLink>
                                  </li>
                                  <li className="breadcrumb-item active" aria-current="page">Blog Preview</li>
                                </ol>
                              </nav>
                  
                  
                            </div> */}
                                <div className="page-title border-bottom">
                                    <div className="page-title-left">
                                        <div className="page-title-text">
                                            <h2>Preview of ({(!isNullUndefinedOrBlank(addEditBlogFormData.values) && !isNullUndefinedOrBlank(addEditBlogFormData.values.heading)) ? addEditBlogFormData.values.heading : "-"})</h2>
                                        </div>
                                    </div>
                                    <div className="page-title-right">
                                        <Button variant="icon-sm" className='btn-icon-white-outline-sm' onClick={() => { sethandlePage(ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG) }}> <i className='th-close'></i></Button>
                                    </div>
                                </div>
                                <div className="blog-details">
                                    <div className="blog-details-cover">
                                        {!isNullUndefinedOrBlank(uploadedCoverImages?.url) ?
                                            <img src={uploadedCoverImages?.url} alt="blogCover" />
                                            :
                                            <img src={blogCover} alt="blogCover" />

                                        }
                                    </div>
                                    <div className="blog-info-content">
                                        <div className="blog-info">
                                            <div className="blog-info-left">
                                                <div className="blog-info-tag">{!isNullUndefinedOrBlank(addEditBlogFormData.values.author_name) ? addEditBlogFormData.values.author_name : getName()}</div>
                                                <div className="blog-info-date-like">{!isNullUndefinedOrBlank(addEditBlogFormData.values.createdAt) ? formatedDate(addEditBlogFormData.values.createdAt, "DD MMMM, YYYY") : formatedDate(new Date(), "DD MMMM, YYYY")} <span>•</span> {!isNullUndefinedOrBlank(addEditBlogFormData.values.likes) ? addEditBlogFormData.values.likes : 0}</div>
                                            </div>
                                            <div className="blog-info-right">
                                                <div className="blog-info-icon">
                                                    <NavLink to="" className='round-icon icon-white'>
                                                        <i className='bi bi-link-45deg'></i>
                                                    </NavLink>
                                                    <NavLink to="" className='round-icon icon-white'>
                                                        <i className='bi bi-twitter'></i>
                                                    </NavLink>
                                                    <NavLink to="" className='round-icon icon-white'>
                                                        <i className='bi bi-facebook'></i>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-content">
                                            <h3>{(!isNullUndefinedOrBlank(addEditBlogFormData.values) && !isNullUndefinedOrBlank(addEditBlogFormData.values.heading)) ? addEditBlogFormData.values.heading : "-"}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(addEditBlogFormData.values) && !isNullUndefinedOrBlank(addEditBlogFormData.values.description)) ? addEditBlogFormData.values.description : <>-</> as any }}>
                                            </div>
                                            {/* <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators</p>
                                                <h4>Dr Nicolas Cage: Making a difference for dads everywhere</h4>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum</p>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                                    suffered alteration in some form, by injected humour</p> */}
                                            <div className="blog-content-image">
                                                {
                                                    !isEmptyObjectOrNullUndefiend(uploadedImages) ?
                                                        uploadedImages.map((key, index) => (
                                                            // (index <= 0) && (index > 2) &&
                                                            <div className="blog-content-image-wrapper">
                                                                <img src={key.url} alt="blogCover" />
                                                            </div>
                                                        )) :
                                                        <div className="blog-content-image">
                                                            <div className="blog-content-image-wrapper">
                                                                <img src={blogCover} alt="blogCover" />
                                                            </div>

                                                        </div>

                                                }
                                                {/* <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>
                                                    <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>
                                                </div>
                                                <div className="blog-content-image">
                                                    <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>*/}

                                            </div>

                                            <Button variant='outline-primary' className='btn-icon-start'> <i className='th-outline-like-1'></i> Like</Button>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                            </>
                        )
                    }

                </div>
            </div>
            {/* <Modal show={show} onHide={handleDeleteClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Block</Modal.Title>
                    <Button variant="close" onClick={handleDeleteClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Delete <b>“Heading”</b> Block</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleDeleteClose}>No, Change my mind</Button>
                    <Button variant="secondary">Yes, Delete Block</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addEditBlogAPI,
    getTagDropDownDataApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)