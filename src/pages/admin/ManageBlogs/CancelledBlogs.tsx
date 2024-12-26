import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { BlogsResponse, ENUMFORROUTES } from '../../../interfaces/interface'
import { NO_RECORD_FOUND_MSG, formatedDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import { ENUM_FOR_SORT_ORDER, ENUM_FOR_BLOG_STATUS } from '../../../interfaces/enum'
import { useNavigate } from 'react-router-dom'

const CancelledBlogs = (props) => {
    const [blogData, setBlogData] = useState<Array<BlogsResponse>>([])
    useEffect(() => {
        setBlogData(props?.blogData);
    }, [props.blogData])
    const navigate = useNavigate();
    const navigateToRelatedScreen = (route: any, val?: any) => {
        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }

    }
    return (
        <>
            <div className="tab-data card-table-sticky">
                <Table responsive bordered hover className='table-theme table-sticky'>
                    <thead>
                        <tr>
                            {
                                props.columName.map((item, index) => (
                                    (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUM_FOR_SORT_ORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                        onClick={() => {
                                            if (!isEmptyObjectOrNullUndefiend(blogData)) {
                                                props.columnSorting(item.keyName, props.sortOrder)
                                            }
                                        }}>{item.displayName} </th>)

                                ))
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td className=''>
                                <div className="table-blog-deatils">
                                    <img src={defaultAvatar2} alt="defaultAvatar2" />
                                    <div className="table-blog-deatils-deatils-text">
                                        <h6>Blog heading One</h6>
                                        <p>Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus.</p>
                                    </div>
                                </div>
                            </td>
                            <td className=''>
                                Clack C
                            </td>
                            <td className=''>
                                12 March 2024 <br /><span className='text-danger'>Cancelled</span>
                            </td>
                            <td className=''>
                                <div className="tags-wrapper">
                                    <div className="tags">Cancer</div>
                                    <div className="tags">Help</div>
                                    <div className="tags">Charity</div>
                                </div>
                            </td>
                            <td className='tbl-action'>
                                <div className="tbl-action-group">
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Edit</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Cancel</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-close-circle'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Reject</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-close-circle'></i></Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr> */}

                        {
                            !isEmptyObjectOrNullUndefiend(blogData) ?
                                blogData?.map((item, index) => {
                                    return (
                                        <>

                                            <tr key={index}>
                                                <td className=''>
                                                    <div className="table-blog-deatils">
                                                        <img src={(!isEmptyObjectOrNullUndefiend(item.images)) ? item.images[0].url : defaultAvatar} alt="defaultAvatar2" />
                                                        <div className="table-blog-deatils-deatils-text">
                                                            <h6 onClick={() => { props.handleEdit(ENUMFORROUTES.SINGLE_BLOG, item) }}>{(!isNullUndefinedOrBlank(item.heading)) ? item.heading : "-"}</h6>
                                                            <div dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(item.description)) ? item.description : <>-</> as any }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=''>
                                                    {(!isNullUndefinedOrBlank(item.author_name)) ? item.author_name : "-"}
                                                </td>
                                                <td className=''>
                                                    {(!isNullUndefinedOrBlank(item.createdAt)) ? formatedDate(item.createdAt, 'DD MMMM, YYYY') : "-"} <br />
                                                    <span className={(item.status === ENUM_FOR_BLOG_STATUS.Published || item.status === ENUM_FOR_BLOG_STATUS.Unpublished) ? "text-success"
                                                        : (item.status === ENUM_FOR_BLOG_STATUS.Draft) ? "text-warning"
                                                            : (item.status === ENUM_FOR_BLOG_STATUS.Cancelled) ? "text-danger" : "text-primary"
                                                    }>
                                                        {!(isNullUndefinedOrBlank(item.status)) ? item.status : "-"}
                                                    </span>
                                                </td>
                                                <td className=''>
                                                    <div className="tags-wrapper">
                                                        {(!isNullUndefinedOrBlank(item.tags)) ?
                                                            <>
                                                                {
                                                                    item.tags.map((item, index) => (
                                                                        <div className="tags" key={index}>{item}</div>
                                                                    ))
                                                                }
                                                            </>
                                                            :

                                                            <div>-</div>
                                                        }
                                                    </div>
                                                </td>
                                                {/* <td className=''>{(!isNullUndefinedOrBlank(item.likes)) ? item.likes : "-"}</td> */}
                                                <td className='tbl-action'>
                                                    <div className="tbl-action-group">
                                                        {/* <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Edit</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Approve</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className='' onClick={() => { props.handleApprove(item.id) }}><i className='th-outline-tick-circle'></i></Button>
                                                        </OverlayTrigger> */}
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Delete</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className='' onClick={() => { props.handleDeleteBlog(item.id) }}><i className='th-outline-trash'></i></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>


                                        </>
                                    )
                                })
                                : <>
                                    <tr>
                                        <td colSpan={5} className='text-center'>

                                            {NO_RECORD_FOUND_MSG}
                                        </td>
                                    </tr>

                                </>
                        }




                    </tbody>
                </Table>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CancelledBlogs)