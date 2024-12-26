import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from 'react-bootstrap';
import priority from '../../../assets/images/priority.png'
import { useNavigate } from "react-router-dom";
import { CharityResponse, ENUMFORROUTES } from '../../../interfaces/interface';
import { NO_RECORD_FOUND_MSG, getDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { ENUM_FOR_LISTING_VIEW, ENUM_FOR_SORT_ORDER, ENUM_FOR_TABLE_HEADERS } from '../../../interfaces/enum';
import DatePicker from 'react-datepicker';
import Select, { GroupBase } from "react-select";
import NoRecordsGrid from '../../../components/NoRecordsFound/NoRecordsGrid';
const CancelledCharity = (props) => {
    const navigate = useNavigate();

    const cancelledCharityDetails = () => {
        navigate(ENUMFORROUTES.CANCELLED_CHARITY_DETAILS);
    };

    const [listData, setListData] = useState<Array<CharityResponse>>([]);
    useEffect(() => {


        setListData(props?.charityListData);


        return () => {
            // setListData([]);
        }
    }, [props.charityListData])

    const handleCalculateProgress = (collectedVal, goalVal) => {
        if (!isNullUndefinedOrBlank(collectedVal) && !isNullUndefinedOrBlank(goalVal)) {

            const calculate = (collectedVal / goalVal) * 100;

            return calculate;
        }
        else {
            return 0;
        }

    }

    return (
        <div className="tab-data" >
            <div className="page-filter">
                <div className="page-filter-left">

                    <Form.Group className="form-group filter-group">
                        <div className="form-control-icon icon-start">
                            <i className='th-outline-search-normal-1'></i>
                            <Form.Control type="search" placeholder="Search by name"
                                onChange={(e) => { props.setSearchString(e.target.value) }}
                                value={props.searchString}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="form-group filter-group">
                        <div className="form-control-icon icon-start">
                            <i className='th-outline-calendar-1'></i>
                            {/* <Form.Control type="text" placeholder="Date Range" /> */}
                            <DatePicker
                                // selected={searchByStartDate}
                                selectsRange={true}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    props.setSearchStartDate(!isNullUndefinedOrBlank(start) ? start : null);
                                    props.setSearchEndDate(!isNullUndefinedOrBlank(end) ? end : null);

                                    setTimeout(() => {
                                        props.selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW &&
                                            props.setPageNumber(1);
                                    }, 200);
                                }}
                                startDate={props.searchStartDate}
                                endDate={props.searchEndDate}
                                // minDate={new Date()}
                                isClearable
                                dateFormat="dd-MM-yyyy"
                                className="form-control"
                                popperProps={{ strategy: "fixed" }}
                                placeholderText="Select a Date"

                                // inline
                                showIcon
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="filter-group filter-select">
                        <Select
                            options={props.requestedByDropDownData}

                            onChange={(selectedOption) => {
                                props.setSearchRequestBy(selectedOption ? selectedOption?.value : null);

                                if (props.selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW) {

                                    setTimeout(() => {
                                        props.setPageNumber(1);
                                    }, 250);
                                }
                            }}
                            placeholder={<div>Request By</div>}
                            isClearable={true}
                            value={props.requestedByDropDownData?.filter(({ value }) => {
                                return (
                                    value ===
                                    props.searchRequestBy
                                );
                            })}


                            className="react-select-container"
                        />
                    </Form.Group>

                </div>
                <div className="page-filter-right">
                    <div className="custom-tab">
                        <ul>
                            <li className={`${props.selectView === ENUM_FOR_LISTING_VIEW.GRID_VIEW ? "active" : ""}`}
                                onClick={() => { props?.handleChangeView(ENUM_FOR_LISTING_VIEW.GRID_VIEW) }}>
                                <i className='th-outline-element-3'></i>
                            </li>
                            <li
                                className={`${props.selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW ? "active" : ""}`}
                                onClick={() => { props?.handleChangeView(ENUM_FOR_LISTING_VIEW.LIST_VIEW) }}
                            ><i className='bi bi-list-task'></i></li>
                        </ul>
                    </div>
                </div>

            </div>
            {
                props.selectView === ENUM_FOR_LISTING_VIEW.GRID_VIEW &&
                <div className="grid-view">
                    <Row>

                        {
                            !isEmptyObjectOrNullUndefiend(listData) ? listData.map((item, index) => {
                                // console.log(item,"item");
                                return (
                                    <Col md={4}
                                        key={index}
                                    >
                                        <Card className='normal-card'

                                        // onClick={cancelledCharityDetails}

                                        >
                                            <Card.Body>
                                                <div className="charity-card">
                                                    <div className="charity-card-title">
                                                        <div className="charity-icon bg-red">
                                                            <i className='th-bold-box'></i>
                                                        </div>
                                                        <div className="charity-text">
                                                            <div className="charity-text-action">
                                                                <h3>{!isNullUndefinedOrBlank(item?.charity_name) ? item?.charity_name : "-"}</h3>
                                                                <Dropdown className="card-action ">
                                                                    <Dropdown.Toggle id="dropdown-basic">
                                                                        <i className='th-outline-more'></i>
                                                                    </Dropdown.Toggle>

                                                                    {
                                                                        item?.isRejected &&
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => { props.openDeleteModal(item) }}> <i className='th-outline-trash'></i> Delete</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    }

                                                                </Dropdown>
                                                            </div>
                                                            <div className='charity-text-description' dangerouslySetInnerHTML={{ __html: item?.description as any }}>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="charity-card-details">
                                                        <div className="per-month-charity">
                                                            <p> <img src={priority} alt="priority" /> ${!isNullUndefinedOrBlank(item?.monthly_amount) ? item?.monthly_amount : "0"}/Month </p>
                                                        </div>

                                                        <div className="admin-published">
                                                            <p className='text-primary'> <i className='th-outline-user'></i> {!isNullUndefinedOrBlank(item?.author) ? item?.author : "-"}</p>
                                                            <p className='published-date'>Cancelled : {!isNullUndefinedOrBlank(item?.cancelledAt) ? getDate(item?.cancelledAt, "DD MMM, yyyy") : "-"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="charity-target">
                                                        <div className="charity-target-item">
                                                            <h6>${!isNullUndefinedOrBlank(item?.goal_amount) ? item?.goal_amount : 0}</h6>
                                                            <p>Target</p>
                                                        </div>
                                                        <div className="charity-target-item text-end" >
                                                            {/* {item?.is_verified ? <></> : <h6 className='text-warning'>Waiting For Approval</h6>} */}
                                                            {item?.isRejected ? <h6 className='text-danger'>Cancelled</h6> : <></>}
                                                            {/* <p>Collected</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }) : <NoRecordsGrid />
                        }

                        {/* <Col md={4}>
                        <Card className='normal-card' onClick={cancelledCharityDetails}>
                            <Card.Body>
                                <div className="charity-card">
                                    <div className="charity-card-title">
                                        <div className="charity-icon bg-success">
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
                                                        <Dropdown.Item href="#/action-2"> <i className='th-outline-trash'></i> Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <p>Loream ipsum is simply dummy text to mange </p>
                                        </div>
                                    </div>
                                    <div className="charity-card-details">
                                        <div className="per-month-charity">
                                            <p> <img src={priority} alt="priority" /> $20 / Month</p>
                                        </div>
                                        <div className="admin-published">
                                            <p className='text-primary'> <i className='th-outline-user'></i> Nicolas Cage</p>
                                            <p className='published-date'>Requited: 12 Mar, 2024</p>
                                        </div>
                                    </div>
                                    <div className="charity-target">
                                        <div className="charity-target-item">
                                            <h6>$152,525</h6>
                                            <p>Target</p>
                                        </div>
                                        <div className="charity-target-item text-end" >
                                            <h6 className='text-danger'>Cancelled</h6>
                                            <p>Collected</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='normal-card' onClick={cancelledCharityDetails}>
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
                                                        <Dropdown.Item href="#/action-2"> <i className='th-outline-trash'></i> Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <p>Loream ipsum is simply dummy text to mange </p>
                                        </div>
                                    </div>
                                    <div className="charity-card-details">
                                        <div className="per-month-charity">
                                            <p> <img src={priority} alt="priority" /> $20 / Month</p>
                                        </div>
                                        <div className="admin-published">
                                            <p className='text-primary'> <i className='th-outline-user'></i> Nicolas Cage</p>
                                            <p className='published-date'>Requited: 12 Mar, 2024</p>
                                        </div>
                                    </div>
                                    <div className="charity-target">
                                        <div className="charity-target-item">
                                            <h6>$152,525</h6>
                                            <p>Target</p>
                                        </div>
                                        <div className="charity-target-item text-end" >
                                            <h6 className='text-danger'>Cancelled</h6>
                                            <p>Collected</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    </Row>
                </div>}
            {
                props.selectView === ENUM_FOR_LISTING_VIEW.LIST_VIEW &&
                <div className="listing-view card-table-sticky">
                    <Table responsive bordered hover className='table-theme table-sticky'>
                        <thead>
                            <tr>
                                {/* <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th className='text-center'>Author</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Target</th>
                            <th className='text-center'>Collected</th>
                            <th className='text-center'>Progress</th> */}
                                {
                                    props.columName.map((item, index) => (
                                        (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUM_FOR_SORT_ORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                            onClick={() => {
                                                if (!isEmptyObjectOrNullUndefiend(listData)) {
                                                    props.columnSorting(item.keyName, props.sortOrder)
                                                }
                                            }}>{item.displayName} </th>)

                                    ))
                                }
                                <th className='text-center'>{ENUM_FOR_TABLE_HEADERS.STATUS_FOR_MANGEMENT}</th>
                                {/* <th className='text-center'>{ENUM_FOR_TABLE_HEADERS.STATUS_FOR_MANGEMENT}</th> */}
                                <th className='text-center'>{ENUM_FOR_TABLE_HEADERS.PROGRESS_FOR_MANGEMENT}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isEmptyObjectOrNullUndefiend(listData) ? listData?.map((item, index) => {
                                    return (
                                        <>

                                            <tr key={index}>

                                                <td className=''>{!isNullUndefinedOrBlank(item?.formated_id) ? item?.formated_id : "-"}</td>
                                                <td>{!isNullUndefinedOrBlank(item?.charity_name) ? item?.charity_name : "-"}</td>
                                                <td>{!isNullUndefinedOrBlank(item?.description) ? <div dangerouslySetInnerHTML={{ __html: item?.description as any }}>

                                                </div> : "-"}</td>
                                                <td className='text-center'>{!isNullUndefinedOrBlank(item?.author) ? item?.author : "-"}</td>
                                                <td className="text-center text-primary">{!isNullUndefinedOrBlank(item?.createdAt) ? getDate(item?.createdAt, "DD MMM, yyyy") : "-"}</td>
                                                <td className='text-end'>${!isNullUndefinedOrBlank(item?.goal_amount) ? item?.goal_amount : 0}</td>
                                                <td className="text-end text-secondary"><b>${!isNullUndefinedOrBlank(item?.collected_amount) ? item?.collected_amount : 0}</b></td>
                                                {/* {item?.is_verified ? <></> : <td className='text-warning'>Waiting For Approval</td>}
                                                {item?.isRejected ? <td className='text-danger'>Cancelled</td> : <></>} */}

                                                {(!item?.is_verified && !item?.isRejected) ? <td className='text-warning'>Waiting For Approval</td> : <></>}
                                                {item?.isRejected ? <td className='text-danger'>Cancelled</td> : <></>}
                                                <td className='progress-table-action'>
                                                    <div className="d-flex">
                                                        <ProgressBar variant="success" now={handleCalculateProgress(item?.collected_amount, item?.goal_amount)} />
                                                        <p>{handleCalculateProgress(item?.collected_amount, item?.goal_amount)}%</p>
                                                        <Dropdown className="card-action ">
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                <i className='th-outline-more'></i>
                                                            </Dropdown.Toggle>
                                                            {
                                                                item?.isRejected &&
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { props.openDeleteModal(item) }}> <i className='th-outline-trash'></i> Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            }
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </tr>


                                        </>
                                    )
                                })
                                    : <>
                                        <tr>
                                            {NO_RECORD_FOUND_MSG}
                                        </tr>

                                    </>
                            }
                            {/* <tr>
                                <td className=''>01</td>
                                <td>Charity One</td>
                                <td>Loream ipsum is simply dummy text to mange</td>
                                <td className='text-center'>Admin</td>
                                <td className="text-center text-primary">20 April 2024</td>
                                <td className='text-center'>$152,525</td>
                                <td className="text-center text-secondary"><b>$15,652</b></td>



                                <td className='progress-table-action'>
                                    <div className="d-flex">
                                        <ProgressBar variant="success" now={60} />
                                        <p>40%</p>
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
                                </td>
                            </tr> */}



                        </tbody>
                    </Table>
                </div>
            }
        </div >
    )
}

export default CancelledCharity