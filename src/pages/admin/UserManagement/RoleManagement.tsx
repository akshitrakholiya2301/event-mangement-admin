import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'


const RoleManagement = (props) => {



    return (
        <>
            <div className="tab-data card-table-sticky wt-filter-table">
                <Table responsive bordered hover className='table-theme table-sticky'>
                    <thead>
                        <tr>
                            <th>Actions</th>

                            <th className='text-center'>Admin</th>
                            <th className='text-center'>Editor</th>
                            <th className='text-center'>Viewer</th>
                            <th className='text-center '>
                                <div className="thead-icon" onClick={() => props.handleAddRoleShow()}>
                                    <i className='th-outline-add-circle'></i>
                                    New Role
                                </div>
                            </th>
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
                            <td className='tbl-checkbox'>
                                <Form.Group className="form-group" controlId="admin">
                                    <Form.Check type="checkbox" label="" />
                                </Form.Group>
                            </td>
                            <td className='tbl-checkbox'>
                                <Form.Group className="form-group" controlId="Editor">
                                    <Form.Check type="checkbox" label="" />
                                </Form.Group>
                            </td>
                            <td className='tbl-checkbox'>
                                <Form.Group className="form-group" controlId="Viewer">
                                    <Form.Check type="checkbox" label="" />
                                </Form.Group>
                            </td>
                            <td className='tbl-checkbox'>

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

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement)