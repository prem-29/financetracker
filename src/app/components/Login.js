import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/user_slice';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom'
import { Image, Button } from "antd";
import userImage from '../assets/user.png'
import loginImage from '../assets/login.jpg'
import financeImage from '../assets/finance_tracker.png'
import axios from 'axios';
import Signup from './Modals/Signup';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [signupVisible, setsignupVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const token = new URLSearchParams(window.location.search).get("token");
            if (token) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_BASE_URL}/api/verify-email`,
                        { token }
                    );

                    if (response.data.success) {
                        alert("Account Verified Successfully");
                    } else {
                        alert("Please try again");
                    }
                } catch (error) {
                    alert("Verification failed. Try again later.");
                }
            }
        };
        verify();
    }, []);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("Email and Password are mandatory!");
        } else {
            try {
                // Replace with your API endpoint
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/login`, {
                    email,
                    password
                });
                if (response.data.success) {
                    // Assuming the response contains a success flag and user info
                    localStorage.setItem('userdetail', JSON.stringify(response.data.loggedin.user))
                    localStorage.setItem('token', response.data.loggedin.token)
                    dispatch(loginSuccess(response.data.user));
                    navigate('/home');
                } else {
                    setError('Email or Password is invalid');
                }
            } catch (error) {
                setError('An error occurred while logging in. Please try again.', error);
            }
        }
    }

    const handleSignupModal = async () => {
        setsignupVisible(true);
    }
    const onAddUser = async (values) => {
        let data = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/signup`,
                data
            );
            if (response.data.success) {
                setsignupVisible(false);
                alert('User Details Created Successfully!, Verify link sent to your register email.')
            } else {
                alert('Try again');

            }
        } catch (error) {
            console.log(error, "error")
            alert('An error occurred while adding user details. Please try again.', error);
        }
    }
    const handleOnSignupCancel = async () => {
        setsignupVisible(false);
    }

    const validateEmail = (e) => {
        const email = e.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    return (
        <section style={styles.sectionBackground}>
            <div style={styles.container}>
                <div style={styles.form}>
                    <h1 style={{ textAlign: 'center', color: "#081c15" }}>Login</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <FaUserCircle style={{ width: 50, height: 50 }} /> */}
                        <Image src={userImage} alt="User" width={100} height={100} />
                    </div>
                    <div>
                        <p style={styles.text}>Email *</p>
                    </div>
                    <div style={styles.fieldStyle}>
                        <input style={{ ...styles.input, borderColor: emailError ? "red" : "black" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                    </div>
                    <div>
                        <p style={styles.text}>Password *</p>
                    </div>
                    <div style={{ position: "relative", width: "100%" }}>
                        <input
                            style={{
                                ...styles.input,
                                paddingRight: "35px", // space so text doesn't overlap the eye
                            }}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                fontSize: "18px",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <div style={{ width: '100', textAlign: 'center', paddingTop: 15 }}>
                        <MyButton onClick={handleSubmit} />
                    </div>
                    <div style={{ width: '100', textAlign: 'center', padding: 10 }}>
                        <Button style={{ borderColor: 'white', color: 'rgb(43, 85, 3)', fontWeight: '500' }} onClick={handleSignupModal}>
                            Signup
                        </Button>
                    </div>
                </div>
            </div>
            <Signup isSignUpVisible={signupVisible} handleOnSignupCancel={handleOnSignupCancel} onSignUp={onAddUser} />
        </section>
    )
}

const styles = {
    sectionBackground: {
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '10px',
        padding: '0px 40px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    fieldStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    text: {
        marginRight: '10px'
    },
    error: {
        color: 'red',
        paddingBottom: 10
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        borderWidth: "1px",
        border: "1px solid black",
        boxSizing: "border-box",
    },
    eyeIcon: {
        cursor: "pointer",
        marginLeft: "8px",
        fontSize: "18px",
    },
};

export default Login