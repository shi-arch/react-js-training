import React, { useState, useEffect } from 'react';
import response from '../api.js/response';
import { connect } from 'react-redux'
import { increment, decrement, reset } from '../actions/actions';
import { ButtonComp, InputBox, SelectBox } from './common-component'
import { Button, Row, Col, Modal, } from 'react-bootstrap';
import { validateEmail, phonenumber } from '../contants/constants'
import { useNavigate, useLocation } from "react-router-dom"
import DataTable from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
//import ArrowDownward from '@material-ui/icons/ArrowDownward';
import img from '../assets/view.png'
import swal from 'sweetalert';

//const sortIcon = <ArrowDownward />;
const Dashboard = (props) => {
    let navigate = useNavigate()
    const location = useLocation();
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Class',
            selector: row => row.class,
            sortable: true
        },
        {
            name: 'Roll number',
            selector: row => row.roll,
            sortable: true
        }
    ];

    const data = [
        {
            id: 1,
            name: 'Pawan',
            class: 'B tech',
            roll: "21"
        },
        {
            id: 2,
            name: 'Piyush',
            class: 'BCA',
            roll: "22"
        },
        {
            id: 3,
            name: 'Manoj',
            class: 'MCA',
            roll: "33"
        }
    ]

    return (
        <>
            <div className='container' style={{ marginTop: "50px" }}>
                <h1 style={{ color: "#7c5628" }}>Welcome to the dashboard</h1>
                <DataTable
                    columns={columns}
                    data={data}
                    selectableRows
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    pagination
                />
                {/* <button type="button" class="btn btn-danger">Primary</button> */}
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment: (data) => dispatch(increment(data)),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(reset())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);