import React from 'react'
import { Button, Dropdown, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'


export const UserManagementList = (props) => {
    return (
        <>
            <div className="tab-data card-table-sticky wt-filter-table">
                <Table responsive bordered hover className='table-theme table-sticky'>
                    <thead>
                        <tr>
                            <th>User Details</th>
                            <th>Role</th>
                            <th>Added Date</th>
                            <th>last Activity</th>
                            <th className='text-center'>Status</th>
                            <th className='text-end'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td className=''>
                                <div className="management-user-deatils">
                                    <img src={defaultAvatar2} alt="defaultAvatar2" />
                                    <div className="management-user-deatils-text">
                                        <h6>Patricia Sanders</h6>
                                        <p>rodger913@aol.com</p>
                                    </div>
                                </div>
                            </td>
                            <td className='tbl-select'>
                                <Form.Group className="form-group mb-0">
                                    <Form.Select aria-label="Default select example">
                                        <option>Admin</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                            <td>12 March 2024</td>
                            <td >2 May 2024</td>
                            <td className="tbl-switch">
                                <div className="switch-box">
                                    <label className="switch" htmlFor="status">
                                        <input type="checkbox" id="status" />
                                        <div className="slider round"></div>
                                    </label>
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
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementList)