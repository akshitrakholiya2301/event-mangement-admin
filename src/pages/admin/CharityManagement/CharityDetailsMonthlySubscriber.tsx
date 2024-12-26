import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import priority from '../../../assets/images/priority.png'
import cancerFight from '../../../assets/images/cancer-fight.svg'

const CharityDetailsMonthlySubscriber = (props) => {
    return (
        <>
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
                        <Form.Select aria-label="Status">
                            <option>Status</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group filter-group">
                        <div className="form-control-icon icon-start">
                            <i className='th-outline-calendar-1'></i>
                            <Form.Control type="text" placeholder="Date Range" />
                        </div>
                    </Form.Group>
                </div>
            </div>

            <Table responsive bordered hover className='table-theme'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className=''>Donor Name</th>
                        <th className=''>Email</th>
                        <th className='text-center'>Start Date</th>
                        <th className='text-center'>Method</th>
                        <th className='text-center'>Amount</th>
                        <th className='text-center'>Total AMT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className=''>INV-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className='text-center text-primary'>$20/Month</td>
                        <td className='text-center text-secondary'>$80</td>
                    </tr>
                    <tr>
                        <td className=''>INV-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className='text-center text-primary'>$20/Month</td>
                        <td className='text-center text-secondary'>$80</td>
                    </tr>
                    <tr>
                        <td className=''>INV-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className='text-center text-primary'>$20/Month</td>
                        <td className='text-center text-secondary'>$80</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharityDetailsMonthlySubscriber)