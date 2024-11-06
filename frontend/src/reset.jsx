import React, { useContext, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthProvider';
import axios from './api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const PWD_RESET = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{10,15}$/;
const Reset_URL = '/reset';

function Reset() {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const emailFromState = location.state?.email || auth.email;
    const userRef = useRef(null);
    const errRef = useRef(null);

    const hasRole1994 = auth.roles.includes('1994');

    const [pwd, setPwd] = useState('');
    const [number, setNumber] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [validNumber, setValidNumber] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setValidPwd(PWD_RESET.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setValidNumber(PHONE_REGEX.test(number));
        setErrMsg('');
    }, [pwd, matchPwd, number]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPwd = PWD_RESET.test(pwd);
        const isValidPhone = hasRole1994 ? PHONE_REGEX.test(number) : true;

        if (!isValidPwd || !isValidPhone) {
            setErrMsg("Invalid entry");
            return;
        }

        try {
            const response = await axios.post(
                Reset_URL,
                hasRole1994
                    ? { email: emailFromState, password: pwd, mobile: number }
                    : { email: emailFromState, password: pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
            setNumber('');

            toast.success("Password reset successfully!", { // Toast notification
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000, // Set duration
            });

            navigate('/home');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Request');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 404) {
                setErrMsg('User Not Found');
            } else {
                setErrMsg('Password Reset Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };

    return (
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    {success ? (
                        <h1>Password Reset Successfully!</h1>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p
                                ref={errRef}
                                className={errMsg ? 'alert alert-danger' : 'd-none'}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                            <p className="instructions">
                                Must include 1 special char, 1 number, & 1 capital letter.
                            </p>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter New Password"
                                    className="form-control"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    ref={userRef}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    className="form-control"
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    Must match the first password input field.
                                </p>
                            </div>
                            {hasRole1994 && (
                                <div className="mb-3">
                                    <label htmlFor="number">Mobile Number</label>
                                    <input
                                        type="tel"
                                        id="number"
                                        placeholder="Enter a mobile Number"
                                        className="form-control"
                                        onChange={(e) => setNumber(e.target.value)}
                                        value={number}
                                        required
                                        aria-invalid={validNumber ? "false" : "true"}
                                        ref={userRef}
                                        pattern="[0-9]{10,15}"
                                    />
                                    <p id="numbernote" className={validNumber ? "offscreen" : "instructions"}>
                                        Mobile number should contain 11 digits.
                                    </p>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={!validPwd || !validMatch || (hasRole1994 && !validNumber)}
                                className="btn btn-success w-100"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}
                </div>
                <div className="circle circle-two"></div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
        </section>
    );
}

export default Reset;
