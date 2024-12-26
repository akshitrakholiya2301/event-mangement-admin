import React, { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import defaultAvatar from '../../../assets/images/avatar-default.svg'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { isEmptyObjectOrNullUndefiend } from '../../../Utility/Helper'
import { DonorData, ENUMFORSORTORDER } from '../../../interfaces/interface'
const Cancelled = (props) => {
    const [donorData, setDonorData] = useState<Array<DonorData>>([]);

    useEffect(() => {
        setDonorData(props.data)
    }, [props.data])

    return (

        <div className="tab-data card-table-sticky">
            {/* <div className="page-filter">
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-search-normal-1'></i>
                        <Form.Control type="search" placeholder="Search by name"
                        //  value={search} onChange={(e) => { handleSearchData(e) }} onKeyDown={(e) => { handleSearchData(e) }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="form-group filter-group">
                    

                    <Select
                        className=""
                        options={ENUMFORDROPDOWNDONOR}
                        onChange={(selectedOption) => {
                            setSelectedType(selectedOption?.value);
                        }}
                        placeholder={<div>Type</div>}
                        isClearable={true}
                        value={(ENUMFORDROPDOWNDONOR?.filter(({ value }) => {
                            return (
                                value === selectedType
                            );
                        }))}
                    />
                </Form.Group>
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-dollar-circle'></i>
                        <Form.Control type="text" placeholder="AMT Start" />
                    </div>
                </Form.Group>
                <span>-</span>
                <Form.Group className="form-group filter-group">
                    <div className="form-control-icon icon-start">
                        <i className='th-outline-dollar-circle'></i>
                        <Form.Control type="text" placeholder="AMT End" />
                    </div>
                </Form.Group>
            </div> */}

            <Table responsive bordered hover className='table-theme table-sticky'>
                <thead>
                    <tr>
                        {/* <th>Donor Name</th>
                                                <th className='text-center'>User ID</th>
                                                <th >Note</th>
                                                <th className='text-center'>Type</th>
                                                <th className='text-center'>Donated AMT</th>
                                                <th className='text-end'>Action</th> */}

                        {
                            props.columName.map((item, index) => (
                                (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUMFORSORTORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                    onClick={() => {
                                        if (!isEmptyObjectOrNullUndefiend(donorData)) {
                                            props.columnSorting(item.keyName, props.sortOrder)
                                        }
                                    }}>{item.displayName} </th>)

                            ))
                        }
                    </tr>
                </thead>
                {
                    <tbody>
                        {
                            (!isEmptyObjectOrNullUndefiend(donorData)) ?
                                donorData.map((key, index) => (
                                    <tr key={index}
                                        className={key.id === props.selectedData ? `authorized` : ''} onClick={() => { props.handleSelectedData(key.id) }}
                                    >
                                        <td className='' onClick={() => { props.navigateToDetailPage(key, index) }}>
                                            <div className="tbl-profile-container">
                                                <div className="tbl-profile-image">
                                                    <img src={key.url ? key.url : defaultAvatar} alt="10 & Deliver Limited" />
                                                </div>
                                                <div className="tbl-profile-content">
                                                    <h6>{(key.first_name && key.last_name) ? `${key.first_name} ${key.last_name}` : " "}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center' >{key.formated_id ? key.formated_id : ""}</td>
                                        {/* <td >loream ipsum is simply dummy test represent <br /> real content</td> */}
                                        <td className='text-center'>{key.donor_type ? key.donor_type : ''}</td>
                                        <td className="text-center text-primary">${key.donated_amount ? `${key.donated_amount}` : 0}</td>

                                        <td className='tbl-action'>
                                            <div className="tbl-action-group">
                                                <OverlayTrigger
                                                    trigger={["hover", "hover"]}
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip>Delete</Tooltip>
                                                    }
                                                >
                                                    <Button variant='action' className=''
                                                        onClick={() => { props.handleSetDeleteId(key.id); props.handleOpenDeleteModal() }}
                                                    >
                                                        <i className='th-outline-trash'></i></Button>
                                                </OverlayTrigger>

                                            </div>
                                        </td>



                                    </tr>
                                ))
                                :

                                <tr>
                                    <td colSpan={5} className='text-center'>No Data Found</td>
                                </tr>
                        }


                    </tbody>
                }

            </Table>

        </div>
    )
}

export default Cancelled