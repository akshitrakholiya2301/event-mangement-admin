import React from 'react'
import { Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import cancerFight from '../../../assets/images/cancer-fight.svg'
const PaymentDetailsList = () => {
    return (
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
                            <i className='th-outline-calendar-1'></i>
                            <Form.Control type="text" placeholder="Date Range" />
                        </div>
                    </Form.Group>
                    <Button variant='white'  ><i className='th-outline-filter'></i></Button>
                </div>
            </div>
            <div className="card-table-sticky details-table">
                <Table responsive bordered hover className='table-theme'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className=''>Charity Name</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Type</th>
                            <th className='text-center'>Method</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Donation</th>
                            <th className='text-end'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td className=''>INV-858</td>
                            <td >
                                <div className="charity-tbl-user">
                                    <div className="charity-user-icon" style={{ backgroundColor: '#F72585' }}>
                                        <img src={cancerFight} alt="cancerFight" />
                                    </div>
                                    Charity One
                                </div>
                            </td>
                            <td className='text-center'>20 April 2024</td>
                            <td className='text-center'>Monthly</td>
                            <td className='text-center'>PayPal</td>
                            <td className="text-center">
                                <div className="status status-success m-auto">Success</div>
                            </td>
                            <td className='text-center text-primary'>$20</td>
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
                                            <Tooltip>Download</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='bi bi-download'></i></Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className=''>INV-858</td>
                            <td >
                                <div className="charity-tbl-user">
                                    <div className="charity-user-icon" style={{ backgroundColor: '#7209B7' }}>
                                        <i className='th-bold-box'></i>
                                    </div>
                                    Charity One
                                </div>
                            </td>
                            <td className='text-center'>20 April 2024</td>
                            <td className='text-center'>Monthly</td>
                            <td className='text-center'>PayPal</td>
                            <td className="text-center">
                                <div className="status status-success m-auto">Success</div>
                            </td>
                            <td className='text-center text-primary'>$20</td>
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
                                            <Tooltip>Download</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='bi bi-download'></i></Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PaymentDetailsList