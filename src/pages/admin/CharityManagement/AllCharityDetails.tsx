import React, { useState } from 'react'
import bgCover from '../../../assets/images/cover-image.png'
import { Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import cancerFight from '../../../assets/images/cancer-fight.svg'
import trash from '../../../assets/images/trash.svg'
import priority from '../../../assets/images/priority.png'
import CharityDetailsOverview from './CharityDetailsOverview'
import CharityDetailsTransactions from './CharityDetailsTransactions'
import CharityDetailsMonthlySubscriber from './CharityDetailsMonthlySubscriber'
import CharityDetailsOncePayment from './CharityDetailsOncePayment'

const AllCharityDetails = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                    <h2>Charity One</h2>
                                    <p className='d-flex align-items-center' >Lorem Ipsum is simply dummy text of the printing and  <Button variant='link' className='py-0 btn-icon-end' onClick={handleShow} >Read more <i className='th-outline-arrow-right-3'></i></Button></p>

                                </div>
                            </div>
                            <div className="single-charity-content-right">
                                <div className="single-charity-action-btn">
                                    <Button variant='white' size='sm' className='btn-icon-start'> <i className='th-outline-copy'></i> Copy Link</Button>
                                    <Button variant='white' size='sm' className='btn-icon-end'> Edit <i className='th-outline-edit'></i></Button>
                                    <Button variant="icon-sm" className='btn-icon-white-outline-sm' > <i className='th-outline-tick-circle'></i></Button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-tab normal-tab pt-3">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start active" id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview" aria-selected="true"> <i className='th-outline-chart-21'></i>Overview</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start" id="pills-transactions-tab" data-bs-toggle="pill" data-bs-target="#pills-transactions" type="button" role="tab" aria-controls="pills-transactions" aria-selected="false"><i className='th-outline-document-text'></i>Transactions</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab">
                                <div className="tab-data">
                                    <CharityDetailsOverview />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-transactions" role="tabpanel" aria-labelledby="pills-transactions-tab">
                                <div className="tab-data">
                                    <CharityDetailsTransactions />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="page-tab normal-tab pt-3">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start active" id="pills-monthly-subscriber-tab" data-bs-toggle="pill" data-bs-target="#pills-monthly-subscriber" type="button" role="tab" aria-controls="pills-monthly-subscriber" aria-selected="true"> <i className='th-outline-calendar-1'></i>Monthly Subscriber</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start" id="pills-once-payment-tab" data-bs-toggle="pill" data-bs-target="#pills-once-payment" type="button" role="tab" aria-controls="pills-once-payment" aria-selected="false"><i className='th-outline-user'></i>Once Payment</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-monthly-subscriber" role="tabpanel" aria-labelledby="pills-monthly-subscriber-tab">
                                <div className="tab-data">
                                    <CharityDetailsMonthlySubscriber />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-once-payment" role="tabpanel" aria-labelledby="pills-once-payment-tab">
                                <div className="tab-data">
                                    <CharityDetailsOncePayment />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Modal show={show} size="lg" onHide={handleClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>More about (Charity one) </Modal.Title>
                    <Button variant="close" onClick={handleClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>

                    <div className="requested-charity-details p-0">
                        <div className="requested-charity-details-text">
                            <h2>Fundraise for cancer cure</h2>
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
                    </div>

                </Modal.Body>
            </Modal>

        </>
    )
}

export default AllCharityDetails