import React, { useState, useEffect } from 'react';
import response from '../api.js/response';
import { connect } from 'react-redux'
import { increment, decrement, reset } from '../actions/actions';
import { ButtonComp, InputBox, SelectBox } from './common-component'
import { Button, Row, Col, Modal, } from 'react-bootstrap';
import { validateEmail, phonenumber } from '../contants/constants'
import { useNavigate, useLocation } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert';

const Login = (props) => {
    let navigate = useNavigate()
    const location = useLocation();
    const [err, setErr] = useState({})
    const [registerObj, setRegisterObj] = useState({})
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false)
    const [showVeri, setShowVeri] = useState(false)
    const [type, setType] = useState("password")    
    const [password, setPassword] = useState({})

    useEffect(() => {
        if (location && !location.state) {
            navigate("/")
        }
    }, [])
    const emailValidation = () => {
        let isValid = true
        if (!registerObj.email) {
            isValid = false
            setErr({ err: "Please enter the email", type: "email" })
        } else if (registerObj.email && (validateEmail(registerObj.email) == null)) {
            isValid = false
            setErr({ err: "Incorrect email formate", type: "email" })
        }
        return isValid
    }
    const forgotEmailValidation = () => {
        let isValid = true
        if (!email) {
            isValid = false
            setErr({ err: "Please enter the email", type: "email" })
        } else if (email && (validateEmail(email) == null)) {
            isValid = false
            setErr({ err: "Incorrect email formate", type: "email" })
        }
        return isValid
    }
    const validate = () => {
        let isValid = true
        if(!emailValidation()){
            isValid = false
        } else if (!registerObj.password) {
            isValid = false
            setErr({ err: "Please enter the password", type: "password" })
        } else {
            setErr({ err: "", type: "" })
        }
        return isValid
    }

    const login = () => {
        const checkValid = validate()
        if (checkValid) {
            swal("Login!", "Login successfull", "success");
        }
    }
    const handleClose = () => {
        setShow(false)
        //swal("Verification!", "verification code has sent to your email id", "success");
        //setShowVeri(true)
    }
    const changeFun = (e) => {
        const { value, name } = e.target
        let obj = { ...registerObj };
        //let obj = registerObj
        obj[name] = value
        setRegisterObj(obj)
        //setEmail(value)
    }
    const setEmailStr = (e) => {
        const { value, name } = e.target
       setEmail(value)
        //setEmail(value)
    }
    const passwordValidation = () => {
        let isValid = true
        const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!password.newPass) {
            isValid = false
            setErr({ err: "Please enter the new password", type: "newPass" })
        } else if (password.newPass && (!regularExpression.test(password.newPass))) {
            debugger
            isValid = false
            setErr({ err: "Your password must have length 6 to 16 and must have a number and special character", type: "newPass" })
        } else if (!password.confirmPass) {
            isValid = false
            setErr({ err: "Please confirm password", type: "confirmPass" })
        } else if (password.newPass !== password.confirmPass) {
            isValid = false
            setErr({ err: "Password does not match", type: "confirmPass" })
        } else {
            isValid = true
            setErr({ err: "", type: "" })
        }
        return isValid
    }
    const setPasswordDetails = (e) => {
        const { value, name } = e.target
        let obj = { ...password };
        obj[name] = value
        setPassword(obj)
    }
    const handleShow = () => {
        setShow(true)
    }
    return (
        <>
            <div style={{ margin: "110px", textAlign: "center" }}>
                <h1>Login</h1>
                {/* <GoogleLogin
                    clientId="658977310896-AIzaSyDSMfK0ioojWNSTg78NTOpL0HzXP_UwuN8.apps.googleusercontent.com"
                    buttonText="Login"
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> */}
                <FacebookLogin
                    appId="1022482148392327"
                    autoLoad={true}
                    fields="name,email,picture"
                    //onClick={componentClicked}
                    //callback={responseFacebook} 
                    />
                <label>Email:</label><InputBox name={"email"} changeFun={changeFun} type={"email"} value={registerObj.email} placeholder={"Enter your Email"} />
                <p style={{ color: "red" }}>{err && err.type == "email" ? err.err : ""}</p>
                <label>Password:</label><InputBox name={"password"} changeFun={changeFun} type={"password"} value={registerObj.password} placeholder={"Enter your Password"} />
                <p style={{ color: "red" }}>{err && err.type == "password" ? err.err : ""}</p>
                <Row className="mx-0">
                    <Button style={{ marginTop: "30px", marginBottom: "60px" }} onClick={() => {
                        login()
                    }} as={Col} variant="success">Login</Button>
                </Row>
                <a type='button' onClick={handleShow}>Forgot password ?</a>
            </div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputBox name={"email"} changeFun={setEmailStr} type={"email"} placeholder={"Enter your registered email id"} />
                        <span style={{color: "red"}}>{err.err}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            const validation = forgotEmailValidation()
                            if(validation){
                                setShow(false)
                                swal("Verification!", "verification code has sent to your email id", "success");
                                setShowVeri(true)
                            }                            
                        }}>
                            Send verification link
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showVeri} onHide={() => setShowVeri(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img onClick={() => {
                            if(type == "password"){
                                setType("text")
                            } else {
                                setType("password")
                            }                                
                        }} src="../assets/view.png" />
                        <InputBox style={{ marginBottom: "21px" }} changeFun={setPasswordDetails} name={"newPass"} type={"password"} placeholder={"Enter new password"} />
                        <p style={{ color: "red", marginTop: "-20px" }}>{err && err.type == "newPass" ? err.err : ""}</p>
                        <InputBox name={"confirmPass"} type={type} changeFun={setPasswordDetails} placeholder={"Confirm password"} />
                        <p style={{ color: "red" }}>{err && err.type == "confirmPass" ? err.err : ""}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => 
                            setShowVeri(false)
                        }>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            if(passwordValidation()){
                                setShowVeri(false)
                            }                            
                        }}>
                            Save password
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);