import React, { useState } from 'react'
import { connect } from 'react-redux'
import bgCover from '../../../assets/images/cover-image.png'
import { Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import cancerFight from '../../../assets/images/cancer-fight.svg'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'

const CancelledCharityDetails = (props) => {
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-header">

                        <div className="page-cover-image">
                            <img src={bgCover} alt="bgCover" />
                        </div>
                        <div className="page-back">
                            <Button variant="white" size='sm' className='btn-icon-start'> <i className='th-outline-arrow-left'></i> Back</Button>
                        </div>
                        <div className="charity-all-fund">
                            <p>Total Fund Raised</p>
                            <div className="charity-all-fund-wrapper">
                                <div className="charity-all-fund-left">
                                    <h5>$5M</h5>
                                    <p>Target: 10M</p>
                                </div>
                                <div className="charity-all-fund-right">
                                    <div className="charity-all-fund-icon">
                                        <i className='th-outline-dollar-circle'></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="charity-details-profile">
                            <div className="charity-details-profile-edit">
                                <div className="charity-icon">
                                    <img src={cancerFight} alt="cancerFight" />
                                </div>
                                <button className="btn-profile-edit">
                                    <i className='th th-outline-edit-2'></i>
                                    <input type="file" accept="image/x-png,image/jpeg,image/jpg" />
                                </button>
                            </div>
                            <div className="update-cover">
                                <Button variant='light-primary' size='sm' className='  btn-icon-start'>
                                    <i className='th-outline-export'></i>
                                    Change Cover
                                </Button>
                            </div>
                        </div>


                    </div>
                    <div className="single-charity-details">

                        <div className="single-charity-content">
                            <div className="single-charity-content-left">
                                <div className="single-charity-text">
                                    <h2 className='mb-0'>Charity One</h2>
                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and</p> */}
                                </div>
                            </div>
                            <div className="single-charity-content-right">
                                <div className="single-charity-action-btn">
                                    <Button variant='outline-secondary' size='sm' className='btn-icon-start'><i className='th-outline-trash'></i> Delete </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="requested-charity-details">
                        <Row>
                            <Col md={8}>
                                <div className="requested-charity-details-text">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <Button variant='link' className='btn-icon-end'>Read More <i className='th-outline-arrow-right-3'></i></Button>
                                </div>
                                <div className="requested-your-impact">
                                    <h3>Your Impact</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <ul className='icon-list'>
                                        <li>Lorem Ipsum is simply dummy text</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={4}>
                                <Card className='paln-card'>
                                    <Card.Body>
                                        <div className="charity-user-details">
                                            <div className="charity-user-details-payment">
                                                <p>Charity</p>
                                                <h2>$20 <span>/month</span></h2>
                                            </div>
                                            <div className="charity-user-details-prtofile">
                                                <img src={defaultAvatar2} alt="defaultAvatar2" />
                                                <h3>Nicolas Cage</h3>
                                            </div>
                                            <div className="charity-user-payment-date">
                                                <p>Start Date <span>12 March 2024</span></p>
                                                <p>End Date <span>Lifetime</span></p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>




                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CancelledCharityDetails)