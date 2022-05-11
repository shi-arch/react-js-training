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
    const [show, setShow] = useState(false)
    const [showVeri, setShowVeri] = useState(false)

    useEffect(() => {
        if (location && !location.state) {
            navigate("/")
        }
    }, [])
    const validate = () => {
        let isValid = true
        if (!registerObj.email) {
            isValid = false
            setErr({ err: "Please enter the email", type: "email" })
        } else if (registerObj.email && (validateEmail(registerObj.email) == null)) {
            isValid = false
            setErr({ err: "Incorrect email formate", type: "email" })
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
        swal("Verification!", "verification code has sent to your email id", "success");
        setShowVeri(true)
    }
    const changeFun = (e) => {
        const { value, name } = e.target
        let obj = { ...registerObj };
        //let obj = registerObj
        obj[name] = value
        setRegisterObj(obj)
        //setEmail(value)
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
                        <InputBox name={"forgot_pwd"} type={"text"} placeholder={"Enter your registered email id"} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Send verification link
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showVeri} onHide={() => setShowVeri(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputBox style={{marginBottom: "21px"}} name={"forgot_pwd"} type={"text"} placeholder={"Enter new password"} />
                        <InputBox name={"forgot_pwd"} type={"text"} placeholder={"Confirm password"} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowVeri(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => setShowVeri(false)}>
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