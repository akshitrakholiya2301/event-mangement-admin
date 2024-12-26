import React, { useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import authLogo from "../../../assets/images/auth-logo.svg"
import authBg from "../../../assets/images/admin-auth-bg.svg"
import authBg2 from "../../../assets/images/admin-auth-bg2.svg"
import { Button, Card, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { MAX_50, PATTERN_EMAIL } from '../../../Utility/Validation_Helper';
import { customJsonInclude, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { ENUMFORROUTES } from '../../../interfaces/interface';
import { loginToSystem } from '../../../redux/Service/login';
/**
 * Login Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the Login component
 */
const Login = (props) => {
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);

    const navigate = useNavigate();

    const initLoginValues = {
        email: '',
        password: ''
    };

    /**
     * Validation schema for login data based on the selected tab.
     */
    const validationSchemaForLoginData = yup.object({
        email: yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!"),
        password: yup.string().trim().required("Password is required !!")
    })


    const handleSubmit = async (values, formikHelpers) => {
        const response = await props.loginToSystem(values);
        if (response) {
            if (!isNullUndefinedOrBlank(response)) {
                navigate(ENUMFORROUTES.DASHBOARD);
            }
        }
    }

    /**
      * Formik hook for managing login form data.
      */
    const loginFormData = useFormik({
        initialValues: initLoginValues,
        validationSchema: validationSchemaForLoginData,
        onSubmit: handleSubmit,
    });

    const handleKeyPress = (event) => {

        if (event.keyCode === 13) {
            event.preventDefault();
            loginFormData.handleSubmit();

        }

    };

    return (
        <>
            <div className="admin-auth-wrapper">
                <div className="admin-auth-inner-wrapper">
                    <div className="auth-bg-one">
                        <img src={authBg} alt="authBg" />
                    </div>
                    <div className="auth-bg-two">
                        <img src={authBg2} alt="authBg2" />
                    </div>
                    <div className="admin-auth-logo">
                        <img src={authLogo} alt="authLogo" />
                    </div>
                    <div className="admin-auth-from">
                        <Card className='admin-auth-card'>
                            <Card.Body>
                                <div className="admin-auth-icon">
                                    <i className='th-outline-frame-1'></i>
                                </div>
                                <div className="admin-auth-card-title">
                                    <h2>Welcome Back</h2>
                                    <p>Welcome back! Please enter your details.</p>
                                </div>
                                {/* <Form noValidate> */}
                                <Form.Group className="form-group">
                                    <Form.Label>Email</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-user'></i>
                                        <Form.Control type="email" placeholder="Enter email"
                                            maxLength={MAX_50}
                                            {...loginFormData.getFieldProps("email")}
                                            onKeyDown={(event) => { handleKeyPress(event) }} />
                                    </div>
                                    {loginFormData.touched.email &&
                                        loginFormData.errors.email
                                        ? renderError(loginFormData.errors?.email)
                                        : null}
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label>Password</Form.Label>
                                    <div className="form-control-icon  form-control-password icon-start">
                                        <i className='th-outline-lock'></i>
                                        <Form.Control type={eyeToggle ? "text" : "password"} placeholder="••••••••" {...loginFormData.getFieldProps("password")} onKeyDown={(event) => { handleKeyPress(event) }} />
                                        {eyeToggle ? (
                                            <button
                                                type='button'
                                                className=" btn-password"
                                                onClick={() => { setEyeToggle(!eyeToggle) }}
                                            >
                                                <i className="th-outline-eye"></i>
                                            </button>
                                        ) : (
                                            <button
                                                type='button'
                                                className=" btn-password"
                                                onClick={() => { setEyeToggle(!eyeToggle) }}
                                            >
                                                <i className="th-outline-eye-slash"></i>
                                            </button>
                                        )}
                                    </div>
                                    {loginFormData.touched.password &&
                                        loginFormData.errors.password
                                        ? renderError(loginFormData.errors?.password)
                                        : null}
                                </Form.Group>
                                {/* 
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me!" />
                                </Form.Group> */}

                                <div className="btn-full-group">
                                    <Button onClick={() => {
                                        localStorage.setItem("token", "hii");
                                        props.loading(true);
                                        setTimeout(() => {
                                            props.loading(false);
                                        }, 2000);
                                    }} variant='primary'>Login</Button>
                                    <NavLink className="btn-link btn-icon-start back-login justify-content-center" to="/forgot-password">Forgot Password</NavLink>
                                </div>
                                {/* </Form> */}
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state: RootState) => {
    //   return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = {
    loading,
    loginToSystem

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login