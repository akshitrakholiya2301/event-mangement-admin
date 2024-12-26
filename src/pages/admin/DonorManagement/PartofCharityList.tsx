import React, { useState } from 'react'
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import priority from '../../../assets/images/priority.png'
const PartofCharityList = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                <div className="page-filter-right">

                </div>
            </div>
            <Row>
                <Col md={4}>
                    <Card className='normal-card'>
                        <Card.Body>
                            <div className="charity-card">
                                <div className="charity-card-title">
                                    <div className="charity-icon bg-red">
                                        <i className='th-bold-box'></i>
                                    </div>
                                    <div className="charity-text">
                                        <div className="charity-text-action">
                                            <h3>Charity One</h3>
                                            <Dropdown className="card-action ">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <i className='th-outline-more'></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="charity-text-description">
                                            <p>Loream ipsum is simply dummy text to mange </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="charity-card-details">
                                    <div className="per-month-charity">
                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
                                    </div>
                                </div>
                                <div className="charity-target">
                                    <div className="charity-target-item">
                                        <h6>$152,525</h6>
                                        <p>Target</p>
                                    </div>
                                    <div className="charity-target-item text-end" >
                                        <h6 className='text-secondary'>$152,525</h6>
                                        <p>Target</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='normal-card'>
                        <Card.Body>
                            <div className="charity-card">
                                <div className="charity-card-title">
                                    <div className="charity-icon bg-yellow">
                                        <i className='th-bold-box'></i>
                                    </div>
                                    <div className="charity-text">
                                        <div className="charity-text-action">
                                            <h3>Charity Two</h3>
                                            <Dropdown className="card-action ">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <i className='th-outline-more'></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="charity-text-description">
                                            <p>Loream ipsum is simply dummy text to mange </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="charity-card-details">
                                    <div className="per-month-charity">
                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
                                    </div>
                                </div>
                                <div className="charity-target">
                                    <div className="charity-target-item">
                                        <h6>$152,525</h6>
                                        <p>Target</p>
                                    </div>
                                    <div className="charity-target-item text-end" >
                                        <h6 className='text-secondary'>$152,525</h6>
                                        <p>Target</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default PartofCharityList