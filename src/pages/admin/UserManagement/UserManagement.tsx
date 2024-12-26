import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import UserManagementList from './UserManagementList';
import RoleManagement from './RoleManagement';

const UserManagement = (props) => {
    const [addUserShow, setAddUserShow] = useState(false);
    const handleAddUserClose = () => setAddUserShow(false);
    const handleAddUserShow = () => setAddUserShow(true);

    const [show, setAddRoleShow] = useState(false);
    const handleAddRoleClose = () => setAddRoleShow(false);
    const handleAddRoleShow = () => setAddRoleShow(true);

    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>User Management</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="primary" size='sm' className='btn-icon-start' onClick={handleAddUserShow} > <i className='th-outline-add-circle'></i> New User</Button>
                            <Button variant="secondary" size='sm' className='btn-icon-start' onClick={handleAddRoleShow} > <i className='th-outline-add-circle'></i> New Role</Button>
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' > <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start active" id="pills-user-management-tab" data-bs-toggle="pill" data-bs-target="#pills-user-management" type="button" role="tab" aria-controls="pills-user-management" aria-selected="true"> <i className='th-outline-profile-2user'></i>User Management</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start" id="pills-role-management-tab" data-bs-toggle="pill" data-bs-target="#pills-role-management" type="button" role="tab" aria-controls="pills-role-management" aria-selected="false"><i className='th-outline-tick-circle'></i>Role Management</button>
                            </li>


                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-user-management" role="tabpanel" aria-labelledby="pills-user-management-tab">
                                <UserManagementList />
                            </div>
                            <div className="tab-pane fade" id="pills-role-management" role="tabpanel" aria-labelledby="pills-role-management-tab">
                                <RoleManagement handleAddRoleShow={handleAddRoleShow} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={addUserShow} size="lg" onHide={handleAddUserClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Add New Role</Modal.Title>
                    <Button variant="close" onClick={handleAddUserClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="form-group">
                        <Form.Label>Role Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter role name" />
                    </Form.Group>


                    <div className="small-title">
                        <h3>Permissions</h3>
                    </div>
                    <Table responsive bordered hover className='table-theme'>
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th className='text-center'>Admin</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className=''>
                                    Create Charity
                                </td>
                                <td className='tbl-checkbox'>
                                    <Form.Group className="form-group" controlId="adminpopup">
                                        <Form.Check type="checkbox" label="" />
                                    </Form.Group>
                                </td>

                            </tr>
                            <tr>
                                <td className=''>
                                    Create Charity
                                </td>
                                <td className='tbl-checkbox'>
                                    <Form.Group className="form-group" controlId="adminpopup">
                                        <Form.Check type="checkbox" label="" />
                                    </Form.Group>
                                </td>

                            </tr>
                            <tr>
                                <td className=''>
                                    Create Charity
                                </td>
                                <td className='tbl-checkbox'>
                                    <Form.Group className="form-group" controlId="adminpopup">
                                        <Form.Check type="checkbox" label="" />
                                    </Form.Group>
                                </td>

                            </tr>



                        </tbody>
                    </Table>

                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleAddUserClose}>Cancel</Button>
                    <Button variant="primary">Save </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} size="lg" onHide={handleAddRoleClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Add New Role</Modal.Title>
                    <Button variant="close" onClick={handleAddRoleClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="form-group">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Select Role</Form.Label>
                        <Form.Select className='form-select'>
                            <option>Admin</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="form-group" controlId="share">
                        <Form.Check type="checkbox" label="Share password on email" />
                    </Form.Group>


                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleAddRoleClose}>Cancel</Button>
                    <Button variant="primary">Save </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)