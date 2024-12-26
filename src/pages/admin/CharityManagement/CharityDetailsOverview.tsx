import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import chart1 from '../../../assets/images/chart.png'
import chart2 from '../../../assets/images/chart2.png'

const CharityDetailsOverview = (props) => {
    return (
        <>
            <Row>
                <Col md={8}>
                    <Card className='normal-card'>
                        <Card.Body>
                            <div className="chart-card">
                                <div className="chart-details">
                                    <div className="chart-details-left">
                                        <div className="chart-details-title">
                                            <h3>Payment History</h3>
                                            <p>Overview of charity collection</p>
                                        </div>
                                        <div className="chart-data">
                                            <div className="chart-data-icon suqare-icon icon-light-primary">
                                                <i className='th-outline-dollar-circle'></i>
                                            </div>
                                            <div className="chart-data-text">
                                                <h4>$78,282</h4>
                                                <p>Net Collection</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chart-details-right">
                                        <div className="chart-filter">
                                            <Form.Group className="form-group filter-group mb-0">
                                                <Form.Select aria-label="Default select example">
                                                    <option>Year 2024</option>
                                                    <option value="1">Year 2022</option>
                                                    <option value="2">Year 2023</option>
                                                    <option value="3">Year 2024</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-chart">
                                    <div className="demo-chart">
                                        <img src={chart1} alt="chart1" />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='normal-card'>
                        <Card.Body>
                            <div className="chart-card">
                                <div className="chart-details">
                                    <div className="chart-details-left">
                                        <div className="chart-details-title">
                                            <h3>Payment History</h3>
                                            <p>Overview of charity collection</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-chart">
                                    <div className="demo-chart">
                                        <img src={chart2} alt="chart1" />
                                    </div>
                                </div>
                                <div className="chart-details mt-3">
                                    <div className="chart-details-left w-100 justify-content-between">
                                        <div className="chart-data w-100">
                                            <div className="chart-data-text">
                                                <p>Subscriber Collection</p>
                                                <h4>$54,525</h4>
                                            </div>
                                        </div>
                                        <div className="chart-data w-100">
                                            <div className="chart-data-text">
                                                <p>One time collection</p>
                                                <h4>$12,525</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharityDetailsOverview)