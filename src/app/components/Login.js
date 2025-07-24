import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/user_slice';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom'
import { Image, Button } from "antd";
import userImage from '../assets/user.png'
import loginImage from '../assets/loginscreen.jpg'
import financeImage from '../assets/finance_tracker.png'
import axios from 'axios';
import Signup from './Modals/Signup';
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [signupVisible, setsignupVisible] = useState(false);
    const navigate = useNavigate();

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
                    console.log(response.data)
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
                alert('User Details Created Successfully!')
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
        <section style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat' }}>
            <div style={styles.container}>
                <div style={{ padding: 40, margin: 40 }}>
                    <Image src={financeImage} alt="finance_image" width={650} height={700} style={{ userSelect: 'none', pointerEvents: 'none' }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false" />
                </div>
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
                    <div style={styles.fieldStyle}>
                        <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <div style={{ width: '100', textAlign: 'center' }}>
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
    container: {
        display: 'flex',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh', // to center vertically
        paddingLeft: 40,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: 50,
        backgroundColor: 'white',
        height: 550
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
        flex: 1,
        padding: '10px',
        borderRadius: '10px',
        borderWidth: '1px'
    },
};

export default Login