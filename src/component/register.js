import React, { useState, useEffect } from 'react';
import response from '../api.js/response';
import { connect } from 'react-redux'
import { increment, decrement, reset, registerFun } from '../actions/actions';
import { ButtonComp, InputBox, SelectBox } from './common-component'
import { Button, Row, Col } from 'react-bootstrap';
import { validateEmail, phonenumber } from '../contants/constants'
import { useNavigate, useLocation } from "react-router-dom"
import swal from 'sweetalert';

const Register = (props) => {
    let navigate = useNavigate()    
    const [tr1, setTr1] = useState("")
    const [err, setErr] = useState({})
    const [email, setEmail] = useState("")
    const [registerObj, setRegisterObj] = useState({})

    const validate = () => {
        let isValid = true
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!registerObj.fName) {
            setErr({ err: "Please enter the first name", type: "fName" })
            isValid = false
        } else if (!registerObj.lName) {
            isValid = false
            setErr({ err: "Please enter the last name", type: "lName" })
        } else if (!registerObj.email) {
            isValid = false
            setErr({ err: "Please enter the email", type: "email" })
        } else if (registerObj.email && (validateEmail(registerObj.email) == null)) {
            isValid = false
            const isEmailValid = validateEmail(registerObj.email)
            setErr({ err: "Incorrect email formate", type: "email" })
        } else if (!registerObj.contact) {
            isValid = false
            setErr({ err: "Please enter the contact", type: "contact" })
        } else if (registerObj.contact && !registerObj.contact.match(phoneno)) {
            isValid = false
            setErr({ err: "Incorrect contact formate", type: "contact" })
        } else {
            setErr({ err: "", type: "" })
        }
        return isValid
    }

    const register = () => {
        const checkValid = validate()
        if (checkValid) {
            swal("Resistration!", "Resistration successfull", "success");
            navigate("/login", {state:{register: true}})
        }
    }

    useEffect(() => {
        let data = []
        console.log(props)
        async function fetchData() {
            data = await response("https://jsonplaceholder.typicode.com/todos", {})
            if (data && data.length) {
                const finalArr = data.map((o) => {
                    return o.title
                })
                props.increment(finalArr)
            } else {
                setErr("something went wrong")
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        if(props.reduxData.test1){
            debugger
        }
    }, [props.reduxData.test1])
    const DataList = () => {
        const arr = props.reduxData.test1
        return arr && arr.length && arr.map((item) => {
            return (<li>{item}</li>)
        })
    }
    const add = () => {
        setTr1("React js")
    }
    const arr = [
        { value: "orange", label: "Orange" },
        { value: "mango", label: "Mango" },
        { value: "grapes", label: "Grapes" },
        { value: "papaya", label: "Papaya" },
        { value: "pinapple", label: "Pinapple" }
    ]
    const changeFun = (e) => {
        const { value, name } = e.target
        let obj = { ...registerObj };
        //let obj = registerObj
        obj[name] = value
        props.registerFun(obj)
        //setRegisterObj(obj)
        //setEmail(value)
    }
    return (
        <>
            <div style={{margin: "110px"}}>
                <h1 className="test">Hi there, welcome to the world of {tr1}</h1>
                <h1>Register</h1>
                <label>First Name:</label><InputBox name={"fName"} changeFun={changeFun} type={"text"} value={props.reduxData.registerObj.fName} placeholder={"Enter your First Name"} />
                <p style={{ color: "red" }}>{err && err.type == "fName" ? err.err : ""}</p>
                <label>Last Name:</label><InputBox name={"lName"} changeFun={changeFun} type={"text"} value={props.reduxData.registerObj.lName} placeholder={"Enter your Last Name"} />
                <p style={{ color: "red" }}>{err && err.type == "lName" ? err.err : ""}</p>
                <label>Email:</label><InputBox name={"email"} changeFun={changeFun} type={"text"} value={props.reduxData.registerObj.email} placeholder={"Enter your Email"} />
                <p style={{ color: "red" }}>{err && err.type == "email" ? err.err : ""}</p>
                <label>Contact:</label><InputBox name={"contact"} changeFun={changeFun} type={"text"} value={props.reduxData.registerObj.contact} placeholder={"Enter your Contact"} />
                <p style={{ color: "red" }}>{err && err.type == "contact" ? err.err : ""}</p>
                <Row className="mx-0">
                    <Button style={{ marginTop: "30px", marginBottom: "60px" }} onClick={() => {
                        register()
                        props.increment([])
                    }} as={Col} variant="success">Register</Button>
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        reduxData: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment: (data) => dispatch(increment(data)),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(reset()),
        registerFun: (data) => dispatch(registerFun(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);