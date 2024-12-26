import React, { useState } from 'react'
import { Button, Col, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'

const Subscribers = () => {
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Manage Subscriber</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' > <i className='th-outline-add-circle'></i> Add New</Button>
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' > <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"> <i className='th-outline-profile-2user'></i>Subscribers (2)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><i className='th-outline-close-circle'></i>Ended</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="tab-data">
                                    <div className="page-filter">
                                        <div className="page-filter-left">

                                            <Form.Group className="form-group filter-group">
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-outline-search-normal-1'></i>
                                                    <Form.Control type="search" placeholder="Search by name" />
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="form-group filter-group">
                                                <Form.Select aria-label="all">
                                                    <option>Charity</option>
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
                                                    <i className='th-outline-calendar-1'></i>
                                                    <Form.Control type="text" placeholder="Start Date" />
                                                </div>
                                            </Form.Group>
                                            <span>-</span>
                                            <Form.Group className="form-group filter-group">
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-outline-calendar-1'></i>
                                                    <Form.Control type="text" placeholder="End Date" />
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="page-filter-right">

                                        </div>
                                    </div>
                                    <div className="card-table-sticky">
                                        <Table responsive bordered hover className='table-theme table-sticky'>
                                            <thead>
                                                <tr>
                                                    <th>Donor Name</th>
                                                    <th>Donor ID</th>
                                                    <th>Charity</th>
                                                    <th>Start Date</th>
                                                    <th className='text-center'>Type</th>
                                                    <th className='text-center'>Plan</th>
                                                    <th className='text-center'>Total AMT</th>
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
                                                    <td>Charity One</td>
                                                    <td>02 Jan 2024</td>
                                                    <td className='text-center'>Individual</td>
                                                    <td className="text-center text-primary">$20 / Month</td>
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
                                                                    <Tooltip>Cancel</Tooltip>
                                                                }
                                                            >
                                                                <Button variant='action' className=''><i className='th-outline-slash'></i></Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </td>
                                                </tr>



                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="tab-data">
                                    <div className="page-filter">
                                        <div className="page-filter-left">

                                            <Form.Group className="form-group filter-group">
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-outline-search-normal-1'></i>
                                                    <Form.Control type="search" placeholder="Search by name" />
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="form-group filter-group">
                                                <Form.Select aria-label="all">
                                                    <option>Charity</option>
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
                                                    <i className='th-outline-calendar-1'></i>
                                                    <Form.Control type="text" placeholder="Start Date" />
                                                </div>
                                            </Form.Group>
                                            <span>-</span>
                                            <Form.Group className="form-group filter-group">
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-outline-calendar-1'></i>
                                                    <Form.Control type="text" placeholder="End Date" />
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="page-filter-right">

                                        </div>
                                    </div>
                                    <div className="card-table-sticky">
                                        <Table responsive bordered hover className='table-theme'>
                                            <thead>
                                                <tr>
                                                    <th>Donor Name</th>
                                                    <th>Donor ID</th>
                                                    <th>Charity</th>
                                                    <th>Start Date</th>
                                                    <th className='text-center'>Type</th>
                                                    <th className='text-center'>Plan</th>
                                                    <th className='text-center'>Total AMT</th>
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
                                                    <td>Charity One</td>
                                                    <td>02 Jan 2024</td>
                                                    <td className='text-center'>Individual</td>
                                                    <td className="text-center text-primary">$20 / Month</td>
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
                                                                    <Tooltip>Delete</Tooltip>
                                                                }
                                                            >
                                                                <Button variant='action' className=''><i className='th-outline-trash'></i></Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </td>
                                                </tr>



                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className="tab-data">
                                    <div className="page-filter">
                                        <div className="page-filter-left">
                                            <Form.Group className="form-group filter-group">
                                                <div className="form-control-icon icon-start">
                                                    <i className='th-outline-search-normal-1'></i>
                                                    <Form.Control type="search" placeholder="Search by name" />
                                                </div>
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
                                        </div>
                                    </div>
                                    <Table responsive bordered hover className='table-theme'>
                                        <thead>
                                            <tr>
                                                <th>Donor Name</th>
                                                <th className='text-center'>User ID</th>
                                                <th >Note</th>
                                                <th className='text-center'>Type</th>
                                                <th className='text-center'>Donated AMT</th>
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
                                                <td className='text-center' >PCU-858</td>
                                                <td >loream ipsum is simply dummy test represent <br /> real content</td>
                                                <td className='text-center'>Individual</td>
                                                <td className="text-center text-primary">$600</td>
                                                <td className='tbl-action'>
                                                    <div className="tbl-action-group">
                                                        <OverlayTrigger
                                                            trigger={["hover", "hover"]}
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip>Accept</Tooltip>
                                                            }
                                                        >
                                                            <Button variant='action' className=''><i className='th-outline-trash'></i></Button>
                                                        </OverlayTrigger>

                                                    </div>
                                                </td>
                                            </tr>





                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscribers