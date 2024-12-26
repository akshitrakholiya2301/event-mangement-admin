import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'
import { NavLink } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import { ENUMFORACCOUNTTAB } from '../../../interfaces/interface'

const Settings = (props) => {
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    /* --------------------------Profile Tab-------------------------- */
    const [profileTab, setProfileTab] = useState<string>(ENUMFORACCOUNTTAB.PERSONAL_DETAILS)


    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-title border-bottom">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>Settings</h2>
                            </div>
                        </div>
                    </div>
                    <div className="admin-setting">
                        <div className="admin-setting-tab">
                            <div className="nomral-pill-tab vertical-tab">
                                <ul className="nav nav-pills " id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.PERSONAL_DETAILS ? 'active' : ''}`} id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-info" aria-selected="true" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.PERSONAL_DETAILS) }}><i className='th-outline-user'></i> Personal Info</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.UPDATE_PASSWORD ? 'active' : ''}`} id="pills-password-tab" data-bs-toggle="pill" data-bs-target="#pills-password" type="button" role="tab" aria-controls="pills-password" aria-selected="false" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.UPDATE_PASSWORD) }}> <i className='th-outline-key'></i> Change Password</button>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-settings-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-settings" aria-selected="false"> <i className='th-outline-setting-2'></i> Settings</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-integrations-tab" data-bs-toggle="pill" data-bs-target="#pills-integrations" type="button" role="tab" aria-controls="pills-integrations" aria-selected="false"> <i className='th-outline-card-pos'></i> Payment Integrations</button>
                                    </li> */}
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className={`tab-pane fade show ${profileTab === ENUMFORACCOUNTTAB.PERSONAL_DETAILS ? 'active' : ''}`} id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                                        <ProfileInfo selectedTab={profileTab} />
                                    </div>

                                    <div className={`tab-pane fade show ${profileTab === ENUMFORACCOUNTTAB.UPDATE_PASSWORD ? 'active' : ''}`} id="pills-password" role="tabpanel" aria-labelledby="pills-password-tab">
                                        <ChangePassword selectedTab={profileTab} />
                                    </div>
                                    {/* <div className="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">

                                    </div>
                                    <div className="tab-pane fade" id="pills-integrations" role="tabpanel" aria-labelledby="pills-integrations-tab">

                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)