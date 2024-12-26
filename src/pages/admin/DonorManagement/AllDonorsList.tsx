import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import { Button, OverlayTrigger, Tooltip, Table } from 'react-bootstrap'
import { isEmptyObjectOrNullUndefiend } from '../../../Utility/Helper'
import { DonorData, ENUMFORSORTORDER } from '../../../interfaces/interface'

const AllDonorsList = (props) => {
    const [donorData, setDonorData] = useState<Array<DonorData>>([]);


    useEffect(() => {
        setDonorData(props.data)
    }, [props.data])


    return (
        <div className="tab-data card-table-sticky">
            {/* <div className="page-filter">
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-search-normal-1'></i>
                        <Form.Control type="search" placeholder="Search by name" />
                    </div>
                </Form.Group>
                <Form.Group className="form-group filter-group">
                    <Form.Select aria-label="all">
                        <option>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group filter-group">
                    <Form.Select aria-label="Type">
                        <option>Type</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-dollar-circle'></i>
                        <Form.Control type="text" placeholder="AMT Start" />
                    </div>
                </Form.Group>
                <span>-</span>
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-dollar-circle'></i>
                        <Form.Control type="text" placeholder="AMT End" />
                    </div>
                </Form.Group>
            </div> */}
            <Table responsive bordered hover className='table-theme table-sticky'>
                {/* <thead>
                    <tr>
                        <th>Donor Name</th>
                        <th>Donor ID</th>
                        <th className='text-center'>Type</th>
                        <th className='text-center'>Donation</th>
                        <th className='text-end'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className=''>
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td>PCU-858</td>
                        <td className='text-center'>Individual</td>
                        <td className="text-center text-primary">$600</td>

                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>View</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Edit</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                    <tr className='authorized'>
                        <td className=''>
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td>PCU-858</td>
                        <td className='text-center'>Individual</td>
                        <td className="text-center text-primary">$600</td>

                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Edit</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Edit</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className=''>
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td>PCU-858</td>
                        <td className='text-center'>Individual</td>
                        <td className="text-center text-primary">$600</td>

                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Edit</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Edit</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>


                </tbody> */}
                <thead>
                    <tr>
                        {/* <th>Donor Name</th>
                                             <th className='text-center'>User ID</th>
                                             <th >Note</th>
                                             <th className='text-center'>Type</th>
                                             <th className='text-center'>Donated AMT</th>
                                             <th className='text-end'>Action</th> */}

                        {
                            props.columName.map((item, index) => (
                                (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUMFORSORTORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                    onClick={() => {
                                        if (!isEmptyObjectOrNullUndefiend(donorData)) {
                                            props.columnSorting(item.keyName, props.sortOrder)
                                        }
                                    }}>{item.displayName} </th>)

                            ))
                        }
                    </tr>
                </thead>
                {
                    <tbody>
                        {
                            (!isEmptyObjectOrNullUndefiend(donorData)) ?
                                donorData.map((key, index) => (

                                    <tr key={index} className={key.id === props.selectedData ? `authorized` : ''} onClick={() => { props.handleSelectedData(key.id) }}>
                                        <td className=''>
                                            <div className="tbl-profile-container">
                                                <div className="tbl-profile-image">
                                                    <img src={key.url ? key.url : defaultAvatar} alt="10 & Deliver Limited" />
                                                </div>
                                                <div className="tbl-profile-content">
                                                    <h6 onClick={() => { props.navigateToDetailPage(key, index) }}>{(key.first_name && key.last_name) ? `${key.first_name} ${key.last_name}` : " "}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='' >{key.formated_id ? key.formated_id : ""}</td>
                                        {/* <td >loream ipsum is simply dummy test represent <br /> real content</td> */}
                                        <td className='text-center'>{key.donor_type ? key.donor_type : ''}</td>
                                        <td className="text-center text-primary">${key.donated_amount ? `${key.donated_amount}` : 0}</td>
                                        <td className='tbl-action'>
                                            <div className="tbl-action-group">
                                                <OverlayTrigger
                                                    trigger={["hover", "hover"]}
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip>View</Tooltip>
                                                    }
                                                >
                                                    <Button variant='action' className='' onClick={() => { props.navigateToDetailPage(key, index) }}><i className='th-outline-eye'></i></Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    trigger={["hover", "hover"]}
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip>Edit</Tooltip>
                                                    }
                                                >
                                                    <Button variant='action' className=''
                                                        onClick={() => { props.handleOpenEditModal(key) }}
                                                    ><i className='th-outline-edit'></i></Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>


                                        {/* {
                                            (donorTab === ENUMFORDONORSTAB.REQUESTED) && (
                                                <td className='tbl-action'>
                                                    <div className="tbl-action-group">
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Accept</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className='' onClick={() => { setReqType(ENUMFORREQUESTTYPE.ACCEPT); handleApproveDeclineShow(key.id); }}><i className='th-outline-tick-circle'></i></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Reject</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className='' onClick={() => { setReqType(ENUMFORREQUESTTYPE.DECLINE); handleApproveDeclineShow(key.id); }}><i className='th-outline-close-circle'></i></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            )
                                        }

                                        {
                                            (donorTab === ENUMFORDONORSTAB.CANCELLED) && (
                                                <td className='tbl-action'>
                                                    <div className="tbl-action-group">
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Delete</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className='' onClick={() => { setDeleteDonorId(key.id); handleDeleteShow() }}><i className='th-outline-trash'></i></Button>
                                                        </OverlayTrigger>

                                                    </div>
                                                </td>
                                            )
                                        } */}

                                    </tr>
                                ))
                                :

                                <tr>
                                    <td colSpan={5} className='text-center'>No Data Found</td>
                                </tr>
                        }


                    </tbody>
                }

            </Table>
        </div>
    )
}

export default AllDonorsList