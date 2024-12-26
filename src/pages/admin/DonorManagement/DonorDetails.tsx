import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { DONORDETAILSTAB, DonorData, ENUMFORDONORSTAB, ENUMFORROUTES } from '../../../interfaces/interface';
import PartofCharityList from './PartofCharityList';
import PaymentDetailsList from './PaymentDetailsList';

const DonorDetails = () => {
    const [donorData, setDonorData] = useState<DonorData>();
    const [donorDetailsTab, setdonorDetailsTab] = useState<string>(DONORDETAILSTAB.CHARITY)
    const navigate = useNavigate();
    const { state } = useLocation();

    //check State is there or not
    const checkState = () => {
        if (isNullUndefinedOrBlank(state)) {
            navigate(ENUMFORROUTES.DONOR_MANAGEMENT)
        } else {
            setDonorData(state.details)
        }
    }
    //navigate to management page
    const navigateToManagementPage = async () => {
        let reqBody = {
            reqBody: state.reqBody
        }
        navigate(ENUMFORROUTES.DONOR_MANAGEMENT, { state: reqBody })
    }


    useEffect(() => {
        checkState();
    }, [])

    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title">
                        <div className="page-title-left">
                            <Button variant='white' size='sm' className='btn-icon-start' onClick={() => { navigateToManagementPage() }}> <i className='th-outline-arrow-left'></i> Back</Button>
                            <div className="page-title-text">
                                <h2>{donorData?.formated_id ? `#${donorData.formated_id}` : ""}</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            {/* <Button variant="white" size='sm' className='btn-icon-start' > <i className='th-outline-edit'></i> Edit</Button> */}
                            <Button variant="icon-sm" className='btn-icon-primary-outline-sm' > <i className='th-outline-refresh-2'></i></Button>
                        </div>
                    </div>
                    <div className="donor-profile">
                        <div className="donor-profile-card">
                            <div className="donor-details-card-left">
                                <div className="donor-details-profile">
                                    <img src={donorData?.url ? donorData?.url : defaultAvatar} alt="defaultAvatar" />
                                    <div className="donor-details-text">
                                        <h2>{(donorData?.first_name && donorData?.last_name) ? `${donorData.first_name} ${donorData.last_name}` : ""}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="donor-details-card-right">
                                <div className="donor-amt-card">
                                    <p>Total AMT Donated by Donor</p>
                                    <div className="donor-amt-count">
                                        <h6>${donorData?.donated_amount ? donorData.donated_amount : 0}</h6>
                                        <div className="donor-amt-icon">
                                            <i className='th-outline-dollar-circle'></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-tab normal-tab">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${donorDetailsTab === DONORDETAILSTAB.CHARITY ? `active` : ""}`} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => { setdonorDetailsTab(DONORDETAILSTAB.CHARITY) }}> <i className='th-outline-note-add'></i>Part of charity</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${donorDetailsTab === DONORDETAILSTAB.PAYMENT ? `active` : ""}`} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => { setdonorDetailsTab(DONORDETAILSTAB.PAYMENT) }}><i className='th-outline-card'></i>Payments</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <PartofCharityList />
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <PaymentDetailsList />
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DonorDetails